-- Create enum for integration systems
CREATE TYPE public.integration_system AS ENUM ('housecall_pro', 'enzy', 'ghl');

-- Create integrations table for storing connection settings
CREATE TABLE public.integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  system integration_system NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT false,
  config JSONB NOT NULL DEFAULT '{}',
  last_sync_at TIMESTAMPTZ,
  last_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create external_user_mappings table to link portal users to external system IDs
CREATE TABLE public.external_user_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  system integration_system NOT NULL,
  external_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, system)
);

-- Create kpi_snapshots table for unified daily metrics
CREATE TABLE public.kpi_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  snapshot_date DATE NOT NULL,
  source TEXT NOT NULL, -- 'housecall', 'enzy', 'ghl', 'manual'
  metrics JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, snapshot_date, source)
);

-- Create leaderboard_cache table for Enzy rankings
CREATE TABLE public.leaderboard_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  period TEXT NOT NULL, -- 'daily', 'weekly', 'monthly', 'all_time'
  rank INTEGER,
  score DECIMAL(10,2),
  badges JSONB DEFAULT '[]',
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, period)
);

-- Create leads table for GHL pipeline data
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id TEXT UNIQUE NOT NULL,
  assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  pipeline_stage TEXT NOT NULL DEFAULT 'new',
  lead_source TEXT,
  deal_value DECIMAL(10,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  synced_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create jobs table for Housecall Pro data
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id TEXT UNIQUE NOT NULL,
  assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled', -- 'scheduled', 'in_progress', 'completed', 'cancelled'
  job_type TEXT,
  revenue DECIMAL(10,2),
  scheduled_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  synced_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.external_user_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kpi_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Integrations: Only admins can manage
CREATE POLICY "Admins can view integrations"
  ON public.integrations FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert integrations"
  ON public.integrations FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update integrations"
  ON public.integrations FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete integrations"
  ON public.integrations FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- External User Mappings: Admins can manage, users can view own
CREATE POLICY "Admins can view all external mappings"
  ON public.external_user_mappings FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view own external mappings"
  ON public.external_user_mappings FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Admins can insert external mappings"
  ON public.external_user_mappings FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update external mappings"
  ON public.external_user_mappings FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete external mappings"
  ON public.external_user_mappings FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- KPI Snapshots: Users see own, managers see team, admins see all
CREATE POLICY "Users can view own kpi snapshots"
  ON public.kpi_snapshots FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Managers can view team kpi snapshots"
  ON public.kpi_snapshots FOR SELECT
  USING (public.is_team_manager(auth.uid(), user_id));

CREATE POLICY "Admins can view all kpi snapshots"
  ON public.kpi_snapshots FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert kpi snapshots"
  ON public.kpi_snapshots FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update kpi snapshots"
  ON public.kpi_snapshots FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete kpi snapshots"
  ON public.kpi_snapshots FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Leaderboard Cache: All authenticated users can view
CREATE POLICY "Authenticated users can view leaderboard"
  ON public.leaderboard_cache FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert leaderboard cache"
  ON public.leaderboard_cache FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update leaderboard cache"
  ON public.leaderboard_cache FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete leaderboard cache"
  ON public.leaderboard_cache FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Leads: Users see assigned, managers see team, admins see all
CREATE POLICY "Users can view own assigned leads"
  ON public.leads FOR SELECT
  USING (assigned_to = auth.uid());

CREATE POLICY "Managers can view team leads"
  ON public.leads FOR SELECT
  USING (public.is_team_manager(auth.uid(), assigned_to));

CREATE POLICY "Admins can view all leads"
  ON public.leads FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert leads"
  ON public.leads FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update leads"
  ON public.leads FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can update own assigned leads"
  ON public.leads FOR UPDATE
  USING (assigned_to = auth.uid());

CREATE POLICY "Admins can delete leads"
  ON public.leads FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Jobs: Users see assigned, managers see team, admins see all
CREATE POLICY "Users can view own assigned jobs"
  ON public.jobs FOR SELECT
  USING (assigned_to = auth.uid());

CREATE POLICY "Managers can view team jobs"
  ON public.jobs FOR SELECT
  USING (public.is_team_manager(auth.uid(), assigned_to));

CREATE POLICY "Admins can view all jobs"
  ON public.jobs FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert jobs"
  ON public.jobs FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update jobs"
  ON public.jobs FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete jobs"
  ON public.jobs FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Add updated_at trigger for integrations table
CREATE TRIGGER update_integrations_updated_at
  BEFORE UPDATE ON public.integrations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add updated_at trigger for leads table
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default integration records (inactive)
INSERT INTO public.integrations (system, is_active, config)
VALUES 
  ('housecall_pro', false, '{"sync_frequency": "15min"}'),
  ('enzy', false, '{"sync_frequency": "15min"}'),
  ('ghl', false, '{"sync_frequency": "15min"}');