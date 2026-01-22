import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactCTA } from "@/components/ContactCTA";
import { FloatingBubbles, WaveBackground } from "@/components/WaterEffects";

interface PageLayoutProps {
  children: ReactNode;
  showContactCTA?: boolean;
}

export const PageLayout = ({ children, showContactCTA = true }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      {showContactCTA && <ContactCTA />}
      <Footer />
    </div>
  );
};

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  children?: ReactNode;
}

export const PageHero = ({ title, subtitle, description, badge, children }: PageHeroProps) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-water-light/20 to-background" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-water-light/30 rounded-full blur-3xl" />
      </div>
      
      {/* Bubbles */}
      <FloatingBubbles count={10} />
      <WaveBackground className="opacity-30" />
      
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          {badge && (
            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4 px-4 py-2 bg-primary/10 rounded-full">
              {badge}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-4">
            {title}
            {subtitle && (
              <>
                <br />
                <span className="text-primary">{subtitle}</span>
              </>
            )}
          </h1>
          {description && (
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  );
};
