import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { PageLayout, PageHero } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { getCityBySlug, cityData } from "@/data/cityData";
import NotFound from "@/pages/NotFound";
import { getStoreMarketBySlug } from "@/data/storeServiceAreas";
import { StoreMarketPage } from "@/pages/StoreMarketPage";
import { regionGuideSlug, site } from "@/data/site";

export default function CityPage() {
  const { citySlug } = useParams<{ citySlug: string }>();
  const city = citySlug ? getCityBySlug(citySlug) : undefined;
  const storeMarket = citySlug ? getStoreMarketBySlug(citySlug) : undefined;

  if (storeMarket) return <StoreMarketPage market={storeMarket} />;
  if (!city) return <NotFound />;

  const nearby = city.nearbyCities.map((s) => cityData[s]).filter(Boolean);
  const canonical = `${site.url}/service-areas/${city.slug}/`;

  return (
    <PageLayout>
      <Helmet>
        <title>{city.seoTitle}</title>
        <meta name="description" content={city.seoDescription} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: `Water system installation and service in ${city.name}, CA`,
            provider: { "@id": `${site.url}/#organization` },
            areaServed: { "@type": "City", name: city.name, containedInPlace: { "@type": "State", name: "California" } },
            url: canonical,
          })}
        </script>
      </Helmet>

      <PageHero
        badge={city.county}
        title={`Water system service in ${city.name}, CA.`}
        description="Installation and service for water softeners, whole-home filters and reverse osmosis systems."
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link to="/service">Request service</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/complimentary-water-test">Complimentary water test</Link>
          </Button>
        </div>
      </PageHero>

      <section className="py-16 md:py-24">
        <div className="container grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Nearby</h2>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              {nearby.map((n) => (
                <li key={n.slug}>
                  <Link to={`/service-areas/${n.slug}`} className="text-muted-foreground hover:text-primary">
                    {n.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Read the Inland Empire guide</h2>
            <p className="measure mt-3 text-muted-foreground">How water system service works in the Inland Empire, and what to have ready when you call.</p>
            <Link to={`/blog/${regionGuideSlug["Inland Empire"]}`} className="mt-4 inline-block font-semibold text-primary underline-offset-4 hover:underline">
              Open the guide
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
