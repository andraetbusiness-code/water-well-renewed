
# Fix Link Share Thumbnail for Hygia+ Demo Page

## Problem
When sharing `https://water-well-renewed.lovable.app/demo/hygia-plus`, the preview thumbnail shows a broken/generic image because the page has no Open Graph meta tags, and the global ones in `index.html` point to a default Lovable placeholder.

## Solution
Add OG meta tags to the Hygia+ demo page using the existing `<Helmet>` component, and place a branded image in the `public/` folder so it's accessible via a direct URL (required for social previews).

## Steps

1. **Copy `src/assets/ssw-badge.png` to `public/og-image.png`** so it can be referenced by an absolute URL.

2. **Update `src/pages/demo/HygiaPlusDemo.tsx`** -- add OG meta tags inside the existing `<Helmet>` block:
   - `og:title` = "Dual Tank HYGIA+ | Select Source Water"
   - `og:description` = "Premium water softening and filtration. Free in-home water testing with exclusive in-home deal."
   - `og:image` = `https://water-well-renewed.lovable.app/og-image.png`
   - `og:url` = `https://water-well-renewed.lovable.app/demo/hygia-plus`
   - `og:type` = "website"
   - `twitter:card` = "summary_large_image"
   - `twitter:image` = same image URL

3. **Update `index.html`** -- change the fallback `og:image` and `twitter:image` from the Lovable placeholder to `https://water-well-renewed.lovable.app/og-image.png` so all pages benefit.

After publishing, the shared link will show the SSW badge with the correct title instead of the broken preview. Social platforms cache thumbnails, so it may take a little time to update.
