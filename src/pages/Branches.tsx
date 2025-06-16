import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Phone, Mail, Users, Package, TrendingUp, Building2, FileText, BookOpen, Clock, AlertCircle } from "lucide-react";
import Header from "@/components/Header";

const Branches = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [showRequisitions, setShowRequisitions] = useState(false);

  // Mock requisition requests data
  const requisitionRequests = [
    {
      id: "REQ-001",
      branchId: "BRN-001",
      branchName: "Dhaka Central Branch",
      requestDate: "2024-01-15",
      status: "Pending",
      books: [
        { id: "ITM-001", name: "Higher Mathematics - Class XI", quantity: 25, priority: "High" },
        { id: "ITM-002", name: "Physics Practical Guide", quantity: 15, priority: "Medium" }
      ],
      totalItems: 40,
      requestedBy: "Dr. Rahman Ahmed"
    },
    {
      id: "REQ-002",
      branchId: "BRN-002",
      branchName: "Chittagong Branch",
      requestDate: "2024-01-14",
      status: "Pending",
      books: [
        { id: "ITM-003", name: "Business Studies Foundation", quantity: 30, priority: "High" },
        { id: "ITM-004", name: "Programming with Python", quantity: 20, priority: "Low" }
      ],
      totalItems: 50,
      requestedBy: "Prof. Fatima Khan"
    },
    {
      id: "REQ-003",
      branchId: "BRN-003",
      branchName: "Sylhet Branch",
      requestDate: "2024-01-13",
      status: "Partially Fulfilled",
      books: [
        { id: "ITM-001", name: "Higher Mathematics - Class XI", quantity: 20, priority: "Medium" }
      ],
      totalItems: 20,
      requestedBy: "Md. Karim Hassan"
    }
  ];

  const branches = [
    {
      id: "BRN-001",
      name: "Dhaka Central Branch",
      address: "123 Academic Street, Dhanmondi, Dhaka-1205",
      region: "Dhaka",
      manager: "Dr. Rahman Ahmed",
      phone: "+880-2-9123456",
      email: "dhaka.central@edubook.bd",
      students: 2580,
      inventory: 15420,
      monthlyOrders: 456,
      revenue: 2500000,
      status: "Active",
      established: "2018-01-15"
    },
    {
      id: "BRN-002",
      name: "Chittagong Branch",
      address: "456 Port City Plaza, Agrabad, Chittagong-4100",
      region: "Chittagong",
      manager: "Prof. Fatima Khan",
      phone: "+880-31-654321",
      email: "chittagong@edubook.bd",
      students: 1890,
      inventory: 12350,
      monthlyOrders: 324,
      revenue: 1800000,
      status: "Active",
      established: "2018-06-20"
    },
    {
      id: "BRN-003",
      name: "Sylhet Branch",
      address: "789 Educational Complex, Zindabazar, Sylhet-3100",
      region: "Sylhet",
      manager: "Md. Karim Hassan",
      phone: "+880-821-123456",
      email: "sylhet@edubook.bd",
      students: 1450,
      inventory: 9800,
      monthlyOrders: 234,
      revenue: 1200000,
      status: "Active",
      established: "2019-03-10"
    },
    {
      id: "BRN-004",
      name: "Rajshahi Branch",
      address: "321 University Road, Kazla, Rajshahi-6000",
      region: "Rajshahi",
      manager: "Sarah Ahmed",
      phone: "+880-721-987654",
      email: "rajshahi@edubook.bd",
      students: 1120,
      inventory: 7650,
      monthlyOrders: 189,
      revenue: 950000,
      status: "Active",
      established: "2019-08-15"
    },
    {
      id: "BRN-005",
      name: "Barisal Branch",
      address: "654 River View, Band Road, Barisal-8200",
      region: "Barisal",
      manager: "Mohammad Ali",
      phone: "+880-431-555666",
      email: "barisal@edubook.bd",
      students: 890,
      inventory: 5430,
      monthlyOrders: 145,
      revenue: 750000,
      status: "Active",
      established: "2020-01-20"
    },
    {
      id: "BRN-006",
      name: "Rangpur Branch",
      address: "987 College Gate, Modern Mor, Rangpur-5400",
      region: "Rangpur",
      manager: "Nusrat Jahan",
      phone: "+880-521-777888",
      email: "rangpur@edubook.bd",
      students: 720,
      inventory: 4200,
      monthlyOrders: 112,
      revenue: 680000,
      status: "Under Construction",
      established: "2024-01-01"
    }
  ];

  const regions = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Barisal", "Rangpur", "Khulna", "Mymensingh"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Under Construction": return "bg-yellow-100 text-yellow-800";
      case "Maintenance": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRequisitionStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-orange-100 text-orange-800";
      case "Partially Fulfilled": return "bg-blue-100 text-blue-800";
      case "Fulfilled": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredBranches = branches.filter(branch => {
    const matchesSearch = branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         branch.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         branch.manager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = regionFilter === "all" || branch.region === regionFilter;
    return matchesSearch && matchesRegion;
  });

  const branchStats = {
    total: branches.length,
    active: branches.filter(b => b.status === "Active").length,
    construction: branches.filter(b => b.status === "Under Construction").length,
    totalStudents: branches.reduce((sum, b) => sum + b.students, 0),
    totalRevenue: branches.reduce((sum, b) => sum + b.revenue, 0)
  };

  const pendingRequisitions = requisitionRequests.filter(req => req.status === "Pending");
  const getBranchRequisitions = (branchId: string) => {
    return requisitionRequests.filter(req => req.branchId === branchId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Branch Management</h1>
            <p className="text-gray-600 mt-2">Manage 108+ educational branches across Bangladesh</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button 
              variant={showRequisitions ? "default" : "outline"}
              onClick={() => setShowRequisitions(!showRequisitions)}
              className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
            >
              <Clock className="h-4 w-4 mr-2" />
              {showRequisitions ? 'Hide' : 'Show'} Requisitions ({pendingRequisitions.length})
            </Button>
            <Link to="/requisition-request">
              <Button variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100">
                <FileText className="h-4 w-4 mr-2" />
                Request Books
              </Button>
            </Link>
            <Button>
              <Building2 className="h-4 w-4 mr-2" />
              Add Branch
            </Button>
          </div>
        </div>

        {/* Pending Requisitions Section */}
        {showRequisitions && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                Pending Book Requisitions
              </CardTitle>
              <CardDescription>
                Books requested by branches that need to be issued
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingRequisitions.map((req) => (
                  <div key={req.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{req.branchName}</h4>
                        <p className="text-sm text-gray-600">
                          Requested by {req.requestedBy} • {new Date(req.requestDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getRequisitionStatusColor(req.status)}>
                          {req.status}
                        </Badge>
                        <Link to={`/issue-books?branchId=${req.branchId}&requisitionId=${req.id}`}>
                          <Button size="sm">
                            <BookOpen className="h-3 w-3 mr-1" />
                            Issue Books
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {req.books.map((book) => (
                        <div key={book.id} className="text-sm border rounded p-2">
                          <div className="font-medium">{book.name}</div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-gray-600">Qty: {book.quantity}</span>
                            <Badge size="sm" className={getPriorityColor(book.priority)}>
                              {book.priority}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {pendingRequisitions.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No pending requisitions at the moment
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{branchStats.total}</div>
              <div className="text-sm text-gray-600">Total Branches</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{branchStats.active}</div>
              <div className="text-sm text-gray-600">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{branchStats.construction}</div>
              <div className="text-sm text-gray-600">Under Construction</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{(branchStats.totalStudents / 1000).toFixed(1)}K</div>
              <div className="text-sm text-gray-600">Total Students</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">৳{(branchStats.totalRevenue / 1000000).toFixed(1)}M</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
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
                    placeholder="Search branches, managers, locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBranches.map((branch) => {
            const branchRequisitions = getBranchRequisitions(branch.id);
            const pendingBranchReqs = branchRequisitions.filter(req => req.status === "Pending");
            
            return (
              <Card key={branch.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{branch.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {branch.region} Region
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(branch.status)}>
                        {branch.status}
                      </Badge>
                      {pendingBranchReqs.length > 0 && (
                        <Badge className="bg-orange-100 text-orange-800">
                          {pendingBranchReqs.length} Pending
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Location Information */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-3 w-3 text-gray-400 mt-0.5" />
                      <div className="text-gray-600">{branch.address}</div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-3 w-3 text-gray-400" />
                      <div>Manager: {branch.manager}</div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3 text-gray-400" />
                      <div>{branch.phone}</div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-3 w-3 text-gray-400" />
                      <div>{branch.email}</div>
                    </div>
                  </div>

                  {/* Requisition Status */}
                  {branchRequisitions.length > 0 && (
                    <div className="pt-4 border-t">
                      <div className="text-sm font-medium text-gray-700 mb-2">Book Requisitions</div>
                      <div className="space-y-1">
                        {branchRequisitions.slice(0, 2).map((req) => (
                          <div key={req.id} className="text-xs bg-gray-50 rounded p-2">
                            <div className="flex justify-between items-center">
                              <span>{req.totalItems} books requested</span>
                              <Badge size="sm" className={getRequisitionStatusColor(req.status)}>
                                {req.status}
                              </Badge>
                            </div>
                            <div className="text-gray-500 mt-1">
                              {new Date(req.requestDate).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                        {branchRequisitions.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{branchRequisitions.length - 2} more requisitions
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <div className="text-sm text-gray-600">Students</div>
                      <div className="text-lg font-semibold text-blue-600">{branch.students.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Inventory</div>
                      <div className="text-lg font-semibold text-green-600">{branch.inventory.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Monthly Orders</div>
                      <div className="text-lg font-semibold">{branch.monthlyOrders}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Revenue</div>
                      <div className="text-lg font-semibold text-purple-600">
                        ৳{(branch.revenue / 100000).toFixed(1)}L
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      Established: {new Date(branch.established).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Package className="h-3 w-3 mr-1" />
                      Inventory
                    </Button>
                    {pendingBranchReqs.length > 0 ? (
                      <Link to={`/issue-books?branchId=${branch.id}`} className="flex-1">
                        <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                          <BookOpen className="h-3 w-3 mr-1" />
                          Issue Requested Books
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="outline" size="sm" className="flex-1" disabled>
                        <BookOpen className="h-3 w-3 mr-1" />
                        No Pending Books
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {filteredBranches.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-600">No branches found matching your criteria</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Branches;
