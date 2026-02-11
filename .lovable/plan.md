

# Fix Text & Icon Visibility on Photo Background Slides

## Problem

Two categories of elements are hard to see on slides with teal-tinted photo backgrounds:

1. **"No YES confirmation = not booked" callout boxes** -- Use `text-accent` (deep blue) on `bg-accent/10` (nearly transparent deep blue). Against a dark teal photo overlay, this is blue-on-blue and nearly invisible.

2. **Icon containers in cards** (e.g., the chat bubble in "Create Rapport") -- Use `text-primary` (water blue) on `bg-primary/10` (transparent blue). On a teal background, these blend in completely.

These issues appear on: YourOnlyJobSlide, HowMetricsWorkSlide, IncentivesSlide, and any other slide using these patterns on photo backgrounds.

---

## Changes

### 1. YourOnlyJobSlide.tsx (photo background)

- **Icon containers**: Change from `bg-primary/10` + `text-primary` to `bg-white/20` + `text-white` so icons pop against the dark overlay
- **Step number badges**: Change from `bg-primary text-primary-foreground` to `bg-accent text-white` for contrast
- **"No YES confirmation" callout**: Change from `bg-accent/10 border-accent/30 text-accent` to `bg-white/15 backdrop-blur-sm border-white/30 text-white font-bold` with a drop shadow

### 2. IncentivesSlide.tsx (photo background)

- The disclaimer text `text-white/60` is too faint -- bump to `text-white/80` with `drop-shadow-md`

### 3. HowMetricsWorkSlide.tsx (cream background, no photo)

- The "No YES confirmation" callout uses `text-accent` on cream -- accent is dark blue on light cream, which should be fine, but we will still strengthen it with `bg-accent text-white font-bold` to make it unmissable and consistent with the other slides

### 4. ScriptRulesSlide.tsx (cream, no photo)

- Already uses solid `bg-card` cards with `text-foreground` -- no changes needed, this is readable.

---

## Technical Details

| File | Element | Current | New |
|------|---------|---------|-----|
| `YourOnlyJobSlide.tsx` | Icon boxes | `bg-primary/10 text-primary` | `bg-white/20 text-white` |
| `YourOnlyJobSlide.tsx` | Step badges | `bg-primary text-primary-foreground` | `bg-white text-primary font-bold` |
| `YourOnlyJobSlide.tsx` | Callout box | `bg-accent/10 border-accent/30` + `text-accent` | `bg-white/20 backdrop-blur-sm border-white/30` + `text-white drop-shadow-md` |
| `IncentivesSlide.tsx` | Disclaimer | `text-white/60` | `text-white/80 drop-shadow-md` |
| `HowMetricsWorkSlide.tsx` | Callout box | `bg-accent/10 border-accent/30` + `text-accent` | `bg-accent text-white` (solid fill) |

No layout or structural changes -- only color/contrast tweaks to ensure every element is clearly readable.

