import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageLayout, PageHero } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { pending } from "@/data/pending";
import { site } from "@/data/site";

const checks = [
  { title: "Softener salt", cadence: "Every 1 to 2 months", body: "Check the salt level and add high-purity salt when it runs low." },
  { title: "Softener inspection", cadence: "Yearly", body: "Have the timer, settings, regeneration frequency, resin and valves looked at." },
  { title: "RO sediment filter", cadence: "Every 6 to 12 months", body: "Replace on schedule." },
  { title: "RO carbon filters", cadence: "Every 12 months", body: "Replace on schedule." },
  { title: "RO membrane", cadence: "About every 24 months", body: "Replace on schedule." },
  { title: "UV bulb, if your system has one", cadence: "Yearly", body: "Replace the bulb yearly." },
];

const Maintenance = () => (
  <PageLayout showContactCTA={false}>
    <Helmet>
      <title>Water System Maintenance Schedule | Select Source Water</title>
      <meta name="description" content="Typical maintenance intervals for water softeners, reverse osmosis filters and UV bulbs, and how to schedule service." />
      <link rel="canonical" href={`${site.url}/maintenance`} />
    </Helmet>

    <PageHero
      title="Keep your system running."
      description="Typical maintenance intervals for softeners, reverse osmosis systems and UV bulbs. Your system's manual and your technician set the final schedule."
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
      <div className="container">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Typical schedule</h2>
        <ul className="rule-list mt-8 border-y border-border">
          {checks.map((c) => (
            <li key={c.title} className="grid gap-1 py-5 sm:grid-cols-[1.1fr_1fr_2fr] sm:gap-8">
              <h3 className="text-lg font-semibold tracking-tight">{c.title}</h3>
              <p className="text-muted-foreground">{c.cadence}</p>
              <p className="text-muted-foreground">{c.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {pending.plan && (
      <section className="bg-secondary py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{pending.plan.name}</h2>
          <p className="tabular mt-4 text-3xl font-semibold">{pending.plan.price}</p>
          <ul className="mt-4 list-disc pl-5 text-muted-foreground">
            {pending.plan.covers.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p className="measure mt-4 text-sm text-muted-foreground">{pending.plan.terms}</p>
        </div>
      </section>
    )}
  </PageLayout>
);

export default Maintenance;
