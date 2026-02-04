import { motion } from 'framer-motion';
import { OnboardingSlideLayout } from '../OnboardingSlideLayout';
import { FileImage, Printer } from 'lucide-react';

// Placeholder marketing materials - these would be actual images in production
const materials = [
  {
    title: 'Flyer 1',
    placeholder: 'Water Test Promotion',
    printReady: true,
  },
  {
    title: 'Flyer 2',
    placeholder: 'System Benefits',
    printReady: true,
  },
  {
    title: 'Postcard',
    placeholder: 'Door Hanger / Leave Behind',
    printReady: true,
  },
  {
    title: 'QR Lead Capture',
    placeholder: 'Digital Lead Form',
    printReady: false,
  },
];

export function MarketingGallerySlide() {
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
              className="rounded-2xl bg-card border border-border overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="aspect-[3/4] bg-muted/50 flex items-center justify-center relative">
                <FileImage className="w-16 h-16 text-muted-foreground/30" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
                {material.printReady && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    <Printer className="w-3 h-3" />
                    Print-ready
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
          Upload actual marketing assets to replace placeholders
        </motion.p>
      </div>
    </OnboardingSlideLayout>
  );
}
