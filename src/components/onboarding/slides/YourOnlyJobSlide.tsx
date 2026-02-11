import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { MessageCircle, UserCheck, Calendar, Clock } from 'lucide-react';
import waterTestPhoto from '@/assets/photos/water-test.png';

const steps = [
  {
    num: '01',
    icon: MessageCircle,
    title: 'Create Rapport',
    description: 'Human, brief, confident',
  },
  {
    num: '02',
    icon: UserCheck,
    title: 'Qualify Homeowner',
    description: 'Confirm fit fast',
  },
  {
    num: '03',
    icon: Calendar,
    title: 'Book Consultation',
    description: 'Set the appointment',
  },
  {
    num: '04',
    icon: Clock,
    title: 'Get YES Confirmation',
    description: 'Watch them confirm on the spot',
  },
];

export function YourOnlyJobSlide() {
  return (
    <OnboardingSlideLayout variant="teal" backgroundImage={waterTestPhoto} overlayOpacity={0.8}>
      <div className="min-h-[80vh] flex flex-col justify-center">
        <motion.h2
          className="font-serif text-4xl md:text-5xl text-white mb-4 text-center drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Your Only Job
        </motion.h2>

        <motion.p
          className="text-white/90 text-center mb-12 max-w-xl mx-auto drop-shadow-md"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Four simple steps. Master these first.
        </motion.p>

        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto w-full">
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              className="relative p-6 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                {step.num}
              </div>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 mt-4">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-lg text-white mb-2 drop-shadow-md">{step.title}</h3>
             <p className="text-sm text-white/80 drop-shadow-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 max-w-md mx-auto rounded-xl bg-accent/10 border border-accent/30 p-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <p className="text-sm font-bold text-accent">No YES confirmation = not booked</p>
        </motion.div>
      </div>
    </OnboardingSlideLayout>
  );
}
