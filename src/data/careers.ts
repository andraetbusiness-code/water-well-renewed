/**
 * Career listings — single source of truth for the public /careers section.
 *
 * Source: the four role PDFs supplied by Andrae (2026-07-30).
 *
 * ── DELIBERATE DEVIATIONS FROM THE PDFs ──────────────────────────────────────
 *
 * 1. Customer Engagement Representative starting pay.
 *    PDF says "$16.90–$50/hour" and lists "Starting pay: $16.90/hour" plus a
 *    tier "1 Install: $20/hour". Andrae directed starting pay to be $20.
 *    Raising the floor to $20 makes the "1 Install: $20" tier identical to the
 *    starting rate, so that row is removed rather than a new number invented.
 *    Result: Starting $20 → 2 installs $30 → 3 installs $40 → 4+ installs $50.
 *    NO new earnings figure has been created. Nothing was added that the PDF
 *    did not already promise.
 *
 * 2. Home Depot language.
 *    The PDFs say "Authorized Home Depot Provider". The locked, non-paraphrasable
 *    line in docs/outbound_agent_v1_job_post_drafts.md is:
 *      "Select Source Water is an authorized independent provider of water
 *       filtration services available through The Home Depot."
 *    Public-facing copy uses the locked line. Dropping "independent" reads as a
 *    Home Depot endorsement and is the exact thing that rule exists to prevent.
 *
 * ── UNRESOLVED, FLAGGED, NOT DECIDED HERE ────────────────────────────────────
 *
 * Water Testing Specialist is commission-only. docs/legal_review_brief.md was
 * submitted specifically to get commission-only pay language approved under
 * CA Labor Code §§2751/226.2/1182.12, and its Reviewer and Decision fields are
 * still blank. `legalReviewRequired: true` marks every role whose pay copy is
 * publishing ahead of that sign-off.
 */

