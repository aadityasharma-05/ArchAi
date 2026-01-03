import { Link } from "react-router-dom";
import { Home, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center shadow-accent">
                <Home className="w-5 h-5 text-accent-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-none text-foreground">
                  ArchAI
                </span>
                <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">
                  Home Designer
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">
              AI-powered home architecture design and cost estimation platform. 
              Transform your vision into reality with intelligent planning tools.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/design" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Start Designing
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Cost Calculator
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Material Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Design Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 ArchAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
