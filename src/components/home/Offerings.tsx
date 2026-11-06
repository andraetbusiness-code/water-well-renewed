import { Link } from "react-router-dom";

const rows = [
  {
    title: "Service and repair",
    body: "A technician looks at the system you already have and tells you what it needs.",
    href: "/service",
    cta: "Request service",
  },
  {
    title: "Monthly service plan",
    body: "Routine visits to keep a system running the way it should.",
    href: "/maintenance",
    cta: "See the plan",
  },
  {
    title: "New systems",
    body: "Whole-home filtration, softening and reverse osmosis, built around your water report.",
    href: "/hygia-system",
    cta: "See the systems",
  },
  {
    title: "Complimentary water test",
    body: "An in-home test and demonstration. No obligation to buy.",
    href: "/complimentary-water-test",
    cta: "Book a test",
  },
];

export const Offerings = () => (
  <section className="py-20 md:py-28">
    <div className="container grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
      <h2 className="display text-4xl sm:text-5xl">What we do</h2>
      <ul className="rule-list border-y border-border">
        {rows.map((r) => (
          <li key={r.title}>
            <Link to={r.href} className="group grid gap-2 py-7 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">{r.title}</h3>
                <p className="measure mt-2 text-muted-foreground">{r.body}</p>
              </div>
              <span className="text-sm font-semibold text-primary underline-offset-4 group-hover:underline">{r.cta}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
