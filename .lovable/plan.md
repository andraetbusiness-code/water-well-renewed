

# Growth Execution Plan — Private Downloadable Report Page

## Overview

This creates a new private page at `/growth-plan` using the exact same design format as the `/audit` page — same header bar, same SectionTitle/CalloutCard/DataTable components, same print CSS classes, same privacy model. The page contains the complete "Select Source Water — Growth Execution Plan" with all 15 sections preserved verbatim. Nothing summarized, nothing removed.

---

## Privacy Model (Same as Audit + Onboarding)

- Not linked from Header, Footer, sitemap, or any public page
- `noindex, nofollow` meta tags via `react-helmet-async`
- Accessible only at `/growth-plan` via direct URL
- Intended for private subdomain mapping (e.g., `growth.selectsourcewater.com`)
- Added to `robots.txt` Disallow rules

---

## New Files

### 1. `src/pages/GrowthExecutionPlan.tsx`

Uses the same sub-components as the audit page (SectionTitle, CalloutCard, DataTable, SeverityBadge) rebuilt inline to keep it self-contained.

**Header Bar** (fixed, hidden on print)
- SSW logo on the left
- "Growth Execution Plan" label
- "Download PDF" button on the right (triggers `window.print()`)

**Report Sections** (all original text preserved word-for-word):

1. **Cover Block**
   - Large centered logo
   - Title: "Growth Execution Plan"
   - Subtitle: "Systems - Lead Generation - Recruiting - Marketing - Web/SEO - Training/SOP - Repeatability"
   - Audience: Glover + Executive Team
   - Purpose paragraph (full original text)
   - "CONFIDENTIAL" badge

2. **Important Context (Scope + Next Layer of Truth)**
   - Full original text about GHL/Enzy audit basis
   - "However, this is not yet the full data universe" paragraph
   - The 4 bullet points about what deeper forensic review will confirm
   - "Bottom line" statement preserved exactly

3. **Executive Outcomes (What This Plan Delivers)**
   - Sub-section A: Measurable Performance Outcomes (5 bullets with bold labels)
   - Sub-section B: Scalable Growth Outcomes (5 bullets with bold labels)
   - Sub-section C: Standardized SOP + Training System callout

4. **Phase Plan (90-Day Execution Timeline)**
   - Phase 1 (Week 1): Stabilize — 5 action items
   - Phase 2 (Weeks 2-4): Conversion Ops — 5 action items
   - Phase 3 (Weeks 4-12): Scale — 4 action items
   - Displayed as timeline-style cards with phase badges

5. **Core System Fixes (Enzy + GoHighLevel)**
   - Sub-section A: Enzy Fixes — Goal statement, 5 "We will" bullets, "Why it matters" callout
   - Sub-section B: GoHighLevel Fixes — Goal statement, 5 "We will" bullets with sub-items (pipeline stages, attribution, outcomes, revenue, confirmation flows), Result statement

6. **Missed Call Elimination (AI Call Handling + Human Routing)**
   - Goal statement
   - 4 implementation bullets
   - Outcome statement

7. **Spend Governance + Budget Reallocation (Including Google)**
   - Sub-section A: Spend Governance — 3 non-negotiable controls
   - Sub-section B: Google Solutions — 3 high-intent deployment items
   - Sub-section C: Budget Reallocation Method — 2 phased approach items

8. **Field Self-Gen Same-Day Engine (Routes by Territory)**
   - Goal statement, 3 deliverables
   - Route Pack "Algorithm" sub-section with 3 iteration steps

9. **Recruiting Plan (1099) — Weekly Interviews + Monthly Hiring Event**
   - Goal statement
   - 3 implementation items
   - Structured hiring funnel: RSVP -> group interview -> shadow day -> onboarding -> first-week ramp
   - KPI tracking: 4 metrics

10. **Social Media + Content Engine**
    - Goal statement
    - Content pillars: 4 items
    - Deliverables: 3 items

11. **Marketing Materials + Creative Production (Print + Digital)**
    - Goal statement
    - 7 deliverable types

12. **Web Development + SEO (Compounding Growth)**
    - Goal statement
    - 4 implementation items

13. **Training Materials + Onboarding Library (Enzy Library Buildout)**
    - Goal statement
    - 5 deliverables

14. **Standardized SOP + Training System (Locked for Scalability)**
    - Objective statement
    - 5 deliverables (Role-based SOPs, Non-negotiable workflows, QC checklists, Certification ramp path, Version control)

15. **Access + Data Needed to Finalize (Leadership Action Items)**
    - 8 access items needed
    - 4 confirmation outcomes from deeper forensic review

16. **What Leadership Receives Weekly (Executive Scorecard)**
    - 10 line items in the weekly scorecard

17. **Launch Readiness Statement**
    - Full original closing paragraph preserved verbatim

**Footer**: "Select Source Water — Growth Execution Plan — Confidential"

---

## Modified Files

### 2. `src/App.tsx`

Two additions:
- Import: `import GrowthExecutionPlan from "./pages/GrowthExecutionPlan";`
- Route: `<Route path="/growth-plan" element={<GrowthExecutionPlan />} />` (placed next to the audit route with a comment about privacy)

### 3. `public/robots.txt`

Add `Disallow: /growth-plan` under each user-agent block (same pattern as `/onboarding` and `/audit`).

---

## Design Approach

- Exact same visual format as the audit page: Deep Blue headers, brand-colored section titles, bordered callout cards, alternating-row tables
- Severity/priority badges adapted for solutions context: "Phase 1" / "Phase 2" / "Phase 3" badges instead of "Critical" / "High"
- Goal statements displayed as blue-left-bordered callout cards
- "We will" action items as clean bullet lists
- The 90-Day Timeline rendered as 3 distinct phase cards with week ranges
- The Executive Scorecard (Section 14) rendered as a DataTable
- Access requirements (Section 13) rendered as a checklist-style table
- Same print CSS classes (`audit-header`, `audit-body`, `audit-section`, `audit-no-break`) reused so the existing `audit-print.css` handles PDF export automatically
- Page breaks added before major sections for clean PDF output

---

## What Does NOT Change

- No modifications to the existing audit page, onboarding packet, portal, or public site
- The existing `audit-print.css` is reused as-is (no modifications needed)
- No new dependencies required

