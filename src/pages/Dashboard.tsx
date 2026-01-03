import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Home, 
  Calendar, 
  IndianRupee, 
  Layers,
  MoreHorizontal,
  Eye,
  Trash2,
  Copy,
  Sparkles,
  TrendingUp,
  Building2
} from "lucide-react";
import { formatCurrency } from "@/lib/cost-calculator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample saved designs for demonstration
const sampleDesigns = [
  {
    id: '1',
    name: 'Modern Villa',
    createdAt: new Date('2024-01-15'),
    plotSize: 2400,
    floors: 2,
    bedrooms: 4,
    style: 'Modern',
    quality: 'Premium',
    totalCost: 8544000,
    location: 'Bangalore',
  },
  {
    id: '2',
    name: 'Compact Home',
    createdAt: new Date('2024-01-20'),
    plotSize: 1200,
    floors: 2,
    bedrooms: 3,
    style: 'Minimalist',
    quality: 'Standard',
    totalCost: 3672000,
    location: 'Pune',
  },
  {
    id: '3',
    name: 'Traditional House',
    createdAt: new Date('2024-01-25'),
    plotSize: 1800,
    floors: 1,
    bedrooms: 3,
    style: 'Traditional',
    quality: 'Standard',
    totalCost: 2754000,
    location: 'Chennai',
  },
];

export default function Dashboard() {
  const [designs] = useState(sampleDesigns);

  const totalProjects = designs.length;
  const totalCostEstimated = designs.reduce((sum, d) => sum + d.totalCost, 0);
  const avgCostPerSqFt = Math.round(
    totalCostEstimated / designs.reduce((sum, d) => sum + d.plotSize * d.floors * 0.85, 0)
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
                Your Designs
              </h1>
              <p className="text-muted-foreground">
                Manage and compare your saved home designs
              </p>
            </div>
            <Link to="/design">
              <Button variant="accent" className="gap-2">
                <Plus className="w-4 h-4" />
                New Design
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card variant="stat">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Total Projects</div>
                    <div className="font-display text-2xl font-bold">{totalProjects}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="stat">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <IndianRupee className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Total Estimated</div>
                    <div className="font-display text-2xl font-bold">{formatCurrency(totalCostEstimated)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="stat">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Avg Cost/Sq Ft</div>
                    <div className="font-display text-2xl font-bold">₹{avgCostPerSqFt.toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Designs Grid */}
          {designs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {designs.map((design) => (
                <Card key={design.id} variant="elevated" className="group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
                          <Home className="w-5 h-5 text-accent-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{design.name}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Calendar className="w-3 h-3" />
                            {design.createdAt.toLocaleDateString()}
                          </CardDescription>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="w-4 h-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Copy className="w-4 h-4" /> Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="w-4 h-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{design.style}</Badge>
                      <Badge variant="outline">{design.quality}</Badge>
                      <Badge variant="outline">{design.location}</Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-2 rounded-lg bg-secondary/50">
                        <div className="font-display font-bold text-foreground">{design.plotSize}</div>
                        <div className="text-xs text-muted-foreground">Sq Ft</div>
                      </div>
                      <div className="p-2 rounded-lg bg-secondary/50">
                        <div className="font-display font-bold text-foreground">{design.floors}</div>
                        <div className="text-xs text-muted-foreground">Floors</div>
                      </div>
                      <div className="p-2 rounded-lg bg-secondary/50">
                        <div className="font-display font-bold text-foreground">{design.bedrooms}</div>
                        <div className="text-xs text-muted-foreground">BHK</div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Estimated Cost</span>
                        <span className="font-display text-xl font-bold text-accent">
                          {formatCurrency(design.totalCost)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Create New Card */}
              <Link to="/design" className="block h-full">
                <Card className="h-full border-2 border-dashed border-border hover:border-accent/50 transition-colors cursor-pointer group">
                  <CardContent className="h-full flex flex-col items-center justify-center p-6 min-h-[280px]">
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      Create New Design
                    </h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Start designing your next dream home
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ) : (
            <Card className="p-12 text-center">
              <div className="max-w-sm mx-auto">
                <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-accent" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">No designs yet</h3>
                <p className="text-muted-foreground mb-6">
                  Create your first home design and get instant AI-powered cost estimates
                </p>
                <Link to="/design">
                  <Button variant="accent" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Create First Design
                  </Button>
                </Link>
              </div>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
