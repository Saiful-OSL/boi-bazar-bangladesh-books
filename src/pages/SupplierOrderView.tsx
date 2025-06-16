
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, Calendar, User, MapPin, Phone, Mail, Truck, FileText, MessageCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";

const SupplierOrderView = () => {
  const { orderId } = useParams();
  
  const orderData = {
    id: orderId || "SO-001",
    date: "2024-01-16",
    expectedDelivery: "2024-01-25",
    supplier: {
      id: "SUP-001",
      name: "Academic Publishers Ltd",
      contact: "Dr. Ahmed Rahman",
      phone: "+880-2-9876543",
      email: "orders@academicpub.bd",
      address: "123 Book Street, Dhaka"
    },
    branch: "Dhaka Central",
    priority: "High",
    items: [
      {
        id: 1,
        name: "Higher Mathematics - Class XI",
        author: "Dr. Rahman Ahmed",
        quantity: 50,
        price: 850,
        total: 42500
      },
      {
        id: 2,
        name: "Physics Practical Guide",
        author: "Prof. Hassan Khan", 
        quantity: 40,
        price: 650,
        total: 26000
      }
    ],
    status: "Confirmed",
    notes: "Please ensure books are the latest edition. Delivery required before semester start.",
    timeline: [
      { status: "Order Placed", date: "2024-01-16 10:30 AM", completed: true },
      { status: "Supplier Confirmed", date: "2024-01-16 02:15 PM", completed: true },
      { status: "In Production", date: "2024-01-18 09:00 AM", completed: true },
      { status: "Ready for Dispatch", date: "Pending", completed: false },
      { status: "Delivered", date: "Pending", completed: false }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Confirmed": return "bg-blue-100 text-blue-800";
      case "In Production": return "bg-purple-100 text-purple-800";
      case "Shipped": return "bg-indigo-100 text-indigo-800";
      case "Delivered": return "bg-green-100 text-green-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const totalAmount = orderData.items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/suppliers">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Supplier Order Details</h1>
            <p className="text-gray-600">Order {orderData.id} • Placed on {orderData.date}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Order Items</CardTitle>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(orderData.status)}>
                      {orderData.status}
                    </Badge>
                    <Badge className={getPriorityColor(orderData.priority)}>
                      {orderData.priority} Priority
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">by {item.author}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity} × ৳{item.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">৳{item.total.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total Amount</span>
                      <span>৳{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Notes */}
            {orderData.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>Order Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{orderData.notes}</p>
                </CardContent>
              </Card>
            )}

            {/* Order Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
                <CardDescription>Track the progress of this supplier order</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.timeline.map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full ${
                        step.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      <div className="flex-1">
                        <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {step.status}
                        </p>
                        <p className={`text-sm ${step.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                          {step.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Supplier Information */}
            <Card>
              <CardHeader>
                <CardTitle>Supplier Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">{orderData.supplier.name}</p>
                  <p className="text-sm text-gray-600">{orderData.supplier.id}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-3 w-3 text-gray-400" />
                    <span>{orderData.supplier.contact}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-3 w-3 text-gray-400" />
                    <span>{orderData.supplier.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-3 w-3 text-gray-400" />
                    <span>{orderData.supplier.email}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-3 w-3 text-gray-400 mt-0.5" />
                    <span>{orderData.supplier.address}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <MessageCircle className="h-3 w-3 mr-2" />
                  Contact Supplier
                </Button>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Delivery Branch</span>
                  <span className="font-medium">{orderData.branch}</span>
                </div>
                <div className="flex justify-between">
                  <span>Expected Date</span>
                  <span className="font-medium">{orderData.expectedDelivery}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Items</span>
                  <span className="font-medium">{orderData.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Truck className="h-3 w-3 mr-2" />
                  Track Delivery
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <FileText className="h-3 w-3 mr-2" />
                  Generate PO
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Edit Order
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Duplicate Order
                </Button>
                <Button variant="outline" size="sm" className="w-full text-red-600">
                  Cancel Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierOrderView;
