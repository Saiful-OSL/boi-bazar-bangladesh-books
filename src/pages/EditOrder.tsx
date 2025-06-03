
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Save, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";

const EditOrder = () => {
  const { orderId } = useParams();
  
  const [orderData, setOrderData] = useState({
    id: orderId || "ORD-001",
    status: "Processing",
    priority: "Normal",
    notes: "",
    delivery: {
      type: "Branch Pickup",
      branch: "Dhaka Central",
      address: "123 Main Street, Dhaka"
    },
    payment: {
      method: "bKash",
      status: "Paid"
    }
  });

  const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
  const priorities = ["Low", "Normal", "High", "Urgent"];
  const deliveryTypes = ["Branch Pickup", "Courier Delivery"];
  const branches = ["Dhaka Central", "Chittagong", "Sylhet", "Rajshahi", "Barisal"];

  const handleSave = () => {
    console.log("Saving order:", orderData);
    // Handle save logic
  };

  const handleFieldChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setOrderData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as any,
          [child]: value
        }
      }));
    } else {
      setOrderData(prev => ({ ...prev, [field]: value }));
    }
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
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to={`/orders/${orderId}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Order</h1>
            <p className="text-gray-600">Order {orderData.id}</p>
          </div>
          <Badge className={getStatusColor(orderData.status)}>
            {orderData.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Status & Priority */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
              <CardDescription>Update order status and priority</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Order Status</Label>
                <Select value={orderData.status} onValueChange={(value) => handleFieldChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={orderData.priority} onValueChange={(value) => handleFieldChange("priority", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map(priority => (
                      <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Internal Notes</Label>
                <Textarea
                  id="notes"
                  value={orderData.notes}
                  onChange={(e) => handleFieldChange("notes", e.target.value)}
                  placeholder="Add internal notes about this order..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
              <CardDescription>Update delivery details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="deliveryType">Delivery Type</Label>
                <Select value={orderData.delivery.type} onValueChange={(value) => handleFieldChange("delivery.type", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {deliveryTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="branch">Branch</Label>
                <Select value={orderData.delivery.branch} onValueChange={(value) => handleFieldChange("delivery.branch", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map(branch => (
                      <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="address">Delivery Address</Label>
                <Input
                  id="address"
                  value={orderData.delivery.address}
                  onChange={(e) => handleFieldChange("delivery.address", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>Payment method and status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Input
                  id="paymentMethod"
                  value={orderData.payment.method}
                  onChange={(e) => handleFieldChange("payment.method", e.target.value)}
                  readOnly
                  className="bg-gray-50"
                />
              </div>

              <div>
                <Label htmlFor="paymentStatus">Payment Status</Label>
                <Select value={orderData.payment.status} onValueChange={(value) => handleFieldChange("payment.status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                    <SelectItem value="Refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>Save changes or perform quick actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={handleSave} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  Send SMS
                </Button>
                <Button variant="outline" size="sm">
                  Send Email
                </Button>
                <Button variant="outline" size="sm">
                  Print Label
                </Button>
                <Button variant="outline" size="sm" className="text-red-600">
                  Cancel Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditOrder;
