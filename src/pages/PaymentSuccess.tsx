
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const PaymentSuccess = () => {
  const orderDetails = {
    id: "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    date: new Date().toLocaleDateString(),
    amount: 2350,
    paymentMethod: "bKash",
    items: 3
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. Your order has been confirmed.
          </p>

          <Card className="text-left mb-8">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>Your order information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-medium">{orderDetails.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium">{orderDetails.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="font-medium text-green-600">৳{orderDetails.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-medium">{orderDetails.paymentMethod}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 mb-2">What's Next?</p>
                <ul className="text-sm space-y-1">
                  <li>• You'll receive an email confirmation shortly</li>
                  <li>• Your order will be processed within 24 hours</li>
                  <li>• You'll get an SMS when ready for pickup</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/track-order">
              <Button variant="outline" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Track Order
              </Button>
            </Link>
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Invoice
            </Button>
            <Link to="/products">
              <Button variant="outline">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
