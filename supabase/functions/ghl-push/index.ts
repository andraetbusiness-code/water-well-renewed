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
  leadSource?: string
  notes?: string
}

interface DealUpdatePayload {
  externalId: string
  stage: string
  value?: number
  notes?: string
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

    // Check if GHL API key is configured
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

    const url = new URL(req.url)
    const action = url.pathname.split('/').pop()
    const body = await req.json()

    let result: any

    switch (action) {
      case 'create-lead':
        result = await createLead(ghlApiKey, body as LeadPayload, userId, supabase)
        break
      case 'update-deal':
        result = await updateDeal(ghlApiKey, body as DealUpdatePayload, supabase)
        break
      case 'add-note':
        result = await addNote(ghlApiKey, body, supabase)
        break
      default:
        return new Response(
          JSON.stringify({ error: 'Unknown action' }),
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

async function createLead(apiKey: string, payload: LeadPayload, userId: string, supabase: any) {
  // GHL API endpoint for creating contacts
  const ghlLocationId = Deno.env.get('GHL_LOCATION_ID')
  
  const response = await fetch(`https://services.leadconnectorhq.com/contacts/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28',
    },
    body: JSON.stringify({
      locationId: ghlLocationId,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      source: payload.leadSource,
      tags: ['portal-created'],
      customFields: [
        { key: 'notes', value: payload.notes }
      ]
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`GHL API Error: ${errorText}`)
  }

  const ghlContact = await response.json()

  // Save to local leads table
  const { data: lead, error } = await supabase
    .from('leads')
    .insert({
      external_id: ghlContact.contact.id,
      contact_name: `${payload.firstName} ${payload.lastName}`,
      contact_email: payload.email,
      contact_phone: payload.phone,
      lead_source: payload.leadSource,
      assigned_to: userId,
      pipeline_stage: 'new'
    })
    .select()
    .single()

  if (error) throw error

  return { ghlContact, localLead: lead }
}

async function updateDeal(apiKey: string, payload: DealUpdatePayload, supabase: any) {
  // Update deal stage in GHL
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

  // Update local leads table
  const { error } = await supabase
    .from('leads')
    .update({ 
      pipeline_stage: payload.stage,
      deal_value: payload.value,
      updated_at: new Date().toISOString()
    })
    .eq('external_id', payload.externalId)

  if (error) throw error

  return await response.json()
}

async function addNote(apiKey: string, payload: any, supabase: any) {
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
