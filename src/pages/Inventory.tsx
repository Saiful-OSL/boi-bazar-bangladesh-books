
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Filter, Package, AlertTriangle, TrendingUp, Download } from "lucide-react";
import Header from "@/components/Header";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");

  const inventoryItems = [
    {
      id: "ITM-001",
      name: "Higher Mathematics - Class XI",
      author: "Dr. Rahman Ahmed",
      category: "Mathematics",
      program: "HSC Science",
      stock: 45,
      reorderLevel: 20,
      price: 850,
      branch: "Dhaka Central",
      lastUpdated: "2024-01-15"
    },
    {
      id: "ITM-002", 
      name: "Physics Practical Guide",
      author: "Prof. Hassan Khan",
      category: "Physics",
      program: "HSC Science",
      stock: 12,
      reorderLevel: 25,
      price: 650,
      branch: "Chittagong",
      lastUpdated: "2024-01-14"
    },
    {
      id: "ITM-003",
      name: "Business Studies Foundation",
      author: "Fatima Rahman",
      category: "Business",
      program: "HSC Business",
      stock: 67,
      reorderLevel: 30,
      price: 750,
      branch: "Sylhet",
      lastUpdated: "2024-01-16"
    },
    {
      id: "ITM-004",
      name: "Programming with Python",
      author: "Karim Hassan",
      category: "Computer Science",
      program: "Diploma CS",
      stock: 8,
      reorderLevel: 15,
      price: 920,
      branch: "Rajshahi",
      lastUpdated: "2024-01-13"
    }
  ];

  const branches = [
    "Dhaka Central", "Dhaka North", "Dhaka South", "Chittagong", "Sylhet", 
    "Rajshahi", "Barisal", "Rangpur", "Khulna", "Mymensingh"
  ];

  const getStockStatus = (stock: number, reorderLevel: number) => {
    if (stock <= reorderLevel * 0.5) return { status: "Critical", color: "bg-red-100 text-red-800" };
    if (stock <= reorderLevel) return { status: "Low", color: "bg-yellow-100 text-yellow-800" };
    return { status: "Good", color: "bg-green-100 text-green-800" };
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = selectedBranch === "all" || item.branch === selectedBranch;
    return matchesSearch && matchesBranch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
            <p className="text-gray-600 mt-2">Manage books and materials across all branches</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search books, authors, categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  {branches.map(branch => (
                    <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Items</p>
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Low Stock</p>
                  <p className="text-2xl font-bold text-red-600">23</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold text-green-600">৳45.2L</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Categories</p>
                  <p className="text-2xl font-bold text-gray-900">45</p>
                </div>
                <Package className="h-8 w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Items</CardTitle>
            <CardDescription>
              Showing {filteredItems.length} of {inventoryItems.length} items
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Book Details</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Stock</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Price</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Branch</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => {
                    const stockStatus = getStockStatus(item.stock, item.reorderLevel);
                    return (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-600">by {item.author}</div>
                            <div className="text-xs text-gray-500">{item.id}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline">{item.category}</Badge>
                          <div className="text-xs text-gray-500 mt-1">{item.program}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-medium">{item.stock}</div>
                          <div className="text-xs text-gray-500">Min: {item.reorderLevel}</div>
                        </td>
                        <td className="py-4 px-4 font-medium text-green-600">
                          ৳{item.price}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {item.branch}
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={stockStatus.color}>
                            {stockStatus.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="outline">Reorder</Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {filteredItems.length === 0 && (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No items found matching your criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inventory;
