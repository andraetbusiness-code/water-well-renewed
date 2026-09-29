-- Web lead capture + SMS consent record.
--
-- Backs src/lib/leadSubmit.ts. Public lead forms POST to the GHL inbound
-- webhook first; this table is the backup and the durable consent record.
--
-- NOT APPLIED AUTOMATICALLY. Review, then run against the project.

create table if not exists public.web_lead_submissions (
  id                      uuid primary key default gen_random_uuid(),
  created_at              timestamptz not null default now(),

  form                    text not null,
  first_name              text not null,
  last_name               text,
  email                   text,
  phone                   text,
  address                 text,
  city                    text,
  postal_code             text,
  message                 text,
  preferred_contact_time  text,

  -- Consent record. sms_consent_text stores the exact wording shown at the
  -- moment of consent; a bare boolean proves nothing on its own.
  sms_consent             boolean not null default false,
  sms_consent_at          timestamptz,
  sms_consent_text        text,
  sms_consent_version     text,
  sms_consent_page        text,
  sms_consent_user_agent  text,

  -- Delivery audit
  webhook_delivered       boolean not null default false,
  webhook_error           text
);

create index if not exists web_lead_submissions_created_at_idx
  on public.web_lead_submissions (created_at desc);
create index if not exists web_lead_submissions_phone_idx
  on public.web_lead_submissions (phone) where phone is not null;

-- RLS: this table holds customer PII. The public site must be able to INSERT
-- and must NOT be able to read anything back.
alter table public.web_lead_submissions enable row level security;

drop policy if exists "anon can submit a lead" on public.web_lead_submissions;
create policy "anon can submit a lead"
  on public.web_lead_submissions
  for insert
  to anon, authenticated
  with check (true);

-- Deliberately NO select/update/delete policy for anon.
-- Staff reads go through an authenticated role or the service key.
