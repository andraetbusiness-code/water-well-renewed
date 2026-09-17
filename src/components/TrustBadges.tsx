import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import homeDepotAuthorized from "@/assets/home-depot-authorized.png";
import { WaveDivider } from "@/components/WaveDivider";

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
        {/* Partner section - organic presentation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <div className="inline-flex flex-col items-center">
            <span className="text-primary-foreground/50 text-xs uppercase tracking-widest mb-4">
              Trusted Partner
            </span>
            
            {/* Logo blended naturally */}
            <div className="relative group">
              <div className="absolute inset-0 -m-8 bg-primary-foreground/5 rounded-full blur-2xl group-hover:bg-primary-foreground/10 transition-colors" />
              <img 
                src={homeDepotAuthorized} 
                alt="Home Depot Home Services Authorized Independent Provider" 
                className="relative h-24 md:h-32 w-auto drop-shadow-lg"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
