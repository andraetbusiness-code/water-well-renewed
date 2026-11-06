import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { submitLead, SMS_CONSENT_TEXT } from "@/lib/leadSubmit";
import { site } from "@/data/site";

interface LeadFormProps {
  /** Stored with the lead so the team knows which form it came from. */
  formName: string;
  submitLabel: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  /** Adds "system type" and "brand" fields for service requests. They are folded into the message. */
  serviceFields?: boolean;
  /** Adds a home address field (used for the in-home water test). */
  addressField?: boolean;
  successMessage?: string;
}

const field = "h-12 rounded-md border-input bg-background";

export const LeadForm = ({
  formName,
  submitLabel,
  messageLabel = "Anything we should know (optional)",
  messagePlaceholder = "",
  serviceFields = false,
  addressField = false,
  successMessage = "Thanks. We received your request and will contact you to schedule.",
}: LeadFormProps) => {
  const empty = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zip: "",
    address: "",
    systemType: "",
    brand: "",
    message: "",
    smsConsent: false,
  };
  const [data, setData] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const set = (patch: Partial<typeof empty>) => setData((p) => ({ ...p, ...patch }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const details = serviceFields
      ? [
          data.systemType && `System type: ${data.systemType}`,
          data.brand && `Brand / installer: ${data.brand}`,
          data.message && `Notes: ${data.message}`,
        ]
          .filter(Boolean)
          .join("\n")
      : data.message;

    const result = await submitLead({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      postal_code: data.zip,
      address: data.address,
      message: details,
      form: formName,
      sms_consent: data.smsConsent,
    });
    setBusy(false);
    if (result.ok) {
      setDone(true);
      setData(empty);
      toast.success(successMessage);
    } else {
      toast.error(`We could not send that. Please call ${site.phone} and we will get you scheduled.`);
    }
  };

  if (done) {
    return (
      <div role="status" className="rounded-lg border border-border p-8">
        <p className="text-xl font-semibold tracking-tight">Request received.</p>
        <p className="mt-2 text-muted-foreground">{successMessage}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          Need us sooner? Call{" "}
          <a className="font-semibold text-foreground underline" href={site.phoneHref}>
            {site.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${formName}-first`}>First name</Label>
          <Input id={`${formName}-first`} autoComplete="given-name" required value={data.firstName} onChange={(e) => set({ firstName: e.target.value })} className={field} />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${formName}-last`}>Last name</Label>
          <Input id={`${formName}-last`} autoComplete="family-name" required value={data.lastName} onChange={(e) => set({ lastName: e.target.value })} className={field} />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${formName}-phone`}>Mobile phone</Label>
          <Input id={`${formName}-phone`} type="tel" autoComplete="tel" required value={data.phone} onChange={(e) => set({ phone: e.target.value })} className={field} />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${formName}-email`}>Email</Label>
          <Input id={`${formName}-email`} type="email" autoComplete="email" required value={data.email} onChange={(e) => set({ email: e.target.value })} className={field} />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${formName}-zip`}>ZIP code</Label>
          <Input id={`${formName}-zip`} inputMode="numeric" autoComplete="postal-code" required value={data.zip} onChange={(e) => set({ zip: e.target.value })} className={field} />
        </div>
        {serviceFields && (
          <div className="space-y-2">
            <Label htmlFor={`${formName}-type`}>System you have</Label>
            <select
              id={`${formName}-type`}
              value={data.systemType}
              onChange={(e) => set({ systemType: e.target.value })}
              className={`${field} w-full border px-3 text-base`}
            >
              <option value="">Not sure</option>
              <option>Water softener</option>
              <option>Whole-home filter</option>
              <option>Reverse osmosis (under sink)</option>
              <option>Other</option>
            </select>
          </div>
        )}
      </div>

      {addressField && (
        <div className="space-y-2">
          <Label htmlFor={`${formName}-address`}>Home address</Label>
          <Input id={`${formName}-address`} autoComplete="street-address" required value={data.address} onChange={(e) => set({ address: e.target.value })} className={field} />
        </div>
      )}

      {serviceFields && (
        <div className="space-y-2">
          <Label htmlFor={`${formName}-brand`}>Brand or who installed it (optional)</Label>
          <Input id={`${formName}-brand`} value={data.brand} onChange={(e) => set({ brand: e.target.value })} className={field} />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor={`${formName}-msg`}>{messageLabel}</Label>
        <Textarea id={`${formName}-msg`} rows={3} placeholder={messagePlaceholder} value={data.message} onChange={(e) => set({ message: e.target.value })} className="rounded-md border-input bg-background" />
      </div>

      <div className="flex items-start gap-3">
        <Checkbox id={`${formName}-sms`} checked={data.smsConsent} onCheckedChange={(c) => set({ smsConsent: c === true })} className="mt-1" />
        <label htmlFor={`${formName}-sms`} className="cursor-pointer text-xs leading-relaxed text-muted-foreground">
          {SMS_CONSENT_TEXT} See our{" "}
          <a href="/privacy-policy.html" className="underline">Privacy Policy</a> and{" "}
          <a href="/sms-terms.html" className="underline">SMS Terms</a>.
        </label>
      </div>

      <Button type="submit" size="lg" disabled={busy} className="w-full sm:w-auto">
        {busy ? "Sending" : submitLabel}
      </Button>
    </form>
  );
};
