import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Menu, X, Sparkles, LayoutDashboard, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/design", label: "Design", icon: Sparkles },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full group-hover:bg-accent/30 transition-colors" />
              <div className="relative w-10 h-10 rounded-xl gradient-accent flex items-center justify-center shadow-accent">
                <Home className="w-5 h-5 text-accent-foreground" />
              </div>
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "gap-2 font-medium",
                      isActive && "bg-secondary text-foreground"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link to="/design" className="hidden sm:block">
              <Button variant="accent" className="gap-2">
                <Sparkles className="w-4 h-4" />
                Start Designing
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/50 animate-fade-in-down">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-2",
                        isActive && "bg-secondary"
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
              <Link to="/design" onClick={() => setIsMenuOpen(false)}>
                <Button variant="accent" className="w-full gap-2 mt-2">
                  <Sparkles className="w-4 h-4" />
                  Start Designing
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
