-- Create enum for presentation categories
CREATE TYPE public.presentation_category AS ENUM ('training', 'marketing', 'internal');

-- Create enum for slide types
CREATE TYPE public.slide_type AS ENUM ('title', 'purpose', 'sector-overview', 'sector-detail', 'leadership', 'quote');

-- Create enum for background types
CREATE TYPE public.slide_background_type AS ENUM ('cream', 'teal', 'white', 'image');

-- Create presentations table
CREATE TABLE public.presentations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  category presentation_category NOT NULL DEFAULT 'internal',
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create slides table
CREATE TABLE public.slides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  presentation_id UUID NOT NULL REFERENCES public.presentations(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  slide_type slide_type NOT NULL,
  title TEXT,
  content JSONB NOT NULL DEFAULT '{}',
  speaker_notes TEXT,
  background_type slide_background_type NOT NULL DEFAULT 'cream',
  background_value TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index for slide ordering
CREATE INDEX idx_slides_presentation_order ON public.slides(presentation_id, order_index);

-- Enable RLS
ALTER TABLE public.presentations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.slides ENABLE ROW LEVEL SECURITY;

-- Presentations RLS policies
-- Anyone can view public presentations
CREATE POLICY "Anyone can view public presentations"
ON public.presentations
FOR SELECT
USING (is_public = true);

-- Authenticated users can view internal presentations
CREATE POLICY "Authenticated can view internal presentations"
ON public.presentations
FOR SELECT
TO authenticated
USING (is_public = false);

-- Only admins can insert presentations
CREATE POLICY "Admins can insert presentations"
ON public.presentations
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Only admins can update presentations
CREATE POLICY "Admins can update presentations"
ON public.presentations
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

-- Only admins can delete presentations
CREATE POLICY "Admins can delete presentations"
ON public.presentations
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Slides RLS policies
-- Anyone can view slides of public presentations
CREATE POLICY "Anyone can view slides of public presentations"
ON public.slides
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.presentations p 
    WHERE p.id = presentation_id AND p.is_public = true
  )
);

-- Authenticated users can view slides of internal presentations
CREATE POLICY "Authenticated can view internal slides"
ON public.slides
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.presentations p 
    WHERE p.id = presentation_id AND p.is_public = false
  )
);

-- Only admins can insert slides
CREATE POLICY "Admins can insert slides"
ON public.slides
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Only admins can update slides
CREATE POLICY "Admins can update slides"
ON public.slides
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

-- Only admins can delete slides
CREATE POLICY "Admins can delete slides"
ON public.slides
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Create trigger to update updated_at on presentations
CREATE TRIGGER update_presentations_updated_at
  BEFORE UPDATE ON public.presentations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();