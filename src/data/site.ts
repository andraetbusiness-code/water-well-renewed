// Single source for facts that appear in the header, footer, forms and schema.
// Every value here is VERIFIED in the SSW company brain (section 1) unless marked.
export const site = {
  name: "Select Source Water",
  phone: "(833) 422-7765",
  phoneHref: "tel:+18334227765",
  email: "info@selectsourcewater.com",
  address: {
    street: "790 Beaumont Ave Ste 124",
    city: "Beaumont",
    state: "CA",
    zip: "92223",
  },
  url: "https://selectsourcewater.com",
} as const;

export const primaryNav = [
  { label: "Service", href: "/service" },
  { label: "Systems", href: "/hygia-system" },
  { label: "Service areas", href: "/service-areas" },
  { label: "Guides", href: "/blog" },
  { label: "About", href: "/about" },
] as const;

export const footerGroups = [
  {
    title: "Service",
    links: [
      { label: "Request service", href: "/service" },
      { label: "Maintenance", href: "/maintenance" },
      { label: "Complimentary water test", href: "/complimentary-water-test" },
    ],
  },
  {
    title: "Systems",
    links: [
      { label: "HYGIA+", href: "/hygia-system" },
      { label: "Filtration technology", href: "/filtration-technology" },
      { label: "What is in your water", href: "/what-in-water" },
      { label: "How it works", href: "/process" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Service areas", href: "/service-areas" },
      { label: "Home Depot authorized provider", href: "/home-depot-authorized-provider" },
      { label: "Guides", href: "/blog" },
      { label: "Careers", href: "/careers" },
    ],
  },
] as const;

/** Regional guide posts (src/data/blogData.ts). One guide per region, linked from every market page in it. */
export const regionGuideSlug: Record<string, string> = {
  "Southern California": "water-system-service-southern-california",
  "Northern California": "water-system-service-northern-california",
  "Central Valley": "water-system-service-central-valley",
  "Arizona": "water-system-service-arizona",
  "Inland Empire": "water-system-service-inland-empire",
};
