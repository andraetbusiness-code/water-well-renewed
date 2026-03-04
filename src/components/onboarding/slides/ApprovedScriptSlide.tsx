import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';

const scriptSections = [
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
    text: `"For the next 2 days, Home Depot is offering complimentary water test.\n\nWe will have a technician go to your home and test your water for chlorine and other contaminants and walk you through the water waste treatment report."`,
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
    text: `"So there's a catch — the test is $49.95.\n\nHowever, it is complimentary if you own a single family home and all home owners are present for the test."`,
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
    note: '☑ Full name\n☑ Address\n☑ Phone number\n☑ Email\n☑ Appointment time',
  },
  {
    label: 'TIME WINDOW',
    text: `"Give them a two-hour window. They're going to get there as close to the appointment time as possible, but they're driving all over the place doing water tests."`,
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
          Approved In-Store Script
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
