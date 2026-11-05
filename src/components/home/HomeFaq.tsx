const items = [
  {
    q: "Do you service systems you did not install?",
    a: "Tell us what you have on the request form, including the brand if you know it. Our team will confirm whether we can service it before scheduling.",
  },
  {
    q: "Is the water test really complimentary?",
    a: "Yes. The in-home water test is complimentary, and there is no obligation to buy anything.",
  },
  {
    q: "How long does the water test take?",
    a: "About 15 to 30 minutes at your home.",
  },
  {
    q: "What does a new system cost?",
    a: "It depends on your water and your household, so we do not quote a price before the test. A specialist walks you through the options at your home.",
  },
];

export const HomeFaq = () => (
  <section className="border-t border-border bg-secondary py-20 md:py-28">
    <div className="container grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
      <h2 className="display text-4xl sm:text-5xl">Common questions</h2>
      <dl className="rule-list border-y border-border">
        {items.map((i) => (
          <div key={i.q} className="py-6">
            <dt className="text-xl font-semibold tracking-tight">{i.q}</dt>
            <dd className="measure mt-2 text-muted-foreground">{i.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);
export const homeFaqItems = items;
