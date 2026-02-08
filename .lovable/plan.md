
# Brand Package Color and Style Alignment

## What Is Changing

The entire site is shifting from its current "Warm and Organic" teal/coral/cream palette to the official SSW brand palette defined in the brand guide. This affects the global theme, every page, all components, the onboarding packet, the presentation system, and the downloadable flyer.

### Color Comparison

| Token | Current | Brand Guide |
|-------|---------|-------------|
| Primary | Deep Teal (#0F766E) | Water Blue (#1E6FD9) |
| Foreground/Text | Dark Brown (#332B26) | Primary Black (#0B0B0B) / Text Gray (#111111) |
| Background | Warm Cream (#F7F3EE) | White (#FFFFFF) |
| Secondary | Sandy Beige (#EDE5D8) | Light Gray (#F3F5F7) |
| Accent | Warm Coral (#F97316) | Deep Blue (#123B8A) |
| Ring/Focus | Deep Teal | Water Blue (#1E6FD9) |

### Typography Change

| Element | Current | Brand Guide |
|---------|---------|-------------|
| Headings | DM Serif Display (serif) | Inter Bold (sans-serif) |
| Body | Inter | Inter (no change) |
| Tone | Organic, flowing | Modern, clean, trustworthy |

---

## Detailed Plan

### Step 1: Update Global CSS Variables (`src/index.css`)

Remap every CSS custom property in `:root` to the brand guide values:

- `--primary` becomes Water Blue (#1E6FD9 in HSL)
- `--primary-foreground` becomes White (#FFFFFF)
- `--background` becomes White (#FFFFFF)
- `--foreground` becomes Text Gray (#111111)
- `--secondary` becomes Light Gray (#F3F5F7)
- `--accent` becomes Deep Blue (#123B8A)
- `--accent-foreground` becomes White
- `--card` becomes White
- `--muted` becomes a soft gray
- `--border` becomes a subtle gray
- Update `--water-*` tokens to match the blue family
- Remove `--earth-*` tokens (no longer needed)
- Update `--hero-overlay` gradient to use blues instead of teal
- Update `--teal-gradient` to a blue gradient
- Update `--warm-gradient` to a light gray gradient
- Remove the body's organic radial gradient backgrounds - replace with clean white/light gray
- Switch heading font from `DM Serif Display` to `Inter` with bold weight
- Update dark mode variables to match the new palette

### Step 2: Update Tailwind Config (`tailwind.config.ts`)

- Update `fontFamily.serif` to point to Inter (or remove serif distinction since headings now use Inter Bold)
- Keep `water` color tokens but re-map to blue shades
- Remove or remap `earth` color tokens
- Keep organic border-radius values (the layout style stays, only colors change)

### Step 3: Update Component Hardcoded Colors

Several components reference colors directly rather than through tokens. These all need updating:

**DownloadableFlyer (`src/components/marketing/DownloadableFlyer.tsx`)**
- The print HTML uses hardcoded `#0077B6` and `#F97316` -- update to `#1E6FD9` (Water Blue) and `#123B8A` (Deep Blue)
- Benefit icon backgrounds change from coral to Deep Blue
- CTA banner changes from coral to Deep Blue

**OnboardingSlideLayout (`src/components/onboarding/OnboardingSlideLayout.tsx`)**
- The `teal` variant maps to `bg-primary` so it will auto-update via tokens
- Background decoration blobs will naturally follow the new primary color

**SlideFrame (`src/components/presentations/SlideFrame.tsx`)**
- References `water-medium`, `earth-warm` -- these need to pull from the updated tokens

**Hero Component (`src/components/Hero.tsx`)**
- `hero-overlay` gradient updates automatically via CSS variable
- Accent underline and trust badge backgrounds will follow token changes

**WaveDivider (`src/components/WaveDivider.tsx`)**
- References `hsl(var(--primary))` and `hsl(var(--water-medium))` -- will auto-update

**WaterEffects (`src/components/WaterEffects.tsx`)**
- References `water-accent`, `primary` -- will auto-update via tokens

**TrustBadges, ContactCTA, Services, ProblemSolution, HowItWorks**
- These use token-based classes (`text-primary`, `bg-accent`, etc.) -- will auto-update
- A few instances of `accent/10`, `accent/20` glow colors will now produce blue glows instead of coral glows

### Step 4: Update Onboarding Slides

The 27-slide onboarding packet uses the `OnboardingSlideLayout` variants. Since the variants reference CSS tokens (`bg-primary`, `bg-foreground`, etc.), most will update automatically. The `teal` variant will now render as Water Blue instead of teal -- this is correct per the brand guide.

Accent-colored elements like divider bars and highlighted text currently use coral -- they will become Deep Blue, which matches the brand guide's "premium" look.

### Step 5: Update Button Variants (`src/components/ui/button.tsx`)

- `hero` variant: Change from coral accent to Deep Blue accent
- `heroOutline` variant: Update border color references
- These use token classes so most changes cascade from CSS variables

### Step 6: Clean Up Body Background

The current body has 5+ layered radial gradients creating the "organic cream" feel. Per the brand guide ("white or light-gray backgrounds; avoid clutter"), replace with a clean white or very subtle light gray.

### Step 7: Update Portal/Sidebar Colors

The sidebar tokens (`--sidebar-*`) need updating to match the new palette:
- Sidebar background: White or Light Gray
- Sidebar primary: Water Blue
- Sidebar accent: Light Gray

---

## What Stays the Same

- Overall layout structure (organic flowing layouts, wave dividers, blob shapes)
- Animation patterns (framer-motion entrance animations, floating effects)
- Component architecture (no structural changes)
- All content and copy
- Routing and page structure
- All functionality (forms, navigation, modals, portal)

## Files to Modify

| File | Scope of Change |
|------|-----------------|
| `src/index.css` | Full CSS variable overhaul, body background, heading font |
| `tailwind.config.ts` | Font family update, water/earth color token remap |
| `src/components/marketing/DownloadableFlyer.tsx` | Hardcoded hex colors in print HTML |
| `src/components/ui/button.tsx` | Hero variant accent color (if not token-based) |

## Files That Auto-Update (No Manual Changes Needed)

These files use CSS token classes and will inherit the new palette automatically:

- All onboarding slides (27 files)
- All presentation slides
- Header, Hero, Footer, Services, TrustBadges, ContactCTA, ProblemSolution, HowItWorks
- WaveDivider, WaterEffects
- OnboardingSlideLayout, SlideFrame
- Portal components (sidebar, header, layout)

---

## Summary

This is primarily a **theme-level change** concentrated in 2 core files (`index.css` and `tailwind.config.ts`) plus 1-2 components with hardcoded hex values. The token-based architecture means ~90% of the site updates automatically once the CSS variables change. The visual result will shift from a warm teal/coral/cream organic feel to a clean, modern blue/black/white/gray professional look -- matching the SSW brand guide exactly.
