
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, BookOpen, Users, Building2, TrendingUp, Package, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import StatsCard from "@/components/StatsCard";

const Index = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  const featuredBooks = [
    {
      id: 1,
      title: "Advanced Mathematics for Engineers",
      author: "Dr. Rahman Ahmed",
      price: 850,
      originalPrice: 1000,
      image: "/placeholder.svg",
      program: "Engineering",
      class: "1st Year",
      stock: 45,
      rating: 4.8
    },
    {
      id: 2,
      title: "Business Studies Foundation",
      author: "Prof. Fatima Khan",
      price: 650,
      originalPrice: 750,
      image: "/placeholder.svg",
      program: "Business",
      class: "HSC",
      stock: 32,
      rating: 4.6
    },
    {
      id: 3,
      title: "Programming with Python",
      author: "Md. Karim Hassan",
      price: 920,
      originalPrice: 1100,
      image: "/placeholder.svg",
      program: "Computer Science",
      class: "2nd Year",
      stock: 28,
      rating: 4.9
    }
  ];

  const statsData = [
    { title: "Total Books", value: "25,847", icon: BookOpen, trend: "+12%" },
    { title: "Active Students", value: "15,432", icon: Users, trend: "+8%" },
    { title: "Branches", value: "108", icon: Building2, trend: "Stable" },
    { title: "Monthly Sales", value: "৳12.5L", icon: TrendingUp, trend: "+15%" }
  ];

  if (userRole) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Educational Book Management
              <span className="block text-yellow-300">& E-Commerce Platform</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Complete inventory management solution for 108+ educational branches across Bangladesh
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Browse Books
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4">
                Access Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Access Level</h2>
            <p className="text-lg text-gray-600">Select your role to access the appropriate dashboard</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                role: "admin",
                title: "System Administrator",
                description: "Complete access to inventory, orders, suppliers, and reports",
                icon: Building2,
                color: "bg-red-500",
                features: ["Inventory Management", "Supplier Control", "Branch Management", "Full Reports"]
              },
              {
                role: "branch",
                title: "Branch Manager",
                description: "Manage branch-specific inventory and local operations",
                icon: Package,
                color: "bg-blue-500",
                features: ["Local Inventory", "Branch Orders", "Student Management", "Branch Reports"]
              },
              {
                role: "student",
                title: "Student Portal",
                description: "Browse and purchase books, track orders, manage profile",
                icon: Users,
                color: "bg-green-500",
                features: ["Book Shopping", "Order Tracking", "Branch Pickup", "Study Materials"]
              }
            ].map((roleOption) => (
              <Card key={roleOption.role} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className={`w-12 h-12 ${roleOption.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <roleOption.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{roleOption.title}</CardTitle>
                  <CardDescription>{roleOption.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {roleOption.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/dashboard">
                    <Button 
                      className="w-full"
                      onClick={() => setUserRole(roleOption.role)}
                    >
                      Access {roleOption.title}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Educational Books</h2>
            <p className="text-lg text-gray-600">Popular books across different educational programs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBooks.map((book) => (
              <ProductCard key={book.id} book={book} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="px-8">
              View All Books
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
            <p className="text-lg opacity-90">Comprehensive solution for educational book management</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Package, title: "Inventory Control", desc: "Real-time stock management across 108 branches" },
              { icon: ShoppingCart, title: "E-Commerce", desc: "Integrated online shopping for students & distributors" },
              { icon: Bell, title: "Smart Notifications", desc: "SMS & email alerts for orders and inventory" },
              { icon: TrendingUp, title: "Analytics", desc: "Comprehensive reports and business insights" }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm opacity-90">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">EduBook Platform</h3>
              <p className="text-gray-400">Complete educational book management solution for Bangladesh.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/products" className="hover:text-white">Browse Books</Link></li>
                <li><Link to="/branches" className="hover:text-white">Find Branches</Link></li>
                <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Support</li>
                <li>Track Order</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">📞 +880-1234-567890</p>
              <p className="text-gray-400">📧 support@edubook.bd</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EduBook Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
