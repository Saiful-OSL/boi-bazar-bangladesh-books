
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Plus, Search, Calendar, Package, User, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const RequisitionRequest = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [requisitionData, setRequisitionData] = useState({
    branch: "Dhaka Central",
    requestedBy: "Dr. Rahman Ahmed",
    priority: "medium",
    requiredDate: "",
    purpose: "",
    notes: ""
  });

  const availableItems = [
    {
      id: "ITM-001",
      name: "Higher Mathematics - Class XI",
      author: "Dr. Rahman Ahmed",
      category: "Mathematics",
      currentStock: 45,
      price: 850,
      supplier: "Academic Publishers Ltd"
    },
    {
      id: "ITM-002",
      name: "Physics Practical Guide",
      author: "Prof. Hassan Khan",
      category: "Physics", 
      currentStock: 12,
      price: 650,
      supplier: "Science Books House"
    },
    {
      id: "ITM-003",
      name: "Business Studies Foundation",
      author: "Fatima Rahman",
      category: "Business",
      currentStock: 67,
      price: 750,
      supplier: "Academic Publishers Ltd"
    },
    {
      id: "ITM-004",
      name: "Programming with Python",
      author: "Karim Hassan",
      category: "Computer Science",
      currentStock: 8,
      price: 920,
      supplier: "Tech Publications"
    }
  ];

  const branches = [
    "Dhaka Central", "Dhaka North", "Dhaka South", "Chittagong", "Sylhet", 
    "Rajshahi", "Barisal", "Rangpur", "Khulna", "Mymensingh"
  ];

  const filteredItems = availableItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const selectedItemsData = availableItems.filter(item => selectedItems.includes(item.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Requisition Request</h1>
            <p className="text-gray-600 mt-2">Request books and materials for your branch</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Link to="/branches">
              <Button variant="outline">
                <Building2 className="h-4 w-4 mr-2" />
                Back to Branches
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Requisition Details */}
            <Card>
              <CardHeader>
                <CardTitle>Requisition Details</CardTitle>
                <CardDescription>Specify request information and requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Requesting Branch</label>
                    <Select value={requisitionData.branch} onValueChange={(value) => setRequisitionData({...requisitionData, branch: value})}>
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
                    <label className="text-sm font-medium">Requested By</label>
                    <Input
                      value={requisitionData.requestedBy}
                      onChange={(e) => setRequisitionData({...requisitionData, requestedBy: e.target.value})}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Required Date</label>
                    <Input
                      type="date"
                      value={requisitionData.requiredDate}
                      onChange={(e) => setRequisitionData({...requisitionData, requiredDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Priority</label>
                    <Select value={requisitionData.priority} onValueChange={(value) => setRequisitionData({...requisitionData, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Purpose</label>
                  <Input
                    value={requisitionData.purpose}
                    onChange={(e) => setRequisitionData({...requisitionData, purpose: e.target.value})}
                    placeholder="e.g., New semester requirements, Library stock"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Additional Notes</label>
                  <Textarea
                    placeholder="Any special instructions or requirements..."
                    value={requisitionData.notes}
                    onChange={(e) => setRequisitionData({...requisitionData, notes: e.target.value})}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Item Selection */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Select Items</CardTitle>
                    <CardDescription>Choose books and materials to request</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={handleSelectAll}
                      disabled={filteredItems.length === 0}
                    >
                      {selectedItems.length === filteredItems.length ? 'Deselect All' : 'Select All'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search books, authors, categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Items List */}
                  <div className="space-y-2">
                    {filteredItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                        <Checkbox 
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={() => handleSelectItem(item.id)}
                        />
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-600">by {item.author}</div>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline">{item.category}</Badge>
                            <span className="text-xs text-gray-500">Stock: {item.currentStock}</span>
                            <span className="text-xs text-gray-500">৳{item.price}</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.supplier}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {filteredItems.length === 0 && (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No items found matching your search</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Request Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Request Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Branch</span>
                  <span className="font-medium">{requisitionData.branch}</span>
                </div>
                <div className="flex justify-between">
                  <span>Requested By</span>
                  <span className="font-medium">{requisitionData.requestedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span>Items Selected</span>
                  <span className="font-medium">{selectedItems.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Priority</span>
                  <Badge className={
                    requisitionData.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                    requisitionData.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    requisitionData.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }>
                    {requisitionData.priority.charAt(0).toUpperCase() + requisitionData.priority.slice(1)}
                  </Badge>
                </div>
                {requisitionData.requiredDate && (
                  <div className="flex justify-between">
                    <span>Required Date</span>
                    <span className="font-medium">{requisitionData.requiredDate}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Selected Items */}
            {selectedItemsData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Selected Items ({selectedItemsData.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {selectedItemsData.map((item) => (
                      <div key={item.id} className="text-sm border-b pb-2">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-gray-600">{item.author}</div>
                        <div className="text-gray-500">৳{item.price}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <Card>
              <CardContent className="p-4 space-y-2">
                <Button 
                  className="w-full"
                  disabled={selectedItems.length === 0 || !requisitionData.requestedBy || !requisitionData.requiredDate}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Submit Request
                </Button>
                <Button variant="outline" className="w-full">
                  Save as Draft
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequisitionRequest;
