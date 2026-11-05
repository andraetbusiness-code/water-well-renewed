import { Link } from "react-router-dom";
import { serviceRegions, storeMarkets } from "@/data/storeServiceAreas";

export const Coverage = () => {
  const byRegion = serviceRegions.map((region) => ({
    region,
    markets: storeMarkets.filter((m) => m.region === region),
  }));
  return (
    <section className="border-t border-border py-20 md:py-28">
      <div className="container">
        <h2 className="display max-w-3xl text-4xl sm:text-5xl">Where we work</h2>
        <p className="measure mt-6 text-lg text-muted-foreground">
          {storeMarkets.length} city markets across California and Arizona. Not sure we cover your address? Call and we will check.
        </p>
        <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {byRegion.map(({ region, markets }) => (
            <div key={region}>
              <h3 className="border-b border-foreground pb-3 text-base font-semibold">{region}</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {markets.slice(0, 8).map((m) => (
                  <li key={m.slug}>
                    <Link to={`/service-areas/${m.slug}`} className="text-muted-foreground hover:text-primary">
                      {m.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/service-areas" className="mt-4 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline">
                All {region} markets
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
