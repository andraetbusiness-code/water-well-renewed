import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import logo from '@/assets/logo.png';
import crewPhoto from '@/assets/photos/crew.png';

export function WelcomeSlide() {
  return (
    <OnboardingSlideLayout id="identity" variant="teal" backgroundImage={crewPhoto} overlayOpacity={0.8}>
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
        <motion.img
          src={logo}
          alt="Select Source Water"
          className="h-14 md:h-16 object-contain mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />

         <motion.h2
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-8 max-w-3xl drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Welcome to Select Source Water
        </motion.h2>

        <motion.div
          className="w-20 h-1 bg-accent rounded-full mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.4 }}
        />

        <motion.p
          className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed drop-shadow-md"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          We move fast — but we move correctly.
          <br />
          <span className="text-white font-semibold drop-shadow-lg">
            Your professionalism protects the brand and your paycheck.
          </span>
        </motion.p>
      </div>
    </OnboardingSlideLayout>
  );
}
