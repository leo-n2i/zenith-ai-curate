import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="font-bold text-xl gradient-text">NextCore</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              end
              className="text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground font-medium"
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className="text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground font-medium"
            >
              Products
            </NavLink>
            <NavLink
              to="/bundles"
              className="text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground font-medium"
            >
              Bundles
            </NavLink>
            <NavLink
              to="/contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground font-medium"
            >
              Contact
            </NavLink>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <NavLink
              to="/"
              end
              className="block text-muted-foreground hover:text-foreground transition-colors py-2"
              activeClassName="text-foreground font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className="block text-muted-foreground hover:text-foreground transition-colors py-2"
              activeClassName="text-foreground font-medium"
              onClick={() => setIsOpen(false)}
            >
              Products
            </NavLink>
            <NavLink
              to="/bundles"
              className="block text-muted-foreground hover:text-foreground transition-colors py-2"
              activeClassName="text-foreground font-medium"
              onClick={() => setIsOpen(false)}
            >
              Bundles
            </NavLink>
            <NavLink
              to="/contact"
              className="block text-muted-foreground hover:text-foreground transition-colors py-2"
              activeClassName="text-foreground font-medium"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </NavLink>
            <Button className="w-full bg-gradient-to-r from-primary to-accent">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
