import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2, CreditCard, Landmark } from 'lucide-react';
import { toast } from 'sonner';
import { products } from '@/data/products';

const PaymentMethod = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [processing, setProcessing] = useState(false);

  const productId = searchParams.get('product');
  const planParam = searchParams.get('plan');

  const product = products.find(p => p.id === productId);
  const [selectedPlan, setSelectedPlan] = useState(planParam || 'professional');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  const pricingTiers = {
    starter: { name: 'Starter', price: 99 },
    professional: { name: 'Professional', price: 299 },
    enterprise: { name: 'Enterprise', price: 999 },
  };

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

  const handlePayNow = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !product) return;

    setProcessing(true);

    try {
      const selectedPlanData = pricingTiers[selectedPlan as keyof typeof pricingTiers];

      // Save order to Supabase database
      const { data, error } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          product_id: product.id,
          product_name: product.name,
          plan: selectedPlanData.name,
          amount: selectedPlanData.price,
          payment_method: paymentMethod === 'credit_card' ? 'Credit Card' : 'Bank Transfer',
          status: 'pending',
        } as any)
        .select()
        .single();

      if (error) {
        console.error('Error saving order to database:', error);
        toast.error('Failed to create order: ' + error.message);
        return;
      }

      // Redirect directly to order payment page
      if (data && data.id) {
        setTimeout(() => {
          navigate(`/dashboard/orders/${data.id}`);
        }, 500);
      }

    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Failed to process payment');
    } finally {
      setProcessing(false);
    }
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
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl font-montserrat font-extrabold text-foreground mb-2">
              Select Payment Method
            </h1>
            <p className="text-grey-light font-montserrat">
              Choose how you'd like to pay for your {product.name} subscription
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* Plan Summary */}
                <Card className="tech-card p-6">
                  <h2 className="text-2xl font-montserrat font-bold mb-6">Order Summary</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-grey-dark/50 border border-grey-medium">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-background">AI</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-montserrat font-bold text-foreground">{product.name}</h3>
                        <p className="text-sm text-grey-light">{product.category}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-grey-medium">
                      <div>
                        <span className="text-grey-light text-sm font-montserrat">Plan</span>
                        <p className="font-montserrat font-bold text-foreground mt-1">
                          {pricingTiers[selectedPlan as keyof typeof pricingTiers].name}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-grey-light text-sm font-montserrat">Price</span>
                        <p className="font-montserrat font-bold text-primary mt-1">
                          ${pricingTiers[selectedPlan as keyof typeof pricingTiers].price}/mo
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Plan Selection */}
                <Card className="tech-card p-6">
                  <h2 className="text-2xl font-montserrat font-bold mb-6">Select Plan</h2>
                  <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Starter Plan */}
                      <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        selectedPlan === 'starter' ? 'border-primary bg-primary/5' : 'border-grey-medium hover:border-primary'
                      }`}>
                        <RadioGroupItem value="starter" id="starter" />
                        <Label htmlFor="starter" className="cursor-pointer flex-1">
                          <p className="font-montserrat font-semibold text-foreground">Starter</p>
                          <p className="text-sm text-primary font-bold">$99/mo</p>
                        </Label>
                      </div>

                      {/* Professional Plan */}
                      <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        selectedPlan === 'professional' ? 'border-primary bg-primary/5' : 'border-grey-medium hover:border-primary'
                      }`}>
                        <RadioGroupItem value="professional" id="professional" />
                        <Label htmlFor="professional" className="cursor-pointer flex-1">
                          <p className="font-montserrat font-semibold text-foreground">Professional</p>
                          <p className="text-sm text-primary font-bold">$299/mo</p>
                        </Label>
                      </div>

                      {/* Enterprise Plan */}
                      <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        selectedPlan === 'enterprise' ? 'border-primary bg-primary/5' : 'border-grey-medium hover:border-primary'
                      }`}>
                        <RadioGroupItem value="enterprise" id="enterprise" />
                        <Label htmlFor="enterprise" className="cursor-pointer flex-1">
                          <p className="font-montserrat font-semibold text-foreground">Enterprise</p>
                          <p className="text-sm text-primary font-bold">$999/mo</p>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </Card>

                {/* Payment Method Selection */}
                <Card className="tech-card p-6">
                  <h2 className="text-2xl font-montserrat font-bold mb-6">Payment Method</h2>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-4">
                      {/* Credit Card Option */}
                      <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        paymentMethod === 'credit_card' ? 'border-primary bg-primary/5' : 'border-grey-medium hover:border-primary'
                      }`}>
                        <RadioGroupItem value="credit_card" id="credit_card" />
                        <Label htmlFor="credit_card" className="flex items-center gap-3 cursor-pointer flex-1">
                          <CreditCard className="h-6 w-6 text-primary" />
                          <div>
                            <p className="font-montserrat font-semibold text-foreground">Credit/Debit Card</p>
                            <p className="text-sm text-grey-light">Visa, Mastercard, American Express</p>
                          </div>
                        </Label>
                      </div>

                      {/* Bank Transfer Option */}
                      <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        paymentMethod === 'bank_transfer' ? 'border-primary bg-primary/5' : 'border-grey-medium hover:border-primary'
                      }`}>
                        <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                        <Label htmlFor="bank_transfer" className="flex items-center gap-3 cursor-pointer flex-1">
                          <Landmark className="h-6 w-6 text-primary" />
                          <div>
                            <p className="font-montserrat font-semibold text-foreground">Bank Transfer</p>
                            <p className="text-sm text-grey-light">Direct bank transfer</p>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  {/* Additional Info */}
                  <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-sm text-foreground font-montserrat">
                      {paymentMethod === 'credit_card'
                        ? '💳 Your card details will be securely processed. You will receive a confirmation and invoice via email.'
                        : '🏦 Bank transfer details will be provided on the next page. Your account will be activated once payment is received.'}
                    </p>
                  </div>
                </Card>

                <div className="flex gap-4">
                  <Button
                    onClick={(e: any) => {
                      e.preventDefault();
                      navigate('/dashboard/orders');
                    }}
                    variant="outline"
                    className="flex-1"
                    size="lg"
                    disabled={processing}
                  >
                    Continue
                  </Button>
                  
                  <Button
                    onClick={handlePayNow}
                    className="flex-1 bg-gradient-to-r from-primary to-accent"
                    size="lg"
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Pay Now'
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="lg:col-span-1">
              <Card className="tech-card p-6 sticky top-24">
                <h2 className="text-lg font-montserrat font-bold mb-4">Payment Info</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-grey-light font-montserrat uppercase tracking-wide mb-2">Selected Plan</p>
                    <p className="font-montserrat font-bold text-foreground">
                      {pricingTiers[selectedPlan as keyof typeof pricingTiers].name}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-grey-medium">
                    <p className="text-xs text-grey-light font-montserrat uppercase tracking-wide mb-2">Total Amount</p>
                    <p className="text-2xl font-montserrat font-extrabold text-primary">
                      ${pricingTiers[selectedPlan as keyof typeof pricingTiers].price}
                    </p>
                    <p className="text-xs text-grey-light font-montserrat mt-1">per month</p>
                  </div>
                  <div className="pt-4 border-t border-grey-medium">
                    <p className="text-xs text-grey-light font-montserrat uppercase tracking-wide mb-2">Selected Method</p>
                    <p className="font-montserrat font-semibold text-foreground">
                      {paymentMethod === 'credit_card' ? '💳 Credit Card' : '🏦 Bank Transfer'}
                    </p>
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

export default PaymentMethod;
