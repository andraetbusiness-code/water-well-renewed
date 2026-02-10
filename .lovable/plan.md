

# Add PDF Images and Logo to Hygia+ Demo Page

## Changes

Three updates to `src/pages/demo/HygiaPlusDemo.tsx`:

1. **Hero Section (right column, lines 131-146):** Replace the Droplets icon placeholder with the front-side PDF image (`hygia-plus-slick-front.jpg`). The image will be displayed in a rounded container with a subtle shadow, fitting naturally into the blue gradient. The description text currently in that box will be removed since it's already repeated in Section 2.

2. **In-Home Special Section (after the two-column grid, before the CTA, around line 251):** Add the back-side PDF image (`hygia-plus-slick-back.jpg`) as a full-width visual between the content and the phone CTA. Styled with rounded corners, shadow, and a fade-in animation.

3. **Logo in the hero placeholder:** The SSW logo is already displayed in the top-left logo bar (line 50). The "placeholder spot" was the Droplets icon area -- replacing it with the front-side product image addresses both requests.

## Technical Details

**File:** `src/pages/demo/HygiaPlusDemo.tsx`

- Add imports for the two marketing images:
  - `import slickFront from "@/assets/marketing/hygia-plus-slick-front.jpg"`
  - `import slickBack from "@/assets/marketing/hygia-plus-slick-back.jpg"`
- Remove `Droplets` from the lucide-react import (no longer needed)
- **Lines 138-145:** Replace the Droplets icon + text box with `<img src={slickFront}>` styled with `rounded-2xl shadow-2xl w-full object-contain`
- **After line 250 (before CTA):** Add a centered `<motion.div>` containing `<img src={slickBack}>` with fade-in animation, `rounded-2xl shadow-lg max-w-md mx-auto`

