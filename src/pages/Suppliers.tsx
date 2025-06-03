
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Edit, Phone, Mail, MapPin, Package } from "lucide-react";
import Header from "@/components/Header";

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const suppliers = [
    {
      id: "SUP-001",
      name: "Academic Publications Ltd",
      contactPerson: "Dr. Rahman Ahmed",
      phone: "+880-1712-345678",
      email: "info@academicpub.bd",
      address: "123 Academic Street, Dhanmondi, Dhaka",
      specialization: "Mathematics & Science Books",
      status: "Active",
      totalOrders: 45,
      totalValue: 850000,
      rating: 4.8,
      joinedDate: "2020-01-15",
      branches: ["Dhaka Central", "Dhaka North", "Chittagong"]
    },
    {
      id: "SUP-002", 
      name: "Educational Resources BD",
      contactPerson: "Prof. Fatima Khan",
      phone: "+880-1813-456789",
      email: "contact@eduresources.com",
      address: "456 Book Market, Nilkhet, Dhaka",
      specialization: "Business & Arts Books",
      status: "Active",
      totalOrders: 32,
      totalValue: 620000,
      rating: 4.6,
      joinedDate: "2019-08-22",
      branches: ["Sylhet", "Rajshahi", "Barisal"]
    },
    {
      id: "SUP-003",
      name: "Tech Publications House",
      contactPerson: "Karim Hassan",
      phone: "+880-1923-567890",
      email: "orders@techpub.bd",
      address: "789 Innovation Hub, Uttara, Dhaka",
      specialization: "Computer Science & Engineering",
      status: "Active",
      totalOrders: 28,
      totalValue: 720000,
      rating: 4.9,
      joinedDate: "2021-03-10",
      branches: ["Dhaka Central", "Chittagong", "Sylhet"]
    },
    {
      id: "SUP-004",
      name: "Classic Book Distributors",
      contactPerson: "Ahmed Ali",
      phone: "+880-1634-678901",
      email: "info@classicbooks.bd",
      address: "321 Heritage Road, Old Dhaka",
      specialization: "Literature & General Books",
      status: "Pending",
      totalOrders: 0,
      totalValue: 0,
      rating: 0,
      joinedDate: "2024-01-15",
      branches: []
    },
    {
      id: "SUP-005",
      name: "Science Publications",
      contactPerson: "Dr. Sarah Rahman",
      phone: "+880-1745-789012",
      email: "contact@sciencepub.com",
      address: "654 Research Avenue, Wari, Dhaka",
      specialization: "Science & Medical Books",
      status: "Suspended",
      totalOrders: 15,
      totalValue: 280000,
      rating: 3.8,
      joinedDate: "2018-11-05",
      branches: ["Khulna", "Rangpur"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Suspended": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || supplier.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const supplierStats = {
    total: suppliers.length,
    active: suppliers.filter(s => s.status === "Active").length,
    pending: suppliers.filter(s => s.status === "Pending").length,
    suspended: suppliers.filter(s => s.status === "Suspended").length,
    totalValue: suppliers.reduce((sum, s) => sum + s.totalValue, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Supplier Management</h1>
            <p className="text-gray-600 mt-2">Manage relationships with book suppliers and distributors</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Supplier
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{supplierStats.total}</div>
              <div className="text-sm text-gray-600">Total Suppliers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{supplierStats.active}</div>
              <div className="text-sm text-gray-600">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{supplierStats.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{supplierStats.suspended}</div>
              <div className="text-sm text-gray-600">Suspended</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">৳{(supplierStats.totalValue / 100000).toFixed(1)}L</div>
              <div className="text-sm text-gray-600">Total Value</div>
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
                    placeholder="Search suppliers, contacts, specializations..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSuppliers.map((supplier) => (
            <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{supplier.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Package className="h-3 w-3" />
                      {supplier.specialization}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(supplier.status)}>
                    {supplier.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Contact Information */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="font-medium text-gray-700">Contact Person:</div>
                    <div>{supplier.contactPerson}</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-3 w-3 text-gray-400" />
                    <div>{supplier.phone}</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-3 w-3 text-gray-400" />
                    <div>{supplier.email}</div>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-3 w-3 text-gray-400 mt-0.5" />
                    <div className="text-gray-600">{supplier.address}</div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <div className="text-sm text-gray-600">Total Orders</div>
                    <div className="text-lg font-semibold">{supplier.totalOrders}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Total Value</div>
                    <div className="text-lg font-semibold text-green-600">
                      ৳{(supplier.totalValue / 1000).toFixed(0)}K
                    </div>
                  </div>
                  {supplier.rating > 0 && (
                    <>
                      <div>
                        <div className="text-sm text-gray-600">Rating</div>
                        <div className="text-lg font-semibold">{supplier.rating}/5</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Joined</div>
                        <div className="text-lg font-semibold">{new Date(supplier.joinedDate).getFullYear()}</div>
                      </div>
                    </>
                  )}
                </div>

                {/* Serving Branches */}
                {supplier.branches.length > 0 && (
                  <div className="pt-4 border-t">
                    <div className="text-sm text-gray-600 mb-2">Serving Branches:</div>
                    <div className="flex flex-wrap gap-1">
                      {supplier.branches.map((branch, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {branch}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    View Orders
                  </Button>
                  {supplier.status === "Pending" && (
                    <Button size="sm" className="flex-1">
                      Approve
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredSuppliers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-600">No suppliers found matching your criteria</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Suppliers;
