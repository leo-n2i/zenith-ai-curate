import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { Sparkles, Zap, Shield, TrendingUp, ArrowRight } from "lucide-react";

const Index = () => {
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
              <Sparkles className="w-3 h-3 mr-1" />
              Trusted by 10,000+ Companies
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Discover AI Solutions for{" "}
              <span className="gradient-text">Every Industry</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your business with cutting-edge AI solutions. From healthcare to finance, 
              find the perfect tools to accelerate growth and innovation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:shadow-glow">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/bundles">
                <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/10">
                  View Bundles
                </Button>
              </Link>
            </div>
          </div>

          {/* Floating Cards Animation */}
          <div className="mt-20 relative h-64 hidden lg:block">
            <div className="absolute top-0 left-1/4 w-48 h-32 rounded-xl glass-effect p-4 animate-float" style={{ animationDelay: '0s' }}>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent"></div>
                <span className="font-semibold text-sm">AI Analytics</span>
              </div>
              <p className="text-xs text-muted-foreground">99.9% accuracy</p>
            </div>
            
            <div className="absolute top-12 right-1/4 w-48 h-32 rounded-xl glass-effect p-4 animate-float" style={{ animationDelay: '2s' }}>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-secondary"></div>
                <span className="font-semibold text-sm">Smart Automation</span>
              </div>
              <p className="text-xs text-muted-foreground">Save 60% time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-xl bg-card border border-border/50 p-6 hover-lift">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground text-sm">
                Deploy AI solutions in minutes, not months. Get started instantly.
              </p>
            </div>

            <div className="rounded-xl bg-card border border-border/50 p-6 hover-lift">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Enterprise Security</h3>
              <p className="text-muted-foreground text-sm">
                Bank-level encryption and compliance with SOC 2, GDPR, HIPAA.
              </p>
            </div>

            <div className="rounded-xl bg-card border border-border/50 p-6 hover-lift">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Scale Effortlessly</h3>
              <p className="text-muted-foreground text-sm">
                From startup to enterprise, our AI grows with your business.
              </p>
            </div>

            <div className="rounded-xl bg-card border border-border/50 p-6 hover-lift">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Innovation</h3>
              <p className="text-muted-foreground text-sm">
                Access the latest AI models and technologies as they emerge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Featured <span className="gradient-text">Products</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our most popular AI solutions trusted by industry leaders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/10">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-6 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Browse by <span className="gradient-text">Category</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find AI solutions tailored to your industry
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.slice(1).map((category) => (
              <Link
                key={category}
                to="/products"
                className="rounded-xl bg-card border border-border/50 p-6 text-center hover-lift group"
              >
                <h3 className="font-semibold group-hover:gradient-text transition-all">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90"></div>
            <div className="relative z-10 px-8 py-16 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Join thousands of companies leveraging AI to drive growth and innovation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/products">
                  <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                    Get Started Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
