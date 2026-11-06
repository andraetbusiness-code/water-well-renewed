import { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactCTA } from "@/components/ContactCTA";
import { TrustBar } from "@/components/TrustBar";

interface PageLayoutProps {
  children: ReactNode;
  showContactCTA?: boolean;
  showTrustBar?: boolean;
}

export const PageLayout = ({ children, showContactCTA = true, showTrustBar = false }: PageLayoutProps) => (
  <div className="flex min-h-screen flex-col">
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-background">
      Skip to content
    </a>
    <Header />
    <main id="main" className="flex-1 pt-[68px]">
      {children}
    </main>
    {showTrustBar && <TrustBar />}
    {showContactCTA && <ContactCTA />}
    <Footer />
  </div>
);

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  children?: ReactNode;
}

/** Plain, left-aligned page opener. Legacy `badge` is rendered as quiet sentence-case text. */
export const PageHero = ({ title, subtitle, description, badge, children }: PageHeroProps) => (
  <section className="border-b border-border">
    <div className="container py-16 md:py-24">
      {badge && <p className="mb-4 text-sm font-medium text-primary">{badge}</p>}
      <h1 className="display max-w-4xl text-4xl sm:text-5xl lg:text-7xl">
        {title}
        {subtitle && <span className="block text-muted-foreground">{subtitle}</span>}
      </h1>
      {description && <p className="measure mt-6 text-lg text-muted-foreground md:text-xl">{description}</p>}
      {children}
    </div>
  </section>
);
