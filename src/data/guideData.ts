import { storeMarkets, serviceRegions } from "@/data/storeServiceAreas";
import { cityData } from "@/data/cityData";

export interface GuideArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: "service" | "know-your-water" | "areas";
  readTime: number;
  publishedAt: string;
  metaTitle: string;
  metaDescription: string;
  /** Blocks: "## " heading, "### " subheading, "- " list item, anything else a paragraph. **bold** allowed. */
  content: string[];
  tags: string[];
  related?: { label: string; href: string }[];
  faqSchema?: { question: string; answer: string }[];
}

export const guideCategories = [
  { value: "all", label: "All guides" },
  { value: "service", label: "Service and care" },
  { value: "know-your-water", label: "Know your water" },
  { value: "areas", label: "By region" },
];

/*
  Editorial rules for this file (SSW compliance floor):
  no prices, discounts or financing terms; no contaminant or health claims; no invented local statistics;
  no customer quotes; the water test is "complimentary"; Home Depot appears only as "authorized independent provider".
*/

const readyList = [
  "## What to have ready when you call",
  "- The brand and model, usually on a label on the tank, control head or under the sink.",
  "- Roughly when it was installed and by whom, if you know.",
  "- What you are seeing: a noise, a leak, slow flow, salt that is not being used, a change in taste or smell.",
  "- When it was last serviced or had filters changed.",
  "- A photo of the system and its label. It speeds things up.",
];

function regionalGuide(opts: {
  slug: string;
  region: string;
  names: string[];
  listingNote: string;
}): GuideArticle {
  const { slug, region, names, listingNote } = opts;
  return {
    slug,
    title: `Water softener, filter and RO service in ${region}`,
    excerpt: `How service works for water softeners, whole-home filters and reverse osmosis systems in ${region}, and what to have ready when you call.`,
    category: "areas",
    readTime: 3,
    publishedAt: "2026-11-05",
    metaTitle: `Water System Service in ${region} | Select Source Water`,
    metaDescription: `Service for water softeners, whole-home filters and reverse osmosis systems in ${region}. Markets we cover and what to have ready when you call.`,
    tags: [region.toLowerCase(), "water softener service", "reverse osmosis service", "whole-home filter service"],
    content: [
      `If you own a water softener, whole-home filter or reverse osmosis (RO) system in ${region}, this guide covers how to get it looked at and what to expect.`,
      "## What we service",
      "- **Water softeners:** salt and regeneration questions, settings, control valve and resin concerns.",
      "- **Whole-home filters:** filter changes, pressure drops, routine inspection.",
      "- **Reverse osmosis systems:** filter and membrane replacement, slow flow, leaks.",
      "You can request service on a system we did not install. Add the brand on the request form and our team confirms what we can service before scheduling.",
      ...readyList,
      `## Markets we cover in ${region}`,
      `${listingNote} ${names.join(", ")}.`,
      "Not sure we cover your address? Call (833) 422-7765 and we will check.",
      "## Next step",
      "Use the request form and tell us what you have. Our team contacts you to schedule.",
    ],
    related: [
      { label: "Request service", href: "/service" },
      { label: `All ${region} markets`, href: "/service-areas" },
      { label: "Maintenance schedule", href: "/maintenance" },
    ],
  };
}

const marketNames = (region: string) => storeMarkets.filter((m) => m.region === region).map((m) => m.name);
const marketSlugSet = new Set(storeMarkets.map((m) => m.slug));
const inlandNames = Object.values(cityData).map((c) => c.name);
void marketSlugSet;

