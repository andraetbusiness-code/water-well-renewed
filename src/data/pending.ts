/**
 * Facts that need Andrae's approval before they appear on the site.
 * While a value is null, the page that uses it hides that line or block.
 * Nothing here may be guessed. Fill it in only from an approved source.
 */
export const pending = {
  /** Brands and system types technicians can service, as approved. Example shape: ["Water softeners", ...] */
  serviceScope: null as string[] | null,
  /** Service call price and trip fee, exactly as approved. */
  serviceCallPrice: null as string | null,
  /** Monthly service plan: price, what is covered, cancel and renewal terms. */
  plan: null as { name: string; price: string; covers: string[]; terms: string } | null,
  /** Service-area list for service calls, only if it differs from the verified store registry. */
  serviceCities: null as string[] | null,
};
