import { TitleSlide } from './slides/TitleSlide';
import { PurposeSlide } from './slides/PurposeSlide';
import { SectorOverviewSlide } from './slides/SectorOverviewSlide';
import { SectorDetailSlide } from './slides/SectorDetailSlide';
import { LeadershipSlide } from './slides/LeadershipSlide';
import { QuoteSlide } from './slides/QuoteSlide';
import { ImageSlide } from './slides/ImageSlide';

// Import lifestyle photos
import homeDepotImage from '@/assets/presentations/home-depot-sales.jpg';
import d2dImage from '@/assets/presentations/d2d-sales.jpg';
import digitalImage from '@/assets/presentations/digital-marketing.jpg';
import waterTestingImage from '@/assets/presentations/water-testing.jpg';

// Map sector icons to images
const sectorImages: Record<string, string> = {
  'store': homeDepotImage,
  'map-pin': d2dImage,
  'monitor': digitalImage,
  'refresh': waterTestingImage
};

export interface SlideData {
  id: string;
  slide_type: 'title' | 'purpose' | 'sector-overview' | 'sector-detail' | 'leadership' | 'quote' | 'image';
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
      const sectorIcon = slide.content.icon || 'store';
      return (
        <SectorDetailSlide 
          sectorName={slide.content.sectorName || slide.title || ''} 
          icon={sectorIcon}
          bullets={slide.content.bullets || []}
          imageSrc={sectorImages[sectorIcon]}
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
    
    case 'image':
      return (
        <ImageSlide 
          imageSrc={slide.content.imageSrc || slide.background_value || ''} 
          caption={slide.content.caption}
          overlay={slide.content.overlay !== false}
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
