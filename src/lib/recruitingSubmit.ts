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

  // Qualification answers (raw form values: yes / no / maybe)
  in_socal: YesNoMaybe;
  commission_only_ok: YesNoMaybe;
  contractor_1099_ok: YesNoMaybe;
  homeowner_conversation_ok: YesNoMaybe;
  field_or_instore_ok: YesNoMaybe;
  transportation_ok: YesNoMaybe;
  valid_license_ok: YesNoMaybe;

  // Experience / motivation
  sales_experience: string;
  experience_detail: string;
  start_date_answer: string;
  motivation_answer: string;

  // Consent
  consent_contact: boolean; // required TCPA-style consent
  consent_compliance: boolean; // optional 1099/commission acknowledgment

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
  commission_only_ok: "Yes" | "No" | "Maybe";
  contractor_1099_ok: "Yes" | "No" | "Maybe";
  door_knocking_ok: "Yes" | "No" | "Maybe"; // derived: field+homeowner combined
  homeowner_conversation_ok: "Yes" | "No" | "Maybe";
  field_or_instore_ok: "Yes" | "No" | "Maybe";
  transportation_ok: "Yes" | "No" | "Maybe";
  valid_license_ok: "Yes" | "No" | "Maybe";

  // Experience
  sales_experience: string;
  experience_detail: string;
  start_date_answer: string;
  motivation_answer: string;

  // TCPA consent
  tcpa_consent: boolean;
  tcpa_consent_timestamp: string; // ISO 8601 — when the user actually submitted with box checked
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
 * Derive `door_knocking_ok` from the two related form questions:
 * "homeowner_conversation_ok" AND "field_or_instore_ok".
 * The candidate is "OK with door knocking" only if BOTH are yes.
 * Most-negative wins: any "no" → No. Otherwise "Maybe".
 */
function deriveDoorKnockingOk(
  homeowner: YesNoMaybe,
  field: YesNoMaybe
): "Yes" | "No" | "Maybe" {
  if (homeowner === "no" || field === "no") return "No";
  if (homeowner === "yes" && field === "yes") return "Yes";
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

function buildTags(
  source: string,
  primaryMarket: string,
  selectedMarkets: MarketId[]
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
    commission_only_ok: capitalize(input.commission_only_ok),
    contractor_1099_ok: capitalize(input.contractor_1099_ok),
    door_knocking_ok: deriveDoorKnockingOk(
      input.homeowner_conversation_ok,
      input.field_or_instore_ok
    ),
    homeowner_conversation_ok: capitalize(input.homeowner_conversation_ok),
    field_or_instore_ok: capitalize(input.field_or_instore_ok),
    transportation_ok: capitalize(input.transportation_ok),
    valid_license_ok: capitalize(input.valid_license_ok),

    // Experience
    sales_experience: input.sales_experience,
    experience_detail: input.experience_detail,
    start_date_answer: input.start_date_answer,
    motivation_answer: input.motivation_answer,

    // Consent
    tcpa_consent: input.consent_contact === true,
    tcpa_consent_timestamp: consentTimestamp,
    consent_compliance: input.consent_compliance === true,

    // Metadata
    page_url: input.page_url,
    submitted_at: submittedAt,

    // Tags
    tags_to_apply: buildTags(
      input.source,
      primaryMarket,
      input.selected_markets
    ),
  };

  let webhookOk = false;
  let webhookError: string | undefined;

  // 1. POST to GHL webhook if configured
  if (WEBHOOK_URL) {
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      webhookOk = res.ok;
      if (!res.ok) {
        webhookError = `GHL webhook returned ${res.status}`;
      }
    } catch (err) {
      webhookError = err instanceof Error ? err.message : "Webhook failed";
    }
  } else {
    // eslint-disable-next-line no-console
    console.warn(
      "[recruiting] VITE_GHL_RECRUITING_WEBHOOK_URL not configured. Submission saved to Supabase only."
    );
  }

  // 2. Always store in Supabase as a backup / audit trail
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
      message: JSON.stringify({
        ...payload,
        webhook_delivered: webhookOk,
        webhook_error: webhookError ?? null,
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

  if (webhookOk || supabaseOk) {
    return { ok: true };
  }
  return {
    ok: false,
    error: webhookError || supabaseError || "Submission failed",
  };
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
