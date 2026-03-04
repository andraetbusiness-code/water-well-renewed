

# Update Onboarding Script

## Changes

Update the script text in **two files** to match the new wording provided:

### 1. `src/components/onboarding/slides/ApprovedScriptSlide.tsx`

Replace the `scriptSections` array with the new script flow:

| Label | New Text |
|-------|----------|
| OPENER | "Finding everything ok?" |
| PERMISSION | "Can I ask you a quick question?" |
| HOOK QUESTION | "Who does your water filter at home?" |
| BRIDGE | "Super cool!" |
| OFFER | "For the next 2 days, Home Depot is offering complimentary water test.\n\nWe will have a technician go to your home and test your water for chlorine and other contaminants and walk you through the water waste treatment report." |
| PEACE OF MIND | "If your water's great we'll be the first to tell you. If it's not great we'll show you some solutions... you're open to solutions for clean water right?" |
| PAUSE | *(Silent, Listen)* — displayed as instructional note |
| WAIVED FEE + QUALIFIERS | "So there's a catch — the test is $49.95.\n\nHowever, it is complimentary if you own a single family home and all home owners are present for the test." |
| CLOSE | Same as before (mornings/afternoons/evenings) |
| CONFIRMATION LOCK | Same as before |
| REQUIRED FIELDS | Same as before |
| TIME WINDOW | Same as before |

### 2. `src/components/onboarding/slides/QuickReferenceSlide.tsx`

Update the `quickScript` string to match the new condensed version of the updated script (the "field card" summary).

