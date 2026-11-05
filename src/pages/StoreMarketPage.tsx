import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageLayout, PageHero } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { storeMarkets, type StoreMarket } from "@/data/storeServiceAreas";
import { regionGuideSlug, site } from "@/data/site";

const stateNames = { CA: "California", AZ: "Arizona" } as const;

export function StoreMarketPage({ market }: { market: StoreMarket }) {
  const stateName = stateNames[market.state];
  const canonical = `${site.url}/service-areas/${market.slug}`;
  const neighbors = storeMarkets.filter((m) => m.region === market.region && m.slug !== market.slug).slice(0, 6);
  const guide = regionGuideSlug[market.region];

  return (
    <PageLayout showContactCTA>
      <Helmet>
        <title>Water Softener, Filter and RO Service in {market.name}, {market.state} | Select Source Water</title>
        <meta
          name="description"
          content={`Select Source Water installs and services water softeners, whole-home filters and reverse osmosis systems in ${market.name}, ${stateName}. Request service or a complimentary water test.`}
        />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: `Water system installation and service in ${market.name}, ${market.state}`,
            provider: { "@id": `${site.url}/#organization` },
            areaServed: { "@type": "City", name: market.name, containedInPlace: { "@type": "State", name: stateName } },
            url: canonical,
          })}
        </script>
      </Helmet>

      <PageHero
        badge={market.region}
        title={`Water system service in ${market.name}, ${market.state}.`}
        description="Installation and service for water softeners, whole-home filters and reverse osmosis systems."
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link to="/service">Request service</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/free-water-test">Complimentary water test</Link>
          </Button>
        </div>
      </PageHero>

      <section className="py-16 md:py-24">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">What we do in {market.name}</h2>
          <ul className="rule-list border-y border-border">
            {[
              ["Service on the system you have", "/service"],
              ["Monthly service plan", "/maintenance"],
              ["New whole-home filtration, softening and RO", "/hygia-system"],
              ["Complimentary in-home water test", "/free-water-test"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link to={href} className="flex items-baseline justify-between gap-6 py-5 text-lg font-medium hover:text-primary">
                  {label}
                  <span className="text-sm font-semibold text-primary">View</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-secondary py-16 md:py-20">
        <div className="container grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Nearby markets</h2>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              {neighbors.map((n) => (
                <li key={n.slug}>
                  <Link to={`/service-areas/${n.slug}`} className="text-muted-foreground hover:text-primary">
                    {n.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {guide && (
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Read the {market.region} guide</h2>
              <p className="measure mt-3 text-muted-foreground">How water system service works across {market.region}, and what to have ready when you call.</p>
              <Link to={`/blog/${guide}`} className="mt-4 inline-block font-semibold text-primary underline-offset-4 hover:underline">
                Open the guide
              </Link>
            </div>
          )}
        </div>
        <div className="container mt-10">
          <p className="text-sm text-muted-foreground">Not sure we cover your address? Call {site.phone} and we will check.</p>
        </div>
      </section>
    </PageLayout>
  );
}
