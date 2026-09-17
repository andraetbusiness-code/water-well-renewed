import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Phone, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrustBar } from "@/components/TrustBar";
import { ContactCTA } from "@/components/ContactCTA";
import { serviceRegions, storeMarkets, storeServiceAreas } from "@/data/storeServiceAreas";

export default function ServiceAreas() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Select Source Water service markets",
    numberOfItems: storeMarkets.length,
    itemListElement: storeMarkets.map((market, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${market.name}, ${market.state}`,
      url: `https://selectsourcewaterusa.com/service-areas/${market.slug}`,
    })),
  };

  return (
    <>
      <Helmet>
        <title>Water Treatment Service Areas in California & Arizona | Select Source Water</title>
        <meta name="description" content="Explore Select Source Water service markets across California and Arizona: 72 verified Home Depot trade-area references in 54 cities. Schedule a free in-home water test." />
        <link rel="canonical" href="https://selectsourcewaterusa.com/service-areas" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <Header />
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 pb-20 pt-32">
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4 uppercase tracking-wider">California & Arizona</Badge>
            <h1 className="mb-6 font-serif text-3xl text-foreground md:text-5xl">Water Treatment Service Areas</h1>
            <p className="mx-auto mb-8 max-w-3xl text-lg text-muted-foreground">Select Source Water serves homeowners across 54 city markets anchored by 72 verified Home Depot trade-area references. Find your nearest market and schedule a free in-home water test directly with our team.</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" variant="hero"><Link to="/free-water-test">Schedule Your Free Water Test<ArrowRight className="ml-2 h-5 w-5" /></Link></Button>
              <Button asChild size="lg" variant="heroOutline" className="border-primary/30 text-foreground hover:bg-primary/10"><a href="tel:+19516124094"><Phone className="mr-2 h-5 w-5" />(951) 612-4094</a></Button>
            </div>
          </motion.div>
        </div>
      </section>
      <TrustBar />
      <section className="bg-background py-14"><div className="container">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { value: storeServiceAreas.length, label: "Verified store areas" },
            { value: storeMarkets.length, label: "City markets" },
            { value: 2, label: "States" },
            { value: serviceRegions.length, label: "Service regions" },
          ].map((stat) => <div key={stat.label} className="rounded-xl border border-border bg-card p-5 text-center shadow-sm"><div className="text-2xl font-bold text-primary md:text-3xl">{stat.value}</div><div className="mt-1 text-xs text-muted-foreground">{stat.label}</div></div>)}
        </div>
        <div className="mx-auto mt-8 max-w-4xl rounded-xl border border-primary/20 bg-primary/5 p-5 text-center text-sm text-muted-foreground">The addresses below are Home Depot trade-area references used to show the communities we serve. They are not Select Source Water offices, and in-store staffing or availability may vary.</div>
      </div></section>
      <section className="bg-secondary/30 py-16 md:py-24"><div className="container"><div className="mx-auto max-w-6xl space-y-16">
        {serviceRegions.map((region) => {
          const stores = storeServiceAreas.filter((store) => store.region === region);
          const markets = storeMarkets.filter((market) => market.region === region);
          return (
            <div key={region}>
              <div className="mb-8 flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between"><div><Badge variant="outline" className="mb-3">{stores.length} store areas</Badge><h2 className="font-serif text-2xl text-foreground md:text-3xl">{region}</h2></div><p className="text-sm text-muted-foreground">{markets.length} city markets</p></div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {stores.map((store, index) => (
                  <motion.article key={store.storeNumber} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: Math.min(index * 0.02, 0.2) }} className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
                    <div className="mb-3 flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-primary">Home Depot #{store.storeNumber}</p><h3 className="mt-1 text-lg font-semibold text-foreground">{store.storeName}</h3></div><Store className="h-5 w-5 shrink-0 text-primary" /></div>
                    <p className="mb-4 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{store.address}<br />{store.city}, {store.state} {store.zip}</span></p>
                    <Button asChild variant="outline" size="sm" className="w-full"><Link to={`/service-areas/${store.marketSlug}`}>View {store.city} service area<ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
                  </motion.article>
                ))}
              </div>
            </div>
          );
        })}
      </div></div></section>
      <section className="bg-background py-16"><div className="container text-center"><h2 className="mb-4 font-serif text-2xl text-foreground md:text-3xl">Outside a listed market?</h2><p className="mx-auto mb-6 max-w-2xl text-muted-foreground">Coverage is confirmed by address. Call our team and we’ll check availability for your home.</p><Button asChild variant="hero" size="lg"><a href="tel:+19516124094"><Phone className="mr-2 h-5 w-5" />Call (951) 612-4094</a></Button></div></section>
      <ContactCTA />
      <Footer />
    </>
  );
}
