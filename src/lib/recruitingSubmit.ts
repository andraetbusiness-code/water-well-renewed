/**
 * Recruiting application submission helper.
 *
 * Sends candidate data to:
 *   1. GoHighLevel (GHL) — primary destination (via webhook URL set in env)
 *   2. Supabase (job_applications table) — backup / audit trail
 *
 * Configure the GHL webhook URL by setting:
 *   VITE_GHL_RECRUITING_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/...
 *
 * If no webhook URL is set, submissions fall back to Supabase only and a console
 * warning is logged. The page never breaks for the candidate.
 *
 * Payload schema is locked to the GHL inbound webhook trigger's mapping reference.
 * See docs/GHL_INTEGRATION_READY.md for the full field mapping table.
 */
import { supabase } from "@/integrations/supabase/client";
import type { MarketId } from "@/lib/recruitingMarkets";
import { MARKETS, resolvePrimaryMarketId } from "@/lib/recruitingMarkets";
import { JOB_LISTINGS } from "@/data/careers";

/* ---------------------------------------------------------------------------
   Internal answer type — what the form collects (yes / no / maybe)
   ------------------------------------------------------------------------- */
export type YesNoMaybe = "yes" | "no" | "maybe";

/* ---------------------------------------------------------------------------
   What the form passes to submitRecruitingApplication() before normalization.
   ------------------------------------------------------------------------- */
export interface RecruitingFormInput {
  // Standard contact
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: string;
  postal_code: string;

  // NEW: which SoCal regions the candidate is willing to work
  // (multi-select on the form: orange_county, inland_empire, coachella_valley)
  selected_markets: MarketId[];

  // Which posting they applied to (careers slug, e.g. "water-testing-specialist")
  role: string;

  // Qualification answers (raw form values: yes / no / maybe)
  in_socal: YesNoMaybe;
  w2_pay_ok: YesNoMaybe;
  homeowner_conversation_ok: YesNoMaybe;
  field_or_instore_ok: YesNoMaybe;
  transportation_ok: YesNoMaybe;
  valid_license_ok: YesNoMaybe;

  // Experience / motivation
  sales_experience: string;
  /** Retired free-text field. Always "" now — kept so the GHL mapping is stable. */
  experience_detail: string;
  /** Supabase Storage path of the uploaded resume, or "" if none. */
  resume_url: string;
  start_date_answer: string;
  motivation_answer: string;
  motivation_other: string;

  // Consent
  consent_contact: boolean; // required TCPA-style consent

  // Tracking (from URL)
  source: string; // e.g. "recruiting_source_indeed_free"
  market: string; // "orange_county" | "inland_empire" | "coachella_valley" | etc. — URL-supplied
  campaign: string; // e.g. "day1_indeed_oc"
  page_url: string;
}

/* ---------------------------------------------------------------------------
   What we POST to the GHL inbound webhook.
   Matches the schema mapped inside the GHL workflow's Mapping Reference.
   ------------------------------------------------------------------------- */
export interface GhlWebhookPayload {
  // Standard contact
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: string;
  postal_code: string;

  // Tracking — top-level (matches GHL mapping)
  source: string;
  market: string;
  campaign: string;
  candidate_source: string;
  source_detail: string;
  recruiting_market: string;
  recruiting_campaign: string;
  candidate_city: string;
  candidate_zip: string;

  // Qualification answers — capitalized "Yes" / "No" / "Maybe" for GHL
  in_orange_county: "Yes" | "No" | "Maybe"; // legacy field kept for GHL mapping back-compat
  in_socal: "Yes" | "No" | "Maybe";
  selected_markets: string; // comma-separated market ids for GHL field display
  selected_markets_labels: string; // comma-separated human-readable labels
  w2_pay_ok: "Yes" | "No" | "Maybe";
  homeowner_conversation_ok: "Yes" | "No" | "Maybe";
  field_or_instore_ok: "Yes" | "No" | "Maybe";
  transportation_ok: "Yes" | "No" | "Maybe";
  valid_license_ok: "Yes" | "No" | "Maybe";

  // Role applied for
  role: string;
  role_label: string;

  // Experience
  sales_experience: string;
  experience_detail: string;
  resume_url: string;
  start_date_answer: string;
  motivation_answer: string;
  motivation_other: string;

  // TCPA consent
  tcpa_consent: boolean;
  tcpa_consent_timestamp: string; // ISO 8601 — when the user actually submitted with box checked
  /**
   * Retired. The standalone "I understand this is a W2 position at $20-$50/hour"
   * checkbox was removed because the compensation question in the qualification
   * section now states the pay for the selected role and captures the answer in
   * `w2_pay_ok`. This is always false and is kept only so the existing GHL field
   * mapping does not break. `w2_pay_ok` is the acknowledgment signal now.
   */
  consent_compliance: boolean;

