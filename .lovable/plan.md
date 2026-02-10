
# Remove White Border from Top Image

## Problem
The front-side PDF image (`slickFront`) has white margins baked into the JPG file from the PDF extraction. On the blue gradient hero background, this creates a visible white outline. The bottom image blends fine because it sits on a white background.

## Solution
Add `overflow-hidden` and `rounded-xl` to the container div, then scale the image up slightly (e.g., `scale-110`) so the white edges get clipped outside the visible area. This crops away the white border while keeping the core content fully visible.

## Technical Details

**File:** `src/pages/demo/HygiaPlusDemo.tsx`

**Line 138** -- Update the motion.div container class:
- From: `"relative flex items-center justify-center"`
- To: `"relative flex items-center justify-center overflow-hidden rounded-xl"`

**Line 140** -- Update the img class to scale up:
- From: `"w-full object-contain"`
- To: `"w-full object-contain scale-110"`

This crops off the white edges while the image content stays centered and visible. No new files or imports needed.
