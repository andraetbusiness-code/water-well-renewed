import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const quickScript = `"Finding everything ok?"

"Can I ask you a quick question?"

"Who does your water filter at home?"

"Super cool!"

"For the next 2 days, Home Depot is offering complimentary water test."

"If your water's great we'll be the first to tell you..."

"Do mornings, afternoons, or evenings work best for you guys?"

"Grab your phone real quick — just go ahead and click YES."`;

export function QuickReferenceSlide() {
  const handleCopy = () => {
    navigator.clipboard.writeText(quickScript.replace(/"/g, ''));
    toast.success('Script copied to clipboard!');
  };

  return (
    <OnboardingSlideLayout variant="light">
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <motion.span
          className="text-sm font-semibold tracking-[0.2em] text-primary uppercase mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Quick Reference
        </motion.span>

        <motion.h2
          className="font-serif text-3xl md:text-4xl text-foreground mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Field Card
        </motion.h2>

        <motion.div
          className="w-full max-w-2xl rounded-2xl bg-card border-2 border-primary/30 shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="px-8 py-6 bg-primary/5 border-b border-primary/20">
            <h3 className="font-serif text-xl text-foreground text-center">
              Book + Confirm. <span className="text-accent">Not the sale.</span>
            </h3>
          </div>
          
          <div className="px-8 py-6">
            <p className="text-foreground whitespace-pre-line leading-relaxed text-center">
              {quickScript}
            </p>
          </div>

          <div className="px-8 py-4 bg-secondary/50 border-t border-border flex justify-center print:hidden">
            <Button onClick={handleCopy} variant="outline" size="sm" className="gap-2">
              <Copy className="w-4 h-4" />
              Copy Script
            </Button>
          </div>
        </motion.div>
      </div>
    </OnboardingSlideLayout>
  );
}
