import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Award, Droplets } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { WaveDividerLayered } from "@/components/WaveDivider";
import heroImage from "@/assets/hero-water.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with warm overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Pure water flowing"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
        
        {/* Floating decorative droplets */}
        <motion.div 
          className="absolute top-1/4 right-[15%] w-4 h-6 bg-water-light/30 rounded-full blur-sm hidden md:block"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/3 right-[25%] w-3 h-4 bg-water-medium/20 rounded-full blur-sm hidden md:block"
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-[10%] w-5 h-7 bg-primary-foreground/10 rounded-full blur-sm hidden md:block"
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-28 pb-32 md:pt-36 md:pb-40">
        <div className="max-w-3xl">
          {/* Handwritten-style accent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 text-water-light font-medium text-sm md:text-base mb-6">
              <Droplets className="h-4 w-4" />
              Trusted Since 1998 • California & Arizona
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-primary-foreground leading-[1.1] mb-6"
          >
            Pure Water,{" "}
            <span className="relative">
              <span className="relative z-10">Naturally</span>
              {/* Organic underline accent */}
              <motion.span 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute -bottom-2 left-0 right-0 h-3 bg-accent/40 -rotate-1 origin-left rounded-full"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-foreground/85 mb-10 max-w-xl leading-relaxed"
          >
            Custom water softening and filtration designed for your home. 
            Experience the difference with our 5-day risk-free trial and lifetime guarantee.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-14"
          >
            <Button size="lg" variant="hero" asChild>
              <Link to="/process">
                Get Your Free Water Test
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="heroOutline" asChild>
              <Link to="/hygia-system">See How It Works</Link>
            </Button>
          </motion.div>

          {/* Trust Indicators - Organic blob-backed badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            {[
              { icon: Shield, label: "Lifetime Warranty" },
              { icon: Clock, label: "5-Day Risk-Free Trial" },
              { icon: Award, label: "25+ Years Experience" },
            ].map((item) => (
              <div
                key={item.label}
                className="relative group"
              >
                {/* Organic blob background */}
                <div className="absolute inset-0 bg-primary-foreground/15 backdrop-blur-sm blob-shape transition-all duration-500 group-hover:bg-primary-foreground/25" />
                
                <div className="relative flex items-center gap-3 px-5 py-3">
                  <div className="w-9 h-9 rounded-full bg-accent/90 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <span className="font-medium text-primary-foreground text-sm whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Wave divider at bottom */}
      <WaveDividerLayered position="bottom" className="z-20" />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs text-primary-foreground/60 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1 h-1.5 rounded-full bg-primary-foreground/60" />
        </motion.div>
      </motion.div>
    </section>
  );
};