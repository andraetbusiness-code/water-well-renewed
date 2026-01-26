import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SpeakerNotesProps {
  notes?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function SpeakerNotes({ notes, isOpen, onClose }: SpeakerNotesProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl"
        >
          <div className="bg-card/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-xl p-6 mx-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-primary tracking-wider uppercase">
                Speaker Notes
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Notes content */}
            <p className="text-foreground/80 leading-relaxed">
              {notes || 'No speaker notes for this slide.'}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
