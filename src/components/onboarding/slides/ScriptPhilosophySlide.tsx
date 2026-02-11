import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { Target } from 'lucide-react';

export function ScriptPhilosophySlide() {
  return (
    <OnboardingSlideLayout id="script" variant="teal">
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
        <motion.div
          className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-10"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Target className="w-10 h-10 text-white" />
        </motion.div>

        <motion.span
          className="text-sm font-semibold tracking-[0.3em] text-white/70 uppercase mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          The Script
        </motion.span>

        <motion.h2
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Consistency beats talent.
          <br />
          <span className="text-accent">Every time.</span>
        </motion.h2>

        <motion.div
          className="w-20 h-1 bg-accent rounded-full mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.4 }}
        />

        <motion.p
          className="text-lg md:text-xl text-white/80"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Same process. Every customer. Every shift.
        </motion.p>
      </div>
    </OnboardingSlideLayout>
  );
}
