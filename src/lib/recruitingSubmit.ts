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
 */
import { supabase } from "@/integrations/supabase/client";

export interface RecruitingPayload {
  // Standard contact fields
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: string;
  postal_code: string;

  // Custom recruiting fields
  candidate_source: string;
  source_detail: string;
  recruiting_market: string;
  recruiting_campaign: string;
  candidate_city: string;
  candidate_zip: string;

  in_orange_county: string;
  commission_only_ok: string;
  contractor_1099_ok: string;
  homeowner_conversation_ok: string;
  field_or_instore_ok: string;
  transportation_ok: string;
  valid_license_ok: string;

  sales_experience: string;
  experience_detail: string;
  start_date_answer: string;
  motivation_answer: string;

  consent_contact: boolean;
  consent_compliance: boolean;

  // Tracking metadata
  page_url: string;
  submitted_at: string;
  tags: string[];
}

const WEBHOOK_URL = import.meta.env.VITE_GHL_RECRUITING_WEBHOOK_URL as
  | string
  | undefined;

export async function submitRecruitingApplication(
  payload: RecruitingPayload
): Promise<{ ok: boolean; error?: string }> {
  let webhookOk = false;
  let webhookError: string | undefined;

  // 1. Send to GHL webhook if configured
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
        recruiting_market: payload.recruiting_market,
        candidate_source: payload.candidate_source,
        recruiting_campaign: payload.recruiting_campaign,
        candidate_zip: payload.candidate_zip,
        in_orange_county: payload.in_orange_county,
        commission_only_ok: payload.commission_only_ok,
        contractor_1099_ok: payload.contractor_1099_ok,
        homeowner_conversation_ok: payload.homeowner_conversation_ok,
        field_or_instore_ok: payload.field_or_instore_ok,
        transportation_ok: payload.transportation_ok,
        valid_license_ok: payload.valid_license_ok,
        experience_detail: payload.experience_detail,
        start_date_answer: payload.start_date_answer,
        motivation_answer: payload.motivation_answer,
        consent_contact: payload.consent_contact,
        consent_compliance: payload.consent_compliance,
        page_url: payload.page_url,
        submitted_at: payload.submitted_at,
        tags: payload.tags,
        webhook_delivered: webhookOk,
      }),
    });
    if (error) {
      supabaseError = error.message;
    } else {
      supabaseOk = true;
    }
  } catch (err) {
    supabaseError = err instanceof Error ? err.message : "Supabase insert failed";
  }

  // Success if either path worked
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
  const market = searchParams.get("market") || "orange_county";
  const campaign = searchParams.get("campaign") || "direct_unknown";
  return { source, market, campaign };
}
