import { TitleSlide } from './slides/TitleSlide';
import { PurposeSlide } from './slides/PurposeSlide';
import { SectorOverviewSlide } from './slides/SectorOverviewSlide';
import { SectorDetailSlide } from './slides/SectorDetailSlide';
import { LeadershipSlide } from './slides/LeadershipSlide';
import { QuoteSlide } from './slides/QuoteSlide';

export interface SlideData {
  id: string;
  slide_type: 'title' | 'purpose' | 'sector-overview' | 'sector-detail' | 'leadership' | 'quote';
  title?: string;
  content: Record<string, any>;
  speaker_notes?: string;
  background_type?: 'cream' | 'teal' | 'white' | 'image';
  background_value?: string;
}

interface SlideRendererProps {
  slide: SlideData;
}

export function SlideRenderer({ slide }: SlideRendererProps) {
  switch (slide.slide_type) {
    case 'title':
      return (
        <TitleSlide 
          headline={slide.content.headline || slide.title || ''} 
          subtitle={slide.content.subtitle}
          footer={slide.content.footer}
        />
      );
    
    case 'purpose':
      return (
        <PurposeSlide 
          heading={slide.content.heading || slide.title || ''} 
          bullets={slide.content.bullets || []}
        />
      );
    
    case 'sector-overview':
      return (
        <SectorOverviewSlide 
          heading={slide.content.heading || slide.title || ''} 
          sectors={slide.content.sectors || []}
        />
      );
    
    case 'sector-detail':
      return (
        <SectorDetailSlide 
          sectorName={slide.content.sectorName || slide.title || ''} 
          icon={slide.content.icon || 'store'}
          bullets={slide.content.bullets || []}
        />
      );
    
    case 'leadership':
      return (
        <LeadershipSlide 
          name={slide.content.name || slide.title || ''} 
          responsibilities={slide.content.responsibilities || []}
        />
      );
    
    case 'quote':
      return (
        <QuoteSlide 
          heading={slide.content.heading || slide.title || ''} 
          quote={slide.content.quote || ''}
        />
      );
    
    default:
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Unknown slide type</p>
        </div>
      );
  }
}
