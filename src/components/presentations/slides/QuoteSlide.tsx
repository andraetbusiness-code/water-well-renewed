import { motion } from 'framer-motion';
import { SlideFrame } from '../SlideFrame';
import { Quote } from 'lucide-react';

interface QuoteSlideProps {
  heading: string;
  quote: string;
}

export function QuoteSlide({ heading, quote }: QuoteSlideProps) {
  return (
    <SlideFrame backgroundType="cream">
      {/* Large decorative background quote mark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.03, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute left-[10%] top-[20%]"
      >
        <Quote className="w-64 h-64 text-primary rotate-180" />
      </motion.div>

      <div className="flex flex-col items-center justify-center text-center max-w-3xl relative z-10">
        {/* Section label */}
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium text-primary tracking-wider uppercase mb-4"
        >
          Assignment
        </motion.span>
        
        {/* Heading */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl text-foreground mb-12"
        >
          {heading}
        </motion.h2>
        
        {/* Quote with decorative marks */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative"
        >
          {/* Opening quote mark */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Quote className="absolute -top-6 -left-8 w-12 h-12 text-accent/40 rotate-180" />
          </motion.div>
          
          <p className="text-2xl md:text-3xl text-foreground/80 italic leading-relaxed px-8">
            {quote}
          </p>
          
          {/* Closing quote mark */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Quote className="absolute -bottom-6 -right-8 w-12 h-12 text-accent/40" />
          </motion.div>
        </motion.div>
        
        {/* Coral accent line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="w-24 h-1 bg-accent rounded-full mt-12 origin-center"
        />
      </div>
    </SlideFrame>
  );
}
