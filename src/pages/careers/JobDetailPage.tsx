import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getJobBySlug } from "@/data/careers";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 font-serif text-2xl sm:text-3xl">{title}</h2>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed sm:text-base">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function JobDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const job = getJobBySlug(slug);

  if (!job) return <Navigate to="/careers" replace />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{`${job.title} — Careers at Select Source Water`}</title>
        <meta name="description" content={job.tagline} />
      </Helmet>

      <Header />

      <main>
        {/* Hero */}
        <section className="border-b border-border/60 bg-secondary/30">
          <div className="container py-12 sm:py-16">
            <Link
              to="/careers"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All open roles
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="max-w-3xl"
            >
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{job.employmentType}</Badge>
                <Badge variant="outline">{job.paySummary}</Badge>
                {job.highlights.map((h) => (
                  <Badge key={h} variant="outline">
                    {h}
                  </Badge>
                ))}
              </div>

              <h1 className="mb-4 font-serif text-4xl leading-tight sm:text-5xl">{job.title}</h1>
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">{job.tagline}</p>

              <Button asChild size="lg" className="font-semibold">
                <Link to={`/apply?role=${job.slug}`}>
                  Apply for this role
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <div className="container grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:py-20">
          {/* Body */}
          <div className="max-w-3xl">
            <div className="mb-10 space-y-4">
              {job.intro.map((p) => (
                <p key={p} className="leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>

            <Section title="What you'll do">
              <p className="mb-5 leading-relaxed text-muted-foreground">{job.whatYoullDo.lead}</p>
              <BulletList items={job.whatYoullDo.bullets} />
            </Section>

            <Section title="Why you'll love working here">
              <BulletList items={job.whyYoullLoveIt} />
            </Section>

            <Section title={job.compensation.heading}>
              {job.compensation.lead && (
                <p className="mb-5 leading-relaxed text-muted-foreground">
                  {job.compensation.lead}
                </p>
              )}
              <BulletList items={job.compensation.bullets} />

              {job.compensation.benefits && job.compensation.benefits.length > 0 && (
                <div className="mt-8">
                  <h3 className="mb-4 font-semibold">
                    {job.compensation.benefitsHeading ?? "Benefits"}
                  </h3>
                  <BulletList items={job.compensation.benefits} />
                </div>
              )}

              {job.compensation.footnote && (
                <p className="mt-6 text-xs leading-relaxed text-muted-foreground/80">
                  {job.compensation.footnote}
                </p>
              )}
            </Section>

            <Section title="This opportunity is perfect for you if…">
              <BulletList items={job.rightForYouIf} />
              {job.rightForYouClosing && (
                <p className="mt-5 leading-relaxed text-muted-foreground">
                  {job.rightForYouClosing}
                </p>
              )}
            </Section>

            <Section title="What we're looking for">
              <BulletList items={job.whatWereLookingFor} />
              {job.lookingForClosing && (
                <p className="mt-5 leading-relaxed text-muted-foreground">
                  {job.lookingForClosing}
                </p>
              )}
            </Section>

            <Section title="Grow with us">
              <div className="space-y-4">
                {job.growWithUs.map((p) => (
                  <p key={p} className="leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
            </Section>

            <p className="text-xs leading-relaxed text-muted-foreground/80">
              Select Source Water is an equal opportunity employer. All qualified applicants
              will receive consideration for employment without regard to race, color,
              religion, sex, sexual orientation, gender identity, national origin, disability,
              veteran status, or any other characteristic protected by law.
            </p>
          </div>

          {/* Sticky apply rail */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold">Ready to apply?</h3>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                  The application takes about three minutes. A recruiter reviews every
                  submission.
                </p>
                <Button asChild className="w-full font-semibold">
                  <Link to={`/apply?role=${job.slug}`}>Apply for this role</Link>
                </Button>
                <Button asChild variant="ghost" className="mt-2 w-full">
                  <Link to="/careers">See other roles</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
