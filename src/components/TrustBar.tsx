import { site } from "@/data/site";

/** Quiet, static strip. Only verified facts. */
export const TrustBar = () => (
  <div className="border-y border-border bg-background">
    <div className="container flex flex-col gap-2 py-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <p>Authorized independent provider in the Home Depot ecosystem.</p>
      <a href={site.phoneHref} className="tabular font-semibold text-foreground hover:text-primary">
        {site.phone}
      </a>
    </div>
  </div>
);
