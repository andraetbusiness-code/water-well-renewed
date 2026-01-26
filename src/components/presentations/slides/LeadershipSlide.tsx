import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { SlideFrame } from '../SlideFrame';

interface LeadershipSlideProps {
  name: string;
  responsibilities: string[];
}

export function LeadershipSlide({ name, responsibilities }: LeadershipSlideProps) {
  return (
    <SlideFrame backgroundType="cream">
      {/* Decorative accent shape */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.08, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-[120%] bg-primary rounded-l-[100px]"
      />

      <div className="flex flex-col items-start w-full max-w-3xl relative z-10">
        {/* Section label */}
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium text-primary tracking-wider uppercase mb-4"
        >
          Leadership Ownership
        </motion.span>
        
        {/* Name with coral underline */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-5xl md:text-6xl text-foreground mb-2"
        >
          {name}
        </motion.h2>
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="w-24 h-1.5 bg-accent rounded-full mb-12 origin-left"
        />
        
        {/* Responsibilities with stagger */}
        <ul className="space-y-5">
          {responsibilities.map((responsibility, index) => (
            <motion.li 
              key={index} 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                <ChevronRight className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl md:text-2xl text-foreground/90 leading-relaxed">
                {responsibility}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </SlideFrame>
  );
}
