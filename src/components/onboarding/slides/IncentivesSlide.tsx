import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { DollarSign, Gift, Award } from 'lucide-react';
import incentivesPhoto from '@/assets/photos/incentives-lifestyle.jpg';

const incentives = [
  {
    icon: DollarSign,
    title: 'Bonuses',
    description: 'Performance-based cash bonuses',
  },
  {
    icon: Gift,
    title: 'Prizes',
    description: 'High-value rewards and experiences',
  },
  {
    icon: Award,
    title: 'Recognition',
    description: 'Spotlight opportunities and team events',
  },
];

export function IncentivesSlide() {
  return (
    <OnboardingSlideLayout variant="teal" backgroundImage={incentivesPhoto} overlayOpacity={0.8}>
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <motion.h2
          className="font-serif text-4xl md:text-5xl text-white mb-4 text-center drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Incentives
        </motion.h2>

        <motion.p
          className="text-white/90 text-center mb-12 max-w-lg drop-shadow-md"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          Performance gets rewarded. Winning doesn't just mean commissions.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto w-full">
          {incentives.map((item, index) => (
            <motion.div
              key={item.title}
              className="p-8 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-5">
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-serif text-xl text-white mb-2 drop-shadow-md">{item.title}</h3>
              <p className="text-white/80 text-sm drop-shadow-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-xs text-white/80 mt-10 text-center drop-shadow-md"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          Incentives vary by campaign. Not guaranteed.
        </motion.p>
      </div>
    </OnboardingSlideLayout>
  );
}
