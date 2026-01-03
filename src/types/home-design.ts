export interface PlotDetails {
  length: number;
  width: number;
  totalSqFt: number;
  numberOfFloors: number;
}

export interface RoomConfig {
  bedrooms: number;
  bathrooms: number;
  kitchen: boolean;
  livingRoom: boolean;
  diningArea: boolean;
  parking: number;
  balcony: number;
  storeRoom: number;
}

export interface RoomDimension {
  name: string;
  length: number;
  width: number;
  area: number;
}

export type ConstructionQuality = 'budget' | 'standard' | 'premium';
export type ArchitecturalStyle = 'modern' | 'traditional' | 'minimalist' | 'luxury';

export interface HomeDesignInput {
  plotDetails: PlotDetails;
  rooms: RoomConfig;
  roomDimensions: RoomDimension[];
  constructionQuality: ConstructionQuality;
  location: string;
  architecturalStyle: ArchitecturalStyle;
}

export interface MaterialEstimate {
  name: string;
  quantity: string;
  unit: string;
  unitPrice: number;
  totalPrice: number;
}

export interface CostBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

export interface AIDesignResponse {
  layoutExplanation: string;
  floorPlans: FloorPlan[];
  roomCalculations: RoomCalculation[];
  designRecommendations: string[];
  materialSuggestions: MaterialEstimate[];
  totalEstimatedCost: number;
  costBreakdown: CostBreakdown[];
}

export interface FloorPlan {
  floor: number;
  description: string;
  rooms: string[];
  area: number;
}

export interface RoomCalculation {
  name: string;
  floor: number;
  area: number;
  dimensions: string;
}

export interface SavedDesign {
  id: string;
  name: string;
  createdAt: Date;
  input: HomeDesignInput;
  response: AIDesignResponse;
}
