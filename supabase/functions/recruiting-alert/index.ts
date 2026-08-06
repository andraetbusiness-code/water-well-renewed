/**
 * recruiting-alert
 *
 * Independent backup alert for new SSW recruiting applicants.
 * Receives the applicant payload from the public /apply form and emails
 * the operator (andraetbusiness@gmail.com) via Resend.
 *
 * This is intentionally INDEPENDENT of the GHL webhook:
 *   - If GHL is down, this still fires.
 *   - If this is down, GHL still fires.
 *   - Belt and suspenders.
 *
 * Test-safety: if the applicant has `recruiting_source_test` as their source
 * (or in their tags), we DO NOT email. Mirrors the GHL If/Else gate.
 *
 * Required env vars (Supabase Edge Function secrets):
 *   - RESEND_API_KEY              Resend API key (re_...)
 *   - RECRUITING_ALERT_FROM_EMAIL e.g. "alerts@selectsourcewaterusa.com" (must
 *                                 be a verified sender in Resend) or
 *                                 "onboarding@resend.dev" for initial testing
 *   - RECRUITING_ALERT_TO_EMAIL   comma-separated list of recipients,
 *                                 e.g. "andraetbusiness@gmail.com,admin@selectsourcewater.com,jmartin@selectsourcewater.com,athames@gmail.com"
 *
 * Resume attachment (added 2026-07-30):
 *   When the applicant uploaded a resume, `resume_url` holds its path in the
 *   PRIVATE `resumes` storage bucket. We pull it with the service-role key and
 *   attach it to the email, so whoever gets the alert has the resume in hand
 *   instead of having to go dig it out of Supabase.
 *
 *   Additional env vars this needs (both are injected into every Supabase Edge
 *   Function automatically \u2014 you do not have to set them by hand):
 *     - SUPABASE_URL
 *     - SUPABASE_SERVICE_ROLE_KEY
 *
 *   Failure is non-fatal by design: if the download fails, the alert still
 *   sends, with a line saying the resume could not be attached. An applicant
 *   alert that never arrives is worse than one missing an attachment.
 */

/** Hard ceiling on what we will attach. Resend caps total payload around 40MB. */
const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ApplicantPayload {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  city?: string;
  postal_code?: string;
  source?: string;
  market?: string;
  campaign?: string;
  selected_markets?: string; // csv
  selected_markets_labels?: string; // csv human-readable
  in_socal?: string;
  in_orange_county?: string;
  w2_pay_ok?: string;
  
  homeowner_conversation_ok?: string;
  field_or_instore_ok?: string;
  transportation_ok?: string;
  valid_license_ok?: string;
  sales_experience?: string;
  experience_detail?: string;
  /** Storage path in the private `resumes` bucket, or "" when none uploaded. */
  resume_url?: string;
  start_date_answer?: string;
  motivation_answer?: string;
  motivation_other?: string;
  /** Careers slug of the posting applied to. */
  role?: string;
  role_label?: string;
  tcpa_consent?: boolean;
  tcpa_consent_timestamp?: string;
  consent_compliance?: boolean;
  page_url?: string;
  submitted_at?: string;
  tags_to_apply?: string[];
}

function isTestSubmission(p: ApplicantPayload): boolean {
  const src = (p.source || "").toLowerCase();
  if (src === "recruiting_source_test") return true;
  if ((p.tags_to_apply || []).map((t) => t.toLowerCase()).includes("recruiting_source_test")) {
    return true;
  }
  return false;
}

interface ResumeAttachment {
  filename: string;
  /** base64, no data: prefix \u2014 what Resend expects in `content`. */
  content: string;
}

/**
 * Pull the resume out of the private bucket using the service-role key.
 * Returns null on any failure \u2014 the caller treats that as "send anyway".
 */
async function fetchResume(
  path: string
): Promise<{ attachment: ResumeAttachment } | { error: string }> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) {
    return { error: "SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not available" };
  }

  const clean = path.replace(/^\/+/, "");
  const url = `${supabaseUrl}/storage/v1/object/resumes/${clean}`;

  try {
    const resp = await fetch(url, {
      headers: {
        Authorization: `Bearer ${serviceKey}`,
        apikey: serviceKey,
      },
    });
    if (!resp.ok) {
      return { error: `storage returned ${resp.status}` };
    }

    const buf = new Uint8Array(await resp.arrayBuffer());
    if (buf.byteLength === 0) return { error: "downloaded file was empty" };
    if (buf.byteLength > MAX_ATTACHMENT_BYTES) {
      return { error: `file is ${buf.byteLength} bytes, over the attach limit` };
    }

    // Chunked base64 \u2014 String.fromCharCode(...spread) blows the stack on
    // anything over ~100KB, and resumes are routinely bigger than that.
    let binary = "";
    const CHUNK = 0x8000;
    for (let i = 0; i < buf.length; i += CHUNK) {
      binary += String.fromCharCode(...buf.subarray(i, i + CHUNK));
    }

    const filename = clean.split("/").pop() || "resume.pdf";
    return { attachment: { filename, content: btoa(binary) } };
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
  }
}

