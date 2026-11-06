import photo from "@/assets/site/installed-system.webp";

const steps = [
  { title: "Tell us about your system", body: "Type, brand if you know it, and what is going on. Photos help if you have them." },
  { title: "We contact you to schedule", body: "A person from our team reaches out to set a time." },
  { title: "A technician comes to your home", body: "They look at the system and explain what it needs before any work starts." },
];

export const ServiceSteps = () => (
  <section className="bg-secondary py-20 md:py-28">
    <div className="container grid items-center gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
      <img
        src={photo}
        width={505}
        height={760}
        loading="lazy"
        alt="Two installed water treatment tanks in a home"
        className="mx-auto aspect-[2/3] w-full max-w-sm rounded-lg object-cover"
      />
      <div>
        <h2 className="display text-4xl sm:text-5xl">How service works</h2>
        <ol className="rule-list mt-10 border-y border-border">
          {steps.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-4 py-6">
              <span className="tabular text-2xl font-semibold text-primary">{i + 1}</span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="measure mt-1 text-muted-foreground">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);
