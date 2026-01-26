import { User, Briefcase, Target, Users, Zap, ChevronRight } from 'lucide-react';
import { SlideFrame } from '../SlideFrame';

interface LeadershipSlideProps {
  name: string;
  responsibilities: string[];
}

export function LeadershipSlide({ name, responsibilities }: LeadershipSlideProps) {
  return (
    <SlideFrame backgroundType="white">
      <div className="flex flex-col items-start w-full max-w-3xl">
        {/* Section label */}
        <span className="text-sm font-medium text-primary tracking-wider uppercase mb-4">
          Leadership Ownership
        </span>
        
        {/* Name with coral underline */}
        <h2 className="font-serif text-5xl md:text-6xl text-foreground mb-2">
          {name}
        </h2>
        <div className="w-24 h-1.5 bg-accent rounded-full mb-12" />
        
        {/* Responsibilities */}
        <ul className="space-y-5">
          {responsibilities.map((responsibility, index) => (
            <li key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                <ChevronRight className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl md:text-2xl text-foreground/90 leading-relaxed">
                {responsibility}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </SlideFrame>
  );
}
