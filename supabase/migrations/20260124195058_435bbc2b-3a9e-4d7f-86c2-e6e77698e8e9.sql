-- =============================================
-- EMPLOYEE PORTAL MVP - PHASE 1: FOUNDATION
-- Auth, RBAC, Teams Infrastructure
-- =============================================

-- Custom types for RBAC
CREATE TYPE public.app_role AS ENUM ('admin', 'manager', 'learner');
CREATE TYPE public.user_status AS ENUM ('active', 'invited', 'suspended');

-- =============================================
-- CORE TABLES
-- =============================================

-- Profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  status user_status DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Roles table (seeded with admin, manager, learner)
CREATE TABLE public.roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name app_role UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User roles junction (CRITICAL: separate table for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role_id UUID REFERENCES public.roles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role_id)
);

-- Teams table
CREATE TABLE public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  manager_user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team members junction
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role_id ON public.user_roles(role_id);
CREATE INDEX idx_team_members_team_id ON public.team_members(team_id);
CREATE INDEX idx_team_members_user_id ON public.team_members(user_id);
CREATE INDEX idx_teams_manager ON public.teams(manager_user_id);

-- =============================================
-- SECURITY DEFINER FUNCTIONS (prevents RLS recursion)
-- =============================================

-- Check if user has specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN public.roles r ON ur.role_id = r.id
    WHERE ur.user_id = _user_id AND r.name = _role
  )
$$;

-- Get user's highest priority role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT r.name FROM public.user_roles ur
  JOIN public.roles r ON ur.role_id = r.id
  WHERE ur.user_id = _user_id
  ORDER BY CASE r.name
    WHEN 'admin' THEN 1
    WHEN 'manager' THEN 2
    WHEN 'learner' THEN 3
  END
  LIMIT 1
$$;

-- Check if manager can access team member
CREATE OR REPLACE FUNCTION public.is_team_manager(_manager_id UUID, _member_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.teams t
    JOIN public.team_members tm ON t.id = tm.team_id
    WHERE t.manager_user_id = _manager_id AND tm.user_id = _member_id
  )
$$;

-- =============================================
-- ENABLE RLS ON ALL TABLES
-- =============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS POLICIES - PROFILES
-- =============================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (id = auth.uid());

-- Managers can view their team members' profiles
CREATE POLICY "Managers can view team profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (public.is_team_manager(auth.uid(), id));

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Admins can update any profile
CREATE POLICY "Admins can update all profiles"
ON public.profiles FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can insert profiles
CREATE POLICY "Admins can insert profiles"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Allow profile creation on signup (for triggers)
CREATE POLICY "Allow profile creation on signup"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (id = auth.uid());

-- =============================================
-- RLS POLICIES - ROLES (read-only for most)
-- =============================================

-- All authenticated users can view roles
CREATE POLICY "Authenticated users can view roles"
ON public.roles FOR SELECT
TO authenticated
USING (true);

-- =============================================
-- RLS POLICIES - USER_ROLES
-- =============================================

-- Users can view their own roles
CREATE POLICY "Users can view own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Managers can view their team members' roles
CREATE POLICY "Managers can view team roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.is_team_manager(auth.uid(), user_id));

-- Admins can view all user roles
CREATE POLICY "Admins can view all user roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can manage user roles
CREATE POLICY "Admins can insert user roles"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete user roles"
ON public.user_roles FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- RLS POLICIES - TEAMS
-- =============================================

-- Managers can view their own teams
CREATE POLICY "Managers can view own teams"
ON public.teams FOR SELECT
TO authenticated
USING (manager_user_id = auth.uid());

-- Admins can view all teams
CREATE POLICY "Admins can view all teams"
ON public.teams FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can manage teams
CREATE POLICY "Admins can insert teams"
ON public.teams FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update teams"
ON public.teams FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete teams"
ON public.teams FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- RLS POLICIES - TEAM_MEMBERS
-- =============================================

-- Users can see their own team membership
CREATE POLICY "Users can view own team membership"
ON public.team_members FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Managers can view their team members
CREATE POLICY "Managers can view team members"
ON public.team_members FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.teams t
    WHERE t.id = team_id AND t.manager_user_id = auth.uid()
  )
);

-- Admins can view all team members
CREATE POLICY "Admins can view all team members"
ON public.team_members FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can manage team members
CREATE POLICY "Admins can insert team members"
ON public.team_members FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete team members"
ON public.team_members FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- TRIGGERS
-- =============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_teams_updated_at
  BEFORE UPDATE ON public.teams
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- SEED DATA - ROLES
-- =============================================
INSERT INTO public.roles (name, description) VALUES
  ('admin', 'Full system access - manage users, content, settings'),
  ('manager', 'Team management - assign training, review submissions, coaching'),
  ('learner', 'Training access - complete courses, submit assignments, check-ins');