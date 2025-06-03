
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, MapPin, GraduationCap, ShoppingCart, Edit, MessageCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";

const ViewStudent = () => {
  const { studentId } = useParams();
  
  const studentData = {
    id: studentId || "STD-001",
    name: "Rashida Khan",
    email: "rashida.khan@email.com",
    phone: "+880-1712-345678",
    program: "HSC Science",
    class: "Class XII",
    institution: "Dhaka College",
    preferredBranch: "Dhaka Central",
    address: "123 Main Street, Dhanmondi, Dhaka",
    status: "Active",
    joinedDate: "June 15, 2023",
    lastLogin: "January 16, 2024",
    totalOrders: 8,
    totalSpent: 6750,
    averageOrder: 844
  };

  const recentOrders = [
    { id: "ORD-001", date: "2024-01-15", amount: 1250, status: "Delivered", items: 3 },
    { id: "ORD-002", date: "2024-01-10", amount: 890, status: "Processing", items: 2 },
    { id: "ORD-003", date: "2024-01-05", amount: 650, status: "Delivered", items: 1 },
    { id: "ORD-004", date: "2023-12-28", amount: 1100, status: "Delivered", items: 4 }
  ];

  const favoriteBooks = [
    { title: "Higher Mathematics - Class XI", orders: 3, lastOrdered: "2024-01-15" },
    { title: "Physics Practical Guide", orders: 2, lastOrdered: "2024-01-10" },
    { title: "Chemistry Solutions", orders: 2, lastOrdered: "2023-12-28" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Inactive": return "bg-gray-100 text-gray-800";
      case "Suspended": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-800";
      case "Processing": return "bg-yellow-100 text-yellow-800";
      case "Shipped": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{studentData.name}</h1>
              <p className="text-gray-600">{studentData.program} • {studentData.institution}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getStatusColor(studentData.status)}>
                  {studentData.status}
                </Badge>
                <span className="text-sm text-gray-500">Member since {studentData.joinedDate}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to={`/students/${studentId}/edit`}>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
            <Button>
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-blue-600">{studentData.totalOrders}</div>
                      <div className="text-sm text-gray-600">Total Orders</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-green-600">৳{studentData.totalSpent.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Total Spent</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-purple-600">৳{studentData.averageOrder}</div>
                      <div className="text-sm text-gray-600">Average Order</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Favorite Books */}
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Ordered Books</CardTitle>
                    <CardDescription>Books this student orders most often</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {favoriteBooks.map((book, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{book.title}</p>
                            <p className="text-sm text-gray-600">Last ordered: {book.lastOrdered}</p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium">{book.orders}</p>
                            <p className="text-xs text-gray-500">orders</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>All orders placed by this student</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-gray-600">{order.date} • {order.items} items</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">৳{order.amount}</p>
                            <Badge className={getOrderStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Student's recent actions and interactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Placed order ORD-001</span>
                        <span className="text-gray-500">2 days ago</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Updated profile information</span>
                        <span className="text-gray-500">1 week ago</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Contacted support about delivery</span>
                        <span className="text-gray-500">2 weeks ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{studentData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{studentData.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                  <span className="text-sm">{studentData.address}</span>
                </div>
              </CardContent>
            </Card>

            {/* Academic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Academic Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">{studentData.program}</p>
                    <p className="text-xs text-gray-600">{studentData.class}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Institution</p>
                  <p className="text-sm text-gray-600">{studentData.institution}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Preferred Branch</p>
                  <p className="text-sm text-gray-600">{studentData.preferredBranch}</p>
                </div>
              </CardContent>
            </Card>

            {/* Account Status */}
            <Card>
              <CardHeader>
                <CardTitle>Account Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Status</span>
                  <Badge className={getStatusColor(studentData.status)}>
                    {studentData.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Last Login</span>
                  <span className="text-sm text-gray-600">{studentData.lastLogin}</span>
                </div>
                <div className="pt-3 border-t space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Reset Password
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-red-600">
                    Suspend Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
