/**
 * Career listings — single source of truth for the public /careers section.
 *
 * The original role descriptions came from SSW's July 2026 recruiting PDFs.
 * Andrae updated the classification on 2026-09-16: every current application
 * path is a 1099 independent-contractor opportunity. Older hourly, salary,
 * benefits, and W-2 claims are intentionally removed. Exact compensation,
 * territory, support, and duties must be confirmed in a written contractor
 * agreement. `legalReviewRequired` remains visible for final business review.
 */

export type PayModel = "performance" | "commission" | "project" | "leadership_override";

export interface JobListing {
  slug: string;
  title: string;
  /** Short line under the title on the card and detail hero. */
  tagline: string;
  employmentType: string;
  /** Compact pay string for the card. Keep it accurate — this is the public claim. */
  paySummary: string;
  payModel: PayModel;
  /** Badges shown on the card. */
  highlights: string[];
  intro: string[];
  whatYoullDo: {
    lead: string;
    bullets: string[];
  };
  whyYoullLoveIt: string[];
  compensation: {
    heading: string;
    lead?: string;
    bullets: string[];
    /** Optional second block, e.g. Benefits. */
    benefitsHeading?: string;
    benefits?: string[];
    /** Rendered as small print under the pay block. */
    footnote?: string;
  };
  rightForYouIf: string[];
  rightForYouClosing?: string;
  whatWereLookingFor: string[];
  lookingForClosing?: string;
  growWithUs: string[];
  /**
   * True when this role's pay copy has not cleared the review in
   * docs/legal_review_brief.md. Does not change rendering — it exists so the
   * flag is visible in code review and in the handoff doc.
   */
  legalReviewRequired: boolean;
}

