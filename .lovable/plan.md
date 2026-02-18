

## Sales Rep Job Application Subdomain

Create a new `careers` subdomain with a polished landing page that introduces the company and collects job applications from prospective sales reps. Applications are saved to the backend database.

### What the Applicant Sees

**Section 1 -- Hero / Company Intro**
- SSW logo and headline: "Join Select Source Water"
- Subheadline about the opportunity (Home Depot partnership, Sacramento market, earning potential)
- Brief "Why Work With Us" section with 4-5 benefit cards (e.g., uncapped earnings, training provided, Home Depot foot traffic, team support, growth path)

**Section 2 -- Application Form**
- Fields: First Name, Last Name, Email, Phone, City, Sales Experience (dropdown: None / 1-2 years / 3-5 years / 5+), "Why do you want to join?" (textarea)
- Submit button with loading state
- Success confirmation message after submission

### Backend

**New database table: `job_applications`**
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, auto-generated |
| first_name | text | required |
| last_name | text | required |
| email | text | required |
| phone | text | required |
| city | text | optional |
| experience | text | dropdown value |
| message | text | "why join" textarea |
| status | text | default "new" |
| created_at | timestamptz | auto |

**RLS Policies:**
- Anonymous users can INSERT (public form, no auth required)
- Admins can SELECT, UPDATE, DELETE (to review applications in the portal)

### Routing

- New subdomain detection: `careers` in `App.tsx`
- New `CareersRoutes` component rendering the application page at `/`
- New file: `src/pages/careers/ApplyPage.tsx`

### Technical Details

- **New file:** `src/pages/careers/ApplyPage.tsx` -- standalone page with hero + form, uses framer-motion for polish (same pattern as HygiaPlusDemo)
- **Modified file:** `src/App.tsx` -- add `isCareersSubdomain` detection + `CareersRoutes` component
- **Database migration:** create `job_applications` table with RLS policies allowing anonymous inserts
- **Form validation:** zod schema for client-side validation before insert
- **No auth required** -- this is a public-facing application form
- Uses existing logo asset and brand colors (primary blue gradient)

