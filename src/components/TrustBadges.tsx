import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import homeDepotLogo from "@/assets/home-depot-logo.png";
import { WaveDivider } from "@/components/WaveDivider";

const stats = [
  { value: "25+", label: "Years of Excellence" },
  { value: "10K+", label: "Happy Families" },
  { value: "5-Day", label: "Risk-Free Trial" },
  { value: "Lifetime", label: "Warranty" },
];

export const TrustBadges = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      {/* Organic teal gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
      
      {/* Floating organic shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-10 left-[10%] w-40 h-40 bg-primary-foreground/5 rounded-full blur-2xl"
          animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-[15%] w-60 h-60 bg-primary-foreground/5 rounded-full blur-3xl"
          animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-[60%] w-32 h-32 bg-accent/10 rounded-full blur-2xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {/* Wave dividers */}
      <WaveDivider position="top" fillColor="hsl(var(--background))" variant="organic" />
      <WaveDivider position="bottom" fillColor="hsl(var(--secondary) / 0.2)" variant="gentle" />

      <div className="container relative z-10" ref={ref}>
        {/* Stats - flowing horizontal layout */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 lg:gap-24 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              {/* Organic underline on hover */}
              <div className="relative inline-block">
                <span className="block text-5xl md:text-6xl lg:text-7xl font-serif text-primary-foreground mb-2 group-hover:scale-105 transition-transform">
                  {stat.value}
                </span>
                <motion.span 
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-accent/60 rounded-full origin-left"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                />
              </div>
              <span className="text-sm md:text-base text-primary-foreground/70 font-medium tracking-wide">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Partner section - organic presentation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex flex-col items-center">
            <span className="text-primary-foreground/50 text-xs uppercase tracking-widest mb-4">
              Trusted Partner
            </span>
            
            {/* Logo with organic glow */}
            <div className="relative group">
              <div className="absolute inset-0 -m-6 bg-primary-foreground/10 rounded-full blur-xl group-hover:bg-primary-foreground/20 transition-colors" />
              <div className="relative bg-primary-foreground rounded-2xl px-10 py-5 shadow-2xl">
                <img 
                  src={homeDepotLogo} 
                  alt="Home Depot Partner" 
                  className="h-10 md:h-12 w-auto"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};