import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { Calendar, Video, BookOpen, Target } from 'lucide-react';

const trainingItems = [
  {
    icon: Calendar,
    title: 'Team Training',
    description: 'Live training & coaching with your team',
    placeholder: 'Every Tuesday',
    highlight: true,
  },
  {
    icon: Video,
    title: 'Team Google Meet',
    description: 'Weekly team call — wins, blockers, and what\u2019s next',
    placeholder: 'Every Thursday',
    highlight: true,
  },
  {
    icon: BookOpen,
    title: 'Core Training Path',
    description: 'Essential modules for new reps',
    placeholder: 'Coming Soon',
    highlight: false,
  },
  {
    icon: Target,
    title: 'Objection Handling Drills',
    description: 'Practice common scenarios',
    placeholder: 'Coming Soon',
    highlight: false,
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
          Training Schedule
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          Two team meetings every week. Be there, ready to work.
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
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full ${
                      item.highlight
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground bg-muted'
                    }`}
                  >
                    {item.placeholder}
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
            <span className="font-medium text-foreground">Times &amp; meeting links:</span> Sent each week by your manager.
          </p>
        </motion.div>
      </div>
    </OnboardingSlideLayout>
  );
}
