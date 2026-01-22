import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Droplets, 
  Filter, 
  Wrench, 
  TestTube,
  Settings,
  Headphones
} from "lucide-react";

const services = [
  {
    icon: TestTube,
    title: "Free Water Testing",
    description: "Comprehensive in-home water quality analysis to identify contaminants and hardness levels.",
    featured: true,
  },
  {
    icon: Filter,
    title: "Custom Filtration",
    description: "State-of-the-art carbon filtration systems designed for your specific water conditions.",
    featured: false,
  },
  {
    icon: Droplets,
    title: "Water Softening",
    description: "Dual-tank softening systems with lifetime resin that eliminate hard water minerals.",
    featured: true,
  },
  {
    icon: Wrench,
    title: "Professional Installation",
    description: "White-glove, one-day installation by licensed technicians with zero mess.",
    featured: false,
  },
  {
    icon: Settings,
    title: "Maintenance Plans",
    description: "Affordable annual maintenance to keep your system running at peak efficiency.",
    featured: false,
  },
  {
    icon: Headphones,
    title: "Lifetime Support",
    description: "Dedicated customer service and comprehensive lifetime warranty coverage.",
    featured: false,
  },
];

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Topographic pattern overlay */}
      <div className="absolute inset-0 topo-pattern opacity-40" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-primary/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-water-light/10 to-transparent" />
      
      <div className="container relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
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

        {/* Asymmetric bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative ${
                service.featured ? "md:row-span-1 lg:row-span-1" : ""
              }`}
            >
              <div className={`relative h-full bg-card rounded-3xl p-7 lg:p-8 border border-border transition-all duration-500 overflow-hidden ${
                service.featured 
                  ? "hover:border-accent/50 hover:shadow-[0_8px_40px_-12px_hsl(var(--accent)/0.3)]" 
                  : "hover:border-primary/30 card-elevated"
              }`}>
                {/* Accent gradient for featured */}
                {service.featured && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-full" />
                )}
                
                {/* Icon with organic background */}
                <div className="relative mb-6">
                  <div className={`absolute -top-2 -left-2 w-16 h-16 rounded-full blur-xl transition-opacity duration-500 ${
                    service.featured ? "bg-accent/20 group-hover:opacity-100" : "bg-primary/10 opacity-0 group-hover:opacity-100"
                  }`} />
                  <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
                    service.featured 
                      ? "bg-accent/10 group-hover:bg-accent/20" 
                      : "bg-secondary group-hover:bg-primary/10"
                  }`}>
                    <service.icon className={`h-7 w-7 ${
                      service.featured ? "text-accent" : "text-primary"
                    }`} />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                
                {/* Featured badge */}
                {service.featured && (
                  <div className="absolute top-6 right-6">
                    <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                      Popular
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};