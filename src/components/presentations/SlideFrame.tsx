import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SlideFrameProps {
  children: ReactNode;
  backgroundType?: 'cream' | 'teal' | 'white' | 'image';
  backgroundValue?: string;
  className?: string;
}

export function SlideFrame({ 
  children, 
  backgroundType = 'cream',
  backgroundValue,
  className 
}: SlideFrameProps) {
  const backgroundClasses = {
    cream: 'bg-background',
    white: 'bg-white',
    teal: 'bg-primary text-primary-foreground',
    image: ''
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'relative w-full h-full flex flex-col items-center justify-center overflow-hidden',
        backgroundClasses[backgroundType],
        className
      )}
      style={backgroundType === 'image' && backgroundValue ? {
        backgroundImage: `url(${backgroundValue})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      } : undefined}
    >
      {/* Organic blob decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-[40%_60%_70%_30%/40%_70%_30%_60%] blur-2xl translate-y-1/4 -translate-x-1/4 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-12 py-16">
        {children}
      </div>
    </motion.div>
  );
}
