import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Ruler, Layers } from "lucide-react";
import { PlotDetails } from "@/types/home-design";

interface PlotDetailsFormProps {
  data: PlotDetails;
  onChange: (data: PlotDetails) => void;
}

export function PlotDetailsForm({ data, onChange }: PlotDetailsFormProps) {
  useEffect(() => {
    const totalSqFt = data.length * data.width;
    if (totalSqFt !== data.totalSqFt) {
      onChange({ ...data, totalSqFt });
    }
  }, [data.length, data.width]);

  return (
    <Card variant="glass">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Ruler className="w-5 h-5 text-accent" />
          </div>
          <div>
            <CardTitle className="text-xl">Plot Dimensions</CardTitle>
            <CardDescription>Enter your plot size and floor requirements</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="length">Length (ft)</Label>
            <Input
              id="length"
              type="number"
              min={10}
              max={500}
              value={data.length || ""}
              onChange={(e) => onChange({ ...data, length: Number(e.target.value) })}
              placeholder="e.g., 40"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="width">Width (ft)</Label>
            <Input
              id="width"
              type="number"
              min={10}
              max={500}
              value={data.width || ""}
              onChange={(e) => onChange({ ...data, width: Number(e.target.value) })}
              placeholder="e.g., 30"
            />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-secondary/50 border border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Plot Area</span>
            <span className="font-display text-2xl font-bold text-foreground">
              {data.totalSqFt.toLocaleString()} sq ft
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-accent" />
              Number of Floors
            </Label>
            <span className="font-display text-xl font-bold text-accent">
              {data.numberOfFloors}
            </span>
          </div>
          <Slider
            value={[data.numberOfFloors]}
            onValueChange={([value]) => onChange({ ...data, numberOfFloors: value })}
            min={1}
            max={5}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 Floor</span>
            <span>5 Floors</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Built-up Area (Approx)</span>
            <span className="font-display text-xl font-bold text-primary">
              {(data.totalSqFt * data.numberOfFloors * 0.85).toLocaleString()} sq ft
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Assuming 85% built-up ratio per floor
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
