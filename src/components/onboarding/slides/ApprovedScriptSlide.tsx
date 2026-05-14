import { motion } from 'framer-motion';
import { useState } from 'react';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { Store, Home } from 'lucide-react';

const inStoreScript = [
  {
    label: 'OPENER',
    text: `"Finding everything ok?"`,
  },
  {
    label: 'PERMISSION',
    text: `"Can I ask you a quick question?"`,
  },
  {
    label: 'HOOK QUESTION',
    text: `"Who does your water filter at home?"`,
  },
  {
    label: 'BRIDGE',
    text: `"Super cool!"`,
  },
  {
    label: 'OFFER',
    text: `"For the next 2 days, Home Depot is offering a complimentary water test.\n\nWe'll send a technician to your home to test your water for chlorine and other contaminants and walk you through the water-quality report."`,
  },
  {
    label: 'PEACE OF MIND',
    text: `"If your water's great we'll be the first to tell you. If it's not great we'll show you some solutions... you're open to solutions for clean water right?"`,
  },
  {
    label: 'PAUSE',
    text: ``,
    note: '(Silent, Listen)',
  },
  {
    label: 'WAIVED FEE + QUALIFIERS',
    text: `"So there's a catch — the test is $49.95.\n\nHowever, it's complimentary if you own a single-family home and all homeowners are present for the test."`,
  },
  {
    label: 'CLOSE',
    text: `"Do mornings, afternoons, or evenings work best for you guys?"`,
  },
  {
    label: 'CONFIRMATION LOCK',
    text: `"You're going to get a confirmation. If you don't respond YES, we won't dispatch the technician. Grab your phone real quick — just go ahead and click YES."`,
  },
  {
    label: 'REQUIRED FIELDS',
    text: `Collect the following before the customer leaves:`,
    note: '\u2611 Full name\n\u2611 Address\n\u2611 Phone number\n\u2611 Email\n\u2611 Appointment time',
  },
  {
    label: 'TIME WINDOW',
    text: `"Give them a two-hour window. They'll arrive as close to the appointment time as possible, but they're driving all over doing water tests."`,
  },
];

const doorToDoorScript = [
  {
    label: 'OPENER',
    text: `"Hey, how's it going? I'm with Select Source Water — we're in the neighborhood today doing complimentary water tests for homeowners."`,
  },
  {
    label: 'PERMISSION',
    text: `"Can I ask you a quick question real quick?"`,
  },
  {
    label: 'HOOK QUESTION',
    text: `"Who does your water filter at home?"`,
  },
  {
    label: 'BRIDGE',
    text: `"Super cool!"`,
  },
  {
    label: 'OFFER',
    text: `"For the next couple of days we're offering complimentary in-home water tests for homeowners on this block.\n\nA technician comes out, tests your water for chlorine and other contaminants, and walks you through the report — no obligation."`,
  },
  {
    label: 'PEACE OF MIND',
    text: `"If your water's great we'll be the first to tell you. If it's not, we'll show you some solutions... you're open to solutions for clean water right?"`,
  },
  {
    label: 'PAUSE',
    text: ``,
    note: '(Silent, Listen)',
  },
  {
    label: 'QUALIFIERS',
    text: `"It's complimentary as long as you own the home and both homeowners are present for the test."`,
  },
  {
    label: 'CLOSE',
    text: `"Do mornings, afternoons, or evenings work best for you guys?"`,
  },
  {
    label: 'CONFIRMATION LOCK',
    text: `"You're going to get a confirmation. If you don't respond YES, we won't dispatch the technician. Grab your phone real quick — just go ahead and click YES."`,
  },
  {
    label: 'REQUIRED FIELDS',
    text: `Collect the following before you leave the door:`,
    note: '\u2611 Full name\n\u2611 Address\n\u2611 Phone number\n\u2611 Email\n\u2611 Appointment time',
  },
  {
    label: 'TIME WINDOW',
    text: `"Give them a two-hour window. They'll arrive as close to the appointment time as possible, but they're driving all over doing water tests."`,
  },
];

type Variant = 'instore' | 'd2d';

export function ApprovedScriptSlide() {
  const [variant, setVariant] = useState<Variant>('instore');
  const sections = variant === 'instore' ? inStoreScript : doorToDoorScript;

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
          className="text-sm text-accent font-semibold text-center mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Do Not Paraphrase
        </motion.p>

        <div className="flex justify-center gap-3 mb-8 print:hidden">
          <button
            onClick={() => setVariant('instore')}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition ${
              variant === 'instore'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/70'
            }`}
          >
            <Store className="w-4 h-4" />
            In-Store (Home Depot)
          </button>
          <button
            onClick={() => setVariant('d2d')}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition ${
              variant === 'd2d'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/70'
            }`}
          >
            <Home className="w-4 h-4" />
            Door-to-Door
          </button>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {sections.map((section, index) => (
            <motion.div
              key={`${variant}-${section.label}`}
              className="rounded-xl bg-card border border-border p-5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
            >
              <div className="text-xs font-bold tracking-widest text-primary uppercase mb-2">
                {section.label}
              </div>
              {section.text && (
                <p className="text-foreground whitespace-pre-line leading-relaxed">{section.text}</p>
              )}
              {section.note && (
                <p className="text-sm text-muted-foreground italic mt-2 whitespace-pre-line">
                  {section.note}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </OnboardingSlideLayout>
  );
}
