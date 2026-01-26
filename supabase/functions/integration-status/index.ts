import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface IntegrationStatus {
  housecall_pro: { configured: boolean; active: boolean; lastSync: string | null; error: string | null };
  enzy: { configured: boolean; active: boolean; lastSync: string | null; error: string | null };
  ghl: { configured: boolean; active: boolean; lastSync: string | null; error: string | null };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify the user is authenticated and is an admin
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Verify user authentication
    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabase.auth.getUser(token);
    if (claimsError || !claimsData?.user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    // Check if API keys are configured in secrets
    const housecallKey = Deno.env.get('HOUSECALL_PRO_API_KEY');
    const enzyKey = Deno.env.get('ENZY_API_KEY');
    const ghlKey = Deno.env.get('GHL_API_KEY');

    // Get integration status from database
    const { data: integrations, error: dbError } = await supabase
      .from('integrations')
      .select('*');

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(JSON.stringify({ error: 'Failed to fetch integrations' }), { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    // Map database records to status
    const getIntegrationData = (system: string) => {
      const record = integrations?.find(i => i.system === system);
      return {
        active: record?.is_active ?? false,
        lastSync: record?.last_sync_at ?? null,
        error: record?.last_error ?? null,
      };
    };

    const status: IntegrationStatus = {
      housecall_pro: {
        configured: !!housecallKey && housecallKey.length > 0,
        ...getIntegrationData('housecall_pro'),
      },
      enzy: {
        configured: !!enzyKey && enzyKey.length > 0,
        ...getIntegrationData('enzy'),
      },
      ghl: {
        configured: !!ghlKey && ghlKey.length > 0,
        ...getIntegrationData('ghl'),
      },
    };

    return new Response(JSON.stringify(status), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
