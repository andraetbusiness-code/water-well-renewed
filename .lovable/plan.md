
# 30 Day Execution Plan - Presentation System Implementation

## Overview

Building a brand-native presentation system that matches your website's exact design language. The 16-slide "30 Day Execution Plan" deck will be the first presentation, accessible at `/presentations/30-day-execution-plan`.

---

## Brand Tokens Applied

| Element | Value |
|---------|-------|
| Heading Font | DM Serif Display |
| Body Font | Inter |
| Primary Color | Deep Teal (#0F766E) |
| Accent Color | Coral (#F97316) |
| Background | Warm Cream (#FAF8F5) |
| Text | Warm Dark (#3D3630) |
| Card Radius | 1.5rem (rounded-3xl) |
| Icon Style | Lucide outline |
| Logo | Select Source Water badge |

---

## What Gets Built

### 1. Presentation Viewer (Full-Screen)
- Keyboard navigation (arrows, space, escape)
- Fullscreen toggle (F key or button)
- Progress bar showing current slide
- Mobile swipe support
- Smooth framer-motion transitions between slides
- Speaker notes panel (toggle with S key)

### 2. Slide Components (Brand-Matched)
Each slide type matches your website's aesthetic exactly:

| Slide Type | Used For | Design Elements |
|------------|----------|-----------------|
| TitleSlide | Slide 1, 16 | DM Serif heading, coral underline accent, logo, organic blob decorations |
| PurposeSlide | Slide 2 | Bullet points with teal checkmarks, Inter font |
| SectorOverviewSlide | Slide 3 | 4 cards with icons, rounded-3xl corners, hover shadows |
| SectorDetailSlide | Slides 4-7 | Teal gradient header, bullet content, organic shapes |
| LeadershipSlide | Slides 8-15 | Name in DM Serif, responsibilities in Inter, coral accent |
| QuoteSlide | Slide 16 | Centered quote with decorative elements |

### 3. Admin Builder (Portal)
- Create/edit presentations at `/portal/admin/presentations`
- Drag-and-drop slide reordering
- Live preview thumbnails
- Speaker notes editor

### 4. Export Options
- PDF download (browser print with brand CSS)
- PNG slides export for embedding

---

## Database Schema

Two tables store presentation data:

**presentations**
- id, slug, title, description
- category (training/marketing/internal)
- is_public (boolean)
- created_by, created_at, updated_at

**slides**
- id, presentation_id, order_index
- slide_type, title, content (JSON)
- speaker_notes
- background_type, background_value

---

## Files Created

```text
src/pages/
├── Presentations.tsx                    # Public gallery
└── PresentationViewer.tsx               # Full-screen viewer

src/components/presentations/
├── slides/
│   ├── TitleSlide.tsx
│   ├── PurposeSlide.tsx
│   ├── SectorOverviewSlide.tsx
│   ├── SectorDetailSlide.tsx
│   ├── LeadershipSlide.tsx
│   └── QuoteSlide.tsx
├── SlideFrame.tsx                       # Shared wrapper with organic background
├── SlideRenderer.tsx                    # Routes to correct slide type
├── PresentationControls.tsx             # Navigation buttons
├── PresentationProgress.tsx             # Progress bar
├── SpeakerNotes.tsx                     # Notes panel
└── PresentationExport.tsx               # PDF/PNG export

src/pages/portal/admin/presentations/
├── PresentationsManager.tsx
├── PresentationEditor.tsx
└── SlideEditor.tsx
```

---

## Routes Added

| Path | Purpose |
|------|---------|
| /presentations | Gallery of all public presentations |
| /presentations/30-day-execution-plan | The 30 Day Execution Plan deck |
| /presentations/:slug/embed | Embeddable iframe version |
| /portal/admin/presentations | Admin management (requires admin role) |

---

## The 16 Slides

### Slide 1 - Title
- **Type**: TitleSlide
- **Headline**: "30 Day Execution Plan" (DM Serif Display)
- **Subtitle**: "Leadership + Sectors + Execution Ownership" (Inter)
- **Footer**: "Internal Use" (small, muted)
- **Design**: Logo centered, coral underline accent, organic blob decorations

### Slide 2 - Purpose and Outcome
- **Type**: PurposeSlide
- **Heading**: "What this plan does"
- **Bullets** (with teal checkmark icons):
  - Standardize execution across all sectors
  - Clarify leadership ownership
  - Create a repeatable hiring + production engine
  - Drive consistent weekly performance for 30 days

### Slide 3 - Sectors Overview
- **Type**: SectorOverviewSlide
- **Heading**: "Our 4 Sectors"
- **Cards** (2x2 grid, rounded-3xl):
  - Home Depot (Store icon)
  - D2D / Event (Users icon)
  - Digital Direct (Monitor icon)
  - Retest / Referral (RefreshCw icon)

### Slides 4-7 - Sector Details
Each sector gets a dedicated slide with:
- Teal gradient header bar with sector name
- 4-5 bullet points describing the sector
- Organic blob decoration in corner

| Slide | Sector | Icon |
|-------|--------|------|
| 4 | Home Depot | Store |
| 5 | D2D / Event | MapPin |
| 6 | Digital Direct | Monitor |
| 7 | Retest / Referral | RefreshCw |

### Slides 8-15 - Leadership Ownership
Each leader gets a slide with:
- Name in large DM Serif Display
- Coral accent underline
- Responsibility bullets with Lucide icons
- Clean white/cream background

| Slide | Leader | Key Responsibilities |
|-------|--------|---------------------|
| 8 | Glover | Human Capital, Sales systems, Accountability, BackStop |
| 9 | Fox | Ops/Sales Synergy, High value recruiting, Resources, Incentives |
| 10 | Rucker | HD intake training, High value recruiting, Leadership development |
| 11 | Ryan | Digital Direct, Marketing Strategy, Retest/Referral, Tech support |
| 12 | Diamond | Recruiter, Sales leadership assistant, Supports Digital/HD |
| 13 | Josh M | Head of Field Sales (D2D), Self Gen Developer, Summer teams, NoCal/SoCal |
| 14 | Chris T | Head of Retesting/Referral, Works with field specialists |
| 15 | Eric K | HD southern region, Developing for SoCal sector |

### Slide 16 - Assignment Note
- **Type**: QuoteSlide
- **Heading**: "Leadership Assignments"
- **Quote**: "These are the leaders who I will be assigning these descriptions to."
- **Design**: Centered, decorative quote marks, coral accent

---

## Technical Implementation Details

### Keyboard Controls
| Key | Action |
|-----|--------|
| Right Arrow / Space | Next slide |
| Left Arrow | Previous slide |
| F | Toggle fullscreen |
| S | Toggle speaker notes |
| Escape | Exit fullscreen |

### Mobile Support
- Swipe left/right for navigation
- Tap edges to navigate
- Pinch-to-zoom disabled for consistent sizing

### Animations
All slides use framer-motion with:
- Fade + slide-up entrance (0.5s, ease-out)
- Cross-fade between slides (0.3s)
- Organic blob float animation on hover

### Security
- RLS policies: Only admin role can create/edit
- Public presentations viewable by anyone
- Internal presentations require authentication

---

## Implementation Phases

### Phase 1: Core Viewer (Day 1)
1. Create database tables (presentations + slides)
2. Build SlideFrame wrapper with brand styling
3. Build all 6 slide type components
4. Create PresentationViewer with keyboard/touch navigation
5. Add routes to App.tsx

### Phase 2: First Deck Content (Day 1)
1. Seed the "30 Day Execution Plan" presentation in database
2. Insert all 16 slides with proper content and speaker notes
3. Test navigation and animations

### Phase 3: Admin Builder (Day 2)
1. Create PresentationsManager list view
2. Build PresentationEditor for metadata
3. Build SlideEditor with live preview
4. Add drag-and-drop reordering

### Phase 4: Export (Day 2)
1. Add print CSS for PDF export
2. Implement "Download PDF" button
3. Add PNG slide export option

---

## Deliverables

| Item | Format | Description |
|------|--------|-------------|
| Web Presentation | URL | `/presentations/30-day-execution-plan` |
| PDF Export | Download | Single PDF with all 16 slides |
| PNG Slides | Download | 16 individual slide images |
| Admin Editor | Portal | Full CRUD for presentations |

---

## Subdomain Setup (When Ready)

Once built, you can add a subdomain like `internal.selectsourcewater.com`:

1. Go to Settings in Lovable
2. Navigate to Domains
3. Add `internal.selectsourcewater.com`
4. In your DNS, add A record pointing to `185.158.133.1`
5. Add TXT record for verification

The presentation will then be accessible at:
`https://internal.selectsourcewater.com/presentations/30-day-execution-plan`
