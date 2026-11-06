export interface CityData {
  name: string;
  slug: string;
  county: string;
  nearbyCities: string[]; // slugs
  seoTitle: string;
  seoDescription: string;
}

// Inland Empire territories from the SSW territory list (company brain section 1).
// Water-quality numbers, local statistics and customer quotes were removed in the 2026 rebuild:
// none had a cited source, and SSW may not make contaminant claims without one.
export const cityData: Record<string, CityData> = {
  "beaumont-ca": {
    name: "Beaumont",
    slug: "beaumont-ca",
    county: "Riverside County",
    nearbyCities: ["banning-ca", "calimesa-ca", "cherry-valley-ca", "yucaipa-ca"],
    seoTitle: "Water Softener, Filter and RO Service in Beaumont, CA | Select Source Water",
    seoDescription:
      "Select Source Water installs and services water softeners, whole-home filters and reverse osmosis systems in Beaumont, CA. Request service or a complimentary water test.",
  },
  "banning-ca": {
    name: "Banning",
    slug: "banning-ca",
    county: "Riverside County",
    nearbyCities: ["beaumont-ca", "cherry-valley-ca", "hemet-ca", "san-jacinto-ca"],
    seoTitle: "Water Softener, Filter and RO Service in Banning, CA | Select Source Water",
    seoDescription:
      "Select Source Water installs and services water softeners, whole-home filters and reverse osmosis systems in Banning, CA. Request service or a complimentary water test.",
  },
  "hemet-ca": {
    name: "Hemet",
    slug: "hemet-ca",
    county: "Riverside County",
    nearbyCities: ["san-jacinto-ca", "moreno-valley-ca", "banning-ca"],
    seoTitle: "Water Softener, Filter and RO Service in Hemet, CA | Select Source Water",
    seoDescription:
      "Select Source Water installs and services water softeners, whole-home filters and reverse osmosis systems in Hemet, CA. Request service or a complimentary water test.",
  },
  "san-jacinto-ca": {
    name: "San Jacinto",
    slug: "san-jacinto-ca",
    county: "Riverside County",
    nearbyCities: ["hemet-ca", "moreno-valley-ca", "banning-ca"],
    seoTitle: "Water Softener, Filter and RO Service in San Jacinto, CA | Select Source Water",
    seoDescription:
      "Select Source Water installs and services water softeners, whole-home filters and reverse osmosis systems in San Jacinto, CA. Request service or a complimentary water test.",
  },
  "moreno-valley-ca": {
    name: "Moreno Valley",
    slug: "moreno-valley-ca",
    county: "Riverside County",
    nearbyCities: ["riverside-ca", "hemet-ca", "san-jacinto-ca"],
    seoTitle: "Water Softener, Filter and RO Service in Moreno Valley, CA | Select Source Water",
    seoDescription:
      "Select Source Water installs and services water softeners, whole-home filters and reverse osmosis systems in Moreno Valley, CA. Request service or a complimentary water test.",
  },
  "riverside-ca": {
    name: "Riverside",
    slug: "riverside-ca",
    county: "Riverside County",
    nearbyCities: ["moreno-valley-ca", "redlands-ca", "highland-ca"],
    seoTitle: "Water Softener, Filter and RO Service in Riverside, CA | Select Source Water",
    seoDescription:
      "Select Source Water installs and services water softeners, whole-home filters and reverse osmosis systems in Riverside, CA. Request service or a complimentary water test.",
  },
  "yucaipa-ca": {
    name: "Yucaipa",
    slug: "yucaipa-ca",
    county: "San Bernardino County",
    nearbyCities: ["calimesa-ca", "beaumont-ca", "redlands-ca", "cherry-valley-ca"],
    seoTitle: "Water Softener, Filter and RO Service in Yucaipa, CA | Select Source Water",
    seoDescription:
      "Select Source Water installs and services water softeners, whole-home filters and reverse osmosis systems in Yucaipa, CA. Request service or a complimentary water test.",
  },
  "calimesa-ca": {
    name: "Calimesa",
    slug: "calimesa-ca",
    county: "Riverside County",
    nearbyCities: ["yucaipa-ca", "beaumont-ca", "cherry-valley-ca", "redlands-ca"],
    seoTitle: "Water Softener, Filter and RO Service in Calimesa, CA | Select Source Water",
    seoDescription:
      "Select Source Water installs and services water softeners, whole-home filters and reverse osmosis systems in Calimesa, CA. Request service or a complimentary water test.",
  },
  "cherry-valley-ca": {
    name: "Cherry Valley",
    slug: "cherry-valley-ca",
    county: "Riverside County (unincorporated)",
    nearbyCities: ["beaumont-ca", "banning-ca", "calimesa-ca", "yucaipa-ca"],
    seoTitle: "Water Softener, Filter and RO Service in Cherry Valley, CA | Select Source Water",
    seoDescription:
      "Select Source Water installs and services water softeners, whole-home filters and reverse osmosis systems in Cherry Valley, CA. Request service or a complimentary water test.",
  },
  "redlands-ca": {
    name: "Redlands",
    slug: "redlands-ca",
    county: "San Bernardino County",
    nearbyCities: ["highland-ca", "yucaipa-ca", "riverside-ca", "calimesa-ca"],
    seoTitle: "Water Softener, Filter and RO Service in Redlands, CA | Select Source Water",
    seoDescription:
      "Select Source Water installs and services water softeners, whole-home filters and reverse osmosis systems in Redlands, CA. Request service or a complimentary water test.",
  },
  "highland-ca": {
    name: "Highland",
    slug: "highland-ca",
    county: "San Bernardino County",
    nearbyCities: ["redlands-ca", "riverside-ca", "yucaipa-ca"],
    seoTitle: "Water Softener, Filter and RO Service in Highland, CA | Select Source Water",
    seoDescription:
      "Select Source Water installs and services water softeners, whole-home filters and reverse osmosis systems in Highland, CA. Request service or a complimentary water test.",
  },
};

export const getCityBySlug = (slug: string): CityData | undefined => cityData[slug];

export const getAllCitySlugs = (): string[] => Object.keys(cityData);
