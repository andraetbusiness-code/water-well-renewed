import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Droplets, ArrowRight, Phone, Star, CheckCircle2, Home, Shield, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrustBar } from "@/components/TrustBar";
import { ContactCTA } from "@/components/ContactCTA";
import { getCityBySlug, cityData } from "@/data/cityData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import NotFound from "@/pages/NotFound";

export default function CityPage() {
  const { citySlug } = useParams<{ citySlug: string }>();
  const city = citySlug ? getCityBySlug(citySlug) : undefined;

  if (!city) return <NotFound />;

  const stateAvg = 90;
  const ratio = (city.hardnessPPM / stateAvg).toFixed(1);

  const nearbyCities = city.nearbyCities
    .map((slug) => cityData[slug])
    .filter(Boolean);

  return (
    <>
      <Helmet>
        <title>{city.seoTitle}</title>
        <meta name="description" content={city.seoDescription} />
        <link rel="canonical" href={`https://selectsourcewatercalifornia.com/service-areas/${city.slug}`} />
      </Helmet>

      <Header />

      {/* Section 1: Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary/10 via-background to-accent/5 overflow-hidden">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge variant="secondary" className="mb-4 text-xs uppercase tracking-wider">
              Water Treatment in {city.name}, CA
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6">
              Water Softener & Filtration in {city.name}, CA
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Select Source Water serves {city.name}, California with free in-home water testing,
              professional HYGIA+ system installation, and lifetime warranty service. We're a Home Depot
              Authorized Independent Provider — locally operated in Beaumont.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="hero">
                <Link to="/free-water-test">
                  Get Your Free Water Test in {city.name}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="heroOutline" className="border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50">
                <a href="tel:+19514995136">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (951) 499-5136
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <TrustBar />

      {/* Section 2: Water Hardness Stat Callout */}
      <section className="py-16 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-6">
              {city.name}'s Water Hardness
            </h2>
            <div className="bg-card rounded-2xl border border-border shadow-sm p-8 mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Droplets className="h-8 w-8 text-primary" />
                <span className="text-4xl md:text-5xl font-bold text-primary">{city.hardnessPPM} PPM</span>
                <span className="text-xl text-muted-foreground">— {city.hardnessGPG} GPG</span>
              </div>
              <Badge variant={city.hardnessLevel === "Very Hard" ? "destructive" : "secondary"} className="text-sm mb-4">
                Hardness Level: {city.hardnessLevel}
              </Badge>
              <div className="text-xs text-muted-foreground space-y-1 mt-4">
                <p>For reference: 0–60 PPM = Soft | 61–120 PPM = Moderate | 121–180 PPM = Hard | 181+ PPM = Very Hard</p>
                <p>Source: Based on {city.name}'s municipal water utility reports and EWG Tap Water Database.</p>
                <p className="font-medium text-foreground">{city.name}'s water is {ratio}x the state average of ~90 PPM.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Why [City] Needs Water Treatment */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-8 text-center">
              Why {city.name} Homeowners Need Water Treatment
            </h2>
            <div className="space-y-4">
              {city.whyReasons.map((reason, i) => (
                <div key={i} className="flex items-start gap-3 bg-card rounded-xl p-4 border border-border">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">{reason}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Services Offered */}
      <section className="py-16 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-8 text-center">
              Water Treatment Services in {city.name}, CA
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Droplets, text: `Free In-Home Water Test in ${city.name}` },
                { icon: Shield, text: `HYGIA+ Whole House Filtration — calibrated for ${city.name}'s ${city.hardnessPPM} PPM water` },
                { icon: Wrench, text: "Water Softener Installation — same-day service" },
                { icon: Droplets, text: "Point-of-Use RO System — purest drinking water" },
                { icon: CheckCircle2, text: "Annual Maintenance Plans — less than $6/month" },
                { icon: Shield, text: "Lifetime Warranty Support — we're local, we stay local" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-card rounded-xl p-4 border border-border">
                  <item.icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 6: Home Depot */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Home className="h-6 w-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                Visit Us at Home Depot — {city.name} Area
              </h2>
            </div>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Select Source Water is an Authorized Independent Provider for Home Depot Home Services. Visit any Home Depot in the {city.name} area and ask for a free water test kit — or call us directly at (951) 499-5136 to schedule an in-home visit.
            </p>
            <p className="text-xs text-muted-foreground mb-6 italic">
              Your nearest Home Depot — ask associates for the Select Source Water station.
            </p>
            <Button asChild variant="outline">
              <Link to="/home-depot-authorized-provider">
                Learn More About Our HD Partnership
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Section 7: Reviews */}
      <section className="py-16 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-8 text-center">
              What {city.name} Customers Are Saying
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {city.reviews.map((review, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border p-6">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-foreground text-sm mb-4 italic">"{review.text}"</p>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">— {review.reviewer}</span> | {review.date} | Posted on Google
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                4.7 ⭐ across 461+ reviews —{" "}
                <Link to="/reviews" className="text-primary hover:underline">read them all</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 8: FAQ */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-8 text-center">
              Frequently Asked Questions — {city.name}, CA
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="hardness" className="bg-card rounded-xl border border-border px-6">
                <AccordionTrigger className="text-left font-medium">
                  How hard is {city.name}'s water?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {city.name}'s tap water measures approximately {city.hardnessPPM} PPM ({city.hardnessGPG} GPG), which is classified as {city.hardnessLevel.toLowerCase()}. The national average is around 60–70 PPM, and California's state average is approximately 90 PPM. {city.name}'s water is {ratio}x the state average.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="hd" className="bg-card rounded-xl border border-border px-6">
                <AccordionTrigger className="text-left font-medium">
                  Does Home Depot install water softeners in {city.name}?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes — through authorized partners like Select Source Water. We're a Home Depot Authorized Independent Provider. You can pick up a free water test kit at your local Home Depot or schedule directly with us at (951) 499-5136.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="contaminants" className="bg-card rounded-xl border border-border px-6">
                <AccordionTrigger className="text-left font-medium">
                  What contaminants are in {city.name}'s water?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {city.faqContaminantAnswer}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="cost" className="bg-card rounded-xl border border-border px-6">
                <AccordionTrigger className="text-left font-medium">
                  How much does a water softener cost in {city.name}?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Every home is different — water hardness, household size, and water usage all factor into the right system size. That's why we start with a free in-home water test. After testing, we'll give you a transparent quote with no pressure. Call (951) 499-5136 or schedule online.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="install" className="bg-card rounded-xl border border-border px-6">
                <AccordionTrigger className="text-left font-medium">
                  How long does installation take in {city.name}?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Most installations are completed in a single day. Our technicians are licensed, trained, and equipped to install the HYGIA+ system with minimal disruption to your home.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Section 9: City-specific CTA */}
      <section className="py-16 bg-primary/5">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
              Schedule Your Free Water Test in {city.name}
            </h2>
            <p className="text-muted-foreground mb-8">
              We serve {city.name} and all surrounding communities. Our certified water specialists will test your water right in your kitchen and give you results in minutes. No obligation, no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="hero">
                <Link to="/free-water-test">
                  Schedule Free Water Test in {city.name}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              <a href="tel:+19514995136" className="text-primary hover:underline font-medium">(951) 499-5136</a> — Available 7 days a week
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 10: Nearby Cities */}
      {nearbyCities.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-xl font-serif text-foreground mb-6 text-center">
                We Also Serve These Nearby Cities
              </h2>
              <div className="flex flex-wrap gap-3 justify-center mb-6">
                {nearbyCities.map((nearby) => (
                  <Button key={nearby.slug} asChild variant="outline" size="sm">
                    <Link to={`/service-areas/${nearby.slug}`}>
                      <MapPin className="mr-1 h-3 w-3" />
                      {nearby.name}, CA
                    </Link>
                  </Button>
                ))}
              </div>
              <div className="text-center">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/service-areas">
                    View All Cities
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <ContactCTA />
      <Footer />
    </>
  );
}
