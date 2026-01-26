import { Store, Users, Monitor, RefreshCw, MapPin, LucideIcon, ChevronRight } from 'lucide-react';
import { SlideFrame } from '../SlideFrame';

interface SectorDetailSlideProps {
  sectorName: string;
  icon: 'store' | 'users' | 'monitor' | 'refresh' | 'map-pin';
  bullets: string[];
}

const iconMap: Record<string, LucideIcon> = {
  store: Store,
  users: Users,
  monitor: Monitor,
  refresh: RefreshCw,
  'map-pin': MapPin
};

export function SectorDetailSlide({ sectorName, icon, bullets }: SectorDetailSlideProps) {
  const IconComponent = iconMap[icon];
  
  return (
    <SlideFrame backgroundType="cream">
      <div className="flex flex-col w-full max-w-4xl">
        {/* Teal header bar */}
        <div className="bg-primary rounded-2xl p-6 mb-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <IconComponent className="w-6 h-6 text-primary-foreground" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-primary-foreground">
            {sectorName}
          </h2>
        </div>
        
        {/* Bullet points */}
        <ul className="space-y-5 pl-4">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start gap-4">
              <ChevronRight className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-xl md:text-2xl text-foreground/90 leading-relaxed">
                {bullet}
              </span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Extra organic blob for sector slides */}
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary/5 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-xl pointer-events-none" />
    </SlideFrame>
  );
}
