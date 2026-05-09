# SSW Recruiting Apply Page — GHL Integration Ready Doc

**Status:** Page built on feature branch `recruiting-apply-page`. **NOT live yet.** Webhook URL connected and stored as GitHub secret. Awaiting merge approval and GHL workflow Publish.

**Apply URL (after merge):** https://selectsourcewaterusa.com/apply

**GHL Webhook URL (live, in GHL Draft mode):**
```
https://services.leadconnectorhq.com/hooks/MHBfuP1d3M2C7IssHXZD/webhook-trigger/4be33df8-be38-44c8-a1dd-9c27cb098a15
```

**Tracking link template:**
```
https://selectsourcewaterusa.com/apply?source={source_tag}&market=orange_county&campaign={campaign_id}
```

---

## 1. Form Field → GHL Custom Field Mapping

Every form field on the page maps cleanly to a GHL field. Field-key (snake_case) is what gets sent in the JSON payload. GHL field name is what you should name it inside GHL custom fields.

### Standard contact fields (built into GHL — no custom field needed)

| Form label   | Payload key   | GHL standard field |
| ------------ | ------------- | ------------------ |
| First name   | `first_name`  | First Name         |
| Last name    | `last_name`   | Last Name          |
| Phone        | `phone`       | Phone              |
| Email        | `email`       | Email              |
| City         | `city`        | City               |
| ZIP code     | `postal_code` | Postal Code        |

### Custom fields (create these in GHL → Settings → Custom Fields → Contact)

| Form question / source                                  | Payload key                  | GHL custom field name     | GHL field type       |
| ------------------------------------------------------- | ---------------------------- | ------------------------- | -------------------- |
| URL `?source=` param                                    | `candidate_source`           | Candidate Source          | Single Line          |
| URL `?source=` param (full string for audit)            | `source_detail`              | Source Detail             | Single Line          |
| URL `?market=` param                                    | `recruiting_market`          | Recruiting Market         | Single Line          |
| URL `?campaign=` param                                  | `recruiting_campaign`        | Recruiting Campaign       | Single Line          |
| Form: City                                              | `candidate_city`             | Candidate City            | Single Line          |
| Form: ZIP code                                          | `candidate_zip`              | Candidate ZIP             | Single Line          |
| "Are you in or near Orange County?"                     | `in_orange_county`           | In Orange County          | Single Line (yes/no/maybe) |
| "OK with commission-based pay?"                         | `commission_only_ok`         | Commission Only OK        | Single Line          |
| "OK with 1099 contractor?"                              | `contractor_1099_ok`         | Contractor 1099 OK        | Single Line          |
| "OK talking to homeowners / approaching people?"        | `homeowner_conversation_ok`  | Homeowner Conversation OK | Single Line          |
| "Open to in-person field sales / in-store lead gen?"    | `field_or_instore_ok`        | Field or In-Store OK      | Single Line          |
| "Reliable transportation?"                              | `transportation_ok`          | Transportation OK         | Single Line          |
| "Valid driver's license?"                               | `valid_license_ok`           | Valid License OK          | Single Line          |
| "Do you have sales experience?" (dropdown)              | `sales_experience`           | Sales Experience          | Single Line          |
| "What type of sales / customer-facing experience?"      | `experience_detail`          | Experience Detail         | Multi Line           |
| "How soon could you start?"                             | `start_date_answer`          | Start Date Answer         | Single Line          |
| "Why are you interested in this opportunity?"           | `motivation_answer`          | Motivation Answer         | Multi Line           |
| Required consent checkbox                               | `consent_contact`            | Consent Contact           | Checkbox / boolean   |
| Optional 1099/commission acknowledgment                 | `consent_compliance`         | Consent Compliance        | Checkbox / boolean   |
| Full URL of the apply page (with params)                | `page_url`                   | Page URL                  | Single Line          |
| ISO timestamp of submission                             | `submitted_at`               | Submitted At              | Date/Time            |
| **Set by recruiting team during pipeline progression**  | (not from form)              | Interview Status          | Single Line / Dropdown |

