import { ConstructionQuality, CostBreakdown, MaterialEstimate } from "@/types/home-design";

// Cost per sq ft based on quality (in INR)
const COST_PER_SQFT: Record<ConstructionQuality, number> = {
  budget: 1200,
  standard: 1800,
  premium: 2800,
};

// Location multipliers
const LOCATION_MULTIPLIERS: Record<string, number> = {
  'Mumbai': 1.5,
  'Delhi': 1.4,
  'Bangalore': 1.35,
  'Chennai': 1.25,
  'Hyderabad': 1.25,
  'Pune': 1.3,
  'Kolkata': 1.2,
  'Ahmedabad': 1.15,
  'Other Metro': 1.2,
  'Tier 2 City': 1.0,
  'Tier 3 City': 0.85,
  'Rural': 0.7,
};

// Material rates (per unit in INR)
const MATERIAL_RATES = {
  cement: { rate: 380, unit: 'bag (50kg)', perSqFt: 0.4 },
  steel: { rate: 65, unit: 'kg', perSqFt: 4 },
  bricks: { rate: 8, unit: 'piece', perSqFt: 8 },
  sand: { rate: 65, unit: 'cft', perSqFt: 1.2 },
  aggregate: { rate: 55, unit: 'cft', perSqFt: 0.8 },
  flooring: { rate: { budget: 45, standard: 85, premium: 180 }, unit: 'sq ft' },
  paint: { rate: { budget: 25, standard: 45, premium: 75 }, unit: 'sq ft' },
  electrical: { rate: { budget: 120, standard: 200, premium: 350 }, unit: 'sq ft' },
  plumbing: { rate: { budget: 80, standard: 150, premium: 280 }, unit: 'sq ft' },
  doors: { rate: { budget: 8000, standard: 15000, premium: 35000 }, unit: 'piece' },
  windows: { rate: { budget: 5000, standard: 12000, premium: 25000 }, unit: 'piece' },
};

export function calculateLocationMultiplier(location: string): number {
  return LOCATION_MULTIPLIERS[location] || 1.0;
}

export function calculateBaseCost(
  sqFt: number,
  quality: ConstructionQuality,
  location: string
): number {
  const baseCostPerSqFt = COST_PER_SQFT[quality];
  const locationMultiplier = calculateLocationMultiplier(location);
  return Math.round(sqFt * baseCostPerSqFt * locationMultiplier);
}

