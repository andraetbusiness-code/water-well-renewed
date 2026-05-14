# Select Source Water — Web App

Marketing site, recruiting portal, and internal admin portal for Select Source Water (SSW).

**Live:** [selectsourcewaterusa.com](https://selectsourcewaterusa.com)

## What's in here

- Marketing site (home, about, services, city pages, blog)
- `/apply` recruiting form (multi-region; routes to GHL workflow + Resend email alert)
- `/onboarding` field rep welcome guide
- `/portal/*` admin portal (Supabase Auth)
- Supabase Edge Functions (recruiting alert, infographic generator, etc.)

## Tech stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn-ui
- Supabase (Auth + Postgres + Edge Functions)
- GHL (CRM + recruiting workflow)
- Resend (transactional email)
- Deployed via GitHub Pages

## Local development

Requires Node.js and npm. Install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) if needed.

```sh
git clone https://github.com/andraetbusiness-code/water-well-renewed.git
cd water-well-renewed
npm install
npm run dev
```

The dev server runs on port 8080.

## Deployment

Pushes to `main` trigger the GitHub Actions workflow at `.github/workflows/deploy-pages.yml` which builds and deploys to GitHub Pages. The `apply` and `careers` routes are prerendered for HTTP 200 on direct page loads.

## Environment / secrets

GitHub Actions secrets used at build time:

- `VITE_GHL_RECRUITING_WEBHOOK_URL` — inbound webhook for the recruiting workflow
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` — set in `src/integrations/supabase/client.ts`

Supabase Edge Function secrets:

- `RESEND_API_KEY`
- `RECRUITING_ALERT_FROM_EMAIL`
- `RECRUITING_ALERT_TO_EMAIL` (comma-separated)

## Branch conventions

- `main` is always deployable
- Feature work happens on short-lived branches merged via PR
- Squash or standard merge; delete branch after merge
