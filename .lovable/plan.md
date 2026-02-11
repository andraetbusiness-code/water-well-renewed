
# Add Communication & Notes Context to Enzy and GHL Slides

Content-only updates to two existing slides. No layout or style changes.

---

## 1. EnzySlide.tsx -- Add two new content points

**A) Add a new feature card: "Lead Notes"**
- Title: "Lead Notes"
- Description: "Log details that help close in-home: age, kids, how long in the home, concerns mentioned during the water test pitch"
- Icon: `FileText` (from lucide-react)
- Placed in the existing features grid alongside the other 6 cards

**B) Add a new feature card: "Deal Communication"**
- Title: "Deal Communication"
- Description: "Enzy is how we communicate with you on your deals. You do not get paid until the project is installed."
- Icon: `DollarSign` (from lucide-react)
- Placed in the features grid (total will be 8 cards, still works in the 3-column grid)

**C) Update the subtitle** from "Daily execution, accountability, and performance in one place." to "Daily execution, accountability, deal communication, and performance in one place."

---

## 2. GHLSlide.tsx -- Add customer communication context

**A) Add a new feature card: "Customer Communication"**
- Title: "Customer Communication"
- Description: "GHL is how we communicate with your customers -- confirmations, reminders, and follow-ups"
- Icon: `MessageSquare` (from lucide-react)
- Placed in the features grid (total will be 7 cards)

---

## 3. InstallPayoutRulesSlide.tsx -- Update payout rule

**A) Update the first rule** ("A job counts when:") description from placeholder to:
"The project is fully installed. You do not get paid until installation is complete."

---

## Files Changed

| File | Change |
|------|--------|
| `EnzySlide.tsx` | Add 2 feature cards (Lead Notes, Deal Communication), update subtitle |
| `GHLSlide.tsx` | Add 1 feature card (Customer Communication) |
| `InstallPayoutRulesSlide.tsx` | Update payout rule description |
