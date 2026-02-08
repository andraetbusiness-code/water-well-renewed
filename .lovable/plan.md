

# Add "In Simple Terms" Executive Summaries to Growth Execution Plan

## What This Does

Adds a short, plain-language callout block after each major section that translates the technical details into a simple "what this means for your bottom line" statement. These are designed for leaders who want to understand the revenue impact without getting lost in system terminology.

---

## New Component: `SimpleTermsCard`

A new reusable sub-component added alongside the existing `GoalCard`, `CalloutCard`, etc. at the top of the file.

- Light green background with a dollar-sign or lightbulb icon
- Bold label: **"In Simple Terms"**
- 1-3 sentences max, written in plain business language focused on dollars, time saved, or revenue protected
- Uses `audit-no-break` class for clean PDF output

---

## Where It Gets Added (Section by Section)

Each callout is placed at the **end** of its section, after all technical content, so it reads as a natural summary.

| Section | "In Simple Terms" Message |
|---|---|
| Important Context | "We've already found enough to start fixing things now. Once we get full access to all your platforms, we'll be able to show you exactly where every dollar goes and comes back." |
| 1) Executive Outcomes | "This plan is designed to help you see exactly how much you spend, how many sales it produces, and where money is being left on the table -- then fix it so every dollar works harder." |
| 2) Phase Plan | "Week 1 we stop the bleeding. By month 1 we're converting more leads into sales. By month 3 the whole system runs on its own and can be copied to new locations." |
| 3a) Enzy Fixes | "Right now, not every lead is being tracked the same way, which means sales are slipping through the cracks. We fix that so every lead is accounted for and every sale gets counted." |
| 3b) GHL Fixes | "We're building one clean pipeline so leadership can see -- at a glance -- how many leads came in, how many showed up, and how many bought. No guessing." |
| 4) Missed Call Elimination | "Every missed call is a potential sale walking away. This system makes sure every single caller gets answered or called back -- turning calls you're already paying for into revenue." |
| 5) Spend Governance | "No more ad dollars running without proof they're working. Every dollar gets tracked to a result, and money that isn't producing gets moved to channels that are." |
| 6) Field Self-Gen | "Instead of reps waiting around for appointments, they'll have a daily game plan to go talk to 10-20 homeowners in their area -- creating same-day opportunities on top of what marketing brings in." |
| 7) Recruiting | "A steady pipeline of new reps means you're never dependent on just a few people. If someone leaves or underperforms, there's always someone ready to step in." |
| 8) Social Media + Content | "Consistent content builds trust before a rep ever knocks on a door. It also lowers your ad costs over time because people already recognize and trust the brand." |
| 9) Marketing Materials | "Professional, consistent materials at every touchpoint -- in-store, at the door, and online -- so the brand looks the same everywhere and closes more deals." |
| 10) Web + SEO | "Over time, people searching Google for water problems in your area will find you organically -- meaning free leads that keep growing month after month without increasing ad spend." |
| 11) Training Materials | "New hires get up to speed faster, make fewer mistakes, and start producing revenue sooner. Less hand-holding, more selling." |
| 12) Standardized SOP | "One proven playbook for every role at every location. When you open a new Home Depot, the system is already built -- just plug people in." |
| 14) Executive Scorecard | "One simple report every week that tells you exactly what happened: how much was spent, how many leads, how many sales, how much revenue. No digging through multiple tools." |
| 15) Launch Readiness | "We're ready to start the moment you say go." |

Sections 13 (Access Needed) will NOT get an "In Simple Terms" block since it's a straightforward checklist that's already plain language.

---

## Design Details

- **Background**: `bg-emerald-50` with `border-l-4 border-l-emerald-400`
- **Icon**: DollarSign icon from lucide-react (communicates "this is about your money")
- **Label**: Bold "In Simple Terms" header
- **Text**: 1-3 plain sentences, conversational tone, focused on revenue/time/growth impact
- **Print**: Uses `audit-no-break` so it stays together in PDF output

---

## Files Changed

**`src/pages/GrowthExecutionPlan.tsx`** only:
- Add `DollarSign` to the lucide-react import
- Add `SimpleTermsCard` sub-component (approx. 15 lines)
- Add one `SimpleTermsCard` instance at the end of each of the 15 sections listed above

No other files are modified.

