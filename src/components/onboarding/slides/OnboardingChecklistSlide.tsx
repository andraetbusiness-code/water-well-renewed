import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { CheckSquare } from 'lucide-react';

const checklistItems = [
  {
    title: 'Join team communication channel',
    placeholder: 'Chat in Enzy.co app',
  },
  {
    title: 'Access CRM / lead form',
    placeholder: 'GoHighLevel (GHL) — login instructions from your manager',
  },
  {
    title: 'Calendar setup + scheduling rules',
    placeholder: 'Book via GHL — two-hour windows only',
  },
  {
    title: 'Save script + objections notes',
    placeholder: 'Saved in Enzy.co SOPs section',
  },
  {
    title: 'Uniform / appearance expectations',
    placeholder: 'Clean, professional — SSW-branded or plain (no other logos)',
  },
  {
    title: 'Reporting settings + daily submission routine',
    placeholder: 'End-of-day: log all leads in GHL, submit Enzy scorecard',
  },
  {
    title: 'Required: Download the Home Depot App',
    placeholder: 'Use it to help customers find items/aisles — pitch while you walk them there',
  },
];

export function OnboardingChecklistSlide() {
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
          Onboarding Setup Checklist
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          Complete these before your first shift
        </motion.p>

        <div className="space-y-3 max-w-2xl mx-auto w-full">
          {checklistItems.map((item, index) => (
            <motion.div
              key={item.title}
              className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <div className="w-6 h-6 rounded border-2 border-primary/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckSquare className="w-4 h-4 text-primary opacity-0" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground text-sm">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{item.placeholder}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Home Depot App callout */}
        <motion.div
          className="mt-6 max-w-2xl mx-auto w-full rounded-xl bg-muted/50 border border-border p-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <p className="text-sm text-foreground italic text-center">
            "'How are you finding everything today?' → If they need something, help them locate it in the app and walk them there—then transition into the water test pitch."
          </p>
        </motion.div>
      </div>
    </OnboardingSlideLayout>
  );
}
