import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Building2, Calculator, Layers } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 blueprint-grid opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '-2s' }} />
      
      {/* Floating Elements */}
      <div className="absolute top-32 left-10 hidden lg:block animate-float">
        <div className="glass-card p-4 rounded-2xl">
          <Building2 className="w-8 h-8 text-accent" />
        </div>
      </div>
      <div className="absolute top-48 right-20 hidden lg:block animate-float-delayed">
        <div className="glass-card p-4 rounded-2xl">
          <Calculator className="w-8 h-8 text-primary" />
        </div>
      </div>
      <div className="absolute bottom-40 left-20 hidden lg:block animate-float" style={{ animationDelay: '-1s' }}>
        <div className="glass-card p-4 rounded-2xl">
          <Layers className="w-8 h-8 text-accent-secondary" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8 animate-slide-up">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">AI-Powered Architecture Design</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Design Your Dream Home with{" "}
            <span className="gradient-text">Artificial Intelligence</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up-delayed">
            Transform your vision into reality. Get AI-generated architectural plans, 
            accurate cost estimates, and material calculations in minutes.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up-delayed" style={{ animationDelay: '0.3s' }}>
            <Link to="/design">
              <Button variant="hero" size="xl" className="gap-2 group">
                <Sparkles className="w-5 h-5" />
                Start Designing
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="hero-outline" size="xl" className="gap-2">
                View Sample Designs
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border/50 animate-slide-up-delayed" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-1">10K+</div>
              <div className="text-sm text-muted-foreground">Designs Created</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-1">98%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-1">₹50L+</div>
              <div className="text-sm text-muted-foreground">Cost Estimated</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
