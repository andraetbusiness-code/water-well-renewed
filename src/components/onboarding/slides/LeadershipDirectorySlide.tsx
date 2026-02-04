import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { User, Phone, MapPin } from 'lucide-react';

const leaders = [
  {
    name: '[Name Placeholder]',
    title: '[Title Placeholder]',
    phone: '[Phone Placeholder]',
    region: '[Region]',
  },
  {
    name: '[Name Placeholder]',
    title: '[Title Placeholder]',
    phone: '[Phone Placeholder]',
    region: '[Region]',
  },
  {
    name: '[Name Placeholder]',
    title: '[Title Placeholder]',
    phone: '[Phone Placeholder]',
    region: '[Region]',
  },
  {
    name: '[Name Placeholder]',
    title: '[Title Placeholder]',
    phone: '[Phone Placeholder]',
    region: '[Region]',
  },
];

export function LeadershipDirectorySlide() {
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
          Leadership Directory
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          Use the latest posted directory for current contact info.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
          {leaders.map((leader, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-2xl bg-card border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg text-foreground">{leader.name}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{leader.title}</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      {leader.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {leader.region}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </OnboardingSlideLayout>
  );
}
