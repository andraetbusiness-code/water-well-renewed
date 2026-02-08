

# Executive Marketing & Tracking Audit -- Private Downloadable Report

## Overview

This builds a new private page at `/audit` containing the complete "Select Source Water -- Executive Marketing & Tracking Audit" report for the date range Jan 7 -- Feb 7, 2026. Every word, number, and data point from the original content will be preserved exactly as written -- nothing summarized, nothing removed. Where the report's structure allows, additional formatting depth (color-coded severity tags, visual callout cards, bordered evidence figures) will be added to make the data easier to parse at a glance.

The page follows the same privacy model as the onboarding packet: no links from the Header, Footer, or sitemap; `noindex, nofollow` meta tags; access only via direct URL.

---

## Image Placement (Only Where They Add Clarity)

After reviewing all 10 uploaded files, there are actually **7 unique screenshots** (3 pairs are duplicates with different filenames). Each will be placed as a captioned figure directly adjacent to the data it substantiates:

| Image | Placed In Section | Reason |
|-------|-------------------|--------|
| `The_problem_is_measurable.png` | Section 2: Spend Inefficiencies | Shows the Facebook Ads report with campaign-level spend, confirming the $8,089.64 zero-lead campaign |
| `Paid-social_spend_and_the_"0-lead"_campaign_spend_for_Jan_23_–_Feb_7.png` | Same section (alternate crop if distinct, otherwise skip as duplicate) | Same Meta Ads report |
| `Missing_"appointment_held"_visibility_in_GHL_reporting.png` | Section 1: Tracking & Attribution Gaps | Shows the GHL appointment report with "Showed" and "No Show" both reading 0 |
| `Booked_appointment-_Confirmed_appointment-.png` | Appendix: Definitions | Visually supports the definition of "Booked" vs "Confirmed" |
| `Appointment_held_"sit".png` | Appendix: Definitions | Visually supports the "Appointment Held" definition |
| `Closed_Sold-.png` | Appendix: Definitions | Visually supports the "Closed / Sold" definition |
| `Enzy_Marketing_"Sold"_48.png` | Section 3: Pipeline Leakage or Performance Table C | Shows the Enzy status breakdown including the 48 Sold |
| `Enzy_Marketing_"Sold"_and_other_status_counts_as_shown.png` | Same section (if distinct crop, otherwise skip) | Same Enzy data |
| `High_confidence_conclusions.png` | Section 6: Confidence & Gaps | Visually shows the high-confidence data items |
| `Medium_Low_confidence_needs_access_to_confirm.png` | Section 6: Confidence & Gaps | Shows the medium/low confidence items that need verification |

If any pair turns out to be identical, only one will be used to avoid redundancy.

---

## Privacy Model

Exactly matches the onboarding packet:
- Not linked from Header, Footer, sitemap, or any public page
- `noindex, nofollow` robots meta tag via `react-helmet-async`
- Accessible only at `/audit` via direct URL
- Intended for private subdomain mapping (e.g., `audit.selectsourcewater.com`)

---

## New Files

### 1. `src/pages/ExecutiveAudit.tsx`

The main page component. Contains:

**Header Bar** (fixed, hidden on print)
- SSW logo on the left
- "Executive Marketing & Tracking Audit" label
- "Download PDF" button on the right (triggers `window.print()`)

**Report Sections** (rendered in order, all original text preserved verbatim):

1. **Cover Block**
   - Title: "Select Source Water -- Executive Marketing & Tracking Audit"
   - Date Range: Jan 7 -- Feb 7, 2026
   - "CONFIDENTIAL" badge

2. **Executive Summary**
   - All 5 original paragraphs preserved word-for-word:
     - Volume vs. visibility (319 booked, 181 confirmed, 266 Enzy leads, 48 Sold, $0 GHL revenue)
     - Paid-social spend vs. results ($14,527.72 spent, 193 leads, $75.27 CPL, $8,089.64 Cold Targeting zero leads)
     - Pipeline leakage (6 Appointment Scheduled, 77 cancelled, 28 No Sale/SAT, 21 Not Qualified, ~40% lost)
     - Operational gaps (63% incoming calls missed, no show/no-show tracking)
     - Why it matters (the full original paragraph)
   - Each paragraph displayed as a left-bordered callout card with severity color

3. **Recommended Decisions (No Solutions)**
   - All 4 numbered items exactly as written:
     1. Authorize a unified diagnostic
     2. Implement spend controls
     3. Define the "closed sale" system of record
     4. Assign ongoing executive oversight

4. **Scope & Data Sources**
   - Systems audited: GoHighLevel (GHL), Enzi, Call Reports -- with original descriptions
   - Date ranges: Primary pipeline (Jan 7 -- Feb 7) and Paid-social window (Jan 23 -- Feb 7) with the note about ads data not exposing pre-Jan 23
   - What was accessible: full original list
   - What wasn't: full original list

