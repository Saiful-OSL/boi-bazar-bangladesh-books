
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Truck, Download, MessageCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";

const ViewOrder = () => {
  const { orderId } = useParams();
  
  const orderData = {
    id: orderId || "ORD-001",
    date: "2024-01-16",
    customer: {
      name: "Rashida Khan",
      email: "rashida.khan@email.com",
      phone: "+880-1712-345678",
      type: "Student",
      institution: "Dhaka College"
    },
    items: [
      {
        id: 1,
        title: "Higher Mathematics - Class XI",
        author: "Dr. Rahman Ahmed",
        quantity: 2,
        price: 850,
        total: 1700
      },
      {
        id: 2,
        title: "Physics Practical Guide",
        author: "Prof. Hassan Khan",
        quantity: 1,
        price: 650,
        total: 650
      }
    ],
    payment: {
      method: "bKash",
      status: "Paid",
      amount: 2350,
      transactionId: "TXN-123456789"
    },
    delivery: {
      type: "Branch Pickup",
      branch: "Dhaka Central",
      address: "123 Main Street, Dhaka",
      charge: 0
    },
    status: "Processing",
    timeline: [
      { status: "Order Placed", date: "2024-01-16 10:30 AM", completed: true },
      { status: "Payment Confirmed", date: "2024-01-16 10:35 AM", completed: true },
      { status: "Processing", date: "2024-01-16 02:00 PM", completed: true },
      { status: "Ready for Pickup", date: "Pending", completed: false }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing": return "bg-yellow-100 text-yellow-800";
      case "Shipped": return "bg-blue-100 text-blue-800";
      case "Delivered": return "bg-green-100 text-green-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
            <p className="text-gray-600">Order {orderData.id} • Placed on {orderData.date}</p>
          </div>
          <div className="flex gap-2">
            <Link to={`/orders/${orderId}/edit`}>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Order
              </Button>
            </Link>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Invoice
            </Button>
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
                  <Badge className={getStatusColor(orderData.status)}>
                    {orderData.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-gray-600">by {item.author}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity} × ৳{item.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">৳{item.total}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total Amount</span>
                      <span>৳{orderData.payment.amount}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
                <CardDescription>Track the progress of this order</CardDescription>
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
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">{orderData.customer.name}</p>
                  <p className="text-sm text-gray-600">{orderData.customer.type}</p>
                </div>
                <div>
                  <p className="text-sm">{orderData.customer.email}</p>
                  <p className="text-sm">{orderData.customer.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{orderData.customer.institution}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <MessageCircle className="h-3 w-3 mr-2" />
                  Contact Customer
                </Button>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Method</span>
                  <span>{orderData.payment.method}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <Badge className="bg-green-100 text-green-800">
                    {orderData.payment.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Amount</span>
                  <span className="font-medium">৳{orderData.payment.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Transaction ID</span>
                  <span className="text-sm">{orderData.payment.transactionId}</span>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Type</span>
                  <span>{orderData.delivery.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Branch</span>
                  <span>{orderData.delivery.branch}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{orderData.delivery.address}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Truck className="h-3 w-3 mr-2" />
                  Update Status
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
                  Mark as Shipped
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Print Order
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

export default ViewOrder;
