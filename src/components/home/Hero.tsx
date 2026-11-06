import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import photo from "@/assets/site/service-visit.webp";

export const HomeHero = () => (
  <section className="border-b border-border">
    <div className="container grid items-end gap-12 pb-0 pt-14 md:pt-20 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
      <div className="pb-14 lg:pb-24">
        <h1 className="display text-[2.75rem] sm:text-7xl lg:text-[5.5rem]">
          Water systems, installed and serviced.
        </h1>
        <p className="measure mt-8 text-lg text-muted-foreground md:text-xl">
          Whole-home filtration, water softeners and reverse osmosis. Already have a system? We service it.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link to="/service">Request service</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/complimentary-water-test">Complimentary water test</Link>
          </Button>
        </div>
      </div>
      <img
        src={photo}
        width={900}
        height={1200}
        alt="A Select Source Water technician working on a home water system"
        fetchPriority="high"
        className="mx-auto aspect-[3/4] max-h-[620px] w-full max-w-md rounded-t-lg object-cover lg:max-w-none"
      />
    </div>
  </section>
);