> **Interview Status** is the one custom field NOT auto-filled by the form — the recruiting team updates this manually as candidates progress (e.g., "Pending Review", "Phone Screen Scheduled", "Interview Booked", "Hired", "Passed").

### Possible values reference (for setting up GHL dropdowns if you prefer)

| Field                      | Possible values                                                         |
| -------------------------- | ----------------------------------------------------------------------- |
| `in_orange_county`         | `yes` / `no` / `maybe`                                                  |
| `commission_only_ok`       | `yes` / `no` / `maybe`                                                  |
| `contractor_1099_ok`       | `yes` / `no` / `maybe`                                                  |
| `homeowner_conversation_ok`| `yes` / `no` / `maybe`                                                  |
| `field_or_instore_ok`      | `yes` / `no` / `maybe`                                                  |
| `transportation_ok`        | `yes` / `no` / `maybe`                                                  |
| `valid_license_ok`         | `yes` / `no` / `maybe`                                                  |
| `sales_experience`         | `none` / `less_than_1` / `1_to_2` / `3_to_5` / `5_plus`                 |
| `start_date_answer`        | `immediately` / `within_week` / `within_2_weeks` / `within_month` / `later` |

---

## 2. Exact Webhook Payload Structure

The page sends a single JSON POST to `VITE_GHL_RECRUITING_WEBHOOK_URL` with this exact shape:

```json
{
  "first_name": "Test",
  "last_name": "Applicant",
  "email": "qa+ssw@example.com",
  "phone": "(714) 555-0100",
  "city": "Anaheim",
  "postal_code": "92805",

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
  "experience_detail": "2 years D2D solar in OC market",
  "start_date_answer": "within_week",
  "motivation_answer": "Want a real career path in sales with strong commission upside.",

  "consent_contact": true,
  "consent_compliance": true,

  "page_url": "https://selectsourcewaterusa.com/apply?source=recruiting_source_indeed_free&market=orange_county&campaign=day1_indeed_oc",
  "submitted_at": "2026-05-08T17:11:00.000Z",

  "tags": [
    "recruiting",
    "recruiting_new_applicant",
    "recruiting_market_orange_county",
    "recruiting_source_indeed_free"
  ]
}
```

**Headers:** `Content-Type: application/json`
**Method:** `POST`
**No auth** required by the GHL inbound webhook — the URL itself is the secret.

---

## 3. Tags Applied on Every Submission

The `tags_to_apply` array in the payload contains exactly these tags (always 5):

| Tag                                         | Source                                              |
| ------------------------------------------- | --------------------------------------------------- |
| `recruiting`                                | Hardcoded on every submission                       |
| `recruiting_new_applicant`                  | Hardcoded on every submission                       |
| `recruiting_market_orange_county`           | Built from URL `market` param (default `orange_county`) |
| `recruiting_source_<source_tag>`            | Built from URL `source` param                       |
| `recruiting_legal_review_required`          | Hardcoded on every submission                       |

**Source tag normalization:**
- If URL has `?source=recruiting_source_indeed_free` → tag is `recruiting_source_indeed_free`
- If URL has `?source=indeed_free` (no prefix) → tag is auto-prefixed to `recruiting_source_indeed_free`
- If URL has no `?source=` → tag is `recruiting_source_other`

**Test source tag (for QA):**
- URL: `?source=recruiting_source_test` → tag `recruiting_source_test`

In GHL, your workflow's "Add Tags" step should reference the `tags` array directly (or hardcode the 3 known tags + dynamically add the source tag from the payload).

---

## 4. Pipeline Placement Confirmation

Every new submission is intended to enter:

- **Pipeline:** `SSW Recruiting Pipeline`
- **Stage:** `New Applicant`

