import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { Printer, Eye, MessageSquare, Ban } from 'lucide-react';

const rules = [
  {
    icon: Printer,
    text: 'Flyers may be printed / laminated',
  },
  {
    icon: Eye,
    text: 'Use flyers as a visual aid, not a pitch deck',
  },
  {
    icon: MessageSquare,
    text: 'If asked technical questions: defer to the consultation',
  },
  {
    icon: Ban,
    text: 'No unapproved claims, no pricing promises',
  },
];

export function FieldUseRulesSlide() {
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
          Field Use Rules
        </motion.h2>

        <div className="space-y-4 max-w-2xl mx-auto w-full">
          {rules.map((rule, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-5 p-6 rounded-2xl bg-card border border-border"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <rule.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-foreground">{rule.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </OnboardingSlideLayout>
  );
}
