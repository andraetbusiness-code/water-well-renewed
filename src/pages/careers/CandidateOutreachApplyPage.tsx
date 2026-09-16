import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckCircle2, MapPin, Network, Phone, Target, Users } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  type RecruitingFormInput,
} from "@/lib/recruitingSubmit";
import {
  CANDIDATE_OUTREACH_MARKETS,
  resolveCandidateMarketFromUrl,
  type MarketId,
} from "@/lib/recruitingMarkets";

const campaignMarketIds = CANDIDATE_OUTREACH_MARKETS.map((market) => market.id) as [
  MarketId,
  ...MarketId[],
];

const schema = z
  .object({
    first_name: z.string().trim().min(1, "First name is required").max(80),
    last_name: z.string().trim().min(1, "Last name is required").max(80),
    phone: z.string().trim().min(7, "Phone number is required").max(30),
    email: z.string().trim().email("Enter a valid email").max(255),
    city: z.string().trim().min(1, "City is required").max(80),
    postal_code: z.string().trim().min(3, "ZIP is required").max(15),
    selected_markets: z.array(z.enum(campaignMarketIds)).min(1, "Select at least one market"),
    role: z.enum(["team-leader", "closer", "setter", "unsure"]),
    sales_experience: z.enum(["none", "less_than_1", "1_to_2", "3_to_5", "5_plus"]),
    team_relationship: z.enum(["yes", "some", "no"]).optional(),
    team_size: z.enum(["1_to_2", "3_to_5", "6_to_10", "11_plus"]).optional(),
    team_details: z.string().trim().max(1000).optional().or(z.literal("")),
    start_date_answer: z.enum(["immediately", "within_week", "within_2_weeks", "within_month", "later"]),
    opportunity_terms_ok: z.literal(true, {
      errorMap: () => ({ message: "Please acknowledge the 1099 opportunity terms" }),
    }),
    consent_contact: z.literal(true, {
      errorMap: () => ({ message: "You must agree to be contacted to apply" }),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.role !== "team-leader") return;
    if (!data.team_relationship) {
      ctx.addIssue({ code: "custom", path: ["team_relationship"], message: "Please select an answer" });
    }
    if (!data.team_size) {
      ctx.addIssue({ code: "custom", path: ["team_size"], message: "Please select a team size" });
    }
  });

type CampaignForm = z.infer<typeof schema>;

const ROLE_OPTIONS = [
  {
    value: "team-leader",
    label: "Team leader with an existing sales network",
    description: "You already know and have worked with salespeople you can organize to work with or for you.",
  },
  {
    value: "closer",
    label: "Experienced closer / independent sales representative",
    description: "You have direct-sales experience and are ready to discuss a performance-based opportunity.",
  },
  {
    value: "setter",
    label: "Appointment setter / developing sales candidate",
    description: "You are strong with people and want to grow in residential water treatment sales.",
  },
  {
    value: "unsure",
    label: "Open to the best-fit opportunity",
    description: "You want to speak with us and determine which path fits your background.",
  },
] as const;

const pathToRole: Record<string, CampaignForm["role"]> = {
  dealer: "team-leader",
  closer: "closer",
  setter: "setter",
  unsure: "unsure",
};

function teamRelationshipLabel(value?: string) {
  if (value === "yes") return "Yes — we have worked together directly";
  if (value === "some") return "Some of them — mixed prior working relationships";
  if (value === "no") return "No — this would be a newly assembled group";
  return "Not answered";
}

export default function CandidateOutreachApplyPage() {
  const [searchParams] = useSearchParams();
  const tracking = useMemo(() => readRecruitingParams(searchParams), [searchParams]);
  const urlMarket = useMemo(
    () => resolveCandidateMarketFromUrl(tracking.market),
    [tracking.market]
  );
  const initialRole = pathToRole[searchParams.get("path") || ""] || "unsure";
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<CampaignForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      city: "",
      postal_code: "",
      selected_markets: urlMarket ? [urlMarket.id] : [],
      role: initialRole,
      sales_experience: undefined,
      team_relationship: undefined,
      team_size: undefined,
      team_details: "",
      start_date_answer: undefined,
      opportunity_terms_ok: false as true,
      consent_contact: false as true,
    },
  });

  const selectedRole = form.watch("role");

  const onSubmit = async (data: CampaignForm) => {
    setLoading(true);
    const teamSummary =
      data.role === "team-leader"
        ? [
            `Existing-network relationship: ${teamRelationshipLabel(data.team_relationship)}`,
            `Salespeople ready to discuss: ${data.team_size || "Not answered"}`,
            data.team_details ? `Network/territory notes: ${data.team_details}` : "",
          ]
            .filter(Boolean)
            .join(" | ")
        : data.team_details || "";

    const input: RecruitingFormInput = {
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      email: data.email,
      city: data.city,
      postal_code: data.postal_code,
      selected_markets: data.selected_markets,
      role: data.role,
      // These legacy compatibility values keep the established transport layer
      // intact. Campaign-specific classification is carried in explicit fields.
      in_socal: "yes",
      w2_pay_ok: "maybe",
      homeowner_conversation_ok: "yes",
      field_or_instore_ok: "maybe",
      transportation_ok: "maybe",
      valid_license_ok: "maybe",
      employment_classification: "1099 independent contractor",
      opportunity_terms_ok: "yes",
      sales_experience: data.sales_experience,
      experience_detail: teamSummary,
      resume_url: "",
      start_date_answer: data.start_date_answer,
      motivation_answer: ROLE_OPTIONS.find((role) => role.value === data.role)?.label || data.role,
      motivation_other: teamSummary,
      consent_contact: data.consent_contact,
      source: tracking.source,
      market: tracking.market,
      campaign: tracking.campaign,
      page_url: window.location.href,
    };

    const result = await submitRecruitingApplication(input);
    setLoading(false);
    if (!result.ok) {
      toast({
        title: "We couldn't submit your information",
        description: "Please try again or call Select Source Water at (951) 612-4094.",
        variant: "destructive",
      });
      return;
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToForm = () => document.getElementById("candidate-form")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>California & Arizona Sales Opportunities | Select Source Water</title>
        <meta
          name="description"
          content="Explore 1099 independent-contractor sales opportunities with Select Source Water in California and Arizona, including team-leader paths for people with an existing sales network."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="/" className="flex items-center gap-2 hover:opacity-80">
            <img src={logo} alt="Select Source Water" className="h-9 w-auto" />
            <span className="hidden text-sm font-semibold sm:inline">Select Source Water</span>
          </a>
          {!submitted && <Button size="sm" onClick={scrollToForm}>Start the Conversation</Button>}
        </div>
      </header>

      {submitted ? (
        <main className="mx-auto max-w-2xl px-4 py-20 text-center">
          <CheckCircle2 className="mx-auto mb-5 h-16 w-16 text-primary" />
          <h1 className="mb-4 text-4xl font-bold">Thanks. We received your information.</h1>
          <p className="text-lg text-muted-foreground">
            Our recruiting team will review your background and contact you if there is a potential fit.
          </p>
        </main>
      ) : (
        <>
          <section className="bg-gradient-to-br from-primary via-primary to-accent px-4 py-16 text-primary-foreground sm:py-24">
            <div className="mx-auto max-w-5xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                <MapPin className="h-3.5 w-3.5" />
                {urlMarket?.heroBadge || "Recruiting · California & Arizona"}
              </div>
              <h1 className="mb-5 max-w-4xl text-4xl font-bold leading-tight sm:text-6xl">
                Build Your Next Sales Chapter With Select Source Water
              </h1>
              <p className="mb-8 max-w-3xl text-lg opacity-90 sm:text-xl">
                We are opening conversations with experienced direct-sales professionals, independent representatives, and team leaders who already have a trusted sales network.
              </p>
              <Button size="lg" variant="secondary" onClick={scrollToForm}>Tell Us About Your Background</Button>
              <p className="mt-5 max-w-3xl text-xs opacity-80">
                These are 1099 independent-contractor opportunities. Compensation, territory, team structure, and availability vary by role and market and are reviewed before any agreement.
              </p>
            </div>
          </section>

          <section className="px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-5xl">
              <div className="mb-10 max-w-3xl">
                <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-primary"><Target className="h-4 w-4" />Choose Your Path</div>
                <h2 className="mb-3 text-3xl font-bold sm:text-4xl">We are looking for more than one kind of sales professional.</h2>
                <p className="text-muted-foreground">Select the path that best matches where you are today. We will review fit, market needs, and next steps with qualified candidates.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {ROLE_OPTIONS.map((role) => (
                  <Card key={role.value} className={role.value === "team-leader" ? "border-primary/60" : ""}>
                    <CardContent className="p-6">
                      <div className="mb-3 flex items-center gap-2 text-primary">
                        {role.value === "team-leader" ? <Network className="h-5 w-5" /> : <Users className="h-5 w-5" />}
                        <h3 className="font-semibold">{role.label}</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{role.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section id="candidate-form" className="bg-muted/40 px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-2xl">
              <div className="mb-8 text-center">
                <h2 className="mb-3 text-3xl font-bold sm:text-4xl">Start the Conversation</h2>
                <p className="text-muted-foreground">Tell us where you work and which opportunity fits you best.</p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <Card><CardContent className="space-y-4 p-5 sm:p-6">
                    <h3 className="text-lg font-semibold">Contact information</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField control={form.control} name="first_name" render={({ field }) => <FormItem><FormLabel>First name *</FormLabel><FormControl><Input autoComplete="given-name" {...field} /></FormControl><FormMessage /></FormItem>} />
                      <FormField control={form.control} name="last_name" render={({ field }) => <FormItem><FormLabel>Last name *</FormLabel><FormControl><Input autoComplete="family-name" {...field} /></FormControl><FormMessage /></FormItem>} />
                      <FormField control={form.control} name="phone" render={({ field }) => <FormItem><FormLabel>Phone *</FormLabel><FormControl><Input type="tel" autoComplete="tel" {...field} /></FormControl><FormMessage /></FormItem>} />
                      <FormField control={form.control} name="email" render={({ field }) => <FormItem><FormLabel>Email *</FormLabel><FormControl><Input type="email" autoComplete="email" {...field} /></FormControl><FormMessage /></FormItem>} />
                      <FormField control={form.control} name="city" render={({ field }) => <FormItem><FormLabel>City *</FormLabel><FormControl><Input autoComplete="address-level2" {...field} /></FormControl><FormMessage /></FormItem>} />
                      <FormField control={form.control} name="postal_code" render={({ field }) => <FormItem><FormLabel>ZIP code *</FormLabel><FormControl><Input autoComplete="postal-code" {...field} /></FormControl><FormMessage /></FormItem>} />
                    </div>
                  </CardContent></Card>

                  <Card><CardContent className="space-y-4 p-5 sm:p-6">
                    <h3 className="text-lg font-semibold">Markets you can cover *</h3>
                    <p className="text-sm text-muted-foreground">Choose every California or Arizona market you would be willing to work.</p>
                    <FormField control={form.control} name="selected_markets" render={({ field }) => (
                      <FormItem>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {CANDIDATE_OUTREACH_MARKETS.map((market) => {
                            const selected = field.value?.includes(market.id);
                            return <button key={market.id} type="button" role="checkbox" aria-checked={selected} onClick={() => field.onChange(selected ? field.value.filter((id) => id !== market.id) : [...field.value, market.id])} className={`rounded-lg border p-3 text-left text-sm transition-colors ${selected ? "border-primary bg-primary/10" : "bg-background hover:bg-muted"}`}><span className="font-medium">{market.label}</span></button>;
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </CardContent></Card>

                  <Card><CardContent className="space-y-5 p-5 sm:p-6">
                    <h3 className="text-lg font-semibold">Your sales path</h3>
                    <FormField control={form.control} name="role" render={({ field }) => <FormItem><FormLabel>Which best describes you? *</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>{ROLE_OPTIONS.map((role) => <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>} />
                    <FormField control={form.control} name="sales_experience" render={({ field }) => <FormItem><FormLabel>Direct-sales experience *</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select experience" /></SelectTrigger></FormControl><SelectContent><SelectItem value="none">No direct-sales experience</SelectItem><SelectItem value="less_than_1">Less than 1 year</SelectItem><SelectItem value="1_to_2">1–2 years</SelectItem><SelectItem value="3_to_5">3–5 years</SelectItem><SelectItem value="5_plus">5+ years</SelectItem></SelectContent></Select><FormMessage /></FormItem>} />

                    {selectedRole === "team-leader" && <>
                      <FormField control={form.control} name="team_relationship" render={({ field }) => <FormItem><FormLabel>Have you already worked directly with the salespeople in your network? *</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select an answer" /></SelectTrigger></FormControl><SelectContent><SelectItem value="yes">Yes — we have worked together directly</SelectItem><SelectItem value="some">Some of them</SelectItem><SelectItem value="no">No — this would be a newly assembled group</SelectItem></SelectContent></Select><FormMessage /></FormItem>} />
                      <FormField control={form.control} name="team_size" render={({ field }) => <FormItem><FormLabel>How many salespeople could you bring into a conversation? *</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select team size" /></SelectTrigger></FormControl><SelectContent><SelectItem value="1_to_2">1–2</SelectItem><SelectItem value="3_to_5">3–5</SelectItem><SelectItem value="6_to_10">6–10</SelectItem><SelectItem value="11_plus">11+</SelectItem></SelectContent></Select><FormMessage /></FormItem>} />
                    </>}

                    <FormField control={form.control} name="team_details" render={({ field }) => <FormItem><FormLabel>{selectedRole === "team-leader" ? "Tell us about your network and the markets you have worked together (optional)" : "Anything else you want us to know? (optional)"}</FormLabel><FormControl><Textarea rows={4} {...field} /></FormControl><FormMessage /></FormItem>} />
                    <FormField control={form.control} name="start_date_answer" render={({ field }) => <FormItem><FormLabel>How soon could you begin? *</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a timeline" /></SelectTrigger></FormControl><SelectContent><SelectItem value="immediately">Immediately</SelectItem><SelectItem value="within_week">Within a week</SelectItem><SelectItem value="within_2_weeks">Within 2 weeks</SelectItem><SelectItem value="within_month">Within a month</SelectItem><SelectItem value="later">Later than a month</SelectItem></SelectContent></Select><FormMessage /></FormItem>} />
                  </CardContent></Card>

                  <Card><CardContent className="space-y-4 p-5 sm:p-6">
                    <h3 className="text-lg font-semibold">Acknowledgments</h3>
                    <FormField control={form.control} name="opportunity_terms_ok" render={({ field }) => <FormItem><div className="flex items-start gap-3"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-0.5" /></FormControl><FormLabel className="font-normal leading-relaxed">I understand this outreach concerns a 1099 independent-contractor opportunity, not W-2 employment. Compensation, territory, team structure, and opportunity availability vary by role and market and will be reviewed before any agreement. *</FormLabel></div><FormMessage /></FormItem>} />
                    <FormField control={form.control} name="consent_contact" render={({ field }) => <FormItem><div className="flex items-start gap-3"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-0.5" /></FormControl><FormLabel className="font-normal leading-relaxed">I agree to be contacted by Select Source Water by phone, text, and email about this opportunity. Message and data rates may apply. I can opt out at any time. *</FormLabel></div><FormMessage /></FormItem>} />
                  </CardContent></Card>

                  <Button type="submit" size="lg" className="w-full font-semibold" disabled={loading}>{loading ? "Submitting…" : "Submit My Information"}</Button>
                </form>
              </Form>
            </div>
          </section>
        </>
      )}

      <footer className="border-t border-border/60 px-4 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} Select Source Water. All rights reserved.</div>
          <a href="tel:9516124094" className="inline-flex items-center gap-1.5 hover:text-foreground"><Phone className="h-3.5 w-3.5" />(951) 612-4094</a>
        </div>
      </footer>
    </div>
  );
}
