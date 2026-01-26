import { Store, Users, Monitor, RefreshCw, LucideIcon } from 'lucide-react';
import { SlideFrame } from '../SlideFrame';

interface Sector {
  name: string;
  icon: 'store' | 'users' | 'monitor' | 'refresh';
}

interface SectorOverviewSlideProps {
  heading: string;
  sectors: Sector[];
}

const iconMap: Record<string, LucideIcon> = {
  store: Store,
  users: Users,
  monitor: Monitor,
  refresh: RefreshCw
};

export function SectorOverviewSlide({ heading, sectors }: SectorOverviewSlideProps) {
  return (
    <SlideFrame backgroundType="cream">
      <div className="flex flex-col items-center w-full max-w-4xl">
        {/* Section label */}
        <span className="text-sm font-medium text-primary tracking-wider uppercase mb-4">
          Sectors
        </span>
        
        {/* Heading */}
        <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-16 text-center">
          {heading}
        </h2>
        
        {/* 2x2 Grid of sector cards */}
        <div className="grid grid-cols-2 gap-6 w-full">
          {sectors.map((sector, index) => {
            const IconComponent = iconMap[sector.icon];
            return (
              <div 
                key={index}
                className="bg-card border border-border/30 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <span className="text-xl font-medium text-foreground text-center">
                  {sector.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </SlideFrame>
  );
}