export const JOB_LISTINGS: JobListing[] = [
  {
    slug: "customer-engagement-representative",
    title: "Customer Engagement Representative",
    tagline: "Start conversations, book water tests, and grow through performance.",
    employmentType: "1099 Independent Contractor",
    paySummary: "Performance-based compensation",
    payModel: "performance",
    highlights: ["Training resources", "No experience required", "Flexible opportunity"],
    intro: [
      "Looking for a performance-based sales opportunity?",
      "At Select Source Water, we provide training, coaching, and support while giving independent representatives the opportunity to earn based on results.",
      "Select Source Water is an authorized independent provider of water filtration services available through The Home Depot. We've helped thousands of families improve the quality of their water through industry-leading filtration and water treatment systems. Now we're looking for motivated individuals who want to be part of that mission while building a rewarding career of their own.",
    ],
    whatYoullDo: {
      lead: "As a Customer Engagement Representative, you'll create meaningful conversations, generate interest, and connect homeowners with the next step toward cleaner, healthier water in approved local field markets.",
      bullets: [
        "Start conversations with homeowners in approved local field markets",
        "Educate people about common water quality concerns",
        "Answer questions about filtration and water treatment",
        "Schedule complimentary in-home water quality tests with a Water Testing Specialist",
      ],
    },
    whyYoullLoveIt: [
      "Performance-based compensation governed by a written agreement",
      "Flexible schedule based on market needs",
      "Training resources — no experience necessary",
      "Clear performance milestones",
      "Supportive team environment with ongoing coaching",
      "Build valuable communication and sales skills",
      "Clear opportunities for advancement into leadership",
      "Represent an established company with a strong local reputation",
    ],
    compensation: {
      heading: "Performance-Based Compensation",
      lead: "This is a 1099 independent-contractor opportunity. Compensation is based on results and governed by a written agreement.",
      bullets: [
        "1099 independent-contractor classification",
        "Performance-based earning opportunity",
        "Terms confirmed in a written agreement before work begins",
      ],
      footnote:
        "Your recruiter reviews the compensation structure and contractor agreement before any commitment.",
    },
    rightForYouIf: [
      "You enjoy talking with people and building relationships.",
      "You're energetic and don't enjoy sitting behind a desk all day.",
      "You're motivated by performance and want your income to reflect your effort.",
      "You're looking for a flexible opportunity with performance-based earning potential.",
      "You're coachable, dependable, and eager to learn.",
      "You're interested in building a long-term career with opportunities for advancement.",
    ],
    rightForYouClosing:
      "Whether you're a college student, looking for supplemental income, changing careers, or simply looking for a company that invests in its people, we'd love to meet you.",
    whatWereLookingFor: [
      "Positive attitude and strong work ethic",
      "Excellent communication skills",
      "Reliable transportation",
      "Ability to stand and walk throughout your shift",
      "Evening and weekend availability",
      "Ability to pass a background check",
    ],
    lookingForClosing:
      "No previous experience is required — we'll teach you everything you need to know.",
    growWithUs: [
      "We believe in promoting from within.",
      "Many of our leaders began in entry-level roles and advanced through performance and dedication.",
    ],
    legalReviewRequired: true,
  },

  {
    slug: "water-testing-specialist",
    title: "Water Testing Specialist",
    tagline: "Run in-home water quality demonstrations on appointments we book for you.",
    employmentType: "1099 Independent Contractor",
    paySummary: "Commission-based",
    payModel: "commission",
    highlights: ["Commission-based", "Training resources", "Independent field work"],
    intro: [
      "If you're driven by results, enjoy helping people, and want your income to reflect your performance, this could be the opportunity you've been looking for.",
      "As a Water Testing Specialist, you'll meet with homeowners who have already expressed interest in learning more about their home's water quality. Through professional in-home water testing and education, you'll help families understand what's in their water and recommend solutions that fit their needs.",
      "We'll provide the training, proven systems, and support you need to build a rewarding career.",
    ],
    whatYoullDo: {
      lead: "You'll travel to customers' homes to perform professional water quality demonstrations and educate homeowners about water treatment systems. Opportunities may come from company marketing, independent prospecting, or customer-engagement activity depending on the market.",
      bullets: [
        "Perform live water quality demonstrations",
        "Educate homeowners on water filtration and softening solutions",
        "Recommend the system that best fits their home and lifestyle",
        "Answer questions and guide customers through their purchasing decision",
        "Deliver an outstanding customer experience from start to finish",
      ],
    },
    whyYoullLoveIt: [
      "Marketing and customer-engagement support may be available by market",
      "Comprehensive training and ongoing coaching",
      "A proven sales process that sets you up for success",
      "Independent field opportunity",
      "Market support and sales resources",
      "Flexible performance-based growth path",
      "Represent an established company trusted by thousands of homeowners",
    ],
    compensation: {
      heading: "Compensation",
      lead: "Water Testing Specialists are paid on a commission basis, with a tiered structure based on sale value.",
      bullets: [
        "Commission-based earnings",
        "Tiered commission structure based on sale value",
        "1099 independent-contractor opportunity",
      ],
      benefitsHeading: "Support",
      benefits: [
        "Training resources",
        "Sales-process support",
        "Market-specific onboarding",
      ],
      footnote:
        "This is a commission-based role. Earnings depend on individual performance and are not guaranteed. Your recruiter reviews the full commission structure with you, and your written commission agreement governs actual pay.",
    },
    rightForYouIf: [
      "You enjoy meeting new people and building trust.",
      "You're motivated by performance and want your income to reflect your effort.",
      "You'd rather educate customers than use high-pressure sales tactics.",
      "You're confident, coachable, and eager to keep developing professionally.",
      "You enjoy working independently while being supported by a strong team.",
      "You're looking for a long-term career — not just another sales job.",
    ],
    rightForYouClosing:
      "Whether you already have sales experience or are ready to learn a proven system, we'll invest in your success.",
    whatWereLookingFor: [
      "Excellent communication and relationship-building skills",
      "Professional appearance and positive attitude",
      "Self-motivated with strong time management skills",
      "Comfortable working independently in the field",
      "Reliable transportation and a valid driver's license",
      "Ability to pass a background check",
    ],
    lookingForClosing:
      "Sales experience is helpful but not required. We provide comprehensive training and ongoing coaching to help you succeed.",
    growWithUs: [
      "We're committed to developing leaders from within.",
      "Top-performing Water Testing Specialists have the opportunity to advance into leadership roles where they'll coach teams, build markets, and help shape the future of our company.",
    ],
    legalReviewRequired: true,
  },

  {
    slug: "water-treatment-installer",
    title: "Water Treatment Installer",
    tagline: "Install whole-home softeners, filtration, and RO systems on a consistent schedule.",
    employmentType: "1099 Independent Contractor",
    paySummary: "Project-based compensation",
    payModel: "project",
    highlights: ["Project-based work", "Training resources", "Growth path"],
    intro: [
      "At Select Source Water, we believe every installation is an opportunity to improve a family's daily life.",
      "As a Water Treatment Installer, you'll professionally install whole-home water softeners, filtration systems, and reverse osmosis systems, helping homeowners enjoy cleaner, healthier water for years to come.",
      "If you take pride in quality workmanship, enjoy working with your hands, and want to be part of a company that values craftsmanship and customer service, we'd love to have you on our team.",
    ],
    whatYoullDo: {
      lead: "You'll travel to customers' homes to professionally install residential water treatment systems following completed sales appointments.",
      bullets: [
        "Install water softeners, filtration systems, reverse osmosis systems, and combination units",
        "Ensure every installation is completed safely, efficiently, and to company standards",
        "Test equipment to verify proper operation",
        "Educate homeowners on how to use and maintain their new system",
        "Deliver an outstanding customer experience from arrival to completion",
        "Represent Select Source Water with professionalism at every job site",
      ],
    },
    whyYoullLoveIt: [
      "Project-based compensation governed by a written agreement",
      "Consistent work may be available based on market demand",
      "Consistent installation schedule",
      "Professional training and ongoing support",
      "Opportunity to develop specialized technical skills",
      "Join a company with a strong reputation for quality and customer service",
      "Clear opportunities for advancement into leadership",
    ],
    compensation: {
      heading: "Compensation",
      bullets: ["1099 independent-contractor classification", "Project-based compensation"],
      benefitsHeading: "Support",
      benefits: [
        "Professional training resources",
        "Installation standards and process support",
        "Additional terms provided in the contractor agreement",
      ],
      footnote: "Specific benefit details are discussed during the interview process.",
    },
    rightForYouIf: [
      "You enjoy working with your hands and solving problems.",
      "You take pride in producing quality work.",
      "You value craftsmanship and attention to detail.",
      "You enjoy working independently while serving customers.",
      "You want an independent opportunity with room to grow.",
      "You're dependable, professional, and committed to doing the job right the first time.",
    ],
    rightForYouClosing:
      "Whether you already have plumbing, construction, or mechanical experience — or you're eager to learn a specialized trade — we're looking for people who take pride in their work.",
    whatWereLookingFor: [
      "Strong work ethic and attention to detail",
      "Mechanical aptitude and willingness to learn",
      "Professional communication and customer service skills",
      "Ability to work independently in the field",
      "Valid driver's license and reliable transportation",
      "Ability to safely perform physical installation work",
    ],
    lookingForClosing:
      "Experience in plumbing, construction, HVAC, or residential installation is helpful, but candidates with the right attitude and willingness to learn are encouraged to apply.",
    growWithUs: [
      "We believe in promoting from within and investing in our people.",
      "As your skills and experience grow, you'll have opportunities to advance into leadership positions within our installation team.",
    ],
    legalReviewRequired: false,
  },

  {
    slug: "sales-market-manager",
    title: "Sales Market Manager",
    tagline: "Recruit, coach, and lead your own market — with real ownership of the results.",
    employmentType: "1099 Independent Contractor",
    paySummary: "Performance-based leadership compensation",
    payModel: "leadership_override",
    highlights: ["Build an existing network", "Performance overrides", "Leadership path"],
    intro: [
      "Are you a leader who thrives on developing people, building high-performing teams, and driving results?",
      "At Select Source Water, our Sales Market Managers don't just manage a territory — they build it. From recruiting and coaching top talent to overseeing daily operations and achieving market growth goals, you'll play a key role in expanding our business while helping others build successful careers.",
      "If you're ready to take ownership, lead from the front, and make a lasting impact, we'd love to meet you.",
    ],
    whatYoullDo: {
      lead: "You'll be responsible for the success of your assigned market — recruiting, developing, and leading a team of Customer Engagement Representatives and Water Testing Specialists while ensuring your market consistently delivers an exceptional customer experience.",
      bullets: [
        "Identify and onboard independent sales representatives",
        "Coach and develop your team for long-term success",
        "Lead daily sales and performance activities",
        "Conduct candidate conversations and recommend qualified representatives",
        "Monitor key performance metrics and market goals",
        "Create a positive, high-performance team culture",
        "Drive revenue growth while supporting your team's professional development",
      ],
    },
    whyYoullLoveIt: [
      "Lead your own market with real ownership and autonomy",
      "Performance-based leadership compensation",
      "Market support and sales resources",
      "Flexibility to organize an existing sales network",
      "Growth tied to market and team performance",
      "Build and mentor your own team",
      "Join a growing company with expansion opportunities",
      "Direct path into regional leadership as the company continues to grow",
    ],
    compensation: {
      heading: "Compensation",
      lead: "Your success is measured by the success of your team. As your market grows, so does your earning potential.",
      bullets: [
        "Performance-based override commissions",
        "Compensation varies with market size and maturity",
        "1099 independent-contractor opportunity",
      ],
      benefitsHeading: "Support",
      benefits: [
        "Market-specific onboarding",
        "Sales-process resources",
        "Leadership and performance support",
      ],
      footnote:
        "The compensation and override structure are set by market and confirmed in a written contractor agreement.",
    },
    rightForYouIf: [
      "You're passionate about developing people and helping others succeed.",
      "You naturally lead by example and hold yourself to a high standard.",
      "You enjoy recruiting, coaching, and building winning teams.",
      "You're motivated by achieving ambitious goals.",
      "You thrive in a fast-paced, entrepreneurial environment.",
      "You want to grow with a company that's expanding into new markets.",
    ],
    rightForYouClosing:
      "This role is ideal for experienced sales professionals, team leaders, or managers looking to take the next step into market leadership.",
    whatWereLookingFor: [
      "Proven leadership or sales management experience",
      "Strong communication and coaching skills",
      "Ability to recruit, motivate, and develop high-performing teams",
      "Excellent organizational and time management skills",
      "Results-driven mindset with strong problem-solving abilities",
      "Valid driver's license and reliable transportation",
      "Ability to pass a background check",
    ],
    growWithUs: [
      "We're building more than a sales organization — we're building future leaders.",
      "Top-performing Sales Market Managers have the opportunity to advance into regional leadership positions, helping shape the future growth of Select Source Water across new markets.",
    ],
    legalReviewRequired: true,
  },
];

