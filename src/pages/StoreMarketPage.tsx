import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Home, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrustBar } from "@/components/TrustBar";
import { ContactCTA } from "@/components/ContactCTA";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { StoreMarket } from "@/data/storeServiceAreas";

const stateNames = { CA: "California", AZ: "Arizona" } as const;

export function StoreMarketPage({ market }: { market: StoreMarket }) {
  const stateName = stateNames[market.state];
  const canonical = `https://selectsourcewaterusa.com/service-areas/${market.slug}`;
  const storeLabel = market.stores.length === 1 ? "store-area reference" : "store-area references";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Residential Water Treatment in ${market.name}, ${market.state}`,
    provider: { "@type": "Organization", name: "Select Source Water", url: "https://selectsourcewaterusa.com" },
    areaServed: { "@type": "City", name: market.name, containedInPlace: { "@type": "State", name: stateName } },
    serviceType: ["In-home water testing", "Whole-home water filtration", "Water softener installation"],
    url: canonical,
  };

  return (
    <>
      <Helmet>
        <title>Water Treatment in {market.name}, {market.state} | Select Source Water</title>
        <meta name="description" content={`Free in-home water testing and whole-home water treatment service in ${market.name}, ${stateName}. View Select Source Water's verified local service-market references.`} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <Header />
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 pb-20 pt-32">
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4 uppercase tracking-wider">{market.region} service market</Badge>
            <h1 className="mb-6 font-serif text-3xl text-foreground md:text-5xl">Water Treatment Service in {market.name}, {market.state}</h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">Select Source Water serves homeowners in and around {market.name} with free in-home water testing, whole-home filtration options, professional installation, and ongoing support.</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" variant="hero"><Link to="/free-water-test">Schedule a Free Water Test<ArrowRight className="ml-2 h-5 w-5" /></Link></Button>
              <Button asChild size="lg" variant="heroOutline" className="border-primary/30 text-foreground hover:bg-primary/10"><a href="tel:+19516124094"><Phone className="mr-2 h-5 w-5" />(951) 612-4094</a></Button>
            </div>
          </motion.div>
        </div>
      </section>
      <TrustBar />
      <section className="bg-background py-16 md:py-24">
        <div className="container"><div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <Badge variant="outline" className="mb-4">Verified footprint</Badge>
            <h2 className="mb-4 font-serif text-2xl text-foreground md:text-3xl">{market.name} Home Depot Trade-Area {market.stores.length === 1 ? "Reference" : "References"}</h2>
            <p className="mx-auto max-w-3xl text-muted-foreground">Our service footprint includes {market.stores.length} verified {storeLabel} in this market. These Home Depot addresses identify the communities we serve; they are not Select Source Water offices. In-store staffing and availability can vary, so schedule with us directly for the fastest response.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {market.stores.map((store) => {
              const mapQuery = encodeURIComponent(`${store.address}, ${store.city}, ${store.state} ${store.zip}`);
              return (
                <article key={store.storeNumber} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="mb-4 flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-primary">Home Depot #{store.storeNumber}</p><h3 className="mt-1 text-lg font-semibold text-foreground">{store.storeName}</h3></div><Home className="h-5 w-5 shrink-0 text-primary" /></div>
                  <p className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{store.address}<br />{store.city}, {store.state} {store.zip}</span></p>
                  <a className="mt-4 inline-flex text-sm font-medium text-primary hover:underline" href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer">View map<ArrowRight className="ml-1 h-4 w-4" /></a>
                </article>
              );
            })}
          </div>
        </div></div>
      </section>
      <section className="bg-secondary/30 py-16 md:py-20"><div className="container"><div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-center font-serif text-2xl text-foreground md:text-3xl">What homeowners can schedule</h2>
        <div className="grid gap-4 sm:grid-cols-2">{["A free in-home water test at your address", "Whole-home filtration and softening recommendations", "Professional installation options", "Product guidance based on your household's needs", "Warranty and continuing service support", "Direct scheduling without relying on store staffing"].map((item) => <div key={item} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><p className="text-sm text-foreground">{item}</p></div>)}</div>
        <div className="mt-8 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-5 text-sm text-muted-foreground"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><p>Select Source Water is an Authorized Independent Provider for Home Depot Home Services. Service eligibility is confirmed by address when you schedule.</p></div>
      </div></div></section>
      <ContactCTA />
      <Footer />
    </>
  );
}
