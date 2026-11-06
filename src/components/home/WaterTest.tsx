import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import photo from "@/assets/site/water-test-demo.webp";

export const WaterTest = () => (
  <section className="py-20 md:py-28">
    <div className="container grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
      <div>
        <h2 className="display text-4xl sm:text-5xl">See what is in your home's water.</h2>
        <p className="measure mt-6 text-lg text-muted-foreground">
          The in-home water test is complimentary and takes about 15 to 30 minutes. You see the demonstration yourself, then decide what, if anything, makes sense for your home. There is no obligation to buy.
        </p>
        <Button size="lg" className="mt-8" asChild>
          <Link to="/complimentary-water-test">Book a complimentary water test</Link>
        </Button>
      </div>
      <img
        src={photo}
        width={1200}
        height={900}
        loading="lazy"
        alt="A water test demonstration in a kitchen"
        className="aspect-[4/3] w-full rounded-lg object-cover"
      />
    </div>
  </section>
);
