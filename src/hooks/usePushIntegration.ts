import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface LeadPayload {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  leadSource?: string;
  notes?: string;
}

interface ActivityPayload {
  activityType: string;
  points?: number;
  notes?: string;
}

interface JobPayload {
  customerName: string;
  phone: string;
  address: string;
  jobType: string;
  scheduledDate: string;
  scheduledTime: string;
  notes?: string;
}

interface DealUpdatePayload {
  externalId: string;
  stage: string;
  value?: number;
}

async function callPushFunction(functionName: string, action: string, payload: any) {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    throw new Error('Not authenticated');
  }

  const response = await supabase.functions.invoke(functionName, {
    body: payload,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  // Check if integration is not configured
  if (response.data?.configured === false) {
    return { configured: false, message: response.data.message };
  }

  return response.data;
}

export function useCreateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: LeadPayload) => {
      return callPushFunction('ghl-push', 'create-lead', payload);
    },
    onSuccess: (data) => {
      if (data.configured === false) {
        toast.warning('GoHighLevel not connected', {
          description: 'Lead saved locally. Connect GHL in Settings to sync.'
        });
      } else {
        toast.success('Lead created successfully!');
        queryClient.invalidateQueries({ queryKey: ['leads'] });
        queryClient.invalidateQueries({ queryKey: ['pipeline'] });
      }
    },
    onError: (error: Error) => {
      toast.error('Failed to create lead', { description: error.message });
    }
  });
}

export function useUpdateDeal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: DealUpdatePayload) => {
      return callPushFunction('ghl-push', 'update-deal', payload);
    },
    onSuccess: (data) => {
      if (data.configured === false) {
        toast.warning('GoHighLevel not connected');
      } else {
        toast.success('Deal updated!');
        queryClient.invalidateQueries({ queryKey: ['leads'] });
        queryClient.invalidateQueries({ queryKey: ['pipeline'] });
      }
    },
    onError: (error: Error) => {
      toast.error('Failed to update deal', { description: error.message });
    }
  });
}

export function useLogActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ActivityPayload) => {
      return callPushFunction('enzy-push', 'log-activity', payload);
    },
    onSuccess: (data) => {
      if (data.configured === false) {
        toast.warning('Enzy not connected', {
          description: 'Activity logged locally. Connect Enzy in Settings to sync.'
        });
      } else {
        toast.success('Activity logged!');
        queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
        queryClient.invalidateQueries({ queryKey: ['kpi'] });
      }
    },
    onError: (error: Error) => {
      toast.error('Failed to log activity', { description: error.message });
    }
  });
}

export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: JobPayload) => {
      return callPushFunction('housecall-push', 'create-job', payload);
    },
    onSuccess: (data) => {
      if (data.configured === false) {
        toast.warning('Housecall Pro not connected', {
          description: 'Job saved locally. Connect Housecall Pro in Settings to sync.'
        });
      } else {
        toast.success('Job scheduled!');
        queryClient.invalidateQueries({ queryKey: ['jobs'] });
      }
    },
    onError: (error: Error) => {
      toast.error('Failed to create job', { description: error.message });
    }
  });
}

export function useUpdateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { externalId: string; status: string; completedAt?: string; revenue?: number }) => {
      return callPushFunction('housecall-push', 'update-job', payload);
    },
    onSuccess: (data) => {
      if (data.configured === false) {
        toast.warning('Housecall Pro not connected');
      } else {
        toast.success('Job updated!');
        queryClient.invalidateQueries({ queryKey: ['jobs'] });
      }
    },
    onError: (error: Error) => {
      toast.error('Failed to update job', { description: error.message });
    }
  });
}
