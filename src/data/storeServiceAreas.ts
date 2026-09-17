export type ServiceRegion = "Southern California" | "Northern California" | "Central Valley" | "Arizona";

export interface StoreServiceArea {
  storeNumber: string;
  storeName: string;
  address: string;
  city: string;
  state: "CA" | "AZ";
  zip: string;
  region: ServiceRegion;
  marketSlug: string;
}

// Source: “SSW HD Store Registry — VERIFIED 2026-09-02” (72 rows).
// These public Home Depot addresses identify SSW service markets. They are not SSW offices.
export const storeServiceAreas: StoreServiceArea[] = [
  { storeNumber: "8987", storeName: "Beaumont", address: "1480 E 2nd Street", city: "Beaumont", state: "CA", zip: "92223", region: "Southern California", marketSlug: "beaumont-ca" },
  { storeNumber: "612", storeName: "Canoga Park", address: "21218 Roscoe Blvd", city: "Canoga Park", state: "CA", zip: "91304", region: "Southern California", marketSlug: "canoga-park-ca" },
  { storeNumber: "6664", storeName: "Costa Mesa", address: "2300 Harbor Blvd Ste F", city: "Costa Mesa", state: "CA", zip: "92626", region: "Southern California", marketSlug: "costa-mesa-ca" },
  { storeNumber: "6650", storeName: "Cypress", address: "5800 Lincoln Ave", city: "Cypress", state: "CA", zip: "90630", region: "Southern California", marketSlug: "cypress-ca" },
  { storeNumber: "6639", storeName: "Garden Grove", address: "10801 Garden Grove Blvd", city: "Garden Grove", state: "CA", zip: "92843", region: "Southern California", marketSlug: "garden-grove-ca" },
  { storeNumber: "6617", storeName: "Glendora", address: "1305 S Lone Hill Ave", city: "Glendora", state: "CA", zip: "91740", region: "Southern California", marketSlug: "glendora-ca" },
  { storeNumber: "6616", storeName: "Sunset", address: "5600 Sunset Blvd", city: "Hollywood", state: "CA", zip: "90028", region: "Southern California", marketSlug: "hollywood-ca" },
  { storeNumber: "6646", storeName: "Huntington Beach II", address: "7100 Warner Ave", city: "Huntington Beach", state: "CA", zip: "92647", region: "Southern California", marketSlug: "huntington-beach-ca" },
  { storeNumber: "6963", storeName: "Huntington Beach", address: "19101 Magnolia Street", city: "Huntington Beach", state: "CA", zip: "92646", region: "Southern California", marketSlug: "huntington-beach-ca" },
  { storeNumber: "1002", storeName: "Huntington Park", address: "3040 Slauson Ave", city: "Huntington Park", state: "CA", zip: "90255", region: "Southern California", marketSlug: "huntington-park-ca" },
  { storeNumber: "6874", storeName: "Indio", address: "42100 Jackson Street", city: "Indio", state: "CA", zip: "92203", region: "Southern California", marketSlug: "indio-ca" },
  { storeNumber: "1010", storeName: "Inglewood", address: "3363 Century Blvd", city: "Inglewood", state: "CA", zip: "90303", region: "Southern California", marketSlug: "inglewood-ca" },
  { storeNumber: "6855", storeName: "West Inglewood", address: "8801 S La Cienega Blvd", city: "Inglewood", state: "CA", zip: "90301", region: "Southern California", marketSlug: "inglewood-ca" },
  { storeNumber: "6630", storeName: "La Quinta", address: "79900 Hwy 111", city: "La Quinta", state: "CA", zip: "92253", region: "Southern California", marketSlug: "la-quinta-ca" },
  { storeNumber: "1077", storeName: "Laguna Niguel", address: "27401 La Paz Rd", city: "Laguna Niguel", state: "CA", zip: "92677", region: "Southern California", marketSlug: "laguna-niguel-ca" },
  { storeNumber: "1039", storeName: "Hyde Park", address: "1830 W Slauson Ave", city: "Los Angeles", state: "CA", zip: "90047", region: "Southern California", marketSlug: "los-angeles-ca" },
  { storeNumber: "1048", storeName: "Wilshire/Union", address: "1675 Wilshire Blvd", city: "Los Angeles", state: "CA", zip: "90017", region: "Southern California", marketSlug: "los-angeles-ca" },
  { storeNumber: "1061", storeName: "Ladera Heights", address: "4925 W Slauson Ave", city: "Los Angeles", state: "CA", zip: "90056", region: "Southern California", marketSlug: "los-angeles-ca" },
  { storeNumber: "6611", storeName: "Marina Del Rey", address: "12975 W Jefferson Blvd", city: "Los Angeles", state: "CA", zip: "90066", region: "Southern California", marketSlug: "los-angeles-ca" },
  { storeNumber: "6689", storeName: "Cypress Park", address: "2055 N Figueroa St", city: "Los Angeles", state: "CA", zip: "90065", region: "Southern California", marketSlug: "los-angeles-ca" },
  { storeNumber: "614", storeName: "Mission Viejo", address: "27952 Hillcrest", city: "Mission Viejo", state: "CA", zip: "92692", region: "Southern California", marketSlug: "mission-viejo-ca" },
  { storeNumber: "6613", storeName: "North Hollywood", address: "11600 Sherman Way", city: "North Hollywood", state: "CA", zip: "91605", region: "Southern California", marketSlug: "north-hollywood-ca" },
  { storeNumber: "615", storeName: "Orange", address: "435 W Katella Ave", city: "Orange", state: "CA", zip: "92867", region: "Southern California", marketSlug: "orange-ca" },
  { storeNumber: "8526", storeName: "Palm Springs", address: "5200 East Ramon Road Bldg A", city: "Palm Springs", state: "CA", zip: "92264", region: "Southern California", marketSlug: "palm-springs-ca" },
  { storeNumber: "6644", storeName: "Panorama City", address: "7870 Van Nuys Blvd", city: "Panorama City", state: "CA", zip: "91402", region: "Southern California", marketSlug: "panorama-city-ca" },
  { storeNumber: "667", storeName: "Rancho Mirage", address: "34249 Monterey Ave", city: "Rancho Mirage", state: "CA", zip: "92270", region: "Southern California", marketSlug: "rancho-mirage-ca" },
  { storeNumber: "1013", storeName: "Redlands", address: "1151 W Lugonia Ave", city: "Redlands", state: "CA", zip: "92374", region: "Southern California", marketSlug: "redlands-ca" },
  { storeNumber: "609", storeName: "San Fernando", address: "12960 Foothill Blvd", city: "San Fernando", state: "CA", zip: "91340", region: "Southern California", marketSlug: "san-fernando-ca" },
  { storeNumber: "606", storeName: "Santa Ana", address: "3500 W Macarthur Blvd", city: "Santa Ana", state: "CA", zip: "92704", region: "Southern California", marketSlug: "santa-ana-ca" },
  { storeNumber: "6680", storeName: "North Santa Ana", address: "1750 E Edinger Ave", city: "Santa Ana", state: "CA", zip: "92705", region: "Southern California", marketSlug: "santa-ana-ca" },
  { storeNumber: "653", storeName: "Santa Clarita", address: "20642 Golden Triangle Rd", city: "Santa Clarita", state: "CA", zip: "91351", region: "Southern California", marketSlug: "santa-clarita-ca" },
  { storeNumber: "1055", storeName: "Newhall", address: "28033 Newhall Ranch Rd", city: "Santa Clarita", state: "CA", zip: "91355", region: "Southern California", marketSlug: "santa-clarita-ca" },
  { storeNumber: "603", storeName: "Tustin", address: "2782 El Camino Real", city: "Tustin", state: "CA", zip: "92782", region: "Southern California", marketSlug: "tustin-ca" },
  { storeNumber: "6661", storeName: "Van Nuys", address: "16800 Roscoe Blvd", city: "Van Nuys", state: "CA", zip: "91406", region: "Southern California", marketSlug: "van-nuys-ca" },
  { storeNumber: "1070", storeName: "West Hills", address: "22855 Victory Blvd", city: "West Hills", state: "CA", zip: "91307", region: "Southern California", marketSlug: "west-hills-ca" },
  { storeNumber: "647", storeName: "Westminster", address: "6633 Westminster Blvd", city: "Westminster", state: "CA", zip: "92683", region: "Southern California", marketSlug: "westminster-ca" },
  { storeNumber: "6632", storeName: "Woodland Hills", address: "6345 Variel Ave", city: "Woodland Hills", state: "CA", zip: "91367", region: "Southern California", marketSlug: "woodland-hills-ca" },
  { storeNumber: "8597", storeName: "Auburn", address: "11755 Willow Creek Drive", city: "Auburn", state: "CA", zip: "95603", region: "Northern California", marketSlug: "auburn-ca" },
  { storeNumber: "650", storeName: "Carmichael", address: "6001 Madison Ave", city: "Carmichael", state: "CA", zip: "95608", region: "Northern California", marketSlug: "carmichael-ca" },
  { storeNumber: "6609", storeName: "Chico", address: "2580 Notre Dame Blvd", city: "Chico", state: "CA", zip: "95928", region: "Northern California", marketSlug: "chico-ca" },
  { storeNumber: "8524", storeName: "Crescent City", address: "520 Highway Us 101 North", city: "Crescent City", state: "CA", zip: "95531", region: "Northern California", marketSlug: "crescent-city-ca" },
  { storeNumber: "6674", storeName: "Elk Grove", address: "9150 W Stockton Blvd", city: "Elk Grove", state: "CA", zip: "95758", region: "Northern California", marketSlug: "elk-grove-ca" },
  { storeNumber: "6675", storeName: "Folsom", address: "2675 E Bidwell St", city: "Folsom", state: "CA", zip: "95630", region: "Northern California", marketSlug: "folsom-ca" },
  { storeNumber: "8571", storeName: "Lincoln", address: "1000 Groveland Lane", city: "Lincoln", state: "CA", zip: "95648", region: "Northern California", marketSlug: "lincoln-ca" },
  { storeNumber: "8975", storeName: "Oroville", address: "2150 3rd Street", city: "Oroville", state: "CA", zip: "95965", region: "Northern California", marketSlug: "oroville-ca" },
  { storeNumber: "1085", storeName: "Placerville", address: "600 Placerville Drive", city: "Placerville", state: "CA", zip: "95667", region: "Northern California", marketSlug: "placerville-ca" },
  { storeNumber: "652", storeName: "Rancho Cordova", address: "2756 Sunrise Blvd", city: "Rancho Cordova", state: "CA", zip: "95742", region: "Northern California", marketSlug: "rancho-cordova-ca" },
  { storeNumber: "6682", storeName: "Redding", address: "1200 Churn Creek Rd", city: "Redding", state: "CA", zip: "96003", region: "Northern California", marketSlug: "redding-ca" },
  { storeNumber: "636", storeName: "Roseville", address: "324 N Sunrise Ave", city: "Roseville", state: "CA", zip: "95661", region: "Northern California", marketSlug: "roseville-ca" },
  { storeNumber: "6688", storeName: "Stanford Ranch", address: "10001 Fairway Dr", city: "Roseville", state: "CA", zip: "95678", region: "Northern California", marketSlug: "roseville-ca" },
  { storeNumber: "651", storeName: "Florin Rd", address: "4641 Florin Rd", city: "Sacramento", state: "CA", zip: "95823", region: "Northern California", marketSlug: "sacramento-ca" },
  { storeNumber: "1003", storeName: "Meadowview", address: "1461 Meadowview Rd", city: "Sacramento", state: "CA", zip: "95832", region: "Northern California", marketSlug: "sacramento-ca" },
  { storeNumber: "6620", storeName: "Power Inn", address: "8000 Folsom Blvd", city: "Sacramento", state: "CA", zip: "95826", region: "Northern California", marketSlug: "sacramento-ca" },
  { storeNumber: "6649", storeName: "Truxel Rd", address: "3611 Truxel Rd", city: "Sacramento", state: "CA", zip: "95834", region: "Northern California", marketSlug: "sacramento-ca" },
  { storeNumber: "6669", storeName: "Antelope", address: "5859 Antelope Rd", city: "Sacramento", state: "CA", zip: "95842", region: "Northern California", marketSlug: "sacramento-ca" },
  { storeNumber: "6966", storeName: "Howe Ave", address: "2000 Howe Avenue", city: "Sacramento", state: "CA", zip: "95825", region: "Northern California", marketSlug: "sacramento-ca" },
  { storeNumber: "1068", storeName: "Woodland", address: "1860 E Main St", city: "Woodland", state: "CA", zip: "95776", region: "Northern California", marketSlug: "woodland-ca" },
  { storeNumber: "1019", storeName: "Yuba City", address: "1100 Tharp Rd", city: "Yuba City", state: "CA", zip: "95993", region: "Northern California", marketSlug: "yuba-city-ca" },
  { storeNumber: "663", storeName: "Fresno", address: "3272 W Shaw Ave", city: "Fresno", state: "CA", zip: "93711", region: "Central Valley", marketSlug: "fresno-ca" },
  { storeNumber: "6660", storeName: "Lodi", address: "2960 Reynolds Ranch Parkway", city: "Lodi", state: "CA", zip: "95240", region: "Central Valley", marketSlug: "lodi-ca" },
  { storeNumber: "1006", storeName: "Manteca", address: "250 Commerce Ave", city: "Manteca", state: "CA", zip: "95336", region: "Central Valley", marketSlug: "manteca-ca" },
  { storeNumber: "6947", storeName: "Ceres", address: "1415 E Hatch Rd", city: "Modesto", state: "CA", zip: "95351", region: "Central Valley", marketSlug: "modesto-ca" },
  { storeNumber: "662", storeName: "Stockton", address: "3818 E Hammer Ln", city: "Stockton", state: "CA", zip: "95212", region: "Central Valley", marketSlug: "stockton-ca" },
  { storeNumber: "1020", storeName: "Tracy", address: "2461 Naglee Rd", city: "Tracy", state: "CA", zip: "95304", region: "Central Valley", marketSlug: "tracy-ca" },
  { storeNumber: "422", storeName: "Payson", address: "2000 North Beeline Hwy", city: "Payson", state: "AZ", zip: "85541", region: "Arizona", marketSlug: "payson-az" },
  { storeNumber: "401", storeName: "N Phoenix", address: "2217 East Bell Road", city: "Phoenix", state: "AZ", zip: "85022", region: "Arizona", marketSlug: "phoenix-az" },
  { storeNumber: "464", storeName: "Tatum & Bell", address: "16803 N Tatum Blvd", city: "Phoenix", state: "AZ", zip: "85032", region: "Arizona", marketSlug: "phoenix-az" },
  { storeNumber: "477", storeName: "Thomas Rd", address: "3609 E Thomas Rd", city: "Phoenix", state: "AZ", zip: "85018", region: "Arizona", marketSlug: "phoenix-az" },
  { storeNumber: "420", storeName: "Scottsdale-Shea", address: "9890 N 90th St", city: "Scottsdale", state: "AZ", zip: "85258", region: "Arizona", marketSlug: "scottsdale-az" },
  { storeNumber: "457", storeName: "Scottsdale", address: "9170 E Talking Stick Way", city: "Scottsdale", state: "AZ", zip: "85250", region: "Arizona", marketSlug: "scottsdale-az" },
  { storeNumber: "472", storeName: "North Scottsdale", address: "15499 N Hayden Rd", city: "Scottsdale", state: "AZ", zip: "85260", region: "Arizona", marketSlug: "scottsdale-az" },
  { storeNumber: "402", storeName: "Yuma", address: "1111 S Redondo Center Dr", city: "Yuma", state: "AZ", zip: "85365", region: "Arizona", marketSlug: "yuma-az" },
];

export interface StoreMarket {
  name: string;
  state: "CA" | "AZ";
  slug: string;
  region: ServiceRegion;
  stores: StoreServiceArea[];
}

export const storeMarkets: StoreMarket[] = Array.from(
  storeServiceAreas.reduce((markets, store) => {
    const existing = markets.get(store.marketSlug);
    if (existing) existing.stores.push(store);
    else markets.set(store.marketSlug, { name: store.city, state: store.state, slug: store.marketSlug, region: store.region, stores: [store] });
    return markets;
  }, new Map<string, StoreMarket>()).values(),
).sort((a, b) => a.name.localeCompare(b.name));

export const getStoreMarketBySlug = (slug: string): StoreMarket | undefined =>
  storeMarkets.find((market) => market.slug === slug);

export const serviceRegions: ServiceRegion[] = ["Southern California", "Northern California", "Central Valley", "Arizona"];
