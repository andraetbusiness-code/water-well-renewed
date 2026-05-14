import { motion } from 'framer-motion';
import { useState } from 'react';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { Copy, Store, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const inStoreScript = `"Finding everything ok?"

"Can I ask you a quick question?"

"Who does your water filter at home?"

"Super cool!"

"For the next 2 days, Home Depot is offering complimentary water test."

"If your water's great we'll be the first to tell you..."

"Do mornings, afternoons, or evenings work best for you guys?"

"Grab your phone real quick — just go ahead and click YES."`;

const d2dScript = `"Hey, how's it going? I'm with Select Source Water — we're in the neighborhood today doing complimentary water tests."

"Can I ask you a quick question?"

"Who does your water filter at home?"

"Super cool!"

"For the next couple of days we're offering complimentary in-home water tests for homeowners on this block."

"If your water's great we'll be the first to tell you..."

"Do mornings, afternoons, or evenings work best for you guys?"

"Grab your phone real quick — just go ahead and click YES."`;

type Variant = 'instore' | 'd2d';

export function QuickReferenceSlide() {
  const [variant, setVariant] = useState<Variant>('instore');
  const script = variant === 'instore' ? inStoreScript : d2dScript;

  const handleCopy = () => {
    navigator.clipboard.writeText(script.replace(/"/g, ''));
    toast.success('Script copied to clipboard');
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
          className="font-serif text-3xl md:text-4xl text-foreground mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Field Card
        </motion.h2>

        <div className="flex gap-3 mb-6 print:hidden">
          <button
            onClick={() => setVariant('instore')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
              variant === 'instore'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/70'
            }`}
          >
            <Store className="w-4 h-4" />
            In-Store
          </button>
          <button
            onClick={() => setVariant('d2d')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
              variant === 'd2d'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/70'
            }`}
          >
            <Home className="w-4 h-4" />
            Door-to-Door
          </button>
        </div>

        <motion.div
          key={variant}
          className="w-full max-w-2xl rounded-2xl bg-card border-2 border-primary/30 shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="px-8 py-6 bg-primary/5 border-b border-primary/20">
            <h3 className="font-serif text-xl text-foreground text-center">
              {variant === 'instore' ? 'In-Store Quick Script' : 'Door-to-Door Quick Script'}
            </h3>
          </div>
          <pre className="px-8 py-6 whitespace-pre-wrap font-sans text-foreground leading-relaxed">
            {script}
          </pre>
          <div className="px-8 py-4 bg-muted/30 border-t border-border flex justify-center print:hidden">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-2" /> Copy Script
            </Button>
          </div>
        </motion.div>
      </div>
    </OnboardingSlideLayout>
  );
}
