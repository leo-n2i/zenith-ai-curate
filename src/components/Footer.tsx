import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border mt-48">
      <div className="container-wide py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* Brand */}
          <div className="space-y-6">
            <span className="font-semibold text-xl">TagerAi</span>
            <p className="text-muted-foreground">
              AI solutions for every industry. Built for enterprises.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-medium mb-6">Products</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/bundles" className="text-muted-foreground hover:text-foreground transition-colors">
                  Bundles
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-medium mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-medium mb-6">Connect</h3>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-16 pt-12 text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TagerAi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
