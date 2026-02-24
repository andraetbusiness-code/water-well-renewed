import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const INFOGRAPHIC_PROMPTS: Record<string, string> = {
  "better-water-hero": `Create a professional infographic poster titled "Better Water Starts Here" for HYGIA+ water filtration. Feature a large crystal-clear water droplet as the centerpiece with a "10-Stage Filtration" badge. Use ONLY these colors: Water Blue (#1E6FD9), Deep Blue (#123B8A), light blue (#E8F0FE, #B8D4F0). White background. Modern clean sans-serif typography like Inter. Professional, minimal, no pink/coral/orange. Include the HYGIA+ brand name prominently. Organic flowing water wave shapes at the bottom.`,

  "10-stages-filtration": `Create a professional vertical flow diagram infographic titled "10-Stage Filtration Process". Show 10 numbered stages connected by flowing blue lines: 1. Sediment Filter, 2. Catalytic Carbon, 3. KDF-55 Media, 4. Coconut Carbon, 5. Ion Exchange, 6. UV Treatment, 7. RO Membrane, 8. Post-Carbon Polish, 9. Mineral Addition, 10. Final Polish. Each stage has a simple icon. Colors: Water Blue (#1E6FD9), Deep Blue (#123B8A), light blue (#E8F0FE). White background. Clean sans-serif font. No pink/coral/orange.`,

  "system-diagram": `Create a professional technical diagram titled "How The System Works" showing a home water filtration system. Show water flow from house inlet through dual filtration tanks and a reverse osmosis unit with labeled components and blue pipe connections. Include a simple house outline on the left. Colors: Water Blue (#1E6FD9), Deep Blue (#123B8A), light blue (#E8F0FE). White background. Clean engineering schematic style. No pink/coral/orange.`,

  "benefits": `Create a professional infographic titled "Benefits of Water Filtration" with a 2x3 icon grid. Six benefits with circular blue icons: 1. Healthier Drinking Water (water glass), 2. Better Skin & Hair (person silhouette), 3. Longer Appliance Life (washing machine), 4. Eco-Friendly (leaf), 5. Better Taste (water drop with sparkle), 6. Reduced Contaminants (shield). Colors: Water Blue (#1E6FD9), Deep Blue (#123B8A), light blue (#E8F0FE). White background. Clean sans-serif. No pink/coral/orange.`,

  "whats-in-water": `Create a professional infographic titled "What's In Your Water?" showing common water contaminants. Central water droplet with magnifying glass. Surrounding it, show 6 contaminants with warning icons: Chlorine, Lead, PFAS, Bacteria, Sediment, Hard Minerals. Each with a blue warning triangle icon and a brief stat. Colors: Water Blue (#1E6FD9), Deep Blue (#123B8A). White background. Warning icons in dark blue, NOT red or orange. Clean sans-serif font.`,

  "home-needs-filtration": `Create a professional checklist infographic titled "Does Your Home Need Water Filtration?" with 6 items, each with a blue checkmark: Hard water buildup, Staining on fixtures, Dry skin and hair, Bad taste or odor, Cloudy water, Scale on appliances. Bottom section: dark blue banner with "Schedule Your Free Water Test" call-to-action. Colors: Water Blue (#1E6FD9), Deep Blue (#123B8A), light blue (#E8F0FE). White background. No pink/coral/orange.`,

  "why-choose-us": `Create a professional infographic titled "Why Choose Select Source Water" showing 5 competitive advantages in card layout: 1. Home Depot Authorized Dealer (with store badge icon), 2. 20-Year Warranty (shield checkmark), 3. Professional Installation (wrench), 4. Local Service Team (map pin), 5. 10-Stage Filtration System (filter icon). Each in its own rounded card. Colors: Water Blue (#1E6FD9), Deep Blue (#123B8A), light blue (#E8F0FE). White background. No pink/coral/orange.`,

  "customer-journey": `Create a professional infographic titled "Your Path to Clean Water" showing a 5-step vertical timeline with numbered dark blue circles and flowing blue arrows: 1. Free Water Test, 2. Custom Recommendation, 3. Professional Installation, 4. System Activation, 5. Ongoing Support. Each step has a simple icon and one-line description. Colors: Water Blue (#1E6FD9), Deep Blue (#123B8A), light blue (#E8F0FE). White background. Clean sans-serif. No pink/coral/orange.`,

  "maintenance-schedule": `Create a professional infographic titled "Annual Maintenance Schedule" showing a 12-month timeline (Jan-Dec). Highlight: Quarterly filter changes (Mar, Jun, Sep, Dec) in Water Blue, UV bulb replacement (Jun, Dec) in Deep Blue, Annual system flush (Dec) in darkest blue. Clean grid or timeline layout with a color-coded legend at the bottom. Colors: Water Blue (#1E6FD9), Deep Blue (#123B8A), light blue (#E8F0FE). White background. No pink/coral/orange.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { infographicId } = await req.json();

    if (!infographicId || !INFOGRAPHIC_PROMPTS[infographicId]) {
      return new Response(
        JSON.stringify({
          error: "Invalid infographic ID",
          validIds: Object.keys(INFOGRAPHIC_PROMPTS),
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const prompt = INFOGRAPHIC_PROMPTS[infographicId];

    console.log(`Generating infographic: ${infographicId}`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-pro-image-preview",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits in Settings → Workspace → Usage." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageUrl) {
      throw new Error("No image was generated");
    }

    return new Response(
      JSON.stringify({ imageUrl, infographicId }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error generating infographic:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
