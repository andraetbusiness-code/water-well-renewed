import { SlideFrame } from '../SlideFrame';
import { Quote } from 'lucide-react';

interface QuoteSlideProps {
  heading: string;
  quote: string;
}

export function QuoteSlide({ heading, quote }: QuoteSlideProps) {
  return (
    <SlideFrame backgroundType="cream">
      <div className="flex flex-col items-center justify-center text-center max-w-3xl">
        {/* Section label */}
        <span className="text-sm font-medium text-primary tracking-wider uppercase mb-4">
          Assignment
        </span>
        
        {/* Heading */}
        <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-12">
          {heading}
        </h2>
        
        {/* Quote with decorative marks */}
        <div className="relative">
          {/* Opening quote mark */}
          <Quote className="absolute -top-6 -left-8 w-12 h-12 text-accent/30 rotate-180" />
          
          <p className="text-2xl md:text-3xl text-foreground/80 italic leading-relaxed px-8">
            {quote}
          </p>
          
          {/* Closing quote mark */}
          <Quote className="absolute -bottom-6 -right-8 w-12 h-12 text-accent/30" />
        </div>
        
        {/* Coral accent line */}
        <div className="w-24 h-1 bg-accent rounded-full mt-12" />
      </div>
    </SlideFrame>
  );
}
