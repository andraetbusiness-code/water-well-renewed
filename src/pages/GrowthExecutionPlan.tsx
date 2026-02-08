import { Helmet } from "react-helmet-async";
import { Download, CheckCircle2, Target, Zap, Users, Megaphone, Globe, BookOpen, Lock, ClipboardList, BarChart3, Rocket, DollarSign } from "lucide-react";
import logo from "@/assets/logo.png";

/* ------------------------------------------------------------------ */
/*  Shared sub-components (same patterns as audit page)                */
/* ------------------------------------------------------------------ */

const SectionTitle = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <h2
    id={id}
    className="text-2xl font-bold tracking-tight mt-12 mb-6 pb-3 border-b-2"
    style={{ color: "#123B8A", borderColor: "#1E6FD9" }}
  >
    {children}
  </h2>
);

const PhaseBadge = ({ phase }: { phase: "Phase 1" | "Phase 2" | "Phase 3" }) => {
  const styles: Record<string, string> = {
    "Phase 1": "bg-blue-100 text-blue-800 border-blue-300",
    "Phase 2": "bg-emerald-100 text-emerald-800 border-emerald-300",
    "Phase 3": "bg-purple-100 text-purple-800 border-purple-300",
  };
  return (
    <span className={`inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${styles[phase]}`}>
      {phase}
    </span>
  );
};

const GoalCard = ({ children, title }: { children: React.ReactNode; title?: string }) => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 mb-4 border-l-4 border-l-blue-500 audit-no-break">
    {title && (
      <div className="flex items-center gap-2 mb-2">
        <Target className="w-4 h-4 text-blue-600 flex-shrink-0" />
        <span className="font-semibold text-gray-900">{title}</span>
      </div>
    )}
    <div className="text-gray-700 text-sm leading-relaxed">{children}</div>
  </div>
);

