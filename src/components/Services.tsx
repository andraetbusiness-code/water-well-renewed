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
  },
  {
    icon: Filter,
    title: "Custom Filtration",
    description: "State-of-the-art carbon filtration systems designed specifically for your water conditions.",
  },
  {
    icon: Droplets,
    title: "Water Softening",
    description: "Dual-tank softening systems with lifetime resin that eliminate hard water minerals.",
  },
  {
    icon: Wrench,
    title: "Professional Installation",
    description: "White-glove, one-day installation by licensed technicians with zero mess.",
  },
  {
    icon: Settings,
    title: "Maintenance Plans",
    description: "Affordable annual maintenance to keep your system running at peak efficiency.",
  },
  {
    icon: Headphones,
    title: "Lifetime Support",
    description: "Dedicated customer service and comprehensive lifetime warranty coverage.",
  },
];

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Complete Water Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From testing to installation to ongoing maintenance, we handle everything 
            so you can enjoy pure water worry-free.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-6 lg:p-8 card-elevated border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                <service.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
