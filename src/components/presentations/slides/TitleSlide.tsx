import { SlideFrame } from '../SlideFrame';
import logo from '@/assets/logo.png';

interface TitleSlideProps {
  headline: string;
  subtitle?: string;
  footer?: string;
}

export function TitleSlide({ headline, subtitle, footer }: TitleSlideProps) {
  return (
    <SlideFrame backgroundType="cream">
      <div className="flex flex-col items-center justify-center text-center max-w-4xl">
        {/* Logo */}
        <img 
          src={logo} 
          alt="Select Source Water" 
          className="h-16 md:h-20 mb-12 object-contain"
        />
        
        {/* Headline */}
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
          {headline}
        </h1>
        
        {/* Coral underline accent */}
        <div className="w-32 h-1.5 bg-accent rounded-full mb-8" />
        
        {/* Subtitle */}
        {subtitle && (
          <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide">
            {subtitle}
          </p>
        )}
        
        {/* Footer */}
        {footer && (
          <p className="absolute bottom-8 text-sm text-muted-foreground/60 tracking-wider uppercase">
            {footer}
          </p>
        )}
      </div>
    </SlideFrame>
  );
}
