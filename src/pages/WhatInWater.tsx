import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  ArrowRight,
  Droplets,
  Check,
  X,
  Phone,
  AlertTriangle,
  Shield,
  MapPin,
  
  Users,
  Home,
  HelpCircle
} from "lucide-react";
import { PageLayout, PageHero } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { FloatingBubbles } from "@/components/WaterEffects";
import { InfographicCard, InfographicGrid } from "@/components/InfographicCard";
import { cacheBust } from "@/lib/cache-bust";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import whatsInWaterImg from "@/assets/infographics/whats-in-water-styled.png";
import homeNeedsFiltrationImg from "@/assets/infographics/home-needs-filtration-styled.png";

const cityData = [
  {
    city: "Beaumont, CA",
    hardness: "177 PPM / 10.4 GPG (Moderate-Hard)",
    epaConcern: "2 contaminants detected above EPA Maximum Contaminant Level Goals (MCLGs)",
    population: "59,700+ residents",
    growthNote: "4,210 new housing units planned — water demand increasing",
    recommendation: "HYGIA+ whole-house system + annual maintenance",
  },
  {
    city: "Banning, CA",
    hardness: "249 PPM / 14.6 GPG (Very Hard — among the hardest in SoCal)",
    epaConcern: "Chromium-6 detected in municipal supply",
    wells: "19 active wells",
    recommendation: "HYGIA+ with enhanced KDF and carbon stages for chromium-6",
  },
  {
    city: "Hemet, CA",
    hardness: "155 PPM / 9.1 GPG",
    epaConcern: "Arsenic AND chromium-6 detected above California drinking water action levels; 10 total contaminants of concern",
    population: "~90,000",
    recommendation: "HYGIA+ with UV stage for comprehensive contaminant removal",
  },
];

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
    name: "Chromium-6",
    before: "Detected in Banning supply",
    after: "Reduced",
    beforeDetail: "A known carcinogen found in Inland Empire municipal water.",
    afterDetail: "KDF media + carbon filtration reduces chromium-6 levels."
  },
  {
    name: "Arsenic",
    before: "Detected in Hemet supply",
    after: "Reduced",
    beforeDetail: "Long-term exposure to arsenic in drinking water poses health risks.",
    afterDetail: "Multi-stage carbon + fine filtration reduces arsenic."
  },
  {
    name: "Cost Savings",
    before: "Expensive bottled water",
    after: "Eliminated",
    beforeDetail: "Average family spends $500+ yearly on bottled water.",
    afterDetail: "Clean water from every tap saves money instantly."
  }
];

const faqItems = [
  {
    question: "Is Banning's tap water safe to drink?",
    answer: "Banning's water meets all legal EPA Maximum Contaminant Levels (MCLs) and is legally safe. However, chromium-6 has been detected, and the water hardness (249 PPM) is among the highest in Southern California. Legal compliance and optimal water quality are not the same thing."
  },
  {
    question: "Does Hemet have arsenic in the water?",
    answer: "Yes. EWG data shows arsenic and chromium-6 have been detected in Hemet's water supply above California's public health goals, which are set lower than the federal EPA action level. With 10 contaminants of concern, Hemet residents benefit most from multi-stage whole-house filtration."
  },
  {
    question: "How hard is Beaumont's water compared to the rest of California?",
    answer: "Beaumont's water tests at approximately 177 PPM (10.4 GPG). The California state average is approximately 80–100 PPM. Beaumont is nearly double the state average. This level of hardness causes scale buildup in water heaters and appliances, reduces soap lathering, and leaves spots on dishes and fixtures."
  },
];

export default function WhatInWater() {
  const comparisonRef = useRef(null);
  const comparisonInView = useInView(comparisonRef, { once: true, margin: "-100px" });

  return (
    <PageLayout>
      <Helmet>
        <title>What's In Inland Empire Water? Contaminants, Hardness & Solutions | SSW SoCal</title>
        <meta name="description" content="Chromium-6 in Banning, arsenic in Hemet, 177 PPM hardness in Beaumont. Learn what's in your water and how we fix it. Free test: (951) 499-5136." />
        <link rel="canonical" href="https://selectsourcewatercalifornia.com/what-in-water" />
      </Helmet>

      <PageHero 
        badge="Water Quality"
        title="What's In"
        subtitle="Your Water?"
        description="Discover what contaminants may be lurking in your Inland Empire tap water. From chromium-6 in Banning to arsenic in Hemet — and universal hard water across the region — our HYGIA+ system eliminates them all."
      />

      {/* SoCal Contaminant Data Section */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-secondary/20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              Local Water Quality Data
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              What's In <span className="text-primary">YOUR</span> City's Water?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {cityData.map((city, index) => (
              <motion.div
                key={city.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-card border border-border shadow-sm"
              >
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">{city.city}</h3>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Droplets className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-foreground">Hardness:</span>
                      <p className="text-muted-foreground">{city.hardness}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-foreground">EPA Concern:</span>
                      <p className="text-muted-foreground">{city.epaConcern}</p>
                    </div>
                  </div>
                  
                  {city.population && (
                    <div className="flex items-start gap-2">
                      <Users className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">{city.population}</p>
                    </div>
                  )}
                  
                  {city.wells && (
                    <div className="flex items-start gap-2">
                      <Droplets className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">{city.wells}</p>
                    </div>
                  )}
                  
                  {city.growthNote && (
                    <div className="flex items-start gap-2">
                      <Home className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">{city.growthNote}</p>
                    </div>
                  )}
                  
                  <div className="pt-3 border-t border-border">
                    <div className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-medium text-primary">{city.recommendation}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center max-w-3xl mx-auto italic">
            Data sourced from Environmental Working Group (EWG) Tap Water Database and local water utility quality reports. Contaminant levels change seasonally. A free in-home water test gives you real-time data for your specific address.
          </p>
        </div>
      </section>

      {/* Infographics Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
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
              src={cacheBust(whatsInWaterImg)} 
              alt="What's In Your Water - Common Contaminants"
              delay={0}
            />
            <InfographicCard 
              src={cacheBust(homeNeedsFiltrationImg)} 
              alt="Does Your Home Need Water Filtration?"
              delay={0.15}
            />
          </InfographicGrid>
        </div>
      </section>

      {/* Before/After Comparison */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-secondary/20">
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
              See the dramatic difference our whole-house water filtration system makes for Inland Empire homes.
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

      {/* FAQ Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <HelpCircle className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">FAQ</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Water Quality FAQ — <span className="text-primary">Inland Empire</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <AccordionItem value={`faq-${index}`} className="border border-border rounded-xl px-6 bg-card">
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
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
                and receive a customized solution for your Inland Empire home.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/free-water-test" className="gap-2">
                    Schedule Free Water Test
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="tel:+19514995136" className="gap-2">
                    <Phone className="h-4 w-4" />
                    (951) 499-5136
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
