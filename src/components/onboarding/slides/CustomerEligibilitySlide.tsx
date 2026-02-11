import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { CheckCircle2, XCircle, Home, Droplets, Clock, Wrench, ArrowRight } from 'lucide-react';

const eligibleCriteria = [
  { icon: Home, text: 'Owns a single-family home' },
  { icon: Droplets, text: 'Has water concerns (taste, smell, hardness, spots, appliances, skin/hair)' },
  { icon: Clock, text: 'Both homeowners present for the test' },
  { icon: Wrench, text: 'Available for a one-hour appointment window' },
];

const notEligible = [
  {
    scenario: 'Renter',
    action: 'Collect contact for future nurture',
  },
  {
    scenario: 'Spouse not present',
    action: 'Schedule when both can be there — do NOT book a maybe',
  },
  {
    scenario: 'Busy / Not interested',
    action: 'Offer weekend/evening slot; if decline, offer a short follow-up text',
  },
];

export function CustomerEligibilitySlide() {
  return (
    <OnboardingSlideLayout variant="light">
      <div className="min-h-[80vh] flex flex-col justify-center py-8">
        <motion.h2
          className="font-serif text-4xl md:text-5xl text-foreground mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Customer Eligibility
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          Fast Check Before Booking
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
          {/* Eligible */}
          <motion.div
            className="rounded-2xl bg-card border border-primary/20 overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="px-6 py-4 bg-primary/10 border-b border-primary/20 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-primary">Eligible Customers</h3>
            </div>
            <ul className="p-6 space-y-4">
              {eligibleCriteria.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-foreground text-sm">
                  <item.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  {item.text}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not Eligible */}
          <motion.div
            className="rounded-2xl bg-card border border-muted overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="px-6 py-4 bg-muted/50 border-b border-border flex items-center gap-2">
              <XCircle className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-bold text-muted-foreground">If Not Eligible</h3>
            </div>
            <div className="p-6 space-y-4">
              {notEligible.map((item, index) => (
                <div key={index} className="flex items-start gap-3 text-sm">
                  <div className="px-2 py-1 rounded bg-muted text-muted-foreground text-xs font-medium flex-shrink-0">
                    {item.scenario}
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item.action}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </OnboardingSlideLayout>
  );
}
