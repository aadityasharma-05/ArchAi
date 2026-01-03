import { Card, CardContent } from "@/components/ui/card";
import { 
  Brain, 
  Calculator, 
  Layers, 
  FileText, 
  TrendingUp, 
  Shield,
  Palette,
  Clock
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Design",
    description: "Natural language prompts transform into detailed architectural plans with intelligent layout optimization.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Calculator,
    title: "Precise Cost Estimation",
    description: "Real-time cost calculations based on location, materials, and construction quality preferences.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Layers,
    title: "Floor-wise Planning",
    description: "Detailed breakdown for each floor with room dimensions, area calculations, and spatial optimization.",
    color: "text-accent-secondary",
    bgColor: "bg-accent-secondary/10",
  },
  {
    icon: FileText,
    title: "Material Estimation",
    description: "Comprehensive material lists with quantities, unit costs, and vendor recommendations.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: TrendingUp,
    title: "Smart Optimization",
    description: "AI suggestions for layout improvements, cost savings, and future-ready design recommendations.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Palette,
    title: "Multiple Styles",
    description: "Choose from Modern, Traditional, Minimalist, or Luxury architectural styles to match your vision.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Clock,
    title: "Instant Results",
    description: "Get complete design proposals and cost breakdowns in under 60 seconds.",
    color: "text-accent-secondary",
    bgColor: "bg-accent-secondary/10",
  },
  {
    icon: Shield,
    title: "Save & Compare",
    description: "Save multiple designs, compare costs, and export professional PDF reports.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
];

export function Features() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 blueprint-dots" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6">
            <span className="text-sm font-medium text-muted-foreground">Powerful Features</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Plan Your Home</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From initial concept to final cost estimate, our AI handles every aspect 
            of your home design process.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              variant="feature"
              className="group cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
