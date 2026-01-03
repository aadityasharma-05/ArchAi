import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Palette, MapPin, Sparkles } from "lucide-react";
import { ConstructionQuality, ArchitecturalStyle } from "@/types/home-design";
import { cn } from "@/lib/utils";

interface StylePreferencesFormProps {
  quality: ConstructionQuality;
  style: ArchitecturalStyle;
  location: string;
  onQualityChange: (quality: ConstructionQuality) => void;
  onStyleChange: (style: ArchitecturalStyle) => void;
  onLocationChange: (location: string) => void;
}

const qualityOptions: { value: ConstructionQuality; label: string; description: string; priceRange: string }[] = [
  { 
    value: 'budget', 
    label: 'Budget', 
    description: 'Cost-effective materials and finishes',
    priceRange: '₹1,200 - ₹1,500/sq ft'
  },
  { 
    value: 'standard', 
    label: 'Standard', 
    description: 'Quality materials with good durability',
    priceRange: '₹1,800 - ₹2,200/sq ft'
  },
  { 
    value: 'premium', 
    label: 'Premium', 
    description: 'High-end finishes and luxury materials',
    priceRange: '₹2,800 - ₹4,000/sq ft'
  },
];

const styleOptions: { value: ArchitecturalStyle; label: string; description: string }[] = [
  { value: 'modern', label: 'Modern', description: 'Clean lines, open spaces, minimal ornamentation' },
  { value: 'traditional', label: 'Traditional', description: 'Classic design with cultural elements' },
  { value: 'minimalist', label: 'Minimalist', description: 'Simple forms, functional design, neutral colors' },
  { value: 'luxury', label: 'Luxury', description: 'Grand design with premium aesthetics' },
];

const locationOptions = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Chennai',
  'Hyderabad',
  'Pune',
  'Kolkata',
  'Ahmedabad',
  'Other Metro',
  'Tier 2 City',
  'Tier 3 City',
  'Rural',
];

export function StylePreferencesForm({
  quality,
  style,
  location,
  onQualityChange,
  onStyleChange,
  onLocationChange,
}: StylePreferencesFormProps) {
  return (
    <Card variant="glass">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent-secondary/10 flex items-center justify-center">
            <Palette className="w-5 h-5 text-accent-secondary" />
          </div>
          <div>
            <CardTitle className="text-xl">Style & Preferences</CardTitle>
            <CardDescription>Choose your construction quality and design style</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Construction Quality */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            Construction Quality
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {qualityOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onQualityChange(option.value)}
                className={cn(
                  "p-4 rounded-xl border text-left transition-all duration-200",
                  quality === option.value
                    ? "border-accent bg-accent/5 shadow-soft"
                    : "border-border bg-card hover:border-accent/50"
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display font-semibold text-foreground">{option.label}</span>
                  <span className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full",
                    quality === option.value ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    {option.priceRange}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Architectural Style */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-primary" />
            Architectural Style
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {styleOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onStyleChange(option.value)}
                className={cn(
                  "p-4 rounded-xl border text-left transition-all duration-200",
                  style === option.value
                    ? "border-primary bg-primary/5 shadow-soft"
                    : "border-border bg-card hover:border-primary/50"
                )}
              >
                <span className="font-display font-semibold text-foreground block mb-1">
                  {option.label}
                </span>
                <p className="text-xs text-muted-foreground">{option.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent-secondary" />
            Project Location
          </Label>
          <Select value={location} onValueChange={onLocationChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select your city" />
            </SelectTrigger>
            <SelectContent>
              {locationOptions.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Location affects material and labor costs in the estimation
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
