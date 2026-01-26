import { cn } from '@/lib/utils';

interface PresentationProgressProps {
  currentSlide: number;
  totalSlides: number;
}

export function PresentationProgress({ currentSlide, totalSlides }: PresentationProgressProps) {
  const progress = ((currentSlide + 1) / totalSlides) * 100;
  
  return (
    <div className="absolute top-0 left-0 right-0 h-1 bg-border/30 z-50">
      <div 
        className="h-full bg-primary transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
