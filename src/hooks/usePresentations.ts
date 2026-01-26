import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Presentation {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: 'training' | 'marketing' | 'internal';
  is_public: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Slide {
  id: string;
  presentation_id: string;
  order_index: number;
  slide_type: 'title' | 'purpose' | 'sector-overview' | 'sector-detail' | 'leadership' | 'quote';
  title: string | null;
  content: Record<string, any>;
  speaker_notes: string | null;
  background_type: 'cream' | 'teal' | 'white' | 'image';
  background_value: string | null;
  created_at: string;
}

export function usePresentation(slug: string) {
  return useQuery({
    queryKey: ['presentation', slug],
    queryFn: async () => {
      // First get the presentation
      const { data: presentation, error: presError } = await supabase
        .from('presentations')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      
      if (presError) throw presError;
      if (!presentation) throw new Error('Presentation not found');
      
      // Then get all slides ordered by order_index
      const { data: slides, error: slidesError } = await supabase
        .from('slides')
        .select('*')
        .eq('presentation_id', presentation.id)
        .order('order_index', { ascending: true });
      
      if (slidesError) throw slidesError;
      
      return {
        presentation: presentation as Presentation,
        slides: (slides || []) as Slide[]
      };
    },
    enabled: !!slug
  });
}

export function usePresentations(category?: 'training' | 'marketing' | 'internal') {
  return useQuery({
    queryKey: ['presentations', category],
    queryFn: async () => {
      let query = supabase
        .from('presentations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (category) {
        query = query.eq('category', category);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return (data || []) as Presentation[];
    }
  });
}
