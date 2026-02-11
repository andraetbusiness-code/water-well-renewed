import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { AlertCircle } from 'lucide-react';

export function RoleDefinitionSlide() {
  return (
    <OnboardingSlideLayout id="role" variant="dark">
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
        <motion.div
          className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-10"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <AlertCircle className="w-10 h-10 text-accent" />
        </motion.div>

        <motion.h2
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-background mb-8 max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
           You are <span className="text-accent">NOT</span> here to sell in-store or at the door.
         </motion.h2>

         <motion.div
           className="w-20 h-1 bg-accent rounded-full mb-8"
           initial={{ scaleX: 0 }}
           whileInView={{ scaleX: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.4, duration: 0.4 }}
         />

         <motion.p
           className="text-lg md:text-xl text-background/70"
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.5, duration: 0.5 }}
         >
           You book the water test and LOCK the appointment. That's it.
        </motion.p>
      </div>
    </OnboardingSlideLayout>
  );
}
