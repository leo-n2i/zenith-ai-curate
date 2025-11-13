import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, Clock, CreditCard, Landmark, Download } from 'lucide-react';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Order {
  id: string;
  product_name: string;
  plan: string;
  amount: number;
  payment_method: string;
  status: 'pending' | 'paid' | 'failed';
  created_at: string;
    user_id?: string;
}

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    loadOrders();
  }, [user, navigate]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      console.log('Loading orders for user:', user?.id);
      
      // Load from Supabase database
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false }) as any;

      if (error) {
        console.error('Error loading orders from database:', error);
        toast.error('Failed to load orders');
        setOrders([]);
        return;
      }

      if (data && data.length > 0) {
        console.log('Orders loaded from database:', data);
        const orders = data.map((item: any) => ({
          id: item.id,
          user_id: item.user_id,
          product_name: item.product_name,
          plan: item.plan,
          amount: item.amount,
          payment_method: item.payment_method,
          status: item.status === 'completed' ? 'paid' : (item.status || 'pending'),
          created_at: item.created_at,
        }));
        setOrders(orders);
      } else {
        console.log('No orders found in database');
        setOrders([]);
      }

    } catch (error) {
      console.error('Failed to load orders:', error);
      toast.error('Error loading orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCompletePayment = async (orderId: string) => {
    try {
      setCompleting(orderId);

      // Update order status to 'completed' in database
      const { error } = await supabase
        .from('orders')
        .update({ status: 'completed' })
        .eq('id', orderId)
        .eq('user_id', user?.id) as any;

      if (error) {
        console.error('Error updating order:', error);
        toast.error('Failed to complete payment');
        return;
      }

      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: 'paid' } : order
      ));

      toast.success('Payment completed successfully!');
    } catch (error) {
      console.error('Error completing payment:', error);
      toast.error('Failed to complete payment');
    } finally {
      setCompleting(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Badge className="bg-green-500/20 text-green-400 border border-green-500/50">
            <CheckCircle className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/50">
            <Clock className="h-3 w-3 mr-1" />
            Not Paid
          </Badge>
        );
      case 'failed':
        return (
          <Badge className="bg-red-500/20 text-red-400 border border-red-500/50">
            Failed
          </Badge>
        );
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    if (method.includes('Credit') || method.includes('card')) {
      return <CreditCard className="h-4 w-4" />;
    } else if (method.includes('Bank') || method.includes('transfer')) {
      return <Landmark className="h-4 w-4" />;
    }
    return null;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 ml-64 bg-background min-h-screen">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-montserrat font-extrabold text-foreground mb-2">
              My Orders
            </h1>
            <p className="text-grey-light font-montserrat">
              View and manage your orders and payments
            </p>
          </div>

          {orders.length === 0 ? (
            <Card className="tech-card p-12 text-center">
              <div className="mb-4">
                <Loader2 className="h-12 w-12 text-grey-medium mx-auto opacity-50" />
              </div>
              <h2 className="text-xl font-montserrat font-bold text-foreground mb-2">
                No Orders Yet
              </h2>
              <p className="text-grey-light font-montserrat mb-6">
                You haven't placed any orders yet. Start by browsing our products.
              </p>
              <Button 
                onClick={() => navigate('/products')}
                className="bg-gradient-to-r from-primary to-accent"
              >
                Browse Products
              </Button>
            </Card>
          ) : (
            <Card className="tech-card overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-grey-medium hover:bg-transparent">
                      <TableHead className="text-grey-light font-montserrat font-bold">Product</TableHead>
                      <TableHead className="text-grey-light font-montserrat font-bold">Plan</TableHead>
                      <TableHead className="text-grey-light font-montserrat font-bold">Amount</TableHead>
                      <TableHead className="text-grey-light font-montserrat font-bold">Payment Method</TableHead>
                      <TableHead className="text-grey-light font-montserrat font-bold">Status</TableHead>
                      <TableHead className="text-grey-light font-montserrat font-bold">Date</TableHead>
                      <TableHead className="text-grey-light font-montserrat font-bold text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow 
                        key={order.id}
                        className="border-grey-medium hover:bg-grey-dark/50 transition-colors"
                      >
                        <TableCell className="font-montserrat text-foreground font-semibold">
                          {order.product_name}
                        </TableCell>
                        <TableCell className="font-montserrat text-grey-light">
                          {order.plan}
                        </TableCell>
                        <TableCell className="font-montserrat text-foreground font-bold">
                          ${order.amount}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-grey-light font-montserrat">
                            {getPaymentMethodIcon(order.payment_method)}
                            {order.payment_method}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(order.status)}
                        </TableCell>
                        <TableCell className="font-montserrat text-grey-light">
                          {formatDate(order.created_at)}
                        </TableCell>
                        <TableCell className="text-right">
                          {order.status === 'pending' ? (
                            <Button
                              size="sm"
                              onClick={() => navigate(`/dashboard/orders/${order.id}`)}
                              className="bg-gradient-to-r from-primary to-accent"
                            >
                              Continue to Payment
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled
                            >
                              <Download className="h-3 w-3 mr-1" />
                              Invoice
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
