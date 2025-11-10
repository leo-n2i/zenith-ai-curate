import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { Sparkles, Zap, Shield, TrendingUp, ArrowRight, Users, Rocket, Globe, Award, CheckCircle, Star, Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Index = () => {
  const featuredProducts = products.slice(0, 6);
  const statsAnimation = useScrollAnimation(0.2);
  const howItWorksAnimation = useScrollAnimation(0.2);
  const testimonialsAnimation = useScrollAnimation(0.2);
  const faqAnimation = useScrollAnimation(0.2);

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

      {/* Stats Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5"></div>
        <div 
          ref={statsAnimation.ref}
          className={`container mx-auto relative z-10 transition-all duration-1000 ${
            statsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-5xl md:text-6xl font-bold gradient-text">
                <AnimatedCounter end={10000} suffix="+" isVisible={statsAnimation.isVisible} />
              </div>
              <p className="text-muted-foreground">Active Users</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl md:text-6xl font-bold gradient-text">
                <AnimatedCounter end={500} suffix="+" isVisible={statsAnimation.isVisible} />
              </div>
              <p className="text-muted-foreground">AI Solutions</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl md:text-6xl font-bold gradient-text">
                <AnimatedCounter end={95} suffix="%" isVisible={statsAnimation.isVisible} />
              </div>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl md:text-6xl font-bold gradient-text">
                <AnimatedCounter end={120} suffix="+" isVisible={statsAnimation.isVisible} />
              </div>
              <p className="text-muted-foreground">Countries Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
              <Rocket className="w-3 h-3 mr-1" />
              Simple Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Get Started in <span className="gradient-text">3 Easy Steps</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Deploy enterprise AI solutions in minutes, not months
            </p>
          </div>

          <div 
            ref={howItWorksAnimation.ref}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                step: "01",
                icon: Users,
                title: "Choose Your Solution",
                description: "Browse our curated marketplace of AI solutions or explore pre-built bundles tailored to your industry needs."
              },
              {
                step: "02",
                icon: Zap,
                title: "Quick Integration",
                description: "Seamlessly integrate with your existing tools using our plug-and-play APIs and comprehensive documentation."
              },
              {
                step: "03",
                icon: TrendingUp,
                title: "Scale & Optimize",
                description: "Monitor performance in real-time and scale effortlessly as your business grows with our intelligent infrastructure."
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`relative transition-all duration-700 delay-${index * 200} ${
                  howItWorksAnimation.isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="rounded-2xl bg-card border border-border/50 p-8 hover-lift relative overflow-hidden group">
                  <div className="absolute top-0 right-0 text-[120px] font-bold text-primary/5 leading-none">
                    {item.step}
                  </div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:shadow-glow transition-shadow">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-accent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-6">
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

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
              <Star className="w-3 h-3 mr-1" />
              Trusted by Leaders
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              What Our <span className="gradient-text">Customers Say</span>
            </h2>
          </div>

          <div 
            ref={testimonialsAnimation.ref}
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ${
              testimonialsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {[
              {
                name: "Sarah Chen",
                role: "CTO at HealthTech Solutions",
                content: "TagerAi's infrastructure has transformed how we deploy AI models. What used to take weeks now takes hours. The scalability is unmatched.",
                rating: 5
              },
              {
                name: "Marcus Rodriguez",
                role: "VP of Operations at FinanceFlow",
                content: "The analytics platform gave us insights we never thought possible. ROI was positive within the first quarter. Absolutely game-changing.",
                rating: 5
              },
              {
                name: "Emily Watson",
                role: "Head of Marketing at RetailHub",
                content: "Our conversion rates jumped 40% after implementing the AI optimization suite. The customer support is exceptional too.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="rounded-2xl bg-card border border-border/50 p-8 hover-lift relative"
              >
                <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent"></div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about TagerAi
            </p>
          </div>

          <div 
            ref={faqAnimation.ref}
            className={`transition-all duration-1000 ${
              faqAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="rounded-xl bg-card border border-border/50 px-6">
                <AccordionTrigger className="hover:no-underline">
                  How quickly can I get started?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Most of our AI solutions can be deployed in under 30 minutes. Our quick-start guides and comprehensive documentation ensure you're up and running fast.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="rounded-xl bg-card border border-border/50 px-6">
                <AccordionTrigger className="hover:no-underline">
                  What kind of support do you offer?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We provide 24/7 technical support, dedicated account managers for enterprise clients, comprehensive documentation, and regular training webinars.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="rounded-xl bg-card border border-border/50 px-6">
                <AccordionTrigger className="hover:no-underline">
                  Is my data secure?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Absolutely. We're SOC 2 Type II certified, GDPR compliant, and HIPAA compliant. All data is encrypted at rest and in transit using bank-level encryption.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="rounded-xl bg-card border border-border/50 px-6">
                <AccordionTrigger className="hover:no-underline">
                  Can I customize the AI solutions?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! All our solutions offer extensive customization options. Enterprise clients can also request fully custom AI models tailored to their specific needs.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="rounded-xl bg-card border border-border/50 px-6">
                <AccordionTrigger className="hover:no-underline">
                  What happens if I need to scale?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Our infrastructure automatically scales with your needs. From startup to enterprise, you can upgrade your plan anytime without any downtime or data migration.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