const CalloutCard = ({
  children,
  severity,
  title,
}: {
  children: React.ReactNode;
  severity: "info" | "success" | "warning";
  title?: string;
}) => {
  const borderColors: Record<string, string> = {
    info: "border-l-blue-500",
    success: "border-l-emerald-500",
    warning: "border-l-amber-500",
  };
  const icons: Record<string, React.ReactNode> = {
    info: <Zap className="w-4 h-4 text-blue-600" />,
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
    warning: <Target className="w-4 h-4 text-amber-600" />,
  };
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm p-5 mb-4 border-l-4 ${borderColors[severity]} audit-no-break`}>
      {title && (
        <div className="flex items-center gap-2 mb-2">
          {icons[severity]}
          <span className="font-semibold text-gray-900">{title}</span>
        </div>
      )}
      <div className="text-gray-700 text-sm leading-relaxed">{children}</div>
    </div>
  );
};

const DataTable = ({
  title,
  subtitle,
  headers,
  rows,
}: {
  title: string;
  subtitle?: string;
  headers: string[];
  rows: (string | React.ReactNode)[][];
}) => (
  <div className="mb-8 audit-no-break">
    <h3 className="text-lg font-bold mb-1" style={{ color: "#123B8A" }}>
      {title}
    </h3>
    {subtitle && <p className="text-xs text-gray-500 mb-3">{subtitle}</p>}
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr style={{ backgroundColor: "#123B8A" }}>
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left text-white font-semibold text-xs uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 text-gray-700 border-t border-gray-100">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const SubSectionTitle = ({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) => (
  <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8 flex items-center gap-2">
    {icon}
    {children}
  </h3>
);

const SimpleTermsCard = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-emerald-50 border-l-4 border-l-emerald-400 rounded-lg p-5 mt-6 mb-4 audit-no-break">
    <div className="flex items-start gap-3">
      <DollarSign className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-bold text-emerald-900 text-sm mb-1">In Simple Terms</p>
        <p className="text-sm text-emerald-800 leading-relaxed">{children}</p>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

const GrowthExecutionPlan = () => {
  return (
    <>
      <Helmet>
        <title>Growth Execution Plan | Select Source Water</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Helmet>

      {/* ── Fixed Header (hidden on print) ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 shadow-md audit-header"
        style={{ backgroundColor: "#123B8A" }}
      >
        <div className="flex items-center gap-3">
          <img src={logo} alt="Select Source Water" className="h-8 w-auto" />
          <span className="text-white font-semibold text-sm hidden sm:inline">
            Growth Execution Plan
          </span>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          style={{ backgroundColor: "#1E6FD9", color: "#fff" }}
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </header>

      {/* ── Report Body ── */}
      <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto bg-white min-h-screen audit-body">

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  COVER BLOCK                                               */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="text-center py-16 mb-8 border-b-2 border-gray-200 audit-section">
          <img src={logo} alt="Select Source Water" className="mx-auto mb-8 w-48 sm:w-64" />
          <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#123B8A" }}>
            Growth Execution Plan
          </h1>
          <p className="text-gray-500 text-base mb-2">
            Systems &bull; Lead Generation &bull; Recruiting &bull; Marketing &bull; Web/SEO &bull; Training/SOP &bull; Repeatability
          </p>
          <p className="text-gray-500 text-sm mb-6">Audience: Executive Team</p>

          <div className="max-w-2xl mx-auto text-left mb-8">
            <p className="text-sm text-gray-700 leading-relaxed">
              Following the audit findings, this plan outlines the execution systems we can begin immediately once agreement and access requirements are confirmed. It is designed to improve conversion, increase sit rate, eliminate leakage, restore ROI visibility, and create repeatable performance across current and future Home Depot locations.
            </p>
          </div>

          <span
            className="inline-block px-4 py-1.5 rounded text-xs font-bold uppercase tracking-widest border-2"
            style={{ color: "#B91C1C", borderColor: "#B91C1C", backgroundColor: "#FEF2F2" }}
          >
            Confidential
          </span>

          <div className="max-w-2xl mx-auto mt-6 p-4 rounded-lg border border-gray-300 bg-gray-50 text-left">
            <p className="text-xs text-gray-600 leading-relaxed">
              <span className="font-bold uppercase tracking-wide">Intellectual Property Notice:</span>{" "}
              This document and all strategies, systems, frameworks, workflows, and methodologies described herein are the proprietary intellectual property of Andrae Thames and Thames Legacy LLC DBA Right Way Systems. This material is provided exclusively for evaluation purposes and may not be copied, reproduced, distributed, shared, or implemented—in whole or in part—without express written authorization. Unauthorized use, adaptation, or disclosure of any concept, process, or system contained in this plan constitutes a violation of intellectual property rights and may result in legal action. Receipt of this document does not constitute a license or right to use any of the strategies described.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  IMPORTANT CONTEXT                                         */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="audit-section">
          <SectionTitle id="context">Important Context (Scope + Next Layer of Truth)</SectionTitle>

          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            This execution plan is built from what we were able to verify inside GoHighLevel (GHL) and Enzy during the audit period.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mb-4 font-semibold">
            However, this is not yet the full data universe.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Once we gain access to the other platforms that are currently in use—or potentially in place but dormant—such as Google Business Profile (GBP), Google Analytics (GA4), Google Ads, Meta Business Manager, call routing/call tracking systems, website analytics, and any other connected tools, we will run a deeper forensic review to:
          </p>
          <ul className="list-disc list-outside ml-6 space-y-2 text-sm text-gray-700 mb-6">
            <li>confirm true cross-platform attribution,</li>
            <li>reconcile paid spend with actual sold revenue,</li>
            <li>identify any dormant assets and missed demand capture (especially Google/Local),</li>
            <li>and finalize an airtight solution with complete source-of-truth reporting.</li>
          </ul>

          <CalloutCard severity="info" title="Bottom line">
            <p>
              This plan is execution-ready now, and will become even more precise once full access is granted and we can tell the complete end-to-end story.
            </p>
          </CalloutCard>

          <SimpleTermsCard>
            We've already found enough to start fixing things now. Once we get full access to all your platforms, we'll be able to show you exactly where every dollar goes and comes back.
          </SimpleTermsCard>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  1. EXECUTIVE OUTCOMES                                     */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="audit-section">
          <SectionTitle id="executive-outcomes">1) Executive Outcomes (What This Plan Delivers)</SectionTitle>

          <SubSectionTitle>A. Measurable Performance Outcomes</SubSectionTitle>
          <ul className="list-disc list-outside ml-6 space-y-3 text-sm text-gray-700 mb-6">
            <li><strong>End-to-end visibility:</strong> Spend → Lead → Booked → Confirmed → Sat (held) → Sold (closed won + revenue)</li>
            <li><strong>Higher sit rate:</strong> Confirmation and follow-up systems drive more appointments to actually happen</li>
            <li><strong>Reduced waste:</strong> Spend governance prevents budget running without measurable outcomes</li>
            <li><strong>Higher close visibility:</strong> Sales captured consistently so cost-per-sale and ROI can be proven</li>
            <li><strong>Higher reclose rates:</strong> "No-sale sat" and "no-show" leads are recovered through structured reactivation</li>
          </ul>

          <SubSectionTitle>B. Scalable Growth Outcomes</SubSectionTitle>
          <ul className="list-disc list-outside ml-6 space-y-3 text-sm text-gray-700 mb-6">
            <li><strong>Repeatable multi-location system:</strong> standardized metadata and workflows so new stores can be onboarded without rebuilding the machine</li>
            <li><strong>Self-generated same-day lead engine:</strong> reps and water testers can consistently talk to 10–20 new homeowners/day without waiting for booked appointments</li>
            <li><strong>Recruiting flywheel:</strong> weekly interviews + monthly hiring event ensures a constant bench of 1099 talent</li>
            <li><strong>Brand and creative output at scale:</strong> consistent, high-quality marketing materials across store, field, and digital channels</li>
            <li><strong>Web development + SEO compounding:</strong> organic demand increases over time, reducing dependence on paid media</li>
          </ul>

          <CalloutCard severity="success" title="Standardized SOP + Training System">
            <p>
              <strong>Locked SOP + Training Suite:</strong> We will build and lock a standardized training library and SOP suite so every rep, tester, VA, and new Home Depot location runs the same proven process—reducing inconsistency and making results repeatable at scale.
            </p>
          </CalloutCard>

          <SimpleTermsCard>
            This plan is designed to help you see exactly how much you spend, how many sales it produces, and where money is being left on the table — then fix it so every dollar works harder.
          </SimpleTermsCard>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  2. PHASE PLAN                                             */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="audit-section" id="phase-plan">
          <SectionTitle>2) Phase Plan (90-Day Execution Timeline)</SectionTitle>

          {/* Phase 1 */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-4 audit-no-break">
            <div className="flex items-center gap-3 mb-4">
              <PhaseBadge phase="Phase 1" />
              <span className="font-bold text-gray-900">Week 1: Stabilize + Make Results Measurable</span>
            </div>
            <ol className="list-decimal list-outside ml-6 space-y-2 text-sm text-gray-700">
              <li>Confirm the system-of-record approach for "Sat" and "Sold"</li>
              <li>Standardize lead source capture and metadata across Enzy + GHL</li>
              <li>Deploy missed call elimination system (AI call handling + human routing)</li>
              <li>Establish spend guardrails and reporting cadence</li>
              <li>Begin immediate creative support for store/field needs (flyers, slicks, route collateral)</li>
            </ol>
          </div>

          {/* Phase 2 */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-4 audit-no-break">
            <div className="flex items-center gap-3 mb-4">
              <PhaseBadge phase="Phase 2" />
              <span className="font-bold text-gray-900">Weeks 2–4: Conversion Ops + Waste Control + Reclose Engine</span>
            </div>
            <ol className="list-decimal list-outside ml-6 space-y-2 text-sm text-gray-700">
              <li>Improve confirmation → show rate throughput</li>
              <li>Fix missed call loss + speed-to-lead</li>
              <li>Build no-show + no-sale reactivation sequences with VA execution standards</li>
              <li>Launch initial Google high-intent capture (once access is approved) and reallocate dead spend methodically</li>
              <li>Deploy the first version of territory route packs and iterate weekly</li>
            </ol>
          </div>

          {/* Phase 3 */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-4 audit-no-break">
            <div className="flex items-center gap-3 mb-4">
              <PhaseBadge phase="Phase 3" />
              <span className="font-bold text-gray-900">Weeks 4–12: Scale + Repeatability + Expansion Readiness</span>
            </div>
            <ol className="list-decimal list-outside ml-6 space-y-2 text-sm text-gray-700">
              <li>Expand route pack self-gen engine by territory</li>
              <li>Scale winning paid channels with proof-based reporting</li>
              <li>Stand up SEO + web improvements and the content engine</li>
              <li>Recruit and onboard consistently; replicate the SOP/training system across additional Home Depot locations</li>
            </ol>
          </div>

          <SimpleTermsCard>
            Week 1 we stop the bleeding. By month 1 we're converting more leads into sales. By month 3 the whole system runs on its own and can be copied to new locations.
          </SimpleTermsCard>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  3. CORE SYSTEM FIXES                                      */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="audit-section" id="system-fixes">
          <SectionTitle>3) Core System Fixes (Enzy + GoHighLevel)</SectionTitle>

          <SubSectionTitle icon={<Zap className="w-5 h-5 text-blue-600" />}>A) Enzy Fixes (Store/Field Operating Layer)</SubSectionTitle>
          <GoalCard title="Goal">
            <p>Make store-generated and field-generated activity consistent, reportable, and scalable.</p>
          </GoalCard>
          <p className="text-sm text-gray-700 mb-2 font-semibold">We will:</p>
          <ul className="list-disc list-outside ml-6 space-y-2 text-sm text-gray-700 mb-4">
            <li>Standardize lead statuses and reason codes (cancelled / no-sale / not qualified / reschedule / sold / failed credit, etc.)</li>
            <li>Require consistent identifiers: store, rep, territory, lead type, date created</li>
            <li>Increase compliance on the core action Ryan flagged as critical: Enzy "Push to GHL" must be used on every store lead</li>
            <li>Build a weekly reconciliation workflow: Enzy "Sold" → verified against GHL "Closed Won"</li>
            <li>Improve leadership reporting views beyond the Enzy leaderboard so the team monitors: Leads → Sits → Sales, not just raw lead counts</li>
          </ul>
          <CalloutCard severity="warning" title="Why it matters">
            <p>If only a small percent of reps consistently use the push-and-confirmation workflow, sit rate will remain capped.</p>
          </CalloutCard>

          <SimpleTermsCard>
            Right now, not every lead is being tracked the same way, which means sales are slipping through the cracks. We fix that so every lead is accounted for and every sale gets counted.
          </SimpleTermsCard>

          <SubSectionTitle icon={<Zap className="w-5 h-5 text-blue-600" />}>B) GoHighLevel Fixes (Automation + Reporting Layer)</SubSectionTitle>
          <GoalCard title="Goal">
            <p>Make GHL the measurable spine of the operation.</p>
          </GoalCard>
          <p className="text-sm text-gray-700 mb-2 font-semibold">We will:</p>
          <ul className="list-disc list-outside ml-6 space-y-2 text-sm text-gray-700 mb-4">
            <li>
              Confirm/create a standardized pipeline structure that supports executive reporting:
              <p className="mt-1 ml-4 text-xs text-gray-500">New Lead → Contacted → Appointment Booked → Confirmed → Sat (Held) → Closed Won → Closed Lost → Reactivation</p>
            </li>
            <li>Ensure marketing source attribution is captured consistently (UTMs/source fields/custom fields)</li>
            <li>
              Ensure appointments have measurable outcomes:
              <p className="mt-1 ml-4 text-xs text-gray-500">Show / No-show / Reschedule / Cancelled</p>
            </li>
            <li>Ensure closed-won revenue is captured so ROI is calculable</li>
            <li>Validate that confirmation flows (YES/NO + video) run for all relevant sources (not only certain lead types)</li>
          </ul>
          <CalloutCard severity="success" title="Result">
            <p>These system fixes will be documented into a locked SOP suite and training pathway to ensure every location executes the same workflow consistently.</p>
          </CalloutCard>

          <SimpleTermsCard>
            We're building one clean pipeline so leadership can see — at a glance — how many leads came in, how many showed up, and how many bought. No guessing.
          </SimpleTermsCard>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  4. MISSED CALL ELIMINATION                                */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="audit-section" id="missed-calls">
          <SectionTitle>4) Missed Call Elimination (AI Call Handling + Human Routing)</SectionTitle>

          <GoalCard title="Goal">
            <p>Remove missed calls as a revenue leak and ensure no caller is lost.</p>
          </GoalCard>

          <p className="text-sm text-gray-700 mb-2 font-semibold">We will implement:</p>
          <ul className="list-disc list-outside ml-6 space-y-2 text-sm text-gray-700 mb-4">
            <li>AI answers instantly, qualifies, and attempts to book</li>
            <li>If AI cannot book, it routes to a human immediately (or triggers priority callback workflow)</li>
            <li>Missed call text-back + structured follow-up cadence</li>
            <li>Centralized call reporting: answered vs missed vs booked outcomes</li>
          </ul>

          <CalloutCard severity="success" title="Outcome">
            <p>Increased conversion from existing spend without increasing budget.</p>
          </CalloutCard>

          <SimpleTermsCard>
            Every missed call is a potential sale walking away. This system makes sure every single caller gets answered or called back — turning calls you're already paying for into revenue.
          </SimpleTermsCard>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  5. SPEND GOVERNANCE                                       */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="audit-section" id="spend-governance">
          <SectionTitle>5) Spend Governance + Budget Reallocation (Including Google)</SectionTitle>

          <GoalCard title="Goal">
            <p>Stop wasted spend and shift budget into accountable channels.</p>
          </GoalCard>

          <SubSectionTitle>A) Spend Governance (Non-Negotiable Controls)</SubSectionTitle>
          <ul className="list-disc list-outside ml-6 space-y-2 text-sm text-gray-700 mb-6">
            <li>Establish a "spend accountability rule" so budget cannot run without measurable actions</li>
            <li>Weekly performance review by campaign/ad set</li>
            <li>Clear escalation process when spend produces no measurable outcomes</li>
          </ul>

          <SubSectionTitle>B) Google Solutions (High-Intent Demand Capture)</SubSectionTitle>
          <p className="text-sm text-gray-700 mb-3">Once access is confirmed to Google/GA4/GBP:</p>
          <ul className="list-disc list-outside ml-6 space-y-2 text-sm text-gray-700 mb-6">
            <li>Deploy Google Search for high-intent services and problem keywords</li>
            <li>Align landing experiences to one clear conversion path</li>
            <li>Track outcomes to booked/confirmed/sat/sold (not just clicks)</li>
          </ul>

          <SubSectionTitle>C) Budget Reallocation Method</SubSectionTitle>
          <ul className="list-disc list-outside ml-6 space-y-2 text-sm text-gray-700 mb-4">
            <li>Reallocate dead spend into higher intent or proven channels in phases</li>
            <li>Scale only when measurement is stable and show/sold outcomes are consistently captured</li>
          </ul>

          <SimpleTermsCard>
            No more ad dollars running without proof they're working. Every dollar gets tracked to a result, and money that isn't producing gets moved to channels that are.
          </SimpleTermsCard>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  6. FIELD SELF-GEN                                         */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="audit-section" id="field-self-gen">
          <SectionTitle>6) Field Self-Gen Same-Day Engine (Routes by Territory)</SectionTitle>

          <GoalCard title="Goal">
            <p>Increase daily opportunity volume without relying solely on booked appointments — and maximize every minute of downtime between scheduled water tests.</p>
          </GoalCard>

          <p className="text-sm text-gray-700 mb-2 font-semibold">We will deliver:</p>
          <ul className="list-disc list-outside ml-6 space-y-2 text-sm text-gray-700 mb-6">
            <li>Territory-based "Route Packets" for each rep/water tester, customized to their area</li>
            <li>Routes designed for 10–20 new homeowner conversations/day</li>
            <li>A route SOP: how to run the route, how to log outcomes, how to trigger same-day tests</li>
          </ul>

          <SubSectionTitle>AI-Powered Route Optimization</SubSectionTitle>
          <p className="text-sm text-gray-700 mb-3">
            We deploy proprietary AI software that searches and analyzes <strong>all sold properties in each territory</strong> — then maps them into the most effective and time-efficient door-to-door routes automatically.
          </p>

          <CalloutCard severity="info" title="How the AI Routing Works">
            <ul className="list-disc list-outside ml-4 space-y-2 mt-2">
              <li><strong>Data-Driven Targeting:</strong> The software pulls sold-property records, filters by neighborhood, home age, and water-quality indicators to prioritize the highest-opportunity doors.</li>
              <li><strong>Smart Route Mapping:</strong> Routes are generated for maximum efficiency — minimizing drive time and gas while maximizing homeowner conversations per hour.</li>
              <li><strong>Appointment-Aware Scheduling:</strong> Routes automatically <strong>pause and resume</strong> around scheduled water-test appointments. Reps never miss a booked appointment — the route adapts in real time.</li>
              <li><strong>Proximity Matching:</strong> When a rep has a scheduled appointment, the system generates a targeted list of homes <strong>in the same area</strong> so they can knock doors nearby before and after the appointment — staying close, saving gas, and filling every gap in their day.</li>
              <li><strong>Downtime Optimizer:</strong> This is designed as an <strong>addition to their regular routine</strong>, not a replacement. Scheduled appointments and booked water tests always take priority. The AI routes fill the in-between time that would otherwise be unproductive.</li>
            </ul>
          </CalloutCard>

          <SubSectionTitle>Route Pack "Algorithm" (Repeatability)</SubSectionTitle>
          <p className="text-sm text-gray-700 mb-3">We will build and refine the routing algorithm continuously by:</p>
          <ol className="list-decimal list-outside ml-6 space-y-2 text-sm text-gray-700 mb-4">
            <li>Feeding sold-property and territory data into the AI to generate optimized route suggestions</li>
            <li>Testing route filters and neighborhood segments in the field</li>
            <li>Tracking set rate → sit rate → close signals by route type</li>
            <li>Iterating weekly until it becomes a repeatable, AI-assisted playbook deployable across new locations</li>
          </ol>

          <SimpleTermsCard>
            Instead of reps sitting idle between appointments, our AI software builds them a smart route of nearby homes to knock — based on real property data. It pauses when they have a scheduled water test, then picks back up after. When they already have an appointment in an area, it gives them a list of homes nearby so they stay close, save gas, and fill every gap in their day with productive conversations. More doors, less windshield time, more same-day opportunities.
          </SimpleTermsCard>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  7. RECRUITING PLAN                                        */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="audit-section" id="recruiting">
          <SectionTitle>7) Recruiting Plan (1099) — Weekly Interviews + Monthly Hiring Event</SectionTitle>

          <GoalCard title="Goal">
            <p>Build a consistent bench of talent and reduce dependence on a few top performers.</p>
          </GoalCard>

          <p className="text-sm text-gray-700 mb-2 font-semibold">We will implement:</p>
          <ul className="list-disc list-outside ml-6 space-y-2 text-sm text-gray-700 mb-6">
            <li>Weekly interview cadence (always-on recruiting)</li>
            <li>Monthly SSW-hosted hiring event/job fair (high-volume pipeline)</li>
            <li>
              Structured hiring funnel:
              <p className="mt-1 ml-4 text-xs text-gray-500">RSVP → group interview → shadow day → onboarding → first-week ramp targets</p>
            </li>
          </ul>

          <SubSectionTitle icon={<BarChart3 className="w-5 h-5 text-blue-600" />}>KPI Tracking</SubSectionTitle>
          <ul className="list-disc list-outside ml-6 space-y-2 text-sm text-gray-700 mb-4">
            <li>Applicants/week</li>
            <li>Interview show rate</li>
            <li>Ramp-to-first-set</li>
            <li>Retention + production by rep</li>
          </ul>

          <SimpleTermsCard>
            A steady pipeline of new reps means you're never dependent on just a few people. If someone leaves or underperforms, there's always someone ready to step in.
          </SimpleTermsCard>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  8. SOCIAL MEDIA + CONTENT ENGINE                          */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="audit-section" id="content-engine">
          <SectionTitle>8) Social Media + Content Engine (Supports Sales, SEO, Recruiting)</SectionTitle>

          <GoalCard title="Goal">
            <p>Create consistent content that increases trust, lowers ad costs, supports SEO, and fuels recruiting.</p>
          </GoalCard>

          <SubSectionTitle>Content Pillars</SubSectionTitle>
          <ul className="list-disc list-outside ml-6 space-y-2 text-sm text-gray-700 mb-6">
            <li>Water test content ("at-home science experiment")</li>
            <li>Team-in-field content (stores, routes, installs)</li>
            <li>Education + proof-first explanations (non-alarmist)</li>
            <li>Local trust/community content</li>
          </ul>

          <SubSectionTitle>Deliverables</SubSectionTitle>
          <ul className="list-disc list-outside ml-6 space-y-2 text-sm text-gray-700 mb-4">
            <li>Short-form video system (reels/shorts)</li>
            <li>Story cadence for daily proof</li>
            <li>Content library used for marketing + training</li>
          </ul>

          <SimpleTermsCard>
            Consistent content builds trust before a rep ever knocks on a door. It also lowers your ad costs over time because people already recognize and trust the brand.
          </SimpleTermsCard>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  9. MARKETING MATERIALS                                    */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="audit-section" id="marketing-materials">
          <SectionTitle>9) Marketing Materials + Creative Production (Print + Digital)</SectionTitle>

          <GoalCard title="Goal">
            <p>Ensure every channel has consistent, high-quality creative to support conversion and scale.</p>
          </GoalCard>

          <p className="text-sm text-gray-700 mb-2 font-semibold">We will produce and maintain:</p>
          <ul className="list-disc list-outside ml-6 space-y-2 text-sm text-gray-700 mb-4">
            <li>In-store flyers and leave-behinds</li>
            <li>Marketing slicks (before/after + education + offer clarity)</li>
            <li>Route pack collateral (printable and rep-friendly)</li>
            <li>Door hangers where relevant</li>
            <li>Recruiting materials (job fair flyers, onboarding visuals)</li>
            <li>Social templates and ad creative variations</li>
            <li>Store launch kits replicable across locations</li>
          </ul>

          <SimpleTermsCard>
            Professional, consistent materials at every touchpoint — in-store, at the door, and online — so the brand looks the same everywhere and closes more deals.
          </SimpleTermsCard>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  10. WEB DEVELOPMENT + SEO                                 */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="audit-section" id="web-seo">
          <SectionTitle>10) Web Development + SEO (Compounding Growth)</SectionTitle>

          <GoalCard title="Goal">
            <p>Build durable inbound demand and improve conversion efficiency.</p>
          </GoalCard>

          <p className="text-sm text-gray-700 mb-2 font-semibold">We will:</p>
          <ul className="list-disc list-outside ml-6 space-y-2 text-sm text-gray-700 mb-4">
            <li>Improve site structure for conversion and tracking integrity (forms, booking paths, attribution)</li>
            <li>Implement SEO foundations tied to local presence (GBP + location relevance)</li>
            <li>Build a video-forward SEO system aligned with Google/YouTube visibility</li>
            <li>Ensure analytics measurement supports executive reporting</li>
          </ul>

          <SimpleTermsCard>
            Over time, people searching Google for water problems in your area will find you organically — meaning free leads that keep growing month after month without increasing ad spend.
          </SimpleTermsCard>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  11. TRAINING MATERIALS                                    */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="audit-section" id="training-materials">
          <SectionTitle>11) Training Materials + Onboarding Library (Enzy Library Buildout)</SectionTitle>

          <GoalCard title="Goal">
            <p>Reduce process drift and train new hires fast.</p>
          </GoalCard>

          <p className="text-sm text-gray-700 mb-2 font-semibold">We will create:</p>
          <ul className="list-disc list-outside ml-6 space-y-2 text-sm text-gray-700 mb-4">
            <li>Visual onboarding packet with screenshots (Enzy + GHL workflows)</li>
            <li>Push-to-GHL compliance training (mandatory)</li>
            <li>Confirmation workflow training (how it impacts sit rate)</li>
            <li>A structured Enzy training library: how-to videos, best practices, motivational performance content</li>
            <li>Ongoing training capture using field footage</li>
          </ul>

          <SimpleTermsCard>
            New hires get up to speed faster, make fewer mistakes, and start producing revenue sooner. Less hand-holding, more selling.
          </SimpleTermsCard>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  12. STANDARDIZED SOP                                      */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="audit-section" id="sop-system">
          <SectionTitle>12) Standardized SOP + Training System (Locked for Scalability)</SectionTitle>

          <GoalCard title="Objective">
            <p>Eliminate inconsistency and make performance repeatable across locations.</p>
          </GoalCard>

          <p className="text-sm text-gray-700 mb-2 font-semibold">We will deliver a locked SOP + training system including:</p>
          <ul className="list-disc list-outside ml-6 space-y-2 text-sm text-gray-700 mb-4">
            <li><strong>Role-based SOPs</strong> (Setter, Water Tester, Closer, VA, Store Rep, Manager)</li>
            <li><strong>Non-negotiable workflows</strong> (Push to GHL, confirmation, call handling, appointment outcomes, reactivation)</li>
            <li><strong>QC checklists</strong> (data hygiene, tagging, attribution integrity, follow-up completion)</li>
            <li><strong>Certification ramp path</strong> (Day 1–7 minimum standards before operating solo)</li>
            <li><strong>Version control</strong> (what's live, what's updated, what's approved)</li>
          </ul>

          <SimpleTermsCard>
            One proven playbook for every role at every location. When you open a new Home Depot, the system is already built — just plug people in.
          </SimpleTermsCard>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  13. ACCESS + DATA NEEDED                                  */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="audit-section" id="access-needed">
          <SectionTitle>13) Access + Data Needed to Finalize the Airtight Solution (Leadership Action Items)</SectionTitle>

          <p className="text-sm text-gray-700 mb-4">To execute fully and finalize the complete end-to-end attribution story, we need:</p>

          <DataTable
            title="Access Requirements"
            headers={["#", "Platform / System"]}
            rows={[
              ["1", "GBP access (admin add)"],
              ["2", "GA4 access"],
              ["3", "Google Ads access"],
              ["4", "Meta Business Manager access"],
              ["5", "Full GHL admin access (post-agreement)"],
              ["6", "Enzy admin reporting/export access"],
              ["7", "Phone/call routing admin access (if separate)"],
              ["8", "Any other analytics/tracking tools currently in place (including dormant)"],
            ]}
          />

          <p className="text-sm text-gray-700 mb-3">Once these are granted, we will run a deeper forensic review to confirm:</p>
          <ul className="list-disc list-outside ml-6 space-y-2 text-sm text-gray-700 mb-4">
            <li>true cross-platform attribution,</li>
            <li>dormant assets and missed demand capture,</li>
            <li>full funnel conversion rates by channel,</li>
            <li>and final ROI math by platform and campaign.</li>
          </ul>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  14. EXECUTIVE SCORECARD                                   */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="audit-section" id="executive-scorecard">
          <SectionTitle>14) What Leadership Receives Weekly (Executive Scorecard)</SectionTitle>

          <p className="text-sm text-gray-700 mb-4">A single weekly scorecard by source showing:</p>

          <DataTable
            title="Weekly Executive Scorecard"
            subtitle="Delivered every Monday by source"
            headers={["#", "Metric"]}
            rows={[
              ["1", "Spend (by platform)"],
              ["2", "Leads"],
              ["3", "Booked"],
              ["4", "Confirmed"],
              ["5", "Sat (Held)"],
              ["6", "Sold (Closed Won)"],
              ["7", "Revenue"],
              ["8", "Cost per booked / per sat / per sold"],
              ["9", "Missed call rate + recovered outcomes"],
              ["10", "Route pack performance (conversations → same-day sits)"],
            ]}
          />

          <SimpleTermsCard>
            One simple report every week that tells you exactly what happened: how much was spent, how many leads, how many sales, how much revenue. No digging through multiple tools.
          </SimpleTermsCard>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  15. LAUNCH READINESS                                      */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="audit-section" id="launch-readiness">
          <SectionTitle>15) Launch Readiness Statement</SectionTitle>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 audit-no-break">
            <div className="flex items-start gap-3">
              <Rocket className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-800 leading-relaxed">
                Once agreement is finalized and access is confirmed, we are prepared to begin immediately.
                We will start with measurement integrity and leakage elimination (calls, confirmations, outcomes), then scale into paid efficiency, Google/Local capture, route-based self-generation, recruiting events, and SEO-led compounding growth—anchored by a locked SOP/training system that makes results repeatable across locations.
              </p>
            </div>
          </div>

          <SimpleTermsCard>
            We're ready to start the moment you say go.
          </SimpleTermsCard>
        </section>

        {/* ── Footer ── */}
        <footer className="mt-16 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
          <p>Select Source Water — Growth Execution Plan — Confidential</p>
          <p className="mt-1">Prepared for internal leadership review. Not for external distribution.</p>
        </footer>
      </main>
    </>
  );
};

export default GrowthExecutionPlan;
