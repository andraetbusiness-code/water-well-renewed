import { Link } from "react-router-dom";
import { ArrowRight, Wrench, Filter, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";

const items = [
  { icon: Droplets, title: "Water softeners", text: "Not regenerating, salt questions, control valve or settings problems." },
  { icon: Filter, title: "Whole-home filters", text: "Filter changes, pressure drops, changes in taste or smell." },
  { icon: Wrench, title: "Reverse osmosis", text: "Filter and membrane replacement, slow flow, leaks, tank and faucet issues." },
];

/** Home page section: service and repair for systems already installed, alongside new systems. */
export const ServiceCallout = () => (
  <section className="bg-secondary/40 py-20" aria-labelledby="service-callout-title">
    <div className="container grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Repair &amp; Service</p>
        <h2 id="service-callout-title" className="font-serif text-3xl text-foreground md:text-4xl">
          Already have a water system? We service it.
        </h2>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          We repair and service water softeners, whole-home filters and reverse osmosis systems, including systems another company installed.
          Tell us what you have and our team will confirm we can help before we schedule.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link to="/service">Request service<ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" /></Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/maintenance">Maintenance tips</Link>
          </Button>
        </div>
      </div>
      <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
        {items.map(({ icon: Icon, title, text }) => (
          <li key={title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
            <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{text}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
