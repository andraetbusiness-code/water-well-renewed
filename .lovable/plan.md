

## Google Business Profile Executive Audit

Create a new executive audit report for Google Business Profile (GBP) at `/gbp-audit`, following the exact same "Modern Blue" report format used by the existing GHL audit (`/audit`).

### What Gets Built

A single new page (`src/pages/GBPAudit.tsx`) containing the full GBP audit content provided, structured with the same shared sub-components used in the GHL audit:

**Reused Components (copied inline, same pattern as existing reports):**
- `SectionTitle` -- blue heading with border
- `SeverityBadge` -- colored grade/severity labels (repurposed for letter grades)
- `CalloutCard` -- left-border callout cards for key observations
- `SimpleTermsCard` -- green "In Simple Terms" cards at the end of each section
- `DataTable` -- blue-header tables (used for the Scorecard)

**Report Sections (matching the provided content):**

1. **Cover Block** -- Logo, title ("Google Business Profile Executive Audit"), date (Feb 11, 2026), market focus line, Confidential badge, IP notice
2. **Executive Summary** -- 3 callout cards (structural visibility issue, Meta dependency, ranking gap) + SimpleTermsCard
3. **Scorecard** -- DataTable with all 8 categories and letter grades (Profile Completeness B-, Sacramento Market Alignment D, etc., Overall C)
4. **8 Category Sections** (each with heading, observation text, impact statement, and a SimpleTermsCard):
   - Profile Completeness (B-)
   - Sacramento Market Alignment (D)
   - Local Ranking Readiness (D+)
   - Engagement & Freshness (D)
   - Reviews & Reputation (A-)
   - Conversion Readiness (C-)
   - Risk / Compliance Posture (C)
   - Hiring & Recruiting Leverage (C-)
5. **Why You're Not Ranking** -- explanation of Relevance / Proximity / Prominence factors
6. **Business Impact Estimate** -- conservative revenue projection table ($63,920/mo, ~$767K annualized)
7. **What This Means Operationally** -- bullet list of operational improvements
8. **Next Step** -- high-level recommendation bullets
9. **Footer** -- standard confidential footer line

**Routing:**
- Add `/gbp-audit` route in `App.tsx` (same pattern as `/audit` and `/growth-plan`)
- Page is noindex/nofollow (private report)
- Uses existing `audit-print.css` for PDF export optimization

### Technical Details

- **New file:** `src/pages/GBPAudit.tsx` (~400-500 lines, single-file report matching existing pattern)
- **Modified file:** `src/App.tsx` -- add import + route for `/gbp-audit`
- **No new dependencies** -- uses only existing imports (react-helmet-async, lucide-react, logo asset)
- **No new CSS** -- reuses `audit-print.css` classes (`audit-header`, `audit-body`, `audit-section`, `audit-no-break`)
- Grade badges will use the existing `SeverityBadge` styling pattern adapted for letter grades (A- green, B- blue, C- yellow, D/D+ red)

