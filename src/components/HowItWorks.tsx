import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList, Sparkles, FileBarChart, Download } from "lucide-react";

const steps = [
  {
    step: 1,
    icon: ClipboardList,
    title: "Enter Your Requirements",
    description: "Provide plot dimensions, number of rooms, construction quality, and preferred architectural style.",
  },
  {
    step: 2,
    icon: Sparkles,
    title: "AI Generates Design",
    description: "Our AI analyzes your inputs and creates optimized floor plans with room layouts and dimensions.",
  },
  {
    step: 3,
    icon: FileBarChart,
    title: "Review Cost Breakdown",
    description: "Get detailed cost estimates including materials, labor, and category-wise expenditure breakdown.",
  },
  {
    step: 4,
    icon: Download,
    title: "Save & Export",
    description: "Save your design to dashboard, compare alternatives, and download professional PDF reports.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-6">
            <span className="text-sm font-medium text-muted-foreground">Simple Process</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Four simple steps to get your complete home design and cost estimation.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={item.step} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-border via-accent/50 to-border z-0" />
              )}
              
              <Card variant="glass" className="relative z-10 h-full">
                <CardContent className="p-6 text-center">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-accent shadow-accent mb-6">
                    <item.icon className="w-7 h-7 text-accent-foreground" />
                  </div>
                  
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="font-display font-bold text-sm text-muted-foreground">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
