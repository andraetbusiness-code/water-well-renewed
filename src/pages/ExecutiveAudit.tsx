import { Helmet } from "react-helmet-async";
import { Download, AlertTriangle, AlertCircle, Info, Shield } from "lucide-react";
import logo from "@/assets/logo.png";
import metaAdsSpend from "@/assets/audit/meta-ads-spend.png";
import highConfidence from "@/assets/audit/high-confidence.png";
import mediumLowConfidence from "@/assets/audit/medium-low-confidence.png";
import bookedConfirmedDef from "@/assets/audit/booked-confirmed-definition.png";
import closedSoldDef from "@/assets/audit/closed-sold-definition.png";

/* ------------------------------------------------------------------ */
/*  Shared sub-components                                              */
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

const SeverityBadge = ({ level }: { level: "critical" | "high" | "medium" | "low" | "info" }) => {
  const styles: Record<string, string> = {
    critical: "bg-red-100 text-red-800 border-red-300",
    high: "bg-amber-100 text-amber-800 border-amber-300",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
    low: "bg-red-50 text-red-700 border-red-200",
    info: "bg-blue-100 text-blue-800 border-blue-300",
  };
  return (
    <span className={`inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${styles[level]}`}>
      {level}
    </span>
  );
};

const CalloutCard = ({
  children,
  severity,
  title,
}: {
  children: React.ReactNode;
  severity: "critical" | "high" | "medium" | "low" | "info";
  title?: string;
}) => {
  const borderColors: Record<string, string> = {
    critical: "border-l-red-600",
    high: "border-l-amber-500",
    medium: "border-l-yellow-500",
    low: "border-l-red-300",
    info: "border-l-blue-500",
  };
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm p-5 mb-4 border-l-4 ${borderColors[severity]} audit-no-break`}>
      {title && (
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-gray-900">{title}</span>
          <SeverityBadge level={severity} />
        </div>
      )}
      <div className="text-gray-700 text-sm leading-relaxed">{children}</div>
    </div>
  );
};

const Figure = ({ src, alt, caption, number }: { src: string; alt: string; caption: string; number: number }) => (
  <figure className="my-6 border border-gray-200 rounded-lg overflow-hidden shadow-sm audit-no-break">
    <img src={src} alt={alt} className="w-full h-auto" loading="lazy" />
    <figcaption className="bg-gray-50 px-4 py-3 text-xs text-gray-600 italic">
      <span className="font-semibold not-italic">Figure {number}:</span> {caption}
    </figcaption>
  </figure>
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
    <h3 className="text-lg font-bold mb-1" style={{ color: "#123B8A" }}>
      {title}
    </h3>
    <p className="text-xs text-gray-500 mb-3">{subtitle}</p>
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

const ConfidenceBadge = ({ level }: { level: "High" | "Medium" | "Low" }) => {
  const styles = {
    High: "bg-green-100 text-green-800 border-green-300",
    Medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Low: "bg-red-100 text-red-800 border-red-300",
  };
  return (
    <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded border ${styles[level]}`}>
      {level}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

