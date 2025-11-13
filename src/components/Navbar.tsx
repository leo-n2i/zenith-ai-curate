import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { AuthModal } from "@/components/AuthModal";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-3 group">
            <span className="font-semibold text-xl tracking-tight">TagerAi</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
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

          {/* CTA Button and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-6">
            <ThemeToggle />
            {user ? (
              <Button onClick={() => navigate('/dashboard')}>
                <User className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            ) : (
              <Button onClick={() => setAuthModalOpen(true)}>
                Get Started
              </Button>
            )}
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
            {user ? (
              <Button 
                className="w-full bg-gradient-to-r from-primary to-accent"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/dashboard');
                }}
              >
                <User className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            ) : (
              <Button 
                className="w-full bg-gradient-to-r from-primary to-accent"
                onClick={() => {
                  setIsOpen(false);
                  setAuthModalOpen(true);
                }}
              >
                Get Started
              </Button>
            )}
          </div>
        )}
      </div>
      
      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
      />
    </nav>
  );
};

export default Navbar;
