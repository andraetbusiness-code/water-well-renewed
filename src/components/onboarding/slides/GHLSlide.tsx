import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { 
  Database, 
  CalendarCheck, 
  ClipboardList, 
  Tag, 
  Bell,
  MapPin,
  MessageSquare
} from 'lucide-react';

const features = [
  {
    icon: Database,
    title: 'Same-Day Lead Entry',
    description: 'Every appointment logged the day it\'s booked',
  },
  {
    icon: ClipboardList,
    title: 'Required Fields Complete',
    description: 'Name, address, phone, email, appointment time',
  },
  {
    icon: MapPin,
    title: 'Lead Source = Home Depot',
    description: 'Correct attribution on every lead',
  },
  {
    icon: Tag,
    title: 'Status / Tag Discipline',
    description: 'Booked · Confirmed (YES) · Needs Reschedule · No Response · No Show',
  },
  {
    icon: Bell,
    title: 'Auto Confirmations',
    description: 'Reminders trigger automatically after booking',
  },
  {
    icon: CalendarCheck,
    title: 'System of Record',
    description: 'GHL is the single source of truth for all leads',
  },
  {
    icon: MessageSquare,
    title: 'Customer Communication',
    description: 'GHL is how we communicate with your customers — confirmations, reminders, and follow-ups',
  },
];

export function GHLSlide() {
  return (
    <OnboardingSlideLayout variant="cream">
      <div className="py-8">
        <motion.span
          className="text-sm font-semibold tracking-[0.2em] text-primary uppercase mb-4 block text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          System of Record
        </motion.span>

        <motion.h2
          className="font-serif text-4xl md:text-5xl text-foreground mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          GoHighLevel (GHL)
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-center mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Every lead and appointment must be logged here the same day.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground text-sm">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </OnboardingSlideLayout>
  );
}