export function getJobBySlug(slug: string | undefined): JobListing | undefined {
  if (!slug) return undefined;
  return JOB_LISTINGS.find((j) => j.slug === slug);
}

/** Options for the "Which role are you applying for?" select on the apply form. */
export const ROLE_OPTIONS = JOB_LISTINGS.map((j) => ({
  value: j.slug,
  label: j.title,
}));

/**
 * Role-specific compensation question for the apply form.
 *
 * All current opportunities are presented as 1099 independent-contractor
 * opportunities. Exact compensation remains role- and agreement-specific.
 */
export function compensationQuestionForRole(slug: string | undefined): string {
  switch (slug) {
    case "water-testing-specialist":
      return "This is a 1099 independent-contractor opportunity with commission-based compensation governed by a written agreement. Does this align with what you are seeking?";
    case "water-treatment-installer":
      return "This is a 1099 independent-contractor opportunity with project-based compensation governed by a written agreement. Does this align with what you are seeking?";
    case "sales-market-manager":
      return "This is a 1099 independent-contractor leadership opportunity with performance-based compensation governed by a written agreement. Does this align with what you are seeking?";
    case "customer-engagement-representative":
    default:
      return "This is a 1099 independent-contractor opportunity with performance-based compensation governed by a written agreement. Does this align with what you are seeking?";
  }
}

/**
 * Short pay statement used in the apply-page hero and the pre-submit disclaimer.
 *
 * Short classification and compensation statement used on the apply page.
 */
export function payStatementForRole(slug: string | undefined): string {
  switch (slug) {
    case "water-testing-specialist":
      return "1099 independent-contractor opportunity with commission-based compensation. Earnings depend on performance and are not guaranteed.";
    case "water-treatment-installer":
      return "1099 independent-contractor opportunity with project-based compensation.";
    case "sales-market-manager":
      return "1099 independent-contractor leadership opportunity with performance-based compensation.";
    case "customer-engagement-representative":
      return "1099 independent-contractor opportunity with performance-based compensation.";
    default:
      return "1099 independent-contractor opportunities. Compensation varies by role and written agreement.";
  }
}
