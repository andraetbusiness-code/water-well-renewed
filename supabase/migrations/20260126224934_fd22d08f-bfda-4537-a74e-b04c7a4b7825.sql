-- Create pending_syncs table for queuing failed push requests
CREATE TABLE public.pending_syncs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  system integration_system NOT NULL,
  action text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'failed', 'completed')),
  retry_count integer NOT NULL DEFAULT 0,
  last_attempt timestamptz,
  error_message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pending_syncs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own pending syncs"
ON public.pending_syncs FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can insert own pending syncs"
ON public.pending_syncs FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own pending syncs"
ON public.pending_syncs FOR UPDATE
USING (user_id = auth.uid());

CREATE POLICY "Admins can view all pending syncs"
ON public.pending_syncs FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all pending syncs"
ON public.pending_syncs FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete pending syncs"
ON public.pending_syncs FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Add index for efficient queries
CREATE INDEX idx_pending_syncs_status ON public.pending_syncs(status);
CREATE INDEX idx_pending_syncs_user_id ON public.pending_syncs(user_id);