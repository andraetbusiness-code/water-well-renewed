
# In-Home Demo Page for Hygia+ Marketing Slick

## What We're Building

A new page at `/demo/hygia-plus` that presents the uploaded Hygia+ sales slick as a polished, native web experience -- not an embedded PDF. This page is designed for reps to pull up on a tablet or laptop during in-home demos. It will be accessible via a future subdomain like `demo.selectsourcewater.com`.

## How It Will Look

The page will recreate the two sides of the PDF as a clean, scrollable web layout:

**Side 1 (Hero Section):**
- Full-width blue gradient header with "DUAL TANK HYGIA+" headline
- Pricing: $8,990 or $102/mo prominently displayed
- Feature list with check icons (dual tank technology, 3 cu ft of media, complimentary deliveries, customizable up to 10 stages, 196,000 grain capacity)
- "Manufactured in Southern California" callout
- Lifetime Warranty badge
- Filtration description paragraph

**Side 2 (In-Home Special Section):**
- Bold "IN-HOME SPECIAL!" banner
- Strikethrough $8,990 with $7,990 highlighted
- $89/mo financing shown
- "$1,000 OFF" and "FREE REVERSE OSMOSIS" callout badges
- Features list repeated for reinforcement
- "First responder, educator & healthcare worker promotions" mention
- "Offer valid today only" urgency line
- Phone number CTA: 833.602.7765

**Footer/Contact Bar:**
- Home Depot authorized vendor badge
- Phone number + website
- Clean, branded footer

## Design Principles

- Matches the existing SSW brand palette (Water Blue #1E6FD9, Deep Blue #123B8A, white, light gray)
- Uses the same sans-serif typography (Inter) as the rest of the site
- Responsive -- works on tablets for in-home use
- No header/footer navigation (clean demo experience, not the main site)
- `noindex, nofollow` meta tags (private page)
- Subtle animations via Framer Motion (fade-ins, not distracting)

## Subdomain Strategy

The page will be routable at `/demo/hygia-plus`. To map `demo.selectsourcewater.com` to this path, we add subdomain detection logic in `App.tsx` that checks `window.location.hostname` -- when the `demo` subdomain is detected, it renders only the demo routes. This follows the same pattern already planned for the presentation system's subdomain strategy.

## Technical Details

### New Files
1. **`src/pages/demo/HygiaPlusDemo.tsx`** -- The full demo page, built as native React components (not an embedded PDF). Two main sections matching the two PDF sides, styled with Tailwind and the brand palette.

2. **`src/assets/marketing/hygia-plus-slick-front.jpg`** and **`src/assets/marketing/hygia-plus-slick-back.jpg`** -- The PDF page images extracted and copied into assets, used as reference/fallback.

### Modified Files
3. **`src/App.tsx`** -- Add route `/demo/hygia-plus` pointing to the new page. Add subdomain detection: if hostname starts with `demo.`, render only demo routes.

### Page Structure (HygiaPlusDemo.tsx)
- No `<Header>` or `<Footer>` from the main site
- Helmet with `noindex, nofollow`
- Section 1: Product hero (gradient bg, features, pricing, warranty)
- Section 2: In-home special offer (discount, financing, urgency)
- Contact bar at bottom with Home Depot badge and phone CTA
- All content is real HTML/text (searchable, accessible, fast-loading)

### Subdomain Detection (App.tsx)
```text
const hostname = window.location.hostname;
const subdomain = hostname.split('.')[0];

if (subdomain === 'demo') {
  // Render only demo routes
}
```
