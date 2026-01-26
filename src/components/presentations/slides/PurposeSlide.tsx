import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { SlideFrame } from '../SlideFrame';

interface PurposeSlideProps {
  heading: string;
  bullets: string[];
}

export function PurposeSlide({ heading, bullets }: PurposeSlideProps) {
  return (
    <SlideFrame backgroundType="cream">
      {/* Decorative teal accent line on left */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute left-8 top-[20%] w-1 h-[60%] bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 rounded-full origin-top"
      />

      <div className="flex flex-col items-start max-w-3xl w-full relative z-10">
        {/* Section label */}
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium text-primary tracking-wider uppercase mb-4"
        >
          Purpose & Outcome
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
        
        {/* Bullet points with stagger */}
        <ul className="space-y-6">
          {bullets.map((bullet, index) => (
            <motion.li 
              key={index} 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
              className="flex items-start gap-4"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.15, type: 'spring' }}
                className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5"
              >
                <Check className="w-5 h-5 text-primary" />
              </motion.div>
              <span className="text-xl md:text-2xl text-foreground/90 leading-relaxed">
                {bullet}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </SlideFrame>
  );
}
