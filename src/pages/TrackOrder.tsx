
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react";
import Header from "@/components/Header";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState<any>(null);

  const trackOrder = () => {
    // Simulate order tracking
    setOrderData({
      id: orderId || "ORD-001",
      status: "Shipped",
      items: [
        { name: "Higher Mathematics - Class XI", quantity: 2 },
        { name: "Physics Practical Guide", quantity: 1 }
      ],
      timeline: [
        { status: "Order Placed", date: "2024-01-15 10:30 AM", completed: true, icon: Package },
        { status: "Payment Confirmed", date: "2024-01-15 10:35 AM", completed: true, icon: CheckCircle },
        { status: "Processing", date: "2024-01-15 02:00 PM", completed: true, icon: Clock },
        { status: "Shipped", date: "2024-01-16 09:00 AM", completed: true, icon: Truck },
        { status: "Out for Delivery", date: "Expected: 2024-01-17", completed: false, icon: Truck },
        { status: "Delivered", date: "Expected: 2024-01-17", completed: false, icon: CheckCircle }
      ],
      estimatedDelivery: "January 17, 2024",
      deliveryAddress: "Dhaka Central Branch"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-800";
      case "Shipped": return "bg-blue-100 text-blue-800";
      case "Processing": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Track Your Order</h1>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Enter Order ID</CardTitle>
            <CardDescription>Enter your order ID to track your shipment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input 
                placeholder="e.g., ORD-001"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="flex-1"
              />
              <Button onClick={trackOrder}>
                <Search className="h-4 w-4 mr-2" />
                Track Order
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        {orderData && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Order {orderData.id}</CardTitle>
                    <CardDescription>Estimated delivery: {orderData.estimatedDelivery}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(orderData.status)}>
                    {orderData.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Items Ordered</h4>
                    <div className="space-y-2">
                      {orderData.items.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.name}</span>
                          <span>Qty: {item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Delivery Address</h4>
                    <p className="text-sm text-gray-600">{orderData.deliveryAddress}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
                <CardDescription>Track your order progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {orderData.timeline.map((step: any, index: number) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <step.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {step.status}
                        </p>
                        <p className={`text-sm ${step.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                          {step.date}
                        </p>
                      </div>
                      {step.completed && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline">Contact Support</Button>
                  <Button variant="outline">Cancel Order</Button>
                  <Button variant="outline">Modify Delivery</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
