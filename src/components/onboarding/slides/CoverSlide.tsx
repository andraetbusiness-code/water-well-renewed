import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import logo from '@/assets/logo.png';
import heroImage from '@/assets/hero-water.jpg';

export function CoverSlide() {
  return (
    <OnboardingSlideLayout
      id="cover"
      variant="teal"
      backgroundImage={heroImage}
      overlayOpacity={0.7}
    >
      <div className="flex flex-col items-center justify-center text-center min-h-[80vh]">
        <motion.img
          src={logo}
          alt="Select Source Water"
          className="h-16 md:h-20 object-contain mb-12 drop-shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        />
        
        <motion.h1
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 max-w-4xl leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          You didn't join a job.
          <br />
          <span className="text-accent">You joined a standard.</span>
        </motion.h1>
        
        <motion.div
          className="w-24 h-1 bg-accent rounded-full mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        />
        
        <motion.p
          className="text-xl md:text-2xl text-white/90 font-light tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Field Rep Welcome Guide
        </motion.p>
      </div>
    </OnboardingSlideLayout>
  );
}
