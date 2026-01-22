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
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Flowing background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-water-light/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>
      
      {/* Floating bubbles animation */}
      <FloatingBubbles count={12} />

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
            <span>What's In Your Water?</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-5">
            Before & After<br />
            <span className="text-primary">Filtration</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See the real difference our HYGIA+ system makes to your water quality.
          </p>
        </motion.div>

        {/* Before/After comparison - consistent layout */}
        <div className="max-w-5xl mx-auto">
          {/* Headers for desktop */}
          <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] gap-8 mb-8 px-4">
            <div className="text-right">
              <span className="text-sm font-semibold uppercase tracking-wider text-destructive/70">
                Before Filtration
              </span>
            </div>
            <div className="w-16" /> {/* Spacer for icon column */}
            <div className="text-left">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                After Filtration
              </span>
            </div>
          </div>

          {/* Transformation rows */}
          <div className="space-y-4 md:space-y-3">
            {transformations.map((item, index) => (
              <motion.div
                key={item.before.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <Link 
                  to={item.link}
                  className="group block"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-center p-4 md:p-6 rounded-2xl bg-card/50 hover:bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    
                    {/* Before - Always on Left */}
                    <div className="flex items-center gap-4 md:justify-end">
                      {/* Mobile label */}
                      <span className="md:hidden text-xs font-semibold uppercase tracking-wider text-destructive/70 w-16 flex-shrink-0">
                        Before
                      </span>
                      <div className="md:text-right flex-1">
                        <span className="text-foreground font-medium line-through decoration-destructive/40">
                          {item.before.title}
                        </span>
                        <p className="text-sm text-muted-foreground">
                          {item.before.desc}
                        </p>
                      </div>
                      {/* Red indicator - desktop only */}
                      <div className="hidden md:block w-2 h-2 rounded-full bg-destructive/60" />
                    </div>

                    {/* Center Icon with Arrow */}
                    <div className="hidden md:flex flex-col items-center gap-1">
                      <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <item.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-primary/40" />
                    </div>

                    {/* After - Always on Right */}
                    <div className="flex items-center gap-4">
                      {/* Mobile label */}
                      <span className="md:hidden text-xs font-semibold uppercase tracking-wider text-primary w-16 flex-shrink-0">
                        After
                      </span>
                      {/* Green indicator - desktop only */}
                      <div className="hidden md:block w-2 h-2 rounded-full bg-green-500" />
                      <div className="flex-1">
                        <span className="text-foreground font-semibold">
                          {item.after.title}
                        </span>
                        <p className="text-sm text-primary font-medium">
                          {item.after.desc}
                        </p>
                      </div>
                      {/* Learn more arrow */}
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
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
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" variant="default">
            <Link to="/what-in-water" className="gap-2">
              <Droplets className="h-4 w-4" />
              See Full Water Analysis
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