const ExecutiveAudit = () => {
  let figureCount = 0;
  const nextFigure = () => ++figureCount;

  return (
    <>
      <Helmet>
        <title>Executive Marketing & Tracking Audit | Select Source Water</title>
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
            Executive Marketing &amp; Tracking Audit
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
        {/*  1. COVER BLOCK                                            */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="text-center py-16 mb-8 border-b-2 border-gray-200 audit-section">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">Select Source Water</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#123B8A" }}>
            Executive Marketing &amp; Tracking Audit
          </h1>
          <p className="text-gray-500 text-lg mb-6">Date Range: Jan 7 – Feb 7, 2026</p>
          <span
            className="inline-block px-4 py-1.5 rounded text-xs font-bold uppercase tracking-widest border-2"
            style={{ color: "#B91C1C", borderColor: "#B91C1C", backgroundColor: "#FEF2F2" }}
          >
            Confidential
          </span>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  2. EXECUTIVE SUMMARY                                      */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="audit-section">
          <SectionTitle id="executive-summary">Executive Summary</SectionTitle>

          <CalloutCard severity="critical" title="Volume vs. visibility">
            <p>
              GoHighLevel (GHL) recorded 319 appointments booked and 181 confirmed in the Jan 7–Feb 7 window. Enzi shows 266 marketing leads, of which 48 were marked "Sold," yet GHL's attribution report still lists $0 closed revenue. This disconnect obscures ROI by channel.
            </p>
          </CalloutCard>

          <CalloutCard severity="critical" title="Paid‑social spend vs. results">
            <p>
              Between Jan 23 and Feb 7, Meta campaigns spent $14,527.72 and generated 193 leads. Cost per lead ≈ $75.27. However, the largest campaign ("Cold Targeting – Website") spent $8,089.64 with zero leads or sales, indicating wasted budget.
            </p>
          </CalloutCard>

          <CalloutCard severity="high" title="Pipeline leakage">
            <p>
              In Enzi, only 6 marketing leads reached "Appointment Scheduled"; meanwhile 77 were cancelled, 28 became "No Sale/SAT," and 21 were "Not Qualified." About 40% of marketing leads are lost before sitting.
            </p>
          </CalloutCard>

          <CalloutCard severity="high" title="Operational gaps">
            <p>
              Call reporting shows 63% of incoming calls were missed, and GHL does not record whether appointments were held or missed, making sit‑rate verification impossible.
            </p>
          </CalloutCard>

          <CalloutCard severity="info" title="Why it matters">
            <p>
              Without accurate attribution and visibility into "sits" and "closes," leadership cannot verify current spend levels or confidently optimize future investment with the information available. High spend on non‑performing campaigns and poor lead handling suggest immediate governance is needed.
            </p>
          </CalloutCard>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  3. RECOMMENDED DECISIONS                                  */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="audit-section">
          <SectionTitle id="recommended-decisions">Recommended Decisions</SectionTitle>
          <ol className="list-decimal list-outside ml-6 space-y-4 text-gray-700 text-sm leading-relaxed">
            <li>
              <strong>Authorize a unified diagnostic</strong> – assign Andrae / Growth Ops to reconcile tracking across GHL, Enzi, and ad platforms.
            </li>
            <li>
              <strong>Implement spend controls</strong> – temporarily cap or pause underperforming campaigns until tracking integrity is restored.
            </li>
            <li>
              <strong>Define the "closed sale" system of record</strong> – decide whether GHL or Enzi will be the authoritative source for closed deals and align processes accordingly.
            </li>
            <li>
              <strong>Assign ongoing executive oversight</strong> – empower Growth Ops to deliver weekly reports (spend → lead → booked → confirmed → held → closed) so leadership can make data‑driven budget decisions.
            </li>
          </ol>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  4. SCOPE & DATA SOURCES                                   */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="audit-section">
          <SectionTitle id="scope">Scope &amp; Data Sources</SectionTitle>

          <h3 className="text-base font-bold text-gray-900 mb-2">Systems audited</h3>
          <ul className="list-disc list-outside ml-6 space-y-2 text-sm text-gray-700 mb-6">
            <li>
              <strong>GoHighLevel (GHL):</strong> Appointment and attribution reports, pipeline views, in‑platform Meta Ads report.
            </li>
            <li>
              <strong>Enzi:</strong> Marketing‑team lead statuses and outcomes.
            </li>
            <li>
              <strong>Call Reports:</strong> Inbound call stats within GHL.
            </li>
          </ul>

          <h3 className="text-base font-bold text-gray-900 mb-2">Date ranges</h3>
          <ul className="list-disc list-outside ml-6 space-y-2 text-sm text-gray-700 mb-6">
            <li>
              <strong>Primary pipeline view:</strong> Jan 7 – Feb 7, 2026.
            </li>
            <li>
              <strong>Paid‑social spend window:</strong> Jan 23 – Feb 7, 2026 (ads report did not expose data before Jan 23).
            </li>
          </ul>

          <h3 className="text-base font-bold text-gray-900 mb-2">What was accessible</h3>
          <p className="text-sm text-gray-700 mb-6">
            Appointment counts, Meta ad spend &amp; leads, campaign‑level metrics, Enzi lead statuses.
          </p>

          <h3 className="text-base font-bold text-gray-900 mb-2">What wasn't</h3>
          <p className="text-sm text-gray-700">
            Show/no‑show data (GHL logs zero shows), revenue by campaign, date‑aligned Enzi lead counts (assumed to match audit window).
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  5. KEY FINDINGS & EVIDENCE                                */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="audit-section">
          <SectionTitle id="findings">Key Findings &amp; Evidence</SectionTitle>

          {/* Finding 1 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <h3 className="text-lg font-bold text-gray-900">1. Tracking &amp; Attribution Gaps</h3>
              <SeverityBadge level="critical" />
            </div>
            <div className="ml-8">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Observation:</strong> GHL's attribution shows $0 revenue closed, while Enzi logs 48 marketing leads as "Sold."
              </p>
              <p className="text-sm text-gray-700 mb-4">
                <strong>Impact:</strong> Executive reporting cannot calculate cost per sale or channel ROI, undermining budgeting decisions.
              </p>
            </div>
          </div>

          {/* Finding 2 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <h3 className="text-lg font-bold text-gray-900">2. Spend Inefficiencies</h3>
              <SeverityBadge level="critical" />
            </div>
            <div className="ml-8">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Observation:</strong> The "Cold Targeting – Website" campaign spent $8,089.64 and produced no leads or revenue.
              </p>
              <p className="text-sm text-gray-700 mb-4">
                <strong>Impact:</strong> Direct waste; this spend alone accounts for over half the visible paid‑social budget in the window.
              </p>
              <Figure
                src={metaAdsSpend}
                alt="Facebook Ads report showing campaign-level spend with the Cold Targeting campaign highlighted"
                caption="Meta Ads report — campaign-level spend for Jan 23 – Feb 7, 2026. The 'Cold Targeting – Website' campaign shows $8,089.64 spent with zero leads generated."
                number={nextFigure()}
              />
            </div>
          </div>

          {/* Finding 3 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <h3 className="text-lg font-bold text-gray-900">3. Conversion &amp; Pipeline Leakage</h3>
              <SeverityBadge level="high" />
            </div>
            <div className="ml-8">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Observation:</strong> Of 266 marketing leads (Enzi), only 6 became "Appointment Scheduled"; 77 were cancelled, 28 "No Sale/SAT," and 21 "Not Qualified."
              </p>
              <p className="text-sm text-gray-700 mb-4">
                <strong>Impact:</strong> Roughly 40% of marketing leads drop off before a sit. Even after booking, sit rates cannot be calculated because GHL does not track "show vs. no‑show."
              </p>
            </div>
          </div>

          {/* Finding 4 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <h3 className="text-lg font-bold text-gray-900">4. Operational Follow‑Up Gaps</h3>
              <SeverityBadge level="high" />
            </div>
            <div className="ml-8">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Observation:</strong> Call report for Feb 1–7 shows 63% of incoming calls missed and no automated follow‑up outcome data.
              </p>
              <p className="text-sm text-gray-700">
                <strong>Impact:</strong> Missed calls mean lost appointments and wasted marketing spend.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  6. PERFORMANCE TABLES                                     */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="audit-section">
          <SectionTitle id="performance-tables">Performance Tables</SectionTitle>

          <DataTable
            title="A. Appointments (GHL)"
            subtitle="Jan 7 – Feb 7, 2026"
            headers={["Metric", "Count"]}
            rows={[
              ["Booked appointments", "319"],
              ["Confirmed appointments", "181"],
              ["Cancelled appointments", "95"],
              ["Show / No‑show", <span className="italic text-gray-500">Not captured (0 in GHL)</span>],
            ]}
          />

          <DataTable
            title="B. Paid‑Social Performance (Meta Ads in GHL)"
            subtitle="Jan 23 – Feb 7, 2026"
            headers={["Metric", "Value"]}
            rows={[
              ["Spend", "$14,527.72"],
              ["Leads", "193"],
              ["Cost per lead (CPL)", "$75.27"],
              [
                "Highest-risk campaign spend",
                <span>
                  $8,089.64{" "}
                  <span className="text-xs text-gray-500">(Cold Targeting – Website)</span>
                </span>,
              ],
            ]}
          />

          <DataTable
            title="C. Marketing Lead Outcomes (Enzi)"
            subtitle="Assumed Jan 7 – Feb 7, 2026"
            headers={["Status", "Count"]}
            rows={[
              [<span className="font-semibold">Total marketing leads</span>, <span className="font-semibold">266</span>],
              ["Sold", "48"],
              ["No Sale / SAT", "28"],
              ["Cancelled", "77"],
              ["Not Qualified", "21"],
              ["Reschedule", "17"],
              ["Appointment Scheduled", "6"],
            ]}
          />
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  7. HIGHEST-RISK WASTE INDICATORS                          */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="audit-section">
          <SectionTitle id="waste-indicators">Highest‑Risk Waste Indicators</SectionTitle>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-800">
                <strong>"Cold Targeting – Website" campaign:</strong> &gt;$8k spent, 0 leads.
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-800">
                <strong>Untracked closes:</strong> 48 marketing deals recorded as sold in Enzi but $0 closed revenue in GHL.
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-800">
                <strong>Missing appointment outcomes:</strong> GHL logs 0 shows/no‑shows, preventing cost‑per‑sit analysis.
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-800">
                <strong>High cancelled/no‑sale rates:</strong> Nearly 40% of marketing leads are cancelled or end in no‑sale, signalling poor lead quality, follow‑up, or qualification.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  8. CONFIDENCE & GAPS                                      */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="audit-section">
          <SectionTitle id="confidence">Confidence &amp; Gaps</SectionTitle>

          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mb-6 audit-no-break">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "#123B8A" }}>
                  <th className="px-4 py-3 text-left text-white font-semibold text-xs uppercase tracking-wider">Conclusion</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-xs uppercase tracking-wider">Confidence</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-xs uppercase tracking-wider">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="px-4 py-3 text-gray-700 border-t border-gray-100">Booked/confirmed/cancelled counts (GHL)</td>
                  <td className="px-4 py-3 border-t border-gray-100"><ConfidenceBadge level="High" /></td>
                  <td className="px-4 py-3 text-gray-600 border-t border-gray-100 text-xs">Directly observed in report.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-gray-700 border-t border-gray-100">Paid‑social spend &amp; zero‑lead campaign</td>
                  <td className="px-4 py-3 border-t border-gray-100"><ConfidenceBadge level="High" /></td>
                  <td className="px-4 py-3 text-gray-600 border-t border-gray-100 text-xs">Directly observed.</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 text-gray-700 border-t border-gray-100">Enzi marketing "Sold" count</td>
                  <td className="px-4 py-3 border-t border-gray-100"><ConfidenceBadge level="High" /></td>
                  <td className="px-4 py-3 text-gray-600 border-t border-gray-100 text-xs">Directly observed.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-gray-700 border-t border-gray-100">Date alignment of Enzi counts</td>
                  <td className="px-4 py-3 border-t border-gray-100"><ConfidenceBadge level="Medium" /></td>
                  <td className="px-4 py-3 text-gray-600 border-t border-gray-100 text-xs">Status view not date‑filtered; assumed to match Jan 7–Feb 7.</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 text-gray-700 border-t border-gray-100">Cost per sit/close &amp; ROI</td>
                  <td className="px-4 py-3 border-t border-gray-100"><ConfidenceBadge level="Low" /></td>
                  <td className="px-4 py-3 text-gray-600 border-t border-gray-100 text-xs">Revenue per sale unknown; shows/no‑shows and closed won not captured in GHL.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Figure
              src={highConfidence}
              alt="High-confidence conclusions from the audit data"
              caption="High-confidence data points — directly observed in GHL and Enzi reporting dashboards."
              number={nextFigure()}
            />
            <Figure
              src={mediumLowConfidence}
              alt="Medium and low confidence items requiring further verification"
              caption="Medium/low confidence items — require additional data access or date‑filtered views to confirm."
              number={nextFigure()}
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  9. LEADERSHIP DECISIONS REQUIRED                          */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="audit-section">
          <SectionTitle id="leadership-decisions">Leadership Decisions Required</SectionTitle>
          <ol className="list-decimal list-outside ml-6 space-y-5 text-sm text-gray-700 leading-relaxed">
            <li>
              <strong>Authorize a unified diagnostic (owner‑led).</strong> Let Andrae / Growth Ops reconcile GHL, Enzi, and advertising data so leadership has one accurate scoreboard.
            </li>
            <li>
              <strong>Implement spend governance.</strong> Temporarily cap or pause campaigns—especially the "Cold Targeting – Website" segment—until tracking integrity is confirmed.
            </li>
            <li>
              <strong>Define the "closed sale" system of record.</strong> Decide whether Enzi or GHL will be the authoritative source for recorded sales, then align data flows to that decision.
            </li>
            <li>
              <strong>Assign ongoing executive oversight.</strong> Entrust Andrae / Growth Ops with weekly performance reporting (spend → lead → booked → confirmed → held → closed) so budget decisions are based on verified numbers.
            </li>
          </ol>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  10. APPENDIX                                              */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="audit-section">
          <SectionTitle id="appendix">Appendix</SectionTitle>

          <h3 className="text-base font-bold text-gray-900 mb-4">Definitions</h3>

          <div className="space-y-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-start p-4 bg-gray-50 rounded-lg border border-gray-200 audit-no-break">
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-1">Booked appointment</p>
                <p className="text-sm text-gray-700">A meeting scheduled in the system.</p>
                <p className="font-semibold text-gray-900 mb-1 mt-3">Confirmed appointment</p>
                <p className="text-sm text-gray-700">A booked appointment where the customer responds "YES" to confirm.</p>
              </div>
              <img
                src={bookedConfirmedDef}
                alt="Booked and Confirmed appointment definitions from GHL"
                className="w-full md:w-48 h-auto rounded border border-gray-200"
                loading="lazy"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start p-4 bg-gray-50 rounded-lg border border-gray-200 audit-no-break">
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-1">Appointment held ("sit")</p>
                <p className="text-sm text-gray-700">
                  The appointment actually occurs; this data is missing from GHL (shows recorded as 0).
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start p-4 bg-gray-50 rounded-lg border border-gray-200 audit-no-break">
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-1">Closed / Sold</p>
                <p className="text-sm text-gray-700">
                  A completed sale. Present in Enzi but absent in GHL's attribution.
                </p>
              </div>
              <img
                src={closedSoldDef}
                alt="Closed/Sold definition visualization"
                className="w-full md:w-48 h-auto rounded border border-gray-200"
                loading="lazy"
              />
            </div>
          </div>

          <h3 className="text-base font-bold text-gray-900 mb-3">Assumptions &amp; Calculation Notes</h3>
          <ul className="list-disc list-outside ml-6 space-y-2 text-sm text-gray-700">
            <li>
              Cost per lead = total Meta spend ÷ leads (14,527.72 ÷ 193).
            </li>
            <li>
              ROI cannot be calculated without closed‑won revenue and average sale value.
            </li>
            <li>
              Enzi status counts are assumed to correspond to the same Jan 7–Feb 7 window.
            </li>
          </ul>
        </section>

        {/* ── Footer ── */}
        <footer className="mt-16 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
          <p>Select Source Water — Executive Marketing &amp; Tracking Audit — Confidential</p>
          <p className="mt-1">Prepared for internal leadership review. Not for external distribution.</p>
        </footer>
      </main>
    </>
  );
};

export default ExecutiveAudit;
