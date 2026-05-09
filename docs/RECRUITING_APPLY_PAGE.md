# SSW Recruiting Apply Page — Integration Guide

The recruiting application page lives at:

- Production: `https://selectsourcewaterusa.com/apply`
- Source: `src/pages/careers/ApplyPage.tsx`
- Submission helper: `src/lib/recruitingSubmit.ts`
- Routes: `/apply` and `/careers` (both render the same page)

## How URL Source Tracking Works

The page reads `source`, `market`, and `campaign` query params on load.

```
https://selectsourcewaterusa.com/apply?source=recruiting_source_indeed_free&market=orange_county&campaign=day1_indeed_oc
```

Captured values:

| Param      | Default if missing            |
| ---------- | ----------------------------- |
| `source`   | `recruiting_source_other`     |
| `market`   | `orange_county`               |
| `campaign` | `direct_unknown`              |

These are:
1. Stored as hidden `<input>` fields on the form
2. Included in the JSON payload sent to GHL
3. Used to build the `tags` array applied to the candidate's contact

## Tags Applied per Submission

```json
[
  "recruiting",
  "recruiting_new_applicant",
  "recruiting_market_orange_county",
  "recruiting_source_<whatever was in URL>"
]
```

If `source` is provided without the `recruiting_source_` prefix, it's prefixed automatically.

## What Gets Sent to GHL

POSTed as JSON to the webhook URL configured in `VITE_GHL_RECRUITING_WEBHOOK_URL`:

```json
{
  "first_name": "...",
  "last_name": "...",
  "email": "...",
  "phone": "...",
  "city": "...",
  "postal_code": "...",
  "candidate_source": "recruiting_source_indeed_free",
  "source_detail": "recruiting_source_indeed_free",
  "recruiting_market": "orange_county",
  "recruiting_campaign": "day1_indeed_oc",
  "candidate_city": "Anaheim",
  "candidate_zip": "92805",
  "in_orange_county": "yes",
  "commission_only_ok": "yes",
  "contractor_1099_ok": "yes",
  "homeowner_conversation_ok": "yes",
  "field_or_instore_ok": "yes",
  "transportation_ok": "yes",
  "valid_license_ok": "yes",
  "sales_experience": "1_to_2",
  "experience_detail": "...",
  "start_date_answer": "immediately",
  "motivation_answer": "...",
  "consent_contact": true,
  "consent_compliance": true,
  "page_url": "https://selectsourcewaterusa.com/apply?...",
  "submitted_at": "2026-05-08T00:00:00.000Z",
  "tags": ["recruiting", "recruiting_new_applicant", "recruiting_market_orange_county", "recruiting_source_indeed_free"]
}
```

## What Still Needs to Be Connected (GHL Setup)

In your GHL sub-account:

### 1. Create the GHL inbound webhook
- Go to **Automation > Workflows**
- Create a new workflow with trigger: **Inbound Webhook**
- Copy the webhook URL
- Paste it into the site env: `VITE_GHL_RECRUITING_WEBHOOK_URL=...`
- Add it as a GitHub Actions secret named `VITE_GHL_RECRUITING_WEBHOOK_URL` and update the deploy workflow to inject it (see "Adding the webhook URL" below)

### 2. Create custom fields in GHL
Create these as **Custom Fields > Contact**:

- Candidate Source
- Source Detail
- Recruiting Market
- Recruiting Campaign
- Candidate City
- Candidate ZIP
- In Orange County
- Commission Only OK
- Contractor 1099 OK
- Homeowner Conversation OK
- Field or In-Store OK
- Transportation OK
- Valid License OK
- Sales Experience
- Experience Detail
- Start Date Answer
- Motivation Answer
- Interview Status

### 3. In your workflow, add steps to:
- **Find / Create Contact** by email (or phone)
- **Update Contact** with all custom fields from the webhook payload
- **Add Tags** from `tags` array
- **Add to Pipeline** "SSW Recruiting Pipeline" → Stage "New Applicant"
- (Optional) Send confirmation SMS/email to applicant

### 4. Adding the webhook URL to deploys

Edit `.github/workflows/deploy-pages.yml` to inject the env var at build time:

```yaml
- run: npm run build
  env:
    VITE_GHL_RECRUITING_WEBHOOK_URL: ${{ secrets.VITE_GHL_RECRUITING_WEBHOOK_URL }}
```

Then add the secret in GitHub: **Settings > Secrets and variables > Actions > New repository secret**.

## Backup / Audit Trail

Every submission also writes to the existing Supabase `job_applications` table — even if the GHL webhook fails. This guarantees you never lose a candidate.

The full payload is JSON-stringified into the `message` column with a `webhook_delivered: true|false` flag so you can audit which ones made it to GHL.

## How to Test One Fake Applicant Safely

1. Build a tracking URL with a test source:
   ```
   https://selectsourcewaterusa.com/apply?source=recruiting_source_test&market=orange_county&campaign=qa_smoke_test
   ```
2. Open in incognito.
3. Fill out the form with **clearly fake data** (e.g., name "Test Applicant", email `qa+ssw@yourdomain.com`, phone `(714) 555-0100`).
4. Submit.
5. In GHL: filter contacts by tag `recruiting_source_test` to find your test record.
6. In Supabase: query `job_applications` ordered by `created_at desc` to see the row.
7. Delete the test record from GHL once verified.

Tip: set up a workflow filter in GHL to NOT send notifications when the tag `recruiting_source_test` is present — keeps the team's inbox clean during QA.

## Compliance Notes

The page is intentionally written to be:

- ✅ Commission-based / 1099 messaging is explicit
- ✅ "Authorized independent provider" language used
- ✅ "Pay structure and classification details reviewed during interview" disclosed
- ❌ No income guarantees
- ❌ No "Home Depot is hiring" implication
- ❌ No "Home Depot employee" claim
- ❌ No protected-class screening questions

The hero, role overview, and footer all repeat that SSW (not Home Depot) is the hiring entity.

## Tracking Link Generator

Use this template for all sourcing channels:

```
https://selectsourcewaterusa.com/apply?source={source_tag}&market=orange_county&campaign={campaign_id}
```

Example source_tag values:
- `recruiting_source_indeed_free`
- `recruiting_source_indeed_paid`
- `recruiting_source_facebook_ads`
- `recruiting_source_craigslist`
- `recruiting_source_referral`
- `recruiting_source_walk_in`
- `recruiting_source_zip_recruiter`
- `recruiting_source_linkedin`
- `recruiting_source_test` (QA only)
