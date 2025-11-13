import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2, CheckCircle, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { products } from '@/data/products';

const Checkout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const productId = searchParams.get('product');
  const planParam = searchParams.get('plan');

  const product = products.find(p => p.id === productId);

  const [selectedPlan, setSelectedPlan] = useState<string>(planParam || 'professional');

  const pricingTiers = {
    starter: { name: 'Starter', price: 99 },
    professional: { name: 'Professional', price: 299 },
    enterprise: { name: 'Enterprise', price: 999 },
  } as const;

  useEffect(() => {
    if (!user) {
      navigate(`/products/${productId}`);
      return;
    }

    if (!product) {
      toast.error('Product not found');
      navigate('/products');
    }
  }, [user, product, productId, navigate]);

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to the payment method selection page with query params
    navigate(`/payment-method?product=${productId}&plan=${selectedPlan}`);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-montserrat font-extrabold text-foreground mb-2">Get Started</h1>
            <p className="text-grey-light font-montserrat">Choose the perfect plan for your needs</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleProceedToPayment} className="space-y-6">
                <div className="flex justify-between items-center gap-4">
                  <Button type="button" variant="outline" size="lg" onClick={() => navigate(`/products/${productId}`)}>
                    Back
                  </Button>
                  <Button type="submit" className="bg-gradient-to-r from-primary to-accent" size="lg">
                    Continue to Payment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </form>
            </div>

            <div className="lg:col-span-1">
              <Card className="tech-card p-6 sticky top-24">
                <h2 className="text-xl font-montserrat font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-grey-dark/50 border border-grey-medium">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-background">AI</span>
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold text-foreground">{product.name}</h3>
                      <p className="text-sm text-grey-light">{product.category}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-grey-medium">
                  <div className="flex justify-between">
                    <span className="text-grey-light font-montserrat">Plan</span>
                    <span className="font-montserrat font-semibold">{pricingTiers[selectedPlan as keyof typeof pricingTiers].name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-grey-light font-montserrat">Billing</span>
                    <span className="font-montserrat font-semibold">Monthly</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-grey-medium">
                    <span className="font-montserrat font-bold">Total</span>
                    <span className="text-2xl font-montserrat font-extrabold text-primary">${pricingTiers[selectedPlan as keyof typeof pricingTiers].price}/mo</span>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-montserrat font-semibold text-sm mb-1">What's Included:</p>
                      <ul className="text-xs text-grey-light space-y-1">
                        {product.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
