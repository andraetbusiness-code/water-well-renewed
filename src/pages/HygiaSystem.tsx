import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { 
  Droplets, 
  Shield, 
  Check, 
  ArrowRight,
  Beaker,
  Leaf,
  Zap,
  Home,
  Phone
} from "lucide-react";
import { PageLayout, PageHero } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { FloatingBubbles } from "@/components/WaterEffects";
import { InfographicCard, InfographicGrid } from "@/components/InfographicCard";
import { cacheBust } from "@/lib/cache-bust";
import homeDepotAuthorized from "@/assets/home-depot-authorized.png";
import systemDiagramImg from "@/assets/infographics/system-diagram-styled.png";
import whyChooseUsImg from "@/assets/infographics/why-choose-us-styled.png";
import waterSoftenerImg from "@/assets/photos/water-softener.png";

const systemFeatures = [
  {
    icon: Beaker,
    title: "Sediment Filtration",
    description: "Removes sand, silt, rust, and debris from your incoming water supply."
  },
  {
    icon: Leaf,
    title: "Catalytic Carbon",
    description: "Reduces chlorine, chloramines, pesticides, and volatile organic compounds (VOCs)."
  },
  {
    icon: Droplets,
    title: "Ion Exchange Resin",
    description: "Softens water and removes heavy metals like lead and mercury."
  },
  {
    icon: Shield,
    title: "Coconut Shell Carbon",
    description: "Adsorbs additional chlorine, chloramine, and chemical contaminants."
  },
  {
    icon: Zap,
    title: "KDF Media",
    description: "Reduces chlorine, heavy metals, and inhibits bacteria growth."
  },
  {
    icon: Home,
    title: "Clean Water Delivery",
    description: "Enjoy clean, safe, soft water throughout your entire home."
  }
];

const benefits = [
  "Softer, scale-free water",
  "Cleaner, great-tasting water",
  "Removes contaminants, odors & spots",
  "Installed by professionals you can trust",
  "20-year full warranty",
  "Customized solutions for your home"
];

export default function HygiaSystem() {
  const featuresRef = useRef(null);
  const benefitsRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-100px" });

  return (
    <PageLayout>
      <PageHero 
        badge="HYGIA+ System"
        title="Whole House Water"
        subtitle="Filtration Systems"
        description="The HYGIA+ system combines multiple filtration stages to deliver pure, clean, soft water to every tap in your home."
      />

      {/* How It Works Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <FloatingBubbles count={8} />
        
        <div className="container relative" ref={featuresRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              How The System Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Water flows through multiple stages of advanced filtration media, each targeting specific contaminants.
            </p>
          </motion.div>

          {/* Filtration stages - vertical flow on mobile, grid on desktop */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {systemFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full">
                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-serif text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* System Infographics */}
      <section className="py-16 md:py-20 relative overflow-hidden bg-secondary/20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Visual <span className="text-primary">Guides</span>
            </h2>
          </motion.div>
          
          {/* Equipment Photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="relative group overflow-hidden rounded-2xl border border-border/30 shadow-xl">
              <img 
                src={waterSoftenerImg} 
                alt="HYGIA+ Water Softener System" 
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-6">
                <p className="text-primary-foreground font-serif text-xl">HYGIA+ Dual-Tank System</p>
                <p className="text-primary-foreground/70 text-sm">Premium water softening equipment</p>
              </div>
            </div>
          </motion.div>
          
          <InfographicGrid columns={2}>
            <InfographicCard 
              src={cacheBust(systemDiagramImg)} 
              alt="HYGIA+ Water Filtration System Diagram"
              delay={0}
            />
            <InfographicCard 
              src={cacheBust(whyChooseUsImg)} 
              alt="Why Choose Select Source Water"
              delay={0.15}
            />
          </InfographicGrid>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-28 bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-water-light/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative" ref={benefitsRef}>
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Benefits list */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={benefitsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-8">
                Better Water <span className="text-primary">Starts Here</span>
              </h2>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={benefitsInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-lg text-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link to="/#contact" className="gap-2">
                    Get Free Water Test
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="tel:8334227765" className="gap-2">
                    <Phone className="h-4 w-4" />
                    833.422.7765
                  </a>
                </Button>
              </div>
            </motion.div>
            
            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={benefitsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="p-8 rounded-3xl bg-card border border-border/50 text-center">
                <div className="mb-6">
                  <span className="text-6xl md:text-7xl font-serif text-primary">20</span>
                  <span className="text-2xl font-serif text-foreground ml-2">Year</span>
                  <p className="text-xl font-medium text-foreground">Full Warranty</p>
                </div>
                
                <div className="w-full h-px bg-border my-6" />
                
                <img 
                  src={homeDepotAuthorized} 
                  alt="Home Depot Authorized Independent Provider" 
                  className="h-24 md:h-28 w-auto mx-auto drop-shadow-lg"
                />
                
                <p className="mt-6 text-muted-foreground">
                  Installed by Select Source Water,<br />
                  a Home Depot Authorized Water<br />
                  Treatment Service Provider.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Optional RO System */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
                Optional Add-On
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
                Point-of-Use <span className="text-primary">RO System</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                For the purest drinking water, add our optional Reverse Osmosis system. 
                It provides pure, great-tasting drinking water by removing dissolved solids 
                like salts, lead, and fluoride.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link to="/filtration-technology" className="gap-2">
                    Learn About Filtration
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/maintenance" className="gap-2">
                    View Maintenance Plans
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
