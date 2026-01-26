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
  const isTeal = backgroundType === 'teal';
  const isImage = backgroundType === 'image';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'relative w-full h-full flex flex-col items-center justify-center overflow-hidden',
        className
      )}
      style={isImage && backgroundValue ? {
        backgroundImage: `url(${backgroundValue})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      } : undefined}
    >
      {/* Dynamic layered background - matching website */}
      {!isImage && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Base gradient layer */}
          <div 
            className={cn(
              "absolute inset-0",
              isTeal 
                ? "bg-gradient-to-br from-primary via-primary to-primary/90" 
                : "bg-gradient-to-br from-background via-secondary/30 to-background"
            )} 
          />
          
          {/* Warm radial glow - top right */}
          <div 
            className={cn(
              "absolute -top-1/4 -right-1/4 w-[60%] h-[60%] rounded-full blur-3xl",
              isTeal ? "bg-white/10" : "bg-primary/8"
            )}
          />
          
          {/* Coral accent glow - bottom left */}
          <div 
            className={cn(
              "absolute -bottom-1/4 -left-1/4 w-[50%] h-[50%] rounded-full blur-3xl",
              isTeal ? "bg-accent/20" : "bg-accent/10"
            )}
          />
          
          {/* Center subtle glow */}
          <div 
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-3xl",
              isTeal ? "bg-white/5" : "bg-secondary/40"
            )}
          />
        </div>
      )}

      {/* Animated organic blob decorations */}
      {!isImage && (
        <>
          {/* Top-right floating blob */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: [0.9, 1.1, 0.95, 1.05, 1],
              opacity: 1 
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
            className={cn(
              "absolute top-[5%] right-[5%] w-80 h-80 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-2xl pointer-events-none",
              isTeal ? "bg-white/10" : "bg-primary/10"
            )}
          />
          
          {/* Bottom-left floating blob */}
          <motion.div 
            initial={{ scale: 1, opacity: 0 }}
            animate={{ 
              scale: [1, 0.9, 1.1, 0.95, 1],
              opacity: 1 
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: 1
            }}
            className={cn(
              "absolute bottom-[5%] left-[5%] w-64 h-64 rounded-[40%_60%_70%_30%/40%_70%_30%_60%] blur-2xl pointer-events-none",
              isTeal ? "bg-accent/25" : "bg-accent/15"
            )}
          />
          
          {/* Mid-left accent blob */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ 
              scale: [0.95, 1.05, 0.9, 1],
              opacity: 1,
              x: [0, 10, -5, 0],
              y: [0, -10, 5, 0]
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity, 
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: 2
            }}
            className={cn(
              "absolute top-[40%] left-[8%] w-48 h-48 rounded-[50%_50%_40%_60%/40%_60%_50%_50%] blur-xl pointer-events-none",
              isTeal ? "bg-primary-foreground/10" : "bg-water-medium/20"
            )}
          />
          
          {/* Top-center small accent */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.3, 0.6, 0.4, 0.5],
              scale: [1, 1.1, 0.95, 1]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: 0.5
            }}
            className={cn(
              "absolute top-[10%] left-[40%] w-32 h-32 rounded-full blur-xl pointer-events-none",
              isTeal ? "bg-white/8" : "bg-primary/8"
            )}
          />
          
          {/* Bottom-right corner glow */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              scale: [1, 1.15, 1]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
            className={cn(
              "absolute bottom-[10%] right-[15%] w-56 h-56 rounded-[70%_30%_50%_50%/50%_50%_70%_30%] blur-2xl pointer-events-none",
              isTeal ? "bg-accent/15" : "bg-earth-warm/30"
            )}
          />
        </>
      )}

      {/* Subtle grid pattern overlay */}
      {!isImage && !isTeal && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-12 py-16">
        {children}
      </div>
    </motion.div>
  );
}
