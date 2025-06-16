
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import Suppliers from "./pages/Suppliers";
import Products from "./pages/Products";
import Students from "./pages/Students";
import Reports from "./pages/Reports";
import Branches from "./pages/Branches";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import Profile from "./pages/Profile";
import TrackOrder from "./pages/TrackOrder";
import AddBook from "./pages/AddBook";
import ViewOrder from "./pages/ViewOrder";
import EditOrder from "./pages/EditOrder";
import ViewStudent from "./pages/ViewStudent";
import EditStudent from "./pages/EditStudent";
import Reorder from "./pages/Reorder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/reorder" element={<Reorder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderId" element={<ViewOrder />} />
          <Route path="/orders/:orderId/edit" element={<EditOrder />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/:studentId" element={<ViewStudent />} />
          <Route path="/students/:studentId/edit" element={<EditStudent />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