5. **Key Findings & Evidence**
   - Finding 1: Tracking & Attribution Gaps (Critical)
     - Full original Observation and Impact text
     - Embedded figure: GHL appointment report screenshot showing 0 Showed / 0 No Show
   - Finding 2: Spend Inefficiencies (Critical)
     - Full original Observation and Impact text
     - Embedded figure: Facebook Ads report screenshot showing campaign-level spend
   - Finding 3: Conversion & Pipeline Leakage (High)
     - Full original Observation and Impact text
     - Embedded figure: Enzy lead status screenshot
   - Finding 4: Operational Follow-Up Gaps (High)
     - Full original Observation and Impact text

6. **Performance Tables**
   - Table A: Appointments (GHL, Jan 7 -- Feb 7) -- all 4 rows: Booked 319, Confirmed 181, Cancelled 95, Show/No-show "Not captured (0 in GHL)"
   - Table B: Paid-Social Performance (Meta Ads in GHL, Jan 23 -- Feb 7) -- all 4 rows: Spend $14,527.72, Leads 193, CPL $75.27, Highest-risk campaign spend $8,089.64
   - Table C: Marketing Lead Outcomes (Enzi) -- all 7 rows: Total 266, Sold 48, No Sale/SAT 28, Cancelled 77, Not Qualified 21, Reschedule 17, Appointment Scheduled 6

7. **Highest-Risk Waste Indicators**
   - All 4 bullet points preserved exactly:
     - "Cold Targeting -- Website" campaign: >$8k spent, 0 leads
     - Untracked closes: 48 sold in Enzi, $0 in GHL
     - Missing appointment outcomes: 0 shows/no-shows
     - High cancelled/no-sale rates: ~40% of marketing leads

8. **Confidence & Gaps**
   - Full table with all 5 rows and original confidence levels:
     - Booked/confirmed/cancelled (GHL): High
     - Paid-social spend & zero-lead campaign: High
     - Enzi marketing "Sold" count: High
     - Date alignment of Enzi counts: Medium
     - Cost per sit/close & ROI: Low
   - Each row includes the original "Notes" column text
   - Embedded figures: confidence screenshots placed alongside

9. **Leadership Decisions Required (No Solutions)**
   - All 4 numbered action items with full original text (same as section 3 but in full-detail context)

10. **Appendix**
    - Definitions: All 4 terms with full original definitions:
      - Booked appointment
      - Confirmed appointment
      - Appointment held ("sit")
      - Closed / Sold
    - Supporting screenshots placed next to each definition where they match
    - Assumptions & Calculation Notes: All 3 original bullet points preserved:
      - CPL calculation formula
      - ROI cannot be calculated note
      - Enzi date window assumption

### 2. `src/styles/audit-print.css`

Print stylesheet imported alongside `onboarding-print.css`:
- `@page { size: letter portrait; margin: 0.75in; }` -- portrait orientation for a report format
- Hides the sticky header bar
- Removes all animations and transitions
- Ensures background colors and images print (`print-color-adjust: exact`)
- Applies page breaks between major sections (after Executive Summary, after Key Findings, after Performance Tables, before Appendix)
- Avoids page breaks inside tables, figures, or callout cards
- Sizes embedded screenshots to fit within print margins

### 3. Modified: `src/App.tsx`

Two additions only:
- Import: `import ExecutiveAudit from "./pages/ExecutiveAudit";`
- Import: `import "./styles/audit-print.css";`
- Route: `<Route path="/audit" element={<ExecutiveAudit />} />` (placed next to the onboarding route with a similar comment about privacy)

---

## Design Approach

- Clean corporate report layout -- no wave dividers, no blob shapes, no decorative animations
- Uses the SSW brand tokens (Water Blue `#1E6FD9`, Deep Blue `#123B8A`, white/gray backgrounds, Inter font)
- Severity badges: "CRITICAL" in red-bordered cards, "HIGH" in amber-bordered cards
- Tables use brand-colored headers (Deep Blue background, white text) with alternating light gray row striping
- Figures displayed in bordered cards with caption text (e.g., "Figure 1: Facebook Ads Report -- Meta campaign spend for Jan 23 -- Feb 7, 2026")
- Confidence levels color-coded: High = green badge, Medium = yellow badge, Low = red badge
- The "Download PDF" button uses `window.print()` matching the onboarding packet pattern
- Responsive for screen viewing but optimized for letter-size portrait PDF output

---

## What Does NOT Change

- No modifications to any existing pages, navigation, or components
- The onboarding packet, presentations, portal, and public site are untouched
- The existing brand theme is reused as-is
- No new dependencies needed

