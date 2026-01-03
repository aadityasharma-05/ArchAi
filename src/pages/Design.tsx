import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PlotDetailsForm } from "@/components/design/PlotDetailsForm";
import { RoomConfigForm } from "@/components/design/RoomConfigForm";
import { StylePreferencesForm } from "@/components/design/StylePreferencesForm";
import { CostSummary } from "@/components/design/CostSummary";
import { FloorPlanVisualization } from "@/components/design/FloorPlanVisualization";
import { 
  PlotDetails,
  RoomConfig, 
  ConstructionQuality, 
  ArchitecturalStyle 
} from "@/types/home-design";
import {
  calculateBaseCost,
  calculateMaterialEstimates,
  calculateCostBreakdown,
} from "@/lib/cost-calculator";
import { Sparkles, Save, Download, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialPlotDetails: PlotDetails = {
  length: 40,
  width: 30,
  totalSqFt: 1200,
  numberOfFloors: 2,
};

const initialRoomConfig: RoomConfig = {
  bedrooms: 3,
  bathrooms: 2,
  kitchen: true,
  livingRoom: true,
  diningArea: true,
  parking: 1,
  balcony: 2,
  storeRoom: 1,
};

export default function Design() {
  const { toast } = useToast();
  const [plotDetails, setPlotDetails] = useState<PlotDetails>(initialPlotDetails);
  const [roomConfig, setRoomConfig] = useState<RoomConfig>(initialRoomConfig);
  const [quality, setQuality] = useState<ConstructionQuality>('standard');
  const [style, setStyle] = useState<ArchitecturalStyle>('modern');
  const [location, setLocation] = useState<string>('Tier 2 City');

  const totalBuiltArea = useMemo(() => {
    return Math.round(plotDetails.totalSqFt * plotDetails.numberOfFloors * 0.85);
  }, [plotDetails]);

  const totalCost = useMemo(() => {
    return calculateBaseCost(totalBuiltArea, quality, location);
  }, [totalBuiltArea, quality, location]);

  const materials = useMemo(() => {
    return calculateMaterialEstimates(
      plotDetails.totalSqFt,
      quality,
      plotDetails.numberOfFloors,
      { bedrooms: roomConfig.bedrooms, bathrooms: roomConfig.bathrooms }
    );
  }, [plotDetails, quality, roomConfig]);

  const costBreakdown = useMemo(() => {
    return calculateCostBreakdown(totalCost, quality);
  }, [totalCost, quality]);

  const handleSaveDesign = () => {
    toast({
      title: "Design Saved!",
      description: "Your home design has been saved to your dashboard.",
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Your PDF report is being prepared for download.",
    });
  };

  const handleReset = () => {
    setPlotDetails(initialPlotDetails);
    setRoomConfig(initialRoomConfig);
    setQuality('standard');
    setStyle('modern');
    setLocation('Tier 2 City');
    toast({
      title: "Reset Complete",
      description: "All values have been reset to defaults.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">AI Design Studio</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Design Your <span className="gradient-text">Dream Home</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Configure your home specifications and get instant AI-powered cost estimates
            </p>
          </div>

          {/* Design Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Input Forms */}
            <div className="lg:col-span-2 space-y-6">
              <PlotDetailsForm 
                data={plotDetails} 
                onChange={setPlotDetails} 
              />
              
              <RoomConfigForm 
                data={roomConfig} 
                onChange={setRoomConfig} 
              />
              
              <StylePreferencesForm
                quality={quality}
                style={style}
                location={location}
                onQualityChange={setQuality}
                onStyleChange={setStyle}
                onLocationChange={setLocation}
              />

              {/* Floor Plan Visualization */}
              <FloorPlanVisualization
                plotDetails={plotDetails}
                roomConfig={roomConfig}
              />

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button variant="accent" size="lg" className="gap-2" onClick={handleSaveDesign}>
                  <Save className="w-4 h-4" />
                  Save Design
                </Button>
                <Button variant="default" size="lg" className="gap-2" onClick={handleGenerateReport}>
                  <Download className="w-4 h-4" />
                  Generate Report
                </Button>
                <Button variant="outline" size="lg" className="gap-2" onClick={handleReset}>
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </Button>
              </div>
            </div>

            {/* Right Column - Cost Summary */}
            <div className="lg:sticky lg:top-24 h-fit">
              <CostSummary
                totalCost={totalCost}
                costBreakdown={costBreakdown}
                materials={materials}
                sqFt={totalBuiltArea}
                quality={quality}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
