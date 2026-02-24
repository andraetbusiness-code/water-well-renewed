
# Recolor All Infographics to Match Brand Blues

## The Problem
The infographic images currently have two issues:
1. **Off-brand colors** -- pink, coral, salmon, orange, and tan/beige shapes that clash with the site's dark blue palette (Water Blue #1E6FD9 / Deep Blue #123B8A)
2. **Corrupted text** from the previous AI recolor attempt -- garbled labels on the maintenance schedule, filtration stages, and system diagram

## What Will Change
All 9 styled infographic images will be re-edited one by one using AI image editing. Each image will get a precise instruction to:
- Replace all pink, coral, salmon, orange, and tan/beige colors with shades of blue (#1E6FD9, #123B8A, and lighter blue tints)
- Keep white backgrounds where they exist
- **Critically preserve all text exactly** -- no distortion or corruption
- Keep all equipment photos, icons, and partner badges (Home Depot, etc.) intact

## Images to Fix

| Image | Current Issues |
|-------|---------------|
| **Better Water Starts Here** | Pink/coral blob shapes mixed with blue |
| **What's In Your Water** | Large coral circle, tan blobs, orange warning icon |
| **Maintenance Schedule** | Garbled month names and task labels from previous edit |
| **10-Stage Filtration** | Garbled text at bottom ("DI. Water Fimrange") |
| **Does Your Home Need Filtration?** | Coral/salmon shape in bottom-right corner |
| **System Diagram** | Garbled title text ("Waters Filtlation Wurg") |
| **Why Choose Us** | Possible off-brand accent colors |
| **Benefits of Filtration** | Minor off-brand accents if any |
| **Customer Journey** | Minor off-brand accents if any |

## Technical Approach
- Each image will be edited individually using the AI image generation model (google/gemini-2.5-flash-image)
- The editing prompt will be very specific: "Change ONLY the pink/coral/salmon/orange/tan colors to shades of blue (#1E6FD9 and #123B8A). Do NOT modify any text. Keep all text exactly as it appears."
- For images with corrupted text, the original un-styled versions (e.g., `10-stages-filtration.png`) will be used as the source instead of the already-corrupted styled versions
- No code changes needed -- the filenames stay the same, so all existing imports continue to work

## Risk Mitigation
- Using the original (pre-corruption) source images for the 3-4 infographics with garbled text
- Keeping editing instructions focused purely on color replacement to minimize text distortion
- Each image processed individually so any failures are isolated