  // Metadata
  page_url: string;
  submitted_at: string;

  // Tags (5 tags including legal review)
  tags_to_apply: string[];
}

/* ---------------------------------------------------------------------------
   Helpers
   ------------------------------------------------------------------------- */
function capitalize(v: YesNoMaybe): "Yes" | "No" | "Maybe" {
  if (v === "yes") return "Yes";
  if (v === "no") return "No";
  return "Maybe";
}

/**
 * Normalize the URL `source` value to a tag-safe slug, then build the dynamic
 * source tag. If the URL value already starts with `recruiting_source_`, use
 * it as-is. Otherwise, prefix it. If empty, fall back to `recruiting_source_other`.
 */
export function buildSourceTag(rawSource: string): string {
  const trimmed = (rawSource || "").trim();
  if (!trimmed) return "recruiting_source_other";
  if (trimmed.startsWith("recruiting_source_")) return trimmed;
  return `recruiting_source_${trimmed}`;
}

function roleLabel(slug: string): string {
  return JOB_LISTINGS.find((j) => j.slug === slug)?.title ?? slug;
}

function buildTags(
  source: string,
  primaryMarket: string,
  selectedMarkets: MarketId[],
  role: string
): string[] {
  // Always-present primary market tag (back-compat with existing GHL pipeline)
  const tags: string[] = [
    "recruiting",
    "recruiting_new_applicant",
    `recruiting_market_${primaryMarket}`,
    buildSourceTag(source),
    "recruiting_legal_review_required",
  ];

  // Add a `recruiting_works_<market>` tag for every region the candidate selected.
  // Additive: existing GHL filters/automations are untouched.
  for (const m of selectedMarkets) {
    const t = `recruiting_works_${m}`;
    if (!tags.includes(t)) tags.push(t);
  }

  // Role tag so Sierra can filter the pipeline by posting.
  if (role) tags.push(`recruiting_role_${role.replace(/-/g, "_")}`);

  return tags;
}

function marketLabels(ids: MarketId[]): string {
  return ids
    .map((id) => MARKETS.find((m) => m.id === id)?.label ?? id)
    .join(", ");
}

/* ---------------------------------------------------------------------------
   Submission
   ------------------------------------------------------------------------- */
const WEBHOOK_URL = import.meta.env.VITE_GHL_RECRUITING_WEBHOOK_URL as
  | string
  | undefined;

