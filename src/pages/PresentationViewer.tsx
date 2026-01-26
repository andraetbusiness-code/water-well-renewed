import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePresentation } from '@/hooks/usePresentations';
import { SlideRenderer } from '@/components/presentations/SlideRenderer';
import { PresentationControls } from '@/components/presentations/PresentationControls';
import { PresentationProgress } from '@/components/presentations/PresentationProgress';
import { SpeakerNotes } from '@/components/presentations/SpeakerNotes';
import { useIsMobile } from '@/hooks/use-mobile';

export default function PresentationViewer() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  
  // Touch handling for swipe
  const touchStartX = useRef<number | null>(null);
  
  const { data, isLoading, error } = usePresentation(slug || '');
  
  const slides = data?.slides || [];
  const presentation = data?.presentation;
  const totalSlides = slides.length;
  
  // Navigation functions
  const goToNextSlide = useCallback(() => {
    setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);
  
  const goToPreviousSlide = useCallback(() => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  }, []);
  
  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          goToNextSlide();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goToPreviousSlide();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 's':
        case 'S':
          e.preventDefault();
          setShowNotes(prev => !prev);
          break;
        case 'Escape':
          if (document.fullscreenElement) {
            document.exitFullscreen();
            setIsFullscreen(false);
          }
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPreviousSlide, toggleFullscreen]);
  
  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);
  
  // Touch handling for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNextSlide();
      } else {
        goToPreviousSlide();
      }
    }
    
    touchStartX.current = null;
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  // Error state
  if (error || !presentation) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <p className="text-muted-foreground">Presentation not found</p>
        <Button variant="outline" onClick={() => navigate('/presentations')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Presentations
        </Button>
      </div>
    );
  }
  
  // No slides
  if (slides.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <p className="text-muted-foreground">This presentation has no slides yet</p>
        <Button variant="outline" onClick={() => navigate('/presentations')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Presentations
        </Button>
      </div>
    );
  }
  
  const currentSlideData = slides[currentSlide];
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-background"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress bar */}
      <PresentationProgress 
        currentSlide={currentSlide} 
        totalSlides={totalSlides} 
      />
      
      {/* Back button (non-fullscreen only) */}
      {!isFullscreen && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/presentations')}
          className="absolute top-4 left-4 z-50 h-10 w-10 rounded-full bg-card/80 backdrop-blur-sm"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      )}
      
      {/* Slide content */}
      <AnimatePresence mode="wait">
        <SlideRenderer 
          key={currentSlideData.id} 
          slide={{
            ...currentSlideData,
            content: currentSlideData.content as Record<string, any>
          }} 
        />
      </AnimatePresence>
      
      {/* Speaker notes */}
      <SpeakerNotes 
        notes={currentSlideData.speaker_notes || undefined}
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
      />
      
      {/* Controls */}
      <PresentationControls
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        isFullscreen={isFullscreen}
        showNotes={showNotes}
        onPrevious={goToPreviousSlide}
        onNext={goToNextSlide}
        onToggleFullscreen={toggleFullscreen}
        onToggleNotes={() => setShowNotes(prev => !prev)}
      />
      
      {/* Edge tap zones for mobile */}
      {isMobile && (
        <>
          <div 
            className="absolute left-0 top-0 w-1/4 h-full z-30"
            onClick={goToPreviousSlide}
          />
          <div 
            className="absolute right-0 top-0 w-1/4 h-full z-30"
            onClick={goToNextSlide}
          />
        </>
      )}
    </div>
  );
}
