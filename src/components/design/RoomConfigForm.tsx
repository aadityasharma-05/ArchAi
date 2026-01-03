import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  Bed, 
  Bath, 
  UtensilsCrossed, 
  Sofa, 
  Utensils, 
  Car, 
  Sun, 
  Package 
} from "lucide-react";
import { RoomConfig } from "@/types/home-design";

interface RoomConfigFormProps {
  data: RoomConfig;
  onChange: (data: RoomConfig) => void;
}

const roomSliders = [
  { key: 'bedrooms' as const, label: 'Bedrooms', icon: Bed, min: 1, max: 6, color: 'text-accent' },
  { key: 'bathrooms' as const, label: 'Bathrooms', icon: Bath, min: 1, max: 5, color: 'text-primary' },
  { key: 'parking' as const, label: 'Parking Spaces', icon: Car, min: 0, max: 4, color: 'text-accent-secondary' },
  { key: 'balcony' as const, label: 'Balconies', icon: Sun, min: 0, max: 4, color: 'text-success' },
  { key: 'storeRoom' as const, label: 'Store Rooms', icon: Package, min: 0, max: 3, color: 'text-muted-foreground' },
];

const roomToggles = [
  { key: 'kitchen' as const, label: 'Modular Kitchen', icon: UtensilsCrossed, color: 'text-accent' },
  { key: 'livingRoom' as const, label: 'Living Room', icon: Sofa, color: 'text-primary' },
  { key: 'diningArea' as const, label: 'Dining Area', icon: Utensils, color: 'text-accent-secondary' },
];

export function RoomConfigForm({ data, onChange }: RoomConfigFormProps) {
  return (
    <Card variant="glass">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Bed className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Room Configuration</CardTitle>
            <CardDescription>Specify the rooms you need in your home</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sliders */}
        {roomSliders.map((room) => (
          <div key={room.key} className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <room.icon className={`w-4 h-4 ${room.color}`} />
                {room.label}
              </Label>
              <span className={`font-display text-xl font-bold ${room.color}`}>
                {data[room.key]}
              </span>
            </div>
            <Slider
              value={[data[room.key]]}
              onValueChange={([value]) => onChange({ ...data, [room.key]: value })}
              min={room.min}
              max={room.max}
              step={1}
              className="w-full"
            />
          </div>
        ))}

        <div className="border-t border-border pt-6">
          <h4 className="font-display font-semibold text-foreground mb-4">Additional Rooms</h4>
          <div className="space-y-4">
            {roomToggles.map((room) => (
              <div key={room.key} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-border">
                <Label className="flex items-center gap-3 cursor-pointer">
                  <div className={`w-8 h-8 rounded-lg bg-card flex items-center justify-center`}>
                    <room.icon className={`w-4 h-4 ${room.color}`} />
                  </div>
                  <span className="font-medium">{room.label}</span>
                </Label>
                <Switch
                  checked={data[room.key]}
                  onCheckedChange={(checked) => onChange({ ...data, [room.key]: checked })}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
          <div className="text-sm text-muted-foreground mb-2">Room Summary</div>
          <div className="flex flex-wrap gap-2">
            {data.bedrooms > 0 && (
              <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                {data.bedrooms} BHK
              </span>
            )}
            {data.bathrooms > 0 && (
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {data.bathrooms} Bath
              </span>
            )}
            {data.parking > 0 && (
              <span className="px-3 py-1 rounded-full bg-accent-secondary/10 text-accent-secondary text-sm font-medium">
                {data.parking} Parking
              </span>
            )}
            {data.kitchen && (
              <span className="px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
                Kitchen
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
