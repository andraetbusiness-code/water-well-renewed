/**
 * Recruiting markets for the /apply page.
 *
 * Three SSW hiring regions. Order here = display order on the form.
 * Each market has:
 *   - id          stable slug used in URL `?market=`, tags, GHL fields
 *   - label       region name shown to the candidate
 *   - heroBadge   short text for the hero pill ("Now Hiring · …")
 *   - heroHeading hero H1 copy
 *   - cities      representative cities (SEO + copy)
 *   - blurb       1-2 sentence sub-copy for hero / location card
 */

export type MarketId =
  | "orange_county"
  | "inland_empire"
  | "coachella_valley";

export interface Market {
  id: MarketId;
  label: string;
  heroBadge: string;
  heroHeading: string;
  blurb: string;
  cities: string[];
}

export const MARKETS: Market[] = [
  {
    id: "orange_county",
    label: "Orange County",
    heroBadge: "Now Hiring · Orange County, CA",
    heroHeading: "Build a Sales Career With Select Source Water",
    blurb:
      "Field sales and in-store lead generation across Orange County — Anaheim, Santa Ana, Irvine, Huntington Beach and surrounding cities.",
    cities: [
      "Anaheim",
      "Santa Ana",
      "Irvine",
      "Huntington Beach",
      "Costa Mesa",
      "Newport Beach",
      "Fullerton",
      "Orange",
      "Tustin",
      "Mission Viejo",
      "Garden Grove",
      "Westminster",
    ],
  },
  {
    id: "inland_empire",
    label: "Inland Empire (Beaumont & surrounding)",
    heroBadge: "Now Hiring · Beaumont & the Inland Empire",
    heroHeading: "Build a Sales Career With Select Source Water",
    blurb:
      "Our home base. Field sales and in-store lead generation across Beaumont, Banning, Yucaipa, Moreno Valley, Riverside, San Bernardino, Hemet, Menifee, Murrieta, Temecula, Corona and surrounding Inland Empire cities.",
    cities: [
      "Beaumont",
      "Banning",
      "Yucaipa",
      "Calimesa",
      "Cherry Valley",
      "Moreno Valley",
      "Riverside",
      "Redlands",
      "San Bernardino",
      "Hemet",
      "Menifee",
      "Murrieta",
      "Temecula",
      "Corona",
      "Highland",
      "Loma Linda",
    ],
  },
  {
    id: "coachella_valley",
    label: "Coachella Valley & Desert",
    heroBadge: "Now Hiring · Palm Springs & Coachella Valley",
    heroHeading: "Build a Sales Career With Select Source Water",
    blurb:
      "Field sales and in-store lead generation across Palm Springs, Palm Desert, Indio, La Quinta, Rancho Mirage, Cathedral City, Desert Hot Springs and surrounding desert cities.",
    cities: [
      "Palm Springs",
      "Palm Desert",
      "Indio",
      "La Quinta",
      "Rancho Mirage",
      "Cathedral City",
      "Coachella",
      "Desert Hot Springs",
      "Indian Wells",
      "Bermuda Dunes",
      "Thousand Palms",
      "Yucca Valley",
    ],
  },
];

/**
 * Default hero used when URL `?market=` is missing or unrecognized.
 * Generic SoCal language so the page works for organic / cross-region traffic.
 */
export const DEFAULT_HERO = {
  badge: "Now Hiring · Southern California",
  heading: "Build a Sales Career With Select Source Water",
  blurb:
    "We're hiring across Orange County, the Inland Empire (Beaumont and surrounding cities), and the Coachella Valley / Palm Springs area. Pick where you can work below.",
} as const;

/**
 * Match a URL `?market=` value to a known market. Returns null if no match.
 */
export function resolveMarketFromUrl(raw: string | null | undefined): Market | null {
  if (!raw) return null;
  const v = raw.trim().toLowerCase();
  const found = MARKETS.find((m) => m.id === v);
  return found ?? null;
}

/**
 * Convenience: which market id should be stored as the "primary" market for tagging?
 * Preference order:
 *   1. The URL `?market=` value, if it matches a known market.
 *   2. The first selected market in the form.
 *   3. Fallback: orange_county (legacy default for existing campaigns).
 */
export function resolvePrimaryMarketId(
  urlMarket: string | null | undefined,
  selectedMarkets: MarketId[]
): string {
  const fromUrl = resolveMarketFromUrl(urlMarket);
  if (fromUrl) return fromUrl.id;
  if (selectedMarkets.length > 0) return selectedMarkets[0];
  return "orange_county";
}
