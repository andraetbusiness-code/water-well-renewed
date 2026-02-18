
-- Create job_applications table for public career form submissions
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT,
  experience TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Anonymous users can insert (public form, no auth required)
CREATE POLICY "Anyone can submit job applications"
ON public.job_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Admins can view all applications
CREATE POLICY "Admins can view job applications"
ON public.job_applications
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update applications (change status, etc.)
CREATE POLICY "Admins can update job applications"
ON public.job_applications
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete applications
CREATE POLICY "Admins can delete job applications"
ON public.job_applications
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));
