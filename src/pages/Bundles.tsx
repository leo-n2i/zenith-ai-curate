import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { bundles } from "@/data/products";
import { Check, Package, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Bundles = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-20 px-6">
        <div className="container mx-auto">
          {/* Hero */}
          <div className="text-center mb-16 space-y-6 animate-fade-in">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
              <Package className="w-3 h-3 mr-1" />
              Save Up to 30%
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold">
              AI Solution <span className="gradient-text">Bundles</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get more value with curated bundles of our best AI products. 
              Perfect combinations for every business need.
            </p>
          </div>

          {/* Bundles Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {bundles.map((bundle) => (
              <Card key={bundle.id} className="p-8 hover-lift">
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Package className="w-8 h-8 text-white" />
                      </div>
                      <Badge className="bg-gradient-to-r from-secondary to-accent text-white">
                        Save {bundle.savings}
                      </Badge>
                    </div>
                    
                    <h2 className="text-3xl font-bold mb-2">{bundle.name}</h2>
                    <p className="text-muted-foreground">{bundle.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-end gap-3">
                    <div>
                      <span className="text-muted-foreground line-through text-lg">
                        {bundle.originalPrice}
                      </span>
                      <div className="text-4xl font-bold gradient-text">
                        {bundle.bundlePrice}
                      </div>
                    </div>
                  </div>

                  {/* Products Included */}
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center">
                      <Sparkles className="w-4 h-4 mr-2 text-primary" />
                      What's Included:
                    </h3>
                    <ul className="space-y-2">
                      {bundle.products.map((product, index) => (
                        <li key={index} className="flex items-center text-muted-foreground">
                          <Check className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                          {product}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <Button className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-glow" size="lg">
                    Get This Bundle
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Why Bundles Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Choose <span className="gradient-text">Bundles</span>?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💰</span>
                </div>
                <h3 className="font-semibold text-xl mb-2">Save Money</h3>
                <p className="text-muted-foreground">
                  Get up to 30% off compared to individual product pricing
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="font-semibold text-xl mb-2">Curated Solutions</h3>
                <p className="text-muted-foreground">
                  Expertly selected products that work perfectly together
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="font-semibold text-xl mb-2">Faster Setup</h3>
                <p className="text-muted-foreground">
                  Pre-configured integrations for immediate productivity
                </p>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90"></div>
            <div className="relative z-10 px-8 py-16 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Need a Custom Bundle?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Contact our sales team to create a personalized bundle for your unique business needs
              </p>
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  Contact Sales
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Bundles;
