

# Keep All Section Headings With Their Content in PDF

## The Problem

When downloading the audit as PDF, section headings can get stranded at the bottom of a page while their content flows to the next page. This looks unprofessional and makes the document harder to read.

## The Fix

Update `src/styles/audit-print.css` to force every major section to start on its own page, so each heading always appears at the top alongside its content. This applies to all 9 sections in the audit.

## Technical Details

**File: `src/styles/audit-print.css`**

The existing page-break rule (lines 45-52) currently only covers 4 sections. It will be updated to include all section IDs:

```css
/* From: */
#findings,
#performance-tables,
#confidence,
#leadership-decisions,
#appendix {
  page-break-before: always;
}

/* To: */
#executive-summary,
#recommended-decisions,
#scope,
#findings,
#performance-tables,
#waste-indicators,
#confidence,
#leadership-decisions,
#appendix {
  page-break-before: always;
}
```

**Sections being added:**
1. `#executive-summary` -- Executive Summary
2. `#recommended-decisions` -- Recommended Decisions
3. `#scope` -- Scope and Data Sources
4. `#waste-indicators` -- Highest-Risk Waste Indicators

The other 5 sections (`#findings`, `#performance-tables`, `#confidence`, `#leadership-decisions`, `#appendix`) already have this rule.

No other files need to change.

