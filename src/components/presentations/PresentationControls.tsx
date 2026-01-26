import { ChevronLeft, ChevronRight, Maximize, Minimize, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PresentationControlsProps {
  currentSlide: number;
  totalSlides: number;
  isFullscreen: boolean;
  showNotes: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onToggleFullscreen: () => void;
  onToggleNotes: () => void;
}

export function PresentationControls({
  currentSlide,
  totalSlides,
  isFullscreen,
  showNotes,
  onPrevious,
  onNext,
  onToggleFullscreen,
  onToggleNotes
}: PresentationControlsProps) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-card/90 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 shadow-lg">
      {/* Previous */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevious}
        disabled={currentSlide === 0}
        className="h-10 w-10 rounded-full"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      {/* Slide counter */}
      <span className="text-sm font-medium text-foreground min-w-[4rem] text-center">
        {currentSlide + 1} / {totalSlides}
      </span>
      
      {/* Next */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        disabled={currentSlide === totalSlides - 1}
        className="h-10 w-10 rounded-full"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
      
      {/* Divider */}
      <div className="w-px h-6 bg-border" />
      
      {/* Speaker notes toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleNotes}
        className={cn("h-10 w-10 rounded-full", showNotes && "bg-primary/10 text-primary")}
        title="Toggle speaker notes (S)"
      >
        <FileText className="h-5 w-5" />
      </Button>
      
      {/* Fullscreen toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleFullscreen}
        className="h-10 w-10 rounded-full"
        title="Toggle fullscreen (F)"
      >
        {isFullscreen ? (
          <Minimize className="h-5 w-5" />
        ) : (
          <Maximize className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}
