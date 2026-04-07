import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { 
  Droplets, 
  Sparkles, 
  Heart, 
  Home,
  Waves,
  ArrowRight
} from "lucide-react";
import { FloatingBubbles } from "./WaterEffects";
import { Button } from "./ui/button";
import crewImg from "@/assets/photos/crew.png";

const transformations = [
  { 
    before: "Hard water scale damaging appliances",
    after: "Protected pipes & appliances",
    icon: Home,
    link: "/hygia-system"
  },
  { 
    before: "Dry, itchy skin and dull hair",
    after: "Soft skin & silky hair",
    icon: Heart,
    link: "/hygia-system"
  },
  { 
    before: "Spots on dishes and fixtures",
    after: "Sparkling clean everything",
    icon: Sparkles,
    link: "/filtration-technology"
  },
  { 
    before: "Chemical taste and odors",
    after: "Pure, refreshing taste",
    icon: Droplets,
    link: "/what-in-water"
  },
];

export const ProblemSolution = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Soft background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full" />
      </div>
      
      {/* Subtle floating bubbles */}
      <FloatingBubbles count={8} />

      <div className="container relative" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-wider mb-4">
            <Waves className="h-4 w-4" />
            <span>The Transformation</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-2">
            Transform Your Water,
          </h2>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary mb-6">
            Transform Your Life
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how we turn everyday water frustrations into pure comfort.
          </p>
        </motion.div>

        {/* Vertical timeline with centered icons - CONSISTENT Before Left, After Right */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical line connecting icons */}
          <div className="absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 -translate-x-1/2 hidden md:block" />

          <div className="space-y-6 md:space-y-0">
            {transformations.map((item, index) => (
              <motion.div
                key={item.before}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
              >
                <Link 
                  to={item.link}
                  className="group block"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-center py-4 md:py-6">
                    
                    {/* BEFORE - Always Left Side */}
                    <div className="text-center md:text-right order-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-1 block">
                        Before
                      </span>
                      <p className="text-foreground/70 line-through decoration-muted-foreground/30 group-hover:text-foreground/50 transition-colors">
                        {item.before}
                      </p>
                    </div>

                    {/* Center Icon */}
                    <div className="flex justify-center order-first md:order-2">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-card border-2 border-primary/20 shadow-lg flex items-center justify-center group-hover:border-primary/50 group-hover:scale-110 transition-all duration-300 relative z-10">
                        <item.icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                      </div>
                    </div>

                    {/* AFTER - Always Right Side */}
                    <div className="text-center md:text-left order-2 md:order-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-1 block">
                        After
                      </span>
                      <p className="text-foreground font-semibold group-hover:text-primary transition-colors">
                        {item.after}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Crew Photo - Trust Builder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-2xl mx-auto mt-12"
        >
          <div className="relative group overflow-hidden rounded-2xl border border-border/30 shadow-lg">
            <img 
              src={crewImg} 
              alt="Select Source Water Team" 
              className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-6 text-center">
              <p className="text-primary-foreground font-serif text-lg">Our Expert Team</p>
              <p className="text-primary-foreground/70 text-sm">Serving Southern California since 1998</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" variant="outline" className="rounded-full px-8">
            <Link to="/what-in-water" className="gap-2">
              <Droplets className="h-4 w-4" />
              Experience the difference today
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
