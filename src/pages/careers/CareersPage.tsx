import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, GraduationCap, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JOB_LISTINGS } from "@/data/careers";

const perks = [
  {
    icon: GraduationCap,
    title: "Paid training",
    body: "Most of our team started with no water treatment experience. We teach the trade.",
  },
  {
    icon: TrendingUp,
    title: "Performance-based growth",
    body: "Pay tiers, commissions, and overrides that move with your results — not your tenure.",
  },
  {
    icon: Users,
    title: "We promote from within",
    body: "Many of our leaders began in entry-level roles and advanced through performance.",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Careers — Join the Select Source Water Team</title>
        <meta
          name="description"
          content="Open roles at Select Source Water: Customer Engagement Representative, Water Testing Specialist, Water Treatment Installer, and Sales Market Manager. Paid training, performance-based pay, and a clear path into leadership."
        />
      </Helmet>

      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/60 bg-secondary/30">
          <div className="container py-16 sm:py-24">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <Badge variant="secondary" className="mb-5">
                <Briefcase className="mr-1.5 h-3.5 w-3.5" />
                We're hiring
              </Badge>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6">
                Build a career improving how families live.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Select Source Water has served the Inland Empire since 1998. We're an
                authorized independent provider of water filtration services available
                through The Home Depot, and we're growing across Southern California.
                Whether you're starting out or stepping into leadership, there's a seat here.
              </p>
              <Button asChild size="lg" className="font-semibold">
                <Link to="/apply">
                  Apply now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Why work here */}
        <section className="container py-14 sm:py-20">
          <div className="grid gap-6 sm:grid-cols-3">
            {perks.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <p.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 font-semibold">{p.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Open roles */}
        <section id="open-roles" className="container pb-20 sm:pb-28">
          <div className="mb-8">
            <h2 className="font-serif text-3xl sm:text-4xl mb-3">Open roles</h2>
            <p className="text-muted-foreground">
              {JOB_LISTINGS.length} positions open across Orange County, the Inland Empire,
              and the Coachella Valley.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {JOB_LISTINGS.map((job, i) => (
              <motion.div
                key={job.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Card className="group h-full transition-shadow hover:shadow-lg">
                  <CardContent className="flex h-full flex-col p-6 sm:p-7">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{job.employmentType}</Badge>
                      <Badge variant="outline">{job.paySummary}</Badge>
                    </div>

                    <h3 className="mb-2 font-serif text-2xl leading-tight">{job.title}</h3>
                    <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                      {job.tagline}
                    </p>

                    <ul className="mb-6 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                      {job.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-primary" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-wrap gap-3">
                      <Button asChild variant="outline">
                        <Link to={`/careers/${job.slug}`}>View details</Link>
                      </Button>
                      <Button asChild>
                        <Link to={`/apply?role=${job.slug}`}>
                          Apply
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
            Select Source Water is an equal opportunity employer. All qualified applicants
            will receive consideration for employment without regard to race, color,
            religion, sex, sexual orientation, gender identity, national origin, disability,
            veteran status, or any other characteristic protected by law.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
