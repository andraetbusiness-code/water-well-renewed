import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { Check, X, AlertTriangle } from 'lucide-react';

const doItems = [
  'Say it the same way every time',
  'Keep it short and confident',
  'Give two appointment options',
  'Collect name + phone + address + email accurately',
  'Watch the customer reply YES before leaving',
  'Use two-hour window language (no exact arrival promises)',
];

const dontItems = [
  'Freelance or improvise',
  'Over-explain the system',
  'Argue with objections',
  'Make guarantees, fear tactics, or health claims',
  'Promise pricing or "free" unless official approved flyer explicitly states it',
  'Book when spouse is not present — schedule when both homeowners can be there',
  'Discuss the price of the product — always reference the water test',
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

        {/* Last-Resort Hook Callout */}
        <motion.div
          className="mt-8 max-w-4xl mx-auto w-full rounded-2xl bg-card border-2 border-accent/30 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="px-6 py-3 bg-accent/10 border-b border-accent/20">
            <h3 className="font-bold text-accent text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Use ONLY at the end (Last-Resort Hook)
            </h3>
          </div>
          <div className="px-6 py-5 space-y-3">
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                Do NOT lead with "toilet to tap."
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                Only use it if the homeowner is NOT booking and you need a final curiosity hook.
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                Keep it neutral and non-alarmist.
              </li>
            </ul>
            <div className="rounded-xl bg-muted/50 p-4 border border-border">
              <p className="text-sm text-foreground italic">
                "You should be totally fine—no worries. Quick question though: have you heard about California's water recycling program, sometimes called 'toilet to tap'?"
              </p>
            </div>
            <p className="text-xs text-muted-foreground italic">
              Only use this if they're walking away without booking. Do not debate—use it as a curiosity question and immediately transition back to scheduling.
            </p>
          </div>
        </motion.div>
      </div>
    </OnboardingSlideLayout>
  );
}
