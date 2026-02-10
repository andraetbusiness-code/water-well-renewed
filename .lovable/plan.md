

# Remove Light Blue Box from Footer

The light blue rectangle in the footer is the Home Depot logo image (`homeDepotLogo`) which has a white/light background showing through. 

## Technical Change

**File: `src/pages/demo/HygiaPlusDemo.tsx` (~line 350)**

Remove the Home Depot logo and its separator from the footer:
- Remove the `<span>` divider (the vertical bar `|`)
- Remove the `<img src={homeDepotLogo} .../>` element

This leaves just the SSW badge logo in the footer's left side.

