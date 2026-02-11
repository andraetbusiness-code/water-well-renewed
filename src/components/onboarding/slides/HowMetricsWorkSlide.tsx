import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { MessageSquare, CalendarCheck, CheckCircle2 } from 'lucide-react';

const metrics = [
  {
    icon: MessageSquare,
    title: 'Appointments',
    description: 'Water tests / consultations booked',
    placeholder: '25 per week',
  },
  {
    icon: CalendarCheck,
    title: 'Sits',
    description: 'In-home consultations completed',
    placeholder: '10 per week',
  },
  {
    icon: CheckCircle2,
    title: 'Closes',
    description: 'Confirmed sales closed',
    placeholder: '3 per week',
  },
];

export function HowMetricsWorkSlide() {
  return (
    <OnboardingSlideLayout id="performance" variant="cream">
      <div className="min-h-[80vh] flex flex-col justify-center">
        <motion.span
          className="text-sm font-semibold tracking-[0.2em] text-primary uppercase mb-4 block text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          New Rep Minimums (Per Week)
        </motion.span>

        <motion.h2
          className="font-serif text-4xl md:text-5xl text-foreground mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          How Metrics Work
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          What we track and why it matters
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              className="p-6 rounded-2xl bg-card border border-border text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <metric.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-lg text-foreground mb-2">{metric.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{metric.description}</p>
              <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                {metric.placeholder}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 max-w-lg mx-auto rounded-xl bg-accent text-white p-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="text-sm font-bold">No YES confirmation = not booked</p>
        </motion.div>

        <motion.div
          className="mt-4 max-w-lg mx-auto rounded-xl bg-muted/50 border border-border p-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <p className="text-xs text-muted-foreground">
            Targets are minimums for new reps. Track in Enzy daily and log every appointment in GHL same-day.
          </p>
        </motion.div>
      </div>
    </OnboardingSlideLayout>
  );
}
