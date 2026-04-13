import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ActivityPayload {
  activityType: string
  points?: number
  notes?: string
}

interface ScoreUpdatePayload {
  score: number
  reason?: string
}

const ACTIVITY_POINTS: Record<string, number> = {
  'door_knock': 1,
  'appointment_set': 5,
  'demo_completed': 10,
  'sale_closed': 25,
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )

    const token = authHeader.replace('Bearer ', '')
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token)
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const userId = claimsData.claims.sub

    // Service-role client for DB writes — bypasses admin-only RLS policies
    // on kpi_snapshots and leaderboard_cache so reps can log their own data.
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const adminSupabase = serviceRoleKey
      ? createClient(Deno.env.get('SUPABASE_URL')!, serviceRoleKey)
      : supabase

    // Check if Enzy API key is configured
    const enzyApiKey = Deno.env.get('ENZY_API_KEY')
    if (!enzyApiKey) {
      return new Response(
        JSON.stringify({
          configured: false,
          message: 'Enzy API key not configured. Please add it in Settings > Integrations.'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const body = await req.json()

    // Action resolution: prefer body.action (how the client sends it now),
    // fall back to the URL path for back compat with older callers.
    const url = new URL(req.url)
    const pathAction = url.pathname.split('/').pop()
    const action =
      (typeof body?.action === 'string' && body.action) ||
      (pathAction && pathAction !== 'enzy-push' ? pathAction : undefined)

    let result: any

    switch (action) {
      case 'log-activity':
        result = await logActivity(enzyApiKey, body as ActivityPayload, userId, adminSupabase)
        break
      case 'update-score':
        result = await updateScore(enzyApiKey, body as ScoreUpdatePayload, userId, adminSupabase)
        break
      default:
        return new Response(
          JSON.stringify({ error: `Unknown action: ${action ?? '(none)'}` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Enzy Push Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function logActivity(apiKey: string, payload: ActivityPayload, userId: string, supabase: any) {
  // Get user's external Enzy ID
  const { data: mapping } = await supabase
    .from('external_user_mappings')
    .select('external_id')
    .eq('user_id', userId)
    .eq('system', 'enzy')
    .single()

  const externalUserId = mapping?.external_id

  // Calculate points
  const points = payload.points || ACTIVITY_POINTS[payload.activityType] || 0

  // Push to Enzy API (adjust URL based on actual Enzy API)
  const response = await fetch(`https://api.enzy.co/v1/activities`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: externalUserId,
      type: payload.activityType,
      points: points,
      notes: payload.notes,
      timestamp: new Date().toISOString()
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Enzy API Error: ${errorText}`)
  }

  // Save to local KPI snapshots
  const today = new Date().toISOString().split('T')[0]
  
  const { data: existingSnapshot } = await supabase
    .from('kpi_snapshots')
    .select('*')
    .eq('user_id', userId)
    .eq('snapshot_date', today)
    .eq('source', 'enzy')
    .single()

  if (existingSnapshot) {
    // Update existing snapshot
    const metrics = existingSnapshot.metrics as any
    metrics.activities = (metrics.activities || []).concat({
      type: payload.activityType,
      points,
      timestamp: new Date().toISOString()
    })
    metrics.totalPoints = (metrics.totalPoints || 0) + points

    await supabase
      .from('kpi_snapshots')
      .update({ metrics })
      .eq('id', existingSnapshot.id)
  } else {
    // Create new snapshot
    await supabase
      .from('kpi_snapshots')
      .insert({
        user_id: userId,
        snapshot_date: today,
        source: 'enzy',
        metrics: {
          activities: [{
            type: payload.activityType,
            points,
            timestamp: new Date().toISOString()
          }],
          totalPoints: points
        }
      })
  }

  // Update leaderboard cache
  await updateLeaderboardCache(supabase, userId, points)

  return await response.json()
}

async function updateScore(apiKey: string, payload: ScoreUpdatePayload, userId: string, supabase: any) {
  // Get user's external Enzy ID
  const { data: mapping } = await supabase
    .from('external_user_mappings')
    .select('external_id')
    .eq('user_id', userId)
    .eq('system', 'enzy')
    .single()

  const externalUserId = mapping?.external_id

  // Push to Enzy API
  const response = await fetch(`https://api.enzy.co/v1/scores`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: externalUserId,
      score: payload.score,
      reason: payload.reason
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Enzy API Error: ${errorText}`)
  }

  return await response.json()
}

async function updateLeaderboardCache(supabase: any, userId: string, pointsToAdd: number) {
  const { data: existing } = await supabase
    .from('leaderboard_cache')
    .select('*')
    .eq('user_id', userId)
    .eq('period', 'weekly')
    .single()

  if (existing) {
    await supabase
      .from('leaderboard_cache')
      .update({ 
        score: (existing.score || 0) + pointsToAdd,
        fetched_at: new Date().toISOString()
      })
      .eq('id', existing.id)
  }
}
