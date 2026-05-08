import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Helmet } from "react-helmet-async";
import {
  Trophy,
  Users,
  MapPin,
  GraduationCap,
  TrendingUp,
  CheckCircle2,
  Briefcase,
  Sparkles,
  Target,
  Phone,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import {
  readRecruitingParams,
  submitRecruitingApplication,
  type RecruitingPayload,
} from "@/lib/recruitingSubmit";

/* ============================================================================
   Validation schema — mirrors the form field set, with required vs optional
   matching the spec.
   ========================================================================== */
const yesNoMaybe = z.enum(["yes", "no", "maybe"], {
  errorMap: () => ({ message: "Please select an option" }),
});

const applicationSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required").max(80),
  last_name: z.string().trim().min(1, "Last name is required").max(80),
  phone: z
    .string()
    .trim()
    .min(7, "Phone number is required")
    .max(30, "Phone number is too long"),
  email: z.string().trim().email("Enter a valid email").max(255),
  city: z.string().trim().min(1, "City is required").max(80),
  postal_code: z
    .string()
    .trim()
    .min(3, "ZIP is required")
    .max(15, "ZIP is too long"),

  in_orange_county: yesNoMaybe,
  commission_only_ok: yesNoMaybe,
  contractor_1099_ok: yesNoMaybe,
  homeowner_conversation_ok: yesNoMaybe,
  field_or_instore_ok: yesNoMaybe,
  transportation_ok: yesNoMaybe,
  valid_license_ok: yesNoMaybe,

  sales_experience: z.enum(
    ["none", "less_than_1", "1_to_2", "3_to_5", "5_plus"],
    { errorMap: () => ({ message: "Please select an option" }) }
  ),
  experience_detail: z
    .string()
    .trim()
    .max(2000, "Please keep this under 2000 characters")
    .optional()
    .or(z.literal("")),
  start_date_answer: z.enum(
    ["immediately", "within_week", "within_2_weeks", "within_month", "later"],
    { errorMap: () => ({ message: "Please select an option" }) }
  ),
  motivation_answer: z
    .string()
    .trim()
    .min(1, "Please share what motivates you")
    .max(2000, "Please keep this under 2000 characters"),

  consent_contact: z.literal(true, {
    errorMap: () => ({
      message: "You must agree to be contacted in order to apply",
    }),
  }),
  consent_compliance: z.boolean().optional(),
});

type ApplicationForm = z.infer<typeof applicationSchema>;

/* ============================================================================
   Static content
   ========================================================================== */
const whoThisIsFor = [
  "You're comfortable talking to new people",
  "You want performance-based income",
  "You're coachable and competitive",
  "You can work in person",
  "You're open to field sales, in-store lead generation, and homeowner conversations",
  "You want a real growth path in sales",
];

const roleOverview = [
  "Represent Select Source Water in the Orange County market",
  "Speak with homeowners about complimentary water testing",
  "Help generate qualified appointments for our water specialists",
  "Work in approved retail / in-store environments and local field markets",
  "Learn the SSW sales process from the ground up",
  "Commission-based, 1099 independent contractor opportunity",
];

const lookingFor = [
  "Door-to-door sales",
  "Solar sales",
  "Pest control sales",
  "Roofing sales",
  "Alarm / security sales",
  "Home improvement sales",
  "Retail sales",
  "Wireless sales",
  "Car sales",
  "Gym membership sales",
  "Brand ambassadors",
  "Canvassers",
  "Appointment setters",
  "College athletes / former athletes",
  "Restaurant servers or bartenders with strong people skills",
];

const expectSteps = [
  {
    icon: Briefcase,
    title: "Submit your application",
    desc: "Tell us about yourself. Takes about 3 minutes.",
  },
  {
    icon: CheckCircle2,
    title: "Short qualification step",
    desc: "We review your answers and reach out by text, call, or email.",
  },
  {
    icon: Users,
    title: "Interview if you're a fit",
    desc: "A quick conversation about the role, expectations, and your goals.",
  },
  {
    icon: GraduationCap,
    title: "Training & onboarding",
    desc: "If selected, we walk you through product, process, and the SSW playbook.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: "easeOut" },
  }),
};

/* ============================================================================
   Reusable Yes/No/Maybe radio for the qualification questions
   ========================================================================== */
