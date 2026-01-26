import { motion } from 'framer-motion';
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
      <div className="flex flex-col items-center w-full max-w-4xl relative z-10">
        {/* Section label */}
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium text-primary tracking-wider uppercase mb-4"
        >
          Sectors
        </motion.span>
        
        {/* Heading */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl text-foreground mb-16 text-center"
        >
          {heading}
        </motion.h2>
        
        {/* 2x2 Grid of sector cards with stagger */}
        <div className="grid grid-cols-2 gap-6 w-full">
          {sectors.map((sector, index) => {
            const IconComponent = iconMap[sector.icon];
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.3 + index * 0.1,
                  type: 'spring',
                  stiffness: 100
                }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-card/80 backdrop-blur-sm border border-border/30 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1, type: 'spring' }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center"
                >
                  <IconComponent className="w-8 h-8 text-primary" />
                </motion.div>
                <span className="text-xl font-medium text-foreground text-center">
                  {sector.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SlideFrame>
  );
}
