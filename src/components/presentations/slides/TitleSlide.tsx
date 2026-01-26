import { motion } from 'framer-motion';
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
      {/* Decorative water droplets */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.15, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute top-[15%] right-[20%] w-4 h-4 rounded-full bg-primary"
      />
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ delay: 0.7, duration: 1 }}
        className="absolute top-[20%] right-[25%] w-2 h-2 rounded-full bg-primary"
      />
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.12, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="absolute top-[25%] left-[15%] w-3 h-3 rounded-full bg-accent"
      />

      <div className="flex flex-col items-center justify-center text-center max-w-4xl relative z-10">
        {/* Logo with glow effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative mb-12"
        >
          <div className="absolute inset-0 blur-xl bg-primary/20 rounded-full scale-150" />
          <img 
            src={logo} 
            alt="Select Source Water" 
            className="relative h-16 md:h-20 object-contain"
          />
        </motion.div>
        
        {/* Headline with stagger animation */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-6"
        >
          {headline}
        </motion.h1>
        
        {/* Animated coral underline accent */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
          className="w-32 h-1.5 bg-accent rounded-full mb-8 origin-left"
        />
        
        {/* Subtitle */}
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
            className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide"
          >
            {subtitle}
          </motion.p>
        )}
        
        {/* Footer */}
        {footer && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute bottom-8 text-sm text-muted-foreground/60 tracking-wider uppercase"
          >
            {footer}
          </motion.p>
        )}
      </div>
    </SlideFrame>
  );
}