export async function submitRecruitingApplication(
  input: RecruitingFormInput
): Promise<{ ok: boolean; error?: string }> {
  const submittedAt = new Date().toISOString();
  const consentTimestamp = input.consent_contact ? submittedAt : "";

  // Primary market = URL ?market= if recognized, else first selected, else orange_county
  const primaryMarket = resolvePrimaryMarketId(
    input.market,
    input.selected_markets
  );

  // Back-compat: if candidate selected Orange County (in any combination), surface
  // a Yes for the legacy `in_orange_county` GHL field. Otherwise No.
  const inOrangeCountyForGhl: "Yes" | "No" | "Maybe" =
    input.selected_markets.includes("orange_county") ? "Yes" : "No";

  const selectedMarketsCsv = input.selected_markets.join(",");
  const selectedMarketsLabelsCsv = marketLabels(input.selected_markets);

  const payload: GhlWebhookPayload = {
    // Standard contact
    first_name: input.first_name,
    last_name: input.last_name,
    email: input.email,
    phone: input.phone,
    city: input.city,
    postal_code: input.postal_code,

    // Tracking
    source: input.source,
    market: primaryMarket,
    campaign: input.campaign,
    candidate_source: input.source,
    source_detail: input.source,
    recruiting_market: primaryMarket,
    recruiting_campaign: input.campaign,
    candidate_city: input.city,
    candidate_zip: input.postal_code,

    // Qualification — capitalized for GHL
    in_orange_county: inOrangeCountyForGhl,
    in_socal: capitalize(input.in_socal),
    selected_markets: selectedMarketsCsv,
    selected_markets_labels: selectedMarketsLabelsCsv,
    w2_pay_ok: capitalize(input.w2_pay_ok),
    homeowner_conversation_ok: capitalize(input.homeowner_conversation_ok),
    field_or_instore_ok: capitalize(input.field_or_instore_ok),
    transportation_ok: capitalize(input.transportation_ok),
    valid_license_ok: capitalize(input.valid_license_ok),

    // Role
    role: input.role,
    role_label: roleLabel(input.role),

    // Experience
    sales_experience: input.sales_experience,
    experience_detail: input.experience_detail,
    resume_url: input.resume_url,
    start_date_answer: input.start_date_answer,
    motivation_answer: input.motivation_answer,
    motivation_other: input.motivation_other,

    // Consent
    tcpa_consent: input.consent_contact === true,
    tcpa_consent_timestamp: consentTimestamp,
    consent_compliance: false,

    // Metadata
    page_url: input.page_url,
    submitted_at: submittedAt,

    // Tags
    tags_to_apply: buildTags(
      input.source,
      primaryMarket,
      input.selected_markets,
      input.role
    ),
  };

  // Fire GHL webhook and the independent email alert IN PARALLEL.
  // Each one is best-effort; failures are recorded for the Supabase audit row
  // but do not block the candidate's success state.

  const ghlPromise: Promise<{ ok: boolean; error?: string }> = (async () => {
    if (!WEBHOOK_URL) {
      // eslint-disable-next-line no-console
      console.warn(
        "[recruiting] VITE_GHL_RECRUITING_WEBHOOK_URL not configured. Submission saved to Supabase only."
      );
      return { ok: false, error: "GHL webhook URL not configured" };
    }
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) return { ok: true };
      return { ok: false, error: `GHL webhook returned ${res.status}` };
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : "Webhook failed",
      };
    }
  })();

  // Independent backup alert via Supabase Edge Function -> Resend -> Gmail.
  // Runs whether or not GHL succeeds; uses its own test-safety gate.
  const alertPromise: Promise<{ ok: boolean; error?: string }> = (async () => {
    try {
      const { data, error } = await supabase.functions.invoke(
        "recruiting-alert",
        { body: payload }
      );
      if (error) return { ok: false, error: error.message };
      // Edge function may return ok=true with skipped="test_submission" — still ok.
      if (data && typeof data === "object" && "ok" in data && !data.ok) {
        return {
          ok: false,
          error: "alert function returned ok:false",
        };
      }
      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : "alert invoke failed",
      };
    }
  })();

  const [ghlResult, alertResult] = await Promise.all([ghlPromise, alertPromise]);
  const webhookOk = ghlResult.ok;
  const webhookError = ghlResult.error;
  const alertOk = alertResult.ok;
  const alertError = alertResult.error;

  // Always store in Supabase as the authoritative audit trail.
  let supabaseOk = false;
  let supabaseError: string | undefined;
  try {
    const { error } = await supabase.from("job_applications" as any).insert({
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      phone: payload.phone,
      city: payload.city || null,
      experience: payload.sales_experience || null,
      position: payload.role_label || null,
      message: JSON.stringify({
        ...payload,
        webhook_delivered: webhookOk,
        webhook_error: webhookError ?? null,
        alert_delivered: alertOk,
        alert_error: alertError ?? null,
      }),
    });
    if (error) {
      supabaseError = error.message;
    } else {
      supabaseOk = true;
    }
  } catch (err) {
    supabaseError =
      err instanceof Error ? err.message : "Supabase insert failed";
  }

  if (webhookOk || supabaseOk || alertOk) {
    return { ok: true };
  }
  return {
    ok: false,
    error: webhookError || alertError || supabaseError || "Submission failed",
  };
}

/**
 * Upload an applicant's resume to Supabase Storage.
 *
 * ⚠️ PREREQUISITE — NOT DONE YET: a public-insert Storage bucket named
 * `resumes` must exist in the Supabase project (hmkuohrgblvoznbxbtpl), which is
 * a Lovable Cloud project reachable only via Lovable -> More -> Cloud.
 * Until that bucket exists this call fails and returns ok:false. The apply flow
 * treats that as non-fatal: the application still submits, just without a file.
 *
 * Bucket policy required: anon INSERT allowed, anon SELECT denied. Resumes carry
 * names, addresses, and phone numbers — a public-read bucket would expose every
 * applicant's resume to anyone who can guess a path.
 */
export async function uploadResume(
  file: File,
  email: string
): Promise<{ ok: true; path: string } | { ok: false; error: string }> {
  try {
    const ext = (file.name.split(".").pop() || "pdf").toLowerCase();
    const safeEmail = email.replace(/[^a-z0-9]/gi, "_").slice(0, 60);
    const stamp = Date.now();
    const path = `applications/${stamp}_${safeEmail}.${ext}`;

    const { error } = await supabase.storage.from("resumes").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || undefined,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true, path };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Resume upload failed",
    };
  }
}

/**
 * Read URL parameters with safe defaults.
 * Used both for capturing source tracking and for default form values.
 */
export function readRecruitingParams(searchParams: URLSearchParams) {
  const source = searchParams.get("source") || "recruiting_source_other";
  // No longer default market to orange_county — leave empty so the form prompts
  // the candidate to pick one or more. If a known market id is in the URL, it
  // pre-selects that market in the form and drives the hero copy.
  const market = searchParams.get("market") || "";
  const campaign = searchParams.get("campaign") || "direct_unknown";
  return { source, market, campaign };
}
