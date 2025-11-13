import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Bundles from "./pages/Bundles";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import AITools from "./pages/AITools";
import Services from "./pages/Services";
import Billing from "./pages/Billing";
import Orders from "./pages/Orders";
import OrderPayment from "./pages/OrderPayment";
import PaymentMethod from "./pages/PaymentMethod";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/bundles" element={<Bundles />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/payment-method" element={<ProtectedRoute><PaymentMethod /></ProtectedRoute>} />

            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            {/* <Route path="/dashboard/ai-tools" element={<ProtectedRoute><AITools /></ProtectedRoute>} /> */}
            <Route path="/dashboard/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
            <Route path="/dashboard/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
            <Route path="/dashboard/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/dashboard/orders/:id" element={<ProtectedRoute><OrderPayment /></ProtectedRoute>} />
            <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/dashboard/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
