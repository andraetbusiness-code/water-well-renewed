import { Helmet } from "react-helmet-async";
import { DollarSign, TrendingUp, MapPin, Star, Phone, Shield, Users, Search, BarChart3 } from "lucide-react";
import logo from "@/assets/logo.png";

/* ------------------------------------------------------------------ */
/*  Shared sub-components (same pattern as ExecutiveAudit)              */
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

const GradeBadge = ({ grade }: { grade: string }) => {
  const first = grade.charAt(0);
  const styles: Record<string, string> = {
    A: "bg-green-100 text-green-800 border-green-300",
    B: "bg-blue-100 text-blue-800 border-blue-300",
    C: "bg-yellow-100 text-yellow-800 border-yellow-300",
    D: "bg-red-100 text-red-800 border-red-300",
  };
  return (
    <span className={`inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${styles[first] || styles.C}`}>
      {grade}
    </span>
  );
};

const CalloutCard = ({
  children,
  severity,
  title,
}: {
  children: React.ReactNode;
  severity: "critical" | "high" | "medium" | "info";
  title?: string;
}) => {
  const borderColors: Record<string, string> = {
    critical: "border-l-red-600",
    high: "border-l-amber-500",
    medium: "border-l-yellow-500",
    info: "border-l-blue-500",
  };
  const badgeStyles: Record<string, string> = {
    critical: "bg-red-100 text-red-800 border-red-300",
    high: "bg-amber-100 text-amber-800 border-amber-300",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
    info: "bg-blue-100 text-blue-800 border-blue-300",
  };
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm p-5 mb-4 border-l-4 ${borderColors[severity]} audit-no-break`}>
      {title && (
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-gray-900">{title}</span>
          <span className={`inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${badgeStyles[severity]}`}>
            {severity}
          </span>
        </div>
      )}
      <div className="text-gray-700 text-sm leading-relaxed">{children}</div>
    </div>
  );
};

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

const DataTable = ({
  title,
  subtitle,
  headers,
  rows,
}: {
  title: string;
  subtitle: string;
  headers: string[];
  rows: (string | React.ReactNode)[][];
}) => (
  <div className="mb-8 audit-no-break">
    <h3 className="text-lg font-bold mb-1" style={{ color: "#123B8A" }}>{title}</h3>
    <p className="text-xs text-gray-500 mb-3">{subtitle}</p>
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr style={{ backgroundColor: "#123B8A" }}>
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left text-white font-semibold text-xs uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 text-gray-700 border-t border-gray-100">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Category Section helper                                            */
/* ------------------------------------------------------------------ */

const CategorySection = ({
  number,
  title,
  grade,
  icon: Icon,
  children,
  simpleTerms,
}: {
  number: number;
  title: string;
  grade: string;
  icon: React.ElementType;
  children: React.ReactNode;
  simpleTerms: string;
}) => (
  <section className="audit-section">
    <div className="flex items-center gap-3 mt-12 mb-4">
      <Icon className="w-6 h-6 flex-shrink-0" style={{ color: "#1E6FD9" }} />
      <h2 className="text-xl font-bold tracking-tight" style={{ color: "#123B8A" }}>
        {number}) {title}
      </h2>
      <GradeBadge grade={grade} />
    </div>
    <div className="text-sm text-gray-700 leading-relaxed space-y-3 ml-9">
      {children}
    </div>
    <div className="ml-9">
      <SimpleTermsCard>{simpleTerms}</SimpleTermsCard>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

const GBPAudit = () => {
  return (
    <>
      <Helmet>
        <title>Google Business Profile Executive Audit | Select Source Water</title>
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
            Google Business Profile Executive Audit
          </span>
        </div>
      </header>

      {/* ── Report Body ── */}
      <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto bg-white min-h-screen audit-body">

        {/* ═══════════════ COVER BLOCK ═══════════════ */}
        <section className="text-center py-16 mb-8 border-b-2 border-gray-200 audit-section">
          <img src={logo} alt="Select Source Water" className="mx-auto mb-8 w-48 sm:w-64" />
          <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#123B8A" }}>
            Google Business Profile Executive Audit
          </h1>
          <p className="text-gray-500 text-lg mb-2">Prepared: February 11, 2026</p>
          <p className="text-gray-500 text-sm mb-6">
            Primary market focus: Sacramento + surrounding areas (Home Depot in-store presence)
          </p>
          <span
            className="inline-block px-4 py-1.5 rounded text-xs font-bold uppercase tracking-widest border-2"
            style={{ color: "#B91C1C", borderColor: "#B91C1C", backgroundColor: "#FEF2F2" }}
          >
            Confidential
          </span>

          <div className="max-w-2xl mx-auto mt-6 p-4 rounded-lg border border-gray-300 bg-gray-50 text-left">
            <p className="text-xs text-gray-600 leading-relaxed">
              <span className="font-bold uppercase">Intellectual Property Notice:</span>{" "}
              All strategies, systems, and methodologies contained within this document are the
              proprietary intellectual property of Andrae Thames and Thames Legacy LLC DBA Right
              Way Systems. This document is provided for evaluation purposes only. Unauthorized
              copying, distribution, or implementation of any strategies described herein is
              strictly prohibited. Receipt of this document does not constitute a license to use,
              reproduce, or implement any of the strategies, processes, or systems described.
            </p>
          </div>
        </section>

        {/* ═══════════════ EXECUTIVE SUMMARY ═══════════════ */}
        <section className="audit-section">
          <SectionTitle id="executive-summary">Executive Summary</SectionTitle>

          <CalloutCard severity="critical" title="Structural visibility issue">
            <p>
              Select Source Water has real market presence and strong reputation signals, but the Google Business Profile is not structured in a way that allows Google to confidently rank the company across Sacramento local searches.
            </p>
          </CalloutCard>

          <CalloutCard severity="high" title="Meta dependency">
            <p>
              That gap forces heavier dependence on Meta leads ($75/lead) even though high-intent organic demand exists daily in-market.
            </p>
          </CalloutCard>

          <CalloutCard severity="high" title="Ranking gap">
            <p>
              This is a structural visibility issue — and it affects revenue growth, store traffic, paid efficiency, and hiring leverage.
            </p>
          </CalloutCard>

          <SimpleTermsCard>
            Your Google listing exists, but it's not built to win in Sacramento searches. That means you're paying for leads you could be getting for free — and competitors are showing up where you should be.
          </SimpleTermsCard>
        </section>

        {/* ═══════════════ SCORECARD ═══════════════ */}
        <section className="audit-section">
          <SectionTitle id="scorecard">Scorecard</SectionTitle>
          <DataTable
            title="Google Business Profile Scorecard"
            subtitle="Overall assessment across 8 categories"
            headers={["Category", "Grade"]}
            rows={[
              ["Profile Completeness", <GradeBadge grade="B-" />],
              ["Sacramento Market Alignment", <GradeBadge grade="D" />],
              ["Local Ranking Readiness", <GradeBadge grade="D+" />],
              ["Engagement & Freshness", <GradeBadge grade="D" />],
              ["Reviews & Reputation", <GradeBadge grade="A-" />],
              ["Conversion Readiness (Calls / Store Visits)", <GradeBadge grade="C-" />],
              ["Risk / Compliance Posture", <GradeBadge grade="C" />],
              ["Hiring & Recruiting Leverage", <GradeBadge grade="C-" />],
              [<strong>Overall</strong>, <GradeBadge grade="C" />],
            ]}
          />
        </section>

        {/* ═══════════════ 8 CATEGORY SECTIONS ═══════════════ */}

        <CategorySection
          number={1}
          title="Profile Completeness"
          grade="B-"
          icon={BarChart3}
          simpleTerms="The basics are there, but Google needs more structured detail to fully understand and rank this business. Missing fields = missed ranking signals."
        >
          <p><strong>Why it's not an A:</strong> The essentials exist, but key sections that help Google "understand and index" the business are underutilized.</p>
          <p><strong>Impact:</strong> Google has fewer structured signals to confidently match the profile to high-intent searches (service + city).</p>
        </CategorySection>

        <CategorySection
          number={2}
          title="Sacramento Market Alignment"
          grade="D"
          icon={MapPin}
          simpleTerms="Google doesn't clearly see Sacramento as your home market. Until it does, you'll keep losing local searches to competitors who have stronger location signals."
        >
          <p>The profile's geographic foundation does not clearly reflect Sacramento as the primary operating market.</p>
          <p><strong>Why this matters:</strong> In local search, Google heavily favors listings that appear structurally aligned with the searcher's location. When the profile's core location signals and market focus don't match, visibility is suppressed.</p>
          <p><strong>Impact:</strong> This is one of the biggest reasons the business isn't ranking consistently for Sacramento-area searches.</p>
        </CategorySection>

        <CategorySection
          number={3}
          title="Local Ranking Readiness"
          grade="D+"
          icon={Search}
          simpleTerms="You're not showing up in the map pack for Sacramento water searches. That's where the highest-intent customers look first — and right now, competitors are capturing that demand."
        >
          <p>Right now, the profile is not positioned to dominate "near me" and city-based searches in the Sacramento metro.</p>
          <p><strong>Impact:</strong></p>
          <ul className="list-disc list-outside ml-6 space-y-1">
            <li>Less map pack presence</li>
            <li>Fewer inbound calls</li>
            <li>Less direction/store-intent traffic</li>
            <li>Competitors capture demand that should belong to SSW</li>
          </ul>
        </CategorySection>

        <CategorySection
          number={4}
          title="Engagement & Freshness"
          grade="D"
          icon={TrendingUp}
          simpleTerms="Google sees an inactive listing and pushes it down. Regular activity signals — posts, photos, Q&A — are easy wins that tell Google this is a live, relevant business."
        >
          <p>Signals that indicate an active, current, locally engaged business are not being leveraged consistently.</p>
          <p><strong>Impact:</strong> In competitive markets, inactive profiles tend to underperform even with strong reviews.</p>
        </CategorySection>

        <CategorySection
          number={5}
          title="Reviews & Reputation"
          grade="A-"
          icon={Star}
          simpleTerms="450+ reviews and a 4.7 rating is a real asset. With some focused effort on review momentum and local keyword signals, this becomes the engine that powers higher rankings."
        >
          <p><strong>This is the strongest asset.</strong></p>
          <p><strong>What's strong:</strong></p>
          <ul className="list-disc list-outside ml-6 space-y-1">
            <li>450+ reviews</li>
            <li>4.7 rating</li>
          </ul>
          <p><strong>Why it's not A+:</strong> Review momentum and local relevance signals can be improved.</p>
          <p><strong>Impact:</strong> A strong base exists, but it's not being fully converted into Sacramento ranking dominance.</p>
        </CategorySection>

        <CategorySection
          number={6}
          title="Conversion Readiness (Calls / Store Visits)"
          grade="C-"
          icon={Phone}
          simpleTerms="Even when people find you on Google, the path to calling or visiting a store isn't as clear as it should be. Small conversion tweaks can turn existing visibility into more revenue."
        >
          <p>The profile currently drives activity, but it isn't optimized around your two primary conversion outcomes:</p>
          <ul className="list-disc list-outside ml-6 space-y-1">
            <li>Calls</li>
            <li>Driving customers to Home Depot store reps</li>
          </ul>
          <p><strong>Impact:</strong> Even when visibility happens, the path to action isn't as strong as it could be.</p>
        </CategorySection>

        <CategorySection
          number={7}
          title="Risk / Compliance Posture"
          grade="C"
          icon={Shield}
          simpleTerms="There's upside available in how the listing handles location and address data, but changes need to be made carefully to avoid triggering a Google suspension."
        >
          <p>There are known risk areas in local SEO, especially involving addresses and location representation.</p>
          <p><strong>Context note (client-safe):</strong> Any future changes must be done carefully to avoid triggering listing suppression or suspension.</p>
          <p><strong>Impact:</strong> There is upside available, but it must be approached with precision.</p>
        </CategorySection>

        <CategorySection
          number={8}
          title="Hiring & Recruiting Leverage"
          grade="C-"
          icon={Users}
          simpleTerms="When potential hires Google your company and don't see Sacramento dominance, it's harder to recruit top talent. Strong local presence makes the company look like a winning team to join."
        >
          <p><strong>This is the hidden second-order problem.</strong></p>
          <p>When high-quality reps or managers evaluate a company, they look for proof of market strength:</p>
          <ul className="list-disc list-outside ml-6 space-y-1">
            <li>Do you show up everywhere locally?</li>
            <li>Do you look active and dominant?</li>
            <li>Does the brand presence match what you're claiming operationally?</li>
          </ul>
          <p>Right now, the online footprint does not reflect Sacramento dominance — even though the company has real in-store presence.</p>
          <p><strong>Impact on hiring:</strong></p>
          <ul className="list-disc list-outside ml-6 space-y-1">
            <li>Harder to attract stronger reps</li>
            <li>Harder to retain reps if inbound demand feels inconsistent</li>
            <li>Less leverage to scale because hiring doesn't "feel like a winning machine"</li>
          </ul>
          <p>When local visibility improves, recruiting gets easier because the company appears stronger, more in demand, and more established in the target market.</p>
        </CategorySection>

        {/* ═══════════════ WHY YOU'RE NOT RANKING ═══════════════ */}
        <section className="audit-section">
          <SectionTitle id="ranking">Why You're Not Ranking in Sacramento Local Searches</SectionTitle>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Google local rankings are primarily determined by:
          </p>
          <ul className="list-disc list-outside ml-6 space-y-2 text-sm text-gray-700 mb-4">
            <li><strong>Relevance</strong> — do you match the search intent?</li>
            <li><strong>Proximity</strong> — are you clearly local to the searcher?</li>
            <li><strong>Prominence</strong> — do you look trusted and active?</li>
          </ul>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Right now, Sacramento searches are being lost because the profile is not sending strong enough Sacramento-focused proximity and relevance signals, and engagement signals are not reinforcing authority consistently.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed font-semibold">
            That's why competitors appear above you in the map pack.
          </p>

          <SimpleTermsCard>
            Google ranks local businesses based on three things: how relevant you are, how close you are, and how trustworthy you look. Right now, your profile isn't sending strong enough signals in any of these areas for Sacramento.
          </SimpleTermsCard>
        </section>

        {/* ═══════════════ BUSINESS IMPACT ESTIMATE ═══════════════ */}
        <section className="audit-section">
          <SectionTitle id="impact">Business Impact Estimate (No Hype — Conservative)</SectionTitle>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Current paid acquisition: Meta leads at <strong>$75/lead</strong><br />
            Average deal size: <strong>$7,990</strong>
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mb-6">
            If structural visibility improvements drive even a modest lift in organic demand:
          </p>

          <DataTable
            title="Conservative Revenue Projection"
            subtitle="Based on modest organic visibility improvement"
            headers={["Metric", "Value"]}
            rows={[
              ["Additional high-intent calls/month", "+40"],
              ["Convert to appointments", "25%"],
              ["Close rate", "20%"],
              ["Estimated installs/month", "~8"],
              ["Revenue per install", "$7,990"],
              [<strong>Monthly incremental revenue</strong>, <strong>$63,920</strong>],
              [<strong>Annualized</strong>, <strong>~$767,040</strong>],
            ]}
          />

          <SimpleTermsCard>
            Even conservative improvements to your Google presence could drive an additional $63,920/month in revenue — nearly $767K per year — while reducing your dependence on $75 paid leads.
          </SimpleTermsCard>
        </section>

        {/* ═══════════════ WHAT THIS MEANS OPERATIONALLY ═══════════════ */}
        <section className="audit-section">
          <SectionTitle id="operational">What This Means Operationally</SectionTitle>
          <p className="text-sm text-gray-700 mb-4">When organic visibility rises:</p>
          <ul className="list-disc list-outside ml-6 space-y-2 text-sm text-gray-700">
            <li>Call volume rises</li>
            <li>Store traffic improves</li>
            <li>Paid lead dependency decreases</li>
            <li>Revenue becomes more consistent</li>
            <li>Hiring improves (stronger candidates + better retention)</li>
          </ul>
          <p className="text-sm text-gray-700 mt-4 font-semibold">
            This is not just marketing. This is a growth-and-scale lever.
          </p>

          <SimpleTermsCard>
            Fixing the Google profile doesn't just get you more leads — it makes every part of the business easier: more calls, more store traffic, less ad spend, and easier hiring.
          </SimpleTermsCard>
        </section>

        {/* ═══════════════ NEXT STEP ═══════════════ */}
        <section className="audit-section">
          <SectionTitle id="next-step">Next Step (High-Level Only)</SectionTitle>
          <p className="text-sm text-gray-700 mb-4">We recommend a controlled improvement plan that focuses on:</p>
          <ul className="list-disc list-outside ml-6 space-y-2 text-sm text-gray-700">
            <li>Sacramento authority alignment</li>
            <li>Profile structure upgrades</li>
            <li>Conversion path strengthening (calls + store visits)</li>
            <li>Consistent activity signals</li>
            <li>Recruiting support through brand presence + proof of demand</li>
          </ul>
          <p className="text-sm text-gray-700 mt-4 font-semibold">
            No major rebrand required. This is a structural correction with measurable upside.
          </p>
        </section>

        {/* ═══════════════ FOOTER ═══════════════ */}
        <footer className="mt-16 pt-8 border-t-2 border-gray-200 text-center text-xs text-gray-400 pb-8">
          <p>
            This document is the proprietary property of Andrae Thames and Thames Legacy LLC DBA Right Way Systems.
            Unauthorized distribution or implementation is prohibited.
          </p>
          <p className="mt-2">© 2026 Right Way Systems. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
};

export default GBPAudit;
