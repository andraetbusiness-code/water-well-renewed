import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import betterWaterHeroImg from "@/assets/infographics/better-water-hero-styled.png";

export const HomeInfographic = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-secondary/30">
      {/* Organic background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6 leading-tight">
              Better Water{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">Starts Here</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-1 left-0 right-0 h-2 bg-accent/30 -rotate-1 origin-left rounded-full"
                />
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Discover how our comprehensive water filtration solutions transform 
              your home's water quality. From advanced 10-stage filtration to 
              worry-free maintenance, we've got you covered.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link to="/hygia-system" className="gap-2">
                  Explore Our System
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/gallery">
                  View All Infographics
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Infographic Image */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="relative group">
              {/* Organic blob decoration */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative overflow-hidden rounded-3xl bg-card/80 backdrop-blur-sm border border-border/30 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:border-primary/30">
                <img
                  src={betterWaterHeroImg}
                  alt="Better Water Starts Here - Water Filtration Overview"
                  className="w-full h-auto"
                />
              </div>

              {/* Floating accent elements */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full blur-lg hidden lg:block"
              />
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent/20 rounded-full blur-lg hidden lg:block"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
