import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";

const Products = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All Products"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  const handleCategoryToggle = (category: string) => {
    if (category === "All Products") {
      setSelectedCategories(["All Products"]);
    } else {
      const newCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category && c !== "All Products")
        : [...selectedCategories.filter((c) => c !== "All Products"), category];
      
      setSelectedCategories(newCategories.length === 0 ? ["All Products"] : newCategories);
    }
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategories.includes("All Products") ||
        selectedCategories.includes(product.category);
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") {
        return parseInt(a.price.match(/\d+/)?.[0] || "0") - parseInt(b.price.match(/\d+/)?.[0] || "0");
      } else if (sortBy === "price-high") {
        return parseInt(b.price.match(/\d+/)?.[0] || "0") - parseInt(a.price.match(/\d+/)?.[0] || "0");
      }
      return 0;
    });

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-20 px-6">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-12 space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold">
              All <span className="gradient-text">Products</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Discover AI solutions tailored to your industry needs
            </p>
          </div>

          {/* Search and Sort Bar */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 animate-fade-in">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border/50"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[200px] bg-card border-border/50">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 space-y-6 animate-fade-in">
              <div className="rounded-xl bg-card border border-border/50 p-6">
                <h3 className="font-semibold mb-4 text-lg">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryToggle(category)}
                      />
                      <label
                        htmlFor={category}
                        className="text-sm cursor-pointer hover:text-primary transition-colors"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <main className="flex-1">
              <div className="mb-6 text-muted-foreground">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">
                    No products found. Try adjusting your filters or search query.
                  </p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