This is set by the GHL workflow (not the webhook payload). Add an "Add to Pipeline" step in your inbound webhook workflow with these exact values.

---

## 5. Supabase Backup — Confirmed Active

**Yes, Supabase backup will still store every submission.** This is unchanged and not removed.

**How it works:**
1. The page first POSTs to the GHL webhook
2. The page **then** writes to Supabase `job_applications` table — **regardless of whether GHL succeeds or fails**
3. The Supabase row's `message` column stores the full JSON payload plus a `webhook_delivered: true|false` audit flag
4. If GHL is down, the user still sees a success message (Supabase row exists), and you can replay the submission to GHL later from the Supabase audit row

**To audit which submissions reached GHL:**
```sql
SELECT first_name, last_name, email, created_at,
       (message::jsonb)->>'webhook_delivered' AS delivered_to_ghl,
       (message::jsonb)->>'recruiting_campaign' AS campaign
FROM job_applications
ORDER BY created_at DESC
LIMIT 50;
```

---

## 6. GitHub Secret + Env Setup for `VITE_GHL_RECRUITING_WEBHOOK_URL`

### Step 1 — Add the secret in GitHub
1. Go to: https://github.com/andraetbusiness-code/water-well-renewed/settings/secrets/actions
2. Click **New repository secret**
3. **Name:** `VITE_GHL_RECRUITING_WEBHOOK_URL`
4. **Value:** Paste the full GHL inbound webhook URL (e.g. `https://services.leadconnectorhq.com/hooks/...`)
5. Click **Add secret**

### Step 2 — Inject the secret at build time

Add **3 lines** to `.github/workflows/deploy-pages.yml` under the `npm run build` step.

**Current build step (lines 27–28 of the workflow):**
```yaml
      - run: npm run build
```

**Proposed update (one logical change, env block added):**
```yaml
      - run: npm run build
        env:
          VITE_GHL_RECRUITING_WEBHOOK_URL: ${{ secrets.VITE_GHL_RECRUITING_WEBHOOK_URL }}
```

That's the entire change. Vite picks up `VITE_*` env vars automatically and inlines them into the build at compile time.

> **Local dev:** for local testing only, you can put the same line in a `.env.local` file at the project root. Do not commit `.env.local` (already in `.gitignore`).

---

## 7. QA Checklist — One Fake Applicant Test

**Order: do these IN ORDER and don't skip steps.**

### Pre-test setup (in GHL)

- [ ] All 19 custom fields from the table above are created in GHL
- [ ] `SSW Recruiting Pipeline` exists with stage `New Applicant`
- [ ] Inbound webhook workflow is built (find/create contact → set fields → add tags → add to pipeline)
- [ ] **Workflow filter added: skip all SMS/email actions when tag `recruiting_source_test` is present** ← critical so the test applicant does NOT get real outreach
- [ ] GHL webhook URL is added to GitHub repo as `VITE_GHL_RECRUITING_WEBHOOK_URL`
- [ ] Workflow `.github/workflows/deploy-pages.yml` has been updated with the env block (still on feature branch — not yet merged)

### Pre-test setup (in repo)

- [ ] Tell me the GHL webhook URL is ready, and I'll add the workflow env line on the feature branch
- [ ] Merge `recruiting-apply-page` → `main` (this triggers deploy)
- [ ] Confirm the deploy completed: visit https://selectsourcewaterusa.com/apply and see the new page

### The actual test

- [ ] Open in **incognito window** (so no cookies/cache from your real session)
- [ ] Visit:
      ```
      https://selectsourcewaterusa.com/apply?source=recruiting_source_test&market=orange_county&campaign=qa_smoke_test
      ```
