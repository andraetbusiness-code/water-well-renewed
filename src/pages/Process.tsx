import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageLayout, PageHero } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

const steps = [
  { title: "Complimentary in-home water test", body: "About 15 to 30 minutes. You see the demonstration, and a specialist explains the results. No obligation to buy." },
  { title: "A system built around your water", body: "If a system makes sense, it is built for your home from your water district's report, not off a shelf." },
  { title: "Installation", body: "Typically 4 to 5 hours, start to finish, including a reverse osmosis system and filters if you choose one." },
  { title: "Day to day", body: "For a salt-based softener, adding salt is the homeowner's job. We handle service and filter changes." },
];

const Process = () => (
  <PageLayout>
    <Helmet>
      <title>How It Works | Select Source Water</title>
      <meta name="description" content="From a complimentary in-home water test to installation and ongoing service: how Select Source Water works." />
      <link rel="canonical" href={`${site.url}/process/`} />
    </Helmet>
    <PageHero title="How it works." description="From the first test to ongoing service." />
    <section className="py-16 md:py-24">
      <div className="container">
        <ol className="rule-list max-w-4xl border-y border-border">
          {steps.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-4 py-8">
              <span className="tabular text-3xl font-semibold text-primary">{i + 1}</span>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">{s.title}</h2>
                <p className="measure mt-2 text-muted-foreground">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" asChild><Link to="/complimentary-water-test">Book a complimentary water test</Link></Button>
          <Button size="lg" variant="outline" asChild><Link to="/service">Request service</Link></Button>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Process;
