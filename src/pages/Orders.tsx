
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Eye, Edit, Car, Download } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const orders = [
    {
      id: "ORD-001",
      customer: "Rashida Khan",
      customerType: "Student",
      items: 3,
      amount: 1250,
      status: "Processing",
      branch: "Dhaka Central",
      date: "2024-01-16",
      paymentMethod: "bKash",
      deliveryType: "Branch Pickup"
    },
    {
      id: "ORD-002",
      customer: "Ahmed Hassan",
      customerType: "Distributor", 
      items: 25,
      amount: 18900,
      status: "Shipped",
      branch: "Chittagong",
      date: "2024-01-15",
      paymentMethod: "Bank Transfer",
      deliveryType: "Courier"
    },
    {
      id: "ORD-003",
      customer: "Fatima Rahman",
      customerType: "Student",
      items: 2,
      amount: 890,
      status: "Delivered",
      branch: "Sylhet",
      date: "2024-01-14",
      paymentMethod: "SSLCommerz",
      deliveryType: "Branch Pickup"
    },
    {
      id: "ORD-004",
      customer: "Book Paradise Ltd",
      customerType: "Seller",
      items: 50,
      amount: 35000,
      status: "Pending",
      branch: "Rajshahi",
      date: "2024-01-16",
      paymentMethod: "Account Balance",
      deliveryType: "Courier"
    },
    {
      id: "ORD-005",
      customer: "Karim Ahmed",
      customerType: "Student",
      items: 1,
      amount: 650,
      status: "Cancelled",
      branch: "Barisal",
      date: "2024-01-13",
      paymentMethod: "Nagad",
      deliveryType: "Branch Pickup"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-800";
      case "Shipped": return "bg-blue-100 text-blue-800";
      case "Processing": return "bg-yellow-100 text-yellow-800";
      case "Pending": return "bg-gray-100 text-gray-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCustomerTypeColor = (type: string) => {
    switch (type) {
      case "Student": return "bg-blue-100 text-blue-800";
      case "Distributor": return "bg-purple-100 text-purple-800";
      case "Seller": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.branch.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "Pending").length,
    processing: orders.filter(o => o.status === "Processing").length,
    shipped: orders.filter(o => o.status === "Shipped").length,
    delivered: orders.filter(o => o.status === "Delivered").length,
    totalRevenue: orders.reduce((sum, o) => sum + o.amount, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
            <p className="text-gray-600 mt-2">Track and manage orders from all customer types</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Link to="/track-order">
              <Button variant="outline">
                <Car className="h-4 w-4 mr-2" />
                Track Order
              </Button>
            </Link>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Orders
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{orderStats.total}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{orderStats.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{orderStats.processing}</div>
              <div className="text-sm text-gray-600">Processing</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{orderStats.shipped}</div>
              <div className="text-sm text-gray-600">Shipped</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{orderStats.delivered}</div>
              <div className="text-sm text-gray-600">Delivered</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">৳{orderStats.totalRevenue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Revenue</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search orders, customers, branches..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
            <CardDescription>
              Showing {filteredOrders.length} of {orders.length} orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Order ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Items</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Branch</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="font-medium text-blue-600">{order.id}</div>
                        <div className="text-xs text-gray-500">{order.paymentMethod}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">{order.customer}</div>
                        <div className="text-xs text-gray-500">{order.deliveryType}</div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getCustomerTypeColor(order.customerType)}>
                          {order.customerType}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="font-medium">{order.items}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-green-600">৳{order.amount.toLocaleString()}</span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {order.branch}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {order.date}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-1">
                          <Link to={`/orders/${order.id}`}>
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </Link>
                          <Link to={`/orders/${order.id}/edit`}>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </Link>
                          <Link to="/track-order">
                            <Button size="sm" variant="outline">
                              <Car className="h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredOrders.length === 0 && (
              <div className="text-center py-8">
                <div className="text-gray-600">No orders found matching your criteria</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Orders;
