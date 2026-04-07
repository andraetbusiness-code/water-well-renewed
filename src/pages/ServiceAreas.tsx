import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { MapPin, Droplets, Star, ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrustBar } from "@/components/TrustBar";
import { ContactCTA } from "@/components/ContactCTA";

const cities = [
  {
    name: "Beaumont",
    slug: "beaumont-ca",
    county: "Riverside County",
    hardnessPPM: 177,
    hardnessGPG: 10.4,
    keyIssue: "2 contaminants above EPA MCLGs; fastest-growing city in CA",
  },
  {
    name: "Banning",
    slug: "banning-ca",
    county: "Riverside County",
    hardnessPPM: 249,
    hardnessGPG: 14.6,
    keyIssue: "Hardest water in the Pass; chromium-6 detected; 19 active wells",
  },
  {
    name: "Hemet",
    slug: "hemet-ca",
    county: "Riverside County",
    hardnessPPM: 155,
    hardnessGPG: 9.1,
    keyIssue: "Arsenic + chromium-6 above CA guidelines; 10 contaminants of concern",
  },
  {
    name: "San Jacinto",
    slug: "san-jacinto-ca",
    county: "Riverside County",
    hardnessPPM: 155,
    hardnessGPG: 9.1,
    keyIssue: "Shares water source with Hemet; same contamination concerns",
  },
  {
    name: "Moreno Valley",
    slug: "moreno-valley-ca",
    county: "Riverside County",
    hardnessPPM: 197,
    hardnessGPG: 11.5,
    keyIssue: "Largest population after Riverside; very hard water city-wide",
  },
  {
    name: "Riverside",
    slug: "riverside-ca",
    county: "Riverside County",
    hardnessPPM: 202,
    hardnessGPG: 11.8,
    keyIssue: "Largest city in the IE; very hard water; high volume of older plumbing",
  },
  {
    name: "Yucaipa",
    slug: "yucaipa-ca",
    county: "San Bernardino County",
    hardnessPPM: 180,
    hardnessGPG: 10.5,
    keyIssue: "Established residential community; agricultural water history",
  },
  {
    name: "Calimesa",
    slug: "calimesa-ca",
    county: "San Bernardino County",
    hardnessPPM: 170,
    hardnessGPG: 10.0,
    keyIssue: "Fast-growing; new construction with no pre-installed filtration",
  },
  {
    name: "Cherry Valley",
    slug: "cherry-valley-ca",
    county: "Riverside County (unincorporated)",
    hardnessPPM: 180,
    hardnessGPG: 10.5,
    keyIssue: "Unincorporated area; many homes on private well systems",
  },
  {
    name: "Redlands",
    slug: "redlands-ca",
    county: "San Bernardino County",
    hardnessPPM: 175,
    hardnessGPG: 10.3,
    keyIssue: "Established suburb; mix of older pipes and newer construction",
  },
  {
    name: "Highland",
    slug: "highland-ca",
    county: "San Bernardino County",
    hardnessPPM: 190,
    hardnessGPG: 11.1,
    keyIssue: "Adjacent to Redlands; SB County hard water conditions",
  },
];

const getHardnessLevel = (ppm: number) => {
  if (ppm <= 60) return "Soft";
  if (ppm <= 120) return "Moderate";
  if (ppm <= 180) return "Hard";
  return "Very Hard";
};

const getHardnessColor = (ppm: number) => {
  if (ppm <= 120) return "text-green-600";
  if (ppm <= 180) return "text-amber-600";
  return "text-red-600";
};

export default function ServiceAreas() {
  return (
    <>
      <Helmet>
        <title>Service Areas — Inland Empire & Southern California | Select Source Water</title>
        <meta
          name="description"
          content="Select Source Water serves all of the Inland Empire and greater SoCal. Find your city: Beaumont, Banning, Hemet, Moreno Valley, Riverside, and more. Free water test."
        />
        <link rel="canonical" href="https://selectsourcewatercalifornia.com/service-areas" />
      </Helmet>

      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary/10 via-background to-accent/5 overflow-hidden">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge variant="secondary" className="mb-4 text-xs uppercase tracking-wider">
              Service Areas
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6">
              Water Treatment Service Areas — Inland Empire, California
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We serve all of the Inland Empire and greater Southern California. If your city isn't listed, call us — our service area is expanding. All service areas receive the same free in-home water test, same-day installation, and lifetime warranty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="hero">
                <Link to="/free-water-test">
                  Schedule Your Free Water Test
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="heroOutline" className="border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50">
                <a href="tel:+19516124094">
                  <Phone className="mr-2 h-5 w-5" />
                  (951) 612-4094
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <TrustBar />

      {/* Hard Water Intro */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-6">
              Hard Water Is a Regional Problem
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Every city in our service area exceeds 120 PPM — the level at which water is considered "hard." Scale buildup, appliance damage, dry skin, and poor-tasting drinking water affect Inland Empire households disproportionately compared to coastal California. Our HYGIA+ system is calibrated for the specific mineral content of SoCal water.
            </p>
          </motion.div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
            {[
              { label: "Average IE Hardness", value: "190 PPM" },
              { label: "Cities We Serve", value: "12+" },
              { label: "Google Rating", value: "4.7 ⭐" },
              { label: "Years in California", value: "25+" },
            ].map((stat) => (
              <div key={stat.label} className="bg-card rounded-xl p-4 text-center border border-border shadow-sm">
                <div className="text-xl md:text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City Cards */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">Find Your City</Badge>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground">
              Select Your City
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {cities.map((city, i) => (
              <motion.div
                key={city.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{city.name}, CA</h3>
                    <p className="text-xs text-muted-foreground">{city.county}</p>
                  </div>
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Droplets className="h-4 w-4 text-primary" />
                  <span className={`text-sm font-bold ${getHardnessColor(city.hardnessPPM)}`}>
                    {city.hardnessPPM} PPM / {city.hardnessGPG} GPG
                  </span>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    {getHardnessLevel(city.hardnessPPM)}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {city.keyIssue}
                </p>

                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to={`/service-areas/${city.slug}`}>
                    Get Free Water Test in {city.name}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            ))}

            {/* IE Regional Hub card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-primary/5 rounded-2xl border-2 border-primary/20 shadow-sm p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Inland Empire (Region Hub)</h3>
                  <p className="text-xs text-muted-foreground">Riverside & San Bernardino Counties</p>
                </div>
                <Star className="h-5 w-5 text-primary flex-shrink-0" />
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Droplets className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold text-red-600">155–249 PPM</span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  Hard–Very Hard
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                The hardest water region in Southern California
              </p>

              <Button asChild variant="default" size="sm" className="w-full">
                <Link to="/free-water-test">
                  View IE Regional Info
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Don't see your city */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center mt-12 bg-card rounded-2xl border border-border p-8"
          >
            <h3 className="text-xl font-serif text-foreground mb-3">Don't See Your City?</h3>
            <p className="text-muted-foreground mb-4">
              Our service area is expanding. If you're in SoCal and don't see your city listed, call us at{" "}
              <a href="tel:+19516124094" className="text-primary font-medium hover:underline">(951) 612-4094</a>.
              We may already serve your area or can arrange a visit.
            </p>
            <Button asChild variant="hero" size="lg">
              <a href="tel:+19516124094">
                <Phone className="mr-2 h-5 w-5" />
                Call (951) 612-4094
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      <ContactCTA />
      <Footer />
    </>
  );
}
