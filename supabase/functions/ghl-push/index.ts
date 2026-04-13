import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface LeadPayload {
  firstName: string
  lastName: string
  email?: string
  phone?: string
  address?: string
  leadSource?: string
  notes?: string
}

interface DealUpdatePayload {
  externalId: string
  stage: string
  value?: number
  notes?: string
}

// Map portal lead-source values to human-readable labels so GHL attribution
// reports stay clean (otherwise you get "d2d" / "home_depot" in reports).
const LEAD_SOURCE_LABELS: Record<string, string> = {
  d2d: 'Door to Door',
  home_depot: 'Home Depot',
  web_form: 'Web Form',
  referral: 'Referral',
  phone: 'Phone Call',
  other: 'Other',
}

function normalizePhone(raw: string | undefined): string | undefined {
  if (!raw) return undefined
  const digits = raw.replace(/\D/g, '')
  if (!digits) return undefined
  if (digits.length === 10) return `+1${digits}`
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`
  return `+${digits}`
}

// GHL's contact create response has varied over API versions — normalize it.
function extractContactId(ghlResponse: unknown): string | null {
  if (!ghlResponse || typeof ghlResponse !== 'object') return null
  const obj = ghlResponse as Record<string, unknown>
  if (obj.contact && typeof obj.contact === 'object') {
    const id = (obj.contact as Record<string, unknown>).id
    if (typeof id === 'string') return id
  }
  if (typeof obj.id === 'string') return obj.id
  if (typeof obj.contactId === 'string') return obj.contactId
  return null
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

    // User-scoped client for identity verification.
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

    // Service-role client for DB writes — bypasses RLS so non-admin reps can
    // still record their own leads in the portal's leads table.
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const adminSupabase = serviceRoleKey
      ? createClient(Deno.env.get('SUPABASE_URL')!, serviceRoleKey)
      : null

    const ghlApiKey = Deno.env.get('GHL_API_KEY')
    if (!ghlApiKey) {
      return new Response(
        JSON.stringify({
          configured: false,
          message: 'GoHighLevel API key not configured. Please add it in Settings > Integrations.'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const body = await req.json()

    // Action resolution: prefer body.action (how the client sends it now),
    // fall back to the URL path for back compat with any older callers.
    const url = new URL(req.url)
    const pathAction = url.pathname.split('/').pop()
    const action =
      (typeof body?.action === 'string' && body.action) ||
      (pathAction && pathAction !== 'ghl-push' ? pathAction : undefined)

    let result: any

    switch (action) {
      case 'create-lead':
        result = await createLead(ghlApiKey, body as LeadPayload, userId, adminSupabase)
        break
      case 'update-deal':
        result = await updateDeal(ghlApiKey, body as DealUpdatePayload, adminSupabase)
        break
      case 'add-note':
        result = await addNote(ghlApiKey, body)
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
    console.error('GHL Push Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function createLead(
  apiKey: string,
  payload: LeadPayload,
  userId: string,
  adminSupabase: ReturnType<typeof createClient> | null,
) {
  const ghlLocationId = Deno.env.get('GHL_LOCATION_ID')
  if (!ghlLocationId) {
    throw new Error('GHL_LOCATION_ID is not configured')
  }

  const sourceLabel = payload.leadSource
    ? LEAD_SOURCE_LABELS[payload.leadSource] ?? payload.leadSource
    : 'Portal'

  const normalizedPhone = normalizePhone(payload.phone)

  const ghlPayload = {
    locationId: ghlLocationId,
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email || undefined,
    phone: normalizedPhone,
    address1: payload.address || undefined,
    source: sourceLabel,
    tags: ['portal-created', payload.leadSource || 'unspecified'],
    customFields: payload.notes
      ? [{ key: 'notes', value: payload.notes }]
      : undefined,
  }

  const response = await fetch(`https://services.leadconnectorhq.com/contacts/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28',
    },
    body: JSON.stringify(ghlPayload),
  })

  const responseText = await response.text()

  if (!response.ok) {
    console.error('GHL create contact failed', { status: response.status, body: responseText })
    throw new Error(`GHL API Error (${response.status}): ${responseText}`)
  }

  let ghlContact: unknown
  try {
    ghlContact = JSON.parse(responseText)
  } catch {
    ghlContact = { raw: responseText }
  }

  const externalId = extractContactId(ghlContact)
  console.log('GHL contact created', { externalId, source: sourceLabel })

  // Best-effort local DB mirror. If it fails (no service-role key, schema
  // mismatch, etc.) we still consider the push successful — GHL is the
  // source of truth for the contact, and failing here would make the rep
  // think the lead didn't go through when it did.
  let localLead: unknown = null
  if (adminSupabase && externalId) {
    try {
      const { data, error } = await adminSupabase
        .from('leads')
        .insert({
          external_id: externalId,
          contact_name: `${payload.firstName} ${payload.lastName}`.trim(),
          contact_email: payload.email,
          contact_phone: normalizedPhone,
          lead_source: sourceLabel,
          assigned_to: userId,
          pipeline_stage: 'new',
        })
        .select()
        .single()

      if (error) {
        console.warn('Local leads insert failed (non-fatal):', error.message)
      } else {
        localLead = data
      }
    } catch (err) {
      console.warn('Local leads insert threw (non-fatal):', err)
    }
  } else if (!adminSupabase) {
    console.warn('SUPABASE_SERVICE_ROLE_KEY not set — skipping local leads mirror')
  }

  return { ghlContact, localLead, externalId }
}

async function updateDeal(
  apiKey: string,
  payload: DealUpdatePayload,
  adminSupabase: ReturnType<typeof createClient> | null,
) {
  const response = await fetch(`https://services.leadconnectorhq.com/opportunities/${payload.externalId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28',
    },
    body: JSON.stringify({
      pipelineStageId: payload.stage,
      monetaryValue: payload.value
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`GHL API Error: ${errorText}`)
  }

  if (adminSupabase) {
    try {
      const { error } = await adminSupabase
        .from('leads')
        .update({
          pipeline_stage: payload.stage,
          deal_value: payload.value,
          updated_at: new Date().toISOString(),
        })
        .eq('external_id', payload.externalId)
      if (error) console.warn('Local leads update failed (non-fatal):', error.message)
    } catch (err) {
      console.warn('Local leads update threw (non-fatal):', err)
    }
  }

  return await response.json()
}

async function addNote(apiKey: string, payload: any) {
  const response = await fetch(`https://services.leadconnectorhq.com/contacts/${payload.contactId}/notes`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28',
    },
    body: JSON.stringify({
      body: payload.note
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`GHL API Error: ${errorText}`)
  }

  return await response.json()
}
