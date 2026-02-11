import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

interface OnboardingHeaderProps {
  onPrint: () => void;
}

export function OnboardingHeader({ onPrint }: OnboardingHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border print:hidden"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Select Source Water" className="h-8 object-contain" />
          <span className="text-sm font-medium text-muted-foreground hidden sm:block">
            Field Rep Onboarding
          </span>
        </div>
        
      </div>
    </motion.header>
  );
}
