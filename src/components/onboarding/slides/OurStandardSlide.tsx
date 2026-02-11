import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import proInstalls from '@/assets/photos/pro-installs.png';

const standards = [
  'Intentional in how we show up.',
  'Consistent in how we operate.',
  'Accountable to the process.',
];

export function OurStandardSlide() {
  return (
    <OnboardingSlideLayout variant="teal" backgroundImage={proInstalls} overlayOpacity={0.8}>
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
        <motion.span
          className="text-sm font-semibold tracking-[0.3em] text-white/80 uppercase mb-6 drop-shadow-md"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Our Standard
        </motion.span>

        <div className="space-y-6 max-w-3xl">
          {standards.map((text, index) => (
            <motion.h2
              key={index}
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
            >
              {text}
            </motion.h2>
          ))}
        </div>

        <motion.div
          className="w-24 h-1 bg-accent rounded-full mt-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
        />
      </div>
    </OnboardingSlideLayout>
  );
}
