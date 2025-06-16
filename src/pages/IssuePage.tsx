
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, Package, Search, Calendar, User, Building2, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const IssuePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [issueData, setIssueData] = useState({
    issuedTo: "",
    studentId: "",
    branch: "Dhaka Central",
    dueDate: "",
    purpose: "class_assignment",
    notes: ""
  });

  const availableBooks = [
    {
      id: "ITM-001",
      name: "Higher Mathematics - Class XI",
      author: "Dr. Rahman Ahmed",
      category: "Mathematics",
      availableStock: 45,
      totalStock: 50,
      price: 850,
      isbn: "978-984-123-456-7"
    },
    {
      id: "ITM-002",
      name: "Physics Practical Guide",
      author: "Prof. Hassan Khan",
      category: "Physics",
      availableStock: 12,
      totalStock: 25,
      price: 650,
      isbn: "978-984-234-567-8"
    },
    {
      id: "ITM-003",
      name: "Business Studies Foundation",
      author: "Fatima Rahman",
      category: "Business",
      availableStock: 67,
      totalStock: 80,
      price: 750,
      isbn: "978-984-345-678-9"
    },
    {
      id: "ITM-004",
      name: "Programming with Python",
      author: "Karim Hassan",
      category: "Computer Science",
      availableStock: 8,
      totalStock: 15,
      price: 920,
      isbn: "978-984-456-789-0"
    }
  ];

  const branches = [
    "Dhaka Central", "Dhaka North", "Dhaka South", "Chittagong", "Sylhet", 
    "Rajshahi", "Barisal", "Rangpur", "Khulna", "Mymensingh"
  ];

  const purposes = [
    { value: "class_assignment", label: "Class Assignment" },
    { value: "library_loan", label: "Library Loan" },
    { value: "reference", label: "Reference" },
    { value: "semester_book", label: "Semester Book" },
    { value: "competition", label: "Competition Preparation" }
  ];

  const filteredBooks = availableBooks.filter(book =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm)
  );

  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredBooks.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredBooks.map(book => book.id));
    }
  };

  const selectedBooksData = availableBooks.filter(book => selectedItems.includes(book.id));

  const getStockStatus = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage <= 20) return { status: "Low", color: "bg-red-100 text-red-800" };
    if (percentage <= 50) return { status: "Medium", color: "bg-yellow-100 text-yellow-800" };
    return { status: "Good", color: "bg-green-100 text-green-800" };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Issue Books</h1>
            <p className="text-gray-600 mt-2">Issue books to students and manage lending</p>
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
            {/* Issue Details */}
            <Card>
              <CardHeader>
                <CardTitle>Issue Details</CardTitle>
                <CardDescription>Specify student and issue information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Student Name *</label>
                    <Input
                      value={issueData.issuedTo}
                      onChange={(e) => setIssueData({...issueData, issuedTo: e.target.value})}
                      placeholder="Enter student name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Student ID *</label>
                    <Input
                      value={issueData.studentId}
                      onChange={(e) => setIssueData({...issueData, studentId: e.target.value})}
                      placeholder="Enter student ID"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Branch</label>
                    <Select value={issueData.branch} onValueChange={(value) => setIssueData({...issueData, branch: value})}>
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
                    <label className="text-sm font-medium">Due Date *</label>
                    <Input
                      type="date"
                      value={issueData.dueDate}
                      onChange={(e) => setIssueData({...issueData, dueDate: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Purpose</label>
                    <Select value={issueData.purpose} onValueChange={(value) => setIssueData({...issueData, purpose: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {purposes.map(purpose => (
                          <SelectItem key={purpose.value} value={purpose.value}>
                            {purpose.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Additional Notes</label>
                  <Textarea
                    placeholder="Any special instructions or conditions..."
                    value={issueData.notes}
                    onChange={(e) => setIssueData({...issueData, notes: e.target.value})}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Book Selection */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Select Books</CardTitle>
                    <CardDescription>Choose books to issue to the student</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={handleSelectAll}
                      disabled={filteredBooks.length === 0}
                    >
                      {selectedItems.length === filteredBooks.length ? 'Deselect All' : 'Select All'}
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
                      placeholder="Search by book name, author, category, or ISBN..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Books List */}
                  <div className="space-y-2">
                    {filteredBooks.map((book) => {
                      const stockStatus = getStockStatus(book.availableStock, book.totalStock);
                      return (
                        <div key={book.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                          <Checkbox 
                            checked={selectedItems.includes(book.id)}
                            onCheckedChange={() => handleSelectItem(book.id)}
                            disabled={book.availableStock === 0}
                          />
                          <div className="flex-1">
                            <div className="font-medium">{book.name}</div>
                            <div className="text-sm text-gray-600">by {book.author}</div>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline">{book.category}</Badge>
                              <Badge className={stockStatus.color}>
                                {stockStatus.status}
                              </Badge>
                              <span className="text-xs text-gray-500">ISBN: {book.isbn}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              {book.availableStock} / {book.totalStock} available
                            </div>
                            <div className="text-sm text-gray-500">৳{book.price}</div>
                            {book.availableStock === 0 && (
                              <Badge className="bg-red-100 text-red-800 mt-1">
                                Out of Stock
                              </Badge>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {filteredBooks.length === 0 && (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No books found matching your search</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Issue Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Issue Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Student</span>
                  <span className="font-medium">{issueData.issuedTo || "Not specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Student ID</span>
                  <span className="font-medium">{issueData.studentId || "Not specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Branch</span>
                  <span className="font-medium">{issueData.branch}</span>
                </div>
                <div className="flex justify-between">
                  <span>Books Selected</span>
                  <span className="font-medium">{selectedItems.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Purpose</span>
                  <span className="font-medium">
                    {purposes.find(p => p.value === issueData.purpose)?.label}
                  </span>
                </div>
                {issueData.dueDate && (
                  <div className="flex justify-between">
                    <span>Due Date</span>
                    <span className="font-medium">{issueData.dueDate}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Selected Books */}
            {selectedBooksData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Selected Books ({selectedBooksData.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {selectedBooksData.map((book) => (
                      <div key={book.id} className="text-sm border-b pb-2 last:border-b-0">
                        <div className="font-medium">{book.name}</div>
                        <div className="text-gray-600">{book.author}</div>
                        <div className="text-gray-500">Available: {book.availableStock}</div>
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
                  disabled={
                    selectedItems.length === 0 || 
                    !issueData.issuedTo || 
                    !issueData.studentId || 
                    !issueData.dueDate
                  }
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Issue Books
                </Button>
                <Button variant="outline" className="w-full">
                  Print Issue Receipt
                </Button>
              </CardContent>
            </Card>

            {/* Issue Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  Issue Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>• Maximum 3 books per student</p>
                <p>• Standard loan period: 14 days</p>
                <p>• Late return fine: ৳5 per day</p>
                <p>• Student ID verification required</p>
                <p>• Damaged books will be charged</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuePage;
