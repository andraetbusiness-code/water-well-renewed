import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  ArrowRight,
  ArrowDown,
  Droplets,
  Home,
  Check
} from "lucide-react";
import { PageLayout, PageHero } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { FloatingBubbles } from "@/components/WaterEffects";
import { InfographicCard, InfographicGrid } from "@/components/InfographicCard";
import { cacheBust } from "@/lib/cache-bust";
import filtrationStagesImg from "@/assets/infographics/10-stages-filtration-styled.png";
import benefitsImg from "@/assets/infographics/benefits-styled.png";

const filtrationStages = [
  { name: "Sediment Filter", description: "Removes sand, silt, and rust.", side: "left" },
  { name: "Catalytic Carbon", description: "Eliminates chlorine & chloramines.", side: "left" },
  { name: "Blonde Resin 10%", description: "Reduces hardness minerals.", side: "left" },
  { name: "Black Resin 10%", description: "Further softens the water.", side: "left" },
  { name: "Coconut Shell Carbon", description: "Removes chemicals & odors.", side: "left" },
  { name: "KDF Media", description: "Reduces heavy metals.", side: "right" },
  { name: "Activated Carbon", description: "Improves taste & removes VOCs.", side: "right" },
  { name: "Fine Filter", description: "Polishes and clarifies water.", side: "right" },
  { name: "UV Light", description: "Kills bacteria & viruses.", side: "right" },
  { name: "Final Polishing Filter", description: "Gives water a fresh taste.", side: "right" }
];

const contaminantData = [
  { contaminant: "Hardness (calcium/magnesium)", found: "Yes — 155–249 PPM across IE cities", stage: "Stages 3 & 4 (Ion Exchange Resin)" },
  { contaminant: "Chlorine", found: "Yes — municipal treatment", stage: "Stage 2 (Catalytic Carbon)" },
  { contaminant: "Chloramines", found: "Yes — municipal treatment", stage: "Stage 2 (Catalytic Carbon)" },
  { contaminant: "Chromium-6", found: "Detected in Banning & Hemet", stage: "Stage 5 (Coconut Shell Carbon) + Stage 6 (KDF)" },
  { contaminant: "Arsenic", found: "Detected in Hemet", stage: "Stages 5–8 (multi-stage carbon + fine filter)" },
  { contaminant: "VOCs / Pesticides", found: "Agricultural IE history", stage: "Stage 2 + Stage 5 (Carbon stages)" },
  { contaminant: "Bacteria/Viruses", found: "Well water risk", stage: "Stage 9 (UV Light)" },
];

export default function FiltrationTechnology() {
  const stagesRef = useRef(null);
  const stagesInView = useInView(stagesRef, { once: true, margin: "-100px" });

  return (
    <PageLayout>
      <Helmet>
        <title>10-Stage Water Filtration Technology | Select Source Water — Southern California</title>
        <meta name="description" content="Our 10-stage whole house system removes hard water, chlorine, chromium-6, arsenic, and more. Built for Inland Empire water conditions. Free test: (951) 499-5136." />
        <link rel="canonical" href="https://selectsourcewatercalifornia.com/filtration-technology" />
      </Helmet>

      <PageHero 
        badge="Advanced Technology"
        title="10 Stages of"
        subtitle="Whole House Water Filtration"
        description="Each stage targets specific contaminants, ensuring you get the cleanest, safest water possible."
      />

      {/* 10 Stages Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <FloatingBubbles count={10} />
        
        <div className="container relative" ref={stagesRef}>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-4">
              <div className="space-y-4">
                {filtrationStages.filter(s => s.side === "left").map((stage, index) => (
                  <motion.div
                    key={stage.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={stagesInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group"
                  >
                    <div className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{stage.name}</h3>
                        <p className="text-sm text-muted-foreground">{stage.description}</p>
                      </div>
                    </div>
                    {index < 4 && (
                      <div className="absolute left-7 -bottom-4 z-10">
                        <ArrowDown className="h-4 w-4 text-primary/40" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              
              <div className="space-y-4 md:mt-20">
                {filtrationStages.filter(s => s.side === "right").map((stage, index) => (
                  <motion.div
                    key={stage.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={stagesInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="relative group"
                  >
                    <div className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                        {index + 6}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{stage.name}</h3>
                        <p className="text-sm text-muted-foreground">{stage.description}</p>
                      </div>
                    </div>
                    {index < 4 && (
                      <div className="absolute left-7 -bottom-4 z-10">
                        <ArrowDown className="h-4 w-4 text-primary/40" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={stagesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground">
                <Home className="h-5 w-5" />
                <span className="font-semibold">Clean Water To Your Home</span>
                <Droplets className="h-5 w-5" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SoCal Relevance Section */}
      <section className="py-16 md:py-20 bg-[hsl(210,100%,97%)]">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6 text-center">
                Why Inland Empire Water Needs <span className="text-primary">Multi-Stage Filtration</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                Inland Empire tap water is among the hardest in California. Beaumont tests at 177 PPM, Banning at 249 PPM, and Moreno Valley at 197 PPM. Multiple-stage filtration isn't overkill — it's the right match for our regional water conditions. Each of the 10 stages in the HYGIA+ system addresses a specific challenge found in SoCal water supply: hardness minerals from the San Gorgonio Pass aquifer, chloramine disinfection byproducts from municipal treatment, and trace heavy metals from aging infrastructure.
              </p>

              {/* Contaminant Table */}
              <div className="overflow-x-auto rounded-xl border border-border/50 shadow-sm">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-primary/10">
                      <th className="px-4 py-3 text-sm font-semibold text-foreground">Contaminant</th>
                      <th className="px-4 py-3 text-sm font-semibold text-foreground">Found In IE Water?</th>
                      <th className="px-4 py-3 text-sm font-semibold text-foreground">HYGIA+ Stage That Removes It</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contaminantData.map((row, i) => (
                      <tr key={row.contaminant} className={i % 2 === 0 ? "bg-card" : "bg-secondary/20"}>
                        <td className="px-4 py-3 text-sm font-medium text-foreground">{row.contaminant}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{row.found}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{row.stage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 text-center">
                <Button asChild size="lg">
                  <Link to="/free-water-test" className="gap-2">
                    Get Your Free Water Test
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
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
              See The <span className="text-primary">Difference</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Visual guides to understanding our advanced filtration technology.
            </p>
          </motion.div>
          
          <InfographicGrid columns={2}>
            <InfographicCard 
              src={cacheBust(filtrationStagesImg)} 
              alt="10 Stages of Water Filtration - Visual guide showing each filtration stage"
              delay={0}
            />
            <InfographicCard 
              src={cacheBust(benefitsImg)} 
              alt="Benefits of Whole House Water Filtration"
              delay={0.15}
            />
          </InfographicGrid>
        </div>
      </section>

      {/* Why 10 Stages */}
      <section className="py-20 md:py-28 bg-secondary/30 relative overflow-hidden">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
                Why <span className="text-primary">10 Stages</span>?
              </h2>
              <p className="text-lg text-muted-foreground">
                Each stage is specifically designed to target different contaminants, 
                ensuring comprehensive water treatment that single-stage filters can't achieve.
              </p>
            </motion.div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                "Multi-layer protection against all contaminants",
                "Extended filter life through staged filtration",
                "Better taste with specialized polishing stages",
                "Bacteria elimination with UV treatment",
                "Scale prevention for appliance protection",
                "Chemical-free softening and purification"
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button asChild size="lg">
                <Link to="/hygia-system" className="gap-2">
                  Explore HYGIA+ System
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
