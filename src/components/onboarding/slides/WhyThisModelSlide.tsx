import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { Shield, Scale, RefreshCw, DollarSign } from 'lucide-react';

const reasons = [
  {
    icon: Shield,
    title: 'Protects the Brand',
    description: 'Maintains professional reputation in every interaction',
  },
  {
    icon: Scale,
    title: 'Keeps Us Compliant',
    description: 'Following proper protocols protects you and the company',
  },
  {
    icon: RefreshCw,
    title: 'Creates Consistency',
    description: 'Predictable results through proven processes',
  },
  {
    icon: DollarSign,
    title: 'Helps Top Reps Earn More',
    description: 'Qualified appointments → better show rates → better closes',
  },
];

export function WhyThisModelSlide() {
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
          Why This Model Works
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              className="flex items-start gap-5 p-6 rounded-2xl bg-card border border-border"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <reason.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-foreground mb-1">{reason.title}</h3>
                <p className="text-muted-foreground text-sm">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </OnboardingSlideLayout>
  );
}
