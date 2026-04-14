import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Shield, CheckCircle, Clock, Phone, Star, Home, Award, Users, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustBar } from "@/components/TrustBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactCTA } from "@/components/ContactCTA";

const benefits = [
  {
    icon: Shield,
    title: "Lifetime Warranty",
    description: "Every HYGIA+ system installed through our Home Depot partnership is backed by a comprehensive Lifetime Warranty — parts, labor, and performance guaranteed.",
  },
  {
    icon: Calendar,
    title: "5-Day Risk-Free Trial",
    description: "Try the HYGIA+ system in your home for 5 full days. If you're not completely satisfied, we'll remove it at no charge.",
  },
  {
    icon: Clock,
    title: "Same-Week Installation",
    description: "Our certified technicians install your system within days, not weeks. Most installations are completed in under 2 hours.",
  },
  {
    icon: Users,
    title: "Factory-Trained Technicians",
    description: "Every installer is factory-certified and background-checked. We maintain the highest standards Home Depot requires.",
  },
  {
    icon: Award,
    title: "Licensed & Insured",
    description: "Fully licensed contractors with comprehensive insurance coverage. Your home and investment are always protected.",
  },
  {
    icon: Star,
    title: "4.7★ Customer Rating",
    description: "With 461+ verified reviews, our customers consistently rate us among the top water treatment providers in the Inland Empire.",
  },
];

const process = [
  {
    step: "1",
    title: "Free In-Home Water Test",
    description: "A certified technician visits your home to test your water and explain exactly what's in it — no obligation.",
  },
  {
    step: "2",
    title: "Custom Recommendation",
    description: "Based on your results, we recommend the right HYGIA+ configuration for your home's specific water challenges.",
  },
  {
    step: "3",
    title: "Professional Installation",
    description: "Our factory-trained team installs your system, typically in under 2 hours, with zero disruption to your day.",
  },
  {
    step: "4",
    title: "Ongoing Support",
    description: "Enjoy clean water backed by our Lifetime Warranty, annual maintenance options, and 24/7 customer support.",
  },
];

const HomeDepotPartnership = () => {
  return (
    <>
      <Helmet>
        <title>Home Depot Authorized Water Treatment | Select Source Water</title>
        <meta
          name="description"
          content="Select Source Water is a Home Depot Authorized Independent Provider for water treatment in the Inland Empire. Lifetime Warranty, 5-day trial, same-week install."
        />
        <link rel="canonical" href="https://water-well-renewed.lovable.app/home-depot-authorized-provider" />
      </Helmet>

      <Header />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-accent to-primary pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5 bg-cover bg-center" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/15 backdrop-blur-sm rounded-full px-5 py-2 mb-6">
              <Home className="h-4 w-4 text-primary-foreground" />
              <span className="text-sm font-semibold text-primary-foreground tracking-wide">
                HOME DEPOT AUTHORIZED PROVIDER
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Your Trusted Water Treatment Partner
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 max-w-2xl mx-auto">
              Select Source Water is proud to be a Home Depot Authorized Independent Provider,
              bringing professional-grade water filtration to homes across the Inland Empire since 1998.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/free-water-test">
                  Schedule Free Water Test
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="tel:+19514995136">
                  <Phone className="mr-1 h-5 w-5" />
                  (951) 499-5136
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* What This Means For You */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Home Depot Partnership Means For You
            </h2>
            <p className="text-lg text-muted-foreground">
              When you choose a Home Depot Authorized Provider, you get the quality and accountability
              that comes with one of America's most trusted brands — plus our 25+ years of local expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group p-6 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              From your first call to crystal-clear water, we make the process simple and stress-free.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HD Badge + Social Proof */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl p-8 md:p-12 border border-primary/10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img
                  src="/src/assets/home-depot-authorized.png"
                  alt="Home Depot Authorized Independent Provider"
                  className="w-40 h-auto"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Why Home Depot Chose Us
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Home Depot selects only the most qualified, experienced, and reliable providers to serve their customers. 
                  Our 25+ year track record, factory-certified technicians, and commitment to customer satisfaction 
                  earned us the Authorized Independent Provider designation for water treatment across the Inland Empire.
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-1 text-foreground/70">
                    <CheckCircle className="h-4 w-4 text-primary" /> Background-Checked Staff
                  </span>
                  <span className="flex items-center gap-1 text-foreground/70">
                    <CheckCircle className="h-4 w-4 text-primary" /> Factory Certified
                  </span>
                  <span className="flex items-center gap-1 text-foreground/70">
                    <CheckCircle className="h-4 w-4 text-primary" /> Fully Insured
                  </span>
                  <span className="flex items-center gap-1 text-foreground/70">
                    <CheckCircle className="h-4 w-4 text-primary" /> Local Since 1998
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
      <Footer />
    </>
  );
};

export default HomeDepotPartnership;
