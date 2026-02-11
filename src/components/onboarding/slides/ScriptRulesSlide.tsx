import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { Check, X } from 'lucide-react';

const doItems = [
  'Say it the same way every time',
  'Keep it short and confident',
  'Give two appointment options',
  'Collect name + phone + address + email accurately',
  'Watch the customer reply YES before leaving',
  'Use one-hour window language (no exact arrival promises)',
];

const dontItems = [
  'Freelance or improvise',
  'Over-explain the system',
  'Argue with objections',
  'Make guarantees, fear tactics, or health claims',
  'Promise pricing or "free" unless official approved flyer explicitly states it',
  'Book when spouse is not present — schedule when both homeowners can be there',
];

export function ScriptRulesSlide() {
  return (
    <OnboardingSlideLayout variant="cream">
      <div className="min-h-[80vh] flex flex-col justify-center">
        <motion.h2
          className="font-serif text-4xl md:text-5xl text-foreground mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Script Rules
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
          {/* DO Column */}
          <motion.div
            className="rounded-2xl bg-card border border-primary/20 overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="px-6 py-4 bg-primary/10 border-b border-primary/20">
              <h3 className="font-bold text-primary flex items-center gap-2">
                <Check className="w-5 h-5" /> DO
              </h3>
            </div>
            <ul className="p-6 space-y-3">
              {doItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-foreground text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* DON'T Column */}
          <motion.div
            className="rounded-2xl bg-card border border-destructive/20 overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="px-6 py-4 bg-destructive/10 border-b border-destructive/20">
              <h3 className="font-bold text-destructive flex items-center gap-2">
                <X className="w-5 h-5" /> DON'T
              </h3>
            </div>
            <ul className="p-6 space-y-3">
              {dontItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-foreground text-sm">
                  <X className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </OnboardingSlideLayout>
  );
}
