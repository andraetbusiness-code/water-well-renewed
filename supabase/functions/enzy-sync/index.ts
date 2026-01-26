import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify the user is authenticated
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const enzyApiKey = Deno.env.get('ENZY_API_KEY');

    // Check if API key is configured
    if (!enzyApiKey || enzyApiKey.length === 0) {
      return new Response(JSON.stringify({ 
        configured: false, 
        message: 'Enzy API key not configured. Add ENZY_API_KEY to secrets.' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create Supabase client with service role for database writes
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify user authentication using anon client
    const supabaseAnon = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } }
    });
    const token = authHeader.replace('Bearer ', '');
    const { data: userData, error: authError } = await supabaseAnon.auth.getUser(token);
    if (authError || !userData?.user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    // TODO: When Enzy API is ready, implement actual sync logic here
    // For now, return a placeholder response indicating the function is ready
    
    // Example of what the sync would do:
    // 1. Fetch leaderboard data from Enzy API
    // 2. Map external user IDs to portal user IDs using external_user_mappings
    // 3. Upsert rankings into leaderboard_cache table
    // 4. Calculate KPI metrics and insert into kpi_snapshots
    
    const syncResult = {
      configured: true,
      message: 'Enzy sync function ready. Waiting for API integration.',
      timestamp: new Date().toISOString(),
      usersUpdated: 0,
      badgesSynced: 0,
    };

    // Update the integration record
    const { error: updateError } = await supabase
      .from('integrations')
      .update({ 
        last_sync_at: new Date().toISOString(),
        last_error: null,
        is_active: true,
      })
      .eq('system', 'enzy');

    if (updateError) {
      console.error('Failed to update integration status:', updateError);
    }

    return new Response(JSON.stringify(syncResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Sync error:', error);

    // Try to update error status
    try {
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
      );
      await supabase
        .from('integrations')
        .update({ last_error: String(error) })
        .eq('system', 'enzy');
    } catch (e) {
      console.error('Failed to update error status:', e);
    }

    return new Response(JSON.stringify({ 
      error: 'Sync failed', 
      message: String(error) 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
