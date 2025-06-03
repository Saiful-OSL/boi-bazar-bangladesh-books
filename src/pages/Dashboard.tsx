
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Building2,
  BookOpen,
  Bell
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const adminStats = [
    { title: "Total Inventory", value: "₹45.2L", icon: Package, trend: "+8%" },
    { title: "Pending Orders", value: "234", icon: ShoppingCart, trend: "+12%" },
    { title: "Active Suppliers", value: "89", icon: Users, trend: "+5%" },
    { title: "Monthly Revenue", value: "₹12.8L", icon: TrendingUp, trend: "+18%" }
  ];

  const recentOrders = [
    { id: "ORD-001", student: "Rashida Khan", items: 3, amount: 1250, status: "Processing", branch: "Dhaka Central" },
    { id: "ORD-002", student: "Ahmed Hassan", items: 2, amount: 890, status: "Shipped", branch: "Chittagong" },
    { id: "ORD-003", student: "Fatima Rahman", items: 5, amount: 2100, status: "Delivered", branch: "Sylhet" },
    { id: "ORD-004", student: "Karim Ahmed", items: 1, amount: 650, status: "Pending", branch: "Rajshahi" }
  ];

  const lowStockItems = [
    { name: "Higher Mathematics - Class XI", stock: 8, threshold: 20, branch: "Dhaka North" },
    { name: "Physics Practical Guide", stock: 12, threshold: 25, branch: "Chittagong" },
    { name: "Business Studies HSC", stock: 5, threshold: 15, branch: "Sylhet" }
  ];

  const notifications = [
    { type: "warning", message: "Low stock alert: 3 items below threshold", time: "5 min ago" },
    { type: "success", message: "Order ORD-001 has been shipped", time: "12 min ago" },
    { type: "info", message: "New supplier registration pending approval", time: "1 hour ago" },
    { type: "warning", message: "Branch inventory sync required for Rajshahi", time: "2 hours ago" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-800";
      case "Shipped": return "bg-blue-100 text-blue-800";
      case "Processing": return "bg-yellow-100 text-yellow-800";
      case "Pending": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your inventory today.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Recent Orders
                  </CardTitle>
                  <CardDescription>Latest orders from all branches</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{order.id}</div>
                          <div className="text-sm text-gray-600">{order.student} • {order.branch}</div>
                          <div className="text-sm text-gray-500">{order.items} items • ৳{order.amount}</div>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Link to="/orders">
                    <Button variant="outline" className="w-full mt-4">
                      View All Orders
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Recent Notifications
                  </CardTitle>
                  <CardDescription>System alerts and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`mt-1 ${
                          notification.type === 'warning' ? 'text-yellow-600' :
                          notification.type === 'success' ? 'text-green-600' :
                          'text-blue-600'
                        }`}>
                          {notification.type === 'warning' ? <AlertTriangle className="h-4 w-4" /> :
                           notification.type === 'success' ? <CheckCircle className="h-4 w-4" /> :
                           <Clock className="h-4 w-4" />}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{notification.message}</div>
                          <div className="text-xs text-gray-500">{notification.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link to="/notifications">
                    <Button variant="outline" className="w-full mt-4">
                      View All Notifications
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Low Stock Alert */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Low Stock Alerts
                </CardTitle>
                <CardDescription>Items that need immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lowStockItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-red-200 bg-red-50 rounded-lg">
                      <div>
                        <div className="font-medium text-red-900">{item.name}</div>
                        <div className="text-sm text-red-700">{item.branch}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-red-900">
                          {item.stock} / {item.threshold} minimum
                        </div>
                        <Button size="sm" className="mt-2">
                          Reorder Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">1,525</p>
                  <p className="text-sm text-gray-600 mb-4">Active students</p>
                  <Link to="/students">
                    <Button variant="outline" className="w-full">
                      Manage Students
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Suppliers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-sm text-gray-600 mb-4">Active suppliers</p>
                  <Link to="/suppliers">
                    <Button variant="outline" className="w-full">
                      Manage Suppliers
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Books
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">25,847</p>
                  <p className="text-sm text-gray-600 mb-4">Total books</p>
                  <Link to="/add-book">
                    <Button variant="outline" className="w-full">
                      Add New Book
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>Manage all orders across branches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Access the full order management system</p>
                  <Link to="/orders">
                    <Button>Go to Orders</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Management</CardTitle>
                <CardDescription>Track and manage inventory across all locations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Access the full inventory management system</p>
                  <Link to="/inventory">
                    <Button>Go to Inventory</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reports & Analytics</CardTitle>
                <CardDescription>Comprehensive business reports and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Access detailed reports and analytics</p>
                  <Link to="/reports">
                    <Button>View Reports</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
