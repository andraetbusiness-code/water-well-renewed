import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageLayout, PageHero } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import badge from "@/assets/home-depot-authorized.png";
import { site } from "@/data/site";

const HomeDepotPartnership = () => (
  <PageLayout>
    <Helmet>
      <title>Authorized Independent Provider | Select Source Water</title>
      <meta name="description" content="Select Source Water is an authorized independent provider in The Home Depot ecosystem. Our in-store team can help you book a visit." />
      <link rel="canonical" href={`${site.url}/home-depot-authorized-provider/`} />
    </Helmet>

    <PageHero title="Authorized independent provider." description="Select Source Water is an authorized independent provider in The Home Depot ecosystem. We are not The Home Depot." />

    <section className="py-16 md:py-24">
      <div className="container grid items-start gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Our team in the store</h2>
          <p className="measure mt-4 text-muted-foreground">
            You may meet our in-store team at your local Home Depot. They wear black Select Source Water aprons and apparel, so you can tell them apart from Home Depot associates. They can answer questions and help you book a visit with us.
          </p>
          <h2 className="mt-12 text-3xl font-semibold tracking-tight">Financing</h2>
          <p className="measure mt-4 text-muted-foreground">
            Financing is available, including through The Home Depot, on approved credit. A specialist walks through the options at your home.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild><Link to="/complimentary-water-test">Book a complimentary water test</Link></Button>
            <Button size="lg" variant="outline" asChild><Link to="/service-areas">Where we work</Link></Button>
          </div>
        </div>
        <img src={badge} alt="Authorized independent provider badge" className="mx-auto w-full max-w-xs" loading="lazy" />
      </div>
    </section>
  </PageLayout>
);

export default HomeDepotPartnership;
