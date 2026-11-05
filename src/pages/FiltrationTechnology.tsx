import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageLayout, PageHero } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

const FiltrationTechnology = () => (
  <PageLayout>
    <Helmet>
      <title>How Our Dual-Tank Systems Work | Select Source Water</title>
      <meta name="description" content="Our whole-home systems use two tanks: a carbon tank and a media tank. Why that design makes service simpler." />
      <link rel="canonical" href={`${site.url}/filtration-technology`} />
    </Helmet>

    <PageHero title="Two tanks, by design." description="Every whole-home system we build uses a carbon tank and a second media tank." />

    <section className="py-16 md:py-24">
      <div className="container grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Tank 1: carbon</h2>
          <p className="measure mt-4 text-muted-foreground">Carbon is the part that wears out. It hardens as it absorbs and eventually stops working.</p>
          <h2 className="mt-12 text-3xl font-semibold tracking-tight">Tank 2: media</h2>
          <p className="measure mt-4 text-muted-foreground">
            On HYGIA+ this tank holds resin, which lasts a very long time when it is kept clean with salt. On HYGIA ECO it holds KDF and a magnetic conditioning device. A distribution tube keeps media from leaking into the home.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Why two tanks</h2>
          <p className="measure mt-4 text-muted-foreground">
            Because the carbon wears out and the media does not, we can replace the carbon tank without replacing the whole system.
          </p>
          <h2 className="mt-12 text-3xl font-semibold tracking-tight">Where it goes</h2>
          <p className="measure mt-4 text-muted-foreground">
            Within 20 feet of the main water line, typically in the garage. Placement does not reduce water pressure.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild><Link to="/hygia-system">See HYGIA+ and HYGIA ECO</Link></Button>
            <Button size="lg" variant="outline" asChild><Link to="/service">Request service</Link></Button>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default FiltrationTechnology;