- [ ] Open DevTools → Console tab (so you can see any errors)
- [ ] Open DevTools → Network tab, filter to `Fetch/XHR`, check "Preserve log"
- [ ] Fill out the form with **clearly fake data**:
      - First name: `Test`
      - Last name: `Applicant`
      - Phone: `(714) 555-0100`
      - Email: `qa+ssw@yourdomain.com` (use a +alias on a real inbox you control)
      - City: `Anaheim`
      - ZIP: `92805`
      - All qualification questions: `Yes`
      - Sales experience: `1–2 years`
      - Experience detail: `QA smoke test — please ignore`
      - Start date: `Immediately`
      - Motivation: `QA smoke test`
      - Both consent boxes: checked
- [ ] Submit
- [ ] Verify the thank-you page renders
- [ ] In Network tab, confirm:
      - The POST to the GHL webhook URL returned `200 OK` (or `2xx`)
      - The Supabase insert returned success (no red row)
- [ ] In GHL: filter contacts by tag `recruiting_source_test` → confirm the test contact exists with all fields populated correctly
- [ ] In GHL: confirm the contact is on `SSW Recruiting Pipeline → New Applicant`
- [ ] In GHL: **confirm no SMS/email was sent** (the test source filter should have blocked it)
- [ ] In Supabase: query the `job_applications` table — confirm the row exists with `webhook_delivered: true` in the message column

### Post-test cleanup

- [ ] In GHL: delete the test contact (filter by tag `recruiting_source_test`, select all, delete)
- [ ] In Supabase: optionally delete the test row:
      ```sql
      DELETE FROM job_applications WHERE email = 'qa+ssw@yourdomain.com' AND first_name = 'Test';
      ```
- [ ] Mark QA complete and approve live for real candidates

---

## 8. Filtering / Deleting Test Applicants

### In GHL
1. Go to **Contacts**
2. Click **Filters** → **Tags** → select `recruiting_source_test`
3. Apply filter → all test contacts appear
4. Select all → **Bulk Action** → **Delete**

> Permanent rule: **always** include `?source=recruiting_source_test` in any test URL. That single tag is your audit / cleanup mechanism.

### In Supabase
```sql
-- Find all test submissions
SELECT * FROM job_applications
WHERE message::jsonb->>'candidate_source' = 'recruiting_source_test'
ORDER BY created_at DESC;

-- Delete them
DELETE FROM job_applications
WHERE message::jsonb->>'candidate_source' = 'recruiting_source_test';
```

---

## 9. What Happens Next (Sequencing)

You're at step 1 of 6:

1. **You build the GHL webhook + workflow + custom fields** (in your GHL Orange County sub-account)
2. **You give me the webhook URL** (or add it to the GitHub secret yourself, then tell me it's added)
3. **I add the 3-line env block** to `.github/workflows/deploy-pages.yml` on the `recruiting-apply-page` branch
4. **You approve merge** → I merge `recruiting-apply-page` → `main` → site auto-deploys
5. **You run the QA test** with the fake applicant URL
6. **You give final go-ahead** → start sending real candidates

**At no point** between now and step 5 will any real candidate hit the live page or trigger live SMS workflows. The test source filter (`recruiting_source_test`) is your safety net during step 5.

---

## 10. Compliance Reaffirmed

The page already enforces:
- Commission-based / 1099 language in hero, role overview, consent, footer
- "Authorized independent provider" + "in-store lead generation/sales program" wording
- Required contact-consent checkbox with TCPA-style language
- "Pay structure and classification details reviewed during the interview process"
- No income guarantees, no "easy money", no Home Depot employment claims, no protected-class screening

No copy changes needed before launch.

---

## Apply URL Reference (canonical)

- **Live page (after merge):** https://selectsourcewaterusa.com/apply
- **Tracking link template:** `https://selectsourcewaterusa.com/apply?source={source_tag}&market=orange_county&campaign={campaign_id}`
- **Test link:** `https://selectsourcewaterusa.com/apply?source=recruiting_source_test&market=orange_county&campaign=qa_smoke_test`

Domain `selectsourcewatercalifornia.com` is **not used**. Only `selectsourcewaterusa.com`.
