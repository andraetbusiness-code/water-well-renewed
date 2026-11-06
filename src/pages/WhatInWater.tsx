import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageLayout, PageHero } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

const WhatInWater = () => (
  <PageLayout>
    <Helmet>
      <title>What Is in Your Water? How to Find Out | Select Source Water</title>
      <meta name="description" content="Two ways to learn about your home's water: your water provider's annual report and a water test at your tap." />
      <link rel="canonical" href={`${site.url}/what-in-water/`} />
    </Helmet>

    <PageHero title="What is in your water?" description="Two places to look. Neither one costs you anything to start." />

    <section className="py-16 md:py-24">
      <div className="container grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Your water provider's report</h2>
          <p className="measure mt-4 text-muted-foreground">
            If you are on city water, your provider publishes a water quality report each year. It lists what they measured in the water they deliver. Search for your provider's name and "water quality report".
          </p>
          <p className="measure mt-4 text-muted-foreground">
            We use this report when we design a system for a home. For questions about health, read it with your doctor.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">A water test at your tap</h2>
          <p className="measure mt-4 text-muted-foreground">
            A report shows the water at the provider. A test shows the water at your own tap. Our in-home test is complimentary, takes about 15 to 30 minutes, and carries no obligation to buy.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild><Link to="/complimentary-water-test">Book a complimentary water test</Link></Button>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default WhatInWater;