function YesNoMaybe({
  value,
  onChange,
  name,
}: {
  value: string;
  onChange: (v: string) => void;
  name: string;
}) {
  const opts: { v: string; label: string }[] = [
    { v: "yes", label: "Yes" },
    { v: "no", label: "No" },
    { v: "maybe", label: "Not sure" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2" role="radiogroup">
      {opts.map((o) => {
        const selected = value === o.v;
        return (
          <button
            key={o.v}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(o.v)}
            className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
              selected
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background hover:bg-muted"
            }`}
            data-name={name}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/* ============================================================================
   Apply Page
   ========================================================================== */
export default function ApplyPage() {
  const [searchParams] = useSearchParams();
  const tracking = useMemo(
    () => readRecruitingParams(searchParams),
    [searchParams]
  );

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      city: "",
      postal_code: "",
      in_orange_county: undefined as unknown as "yes",
      commission_only_ok: undefined as unknown as "yes",
      contractor_1099_ok: undefined as unknown as "yes",
      homeowner_conversation_ok: undefined as unknown as "yes",
      field_or_instore_ok: undefined as unknown as "yes",
      transportation_ok: undefined as unknown as "yes",
      valid_license_ok: undefined as unknown as "yes",
      sales_experience: undefined as unknown as "none",
      experience_detail: "",
      start_date_answer: undefined as unknown as "immediately",
      motivation_answer: "",
      consent_contact: false as unknown as true,
      consent_compliance: false,
    },
  });

  // Scroll to top after submit
  useEffect(() => {
    if (submitted) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [submitted]);

  const scrollToForm = () => {
    document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = async (data: ApplicationForm) => {
    setLoading(true);

    const payload: RecruitingPayload = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      postal_code: data.postal_code,

      candidate_source: tracking.source,
      source_detail: tracking.source,
      recruiting_market: tracking.market,
      recruiting_campaign: tracking.campaign,
      candidate_city: data.city,
      candidate_zip: data.postal_code,

      in_orange_county: data.in_orange_county,
      commission_only_ok: data.commission_only_ok,
      contractor_1099_ok: data.contractor_1099_ok,
      homeowner_conversation_ok: data.homeowner_conversation_ok,
      field_or_instore_ok: data.field_or_instore_ok,
      transportation_ok: data.transportation_ok,
      valid_license_ok: data.valid_license_ok,

      sales_experience: data.sales_experience,
      experience_detail: data.experience_detail || "",
      start_date_answer: data.start_date_answer,
      motivation_answer: data.motivation_answer,

      consent_contact: data.consent_contact,
      consent_compliance: !!data.consent_compliance,

      page_url: typeof window !== "undefined" ? window.location.href : "",
      submitted_at: new Date().toISOString(),
      tags: [
        "recruiting",
        "recruiting_new_applicant",
        `recruiting_market_${tracking.market}`,
        tracking.source.startsWith("recruiting_source_")
          ? tracking.source
          : `recruiting_source_${tracking.source}`,
      ],
    };

    const result = await submitRecruitingApplication(payload);
    setLoading(false);

    if (!result.ok) {
      toast({
        title: "Something went wrong",
        description:
          "We couldn't submit your application. Please try again, or text (951) 612-4094.",
        variant: "destructive",
      });
      return;
    }
    setSubmitted(true);
  };

  /* ============================== UI ====================================== */
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Apply — Sales Career with Select Source Water | Orange County</title>
        <meta
          name="description"
          content="Apply for a performance-based field sales opportunity with Select Source Water in Orange County. Commission-based, 1099 independent contractor role."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Top bar */}
      <header className="border-b border-border/60 bg-background/95 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img src={logo} alt="Select Source Water" className="h-9 w-auto" />
            <span className="hidden sm:inline-block text-sm font-semibold">
              Select Source Water
            </span>
          </a>
          {!submitted && (
            <Button size="sm" onClick={scrollToForm}>
              Apply Now
            </Button>
          )}
        </div>
      </header>

      {submitted ? (
        /* ========================= THANK YOU STATE ===================== */
        <main className="max-w-2xl mx-auto px-4 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Thanks for applying.
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-8">
              Our recruiting team will review your information. If you're a fit,
              you may receive a text, call, or email with next steps.
            </p>
            <p className="text-sm text-muted-foreground">
              In the meantime, feel free to learn more about Select Source Water
              at{" "}
              <a
                href="/"
                className="text-primary underline-offset-4 hover:underline"
              >
                selectsourcewaterusa.com
              </a>
              .
            </p>
          </motion.div>
        </main>
      ) : (
        <>
          {/* =========================== HERO =========================== */}
          <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15) 0px, transparent 40%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.12) 0px, transparent 45%)",
              }}
              aria-hidden="true"
            />
            <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-24">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide mb-5 backdrop-blur-sm">
                  <MapPin className="h-3.5 w-3.5" />
                  Now Hiring · Orange County, CA
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-5">
                  Build a Sales Career With Select Source Water
                </h1>
                <p className="text-base sm:text-lg md:text-xl opacity-90 mb-8 max-w-2xl">
                  We're looking for motivated, people-first sales reps in
                  Orange County who are ready to learn, compete, and grow in a
                  performance-based field sales environment.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="font-semibold"
                    onClick={scrollToForm}
                  >
                    Apply Now
                  </Button>
                  <a
                    href="#about-the-role"
                    className="inline-flex items-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-semibold hover:bg-white/10 transition-colors"
                  >
                    Learn About the Role
                  </a>
                </div>
                <p className="mt-6 text-xs opacity-80 max-w-xl">
                  Commission-based, 1099 independent contractor opportunity.
                  Pay structure and classification details reviewed during the
                  interview process.
                </p>
              </motion.div>
            </div>
          </section>

          {/* ===================== WHO THIS IS FOR ====================== */}
          <section id="about-the-role" className="py-16 sm:py-20 px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mb-10"
              >
                <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-3">
                  <Target className="h-4 w-4" />
                  Who This Is For
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                  This is built for people who want to compete and grow.
                </h2>
                <p className="text-muted-foreground">
                  Not every role is for everyone. If these sound like you,
                  you'll feel right at home here.
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {whoThisIsFor.map((line, i) => (
                  <motion.div
                    key={line}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="flex items-start gap-3 rounded-lg border border-border/60 bg-card p-4"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base">{line}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ===================== ROLE OVERVIEW ======================== */}
          <section className="py-16 sm:py-20 px-4 bg-muted/40">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mb-10"
              >
                <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-3">
                  <Briefcase className="h-4 w-4" />
                  Role Overview
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                  What you'll actually do day-to-day
                </h2>
                <p className="text-muted-foreground">
                  Select Source Water is a Home Depot authorized independent
                  provider. As part of our in-store lead generation and field
                  sales program, you'll represent SSW in approved Home Depot
                  locations and local territories across Orange County.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-4">
                {roleOverview.map((line, i) => (
                  <motion.div
                    key={line}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                  >
                    <Card className="h-full">
                      <CardContent className="p-5 flex items-start gap-3">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary flex-shrink-0">
                          <Sparkles className="h-4 w-4" />
                        </div>
                        <p className="text-sm sm:text-base leading-relaxed">
                          {line}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <p className="mt-6 text-xs text-muted-foreground max-w-3xl">
                Select Source Water is the company hiring you. You may work
                inside Home Depot locations as part of SSW's authorized
                in-store lead generation program. This role is not employment
                with The Home Depot.
              </p>
            </div>
          </section>

          {/* ================== WHAT WE'RE LOOKING FOR ================== */}
          <section className="py-16 sm:py-20 px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mb-10"
              >
                <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-3">
                  <Trophy className="h-4 w-4" />
                  What We're Looking For
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                  Strong-fit backgrounds
                </h2>
                <p className="text-muted-foreground">
                  We hire on hustle and people skills, not a specific résumé.
                  These backgrounds tend to thrive in our system.
                </p>
              </motion.div>

              <div className="flex flex-wrap gap-2">
                {lookingFor.map((tag, i) => (
                  <motion.span
                    key={tag}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </section>

          {/* ===================== WHAT TO EXPECT ======================= */}
          <section className="py-16 sm:py-20 px-4 bg-muted/40">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mb-10"
              >
                <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-3">
                  <TrendingUp className="h-4 w-4" />
                  What to Expect
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                  Here's how the process works
                </h2>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {expectSteps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                  >
                    <Card className="h-full">
                      <CardContent className="p-5">
                        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <step.icon className="h-5 w-5" />
                        </div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                          Step {i + 1}
                        </div>
                        <h3 className="font-semibold mb-1.5">{step.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.desc}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* =================== APPLICATION FORM ======================= */}
          <section id="apply-form" className="py-16 sm:py-20 px-4">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-10"
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                  Apply Now
                </h2>
                <p className="text-muted-foreground">
                  Takes about 3 minutes. If you're a fit, we'll reach out.
                </p>
              </motion.div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Hidden tracking fields (visible to dev tools, included in payload) */}
                  <input type="hidden" name="source" value={tracking.source} />
                  <input type="hidden" name="market" value={tracking.market} />
                  <input
                    type="hidden"
                    name="campaign"
                    value={tracking.campaign}
                  />

                  {/* Contact info */}
                  <Card>
                    <CardContent className="p-5 sm:p-6 space-y-5">
                      <h3 className="font-semibold text-lg">Your contact info</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="first_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First name *</FormLabel>
                              <FormControl>
                                <Input placeholder="John" autoComplete="given-name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="last_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" autoComplete="family-name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone *</FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  inputMode="tel"
                                  placeholder="(714) 555-1234"
                                  autoComplete="tel"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  inputMode="email"
                                  placeholder="you@example.com"
                                  autoComplete="email"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Anaheim"
                                  autoComplete="address-level2"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="postal_code"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ZIP code *</FormLabel>
                              <FormControl>
                                <Input
                                  inputMode="numeric"
                                  placeholder="92805"
                                  autoComplete="postal-code"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Qualification questions */}
                  <Card>
                    <CardContent className="p-5 sm:p-6 space-y-6">
                      <h3 className="font-semibold text-lg">Quick qualification</h3>

                      {[
                        {
                          name: "in_orange_county" as const,
                          q: "Are you located in or near Orange County, CA?",
                        },
                        {
                          name: "commission_only_ok" as const,
                          q: "Are you comfortable with commission-based pay?",
                        },
                        {
                          name: "contractor_1099_ok" as const,
                          q: "Are you comfortable with a 1099 independent contractor opportunity?",
                        },
                        {
                          name: "homeowner_conversation_ok" as const,
                          q: "Are you comfortable talking to homeowners and approaching new people?",
                        },
                        {
                          name: "field_or_instore_ok" as const,
                          q: "Are you open to in-person field sales or in-store lead generation?",
                        },
                        {
                          name: "transportation_ok" as const,
                          q: "Do you have reliable transportation?",
                        },
                        {
                          name: "valid_license_ok" as const,
                          q: "Do you have a valid driver's license?",
                        },
                      ].map(({ name, q }) => (
                        <FormField
                          key={name}
                          control={form.control}
                          name={name}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="leading-snug">{q}</FormLabel>
                              <FormControl>
                                <YesNoMaybe
                                  name={name}
                                  value={field.value as string}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </CardContent>
                  </Card>

                  {/* Experience */}
                  <Card>
                    <CardContent className="p-5 sm:p-6 space-y-5">
                      <h3 className="font-semibold text-lg">Your experience</h3>

                      <FormField
                        control={form.control}
                        name="sales_experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Do you have sales experience? *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value as string}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your experience" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="none">No formal sales experience</SelectItem>
                                <SelectItem value="less_than_1">Less than 1 year</SelectItem>
                                <SelectItem value="1_to_2">1–2 years</SelectItem>
                                <SelectItem value="3_to_5">3–5 years</SelectItem>
                                <SelectItem value="5_plus">5+ years</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="experience_detail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              What type of sales or customer-facing experience do you have?
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                rows={3}
                                placeholder="D2D, retail, restaurant, athletics, etc. Be specific."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="start_date_answer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>How soon could you start? *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value as string}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pick a timeline" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="immediately">Immediately</SelectItem>
                                <SelectItem value="within_week">Within a week</SelectItem>
                                <SelectItem value="within_2_weeks">Within 2 weeks</SelectItem>
                                <SelectItem value="within_month">Within a month</SelectItem>
                                <SelectItem value="later">Later than a month</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="motivation_answer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Why are you interested in this opportunity? *
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                rows={4}
                                placeholder="What drew you to sales, why SSW, what are you trying to build?"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Consent */}
                  <Card>
                    <CardContent className="p-5 sm:p-6 space-y-4">
                      <h3 className="font-semibold text-lg">Consent</h3>

                      <FormField
                        control={form.control}
                        name="consent_contact"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-start gap-3">
                              <FormControl>
                                <Checkbox
                                  checked={!!field.value}
                                  onCheckedChange={field.onChange}
                                  className="mt-0.5"
                                />
                              </FormControl>
                              <FormLabel className="font-normal text-sm leading-relaxed">
                                I agree to be contacted by Select Source Water
                                by phone, text, and email about this
                                opportunity. Message and data rates may apply.
                                I can opt out at any time. *
                              </FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="consent_compliance"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-start gap-3">
                              <FormControl>
                                <Checkbox
                                  checked={!!field.value}
                                  onCheckedChange={field.onChange}
                                  className="mt-0.5"
                                />
                              </FormControl>
                              <FormLabel className="font-normal text-sm leading-relaxed">
                                I understand this opportunity may be
                                commission-based and structured as a 1099
                                independent contractor role, with final details
                                reviewed during the hiring process.
                              </FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full font-semibold"
                    disabled={loading}
                  >
                    {loading ? "Submitting…" : "Submit Application"}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By submitting, you confirm the information above is
                    accurate. Pay structure and classification details will be
                    reviewed during the interview process.
                  </p>
                </form>
              </Form>
            </div>
          </section>
        </>
      )}

      {/* =========================== FOOTER ============================ */}
      <footer className="border-t border-border/60 py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div>
            © {new Date().getFullYear()} Select Source Water. All rights
            reserved.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:9516124094"
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              (951) 612-4094
            </a>
            <a
              href="/privacy-policy.html"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <a
              href="/terms-of-service.html"
              className="hover:text-foreground transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
