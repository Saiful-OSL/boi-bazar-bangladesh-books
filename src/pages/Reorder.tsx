
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, Package, ShoppingCart, Filter, Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const Reorder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const lowStockItems = [
    {
      id: "ITM-001",
      name: "Higher Mathematics - Class XI",
      author: "Dr. Rahman Ahmed",
      category: "Mathematics",
      program: "HSC Science",
      currentStock: 8,
      reorderLevel: 20,
      suggestedQuantity: 50,
      price: 850,
      branch: "Dhaka Central",
      supplier: "Academic Publishers Ltd",
      lastReorder: "2024-01-10"
    },
    {
      id: "ITM-002",
      name: "Physics Practical Guide",
      author: "Prof. Hassan Khan",
      category: "Physics",
      program: "HSC Science",
      currentStock: 12,
      reorderLevel: 25,
      suggestedQuantity: 40,
      price: 650,
      branch: "Chittagong",
      supplier: "Science Books House",
      lastReorder: "2024-01-08"
    },
    {
      id: "ITM-004",
      name: "Programming with Python",
      author: "Karim Hassan",
      category: "Computer Science",
      program: "Diploma CS",
      currentStock: 5,
      reorderLevel: 15,
      suggestedQuantity: 30,
      price: 920,
      branch: "Rajshahi",
      supplier: "Tech Publications",
      lastReorder: "2024-01-05"
    },
    {
      id: "ITM-005",
      name: "English Grammar Advanced",
      author: "Sarah Ahmed",
      category: "English",
      program: "HSC Arts",
      currentStock: 3,
      reorderLevel: 18,
      suggestedQuantity: 35,
      price: 720,
      branch: "Sylhet",
      supplier: "Language Learning Co",
      lastReorder: "2024-01-12"
    }
  ];

  const branches = [
    "Dhaka Central", "Dhaka North", "Dhaka South", "Chittagong", "Sylhet", 
    "Rajshahi", "Barisal", "Rangpur", "Khulna", "Mymensingh"
  ];

  const getUrgencyLevel = (currentStock: number, reorderLevel: number) => {
    const percentage = (currentStock / reorderLevel) * 100;
    if (percentage <= 25) return { level: "Critical", color: "bg-red-100 text-red-800 border-red-200" };
    if (percentage <= 50) return { level: "High", color: "bg-orange-100 text-orange-800 border-orange-200" };
    return { level: "Medium", color: "bg-yellow-100 text-yellow-800 border-yellow-200" };
  };

  const filteredItems = lowStockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = selectedBranch === "all" || item.branch === selectedBranch;
    return matchesSearch && matchesBranch;
  });

  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  const getTotalAmount = () => {
    return filteredItems
      .filter(item => selectedItems.includes(item.id))
      .reduce((total, item) => total + (item.price * item.suggestedQuantity), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reorder Management</h1>
            <p className="text-gray-600 mt-2">Manage and place reorders for low stock items</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Link to="/inventory">
              <Button variant="outline">
                <Package className="h-4 w-4 mr-2" />
                Back to Inventory
              </Button>
            </Link>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Items Below Threshold</p>
                  <p className="text-2xl font-bold text-red-600">{filteredItems.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Selected Items</p>
                  <p className="text-2xl font-bold text-blue-600">{selectedItems.length}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Estimated Cost</p>
                  <p className="text-2xl font-bold text-green-600">৳{getTotalAmount().toLocaleString()}</p>
                </div>
                <Package className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Critical Items</p>
                  <p className="text-2xl font-bold text-red-600">
                    {filteredItems.filter(item => getUrgencyLevel(item.currentStock, item.reorderLevel).level === "Critical").length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
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

        {/* Reorder Items Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Items Requiring Reorder</CardTitle>
                <CardDescription>
                  Select items to include in your reorder request
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleSelectAll}
                  disabled={filteredItems.length === 0}
                >
                  {selectedItems.length === filteredItems.length ? 'Deselect All' : 'Select All'}
                </Button>
                <Button 
                  disabled={selectedItems.length === 0}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Reorder ({selectedItems.length})
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      <Checkbox 
                        checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Book Details</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Stock Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Reorder Info</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Supplier</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Urgency</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => {
                    const urgency = getUrgencyLevel(item.currentStock, item.reorderLevel);
                    return (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <Checkbox 
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={() => handleSelectItem(item.id)}
                          />
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-600">by {item.author}</div>
                            <div className="text-xs text-gray-500">{item.id} • {item.category}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-medium text-red-600">{item.currentStock} / {item.reorderLevel}</div>
                          <div className="text-xs text-gray-500">{item.branch}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-medium text-blue-600">{item.suggestedQuantity} units</div>
                          <div className="text-xs text-gray-500">৳{(item.price * item.suggestedQuantity).toLocaleString()} total</div>
                          <div className="text-xs text-gray-400">Last: {item.lastReorder}</div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {item.supplier}
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={`border ${urgency.color}`}>
                            {urgency.level}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Quick Order</Button>
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
                <p className="text-gray-600">No items found requiring reorder</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary Footer */}
        {selectedItems.length > 0 && (
          <Card className="mt-6 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-blue-900">Reorder Summary</h3>
                  <p className="text-sm text-blue-700">
                    {selectedItems.length} items selected • Estimated total: ৳{getTotalAmount().toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setSelectedItems([])}>
                    Clear Selection
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Proceed to Reorder
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Reorder;
