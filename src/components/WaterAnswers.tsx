import { ArrowUpRight, Droplets, FlaskConical, Gauge, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const questions = [
  {
    icon: Gauge,
    question: "What does hard water do inside a home?",
    answer: "Learn how mineral buildup can show up on fixtures, dishes, plumbing, and water-using appliances.",
    href: "/what-in-water",
  },
  {
    icon: FlaskConical,
    question: "What can an in-home water test tell me?",
    answer: "See what a water assessment can measure and how the results help narrow down treatment options.",
    href: "/free-water-test",
  },
  {
    icon: Droplets,
    question: "Softener, filter, or reverse osmosis?",
    answer: "Compare the jobs each system performs and why the right combination depends on your water and goals.",
    href: "/filtration-technology",
  },
  {
    icon: Wrench,
    question: "What happens after a system is installed?",
    answer: "Understand routine care, service considerations, and what helps a treatment system keep performing.",
    href: "/maintenance",
  },
];

export function WaterAnswers() {
  return (
    <section className="bg-slate-950 py-24 text-white md:py-32" aria-labelledby="water-answers-title">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Water answers</p>
            <h2 id="water-answers-title" className="mt-5 font-serif text-4xl leading-tight tracking-tight md:text-5xl">
              Start with the question you actually have.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              Clear explanations for homeowners—organized around the decisions people make before choosing water treatment.
            </p>
            <Link to="/blog" className="mt-8 inline-flex items-center gap-2 font-semibold text-cyan-300 transition-colors hover:text-cyan-200">
              Browse the water education center <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {questions.map(({ icon: Icon, question, answer, href }) => (
              <Link key={question} to={href} className="group rounded-3xl border border-white/10 bg-white/[0.045] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.075]">
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-2xl bg-cyan-300/10 p-3 text-cyan-300"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  <ArrowUpRight className="h-5 w-5 text-slate-500 transition group-hover:text-cyan-300" aria-hidden="true" />
                </div>
                <h3 className="mt-6 font-serif text-2xl leading-tight">{question}</h3>
                <p className="mt-3 leading-relaxed text-slate-400">{answer}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
