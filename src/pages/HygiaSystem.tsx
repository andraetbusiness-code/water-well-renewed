import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageLayout, PageHero } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import photo from "@/assets/site/installed-system.webp";
import { site } from "@/data/site";

const HygiaSystem = () => (
  <PageLayout>
    <Helmet>
      <title>HYGIA+ and HYGIA ECO Whole-Home Water Systems | Select Source Water</title>
      <meta name="description" content="HYGIA+ is a salt-based whole-home system and HYGIA ECO is a salt-free conditioner. Both are built around your home's water report." />
      <link rel="canonical" href={`${site.url}/hygia-system`} />
    </Helmet>

    <PageHero
      title="HYGIA+ and HYGIA ECO."
      description="Two whole-home systems, one salt-based and one salt-free. We sell both, so we have no reason to talk you into the wrong one."
    />

    <section className="py-16 md:py-24">
      <div className="container grid items-start gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <div>
          <ul className="rule-list border-y border-border">
            <li className="py-8">
              <h2 className="text-3xl font-semibold tracking-tight">HYGIA+</h2>
              <p className="mt-1 text-sm font-medium text-primary">Salt-based water softener</p>
              <p className="measure mt-3 text-muted-foreground">A carbon tank and a resin tank, with a programmable control valve. Adding salt is the homeowner's maintenance.</p>
            </li>
            <li className="py-8">
              <h2 className="text-3xl font-semibold tracking-tight">HYGIA ECO</h2>
              <p className="mt-1 text-sm font-medium text-primary">Salt-free water conditioner</p>
              <p className="measure mt-3 text-muted-foreground">A conditioner, not a softener. It does not remove hardness minerals. It changes how they behave so they have a harder time sticking. It needs no power.</p>
            </li>
          </ul>

          <h2 className="mt-14 text-3xl font-semibold tracking-tight">Built around your home</h2>
          <p className="measure mt-4 text-muted-foreground">
            Systems are built for each home from the water district's report, not off a shelf. Installation typically takes 4 to 5 hours, start to finish.
          </p>

          <h2 className="mt-14 text-3xl font-semibold tracking-tight">Warranty</h2>
          <p className="measure mt-4 text-muted-foreground">
            Systems carry a lifetime warranty on the tanks and control valve when purchased. It does not cover damage caused by the user, and it does not cover reverse osmosis filters. A specialist walks you through the details.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild><Link to="/free-water-test">Book a complimentary water test</Link></Button>
            <Button size="lg" variant="outline" asChild><Link to="/filtration-technology">How the dual-tank design works</Link></Button>
          </div>
        </div>
        <img src={photo} width={505} height={760} alt="Two installed water treatment tanks in a home" loading="lazy" className="mx-auto aspect-[2/3] w-full max-w-sm rounded-lg object-cover" />
      </div>
    </section>
  </PageLayout>
);

export default HygiaSystem;
