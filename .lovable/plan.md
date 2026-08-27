

# Prompt 1 — Global Setup

This is the foundation for all subsequent changes. It updates contact info, navigation, footer, trust bar, and warranty language site-wide.

## Summary of Changes

### 1. Replace All Contact Info Site-Wide
- Replace **(800) 555-0123** and **833.422.7765** with **(951) 499-5136** everywhere
- Update all `tel:` links to `tel:+19514995136`
- Replace **info@selectsourcewater.com** with **info@selectsourcewatercalifornia.com**
- Add physical address: **790 Beaumont Ave Ste 124, Beaumont, CA 92223**

**Files affected:** `Header.tsx`, `Footer.tsx`, `ContactCTA.tsx`, `WhatInWater.tsx`, `HygiaPlusDemo.tsx`, `SettingsPage.tsx`, and any others with old contact info.

### 2. Fix "Serving Florida since 1998" Caption
- In `ProblemSolution.tsx`, change **"Serving Florida since 1998"** to **"Serving Southern California since 1998"**

### 3. Navigation — Full Rebuild
Replace the flat nav with a new structure including dropdowns:

- **Home** → /
- **Services** (dropdown): HYGIA+ System, Filtration Technology, What's In Your Water, Maintenance
- **Service Areas** (dropdown): Inland Empire Hub, Beaumont, Banning, Hemet, Moreno Valley, Riverside, View All Cities
- **Home Depot** → /home-depot-authorized-provider
- **Process** → /process
- **About** → /about
- **Blog** → /blog
- **Phone**: (951) 499-5136
- **Free Water Test** → /free-water-test (styled as CTA button)

Mobile: hamburger menu with accordion-style dropdown expansion, phone number and "Free Water Test" button pinned at bottom.

**File:** `Header.tsx` — major rewrite to support dropdown menus.

### 4. Footer — Full Rebuild
Replace with 4-column structure:

| Column 1 — Brand | Column 2 — Quick Links | Column 3 — Service Areas | Column 4 — Connect |
|---|---|---|---|
| Logo, tagline, phone, email, address, HD badge | Home, HYGIA+, Filtration, Process, etc. | Beaumont, Banning, Hemet, etc. + View All | Instagram, Facebook, Google Reviews, HD badge |

Bottom bar: © 2026 Select Source Water LLC | Est. 1998 | Licensed & Insured | Privacy Policy | Terms | Staff Login

**Remove YouTube** link entirely. Update social links to placeholder SoCal accounts.

**File:** `Footer.tsx` — major rewrite.

### 5. Trust Bar — New Global Component
Create a new `TrustBar.tsx` component that appears below the hero on every page:

- ⭐ 4.7 Stars (461+ Reviews)
- 🏠 HD Authorized Provider
- ✅ Lifetime Warranty
- 📅 5-Day Risk-Free Trial
- 📞 (951) 499-5136

Background: light blue (#f0f6ff). Horizontally scrollable on mobile.

**Files:** Create `TrustBar.tsx`, add to `PageLayout.tsx` and individual pages.

### 6. Warranty Language — Standardize
Replace all **"20-year full warranty"** and **"20-year warranty"** with **"Lifetime Warranty"** everywhere.

**Files affected:** `HygiaSystem.tsx`, `Process.tsx`, `generate-infographic/index.ts`

### 7. Update Hero Badge Text
In `Hero.tsx`, change **"Trusted Since 1998 • California & Arizona"** to **"Trusted Since 1998 • Inland Empire, California"**

### 8. Update Service Area References
In `ContactCTA.tsx`, change **"California & Arizona"** to **"Inland Empire, Southern California"**

In `Footer.tsx`, update tagline from "California and Arizona" to "Serving the Inland Empire since 1998"

---

## Technical Details

### New files to create:
- `src/components/TrustBar.tsx` — trust signal bar component

### Files to modify (13+):
- `src/components/Header.tsx` — full nav rebuild with dropdown support
- `src/components/Footer.tsx` — 4-column layout rebuild
- `src/components/Hero.tsx` — badge text update
- `src/components/ContactCTA.tsx` — phone, email, service area updates
- `src/components/ProblemSolution.tsx` — Florida → Southern California
- `src/pages/HygiaSystem.tsx` — warranty + phone updates
- `src/pages/Process.tsx` — warranty language
- `src/pages/WhatInWater.tsx` — phone update
- `src/pages/demo/HygiaPlusDemo.tsx` — phone + domain updates
- `src/pages/portal/admin/SettingsPage.tsx` — email update
- `src/components/layout/PageLayout.tsx` — add TrustBar
- `supabase/functions/generate-infographic/index.ts` — warranty text in prompts

### Routes referenced but not yet created:
These pages will be built in later prompts: `/about`, `/blog`, `/free-water-test`, `/home-depot-authorized-provider`, `/service-areas`, `/service-areas/[city]`, `/privacy-policy`, `/terms-of-service`, `/reviews`. Nav links will point to them now; the pages come later.