function row(label: string, value: unknown): string {
  const v =
    value === undefined || value === null || value === ""
      ? "(not provided)"
      : String(value);
  return `${label.padEnd(22)} ${v}`;
}

function buildPlainText(p: ApplicantPayload, resumeNote: string): string {
  const lines: string[] = [];
  lines.push("New applicant just hit the SSW recruiting page.");
  lines.push("");
  lines.push("=== ROLE APPLIED FOR ===");
  lines.push(p.role_label || p.role || "(not specified)");
  lines.push("");
  lines.push("=== CONTACT ===");
  lines.push(row("Name:", `${p.first_name ?? ""} ${p.last_name ?? ""}`.trim()));
  lines.push(row("Phone:", p.phone));
  lines.push(row("Email:", p.email));
  lines.push(row("City:", p.city));
  lines.push(row("ZIP:", p.postal_code));
  lines.push("");
  lines.push("=== REGIONS THEY'LL WORK ===");
  lines.push(p.selected_markets_labels || p.selected_markets || "(none selected)");
  lines.push("");
  lines.push("=== TRACKING ===");
  lines.push(row("Source:", p.source));
  lines.push(row("Campaign:", p.campaign));
  lines.push(row("Primary market:", p.market));
  lines.push("");
  lines.push("=== QUALIFICATION ===");
  lines.push(row("In SoCal:", p.in_socal));
  lines.push(row("W2 pay OK:", p.w2_pay_ok));
  
  lines.push(row("Homeowner convos OK:", p.homeowner_conversation_ok));
  lines.push(row("Field/in-store OK:", p.field_or_instore_ok));
  lines.push(row("Transportation:", p.transportation_ok));
  lines.push(row("Valid license:", p.valid_license_ok));
  lines.push("");
  lines.push("=== EXPERIENCE ===");
  lines.push(row("Sales experience:", p.sales_experience));
  lines.push(row("Can start:", p.start_date_answer));
  lines.push(row("Interested in:", p.motivation_answer));
  if (p.motivation_other) lines.push(row("Their words:", p.motivation_other));
  lines.push(row("Resume:", resumeNote));
  lines.push("");
  lines.push("=== CONSENT ===");
  lines.push(row("TCPA:", p.tcpa_consent ? "Yes" : "No"));
  lines.push(row("TCPA timestamp:", p.tcpa_consent_timestamp));
  lines.push(row("Pay ack:", p.w2_pay_ok === "Yes" ? "Yes (via pay question)" : String(p.w2_pay_ok ?? "")));
  lines.push("");
  lines.push("=== META ===");
  lines.push(row("Submitted:", p.submitted_at));
  lines.push(row("Page URL:", p.page_url));
  return lines.join("\n");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(p: ApplicantPayload, resumeNote: string): string {
  const rows = (pairs: Array<[string, unknown]>) =>
    pairs
      .map(([k, v]) => {
        const safeV =
          v === undefined || v === null || v === ""
            ? '<span style="color:#999">(not provided)</span>'
            : escapeHtml(String(v));
        return `<tr><td style="padding:6px 12px 6px 0;color:#666;font-size:13px;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:6px 0;font-size:14px;color:#111;vertical-align:top">${safeV}</td></tr>`;
      })
      .join("");

  const section = (title: string, pairs: Array<[string, unknown]>) => `
    <h3 style="margin:24px 0 8px 0;font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#1d3a8a">${escapeHtml(title)}</h3>
    <table style="border-collapse:collapse;width:100%">${rows(pairs)}</table>
  `;

  const fullName = `${p.first_name ?? ""} ${p.last_name ?? ""}`.trim() || "(no name)";

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#f5f7fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fb;padding:24px 12px">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08)">
      <tr><td style="background:linear-gradient(135deg,#1f5fbf 0%,#13357a 100%);padding:24px 28px;color:#fff">
        <div style="font-size:12px;letter-spacing:0.1em;text-transform:uppercase;opacity:0.85">SSW Recruiting Alert</div>
        <div style="font-size:22px;font-weight:700;margin-top:4px">New applicant: ${escapeHtml(fullName)}</div>
        <div style="font-size:15px;font-weight:600;margin-top:8px">${escapeHtml(p.role_label || p.role || "Role not specified")}</div>
        <div style="font-size:14px;margin-top:4px;opacity:0.9">${escapeHtml(p.selected_markets_labels || p.selected_markets || "Location not specified")}</div>
      </td></tr>
      <tr><td style="padding:8px 28px 28px 28px">
        ${section("Contact", [
          ["Phone", p.phone],
          ["Email", p.email],
          ["City", p.city],
          ["ZIP", p.postal_code],
        ])}
        ${section("Tracking", [
          ["Source", p.source],
          ["Campaign", p.campaign],
          ["Primary market", p.market],
        ])}
        ${section("Qualification", [
          ["In SoCal", p.in_socal],
          ["W2 pay OK", p.w2_pay_ok],
          
          ["Homeowner convos OK", p.homeowner_conversation_ok],
          ["Field/in-store OK", p.field_or_instore_ok],
          ["Transportation", p.transportation_ok],
          ["Valid license", p.valid_license_ok],
        ])}
        ${section("Experience", [
          ["Sales experience", p.sales_experience],
          ["Can start", p.start_date_answer],
          ["Interested in", p.motivation_answer],
          ...(p.motivation_other ? ([["Their words", p.motivation_other]] as Array<[string, unknown]>) : []),
          ["Resume", resumeNote],
        ])}
        ${section("Consent & Meta", [
          ["TCPA consent", p.tcpa_consent ? "Yes" : "No"],
          ["TCPA timestamp", p.tcpa_consent_timestamp],
          ["Pay acknowledgment", p.w2_pay_ok === "Yes" ? "Yes (via pay question)" : p.w2_pay_ok],
          ["Submitted", p.submitted_at],
          ["Page URL", p.page_url],
        ])}
      </td></tr>
      <tr><td style="background:#f5f7fb;padding:16px 28px;font-size:11px;color:#999;text-align:center">
        Sent by Select Source Water recruiting backup alerter \u00b7 GHL is the system of record.
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const payload = (await req.json()) as ApplicantPayload;

    // Test-safety gate \u2014 mirror the GHL If/Else
    if (isTestSubmission(payload)) {
      return new Response(
        JSON.stringify({ ok: true, skipped: "test_submission" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const apiKey = Deno.env.get("RESEND_API_KEY");
    const fromEmail = Deno.env.get("RECRUITING_ALERT_FROM_EMAIL");
    const toEmailRaw = Deno.env.get("RECRUITING_ALERT_TO_EMAIL");

    if (!apiKey || !fromEmail || !toEmailRaw) {
      console.error("recruiting-alert: missing env vars", {
        hasApiKey: !!apiKey,
        hasFrom: !!fromEmail,
        hasTo: !!toEmailRaw,
      });
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Multi-recipient: split CSV, trim, filter empties
    const toEmails = toEmailRaw
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (toEmails.length === 0) {
      return new Response(
        JSON.stringify({ error: "No valid recipients configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const fullName =
      `${payload.first_name ?? ""} ${payload.last_name ?? ""}`.trim() ||
      "Unknown applicant";
    const regions =
      payload.selected_markets_labels ||
      payload.selected_markets ||
      "Location not specified";

    // Pull the resume, if there is one. Never let this block the alert.
    const attachments: ResumeAttachment[] = [];
    let resumeNote = "None uploaded";
    if (payload.resume_url) {
      const got = await fetchResume(payload.resume_url);
      if ("attachment" in got) {
        attachments.push(got.attachment);
        resumeNote = `Attached (${got.attachment.filename})`;
      } else {
        console.error("recruiting-alert: resume fetch failed", got.error);
        resumeNote = `Uploaded, but could not attach (${got.error}). Path: ${payload.resume_url}`;
      }
    }

    const roleForSubject = payload.role_label ? `${payload.role_label} \u2014 ` : "";
    const subject = `New SSW Applicant: ${fullName} \u2014 ${roleForSubject}${regions}`;

    const resendResp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmails,
        subject,
        html: buildHtml(payload, resumeNote),
        text: buildPlainText(payload, resumeNote),
        reply_to: payload.email || undefined,
        ...(attachments.length > 0 ? { attachments } : {}),
      }),
    });

    if (!resendResp.ok) {
      const errText = await resendResp.text();
      console.error("recruiting-alert: Resend failed", resendResp.status, errText);
      return new Response(
        JSON.stringify({ error: "Resend failed", status: resendResp.status, detail: errText }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const result = await resendResp.json();
    return new Response(
      JSON.stringify({ ok: true, id: result.id, resume_attached: attachments.length > 0 }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("recruiting-alert: unhandled error", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
