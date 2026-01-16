import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const ContactCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Thank you! We'll be in touch within 24 hours.");
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 section-gradient">
      <div className="container" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
              Get Started
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Schedule Your Free Water Test
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Take the first step toward pure, soft water. Our free in-home assessment 
              includes a comprehensive water quality analysis and custom solution design.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Call Us</h4>
                  <a href="tel:1-800-555-0123" className="text-muted-foreground hover:text-primary transition-colors">
                    (800) 555-0123
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email Us</h4>
                  <a href="mailto:info@selectsourcewater.com" className="text-muted-foreground hover:text-primary transition-colors">
                    info@selectsourcewater.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Service Areas</h4>
                  <p className="text-muted-foreground">
                    Southern California • Sacramento • Arizona
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Points */}
            <div className="grid grid-cols-2 gap-4">
              {[
                "Free, No-Obligation Quote",
                "Same-Week Appointments",
                "Licensed & Insured",
                "5-Day Risk-Free Trial",
              ].map((point) => (
                <div key={point} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form 
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border"
            >
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Request Your Free Assessment
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                    First Name
                  </label>
                  <Input id="firstName" placeholder="John" required />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                    Last Name
                  </label>
                  <Input id="lastName" placeholder="Smith" required />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input id="email" type="email" placeholder="john@example.com" required />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone
                </label>
                <Input id="phone" type="tel" placeholder="(555) 123-4567" required />
              </div>

              <div className="mb-4">
                <label htmlFor="zip" className="block text-sm font-medium text-foreground mb-2">
                  Zip Code
                </label>
                <Input id="zip" placeholder="90210" required />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Tell us about your water concerns
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Hard water, taste issues, etc."
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Request Free Assessment
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By submitting, you agree to receive calls and texts about your inquiry.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
