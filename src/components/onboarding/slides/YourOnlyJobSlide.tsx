import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { MessageCircle, UserCheck, Calendar, Clock } from 'lucide-react';

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
    title: 'Lock the Time',
    description: 'Confirm before leaving',
  },
];

export function YourOnlyJobSlide() {
  return (
    <OnboardingSlideLayout variant="light">
      <div className="min-h-[80vh] flex flex-col justify-center">
        <motion.h2
          className="font-serif text-4xl md:text-5xl text-foreground mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Your Only Job
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-center mb-12 max-w-xl mx-auto"
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
              className="relative p-6 rounded-2xl bg-card border border-border text-center"
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
              <h3 className="font-serif text-lg text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </OnboardingSlideLayout>
  );
}
