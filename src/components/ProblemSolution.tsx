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

const transformations = [
  { 
    before: { 
      title: "Chlorine", 
      desc: "Chemical taste & odor" 
    },
    after: { 
      title: "Chlorine", 
      desc: "Removed" 
    },
    icon: Droplets,
    link: "/what-in-water"
  },
  { 
    before: { 
      title: "Hardness", 
      desc: "Scale buildup in pipes" 
    },
    after: { 
      title: "Hardness", 
      desc: "Reduced" 
    },
    icon: Home,
    link: "/hygia-system"
  },
  { 
    before: { 
      title: "VOCs", 
      desc: "Pesticides & chemicals" 
    },
    after: { 
      title: "VOCs", 
      desc: "Removed" 
    },
    icon: Sparkles,
    link: "/filtration-technology"
  },
  { 
    before: { 
      title: "Bacteria", 
      desc: "Harmful contaminants" 
    },
    after: { 
      title: "Bacteria", 
      desc: "Neutralized" 
    },
    icon: Heart,
    link: "/hygia-system"
  },
  { 
    before: { 
      title: "Scale", 
      desc: "Appliance damage" 
    },
    after: { 
      title: "Scale", 
      desc: "Prevented" 
    },
    icon: Waves,
    link: "/maintenance"
  },
];

export const ProblemSolution = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden bg-muted/30">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      {/* Reduced bubbles for subtlety */}
      <FloatingBubbles count={5} />

      <div className="container relative" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-4">
            Before & After <span className="text-primary">Filtration</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            See what our HYGIA+ system removes from your water.
          </p>
        </motion.div>

        {/* Clean table-style comparison */}
        <div className="max-w-3xl mx-auto">
          {/* Desktop Header Row */}
          <div className="hidden md:grid md:grid-cols-[1fr_80px_1fr] items-center gap-4 pb-4 mb-4 border-b border-border">
            <div className="text-center">
              <span className="text-sm font-bold uppercase tracking-wider text-destructive">
                Before
              </span>
            </div>
            <div /> {/* Spacer */}
            <div className="text-center">
              <span className="text-sm font-bold uppercase tracking-wider text-primary">
                After
              </span>
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="space-y-3">
            {transformations.map((item, index) => (
              <motion.div
                key={item.before.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.05 * index }}
              >
                <Link 
                  to={item.link}
                  className="group block"
                >
                  <div className="grid grid-cols-[1fr_60px_1fr] md:grid-cols-[1fr_80px_1fr] items-center gap-2 md:gap-4 p-4 md:p-5 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all duration-200">
                    
                    {/* Before - Left Side */}
                    <div className="text-center md:text-center">
                      <div className="inline-flex items-center gap-2 justify-center">
                        <div className="w-2 h-2 rounded-full bg-destructive/60 hidden md:block" />
                        <span className="text-foreground font-medium line-through decoration-destructive/50 decoration-2">
                          {item.before.title}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                        {item.before.desc}
                      </p>
                    </div>

                    {/* Center Arrow */}
                    <div className="flex justify-center">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:scale-105 transition-all duration-200">
                        <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                    </div>

                    {/* After - Right Side */}
                    <div className="text-center md:text-center">
                      <div className="inline-flex items-center gap-2 justify-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 hidden md:block" />
                        <span className="text-foreground font-semibold">
                          {item.after.title}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-primary font-medium mt-0.5">
                        {item.after.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Button asChild size="lg" variant="default">
            <Link to="/what-in-water" className="gap-2">
              See Full Water Analysis
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
