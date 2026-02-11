
# Remove Marketing Gallery from Onboarding Deck + Add Subdomain Route

## What's Changing

1. **Remove the Marketing Gallery slide** from the onboarding deck (line 83 in `FieldRepOnboarding.tsx`) and its import (line 28).

2. **Add a `marketing` subdomain route** in `src/App.tsx` using the same subdomain detection pattern already used for `demo`. When someone visits `marketing.selectsourcewater.com`, it will render the `MarketingGallerySlide` component as a standalone page with a placeholder message indicating more content is coming.

## Files Modified

| File | Change |
|------|--------|
| `src/pages/FieldRepOnboarding.tsx` | Remove `MarketingGallerySlide` import and usage (lines 28, 83) |
| `src/App.tsx` | Add `marketing` subdomain detection and route, rendering the existing `MarketingGallerySlide` as a standalone page |

## Technical Details

- In `App.tsx`, extend the existing subdomain logic (currently handles `demo`) to also detect `marketing` and render a `MarketingRoutes` component
- The marketing subdomain will render the `MarketingGallerySlide` wrapped in a minimal layout (no onboarding header)
- No new files needed -- reuses the existing `MarketingGallerySlide` component
- No design or styling changes
