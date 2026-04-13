// Public edge function that receives submissions from the Free Water Test
// marketing form and pushes them into GoHighLevel as a contact.
//
// This function is intentionally public (verify_jwt = false in config.toml)
// because it's called from the unauthenticated marketing site. Keep the
// surface area narrow: validate inputs, honeypot check, no DB writes.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface FreeWaterTestLead {
  name: string
  phone: string
  email?: string
  address: string
  message?: string
  // Honeypot: real users leave this empty; bots fill it.
  website?: string
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function splitName(full: string): { firstName: string; lastName: string } {
  const trimmed = full.trim().replace(/\s+/g, ' ')
  const parts = trimmed.split(' ')
  if (parts.length === 1) return { firstName: parts[0], lastName: '' }
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') }
}

function normalizePhone(raw: string): string {
  // Keep digits only; GHL accepts E.164 but tolerates raw digits for US numbers.
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 10) return `+1${digits}`
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`
  return digits ? `+${digits}` : ''
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405)
  }

  let body: FreeWaterTestLead
  try {
    body = await req.json()
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400)
  }

  // Honeypot — silently succeed so bots think it worked.
  if (body.website && body.website.trim() !== '') {
    console.log('free-water-test-lead: honeypot tripped, ignoring submission')
    return jsonResponse({ success: true, skipped: true })
  }

  // Validate required fields.
  const name = (body.name ?? '').trim()
  const phone = (body.phone ?? '').trim()
  const address = (body.address ?? '').trim()

  if (!name || name.length < 2 || name.length > 120) {
    return jsonResponse({ error: 'Please provide a valid name.' }, 400)
  }
  const normalizedPhone = normalizePhone(phone)
  if (!normalizedPhone || normalizedPhone.replace(/\D/g, '').length < 10) {
    return jsonResponse({ error: 'Please provide a valid phone number.' }, 400)
  }
  if (!address || address.length < 3 || address.length > 250) {
    return jsonResponse({ error: 'Please provide a valid address.' }, 400)
  }
  if (body.email && body.email.length > 0) {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)
    if (!emailOk) return jsonResponse({ error: 'Please provide a valid email.' }, 400)
  }
  if (body.message && body.message.length > 2000) {
    return jsonResponse({ error: 'Message is too long.' }, 400)
  }

  const ghlApiKey = Deno.env.get('GHL_API_KEY')
  const ghlLocationId = Deno.env.get('GHL_LOCATION_ID')

  if (!ghlApiKey || !ghlLocationId) {
    console.error('free-water-test-lead: GHL secrets missing', {
      hasKey: !!ghlApiKey,
      hasLocation: !!ghlLocationId,
    })
    return jsonResponse(
      {
        error:
          'Lead push is not fully configured. Please contact the site owner.',
      },
      503,
    )
  }

  const { firstName, lastName } = splitName(name)

  const contactPayload = {
    locationId: ghlLocationId,
    firstName,
    lastName,
    email: body.email || undefined,
    phone: normalizedPhone,
    address1: address,
    source: 'Website - Free Water Test',
    tags: ['free-water-test', 'website-lead'],
    customFields: body.message
      ? [{ key: 'notes', value: body.message }]
      : undefined,
  }

  try {
    const ghlResponse = await fetch(
      'https://services.leadconnectorhq.com/contacts/',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ghlApiKey}`,
          'Content-Type': 'application/json',
          Version: '2021-07-28',
        },
        body: JSON.stringify(contactPayload),
      },
    )

    const responseText = await ghlResponse.text()

    if (!ghlResponse.ok) {
      console.error('free-water-test-lead: GHL API error', {
        status: ghlResponse.status,
        body: responseText,
      })
      return jsonResponse(
        { error: 'Unable to submit lead right now. Please call us instead.' },
        502,
      )
    }

    let ghlData: unknown
    try {
      ghlData = JSON.parse(responseText)
    } catch {
      ghlData = { raw: responseText }
    }

    console.log('free-water-test-lead: pushed to GHL', {
      name: `${firstName} ${lastName}`.trim(),
      phone: normalizedPhone,
    })

    return jsonResponse({ success: true, contact: ghlData })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('free-water-test-lead: unexpected error', message)
    return jsonResponse(
      { error: 'Unable to submit lead right now. Please call us instead.' },
      500,
    )
  }
})
