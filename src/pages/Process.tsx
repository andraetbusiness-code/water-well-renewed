import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight,
  Phone,
  ClipboardCheck,
  Settings,
  Wrench,
  ThumbsUp,
  Droplets,
  Calendar
} from "lucide-react";
import { PageLayout, PageHero } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { FloatingBubbles, WaveBackground } from "@/components/WaterEffects";

const processSteps = [
  {
    icon: Calendar,
    title: "Schedule Free Water Test",
    description: "Call us or fill out our contact form to schedule a free in-home water quality assessment. Our certified technicians will come to your home at a time that works for you.",
    details: [
      "No-obligation consultation",
      "Flexible scheduling",
      "Certified water specialists"
    ]
  },
  {
    icon: ClipboardCheck,
    title: "Water Quality Assessment",
    description: "We test your water right in your home to identify exactly what contaminants and hardness levels are present. You'll get a detailed report of what's in your water.",
    details: [
      "Comprehensive testing",
      "Instant results",
      "Clear explanation of findings"
    ]
  },
  {
    icon: Settings,
    title: "Customized Solution Design",
    description: "Based on your water quality results and household needs, we'll recommend the perfect HYGIA+ system configuration tailored specifically for your home.",
    details: [
      "Personalized recommendations",
      "Transparent pricing",
      "Multiple options available"
    ]
  },
  {
    icon: Wrench,
    title: "Professional Installation",
    description: "Our licensed technicians install your system with white-glove service. Most installations are completed in just one day with zero mess left behind.",
    details: [
      "One-day installation",
      "Licensed technicians",
      "Clean, professional work"
    ]
  },
  {
    icon: ThumbsUp,
    title: "Enjoy Pure Water",
    description: "Start enjoying clean, soft, great-tasting water from every tap in your home. We back everything with a 20-year warranty and lifetime support.",
    details: [
      "20-year full warranty",
      "Lifetime customer support",
      "Satisfaction guaranteed"
    ]
  }
];

export default function Process() {
  const stepsRef = useRef(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "-100px" });

  return (
    <PageLayout>
      <PageHero 
        badge="5 Simple Steps"
        title="Your Path to"
        subtitle="Cleaner, Healthier Water"
        description="From your first call to enjoying pure water, we make the entire process simple and stress-free."
      />

      {/* Process Steps */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <FloatingBubbles count={10} />
        <WaveBackground className="opacity-20" />
        
        <div className="container relative" ref={stepsRef}>
          {/* Vertical timeline on desktop */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-primary/10 hidden md:block md:-translate-x-1/2" />
              
              <div className="space-y-12 md:space-y-0">
                {processSteps.map((step, index) => {
                  const isEven = index % 2 === 0;
                  
                  return (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 40 }}
                      animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                      className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 md:py-12 ${
                        isEven ? "" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Content */}
                      <div className={`flex-1 ${isEven ? "md:text-right" : ""}`}>
                        <div className={`p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all ${
                          isEven ? "md:mr-6" : "md:ml-6"
                        }`}>
                          <div className={`flex items-center gap-4 mb-4 ${isEven ? "md:flex-row-reverse" : ""}`}>
                            {/* Mobile icon */}
                            <div className="md:hidden w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                              <step.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-serif text-foreground">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-muted-foreground mb-4">
                            {step.description}
                          </p>
                          <ul className={`space-y-2 ${isEven ? "md:text-right" : ""}`}>
                            {step.details.map((detail) => (
                              <li key={detail} className={`flex items-center gap-2 text-sm text-foreground ${
                                isEven ? "md:flex-row-reverse" : ""
                              }`}>
                                <Droplets className="h-3 w-3 text-primary flex-shrink-0" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      {/* Center icon - desktop only */}
                      <div className="hidden md:flex flex-shrink-0 relative z-10">
                        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                          <step.icon className="h-7 w-7" />
                        </div>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-secondary px-3 py-1 rounded-full text-sm font-bold text-primary">
                          {index + 1}
                        </div>
                      </div>
                      
                      {/* Empty space for alternating layout */}
                      <div className="hidden md:block flex-1" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started CTA */}
      <section className="py-20 md:py-28 bg-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
                Get Started Now!
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Take the first step toward cleaner, healthier water for your family. 
                Schedule your free water test today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/#contact" className="gap-2">
                    Schedule Free Test
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="tel:8334227765" className="gap-2">
                    <Phone className="h-4 w-4" />
                    Call 833.422.7765
                  </a>
                </Button>
              </div>
              
              <p className="mt-8 text-sm text-muted-foreground">
                Select Source Water, LLC — Est. 1998<br />
                Home Depot Authorized Water Treatment Service Provider
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
