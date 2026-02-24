

# Add Cache-Busting to Infographic Images

## Problem
After updating infographic images, browsers and external tools (like Pomelli) continue serving old cached versions because Vite's content-hash alone may not bust intermediate CDN or aggressive browser caches.

## Solution
Create a small utility that appends a version query parameter to image URLs, and apply it to all infographic `img` tags across the site.

## Implementation

### 1. Create a cache-busting utility

Create `src/lib/cache-bust.ts` with a simple function:

```typescript
const ASSET_VERSION = "20260224";

export function cacheBust(url: string): string {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}v=${ASSET_VERSION}`;
}
```

When you update infographics in the future, just bump the `ASSET_VERSION` string.

### 2. Apply to all infographic image usages

Update `img` tags in these 8 files to wrap the `src` with `cacheBust()`:

| File | Images affected |
|------|----------------|
| `src/components/HomeInfographic.tsx` | 1 (better-water-hero) |
| `src/pages/Gallery.tsx` | 9 infographics + 4 photos in the data array |
| `src/pages/FiltrationTechnology.tsx` | 2 (filtration-stages, benefits) |
| `src/pages/HygiaSystem.tsx` | 2 (system-diagram, why-choose-us) |
| `src/pages/WhatInWater.tsx` | 2 (whats-in-water, home-needs) |
| `src/pages/Process.tsx` | 1 (customer-journey) |
| `src/pages/Maintenance.tsx` | 1 (maintenance-schedule) |
| `src/pages/portal/admin/InfographicGenerator.tsx` | 9 (all slots) |

Each change is minimal -- just wrapping the imported variable in `cacheBust()` where it's used as an `src` prop or in a data array.

### Example change

Before:
```tsx
<img src={betterWaterHeroImg} alt="..." />
```

After:
```tsx
import { cacheBust } from "@/lib/cache-bust";
// ...
<img src={cacheBust(betterWaterHeroImg)} alt="..." />
```

### 3. No other changes needed
- Same filenames, same imports
- The query param (`?v=20260224`) forces browsers and CDNs to treat the URL as new
- Bumping the version string in one file busts cache for all images site-wide

