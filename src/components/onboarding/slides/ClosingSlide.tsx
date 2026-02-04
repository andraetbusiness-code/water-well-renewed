import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import logo from '@/assets/logo.png';
import heroImage from '@/assets/hero-water.jpg';

export function ClosingSlide() {
  return (
    <OnboardingSlideLayout
      variant="teal"
      backgroundImage={heroImage}
      overlayOpacity={0.75}
    >
      <div className="flex flex-col items-center justify-center text-center min-h-[80vh]">
        <motion.h2
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-8 max-w-4xl leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          We don't hire everyone.
          <br />
          <span className="text-accent">We build winners.</span>
        </motion.h2>

        <motion.div
          className="w-24 h-1 bg-accent rounded-full mb-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />

        <motion.img
          src={logo}
          alt="Select Source Water"
          className="h-12 md:h-14 object-contain opacity-90"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.9 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
      </div>
    </OnboardingSlideLayout>
  );
}
