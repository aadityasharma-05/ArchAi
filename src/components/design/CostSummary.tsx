import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, IndianRupee, ArrowUpRight } from "lucide-react";
import { CostBreakdown, MaterialEstimate } from "@/types/home-design";
import { formatCurrency, formatFullCurrency } from "@/lib/cost-calculator";

interface CostSummaryProps {
  totalCost: number;
  costBreakdown: CostBreakdown[];
  materials: MaterialEstimate[];
  sqFt: number;
  quality: string;
}

export function CostSummary({ totalCost, costBreakdown, materials, sqFt, quality }: CostSummaryProps) {
  const costPerSqFt = sqFt > 0 ? Math.round(totalCost / sqFt) : 0;

  return (
    <div className="space-y-6">
      {/* Total Cost Card */}
      <Card variant="feature" className="overflow-hidden">
        <div className="gradient-hero p-6 text-primary-foreground">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
              <IndianRupee className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-primary-foreground/70">Estimated Total Cost</div>
              <div className="font-display text-3xl font-bold">
                {formatFullCurrency(totalCost)}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-primary-foreground/70">Cost per sq ft</span>
            <span className="font-semibold flex items-center gap-1">
              ₹{costPerSqFt.toLocaleString('en-IN')}
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-xl bg-secondary/50">
              <div className="text-2xl font-display font-bold text-foreground">
                {sqFt.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Total Sq Ft</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-secondary/50">
              <div className="text-2xl font-display font-bold text-foreground capitalize">
                {quality}
              </div>
              <div className="text-xs text-muted-foreground">Quality</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card variant="glass">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            <CardTitle className="text-lg">Cost Breakdown</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {costBreakdown.map((item) => (
            <div key={item.category} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.category}</span>
                <span className="font-medium text-foreground">{formatCurrency(item.amount)}</span>
              </div>
              <Progress value={item.percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Materials */}
      <Card variant="glass">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Material Estimates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {materials.slice(0, 5).map((material) => (
              <div key={material.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div>
                  <div className="font-medium text-foreground text-sm">{material.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {material.quantity} {material.unit}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground text-sm">
                    {formatCurrency(material.totalPrice)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ₹{material.unitPrice}/{material.unit.split(' ')[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