export function calculateMaterialEstimates(
  sqFt: number,
  quality: ConstructionQuality,
  floors: number,
  rooms: { bedrooms: number; bathrooms: number }
): MaterialEstimate[] {
  const totalArea = sqFt * floors;
  const doorCount = rooms.bedrooms + rooms.bathrooms + 3; // +3 for main, kitchen, store
  const windowCount = rooms.bedrooms * 2 + 2; // 2 per bedroom + 2 common

  const materials: MaterialEstimate[] = [
    {
      name: 'Cement',
      quantity: Math.ceil(totalArea * MATERIAL_RATES.cement.perSqFt).toString(),
      unit: MATERIAL_RATES.cement.unit,
      unitPrice: MATERIAL_RATES.cement.rate,
      totalPrice: Math.ceil(totalArea * MATERIAL_RATES.cement.perSqFt) * MATERIAL_RATES.cement.rate,
    },
    {
      name: 'Steel',
      quantity: Math.ceil(totalArea * MATERIAL_RATES.steel.perSqFt).toString(),
      unit: MATERIAL_RATES.steel.unit,
      unitPrice: MATERIAL_RATES.steel.rate,
      totalPrice: Math.ceil(totalArea * MATERIAL_RATES.steel.perSqFt) * MATERIAL_RATES.steel.rate,
    },
    {
      name: 'Bricks',
      quantity: Math.ceil(totalArea * MATERIAL_RATES.bricks.perSqFt).toString(),
      unit: MATERIAL_RATES.bricks.unit,
      unitPrice: MATERIAL_RATES.bricks.rate,
      totalPrice: Math.ceil(totalArea * MATERIAL_RATES.bricks.perSqFt) * MATERIAL_RATES.bricks.rate,
    },
    {
      name: 'Sand',
      quantity: Math.ceil(totalArea * MATERIAL_RATES.sand.perSqFt).toString(),
      unit: MATERIAL_RATES.sand.unit,
      unitPrice: MATERIAL_RATES.sand.rate,
      totalPrice: Math.ceil(totalArea * MATERIAL_RATES.sand.perSqFt) * MATERIAL_RATES.sand.rate,
    },
    {
      name: 'Aggregate',
      quantity: Math.ceil(totalArea * MATERIAL_RATES.aggregate.perSqFt).toString(),
      unit: MATERIAL_RATES.aggregate.unit,
      unitPrice: MATERIAL_RATES.aggregate.rate,
      totalPrice: Math.ceil(totalArea * MATERIAL_RATES.aggregate.perSqFt) * MATERIAL_RATES.aggregate.rate,
    },
    {
      name: 'Flooring',
      quantity: totalArea.toString(),
      unit: MATERIAL_RATES.flooring.unit,
      unitPrice: MATERIAL_RATES.flooring.rate[quality],
      totalPrice: totalArea * MATERIAL_RATES.flooring.rate[quality],
    },
    {
      name: 'Paint',
      quantity: Math.ceil(totalArea * 3.5).toString(), // Wall area ≈ 3.5x floor area
      unit: MATERIAL_RATES.paint.unit,
      unitPrice: MATERIAL_RATES.paint.rate[quality],
      totalPrice: Math.ceil(totalArea * 3.5) * MATERIAL_RATES.paint.rate[quality],
    },
    {
      name: 'Electrical Work',
      quantity: totalArea.toString(),
      unit: MATERIAL_RATES.electrical.unit,
      unitPrice: MATERIAL_RATES.electrical.rate[quality],
      totalPrice: totalArea * MATERIAL_RATES.electrical.rate[quality],
    },
    {
      name: 'Plumbing',
      quantity: totalArea.toString(),
      unit: MATERIAL_RATES.plumbing.unit,
      unitPrice: MATERIAL_RATES.plumbing.rate[quality],
      totalPrice: totalArea * MATERIAL_RATES.plumbing.rate[quality],
    },
    {
      name: 'Doors',
      quantity: doorCount.toString(),
      unit: MATERIAL_RATES.doors.unit,
      unitPrice: MATERIAL_RATES.doors.rate[quality],
      totalPrice: doorCount * MATERIAL_RATES.doors.rate[quality],
    },
    {
      name: 'Windows',
      quantity: windowCount.toString(),
      unit: MATERIAL_RATES.windows.unit,
      unitPrice: MATERIAL_RATES.windows.rate[quality],
      totalPrice: windowCount * MATERIAL_RATES.windows.rate[quality],
    },
  ];

  return materials;
}

export function calculateCostBreakdown(
  totalCost: number,
  quality: ConstructionQuality
): CostBreakdown[] {
  const breakdownPercentages = {
    budget: {
      'Structure & Foundation': 35,
      'Finishing & Flooring': 15,
      'Electrical & Plumbing': 18,
      'Doors & Windows': 10,
      'Paint & Polish': 8,
      'Labor Charges': 12,
      'Miscellaneous': 2,
    },
    standard: {
      'Structure & Foundation': 30,
      'Finishing & Flooring': 18,
      'Electrical & Plumbing': 16,
      'Doors & Windows': 12,
      'Paint & Polish': 10,
      'Labor Charges': 10,
      'Miscellaneous': 4,
    },
    premium: {
      'Structure & Foundation': 25,
      'Finishing & Flooring': 22,
      'Electrical & Plumbing': 15,
      'Doors & Windows': 15,
      'Paint & Polish': 12,
      'Labor Charges': 8,
      'Miscellaneous': 3,
    },
  };

  const percentages = breakdownPercentages[quality];

  return Object.entries(percentages).map(([category, percentage]) => ({
    category,
    amount: Math.round((totalCost * percentage) / 100),
    percentage,
  }));
}

export function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatFullCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
