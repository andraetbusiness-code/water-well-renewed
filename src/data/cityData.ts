export interface CityData {
  name: string;
  slug: string;
  county: string;
  hardnessPPM: number;
  hardnessGPG: number;
  hardnessLevel: "Soft" | "Moderate" | "Hard" | "Very Hard";
  population: string;
  keyContaminant: string;
  whyReasons: string[];
  faqContaminantAnswer: string;
  nearbyCities: string[]; // slugs
  reviews: { text: string; reviewer: string; date: string }[];
  seoTitle: string;
  seoDescription: string;
}

export const cityData: Record<string, CityData> = {
  "beaumont-ca": {
    name: "Beaumont",
    slug: "beaumont-ca",
    county: "Riverside County",
    hardnessPPM: 177,
    hardnessGPG: 10.4,
    hardnessLevel: "Hard",
    population: "59,700",
    keyContaminant: "2 contaminants above EPA MCLGs",
    whyReasons: [
      "177 PPM hardness — hard enough to coat your water heater in scale within 3 years",
      "2 contaminants detected above EPA Maximum Contaminant Level Goals (MCLGs)",
      "4,210 new housing units planned — most without filtration systems pre-installed",
      "City population growing 8%+ year over year — water demand increasing faster than infrastructure upgrades",
    ],
    faqContaminantAnswer:
      "Beaumont's water has 2 contaminants detected above EPA Maximum Contaminant Level Goals (MCLGs). With rapid population growth and increasing water demand, a whole-house filtration system ensures your family's water is clean regardless of seasonal fluctuations.",
    nearbyCities: ["banning-ca", "calimesa-ca", "cherry-valley-ca", "yucaipa-ca"],
    reviews: [
      {
        text: "Josh was an amazing technician. The job was pristine and he went out of his way to make sure everything was top notch. We love our new house filtration and water softening system.",
        reviewer: "Evan B.",
        date: "Sep 2025",
      },
      {
        text: "Adrian gets a solid five stars for his awesome work and knowledge. The installation was seriously a work of art — super clean and professional.",
        reviewer: "Scott B.",
        date: "May 2025",
      },
    ],
    seoTitle: "Water Softener & Filtration in Beaumont, CA | Select Source Water",
    seoDescription:
      "Free water test in Beaumont, CA. 177 PPM hardness, 2 contaminants above EPA goals. HYGIA+ whole-house system, same-day install, lifetime warranty. Call (951) 499-5136.",
  },
  "banning-ca": {
    name: "Banning",
    slug: "banning-ca",
    county: "Riverside County",
    hardnessPPM: 249,
    hardnessGPG: 14.6,
    hardnessLevel: "Very Hard",
    population: "31,900",
    keyContaminant: "Chromium-6 detected; 19 active wells",
    whyReasons: [
      "249 PPM hardness — the hardest water in the San Gorgonio Pass",
      "Chromium-6 detected in the municipal supply — above California's public health goal",
      "19 active wells drawing from the same regional aquifer under pressure from surrounding development",
      "Hard water damages appliances in 2–3 years without treatment",
    ],
    faqContaminantAnswer:
      "Banning's water meets all legal EPA Maximum Contaminant Levels (MCLs) and is legally safe. However, chromium-6 has been detected, and the water hardness (249 PPM) is among the highest in Southern California. Legal compliance and optimal water quality are not the same thing.",
    nearbyCities: ["beaumont-ca", "cherry-valley-ca", "hemet-ca", "san-jacinto-ca"],
    reviews: [
      {
        text: "Jimmy was awesome! We couldn't be happier with the installation of the water softener system and his professionalism. Goodbye bottled water!",
        reviewer: "MPac I.",
        date: "Jan 2026",
      },
      {
        text: "Josh came out to my house to check out the faucet. Josh was beyond professional. Beyond respectful. The staff at Select Source Water are the best.",
        reviewer: "Alonzo B.",
        date: "Feb 2026",
      },
    ],
    seoTitle: "Water Softener & Filtration in Banning, CA | Select Source Water",
    seoDescription:
      "Free water test in Banning, CA. 249 PPM — hardest water in the Pass. Chromium-6 detected. HYGIA+ system removes it all. Call (951) 499-5136.",
  },
  "hemet-ca": {
    name: "Hemet",
    slug: "hemet-ca",
    county: "Riverside County",
    hardnessPPM: 155,
    hardnessGPG: 9.1,
    hardnessLevel: "Hard",
    population: "90,000",
    keyContaminant: "Arsenic + chromium-6; 10 contaminants of concern",
    whyReasons: [
      "Arsenic and chromium-6 detected above California drinking water action levels",
      "10 total contaminants of concern in the EWG database for Hemet",
      "155 PPM hardness is deceptive — the contamination profile is the bigger story here",
      "~90,000 residents on a system with documented water quality challenges",
    ],
    faqContaminantAnswer:
      "Yes. EWG data shows arsenic and chromium-6 have been detected in Hemet's water supply above California's public health goals. With 10 contaminants of concern, Hemet residents benefit most from multi-stage whole-house filtration.",
    nearbyCities: ["san-jacinto-ca", "moreno-valley-ca", "banning-ca"],
    reviews: [
      {
        text: "Josh Trujillo was a true professional. He installed a fully customized water system in our garage. Amazing service from start to finish.",
        reviewer: "Matthew De V.",
        date: "Nov 2025",
      },
      {
        text: "Our technician, Mervin, was absolutely wonderful. He is a competent, knowledgeable representative of your company.",
        reviewer: "Teri M.",
        date: "Feb 2026",
      },
    ],
    seoTitle: "Water Softener & Filtration in Hemet, CA | Select Source Water",
    seoDescription:
      "Free water test in Hemet, CA. Arsenic + chromium-6 detected, 10 contaminants of concern. HYGIA+ whole-house filtration. Call (951) 499-5136.",
  },
  "san-jacinto-ca": {
    name: "San Jacinto",
    slug: "san-jacinto-ca",
    county: "Riverside County",
    hardnessPPM: 155,
    hardnessGPG: 9.1,
    hardnessLevel: "Hard",
    population: "52,000",
    keyContaminant: "Same as Hemet — shared water source",
    whyReasons: [
      "Shares water source infrastructure with Hemet — same contaminants, same hardness",
      "~155 PPM hardness, growing residential population",
      "Close proximity to Hemet's known contamination zones",
    ],
    faqContaminantAnswer:
      "San Jacinto shares water source infrastructure with Hemet, meaning the same contaminants — including arsenic and chromium-6 — are present. A whole-house filtration system provides comprehensive protection.",
    nearbyCities: ["hemet-ca", "moreno-valley-ca", "banning-ca"],
    reviews: [
      {
        text: "Alex was awesome, super professional and really made us feel like he cared about our home as much as we do. Super happy with our new install!",
        reviewer: "Andrew H.",
        date: "Mar 2025",
      },
      {
        text: "Unbelievable experience with the whole company. Best investment we've made for our home!",
        reviewer: "Linda M.",
        date: "Apr 2025",
      },
    ],
    seoTitle: "Water Softener & Filtration in San Jacinto, CA | Select Source Water",
    seoDescription:
      "Free water test in San Jacinto, CA. 155 PPM hardness, shared contamination with Hemet. HYGIA+ system, same-day install. Call (951) 499-5136.",
  },
  "moreno-valley-ca": {
    name: "Moreno Valley",
    slug: "moreno-valley-ca",
    county: "Riverside County",
    hardnessPPM: 197,
    hardnessGPG: 11.5,
    hardnessLevel: "Very Hard",
    population: "212,000",
    keyContaminant: "Very hard water; large aging infrastructure",
    whyReasons: [
      "197 PPM — among the hardest in Riverside County",
      "Population of 212,000 means high water demand and older distribution infrastructure",
      "Scale buildup affects appliances across the board in MoVal homes",
    ],
    faqContaminantAnswer:
      "Moreno Valley's water meets all EPA legal standards. However, hardness minerals at 197 PPM are well above ideal levels and cause scale buildup, appliance damage, and skin/hair issues. A free in-home water test gives you real-time results for your specific address.",
    nearbyCities: ["riverside-ca", "hemet-ca", "san-jacinto-ca"],
    reviews: [
      {
        text: "Jimmy did a great job installing our Select Source Water System. He was very detail oriented, left everything clean and tidy.",
        reviewer: "Jim M.",
        date: "Jan 2026",
      },
      {
        text: "Marvin was awesome! Super professional, courteous, and respectful the whole time. Would highly recommend!",
        reviewer: "Stephanie R.",
        date: "Nov 2025",
      },
    ],
    seoTitle: "Water Softener & Filtration in Moreno Valley, CA | Select Source Water",
    seoDescription:
      "Free water test in Moreno Valley, CA. 197 PPM hardness — very hard. HYGIA+ whole-house filtration, same-day install, lifetime warranty. Call (951) 499-5136.",
  },
  "riverside-ca": {
    name: "Riverside",
    slug: "riverside-ca",
    county: "Riverside County",
    hardnessPPM: 202,
    hardnessGPG: 11.8,
    hardnessLevel: "Very Hard",
    population: "314,000",
    keyContaminant: "Very hard water; oldest infrastructure in IE",
    whyReasons: [
      "202 PPM hardness — consistent with county-wide hard water conditions",
      "Largest IE city at 314,000 residents — older infrastructure in many neighborhoods",
      "Many homes in Riverside are 30–60 years old with original galvanized plumbing that compounds mineral buildup",
    ],
    faqContaminantAnswer:
      "Riverside's water meets all EPA legal standards. However, hardness minerals at 202 PPM are well above ideal levels. Many Riverside homes have 30–60 year old plumbing that compounds mineral buildup. A free in-home test shows exactly what's in your water.",
    nearbyCities: ["moreno-valley-ca", "redlands-ca", "highland-ca"],
    reviews: [
      {
        text: "The tech was on time and did a very clean job. Jimmy explained what he was going to install and walked me through the system. The system looks impressive!",
        reviewer: "Jesse C.",
        date: "Mar 2025",
      },
      {
        text: "Great job by both Adrian and Martin. They were very punctual. They were professional and thorough with their work.",
        reviewer: "Andrew",
        date: "Sep 2025",
      },
    ],
    seoTitle: "Water Softener & Filtration in Riverside, CA | Select Source Water",
    seoDescription:
      "Free water test in Riverside, CA. 202 PPM hardness — very hard. Oldest infrastructure in IE. HYGIA+ filtration, lifetime warranty. Call (951) 499-5136.",
  },
  "yucaipa-ca": {
    name: "Yucaipa",
    slug: "yucaipa-ca",
    county: "San Bernardino County",
    hardnessPPM: 180,
    hardnessGPG: 10.5,
    hardnessLevel: "Hard",
    population: "54,400",
    keyContaminant: "Agricultural water history",
    whyReasons: [
      "~180 PPM hardness typical of San Bernardino County",
      "Established residential neighborhoods with water heaters and appliances that have been accumulating scale for years",
      "Many well-water properties in Yucaipa foothills",
    ],
    faqContaminantAnswer:
      "Yucaipa's water meets all EPA legal standards. However, hardness minerals at ~180 PPM are well above ideal levels and cause scale buildup, appliance damage, and skin/hair issues. A free in-home water test gives you real-time results for your specific address.",
    nearbyCities: ["calimesa-ca", "beaumont-ca", "redlands-ca", "cherry-valley-ca"],
    reviews: [
      {
        text: "Select Source set me up with a full house water filtration and gave me a nice deal. The techs, installers, and phone staff were all wonderful.",
        reviewer: "Astrid",
        date: "Mar 2026",
      },
      {
        text: "Amazing, knowledgeable, professional and skillful. Stayed until the job was finished. Would highly recommend!",
        reviewer: "David A.",
        date: "Aug 2025",
      },
    ],
    seoTitle: "Water Softener & Filtration in Yucaipa, CA | Select Source Water",
    seoDescription:
      "Free water test in Yucaipa, CA. ~180 PPM hardness, agricultural water history. HYGIA+ whole-house system, same-day install. Call (951) 499-5136.",
  },
  "calimesa-ca": {
    name: "Calimesa",
    slug: "calimesa-ca",
    county: "San Bernardino County",
    hardnessPPM: 170,
    hardnessGPG: 10.0,
    hardnessLevel: "Hard",
    population: "10,994",
    keyContaminant: "New construction, no pre-installed filtration",
    whyReasons: [
      "Fast-growing — new construction communities often have no filtration pre-installed",
      "~170 PPM hardness",
      "Shares regional aquifer with Yucaipa and Beaumont",
    ],
    faqContaminantAnswer:
      "Calimesa's water meets all EPA legal standards. However, hardness minerals at ~170 PPM are well above ideal levels. Many new-construction homes have no pre-installed filtration despite the hard water conditions.",
    nearbyCities: ["yucaipa-ca", "beaumont-ca", "cherry-valley-ca", "redlands-ca"],
    reviews: [
      {
        text: "Josh did an amazing job coming out to our house and making sure everything was working fine. Very happy with the results!",
        reviewer: "Kaven L.",
        date: "Feb 2026",
      },
      {
        text: "Jimmy was awesome! We couldn't be happier with the installation. Goodbye bottled water!",
        reviewer: "MPac I.",
        date: "Jan 2026",
      },
    ],
    seoTitle: "Water Softener & Filtration in Calimesa, CA | Select Source Water",
    seoDescription:
      "Free water test in Calimesa, CA. ~170 PPM hardness, new construction without filtration. HYGIA+ system, lifetime warranty. Call (951) 499-5136.",
  },
  "cherry-valley-ca": {
    name: "Cherry Valley",
    slug: "cherry-valley-ca",
    county: "Riverside County (unincorporated)",
    hardnessPPM: 180,
    hardnessGPG: 10.5,
    hardnessLevel: "Hard",
    population: "12,000",
    keyContaminant: "Unincorporated; private well risk",
    whyReasons: [
      "Unincorporated area — many homes on private well systems (no municipal water quality testing required)",
      "Private wells in Cherry Valley can have elevated mineral content",
      "~180 PPM for municipal connections; private wells can vary widely",
    ],
    faqContaminantAnswer:
      "Cherry Valley is an unincorporated area where many homes rely on private wells with no mandatory testing. Private wells can have elevated mineral content and unknown contaminants. A free in-home water test is especially important here.",
    nearbyCities: ["beaumont-ca", "banning-ca", "calimesa-ca", "yucaipa-ca"],
    reviews: [
      {
        text: "Alex was awesome, super professional and really made us feel like he cared about our home. Super happy with our new install!",
        reviewer: "Andrew H.",
        date: "Mar 2025",
      },
      {
        text: "Our technician, Mervin, was absolutely wonderful. He is competent and knowledgeable. He did a fine job!",
        reviewer: "Teri M.",
        date: "Feb 2026",
      },
    ],
    seoTitle: "Water Softener & Filtration in Cherry Valley, CA | Select Source Water",
    seoDescription:
      "Free water test in Cherry Valley, CA. ~180 PPM, many private wells without testing. HYGIA+ whole-house filtration. Call (951) 499-5136.",
  },
  "redlands-ca": {
    name: "Redlands",
    slug: "redlands-ca",
    county: "San Bernardino County",
    hardnessPPM: 175,
    hardnessGPG: 10.3,
    hardnessLevel: "Hard",
    population: "73,000",
    keyContaminant: "Aging infrastructure; older homes",
    whyReasons: [
      "Established SB County suburb; ~175 PPM hardness",
      "Mix of older homes (30–50 years) with aging pipes and newer builds",
      "Redlands has affluent pockets where high-quality home systems are expected",
    ],
    faqContaminantAnswer:
      "Redlands' water meets all EPA legal standards. However, hardness at ~175 PPM causes scale buildup. Many older homes have aging pipes that compound mineral buildup. A free in-home test shows exactly what's in your water.",
    nearbyCities: ["highland-ca", "yucaipa-ca", "riverside-ca", "calimesa-ca"],
    reviews: [
      {
        text: "Josh Trujillo was a true professional. He installed a fully customized water system. Amazing service from start to finish.",
        reviewer: "Matthew De V.",
        date: "Nov 2025",
      },
      {
        text: "Great job by both Adrian and Martin. Very punctual, professional, and thorough. Very happy!",
        reviewer: "Andrew",
        date: "Sep 2025",
      },
    ],
    seoTitle: "Water Softener & Filtration in Redlands, CA | Select Source Water",
    seoDescription:
      "Free water test in Redlands, CA. ~175 PPM hardness, mix of older & newer homes. HYGIA+ system, same-day install, lifetime warranty. Call (951) 499-5136.",
  },
  "highland-ca": {
    name: "Highland",
    slug: "highland-ca",
    county: "San Bernardino County",
    hardnessPPM: 190,
    hardnessGPG: 11.1,
    hardnessLevel: "Very Hard",
    population: "55,000",
    keyContaminant: "SB County hard water conditions",
    whyReasons: [
      "~190 PPM — hard water throughout SB County",
      "Adjacent to Redlands; same water supply challenges",
      "Growing population of ~55,000",
    ],
    faqContaminantAnswer:
      "Highland's water meets all EPA legal standards. However, hardness at ~190 PPM causes scale buildup, appliance damage, and skin/hair issues. A free in-home water test gives you real-time results for your address.",
    nearbyCities: ["redlands-ca", "riverside-ca", "yucaipa-ca"],
    reviews: [
      {
        text: "Jimmy did a great job installing our system. Very detail oriented, left everything clean and tidy, and explained how everything worked.",
        reviewer: "Jim M.",
        date: "Jan 2026",
      },
      {
        text: "Marvin was awesome! Super professional, courteous, and respectful. Would highly recommend!",
        reviewer: "Stephanie R.",
        date: "Nov 2025",
      },
    ],
    seoTitle: "Water Softener & Filtration in Highland, CA | Select Source Water",
    seoDescription:
      "Free water test in Highland, CA. ~190 PPM hardness, SB County hard water. HYGIA+ whole-house filtration, lifetime warranty. Call (951) 499-5136.",
  },
  "inland-empire": {
    name: "Inland Empire",
    slug: "inland-empire",
    county: "Riverside & San Bernardino Counties",
    hardnessPPM: 190,
    hardnessGPG: 11.1,
    hardnessLevel: "Very Hard",
    population: "4,600,000+",
    keyContaminant: "Hardest water region in Southern California",
    whyReasons: [
      "The Inland Empire sits over the San Gorgonio Pass aquifer system, which draws from deep mineral-rich groundwater",
      "Water hardness across the region ranges from 155–249 PPM — all well above the 120 PPM threshold for 'hard' water",
      "Municipal infrastructure varies widely in age and condition across Riverside and San Bernardino counties",
      "Agricultural history means potential contamination from runoff, pesticides, and fertilizers",
    ],
    faqContaminantAnswer:
      "The Inland Empire has some of the hardest water in California, ranging from 155 to 249 PPM across the region. Cities like Banning have chromium-6, and Hemet has arsenic detected. A free in-home water test shows exactly what's in your specific water supply.",
    nearbyCities: ["beaumont-ca", "banning-ca", "hemet-ca", "moreno-valley-ca", "riverside-ca"],
    reviews: [
      {
        text: "Unbelievable experience with the whole company. Everyone from sales to installation was knowledgeable, professional, and truly cared. Best investment we've made for our home!",
        reviewer: "Linda M.",
        date: "Apr 2025",
      },
      {
        text: "The tech was on time and did a very clean job. Jimmy explained everything and walked me through the system. Looks impressive!",
        reviewer: "Jesse C.",
        date: "Mar 2025",
      },
    ],
    seoTitle: "Water Treatment in the Inland Empire, California | Select Source Water",
    seoDescription:
      "Select Source Water serves the entire Inland Empire — 155 to 249 PPM hardness. Free water tests, HYGIA+ systems, same-day install. Call (951) 499-5136.",
  },
};

export const getCityBySlug = (slug: string): CityData | undefined => cityData[slug];

export const getAllCitySlugs = (): string[] => Object.keys(cityData);
