/**
 * Focus markets: the three areas SSW is pushing first (Andrae, 2026-11-06).
 * Every market page stays; these three get deeper, answer-first content.
 *
 * Rules for anything written here (SSW compliance floor):
 * - The water test is "complimentary", never "free".
 * - No health claims, no contaminant or removal claims, no hardness numbers
 *   unless a published utility report is cited on the page.
 * - No prices, APR or payment terms. Financing wording is only
 *   "Financing available through The Home Depot".
 * - No brand-scope promise ("any brand") until it is approved in pending.ts.
 * - The in-store team wording is "our in-store team at The Home Depot".
 *   Never "kiosk". The Home Depot store address is where to find the team,
 *   not SSW's address.
 */

export interface FocusFaq {
  q: string;
  a: string;
}

export interface FocusMarket {
  slug: string;
  /** Title tag, under ~60 characters where possible. */
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroDescription: string;
  /** Opening paragraph. Names the city and the services in plain sentences. */
  intro: string;
  /** Nearby SSW market or city page slugs (from storeServiceAreas or cityData only, never invented). */
  nearby: string[];
  /** Store number from the verified registry where the in-store team is. */
  inStoreNumber: string;
  faqs: FocusFaq[];
}

const sharedFaqs = (city: string): FocusFaq[] => [
  {
    q: `Do you repair water softeners, filters and RO systems you did not install in ${city}?`,
    a: `Yes. We repair and service water softeners, whole-home filters and reverse osmosis systems in ${city}, including systems another company installed. When you book, tell us the brand and model if you know it, so the technician arrives with the right parts.`,
  },
  {
    q: `What happens during a complimentary in-home water test in ${city}?`,
    a: `A specialist comes to your home, tests your tap water with you and walks through what the results mean for your plumbing and appliances. There is no obligation to buy anything.`,
  },
  {
    q: `How often should a water softener be serviced in ${city}?`,
    a: `It depends on your water, your household and the system. A yearly check is a common starting point. After looking at your system, the technician can recommend a schedule and tell you what upkeep, like adding salt or changing filters, you can do yourself.`,
  },
  {
    q: `Can I install a water softener or whole-home filter in ${city} without paying all at once?`,
    a: `Financing is available through The Home Depot. A specialist can explain the options at your appointment.`,
  },
  {
    q: `How do I book water softener service or a water test in ${city}?`,
    a: `Call (833) 422-7765, request service online, or stop by our in-store team at The Home Depot during business hours.`,
  },
];

export const focusMarkets: Record<string, FocusMarket> = {
  "beaumont-ca": {
    slug: "beaumont-ca",
    metaTitle: "Water Softener Install & Repair in Beaumont, CA | Select Source Water",
    metaDescription:
      "Water softener installation, repair and service, whole-home water filtration and reverse osmosis in Beaumont, CA. Local team based in Beaumont. Book a complimentary water test.",
    heroTitle: "Water softeners, filtration and RO in Beaumont, CA.",
    heroDescription:
      "Installation and service from a team headquartered in Beaumont, with an in-store team at The Home Depot on 2nd Street.",
    intro:
      "Select Source Water is based in Beaumont. We install and service water softeners, whole-home water filtration systems and reverse osmosis drinking water systems for homes across Beaumont and nearby Pass communities. If you already have a system, we can service it. If you are starting fresh, a complimentary in-home water test shows what your water is doing before you choose anything.",
    nearby: ["banning-ca", "cherry-valley-ca", "calimesa-ca", "yucaipa-ca", "redlands-ca"],
    inStoreNumber: "8987",
    faqs: [
      {
        q: "Is Select Source Water a local Beaumont company?",
        a: "Yes. Our office is at 790 Beaumont Ave Ste 124, Beaumont, CA 92223, and our in-store team works at The Home Depot at 1480 E 2nd Street in Beaumont.",
      },
      ...sharedFaqs("Beaumont"),
    ],
  },
  "north-hollywood-ca": {
    slug: "north-hollywood-ca",
    metaTitle: "Water Softener Install & Repair in North Hollywood, CA | Select Source Water",
    metaDescription:
      "Water softener installation, repair and service, whole-home water filtration and reverse osmosis in North Hollywood and the San Fernando Valley. Book a complimentary water test.",
    heroTitle: "Water softeners, filtration and RO in North Hollywood and the Valley.",
    heroDescription:
      "Installation and service for Los Angeles homes, with an in-store team at The Home Depot on Sherman Way.",
    intro:
      "We install and service water softeners, whole-home water filtration systems and reverse osmosis drinking water systems for homes in North Hollywood and across the San Fernando Valley in Los Angeles. If you already have a softener, filter or RO system, we can service it. If you are comparing options, start with a complimentary in-home water test.",
    nearby: ["van-nuys-ca", "panorama-city-ca", "san-fernando-ca", "hollywood-ca", "woodland-hills-ca", "los-angeles-ca"],
    inStoreNumber: "6613",
    faqs: sharedFaqs("North Hollywood"),
  },
  "roseville-ca": {
    slug: "roseville-ca",
    metaTitle: "Water Softener Install & Repair in Roseville, CA | Select Source Water",
    metaDescription:
      "Water softener installation, repair and service, whole-home water filtration and reverse osmosis in Roseville and the greater Sacramento area. Book a complimentary water test.",
    heroTitle: "Water softeners, filtration and RO in Roseville, CA.",
    heroDescription:
      "Installation and service for Roseville and the greater Sacramento area, with an in-store team at The Home Depot in Stanford Ranch.",
    intro:
      "We install and service water softeners, whole-home water filtration systems and reverse osmosis drinking water systems for homes in Roseville and the greater Sacramento area. If you already have a system, we can service it. If you are starting fresh, a complimentary in-home water test shows what your water is doing before you choose anything.",
    nearby: ["lincoln-ca", "auburn-ca", "carmichael-ca", "folsom-ca", "rancho-cordova-ca", "sacramento-ca"],
    inStoreNumber: "6688",
    faqs: sharedFaqs("Roseville"),
  },
};

export const getFocusMarket = (slug: string): FocusMarket | undefined => focusMarkets[slug];
