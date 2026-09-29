/**
 * Customer lead submission helper.
 *
 * Mirrors the proven recruiting pipeline in `src/lib/recruitingSubmit.ts`:
 *   1. GoHighLevel (GHL) — primary destination, via inbound webhook URL from env
 *   2. Supabase (`web_lead_submissions` table) — backup / audit trail
 *
 * Configure the GHL webhook URL by setting:
 *   VITE_GHL_LEAD_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/...
 *
 * If no webhook URL is set, submissions fall back to Supabase only and a console
 * warning is logged. If Supabase also fails, the caller is told honestly so the
 * page can show an error and a phone number rather than a false thank-you.
 *
 * WHY THIS EXISTS: before this module, both public lead forms called
 * setTimeout() and showed a success toast without sending anything anywhere.
 */
import { supabase } from "@/integrations/supabase/client";

/* ---------------------------------------------------------------------------
   SMS consent — single source of truth.

   This exact string is BOTH rendered next to the checkbox AND stored with the
   submission. Storing the wording the user actually saw is what makes the
   consent record defensible later; a stored boolean on its own proves nothing.

   COMPLIANCE NOTE: this wording has not been reviewed by counsel. Have a lawyer
   approve it before the site goes public.
   ------------------------------------------------------------------------- */
export const SMS_CONSENT_VERSION = "2026-09-28.v1";

export const SMS_CONSENT_TEXT =
  "I agree to receive text messages from Select Source Water about my water test, " +
  "appointment scheduling, and related service updates at the number provided, " +
  "including messages sent using automated technology. Consent is not a condition " +
  "of purchase. Message frequency varies. Message and data rates may apply. " +
  "Reply STOP to opt out or HELP for help.";

export interface LeadFormInput {
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  message?: string;
  preferred_contact_time?: string;
  /** Which form produced this: "free_water_test" | "site_contact_cta" */
  form: string;
  /** True only when the visitor actively ticked the SMS consent box. */
  sms_consent: boolean;
}

export interface LeadSubmitResult {
  ok: boolean;
  webhookDelivered: boolean;
  backupSaved: boolean;
  error?: string;
}

const WEBHOOK_URL = import.meta.env.VITE_GHL_LEAD_WEBHOOK_URL as string | undefined;

function buildPayload(input: LeadFormInput) {
  const now = new Date().toISOString();
  return {
    first_name: input.first_name.trim(),
    last_name: (input.last_name ?? "").trim(),
    email: (input.email ?? "").trim(),
    phone: (input.phone ?? "").trim(),
    address: (input.address ?? "").trim(),
    city: (input.city ?? "").trim(),
    postal_code: (input.postal_code ?? "").trim(),
    message: (input.message ?? "").trim(),
    preferred_contact_time: (input.preferred_contact_time ?? "").trim(),

    // Lead routing
    source: "website",
    form: input.form,
    submitted_at: now,

    // --- Consent record -----------------------------------------------------
    // Everything a carrier or a court would ask for, captured at the moment
    // the visitor ticked the box.
    sms_consent: input.sms_consent,
    sms_consent_at: input.sms_consent ? now : null,
    sms_consent_text: input.sms_consent ? SMS_CONSENT_TEXT : null,
    sms_consent_version: input.sms_consent ? SMS_CONSENT_VERSION : null,
    sms_consent_page: typeof window !== "undefined" ? window.location.href : null,
    sms_consent_user_agent:
      typeof navigator !== "undefined" ? navigator.userAgent : null,
  };
}

export async function submitLead(input: LeadFormInput): Promise<LeadSubmitResult> {
  const payload = buildPayload(input);

  let webhookDelivered = false;
  let webhookError: string | null = null;

  if (WEBHOOK_URL) {
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      webhookDelivered = res.ok;
      if (!res.ok) webhookError = `GHL webhook returned ${res.status}`;
    } catch (err) {
      webhookError = err instanceof Error ? err.message : "GHL webhook request failed";
    }
  } else {
    webhookError = "VITE_GHL_LEAD_WEBHOOK_URL is not set";
    if (import.meta.env.DEV) {
      console.warn("[leadSubmit] No GHL webhook URL configured; Supabase backup only.");
    }
  }

  // Backup / audit trail. Degrades quietly if the table has not been created yet.
  let backupSaved = false;
  try {
    const { error } = await supabase.from("web_lead_submissions" as any).insert({
      form: payload.form,
      first_name: payload.first_name,
      last_name: payload.last_name || null,
      email: payload.email || null,
      phone: payload.phone || null,
      address: payload.address || null,
      city: payload.city || null,
      postal_code: payload.postal_code || null,
      message: payload.message || null,
      preferred_contact_time: payload.preferred_contact_time || null,
      sms_consent: payload.sms_consent,
      sms_consent_at: payload.sms_consent_at,
      sms_consent_text: payload.sms_consent_text,
      sms_consent_version: payload.sms_consent_version,
      sms_consent_page: payload.sms_consent_page,
      sms_consent_user_agent: payload.sms_consent_user_agent,
      webhook_delivered: webhookDelivered,
      webhook_error: webhookError,
    });
    backupSaved = !error;
    if (error && import.meta.env.DEV) {
      console.warn("[leadSubmit] Supabase backup failed:", error.message);
    }
  } catch (err) {
    if (import.meta.env.DEV) console.warn("[leadSubmit] Supabase backup threw:", err);
  }

  const ok = webhookDelivered || backupSaved;
  return {
    ok,
    webhookDelivered,
    backupSaved,
    error: ok ? undefined : webhookError ?? "Submission failed",
  };
}
