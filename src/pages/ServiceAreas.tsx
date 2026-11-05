import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageLayout, PageHero } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { serviceRegions, storeMarkets } from "@/data/storeServiceAreas";
import { cityData } from "@/data/cityData";
import { regionGuideSlug, site } from "@/data/site";

export default function ServiceAreas() {
  const marketSlugs = new Set(storeMarkets.map((m) => m.slug));
  const inlandOnly = Object.values(cityData).filter((c) => !marketSlugs.has(c.slug));

  const groups = [
    ...serviceRegions.map((region) => ({
      region,
      items: storeMarkets.filter((m) => m.region === region).map((m) => ({ slug: m.slug, label: m.name })),
    })),
    { region: "Inland Empire", items: inlandOnly.map((c) => ({ slug: c.slug, label: c.name })) },
  ];

  return (
    <PageLayout>
      <Helmet>
        <title>Water System Service Areas in California and Arizona | Select Source Water</title>
        <meta
          name="description"
          content="Where Select Source Water installs and services water softeners, whole-home filters and reverse osmosis systems across California and Arizona."
        />
        <link rel="canonical" href={`${site.url}/service-areas`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Select Source Water service areas",
            itemListElement: groups.flatMap((g) => g.items).map((m, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: m.label,
              url: `${site.url}/service-areas/${m.slug}`,
            })),
          })}
        </script>
      </Helmet>

      <PageHero
        title="Where we work."
        description="Find your city for installation, service and a complimentary water test. If you do not see it, call and we will check your address."
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link to="/service">Request service</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href={site.phoneHref}>Call {site.phone}</a>
          </Button>
        </div>
      </PageHero>

      <section className="py-16 md:py-24">
        <div className="container space-y-16">
          {groups.map((g) => (
            <div key={g.region} className="grid gap-6 lg:grid-cols-[1fr_3fr] lg:gap-16">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight">{g.region}</h2>
                {regionGuideSlug[g.region] && (
                  <Link to={`/blog/${regionGuideSlug[g.region]}`} className="mt-3 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline">
                    Regional guide
                  </Link>
                )}
              </div>
              <ul className="grid gap-x-8 gap-y-3 border-t border-foreground pt-5 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((m) => (
                  <li key={m.slug}>
                    <Link to={`/service-areas/${m.slug}`} className="hover:text-primary">
                      {m.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
