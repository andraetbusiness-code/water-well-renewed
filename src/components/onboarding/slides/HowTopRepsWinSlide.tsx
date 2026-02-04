import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { FileCheck, Repeat, Settings, MessageCircle } from 'lucide-react';

const winningHabits = [
  {
    icon: FileCheck,
    title: 'Clean Data / Clean Paperwork',
    description: 'Accurate information on every lead',
  },
  {
    icon: Repeat,
    title: 'Consistent Effort',
    description: 'Show up every day, ready to work',
  },
  {
    icon: Settings,
    title: 'Process Discipline',
    description: 'Script + qualification = results',
  },
  {
    icon: MessageCircle,
    title: 'Clear Communication',
    description: 'Confirmations + updates = higher show rates',
  },
];

export function HowTopRepsWinSlide() {
  return (
    <OnboardingSlideLayout variant="cream">
      <div className="min-h-[80vh] flex flex-col justify-center">
        <motion.h2
          className="font-serif text-4xl md:text-5xl text-foreground mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          How Top Reps Win
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          The system works when you work it the right way.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
          {winningHabits.map((habit, index) => (
            <motion.div
              key={habit.title}
              className="flex items-start gap-5 p-6 rounded-2xl bg-card border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <habit.icon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-foreground mb-1">{habit.title}</h3>
                <p className="text-sm text-muted-foreground">{habit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </OnboardingSlideLayout>
  );
}
