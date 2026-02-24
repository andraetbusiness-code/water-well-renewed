import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Download, RefreshCw, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PortalLayout } from "@/components/portal/PortalLayout";

// Current infographic images
import betterWaterHero from "@/assets/infographics/better-water-hero-styled.png";
import tenStages from "@/assets/infographics/10-stages-filtration-styled.png";
import systemDiagram from "@/assets/infographics/system-diagram-styled.png";
import benefits from "@/assets/infographics/benefits-styled.png";
import whatsInWater from "@/assets/infographics/whats-in-water-styled.png";
import homeNeeds from "@/assets/infographics/home-needs-filtration-styled.png";
import whyChooseUs from "@/assets/infographics/why-choose-us-styled.png";
import customerJourney from "@/assets/infographics/customer-journey-styled.png";
import maintenanceSchedule from "@/assets/infographics/maintenance-schedule-styled.png";

interface InfographicSlot {
  id: string;
  title: string;
  currentImage: string;
  filename: string;
}

const INFOGRAPHIC_SLOTS: InfographicSlot[] = [
  { id: "better-water-hero", title: "Better Water Starts Here", currentImage: betterWaterHero, filename: "better-water-hero-styled.png" },
  { id: "10-stages-filtration", title: "10-Stage Filtration Process", currentImage: tenStages, filename: "10-stages-filtration-styled.png" },
  { id: "system-diagram", title: "How The System Works", currentImage: systemDiagram, filename: "system-diagram-styled.png" },
  { id: "benefits", title: "Benefits of Filtration", currentImage: benefits, filename: "benefits-styled.png" },
  { id: "whats-in-water", title: "What's In Your Water?", currentImage: whatsInWater, filename: "whats-in-water-styled.png" },
  { id: "home-needs-filtration", title: "Does Your Home Need Filtration?", currentImage: homeNeeds, filename: "home-needs-filtration-styled.png" },
  { id: "why-choose-us", title: "Why Choose Select Source Water", currentImage: whyChooseUs, filename: "why-choose-us-styled.png" },
  { id: "customer-journey", title: "Your Path to Clean Water", currentImage: customerJourney, filename: "customer-journey-styled.png" },
  { id: "maintenance-schedule", title: "Maintenance Schedule", currentImage: maintenanceSchedule, filename: "maintenance-schedule-styled.png" },
];

export default function InfographicGenerator() {
  const { toast } = useToast();
  const [generating, setGenerating] = useState<string | null>(null);
  const [previews, setPreviews] = useState<Record<string, string>>({});

  const handleGenerate = async (slotId: string) => {
    setGenerating(slotId);
    try {
      const { data, error } = await supabase.functions.invoke("generate-infographic", {
        body: { infographicId: slotId },
      });

      if (error) throw error;

      if (data?.imageUrl) {
        setPreviews((prev) => ({ ...prev, [slotId]: data.imageUrl }));
        toast({
          title: "Image generated!",
          description: "Preview is ready. Click Download to save.",
        });
      } else {
        throw new Error("No image returned");
      }
    } catch (err: any) {
      console.error("Generation error:", err);
      toast({
        title: "Generation failed",
        description: err.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setGenerating(null);
    }
  };

  const handleDownload = (slotId: string, filename: string) => {
    const imageUrl = previews[slotId];
    if (!imageUrl) return;

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Infographic Generator</h1>
          <p className="text-muted-foreground mt-1">
            Generate brand-new infographics using AI. Each image is designed with the brand blue palette.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INFOGRAPHIC_SLOTS.map((slot) => {
            const isGenerating = generating === slot.id;
            const hasPreview = !!previews[slot.id];
            const displayImage = hasPreview ? previews[slot.id] : slot.currentImage;

            return (
              <Card key={slot.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">{slot.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="relative aspect-square rounded-md overflow-hidden bg-muted">
                    {isGenerating ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="text-xs text-muted-foreground">Generating...</span>
                      </div>
                    ) : (
                      <img
                        src={displayImage}
                        alt={slot.title}
                        className="w-full h-full object-contain"
                      />
                    )}
                    {hasPreview && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                        New
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleGenerate(slot.id)}
                      disabled={!!generating}
                      className="flex-1"
                    >
                      {isGenerating ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <RefreshCw className="h-3 w-3" />
                      )}
                      {hasPreview ? "Regenerate" : "Generate"}
                    </Button>
                    {hasPreview && (
                      <Button
                        size="sm"
                        onClick={() => handleDownload(slot.id, slot.filename)}
                        className="flex-1"
                      >
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </PortalLayout>
  );
}