export type PayModel = "hourly_tiered" | "commission" | "salary" | "salary_plus_bonus";

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
    tagline: "Start conversations, book water tests, and grow your hourly rate with your results.",
    employmentType: "Part-Time",
    paySummary: "$20–$50/hour",
    payModel: "hourly_tiered",
    highlights: ["Paid training", "No experience required", "Up to 25 hrs/week"],
    intro: [
      "Looking for more than just another hourly job?",
      "At Select Source Water, we provide the training, coaching, and support to help you succeed while giving you the opportunity to earn up to $50 per hour through hourly performance-based pay.",
      "Select Source Water is an authorized independent provider of water filtration services available through The Home Depot. We've helped thousands of families improve the quality of their water through industry-leading filtration and water treatment systems. Now we're looking for motivated individuals who want to be part of that mission while building a rewarding career of their own.",
    ],
    whatYoullDo: {
      lead: "As a Customer Engagement Representative, you'll be the first friendly face customers meet. Working inside Home Depot stores or in assigned neighborhoods, you'll create meaningful conversations, generate interest, and connect homeowners with the next step toward cleaner, healthier water.",
      bullets: [
        "Start conversations with customers in-store and in assigned neighborhoods",
        "Educate people about common water quality concerns",
        "Answer questions about filtration and water treatment",
        "Schedule complimentary in-home water quality tests with a Water Testing Specialist",
      ],
    },
    whyYoullLoveIt: [
      "Earn $20–$50/hour through our performance-based pay structure",
      "Part-time schedule (up to 25 hours per week)",
      "Paid training — no experience necessary",
      "Performance-based raises built into the compensation plan",
      "Supportive team environment with ongoing coaching",
      "Build valuable communication and sales skills",
      "Clear opportunities for advancement into leadership",
      "Represent an established company with a strong local reputation",
    ],
    compensation: {
      heading: "Performance-Based Hourly Pay",
      lead: "Your hourly pay increases based on the number of installations generated from the appointments you schedule.",
      bullets: [
        "Starting pay: $20/hour",
        "2 installs: $30/hour",
        "3 installs: $40/hour",
        "4+ installs: $50/hour",
      ],
      footnote:
        "Maximum schedule: 25 hours per week. Pay tiers are based on installations completed from appointments you schedule. Final pay details are confirmed during the hiring process.",
    },
    rightForYouIf: [
      "You enjoy talking with people and building relationships.",
      "You're energetic and don't enjoy sitting behind a desk all day.",
      "You're motivated by performance and want your income to reflect your effort.",
      "You're looking for a part-time position with real earning potential.",
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
    employmentType: "Full-Time",
    paySummary: "Commission-based",
    payModel: "commission",
    highlights: ["Company vehicle after 60 days", "Health insurance after 90 days", "Paid training"],
    intro: [
      "If you're driven by results, enjoy helping people, and want your income to reflect your performance, this could be the opportunity you've been looking for.",
      "As a Water Testing Specialist, you'll meet with homeowners who have already expressed interest in learning more about their home's water quality. Through professional in-home water testing and education, you'll help families understand what's in their water and recommend solutions that fit their needs.",
      "We'll provide the training, proven systems, and support you need to build a rewarding career.",
    ],
    whatYoullDo: {
      lead: "You'll travel to customers' homes to perform professional water quality demonstrations and educate homeowners about water treatment systems. Appointments are generated by our Customer Engagement Representatives, so you can focus on building relationships and helping customers make informed decisions.",
      bullets: [
        "Perform live water quality demonstrations",
        "Educate homeowners on water filtration and softening solutions",
        "Recommend the system that best fits their home and lifestyle",
        "Answer questions and guide customers through their purchasing decision",
        "Deliver an outstanding customer experience from start to finish",
      ],
    },
    whyYoullLoveIt: [
      "Qualified appointments provided by our marketing and customer engagement teams",
      "Comprehensive training and ongoing coaching",
      "A proven sales process that sets you up for success",
      "Company vehicle provided after 60 days",
      "Health insurance available after 90 days",
      "One week of paid time off annually",
      "Represent an established company trusted by thousands of homeowners",
    ],
    compensation: {
      heading: "Compensation",
      lead: "Water Testing Specialists are paid on a commission basis, with a tiered structure based on sale value.",
      bullets: [
        "Commission-based earnings",
        "Tiered commission structure based on sale value",
        "Average customer purchase: approximately $7,000–$8,000",
        "Full-time W-2 employment",
      ],
      benefitsHeading: "Benefits",
      benefits: [
        "Company vehicle after 60 days",
        "Health insurance after 90 days (company pays 50% of the premium)",
        "One week of paid time off annually",
      ],
      footnote:
        "This is a commission-based role. Earnings depend on individual performance and are not guaranteed. Your written commission agreement governs actual pay and is reviewed with you before hire.",
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
    employmentType: "Full-Time",
    paySummary: "$65,000–$72,000/year",
    payModel: "salary",
    highlights: ["Year-round work", "Professional training", "Advancement path"],
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
      "Competitive annual salary of $65,000–$72,000",
      "Full-time, year-round employment",
      "Consistent installation schedule",
      "Professional training and ongoing support",
      "Opportunity to develop specialized technical skills",
      "Join a company with a strong reputation for quality and customer service",
      "Clear opportunities for advancement into leadership",
    ],
    compensation: {
      heading: "Compensation",
      bullets: ["$65,000–$72,000 annual salary", "Full-time W-2 employment"],
      benefitsHeading: "Benefits",
      benefits: [
        "Comprehensive benefits package",
        "Professional training",
        "Career advancement opportunities",
        "Additional benefits provided based on company policy",
      ],
      footnote: "Specific benefit details are discussed during the interview process.",
    },
    rightForYouIf: [
      "You enjoy working with your hands and solving problems.",
      "You take pride in producing quality work.",
      "You value craftsmanship and attention to detail.",
      "You enjoy working independently while serving customers.",
      "You want a stable, full-time career with opportunities to grow.",
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
    employmentType: "Full-Time",
    paySummary: "Base salary + performance bonuses",
    payModel: "salary_plus_bonus",
    highlights: ["Company vehicle after 60 days", "Health insurance after 90 days", "Leadership track"],
    intro: [
      "Are you a leader who thrives on developing people, building high-performing teams, and driving results?",
      "At Select Source Water, our Sales Market Managers don't just manage a territory — they build it. From recruiting and coaching top talent to overseeing daily operations and achieving market growth goals, you'll play a key role in expanding our business while helping others build successful careers.",
      "If you're ready to take ownership, lead from the front, and make a lasting impact, we'd love to meet you.",
    ],
    whatYoullDo: {
      lead: "You'll be responsible for the success of your assigned market — recruiting, developing, and leading a team of Customer Engagement Representatives and Water Testing Specialists while ensuring your market consistently delivers an exceptional customer experience.",
      bullets: [
        "Recruit and hire top talent",
        "Coach and develop your team for long-term success",
        "Lead daily sales and performance activities",
        "Conduct interviews and make hiring decisions",
        "Monitor key performance metrics and market goals",
        "Create a positive, high-performance team culture",
        "Drive revenue growth while supporting your team's professional development",
      ],
    },
    whyYoullLoveIt: [
      "Lead your own market with real ownership and autonomy",
      "Competitive base salary plus performance-based override earnings",
      "Company vehicle provided after 60 days",
      "Health insurance available after 90 days",
      "One week of paid time off annually",
      "Build and mentor your own team",
      "Join a growing company with expansion opportunities",
      "Direct path into regional leadership as the company continues to grow",
    ],
    compensation: {
      heading: "Compensation",
      lead: "Your success is measured by the success of your team. As your market grows, so does your earning potential.",
      bullets: [
        "Competitive annual base salary",
        "Performance-based override commissions",
        "Salary range based on market size and maturity",
        "Full-time W-2 employment",
      ],
      benefitsHeading: "Benefits",
      benefits: [
        "Company vehicle after 60 days",
        "Health insurance after 90 days (company pays 50% of the premium)",
        "One week of paid time off annually",
      ],
      footnote:
        "Base salary and override structure are set by market and confirmed in writing during the hiring process.",
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
 * The form previously asked every applicant a single W2 $20–$50/hour question.
 * That statement is only true for the Customer Engagement Representative. Asking
 * an Installer or a Water Testing Specialist to confirm a pay rate that does not
 * apply to their role puts a false pay statement in front of them and stores a
 * meaningless answer in GHL.
 */
export function compensationQuestionForRole(slug: string | undefined): string {
  switch (slug) {
    case "water-testing-specialist":
      return "This is a full-time, commission-based W2 position with a tiered commission structure based on sale value. Does this align with your compensation goals?";
    case "water-treatment-installer":
      return "This is a full-time W2 position with an annual salary of $65,000–$72,000. Does this align with your compensation goals?";
    case "sales-market-manager":
      return "This is a full-time W2 position with a competitive base salary plus performance-based override commissions. Does this align with your compensation goals?";
    case "customer-engagement-representative":
    default:
      return "This is a W2 position starting at $20/hour with the ability to earn up to $50/hour based on performance. Does this align with your compensation goals?";
  }
}

/**
 * Short pay statement used in the apply-page hero and the pre-submit disclaimer.
 *
 * The apply page previously stated the Customer Engagement Representative's
 * $20-$50/hour rate to every applicant, including Installers on a $65k-$72k
 * salary and Water Testing Specialists on commission. That is a false pay
 * statement to three quarters of the pipeline. This keeps it role-accurate.
 */
export function payStatementForRole(slug: string | undefined): string {
  switch (slug) {
    case "water-testing-specialist":
      return "Full-time, commission-based W2 position with a tiered commission structure based on sale value. Earnings depend on performance and are not guaranteed.";
    case "water-treatment-installer":
      return "Full-time W2 position with an annual salary of $65,000\u2013$72,000.";
    case "sales-market-manager":
      return "Full-time W2 position with a competitive base salary plus performance-based override commissions.";
    case "customer-engagement-representative":
      return "W2 position starting at $20/hour, with the ability to earn up to $50/hour based on performance.";
    default:
      return "W2 positions with hourly, salary, and commission-based roles available. Pay varies by role \u2014 see the role description for details.";
  }
}
