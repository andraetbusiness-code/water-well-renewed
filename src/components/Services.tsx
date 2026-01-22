import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Droplets, 
  Filter, 
  Wrench, 
  TestTube,
  Settings,
  Headphones,
  ArrowRight
} from "lucide-react";

const services = [
  {
    icon: TestTube,
    title: "Free Water Testing",
    description: "Comprehensive in-home water quality analysis to identify contaminants and hardness levels.",
    accent: "from-accent/30 to-accent/10",
  },
  {
    icon: Filter,
    title: "Custom Filtration",
    description: "State-of-the-art carbon filtration systems designed for your specific water conditions.",
    accent: "from-primary/20 to-water-light/30",
  },
  {
    icon: Droplets,
    title: "Water Softening",
    description: "Dual-tank softening systems with lifetime resin that eliminate hard water minerals.",
    accent: "from-water-light/40 to-primary/20",
  },
  {
    icon: Wrench,
    title: "Professional Installation",
    description: "White-glove, one-day installation by licensed technicians with zero mess.",
    accent: "from-secondary to-water-light/20",
  },
  {
    icon: Settings,
    title: "Maintenance Plans",
    description: "Affordable annual maintenance to keep your system running at peak efficiency.",
    accent: "from-primary/15 to-secondary",
  },
  {
    icon: Headphones,
    title: "Lifetime Support",
    description: "Dedicated customer service and comprehensive lifetime warranty coverage.",
    accent: "from-accent/20 to-primary/15",
  },
];

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden">
      {/* Flowing background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-water-light/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
      </div>
      
      <div className="container relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-5">
            Complete Water Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From testing to installation to ongoing maintenance, we handle everything 
            so you can enjoy pure water worry-free.
          </p>
        </motion.div>

        {/* Organic flowing list - no boxes */}
        <div className="max-w-5xl mx-auto">
          <div className="space-y-6 md:space-y-0">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center gap-6 md:gap-10 py-8 md:py-10 group ${
                    isEven ? "" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Flowing gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[3rem] ${
                    isEven ? "-skew-x-2" : "skew-x-2"
                  }`} />
                  
                  {/* Icon with organic shape */}
                  <div className="relative flex-shrink-0 z-10">
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${service.accent} rounded-full blur-xl scale-150 opacity-60`}
                      animate={{ 
                        scale: [1.5, 1.7, 1.5],
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        delay: index * 0.3 
                      }}
                    />
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-card flex items-center justify-center shadow-lg border border-border/50">
                      <service.icon className="h-9 w-9 md:h-11 md:w-11 text-primary" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className={`relative z-10 flex-1 ${isEven ? "" : "md:text-right"}`}>
                    <h3 className="text-xl md:text-2xl font-serif text-foreground mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Subtle connector line */}
                  {index < services.length - 1 && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-6 bg-gradient-to-b from-border to-transparent hidden md:block" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            <span>Get started with a free water test</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};