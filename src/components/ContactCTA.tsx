import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, Shield, ArrowRight, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { WaveDivider } from "@/components/WaveDivider";

export const ContactCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Thank you! We'll contact you within 24 hours.");
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/95 to-primary/40" />
      
      {/* Flowing organic shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-20 right-[10%] w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 left-[5%] w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <WaveDivider position="top" fillColor="hsl(var(--background))" variant="gentle" />

      <div className="container relative z-10" ref={ref}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4">
              Get Started Today
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary-foreground mb-5">
              Ready for Pure, Soft Water?
            </h2>
            <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
              Schedule your free in-home water test—no obligation, no pressure.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left - Contact info flowing layout */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Contact methods - organic layout */}
              <div className="space-y-6">
                <a href="tel:1-800-555-0123" className="flex items-center gap-5 group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent/20 rounded-full blur-lg group-hover:blur-xl transition-all" />
                    <div className="relative w-14 h-14 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                      <Phone className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-primary-foreground/50 block">Call Us</span>
                    <span className="text-xl text-primary-foreground font-medium group-hover:text-accent transition-colors">(800) 555-0123</span>
                  </div>
                </a>
                
                <a href="mailto:info@selectsourcewater.com" className="flex items-center gap-5 group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg group-hover:blur-xl transition-all" />
                    <div className="relative w-14 h-14 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                      <Mail className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-primary-foreground/50 block">Email Us</span>
                    <span className="text-lg text-primary-foreground font-medium group-hover:text-accent transition-colors">info@selectsourcewater.com</span>
                  </div>
                </a>
                
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-water-light/20 rounded-full blur-lg" />
                    <div className="relative w-14 h-14 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-primary-foreground/50 block">Service Areas</span>
                    <span className="text-lg text-primary-foreground font-medium">California & Arizona</span>
                  </div>
                </div>
              </div>

              {/* Trust badges - flowing pills */}
              <div className="flex flex-wrap gap-3 pt-4">
                {[
                  { icon: Clock, text: "24hr Response" },
                  { icon: Shield, text: "Licensed & Insured" },
                  { icon: CheckCircle2, text: "5-Day Trial" },
                ].map((item) => (
                  <div key={item.text} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground/80 text-sm">
                    <item.icon className="h-4 w-4 text-accent" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right - Form with organic styling */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-br from-accent/30 to-primary/20 rounded-[2.5rem] blur-2xl" />
                
                <form onSubmit={handleSubmit} className="relative bg-card rounded-[2rem] p-8 md:p-10 shadow-2xl">
                  <h3 className="text-2xl font-serif text-foreground mb-2">
                    Free Water Test
                  </h3>
                  <p className="text-muted-foreground mb-8">
                    We'll contact you within 24 hours.
                  </p>

                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        placeholder="Your Name"
                        required
                        className="rounded-xl h-12 bg-secondary/30 border-0 focus:bg-secondary/50 transition-colors"
                      />
                      <Input
                        type="email"
                        placeholder="Email"
                        required
                        className="rounded-xl h-12 bg-secondary/30 border-0 focus:bg-secondary/50 transition-colors"
                      />
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        type="tel"
                        placeholder="Phone"
                        required
                        className="rounded-xl h-12 bg-secondary/30 border-0 focus:bg-secondary/50 transition-colors"
                      />
                      <Input
                        placeholder="ZIP Code"
                        required
                        className="rounded-xl h-12 bg-secondary/30 border-0 focus:bg-secondary/50 transition-colors"
                      />
                    </div>
                    
                    <Textarea
                      placeholder="Tell us about your water concerns (optional)"
                      rows={3}
                      className="rounded-xl bg-secondary/30 border-0 focus:bg-secondary/50 transition-colors resize-none"
                    />

                    <Button
                      type="submit"
                      size="lg"
                      variant="hero"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Schedule My Free Test
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground">
                      No obligation • No credit card • 100% free
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};