import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { Droplets, Sparkles, Home, TrendingUp } from 'lucide-react';

const cards = [
  {
    icon: Droplets,
    title: 'Premium Water Solutions',
    description: 'Whole-home filtration & drinking water solutions',
  },
  {
    icon: Sparkles,
    title: 'Cleaner, Better-Tasting Water',
    description: 'Daily quality upgrade for every tap',
  },
  {
    icon: Home,
    title: 'In-Home Consultation Model',
    description: 'Professional walkthrough with each customer',
  },
  {
    icon: TrendingUp,
    title: 'Built to Scale',
    description: 'Systems + training + support for growth',
  },
];

export function WhoWeAreSlide() {
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
          Who We Are
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <card.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-foreground mb-2">{card.title}</h3>
              <p className="text-muted-foreground">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </OnboardingSlideLayout>
  );
}
