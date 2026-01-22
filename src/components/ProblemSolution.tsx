import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Droplets, 
  Sparkles, 
  Heart, 
  Home,
  ArrowDown,
  Waves
} from "lucide-react";

const transformations = [
  { 
    before: "Hard water scale damaging appliances", 
    after: "Protected pipes & appliances",
    icon: Home,
    color: "from-primary/20 to-water-light/30"
  },
  { 
    before: "Dry, itchy skin and dull hair", 
    after: "Soft skin & silky hair",
    icon: Heart,
    color: "from-accent/20 to-primary/20"
  },
  { 
    before: "Spots on dishes and fixtures", 
    after: "Sparkling clean everything",
    icon: Sparkles,
    color: "from-water-light/30 to-accent/20"
  },
  { 
    before: "Chemical taste and odors", 
    after: "Pure, refreshing taste",
    icon: Droplets,
    color: "from-primary/30 to-water-light/40"
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

      <div className="container relative" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-wider mb-4">
            <Waves className="h-4 w-4" />
            <span>The Transformation</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-5">
            Transform Your Water,<br />
            <span className="text-primary">Transform Your Life</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how we turn everyday water frustrations into pure comfort.
          </p>
        </motion.div>

        {/* Flowing transformation timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting flow line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block">
            <motion.div 
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full h-full bg-gradient-to-b from-muted via-primary/40 to-accent/60"
            />
          </div>

          {/* Transformation items */}
          <div className="space-y-8 md:space-y-0">
            {transformations.map((item, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={item.after}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                  className={`relative flex items-center gap-6 md:gap-12 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Before text - left or right based on index */}
                  <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <div className={`inline-block ${isEven ? "md:ml-auto" : ""}`}>
                      <span className="text-xs uppercase tracking-wider text-muted-foreground/60 mb-1 block">
                        Before
                      </span>
                      <p className="text-muted-foreground line-through decoration-destructive/40 text-lg">
                        {item.before}
                      </p>
                    </div>
                  </div>

                  {/* Center icon with organic shape */}
                  <div className="relative flex-shrink-0 z-10">
                    {/* Animated blob background */}
                    <motion.div 
                      className={`absolute inset-0 -m-3 bg-gradient-to-br ${item.color} rounded-full blur-md`}
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        delay: index * 0.5 
                      }}
                    />
                    
                    {/* Icon container */}
                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center shadow-lg">
                      <item.icon className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                    </div>
                    
                    {/* Arrow indicator */}
                    <motion.div 
                      className="absolute -bottom-6 left-1/2 -translate-x-1/2"
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {index < transformations.length - 1 && (
                        <ArrowDown className="h-4 w-4 text-primary/40 hidden md:block" />
                      )}
                    </motion.div>
                  </div>

                  {/* After text - opposite side */}
                  <div className={`flex-1 ${isEven ? "md:text-left" : "md:text-right"}`}>
                    <div className={`inline-block ${!isEven ? "md:ml-auto" : ""}`}>
                      <span className="text-xs uppercase tracking-wider text-accent mb-1 block">
                        After
                      </span>
                      <p className="text-foreground font-medium text-lg md:text-xl">
                        {item.after}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom flourish */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-secondary/50 border border-border">
            <Droplets className="h-5 w-5 text-primary" />
            <span className="text-foreground font-medium">Experience the difference today</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};