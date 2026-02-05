import { useState } from 'react';
import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { FileImage, Printer, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DownloadableFlyer } from '@/components/marketing/DownloadableFlyer';

// Placeholder marketing materials - these would be actual images in production
const materials = [
  {
    title: 'Door Hanger',
    placeholder: 'Water Test Promotion',
    printReady: true,
    hasFlyer: true,
  },
  {
    title: 'Flyer 2',
    placeholder: 'System Benefits',
    printReady: true,
    hasFlyer: false,
  },
  {
    title: 'Postcard',
    placeholder: 'Leave Behind Card',
    printReady: true,
    hasFlyer: false,
  },
  {
    title: 'QR Lead Capture',
    placeholder: 'Digital Lead Form',
    printReady: false,
    hasFlyer: false,
  },
];

export function MarketingGallerySlide() {
  const [showFlyerModal, setShowFlyerModal] = useState(false);

  return (
    <OnboardingSlideLayout variant="cream">
      <div className="min-h-[80vh] flex flex-col justify-center">
        <motion.h2
          className="font-serif text-4xl md:text-5xl text-foreground mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Marketing Gallery
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          Approved materials for field use
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto w-full">
          {materials.map((material, index) => (
            <motion.div
              key={material.title}
              className="rounded-2xl bg-card border border-border overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => material.hasFlyer && setShowFlyerModal(true)}
            >
              <div className="aspect-[3/4] bg-muted/50 flex items-center justify-center relative">
                {material.hasFlyer ? (
                  <div className="w-full h-full bg-gradient-to-b from-primary to-primary/80 flex items-center justify-center">
                    <div className="text-center text-primary-foreground p-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 mx-auto mb-3" />
                      <p className="text-xs font-semibold">CLEANER WATER</p>
                      <p className="text-[10px] opacity-80">Click to Preview</p>
                    </div>
                  </div>
                ) : (
                  <FileImage className="w-16 h-16 text-muted-foreground/30" />
                )}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
                {material.printReady && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    <Printer className="w-3 h-3" />
                    Print-ready
                  </div>
                )}
                {material.hasFlyer && (
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center justify-center gap-1 bg-accent text-accent-foreground text-xs px-2 py-1.5 rounded-lg font-medium">
                      <Download className="w-3 h-3" />
                      Download PDF
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4 border-t border-border">
                <h3 className="font-medium text-foreground text-sm">{material.title}</h3>
                <p className="text-xs text-muted-foreground">{material.placeholder}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-xs text-muted-foreground text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          Click Door Hanger to preview and download
        </motion.p>
      </div>

      {/* Flyer Preview Modal */}
      {showFlyerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-background rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-auto"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => setShowFlyerModal(false)}
            >
              <X className="w-5 h-5" />
            </Button>
            
            <h3 className="font-serif text-2xl text-foreground mb-6 text-center">
              Door Hanger Flyer
            </h3>
            
            <DownloadableFlyer showDownloadButton={true} />
          </motion.div>
        </div>
      )}
    </OnboardingSlideLayout>
  );
}
