import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { Target, Calendar, PhoneCall, Database } from 'lucide-react';

const expectations = [
  {
    icon: Target,
    title: 'Daily Activity Minimums',
    description: 'Consistent customer interactions every shift',
    placeholder: '25 conversations per shift',
  },
  {
    icon: Calendar,
    title: 'Appointment Targets',
    description: 'Water tests / consultations booked',
    placeholder: '10 appointments per shift',
  },
  {
    icon: PhoneCall,
    title: 'Confirmation Discipline',
    description: 'Customer must reply YES before dispatch',
    placeholder: 'Confirmation must be YES before dispatch',
  },
  {
    icon: Database,
    title: 'Accurate Data Entry',
    description: 'Every lead logged in GHL same day',
    placeholder: 'GHL — same day, every lead',
  },
];

export function ExpectationsSlide() {
  return (
    <OnboardingSlideLayout variant="light">
      <div className="min-h-[80vh] flex flex-col justify-center">
        <motion.h2
          className="font-serif text-4xl md:text-5xl text-foreground mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Expectations
        </motion.h2>

        <div className="space-y-4 max-w-3xl mx-auto w-full">
          {expectations.map((item, index) => (
            <motion.div
              key={item.title}
              className="flex items-start gap-5 p-6 rounded-2xl bg-card border border-border"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-lg text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                  {item.placeholder}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </OnboardingSlideLayout>
  );
}
