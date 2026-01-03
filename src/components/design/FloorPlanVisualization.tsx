import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PlotDetails, RoomConfig } from "@/types/home-design";
import { Layers, Maximize2, Home, Bath, ChefHat, Sofa, UtensilsCrossed, Car, Trees, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloorPlanVisualizationProps {
  plotDetails: PlotDetails;
  roomConfig: RoomConfig;
}

interface RoomData {
  id: string;
  name: string;
  floor: number;
  width: number;
  height: number;
  x: number;
  y: number;
  area: number;
  color: string;
  icon: React.ElementType;
}

const roomColors: Record<string, string> = {
  bedroom: "hsl(var(--primary) / 0.3)",
  bathroom: "hsl(var(--accent) / 0.3)",
  kitchen: "hsl(142 76% 36% / 0.3)",
  living: "hsl(262 83% 58% / 0.3)",
  dining: "hsl(38 92% 50% / 0.3)",
  parking: "hsl(var(--muted) / 0.5)",
  balcony: "hsl(199 89% 48% / 0.3)",
  store: "hsl(var(--muted) / 0.3)",
};

const roomBorders: Record<string, string> = {
  bedroom: "hsl(var(--primary))",
  bathroom: "hsl(var(--accent))",
  kitchen: "hsl(142 76% 36%)",
  living: "hsl(262 83% 58%)",
  dining: "hsl(38 92% 50%)",
  parking: "hsl(var(--muted-foreground))",
  balcony: "hsl(199 89% 48%)",
  store: "hsl(var(--muted-foreground))",
};

export function FloorPlanVisualization({ plotDetails, roomConfig }: FloorPlanVisualizationProps) {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [activeFloor, setActiveFloor] = useState("1");

  const floors = useMemo(() => {
    return Array.from({ length: plotDetails.numberOfFloors }, (_, i) => i + 1);
  }, [plotDetails.numberOfFloors]);

  const floorArea = useMemo(() => {
    return Math.round(plotDetails.totalSqFt * 0.85);
  }, [plotDetails.totalSqFt]);

  const generateFloorLayout = (floor: number): RoomData[] => {
    const rooms: RoomData[] = [];
    const gridWidth = 100;
    const gridHeight = 100;
    
    const isGroundFloor = floor === 1;
    const isTopFloor = floor === plotDetails.numberOfFloors;
    
    let currentX = 2;
    let currentY = 2;
    
    // Determine rooms for this floor
    const bedroomsPerFloor = Math.ceil(roomConfig.bedrooms / plotDetails.numberOfFloors);
    const bathroomsPerFloor = Math.ceil(roomConfig.bathrooms / plotDetails.numberOfFloors);
    const bedroomsOnFloor = floor === 1 
      ? Math.floor(roomConfig.bedrooms / plotDetails.numberOfFloors)
      : Math.ceil(roomConfig.bedrooms / plotDetails.numberOfFloors);
    
    // Ground floor layout
    if (isGroundFloor) {
      // Living Room - Large central space
      if (roomConfig.livingRoom) {
        rooms.push({
          id: `living-${floor}`,
          name: "Living Room",
          floor,
          x: currentX,
          y: currentY,
          width: 45,
          height: 40,
          area: Math.round(floorArea * 0.18),
          color: roomColors.living,
          icon: Sofa,
        });
      }
      
      // Kitchen
      if (roomConfig.kitchen) {
        rooms.push({
          id: `kitchen-${floor}`,
          name: "Kitchen",
          floor,
          x: 49,
          y: currentY,
          width: 28,
          height: 25,
          area: Math.round(floorArea * 0.1),
          color: roomColors.kitchen,
          icon: ChefHat,
        });
      }
      
      // Dining
      if (roomConfig.diningArea) {
        rooms.push({
          id: `dining-${floor}`,
          name: "Dining Area",
          floor,
          x: 49,
          y: 29,
          width: 28,
          height: 20,
          area: Math.round(floorArea * 0.08),
          color: roomColors.dining,
          icon: UtensilsCrossed,
        });
      }
      
      // Ground floor bathroom
      if (bathroomsPerFloor > 0) {
        rooms.push({
          id: `bath-${floor}-1`,
          name: "Bathroom",
          floor,
          x: 79,
          y: currentY,
          width: 19,
          height: 22,
          area: Math.round(floorArea * 0.04),
          color: roomColors.bathroom,
          icon: Bath,
        });
      }
      
      // Parking
      if (roomConfig.parking > 0) {
        rooms.push({
          id: `parking-${floor}`,
          name: `Parking (${roomConfig.parking} car${roomConfig.parking > 1 ? 's' : ''})`,
          floor,
          x: currentX,
          y: 44,
          width: 35,
          height: 25,
          area: Math.round(floorArea * 0.12),
          color: roomColors.parking,
          icon: Car,
        });
      }
      
      // Store Room
      if (roomConfig.storeRoom > 0) {
        rooms.push({
          id: `store-${floor}`,
          name: "Store Room",
          floor,
          x: 39,
          y: 51,
          width: 20,
          height: 18,
          area: Math.round(floorArea * 0.04),
          color: roomColors.store,
          icon: Package,
        });
      }
      
      // Master Bedroom on ground floor (if bedrooms > 2)
      if (bedroomsOnFloor > 0) {
        rooms.push({
          id: `bedroom-${floor}-1`,
          name: "Master Bedroom",
          floor,
          x: currentX,
          y: 71,
          width: 35,
          height: 27,
          area: Math.round(floorArea * 0.12),
          color: roomColors.bedroom,
          icon: Home,
        });
      }
      
      // Balcony
      if (roomConfig.balcony > 0) {
        rooms.push({
          id: `balcony-${floor}`,
          name: "Balcony",
          floor,
          x: 61,
          y: 51,
          width: 37,
          height: 12,
          area: Math.round(floorArea * 0.05),
          color: roomColors.balcony,
          icon: Trees,
        });
      }
    } else {
      // Upper floor layouts
      const remainingBedrooms = roomConfig.bedrooms - (floor === 2 ? Math.floor(roomConfig.bedrooms / plotDetails.numberOfFloors) : 0);
      const bedroomsThisFloor = Math.min(remainingBedrooms, 3);
      
      // Bedrooms layout for upper floors
      if (bedroomsThisFloor >= 1) {
        rooms.push({
          id: `bedroom-${floor}-1`,
          name: floor === 2 ? "Bedroom 1" : "Bedroom",
          floor,
          x: currentX,
          y: currentY,
          width: 32,
          height: 35,
          area: Math.round(floorArea * 0.12),
          color: roomColors.bedroom,
          icon: Home,
        });
      }
      
      if (bedroomsThisFloor >= 2) {
        rooms.push({
          id: `bedroom-${floor}-2`,
          name: "Bedroom 2",
          floor,
          x: 36,
          y: currentY,
          width: 32,
          height: 35,
          area: Math.round(floorArea * 0.12),
          color: roomColors.bedroom,
          icon: Home,
        });
      }
      
      if (bedroomsThisFloor >= 3) {
        rooms.push({
          id: `bedroom-${floor}-3`,
          name: "Bedroom 3",
          floor,
          x: 70,
          y: currentY,
          width: 28,
          height: 35,
          area: Math.round(floorArea * 0.1),
          color: roomColors.bedroom,
          icon: Home,
        });
      }
      
      // Bathrooms for upper floors
      const bathroomsThisFloor = Math.max(1, Math.floor(roomConfig.bathrooms / plotDetails.numberOfFloors));
      for (let i = 0; i < bathroomsThisFloor && i < 2; i++) {
        rooms.push({
          id: `bath-${floor}-${i + 1}`,
          name: bathroomsThisFloor > 1 ? `Bathroom ${i + 1}` : "Bathroom",
          floor,
          x: currentX + (i * 35),
          y: 39,
          width: 18,
          height: 20,
          area: Math.round(floorArea * 0.04),
          color: roomColors.bathroom,
          icon: Bath,
        });
      }
      
      // Common area / Study
      rooms.push({
        id: `common-${floor}`,
        name: "Common Area",
        floor,
        x: 40,
        y: 39,
        width: 28,
        height: 28,
        area: Math.round(floorArea * 0.1),
        color: roomColors.living,
        icon: Sofa,
      });
      
      // Balconies for upper floors
      if (roomConfig.balcony > 0 && isTopFloor) {
        rooms.push({
          id: `balcony-${floor}`,
          name: "Terrace",
          floor,
          x: 70,
          y: 39,
          width: 28,
          height: 28,
          area: Math.round(floorArea * 0.08),
          color: roomColors.balcony,
          icon: Trees,
        });
      }
      
      // Store room on upper floors
      if (roomConfig.storeRoom > 1) {
        rooms.push({
          id: `store-${floor}`,
          name: "Store",
          floor,
          x: currentX,
          y: 61,
          width: 18,
          height: 15,
          area: Math.round(floorArea * 0.03),
          color: roomColors.store,
          icon: Package,
        });
      }
    }
    
    return rooms;
  };

  const floorLayouts = useMemo(() => {
    const layouts: Record<number, RoomData[]> = {};
    floors.forEach(floor => {
      layouts[floor] = generateFloorLayout(floor);
    });
    return layouts;
  }, [floors, roomConfig, plotDetails, floorArea]);

  const getRoomTypeFromId = (id: string): string => {
    if (id.includes('bedroom')) return 'bedroom';
    if (id.includes('bath')) return 'bathroom';
    if (id.includes('kitchen')) return 'kitchen';
    if (id.includes('living') || id.includes('common')) return 'living';
    if (id.includes('dining')) return 'dining';
    if (id.includes('parking')) return 'parking';
    if (id.includes('balcony') || id.includes('terrace')) return 'balcony';
    if (id.includes('store')) return 'store';
    return 'living';
  };

  return (
    <Card variant="elevated" className="overflow-hidden">
      <CardHeader className="border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Layers className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-display">Floor Plan Visualization</CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Interactive room layout • {plotDetails.numberOfFloors} floor{plotDetails.numberOfFloors > 1 ? 's' : ''} • {floorArea} sq ft/floor
              </p>
            </div>
          </div>
          <Badge variant="outline" className="gap-1.5">
            <Maximize2 className="w-3 h-3" />
            {plotDetails.length}' × {plotDetails.width}'
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <Tabs value={activeFloor} onValueChange={setActiveFloor} className="space-y-4">
          <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${floors.length}, 1fr)` }}>
            {floors.map(floor => (
              <TabsTrigger key={floor} value={floor.toString()} className="gap-2">
                <Layers className="w-4 h-4" />
                {floor === 1 ? 'Ground Floor' : `Floor ${floor}`}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {floors.map(floor => (
            <TabsContent key={floor} value={floor.toString()} className="mt-4">
              {/* Floor Plan SVG */}
              <div className="relative bg-muted/30 rounded-xl p-4 border border-border/50">
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-full aspect-square max-h-[500px]"
                  style={{ filter: 'drop-shadow(0 4px 6px rgb(0 0 0 / 0.1))' }}
                >
                  {/* Grid pattern */}
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="hsl(var(--border))" strokeWidth="0.2" opacity="0.5" />
                    </pattern>
                  </defs>
                  
                  {/* Plot boundary */}
                  <rect 
                    x="0" 
                    y="0" 
                    width="100" 
                    height="100" 
                    fill="url(#grid)"
                    stroke="hsl(var(--border))"
                    strokeWidth="0.5"
                    rx="2"
                  />
                  
                  {/* Rooms */}
                  {floorLayouts[floor]?.map((room) => {
                    const roomType = getRoomTypeFromId(room.id);
                    const isSelected = selectedRoom === room.id;
                    const Icon = room.icon;
                    
                    return (
                      <g 
                        key={room.id}
                        onClick={() => setSelectedRoom(isSelected ? null : room.id)}
                        className="cursor-pointer transition-all duration-200"
                        style={{ 
                          transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                          transformOrigin: `${room.x + room.width / 2}% ${room.y + room.height / 2}%`
                        }}
                      >
                        {/* Room background */}
                        <rect
                          x={room.x}
                          y={room.y}
                          width={room.width}
                          height={room.height}
                          fill={room.color}
                          stroke={roomBorders[roomType]}
                          strokeWidth={isSelected ? "0.8" : "0.4"}
                          rx="1"
                          className="transition-all duration-200"
                          style={{
                            filter: isSelected ? 'brightness(1.1)' : 'brightness(1)',
                          }}
                        />
                        
                        {/* Room name */}
                        <text
                          x={room.x + room.width / 2}
                          y={room.y + room.height / 2 - 2}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="fill-foreground font-medium"
                          style={{ fontSize: room.width > 25 ? '3px' : '2.5px' }}
                        >
                          {room.name}
                        </text>
                        
                        {/* Room area */}
                        <text
                          x={room.x + room.width / 2}
                          y={room.y + room.height / 2 + 4}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="fill-muted-foreground"
                          style={{ fontSize: '2.2px' }}
                        >
                          {room.area} sq ft
                        </text>
                        
                        {/* Dimensions */}
                        {isSelected && (
                          <>
                            <text
                              x={room.x + room.width / 2}
                              y={room.y - 1.5}
                              textAnchor="middle"
                              className="fill-primary"
                              style={{ fontSize: '2px', fontWeight: 600 }}
                            >
                              {Math.round(room.width * plotDetails.width / 100)}'
                            </text>
                            <text
                              x={room.x - 1.5}
                              y={room.y + room.height / 2}
                              textAnchor="middle"
                              className="fill-primary"
                              style={{ fontSize: '2px', fontWeight: 600 }}
                              transform={`rotate(-90, ${room.x - 1.5}, ${room.y + room.height / 2})`}
                            >
                              {Math.round(room.height * plotDetails.length / 100)}'
                            </text>
                          </>
                        )}
                      </g>
                    );
                  })}
                  
                  {/* Compass */}
                  <g transform="translate(92, 8)">
                    <circle cx="0" cy="0" r="4" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="0.3" />
                    <text x="0" y="0.5" textAnchor="middle" dominantBaseline="middle" className="fill-primary" style={{ fontSize: '3px', fontWeight: 700 }}>N</text>
                    <path d="M 0 -5 L 0 -3" stroke="hsl(var(--primary))" strokeWidth="0.3" />
                  </g>
                </svg>
                
                {/* Room Legend */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {floorLayouts[floor]?.map((room) => {
                    const roomType = getRoomTypeFromId(room.id);
                    const Icon = room.icon;
                    const isSelected = selectedRoom === room.id;
                    
                    return (
                      <button
                        key={room.id}
                        onClick={() => setSelectedRoom(isSelected ? null : room.id)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                          "border hover:scale-105",
                          isSelected 
                            ? "bg-primary text-primary-foreground border-primary shadow-md" 
                            : "bg-background border-border hover:border-primary/50"
                        )}
                      >
                        <Icon className="w-3 h-3" />
                        {room.name}
                        <span className="text-[10px] opacity-70">{room.area} sq ft</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Selected Room Details */}
              {selectedRoom && (
                <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20 animate-fade-in">
                  {(() => {
                    const room = floorLayouts[floor]?.find(r => r.id === selectedRoom);
                    if (!room) return null;
                    const Icon = room.icon;
                    
                    return (
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-display font-semibold text-lg">{room.name}</h4>
                          <div className="grid grid-cols-3 gap-4 mt-3">
                            <div>
                              <p className="text-xs text-muted-foreground">Area</p>
                              <p className="font-semibold">{room.area} sq ft</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Width</p>
                              <p className="font-semibold">{Math.round(room.width * plotDetails.width / 100)}' ({(room.width * plotDetails.width / 100 * 0.3048).toFixed(1)}m)</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Length</p>
                              <p className="font-semibold">{Math.round(room.height * plotDetails.length / 100)}' ({(room.height * plotDetails.length / 100 * 0.3048).toFixed(1)}m)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
