import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type SlideVariant = 'light' | 'dark' | 'teal' | 'cream';

interface OnboardingSlideLayoutProps {
  children: ReactNode;
  variant?: SlideVariant;
  backgroundImage?: string;
  overlayOpacity?: number;
  className?: string;
  id?: string;
}

const variantStyles: Record<SlideVariant, string> = {
  light: 'bg-background text-foreground',
  dark: 'bg-foreground text-background',
  teal: 'bg-primary text-primary-foreground',
  cream: 'bg-secondary text-foreground',
};

export function OnboardingSlideLayout({
  children,
  variant = 'light',
  backgroundImage,
  overlayOpacity = 0.6,
  className,
  id,
}: OnboardingSlideLayoutProps) {
  const hasImage = !!backgroundImage;

  return (
    <section
      id={id}
      className={cn(
        'slide relative w-full min-h-screen flex items-center justify-center overflow-hidden',
        !hasImage && variantStyles[variant],
        className
      )}
    >
      {/* Background Image */}
      {hasImage && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div 
            className={cn(
              "absolute inset-0",
              variant === 'teal' && "bg-primary",
              variant === 'dark' && "bg-foreground",
              variant === 'light' && "bg-background",
              variant === 'cream' && "bg-secondary"
            )}
            style={{ opacity: overlayOpacity }}
          />
        </>
      )}

      {/* Organic background decorations for non-image slides */}
      {!hasImage && variant === 'light' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-[60%] h-[60%] rounded-full blur-3xl bg-primary/5" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[50%] h-[50%] rounded-full blur-3xl bg-accent/8" />
        </div>
      )}

      {!hasImage && variant === 'cream' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl bg-primary/8" />
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 rounded-full blur-3xl bg-accent/10" />
        </div>
      )}

      {!hasImage && variant === 'teal' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-[60%] h-[60%] rounded-full blur-3xl bg-white/10" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[50%] h-[50%] rounded-full blur-3xl bg-accent/20" />
        </div>
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-6xl mx-auto px-8 py-16 md:py-24"
      >
        {children}
      </motion.div>
    </section>
  );
}