export const guideArticles: GuideArticle[] = [
  {
    slug: "how-to-get-your-water-system-serviced",
    title: "How to get your water softener, filter or RO system serviced",
    excerpt: "What to gather before you call, what a service visit involves, and what to ask.",
    category: "service",
    readTime: 4,
    publishedAt: "2026-11-05",
    metaTitle: "How to Get Your Water System Serviced | Select Source Water",
    metaDescription: "What to have ready before you call for water softener, whole-home filter or reverse osmosis service, and what to ask the technician.",
    tags: ["water system service", "water softener", "reverse osmosis", "whole-home filter"],
    content: [
      "Most water systems run quietly for years, so the first sign of a problem is often a surprise. The steps below make a service call faster and clearer, whoever installed the system.",
      ...readyList,
      "## What a service visit involves",
      "A technician looks at the system, checks it against what you have described, and explains what it needs before any work begins. You decide what to do next.",
      "## Questions worth asking",
      "- What did you find, and what is the cause?",
      "- Is this a repair, a replacement of a worn part, or routine maintenance?",
      "- What should I do between visits, and how often should the system be checked?",
      "## Systems we did not install",
      "Add the brand or installer on the request form. Our team confirms what we can service before we schedule a visit.",
    ],
    related: [
      { label: "Request service", href: "/service" },
      { label: "Maintenance schedule", href: "/maintenance" },
    ],
    faqSchema: [
      { question: "Can I get service on a system I did not buy from you?", answer: "Tell us the brand on the request form. Our team confirms what we can service before scheduling." },
      { question: "What should I have ready?", answer: "The brand and model, install date if known, what you are seeing, the last service date, and a photo of the system." },
    ],
  },
  {
    slug: "water-softener-not-working-checklist",
    title: "Water softener not working? A checklist before you call",
    excerpt: "Five things worth checking first, and the signs that mean it is time for a technician.",
    category: "service",
    readTime: 4,
    publishedAt: "2026-11-05",
    metaTitle: "Water Softener Not Working? Checklist | Select Source Water",
    metaDescription: "A short checklist for a water softener that seems to have stopped working: salt, power, settings, bypass valve and when to call for service.",
    tags: ["water softener not working", "softener troubleshooting", "water softener service"],
    content: [
      "If your water feels or behaves differently than it used to, check these basics before you call. None of them requires tools.",
      "## 1. Check the salt",
      "Lift the lid of the brine tank. If the salt is low, or a hard crust has formed on top, the softener may not be making brine properly. Add salt and break up any crust gently.",
      "## 2. Check power and the display",
      "Confirm the unit is plugged in and the display is on. After a power cut, the clock may need to be reset so the unit regenerates at the right time.",
      "## 3. Check the bypass valve",
      "A bypass valve that is left open sends water around the softener. Make sure it is set to the service position.",
      "## 4. Check the settings",
      "Compare the hardness and regeneration settings to the manual. Settings can be changed by accident, and they may need updating if your household or water has changed.",
      "## 5. Look for leaks or water around the unit",
      "Pooling water, or salt water in the drain line area, is a reason to stop and call.",
      "## When to call for service",
      "Call if the checks above do not help, if you see a leak, if the unit makes unusual noises, or if you are unsure what you are looking at. Have the brand and model ready.",
    ],
    related: [
      { label: "Request service", href: "/service" },
      { label: "Maintenance schedule", href: "/maintenance" },
    ],
  },
  {
    slug: "ro-system-maintenance-filters-membrane",
    title: "Reverse osmosis system maintenance: filters and membrane",
    excerpt: "A typical replacement schedule for RO sediment filters, carbon filters and membranes, and signs a system needs attention.",
    category: "service",
    readTime: 3,
    publishedAt: "2026-11-05",
    metaTitle: "RO System Maintenance: Filters and Membrane | Select Source Water",
    metaDescription: "Typical replacement intervals for reverse osmosis sediment filters, carbon filters and membranes, and signs your system needs service.",
    tags: ["reverse osmosis maintenance", "RO filter replacement", "RO membrane"],
    content: [
      "A reverse osmosis system works through a series of filters and a membrane. They wear out on a schedule, and replacing them on time keeps the system working as designed.",
      "## Typical replacement intervals",
      "- **Sediment filter:** every 6 to 12 months.",
      "- **Carbon filters:** about every 12 months.",
      "- **RO membrane:** about every 24 months.",
      "These are typical intervals. Your system's manual, your water, and how much you use it set the real schedule.",
      "## Signs a system needs attention",
      "- Water comes out of the RO faucet more slowly than it used to.",
      "- You notice a change in taste or smell.",
      "- There is a drip or a puddle under the sink.",
      "- The storage tank seems empty sooner than before.",
      "## Keep a record",
      "Write the date of each filter change on the filter housing or in your phone. It makes the next change easy to time.",
    ],
    related: [
      { label: "Request service", href: "/service" },
      { label: "Maintenance schedule", href: "/maintenance" },
    ],
  },
  {
    slug: "water-softener-maintenance-tips",
    title: "Water softener maintenance: what to do and how often",
    excerpt: "Salt checks, yearly inspection and the habits that keep a softener running well.",
    category: "service",
    readTime: 3,
    publishedAt: "2026-10-01",
    metaTitle: "Water Softener Maintenance Tips | Select Source Water",
    metaDescription: "A practical maintenance routine for a salt-based water softener: salt checks, yearly inspection and what to watch for.",
    tags: ["water softener maintenance", "softener salt", "yearly inspection"],
    content: [
      "A salt-based water softener needs little attention, but a few regular checks make a difference.",
      "## Every 1 to 2 months: check the salt",
      "Look in the brine tank and add high-purity salt when the level gets low. Keep the level above the water line.",
      "## Once a year: inspection",
      "Have the timer, settings and regeneration frequency checked, along with the resin and valves.",
      "## Between checks",
      "- Keep the area around the unit clear and dry.",
      "- Note any change in how the water feels or how your soap behaves.",
      "- Do not ignore leaks or unusual noises.",
      "## If something seems off",
      "Our [checklist for a softener that is not working](/blog/water-softener-not-working-checklist) covers the basics. If it does not solve it, request service.",
    ],
    related: [{ label: "Request service", href: "/service" }],
  },
  {
    slug: "5-signs-you-need-water-softener",
    title: "5 signs hard water may be affecting your home",
    excerpt: "Scale, spots, soap and appliances: what hard water tends to leave behind, and how to find out for sure.",
    category: "know-your-water",
    readTime: 3,
    publishedAt: "2025-12-01",
    metaTitle: "5 Signs of Hard Water in Your Home | Select Source Water",
    metaDescription: "Common signs of hard water at home: scale on fixtures, spots on dishes, soap that will not lather, and buildup in appliances.",
    tags: ["hard water signs", "water softener", "scale buildup"],
    content: [
      "Hard water carries dissolved calcium and magnesium. It is not a health topic. It is a household one, and it tends to leave marks.",
      "## 1. White, chalky scale on fixtures",
      "Crusty buildup around faucets and showerheads is the most common sign.",
      "## 2. Spots on glasses and dishes",
      "Cloudy film or spots after the dishwasher runs.",
      "## 3. Soap that does not lather well",
      "You may find you use more soap or shampoo to get the same lather.",
      "## 4. Buildup in appliances",
      "Scale can collect inside water heaters, kettles and coffee makers over time.",
      "## 5. Stiff-feeling laundry",
      "Some people notice clothes feel less soft after washing.",
      "## How to find out for sure",
      "Your water provider publishes an annual water quality report you can read. A water test at your home shows the reading at your tap.",
    ],
    related: [
      { label: "Complimentary water test", href: "/complimentary-water-test" },
      { label: "Request service", href: "/service" },
    ],
  },
  {
    slug: "how-hard-water-destroys-water-heater",
    title: "How hard water can affect your water heater",
    excerpt: "Why scale collects in a water heater, what it can do, and what to ask a professional to check.",
    category: "know-your-water",
    readTime: 3,
    publishedAt: "2026-02-15",
    metaTitle: "Hard Water and Your Water Heater | Select Source Water",
    metaDescription: "How scale from hard water collects in a water heater and what you can do about it.",
    tags: ["hard water", "water heater", "scale"],
    content: [
      "Heating water causes dissolved minerals to come out of solution and settle as scale. In a water heater, that scale collects on heating elements and at the bottom of the tank.",
      "## What buildup can do",
      "- Make the heater work harder to heat the same water.",
      "- Cause popping or rumbling noises as water moves past the scale.",
      "- Shorten the life of parts over time.",
      "## What to do",
      "- Follow the heater manufacturer's guidance on flushing the tank.",
      "- Ask a plumber or water professional to inspect it if you hear new noises.",
      "- Find out how hard your water is, from your water provider's report or a water test.",
      "A softener reduces the minerals that form scale before they reach your heater. Whether one makes sense for your home depends on your water.",
    ],
    related: [{ label: "Complimentary water test", href: "/complimentary-water-test" }],
  },
  {
    slug: "hard-water-inland-empire-what-you-need-to-know",
    title: "Hard water in the Inland Empire: how to find your number",
    excerpt: "What water hardness is, where to find your reading, and what it means for your home.",
    category: "know-your-water",
    readTime: 3,
    publishedAt: "2026-01-01",
    metaTitle: "Hard Water in the Inland Empire | Select Source Water",
    metaDescription: "What water hardness is and how Inland Empire homeowners can find their own reading.",
    tags: ["hard water", "inland empire", "water hardness"],
    content: [
      "Hardness is a measure of dissolved calcium and magnesium. It is reported in parts per million (ppm) or grains per gallon (gpg).",
      "## Where to find your reading",
      "- **Your water provider's annual water quality report.** Providers publish one each year. Look for the hardness figure.",
      "- **A water test at your home.** It shows the reading at your own tap.",
      "Readings differ by water source and district, so a neighbor's number may not match yours.",
      "## What it means at home",
      "Harder water tends to leave scale on fixtures and in appliances, and spots on dishes. See [5 signs hard water may be affecting your home](/blog/5-signs-you-need-water-softener).",
      "## Next step",
      "If you would like to see the reading at your tap, book a complimentary in-home water test.",
    ],
    related: [
      { label: "Complimentary water test", href: "/complimentary-water-test" },
      { label: "Inland Empire guide", href: "/blog/water-system-service-inland-empire" },
    ],
  },
  {
    slug: "well-water-vs-city-water-inland-empire",
    title: "Well water vs city water: what is different for your home",
    excerpt: "Who is responsible for testing, and why treatment choices can differ.",
    category: "know-your-water",
    readTime: 3,
    publishedAt: "2025-11-01",
    metaTitle: "Well Water vs City Water | Select Source Water",
    metaDescription: "The practical differences between private well water and city water, and why they matter for treatment.",
    tags: ["well water", "city water", "water testing"],
    content: [
      "Where your water comes from changes who checks it and what a treatment system needs to do.",
      "## City water",
      "A public water provider treats and tests the water, and publishes an annual water quality report. You can read it on the provider's website.",
      "## Private well water",
      "A homeowner with a private well is generally responsible for testing their own water. Results can change over time, so testing on a regular schedule is a good habit.",
      "## What it means for treatment",
      "The right system depends on the water it has to work on. That is why a water test comes before a recommendation.",
    ],
    related: [{ label: "Complimentary water test", href: "/complimentary-water-test" }],
  },
  {
    slug: "water-filtration-cost-inland-empire",
    title: "What affects the cost of a whole-home water system",
    excerpt: "The factors that shape a quote, and why we do not publish a price before a water test.",
    category: "know-your-water",
    readTime: 3,
    publishedAt: "2026-03-15",
    metaTitle: "What Affects the Cost of a Water System | Select Source Water",
    metaDescription: "The factors that shape the cost of a whole-home water filtration or softening system, and how to compare quotes.",
    tags: ["water system cost", "whole-home filtration", "water softener cost"],
    content: [
      "There is no single price for a whole-home water system, because the right system depends on your water and your home.",
      "## What shapes a quote",
      "- What your water test shows.",
      "- The size of your household and how much water you use.",
      "- The type of system: softening, filtration, reverse osmosis, or a combination.",
      "- Installation details in your home.",
      "- Ongoing needs such as salt and filter changes.",
      "## How to compare quotes",
      "Ask each company what the system is built to do, what it needs from you over time, what is covered, and what is not.",
      "## Payment options",
      "Monthly options are available, including financing through The Home Depot. A specialist walks through them at your home.",
    ],
    related: [{ label: "Complimentary water test", href: "/complimentary-water-test" }],
  },
  {
    slug: "water-softener-beaumont-ca-guide",
    title: "Water softeners in Beaumont, CA: how they work and what to ask",
    excerpt: "A plain explanation of salt-based softening and the questions to ask before you choose a system.",
    category: "know-your-water",
    readTime: 4,
    publishedAt: "2026-01-15",
    metaTitle: "Water Softeners in Beaumont, CA | Select Source Water",
    metaDescription: "How a salt-based water softener works and what to ask before buying one in Beaumont, CA.",
    tags: ["water softener", "beaumont ca", "ion exchange"],
    content: [
      "A salt-based softener uses a resin that swaps hardness minerals, calcium and magnesium, for sodium or potassium as water passes through. It periodically regenerates, flushing the captured minerals down the drain with brine from the salt tank.",
      "## Questions worth asking",
      "- What does my water test show, and what is this system built to address?",
      "- How much salt will it use, and who refills it?",
      "- What maintenance does it need, and who does it?",
      "- What does the warranty cover, and what does it exclude?",
      "- Is there a salt-free option, and when might that fit better?",
      "## Local note",
      "Beaumont is one of our markets. See our [Beaumont page](/service-areas/beaumont-ca) or request service if you already have a system.",
    ],
    related: [
      { label: "Beaumont, CA", href: "/service-areas/beaumont-ca" },
      { label: "Request service", href: "/service" },
    ],
  },
  {
    slug: "complimentary-water-test-beaumont-riverside-county",
    title: "Complimentary in-home water test: what to expect",
    excerpt: "How long it takes, what you will see, and why there is no obligation.",
    category: "know-your-water",
    readTime: 3,
    publishedAt: "2026-04-01",
    metaTitle: "What to Expect From a Complimentary Water Test | Select Source Water",
    metaDescription: "What to expect from a complimentary in-home water test: about 15 to 30 minutes, a demonstration, and no obligation to buy.",
    tags: ["water test", "in-home water test", "beaumont ca", "riverside county"],
    content: [
      "A complimentary in-home water test is a short visit where a specialist tests the water at your tap and shows you the results.",
      "## What it looks like",
      "- It takes about 15 to 30 minutes.",
      "- You see the demonstration yourself.",
      "- The specialist explains what the results mean for your home.",
      "## No obligation",
      "The test is complimentary. You are not obligated to buy anything.",
      "## Before the visit",
      "Know which tap you use for drinking, and whether you have a softener, whole-home filter or RO system already.",
    ],
    related: [{ label: "Book a complimentary water test", href: "/complimentary-water-test" }],
    faqSchema: [
      { question: "How long does the water test take?", answer: "About 15 to 30 minutes at your home." },
      { question: "Do I have to buy anything?", answer: "No. The test is complimentary, with no obligation to buy." },
    ],
  },
  regionalGuide({
    slug: "water-system-service-southern-california",
    region: "Southern California",
    names: marketNames("Southern California"),
    listingNote: "Our Southern California markets include:",
  }),
  regionalGuide({
    slug: "water-system-service-inland-empire",
    region: "the Inland Empire",
    names: inlandNames,
    listingNote: "Inland Empire cities we serve include:",
  }),
  regionalGuide({
    slug: "water-system-service-northern-california",
    region: "Northern California",
    names: marketNames("Northern California"),
    listingNote: "Our Northern California markets include:",
  }),
  regionalGuide({
    slug: "water-system-service-central-valley",
    region: "the Central Valley",
    names: marketNames("Central Valley"),
    listingNote: "Our Central Valley markets include:",
  }),
  regionalGuide({
    slug: "water-system-service-arizona",
    region: "Arizona",
    names: marketNames("Arizona"),
    listingNote: "Our Arizona markets include:",
  }),
];

void serviceRegions;
