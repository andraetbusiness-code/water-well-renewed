import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { BookOpen, Target, Video, Calendar, ExternalLink } from 'lucide-react';

const trainingItems = [
  {
    icon: BookOpen,
    title: 'Core Training Path',
    description: 'Essential modules for new reps',
    placeholder: '[Access link]',
  },
  {
    icon: Target,
    title: 'Objection Handling Drills',
    description: 'Practice common scenarios',
    placeholder: '[Access link]',
  },
  {
    icon: Video,
    title: 'Field Standards',
    description: 'Professional conduct guidelines',
    placeholder: '[Access link]',
  },
  {
    icon: Calendar,
    title: 'Weekly Calls',
    description: 'Live training sessions',
    placeholder: '[Day/Time placeholder]',
  },
];

export function TrainingScheduleSlide() {
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
          Training Schedule / Access — Coming Soon
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          Your learning resources and schedule
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
          {trainingItems.map((item, index) => (
            <motion.div
              key={item.title}
              className="p-6 rounded-2xl bg-card border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {item.placeholder}
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="max-w-xl mx-auto mt-10 p-5 rounded-xl bg-muted/50 border border-border text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Recordings:</span> Coming soon
          </p>
        </motion.div>
      </div>
    </OnboardingSlideLayout>
  );
}
