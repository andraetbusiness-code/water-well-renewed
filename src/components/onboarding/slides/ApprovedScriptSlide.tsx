import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';

const scriptSections = [
  {
    label: 'OPENING',
    text: `"Hey, how are you doing today? Sorry to bother you — I'll be super quick."

"My name is ___, I'm with Select Source Water. We're working with homeowners in the area scheduling quick water tests and consultations — just so you can see what your water looks like and what options are available for your home."`,
  },
  {
    label: 'QUALIFIER',
    text: `"Quick question — do you own the home, or are you renting?"`,
  },
  {
    label: 'POSITIONING',
    text: `"Perfect. Just so you know, we're not selling anything right here. We're simply booking a short water test / consultation."`,
  },
  {
    label: 'TIME & PRESSURE RELEASE',
    text: `"It takes about 15–20 minutes. There's no pressure — it's just a professional walkthrough."`,
  },
  {
    label: 'APPOINTMENT CLOSE',
    text: `"I have a spot open later today between __ and __, or tomorrow between __ and __ — which one works better?"`,
    note: '(Always give two options. Never ask open-ended questions.)',
  },
  {
    label: 'CONFIRMATION',
    text: `"Perfect — what's the best number to text you the confirmation?"`,
  },
];

export function ApprovedScriptSlide() {
  return (
    <OnboardingSlideLayout variant="light">
      <div className="py-8">
        <motion.h2
          className="font-serif text-3xl md:text-4xl text-foreground mb-3 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Approved Script
        </motion.h2>

        <motion.p
          className="text-sm text-accent font-semibold text-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Do Not Paraphrase
        </motion.p>

        <div className="space-y-4 max-w-4xl mx-auto">
          {scriptSections.map((section, index) => (
            <motion.div
              key={section.label}
              className="rounded-xl border border-border bg-card overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <div className="px-5 py-2 bg-primary/10 border-b border-border">
                <span className="text-xs font-bold tracking-wider text-primary">
                  {section.label}
                </span>
              </div>
              <div className="px-5 py-4">
                <p className="text-foreground whitespace-pre-line text-sm leading-relaxed">
                  {section.text}
                </p>
                {section.note && (
                  <p className="text-xs text-muted-foreground mt-2 italic">{section.note}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </OnboardingSlideLayout>
  );
}
