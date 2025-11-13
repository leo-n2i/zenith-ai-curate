import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-48 pb-32 px-12">
        <div className="container-wide">
          <div className="max-w-3xl space-y-12">
            <h1 className="text-6xl md:text-7xl font-semibold leading-tight tracking-tight">
              AI Solutions for Every Industry
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl">
              Transform your business with cutting-edge AI technology. Built for enterprises that demand excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <Link to="/products">
                <Button size="lg">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/bundles">
                <Button size="lg" variant="outline">
                  View Bundles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-12 border-y border-border">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            <div>
              <div className="text-5xl font-semibold mb-3">10,000+</div>
              <div className="text-muted-foreground">Companies Worldwide</div>
            </div>
            <div>
              <div className="text-5xl font-semibold mb-3">99.9%</div>
              <div className="text-muted-foreground">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-5xl font-semibold mb-3">24/7</div>
              <div className="text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 px-12">
        <div className="container-wide">
          <div className="mb-24">
            <h2 className="text-4xl font-semibold mb-6">Featured Products</h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Enterprise-grade AI solutions trusted by industry leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-24">
            <Link to="/products">
              <Button size="lg" variant="outline">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
