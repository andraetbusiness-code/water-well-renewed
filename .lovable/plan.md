

## Restyle GBP Audit to Match New Site Palette

Update the GBP audit report (`/gbp-audit`) from the old "Modern Blue" (#123B8A / #1E6FD9) color scheme to a new teal, coral, and cream palette inspired by the updated site branding.

### New Color Palette (derived from the reference image)

| Role | Old | New |
|------|-----|-----|
| Primary heading / header bar | #123B8A (deep blue) | #2D4F4F (deep teal) |
| Accent / borders / icons | #1E6FD9 (water blue) | #3D7A7A (medium teal) |
| Table header bg | #123B8A | #2D4F4F |
| Info callout border | blue-500 | teal-600 |
| SimpleTermsCard | emerald-50/400/600/800/900 | teal-50/400/600/800/900 |
| GradeBadge "B" level | blue-100/800/300 | teal-100/800/300 |
| Callout info badge | blue-100/800/300 | teal-100/800/300 |

### What Changes

All changes are in a single file: `src/pages/GBPAudit.tsx`

**Sub-components updated (color swaps only, no structural changes):**

1. **SectionTitle** -- heading color from #123B8A to #2D4F4F, border from #1E6FD9 to #3D7A7A
2. **GradeBadge** -- "B" grade style from blue-100/800/300 to teal-100/800/300
3. **CalloutCard** -- info border from blue-500 to teal-600, info badge from blue-100/800/300 to teal-100/800/300
4. **SimpleTermsCard** -- entire green/emerald palette swapped to teal (teal-50 bg, teal-400 border, teal-600 icon, teal-900 heading, teal-800 text)
5. **DataTable** -- header bg from #123B8A to #2D4F4F, title color from #123B8A to #2D4F4F
6. **CategorySection** -- icon color from #1E6FD9 to #3D7A7A, heading color from #123B8A to #2D4F4F
7. **Header bar** -- bg from #123B8A to #2D4F4F
8. **Cover block** -- h1 color from #123B8A to #2D4F4F
9. **Inline h3/h4 subheadings** (Paid Growth section) -- from #123B8A/#1E6FD9 to #2D4F4F/#3D7A7A

### What Does NOT Change

- All content/text stays the same
- Layout and structure stays the same
- Grade severity colors (red for D, yellow for C, green for A) stay the same
- Critical/high/medium callout borders stay the same (red, amber, yellow)
- Print CSS stays the same

