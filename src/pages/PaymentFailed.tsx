
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, RefreshCw, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <XCircle className="h-12 w-12 text-red-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Failed</h1>
          <p className="text-lg text-gray-600 mb-8">
            We couldn't process your payment. Please try again or use a different payment method.
          </p>

          <Card className="text-left mb-8">
            <CardHeader>
              <CardTitle>What went wrong?</CardTitle>
              <CardDescription>Common reasons for payment failure</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Insufficient balance in your account</li>
                <li>• Incorrect payment details</li>
                <li>• Network connectivity issues</li>
                <li>• Payment gateway timeout</li>
                <li>• Card expired or blocked</li>
              </ul>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/checkout">
              <Button className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="outline">
                Back to Cart
              </Button>
            </Link>
            <Button variant="outline" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              Contact Support
            </Button>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Need Help?</strong> Contact our support team at support@edubook.bd or call +880-1234-567890
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
