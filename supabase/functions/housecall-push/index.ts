import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface JobPayload {
  customerName: string
  phone: string
  address: string
  jobType: string
  scheduledDate: string
  scheduledTime: string
  notes?: string
}

interface JobUpdatePayload {
  externalId: string
  status: string
  completedAt?: string
  revenue?: number
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

    // Service-role client for DB writes — bypasses admin-only RLS on jobs.
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const adminSupabase = serviceRoleKey
      ? createClient(Deno.env.get('SUPABASE_URL')!, serviceRoleKey)
      : supabase

    // Check if Housecall Pro API key is configured
    const hcpApiKey = Deno.env.get('HOUSECALL_PRO_API_KEY')
    if (!hcpApiKey) {
      return new Response(
        JSON.stringify({
          configured: false,
          message: 'Housecall Pro API key not configured. Please add it in Settings > Integrations.'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const body = await req.json()

    // Action resolution: prefer body.action, fall back to URL for back compat.
    const url = new URL(req.url)
    const pathAction = url.pathname.split('/').pop()
    const action =
      (typeof body?.action === 'string' && body.action) ||
      (pathAction && pathAction !== 'housecall-push' ? pathAction : undefined)

    let result: any

    switch (action) {
      case 'create-job':
        result = await createJob(hcpApiKey, body as JobPayload, userId, adminSupabase)
        break
      case 'update-job':
        result = await updateJob(hcpApiKey, body as JobUpdatePayload, adminSupabase)
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
    console.error('Housecall Pro Push Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function createJob(apiKey: string, payload: JobPayload, userId: string, supabase: any) {
  // Combine date and time
  const scheduledAt = new Date(`${payload.scheduledDate}T${payload.scheduledTime}`)

  // Create customer first (or find existing)
  const customerResponse = await fetch(`https://api.housecallpro.com/customers`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      first_name: payload.customerName.split(' ')[0],
      last_name: payload.customerName.split(' ').slice(1).join(' ') || '',
      phone_numbers: [{ number: payload.phone, type: 'mobile' }],
      addresses: [{ 
        street: payload.address, 
        type: 'service' 
      }]
    })
  })

  let customerId: string

  if (customerResponse.ok) {
    const customer = await customerResponse.json()
    customerId = customer.id
  } else {
    // Customer might already exist, try to search
    const searchResponse = await fetch(`https://api.housecallpro.com/customers?phone=${encodeURIComponent(payload.phone)}`, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    })
    
    if (searchResponse.ok) {
      const customers = await searchResponse.json()
      if (customers.customers?.length > 0) {
        customerId = customers.customers[0].id
      } else {
        throw new Error('Failed to create or find customer')
      }
    } else {
      throw new Error('Failed to create customer')
    }
  }

  // Create the job
  const jobResponse = await fetch(`https://api.housecallpro.com/jobs`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customer_id: customerId,
      scheduled_start: scheduledAt.toISOString(),
      scheduled_end: new Date(scheduledAt.getTime() + 2 * 60 * 60 * 1000).toISOString(), // 2 hour window
      job_type: payload.jobType,
      notes: payload.notes
    })
  })

  if (!jobResponse.ok) {
    const errorText = await jobResponse.text()
    throw new Error(`Housecall Pro API Error: ${errorText}`)
  }

  const hcpJob = await jobResponse.json()

  // Best-effort local mirror. If this fails, Housecall Pro is the source of
  // truth and we still return success so the rep sees "Job scheduled!".
  let localJob: unknown = null
  try {
    const { data, error } = await supabase
      .from('jobs')
      .insert({
        external_id: hcpJob.id,
        customer_name: payload.customerName,
        job_type: payload.jobType,
        scheduled_at: scheduledAt.toISOString(),
        status: 'scheduled',
        assigned_to: userId,
      })
      .select()
      .single()
    if (error) {
      console.warn('Local jobs insert failed (non-fatal):', error.message)
    } else {
      localJob = data
    }
  } catch (err) {
    console.warn('Local jobs insert threw (non-fatal):', err)
  }

  return { hcpJob, localJob }
}

async function updateJob(apiKey: string, payload: JobUpdatePayload, supabase: any) {
  // Update job status in Housecall Pro
  const response = await fetch(`https://api.housecallpro.com/jobs/${payload.externalId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      work_status: payload.status
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Housecall Pro API Error: ${errorText}`)
  }

  // Update local jobs table
  const updateData: any = { 
    status: payload.status
  }
  
  if (payload.completedAt) {
    updateData.completed_at = payload.completedAt
  }
  
  if (payload.revenue) {
    updateData.revenue = payload.revenue
  }

  try {
    const { error } = await supabase
      .from('jobs')
      .update(updateData)
      .eq('external_id', payload.externalId)
    if (error) console.warn('Local jobs update failed (non-fatal):', error.message)
  } catch (err) {
    console.warn('Local jobs update threw (non-fatal):', err)
  }

  return await response.json()
}
