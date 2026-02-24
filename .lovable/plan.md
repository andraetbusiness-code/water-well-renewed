

# Generate Brand-New Infographics with AI

## Overview
Instead of trying to recolor the existing images (which keeps producing text distortion and off-brand results), we will generate 9 completely new infographic images using AI image generation. Each will be designed from scratch to match the site's dark blue brand identity.

## Brand Specifications for Generation
- **Primary colors**: Water Blue (#1E6FD9), Deep Blue (#123B8A), light blue tints (#E8F0FE, #B8D4F0)
- **Backgrounds**: Clean white or very light gray
- **Typography style**: Modern, clean sans-serif (Inter-like)
- **Design style**: Professional, clean, minimal -- organic flowing shapes, rounded elements, consistent with the rest of the site
- **No pink, coral, salmon, orange, or tan colors anywhere

## Implementation Approach

### 1. Create an Edge Function: `generate-infographic`
A backend function that calls Lovable AI's image generation model (`google/gemini-3-pro-image-preview` for higher quality) with a detailed prompt for each infographic. The function will:
- Accept an infographic type/ID
- Use a carefully crafted prompt specifying the brand colors, layout, and content
- Return the generated image as base64
- Upload the result to file storage for persistence

### 2. Build an Admin Tool Page
A simple admin page (accessible from the portal) where you can:
- See all 9 infographic slots with their current images
- Click "Regenerate" on any one to generate a fresh version
- Preview the result before saving
- Save/download the approved image

### 3. Infographic Content Specifications

Each image will be generated with a specific prompt describing the exact content:

| # | Title | Content to Include |
|---|-------|--------------------|
| 1 | **Better Water Starts Here** | Hero overview graphic with HYGIA+ branding, water droplet imagery, "10-Stage Filtration" callout, clean blue gradient design |
| 2 | **10-Stage Filtration Process** | Numbered list of 10 filtration stages (Sediment, Catalytic Carbon, KDF-55, Coconut Carbon, Ion Exchange, UV Treatment, RO Membrane, Post-Carbon, Mineral Addition, Final Polish), vertical flow diagram |
| 3 | **How The System Works** | System diagram showing water flow from inlet through dual tanks and RO unit, labeled components, pipe connections |
| 4 | **Benefits of Filtration** | Icon grid showing benefits: healthier drinking water, better skin/hair, longer appliance life, eco-friendly, better taste, reduced contaminants |
| 5 | **What's In Your Water?** | Contaminant breakdown: chlorine, lead, PFAS, bacteria, sediment, hard minerals -- with warning indicators and percentage stats |
| 6 | **Does Your Home Need Filtration?** | Checklist-style graphic: hard water signs, staining, dry skin, bad taste, cloudy water -- with a call-to-action |
| 7 | **Why Choose Select Source Water** | Competitive advantages: Home Depot authorized, 20-year warranty, professional installation, local service, 10-stage system |
| 8 | **Your Path to Clean Water** | 5-step customer journey: Free Water Test, Custom Recommendation, Professional Install, System Activation, Ongoing Support |
| 9 | **Maintenance Schedule** | 12-month calendar grid showing quarterly filter changes, annual system flush, UV bulb replacement schedule |

### 4. File Output
Generated images will be saved to the same filenames so no code changes are needed:
- `src/assets/infographics/better-water-hero-styled.png`
- `src/assets/infographics/10-stages-filtration-styled.png`
- `src/assets/infographics/system-diagram-styled.png`
- `src/assets/infographics/benefits-styled.png`
- `src/assets/infographics/whats-in-water-styled.png`
- `src/assets/infographics/home-needs-filtration-styled.png`
- `src/assets/infographics/why-choose-us-styled.png`
- `src/assets/infographics/customer-journey-styled.png`
- `src/assets/infographics/maintenance-schedule-styled.png`

## Technical Steps

1. **Create edge function** `supabase/functions/generate-infographic/index.ts`
   - Uses `google/gemini-3-pro-image-preview` model via Lovable AI gateway
   - Each infographic type has a detailed, brand-specific prompt baked in
   - Returns base64 image data

2. **Create admin page** `src/pages/portal/admin/InfographicGenerator.tsx`
   - Grid of 9 cards showing current images
   - "Generate New" button on each card
   - Shows loading state during generation
   - Preview + download/save workflow

3. **Add route** in `PortalRoutes.tsx` for the admin generator page

4. **Generate all 9 images** using the tool, then save them as the styled PNG files

## Why This Approach
- AI-generated graphics will be designed from the ground up with the brand palette -- no color mismatches
- No text distortion risk since the text is part of the original generation prompt
- The admin tool lets you regenerate any image that doesn't look right without needing to come back here
- Same filenames mean zero code changes to Gallery, FiltrationTechnology, HygiaSystem, and other pages

