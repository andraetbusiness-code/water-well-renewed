import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { CheckCircle2, AlertCircle, Phone, HelpCircle } from 'lucide-react';

const rules = [
  {
    icon: CheckCircle2,
    title: 'A job counts when:',
    description: 'The project is fully installed. You do not get paid until installation is complete.',
    type: 'success',
  },
  {
    icon: AlertCircle,
    title: 'Missing paperwork',
    description: 'Can delay processing. Always submit clean, complete documentation.',
    type: 'warning',
  },
  {
    icon: Phone,
    title: 'For pay questions',
    description: 'Contact Leadership directly',
    type: 'info',
  },
  {
    icon: HelpCircle,
    title: 'For field support',
    description: 'Contact Support Line',
    type: 'info',
  },
];

export function InstallPayoutRulesSlide() {
  return (
    <OnboardingSlideLayout variant="light">
      <div className="min-h-[80vh] flex flex-col justify-center">
        <motion.h2
          className="font-serif text-4xl md:text-5xl text-foreground mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Install / Payout Rules
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          Editable policy — update as needed
        </motion.p>

        <div className="space-y-4 max-w-3xl mx-auto w-full">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.title}
              className="flex items-start gap-5 p-6 rounded-2xl bg-card border border-border"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                rule.type === 'success' ? 'bg-primary/10' :
                rule.type === 'warning' ? 'bg-accent/10' :
                'bg-muted'
              }`}>
                <rule.icon className={`w-6 h-6 ${
                  rule.type === 'success' ? 'text-primary' :
                  rule.type === 'warning' ? 'text-accent' :
                  'text-muted-foreground'
                }`} />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">{rule.title}</h3>
                <p className="text-sm text-muted-foreground">{rule.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </OnboardingSlideLayout>
  );
}
