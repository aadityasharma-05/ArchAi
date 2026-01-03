import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden gradient-hero p-12 lg:p-20">
          {/* Background Pattern */}
          <div className="absolute inset-0 blueprint-grid opacity-10" />
          
          {/* Glow Effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-secondary/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-8">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-primary-foreground">Start Building Today</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Ready to Design Your Perfect Home?
            </h2>

            <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              Join thousands of homeowners who have used ArchAI to plan their dream 
              homes with accurate cost estimates and professional designs.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/design">
                <Button size="xl" className="gap-2 group bg-accent text-accent-foreground hover:bg-accent/90 shadow-accent">
                  <Sparkles className="w-5 h-5" />
                  Get Started Free
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button 
                  size="xl" 
                  variant="outline"
                  className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  View Examples
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
