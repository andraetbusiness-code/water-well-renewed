import { Check } from 'lucide-react';
import { SlideFrame } from '../SlideFrame';

interface PurposeSlideProps {
  heading: string;
  bullets: string[];
}

export function PurposeSlide({ heading, bullets }: PurposeSlideProps) {
  return (
    <SlideFrame backgroundType="cream">
      <div className="flex flex-col items-start max-w-3xl w-full">
        {/* Section label */}
        <span className="text-sm font-medium text-primary tracking-wider uppercase mb-4">
          Purpose & Outcome
        </span>
        
        {/* Heading */}
        <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-12">
          {heading}
        </h2>
        
        {/* Bullet points */}
        <ul className="space-y-6">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                <Check className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl md:text-2xl text-foreground/90 leading-relaxed">
                {bullet}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </SlideFrame>
  );
}
