
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Package, Calendar, User, MapPin, Phone, Mail, FileText } from "lucide-react";
import Header from "@/components/Header";

const SupplierOrderPlacement = () => {
  const location = useLocation();
  const { selectedItems = [] } = location.state || {};
  
  const [orderData, setOrderData] = useState({
    supplier: "",
    deliveryDate: "",
    priority: "medium",
    notes: "",
    branch: "Dhaka Central"
  });

  // Mock data for suppliers
  const suppliers = [
    {
      id: "SUP-001",
      name: "Academic Publishers Ltd",
      contact: "Dr. Ahmed Rahman",
      phone: "+880-2-9876543",
      email: "orders@academicpub.bd",
      address: "123 Book Street, Dhaka"
    },
    {
      id: "SUP-002", 
      name: "Science Books House",
      contact: "Prof. Sarah Khan",
      phone: "+880-31-555444",
      email: "sales@sciencebooks.bd",
      address: "456 Education Plaza, Chittagong"
    },
    {
      id: "SUP-003",
      name: "Tech Publications",
      contact: "Karim Hassan",
      phone: "+880-721-333222",
      email: "info@techpub.bd",
      address: "789 University Road, Rajshahi"
    }
  ];

  // Mock selected items if none provided
  const defaultItems = [
    {
      id: "ITM-001",
      name: "Higher Mathematics - Class XI",
      author: "Dr. Rahman Ahmed",
      quantity: 50,
      price: 850,
      supplier: "Academic Publishers Ltd"
    },
    {
      id: "ITM-002",
      name: "Physics Practical Guide", 
      author: "Prof. Hassan Khan",
      quantity: 40,
      price: 650,
      supplier: "Science Books House"
    }
  ];

  // Process order items and ensure all have required properties
  const orderItems = (selectedItems.length > 0 ? selectedItems : defaultItems).map(item => ({
    ...item,
    quantity: item.quantity || item.suggestedQuantity || 1,
    price: item.price || 0,
    total: item.total || (item.quantity || item.suggestedQuantity || 1) * (item.price || 0)
  }));

  const selectedSupplier = suppliers.find(s => s.name === orderData.supplier);
  const totalAmount = orderItems.reduce((sum, item) => sum + item.total, 0);

  const handleSubmitOrder = () => {
    console.log("Submitting order:", { orderData, orderItems });
    // Here you would typically send the order to your backend
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/reorder">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Reorder
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Place Supplier Order</h1>
            <p className="text-gray-600">Create a new order request for selected items</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items ({orderItems.length})</CardTitle>
                <CardDescription>Items selected for reorder</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">by {item.author}</p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity} × ৳{item.price}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">৳{item.total.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{item.supplier}</p>
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

            {/* Order Details Form */}
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
                <CardDescription>Specify order requirements and delivery information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Supplier</label>
                    <Select value={orderData.supplier} onValueChange={(value) => setOrderData({...orderData, supplier: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        {suppliers.map(supplier => (
                          <SelectItem key={supplier.id} value={supplier.name}>
                            {supplier.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Delivery Branch</label>
                    <Select value={orderData.branch} onValueChange={(value) => setOrderData({...orderData, branch: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dhaka Central">Dhaka Central</SelectItem>
                        <SelectItem value="Chittagong">Chittagong</SelectItem>
                        <SelectItem value="Sylhet">Sylhet</SelectItem>
                        <SelectItem value="Rajshahi">Rajshahi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Expected Delivery Date</label>
                    <Input
                      type="date"
                      value={orderData.deliveryDate}
                      onChange={(e) => setOrderData({...orderData, deliveryDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Priority</label>
                    <Select value={orderData.priority} onValueChange={(value) => setOrderData({...orderData, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Additional Notes</label>
                  <Textarea
                    placeholder="Any special instructions or requirements..."
                    value={orderData.notes}
                    onChange={(e) => setOrderData({...orderData, notes: e.target.value})}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Supplier Information */}
            {selectedSupplier && (
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium">{selectedSupplier.name}</p>
                    <p className="text-sm text-gray-600">{selectedSupplier.id}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-3 w-3 text-gray-400" />
                      <span>{selectedSupplier.contact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3 text-gray-400" />
                      <span>{selectedSupplier.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-3 w-3 text-gray-400" />
                      <span>{selectedSupplier.email}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-3 w-3 text-gray-400 mt-0.5" />
                      <span>{selectedSupplier.address}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>{orderItems.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Quantity</span>
                  <span>{orderItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total Amount</span>
                  <span>৳{totalAmount.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t">
                  <Badge className={
                    orderData.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                    orderData.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    orderData.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }>
                    {orderData.priority.charAt(0).toUpperCase() + orderData.priority.slice(1)} Priority
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="p-4 space-y-2">
                <Button 
                  className="w-full"
                  onClick={handleSubmitOrder}
                  disabled={!orderData.supplier || !orderData.deliveryDate}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Submit Order
                </Button>
                <Button variant="outline" className="w-full">
                  Save as Draft
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierOrderPlacement;
