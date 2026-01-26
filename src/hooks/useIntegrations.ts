import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface IntegrationStatus {
  housecall_pro: { configured: boolean; active: boolean; lastSync: string | null; error: string | null };
  enzy: { configured: boolean; active: boolean; lastSync: string | null; error: string | null };
  ghl: { configured: boolean; active: boolean; lastSync: string | null; error: string | null };
}

export function useIntegrationStatus() {
  return useQuery({
    queryKey: ['integration-status'],
    queryFn: async (): Promise<IntegrationStatus> => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      const { data, error } = await supabase.functions.invoke('integration-status', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        throw error;
      }

      return data as IntegrationStatus;
    },
    staleTime: 30000, // Cache for 30 seconds
    retry: false,
  });
}

export function useSyncIntegration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (system: 'housecall_pro' | 'enzy' | 'ghl') => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      const functionName = system === 'housecall_pro' 
        ? 'housecall-sync' 
        : system === 'enzy' 
          ? 'enzy-sync' 
          : 'ghl-sync';

      const { data, error } = await supabase.functions.invoke(functionName, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['integration-status'] });
    },
  });
}

export function useAnyIntegrationConnected() {
  const { data: status, isLoading } = useIntegrationStatus();
  
  if (isLoading || !status) {
    return { connected: false, isLoading };
  }

  const connected = 
    (status.housecall_pro.configured && status.housecall_pro.active) ||
    (status.enzy.configured && status.enzy.active) ||
    (status.ghl.configured && status.ghl.active);

  return { connected, isLoading };
}
