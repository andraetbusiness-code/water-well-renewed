import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';

const scriptSections = [
  {
    label: 'OPENER',
    text: `"Hey, you guys finding everything OK?"`,
  },
  {
    label: 'HOOK QUESTION',
    text: `"Real quick — what are you currently using for your whole home filtration or water treatment?"`,
  },
  {
    label: 'OFFER',
    text: `"Super cool — Home Depot is doing complimentary in-home water tests for the next three days. Here's how it works.\n\nWe send a technician out to your home. We do a chlorine test and a basic contaminant test. We walk you through your water report."`,
  },
  {
    label: 'PEACE OF MIND',
    text: `"If your water is great then you know you have peace of mind.\n\nIf your water is not great, you would be open to solutions right? No one's worse off with clean water, right?"`,
  },
  {
    label: 'WAIVED FEE + QUALIFIERS',
    text: `"So there is a catch — the test is $49.95. It's complimentary through Home Depot as long as:"`,
    note: '• You own a single-family home\n• And both homeowners are present for the test.',
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
