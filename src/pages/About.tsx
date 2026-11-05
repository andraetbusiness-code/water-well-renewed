import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageLayout, PageHero } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import photo from "@/assets/site/service-visit.webp";
import { site } from "@/data/site";

const About = () => (
  <PageLayout>
    <Helmet>
      <title>About Select Source Water</title>
      <meta name="description" content="Select Source Water, LLC installs and services whole-home water filtration, softeners and reverse osmosis systems. Headquartered in Beaumont, CA." />
      <link rel="canonical" href={`${site.url}/about`} />
    </Helmet>

    <PageHero
      title="Water systems, and the people who look after them."
      description="Select Source Water, LLC is based in Beaumont, California. We install and service whole-home filtration, water softeners and reverse osmosis systems."
    />

    <section className="py-16 md:py-24">
      <div className="container grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <img src={photo} width={900} height={1200} alt="A Select Source Water technician at work" loading="lazy" className="mx-auto aspect-[3/4] w-full max-w-md rounded-lg object-cover" />
        <div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">How we work</h2>
          <ul className="rule-list mt-8 border-y border-border">
            <li className="py-5">
              <h3 className="text-xl font-semibold tracking-tight">We start with your water</h3>
              <p className="measure mt-1 text-muted-foreground">Systems are built around your water report and your household, not off a shelf.</p>
            </li>
            <li className="py-5">
              <h3 className="text-xl font-semibold tracking-tight">We explain, you decide</h3>
              <p className="measure mt-1 text-muted-foreground">The in-home water test is complimentary. You see the demonstration and choose what, if anything, makes sense.</p>
            </li>
            <li className="py-5">
              <h3 className="text-xl font-semibold tracking-tight">We stay after the install</h3>
              <p className="measure mt-1 text-muted-foreground">Service, filter changes and maintenance for systems in your home.</p>
            </li>
            <li className="py-5">
              <h3 className="text-xl font-semibold tracking-tight">Authorized independent provider</h3>
              <p className="measure mt-1 text-muted-foreground">
                Our in-store team works at The Home Depot. We are an authorized independent provider, not The Home Depot. <Link to="/home-depot-authorized-provider" className="font-medium text-primary underline underline-offset-4">Learn more</Link>.
              </p>
            </li>
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild><Link to="/service">Request service</Link></Button>
            <Button size="lg" variant="outline" asChild><Link to="/careers">Work with us</Link></Button>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default About;
