import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight,
  Droplets,
  Check,
  X,
  Phone,
  AlertTriangle,
  Shield
} from "lucide-react";
import { PageLayout, PageHero } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { FloatingBubbles } from "@/components/WaterEffects";
import { InfographicCard, InfographicGrid } from "@/components/InfographicCard";
import whatsInWaterImg from "@/assets/infographics/whats-in-water-styled.png";
import homeNeedsFiltrationImg from "@/assets/infographics/home-needs-filtration-styled.png";

const contaminants = [
  {
    name: "Chlorine",
    before: "Chemical taste",
    after: "Removed",
    beforeDetail: "Causes unpleasant taste and odor. Can affect hair and skin health.",
    afterDetail: "Completely eliminated for fresh, clean-tasting water."
  },
  {
    name: "Hardness",
    before: "Scale buildup in pipes & appliances",
    after: "Reduced",
    beforeDetail: "Causes limescale, reduces appliance lifespan, and creates spots.",
    afterDetail: "Softened water protects your plumbing and appliances."
  },
  {
    name: "VOCs",
    before: "Pesticides, herbicides & chemicals",
    after: "Removed",
    beforeDetail: "Volatile organic compounds can pose health risks over time.",
    afterDetail: "Multi-stage carbon filtration removes harmful VOCs."
  },
  {
    name: "Bacteria",
    before: "Harmful contaminants",
    after: "Neutralized",
    beforeDetail: "Waterborne bacteria can cause illness and health issues.",
    afterDetail: "UV treatment kills 99.9% of bacteria and viruses."
  },
  {
    name: "Cost Savings",
    before: "Expensive bottled water",
    after: "Eliminated",
    beforeDetail: "Average family spends $500+ yearly on bottled water.",
    afterDetail: "Clean water from every tap saves money instantly."
  }
];

export default function WhatInWater() {
  const comparisonRef = useRef(null);
  const comparisonInView = useInView(comparisonRef, { once: true, margin: "-100px" });

  return (
    <PageLayout>
      <PageHero 
        badge="Water Quality"
        title="What's In"
        subtitle="Your Water?"
        description="Discover what contaminants may be lurking in your tap water and how our HYGIA+ system eliminates them."
      />

      {/* Infographics Section */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-secondary/20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Understanding Your <span className="text-primary">Water Quality</span>
            </h2>
          </motion.div>
          
          <InfographicGrid columns={2}>
            <InfographicCard 
              src={whatsInWaterImg} 
              alt="What's In Your Water - Common Contaminants"
              delay={0}
            />
            <InfographicCard 
              src={homeNeedsFiltrationImg} 
              alt="Does Your Home Need Water Filtration?"
              delay={0.15}
            />
          </InfographicGrid>
        </div>
      </section>

      {/* Before/After Comparison */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <FloatingBubbles count={12} />
        
        <div className="container relative" ref={comparisonRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={comparisonInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Before & After Filtration
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See the dramatic difference our whole-house water filtration system makes.
            </p>
          </motion.div>

          {/* Desktop header */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 mb-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-semibold">Before Filtration</span>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600">
                <Shield className="h-4 w-4" />
                <span className="font-semibold">After Filtration</span>
              </div>
            </div>
          </div>

          {/* Contaminant rows */}
          <div className="space-y-6 max-w-5xl mx-auto">
            {contaminants.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                animate={comparisonInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="grid md:grid-cols-2 gap-4 md:gap-8"
              >
                {/* Before */}
                <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/20">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                      <X className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="md:hidden text-xs font-semibold uppercase tracking-wider text-destructive">Before</span>
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                      </div>
                      <p className="text-destructive font-medium mb-2">{item.before}</p>
                      <p className="text-sm text-muted-foreground">{item.beforeDetail}</p>
                    </div>
                  </div>
                </div>
                
                {/* After */}
                <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="md:hidden text-xs font-semibold uppercase tracking-wider text-green-600">After</span>
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                      </div>
                      <p className="text-green-600 font-medium mb-2">{item.after}</p>
                      <p className="text-sm text-muted-foreground">{item.afterDetail}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-28 bg-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Droplets className="h-12 w-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
                Enjoy Clean, Safe &<br />
                <span className="text-primary">Great-Tasting Water!</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get a free in-home water test to find out exactly what's in your water 
                and receive a customized solution for your home.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/#contact" className="gap-2">
                    Schedule Free Water Test
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
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
