import { Helmet } from "react-helmet-async";
import { PageLayout, PageHero } from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import { Shield, Droplets, Users, Award, Heart, Phone, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  { icon: Shield, title: "Integrity First", description: "We never upsell or pressure. Every recommendation is based on your actual water test results." },
  { icon: Heart, title: "Family-Owned", description: "Founded in 1998, we treat every home like our own. Our reputation is built on relationships, not transactions." },
  { icon: Droplets, title: "Water Expertise", description: "Over 25 years of experience solving hard water, contaminants, and whole-home filtration for Southern California families." },
  { icon: Award, title: "Quality Guaranteed", description: "Lifetime warranty on every HYGIA+ system. We stand behind our work — period." },
];

const milestones = [
  { year: "1998", event: "Founded as a family-owned water treatment company" },
  { year: "2005", event: "Expanded to serve the entire Inland Empire region" },
  { year: "2015", event: "Became a Home Depot Authorized Service Provider" },
  { year: "2020", event: "Launched the HYGIA+ whole-home water system" },
  { year: "2024", event: "Surpassed 461+ five-star reviews across Google" },
  { year: "2025", event: "Introduced Lifetime Warranty on all systems" },
];

const About = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>About Select Source Water | Inland Empire Water Treatment Since 1998</title>
        <meta name="description" content="Family-owned water treatment company serving the Inland Empire since 1998. Home Depot Authorized Provider with 461+ five-star reviews. Learn our story." />
        <link rel="canonical" href="https://water-well-renewed.lovable.app/about" />
      </Helmet>

      <PageHero
        badge="Est. 1998 • Inland Empire, California"
        title="Better Water."
        subtitle="Better Life."
        description="For over 25 years, Select Source Water has helped Inland Empire families enjoy cleaner, softer, healthier water — backed by a Lifetime Warranty and real results."
      />

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                Select Source Water started in 1998 with a simple belief: every family deserves access to clean, safe water — without the gimmicks or high-pressure sales tactics that plagued the industry.
              </p>
              <p>
                Over two decades later, we've grown into the Inland Empire's most trusted water treatment provider. We're a Home Depot Authorized Service Provider, and we've earned over 461 five-star reviews from real homeowners across Beaumont, Riverside, Hemet, and beyond.
              </p>
              <p>
                Our HYGIA+ whole-home water system is the culmination of everything we've learned — a single solution that softens, filters, and purifies your water for every tap in your home.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground text-center mb-12">What We Stand For</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-background rounded-2xl shadow-sm"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground text-center mb-12">Our Journey</h2>
          <div className="space-y-6">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">{m.year}</span>
                </div>
                <div className="pt-4">
                  <p className="text-foreground font-medium">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { icon: Clock, stat: "25+", label: "Years in Business" },
              { icon: Users, stat: "461+", label: "Five-Star Reviews" },
              { icon: MapPin, stat: "12", label: "Cities Served" },
              { icon: Award, stat: "Lifetime", label: "Warranty on Systems" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground">{item.stat}</div>
                <div className="text-muted-foreground text-sm">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">Ready to See the Difference?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Schedule your free in-home water test and see exactly what's in your water — no obligation, no pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+19516124094"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              <Phone className="w-5 h-5" />
              (951) 612-4094
            </a>
            <Link
              to="/service-areas"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition"
            >
              View Service Areas
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
