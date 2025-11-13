import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Order {
  id: string;
  user_id?: string;
  product_name: string;
  plan: string;
  amount: number;
  payment_method: string;
  status: 'pending' | 'paid' | 'failed';
  created_at: string;
}

const OrderPayment = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    loadOrder();
  }, [id, user?.id, navigate]);

  const loadOrder = async () => {
    setLoading(true);
    try {
      console.log('🔍 Loading order ID:', id, 'for user:', user?.id);

      // Load from Supabase database
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .eq('user_id', user?.id)
        .single() as any;

      if (error) {
        console.error('❌ Error loading order:', error);
        toast.error('Order not found');
        return;
      }

      if (data) {
        const order: Order = {
          id: data.id,
          user_id: data.user_id,
          product_name: data.product_name,
          plan: data.plan,
          amount: data.amount,
          payment_method: data.payment_method,
          status: data.status === 'completed' ? 'paid' : (data.status || 'pending'),
          created_at: data.created_at,
        };
        console.log('✅ Order found:', order);
        setOrder(order);
      } else {
        console.log('❌ Order not found');
        toast.error('Order not found');
      }
    } catch (e) {
      console.error('Error loading order:', e);
      toast.error('Failed to load order');
    } finally {
      setLoading(false);
    }
  };

  const handlePayNow = async () => {
    if (!order) return;
    setProcessing(true);
    try {
      // Simulate payment processing
      await new Promise((r) => setTimeout(r, 1500));

      // Update order status to 'completed' in database
      const { error } = await supabase
        .from('orders')
        .update({ status: 'completed' })
        .eq('id', order.id)
        .eq('user_id', user?.id) as any;

      if (error) {
        console.error('Error updating order:', error);
        toast.error('Payment failed');
        return;
      }

      console.log('✅ Payment completed, order marked as paid');
      setOrder({ ...order, status: 'paid' });
      toast.success('Payment completed successfully!');
      setTimeout(() => navigate('/dashboard/orders'), 800);
    } catch (e) {
      console.error('Payment error:', e);
      toast.error('Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1 ml-64 bg-background min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1 ml-64 bg-background min-h-screen p-8">
          <Card className="p-8 max-w-2xl">
            <h2 className="text-xl font-bold mb-4 text-red-500">Order Not Found</h2>
            <p className="text-grey-light mb-4">
              Could not find order with ID: <code className="bg-grey-dark p-1 rounded">{id}</code>
            </p>
            <p className="text-grey-light mb-6">
              Please check the browser console for debugging information.
            </p>
            <Button onClick={() => navigate('/dashboard/orders')} variant="outline">
              Back to Orders
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 ml-64 bg-background min-h-screen">
        <div className="p-8 max-w-3xl">
          <h1 className="text-3xl font-montserrat font-extrabold mb-2 text-foreground">Complete Payment</h1>
          <p className="text-grey-light mb-8">
            Order for <strong className="text-foreground">{order.product_name}</strong> — {order.plan} Plan
          </p>

          <Card className="p-6 mb-6 tech-card">
            <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-grey-medium">
              <div>
                <p className="text-xs text-grey-light font-montserrat uppercase tracking-wide mb-1">Amount</p>
                <p className="font-bold text-2xl text-primary">${order.amount}</p>
              </div>
              <div>
                <p className="text-xs text-grey-light font-montserrat uppercase tracking-wide mb-1">Status</p>
                <p className="font-semibold text-foreground">{order.status}</p>
              </div>
              <div>
                <p className="text-xs text-grey-light font-montserrat uppercase tracking-wide mb-1">Payment Method</p>
                <p className="font-semibold text-foreground">{order.payment_method}</p>
              </div>
            </div>

            {order.payment_method.includes('Credit') ? (
              <div className="space-y-4">
                <h3 className="text-lg font-montserrat font-bold mb-4">Enter Card Details</h3>
                <div>
                  <Label htmlFor="card-number" className="font-montserrat">Card Number</Label>
                  <Input 
                    id="card-number" 
                    placeholder="4242 4242 4242 4242"
                    className="mt-2 bg-grey-dark border-grey-medium"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry" className="font-montserrat">Expiry Date</Label>
                    <Input 
                      id="expiry" 
                      placeholder="MM/YY"
                      className="mt-2 bg-grey-dark border-grey-medium"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="font-montserrat">CVV</Label>
                    <Input 
                      id="cvv" 
                      placeholder="123"
                      className="mt-2 bg-grey-dark border-grey-medium"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6 pt-4 border-t border-grey-medium">
                  <Button 
                    className="bg-gradient-to-r from-primary to-accent px-8" 
                    onClick={handlePayNow} 
                    disabled={processing}
                    size="lg"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      'Pay Now'
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-montserrat font-bold mb-4">Bank Transfer Instructions</h3>
                <p className="text-grey-light mb-4">
                  Please transfer the amount to the following bank account:
                </p>
                <div className="bg-grey-dark/50 p-4 rounded-lg border border-grey-medium mb-4">
                  <p className="font-montserrat font-semibold text-foreground mb-2">CDM Bank</p>
                  <p className="text-sm text-grey-light mb-1"><strong>IBAN:</strong> FR76 3000 6000 0112 3456 7890 189</p>
                  <p className="text-sm text-grey-light"><strong>BIC:</strong> EXAMPLFR</p>
                </div>
                <p className="text-grey-light mb-6">
                  Once you've transferred the funds, click the button below to mark the order as paid.
                </p>
                <div className="flex justify-end pt-4 border-t border-grey-medium">
                  <Button 
                    className="bg-gradient-to-r from-primary to-accent px-8" 
                    onClick={handlePayNow} 
                    disabled={processing}
                    size="lg"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      'Mark as Paid'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </Card>

        </div>
      </div>
    </div>
  );
};

export default OrderPayment;
