import { Helmet } from "react-helmet-async";
import { PageLayout, PageHero } from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Shield, CheckCircle, Droplets, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const benefits = [
  "Complete TDS & hardness analysis",
  "Contaminant screening (Chromium-6, chlorine, nitrates)",
  "pH & mineral composition breakdown",
  "Personalized report for your home",
  "No cost, no obligation — ever",
  "Takes about 20 minutes",
];

const FreeWaterTest = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    message: "",
    // Honeypot: hidden from real users via CSS; bots fill it and get silently dropped server-side.
    website: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        "free-water-test-lead",
        {
          body: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            message: formData.message,
            website: formData.website,
          },
        }
      );

      if (error) {
        console.error("free-water-test-lead invoke error:", error);
        toast.error("We couldn't submit your request.", {
          description:
            "Please call (951) 612-4094 and we'll schedule your test right away.",
        });
        return;
      }

      if (data && typeof data === "object" && "error" in data) {
        toast.error("We couldn't submit your request.", {
          description:
            (data as { error?: string }).error ||
            "Please call (951) 612-4094 and we'll schedule your test right away.",
        });
        return;
      }

      toast.success(
        "Thank you! We'll contact you within 24 hours to schedule your free water test."
      );
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        message: "",
        website: "",
      });
    } catch (err) {
      console.error("free-water-test-lead unexpected error:", err);
      toast.error("We couldn't submit your request.", {
        description:
          "Please call (951) 612-4094 and we'll schedule your test right away.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <Helmet>
        <title>Free Water Test | Inland Empire Home Water Analysis | Select Source Water</title>
        <meta name="description" content="Schedule a free in-home water test in the Inland Empire. We test for hardness, TDS, Chromium-6, and more. No cost, no obligation. Call (951) 612-4094." />
        <link rel="canonical" href="https://selectsourcewatercalifornia.com/free-water-test" />
      </Helmet>

      <PageHero
        badge="100% Free • No Obligation"
        title="Free In-Home"
        subtitle="Water Test"
        description="Find out exactly what's in your water. Our certified technicians will test your water on-site and provide a detailed report — completely free."
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-2">Schedule Your Test</h2>
              <p className="text-muted-foreground mb-6">Fill out the form below and we'll contact you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field — hidden from real users, bots fill it and get dropped server-side. */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-10000px",
                    top: "auto",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                  }}
                >
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                  />
                </div>
                <Input
                  placeholder="Full Name *"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Phone Number *"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <Input
                  placeholder="Home Address (City, CA) *"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
                <Textarea
                  placeholder="Anything we should know? (water issues, best times, etc.)"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                />
                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? "Submitting..." : "Schedule My Free Test"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>

              <div className="mt-6 flex items-center gap-3 text-muted-foreground text-sm">
                <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Your information is never shared. We respect your privacy.</span>
              </div>
            </motion.div>

            {/* Benefits sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary/5 rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Prefer to Call?</h3>
                <a href="tel:+19516124094" className="flex items-center gap-3 text-primary font-semibold text-lg hover:underline">
                  <Phone className="w-5 h-5" />
                  (951) 612-4094
                </a>
                <div className="flex items-start gap-3 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>790 Beaumont Ave Ste 124, Beaumont, CA 92223</span>
                </div>
                <div className="flex items-start gap-3 text-muted-foreground text-sm">
                  <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Mon–Sat 8am–6pm · Same-week appointments available</span>
                </div>
              </div>

              <div className="bg-muted/50 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Inland Empire Water Facts</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  The average home in the Inland Empire has water hardness between 155–350 PPM — well above the "hard" threshold of 120 PPM. Our test reveals exactly what your family is drinking and bathing in.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default FreeWaterTest;
