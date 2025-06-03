
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, User, GraduationCap, MapPin, ShoppingCart } from "lucide-react";
import Header from "@/components/Header";

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [programFilter, setProgramFilter] = useState("all");

  const students = [
    {
      id: "STD-001",
      name: "Rashida Khan",
      email: "rashida.khan@email.com",
      phone: "+880-1712-345678",
      program: "HSC Science",
      class: "Class XII",
      institution: "Dhaka College",
      preferredBranch: "Dhaka Central",
      totalOrders: 8,
      totalSpent: 6750,
      lastOrder: "2024-01-15",
      status: "Active",
      joinedDate: "2023-06-15"
    },
    {
      id: "STD-002",
      name: "Ahmed Hassan",
      email: "ahmed.hassan@email.com", 
      phone: "+880-1813-456789",
      program: "HSC Business",
      class: "Class XI",
      institution: "Notre Dame College",
      preferredBranch: "Dhaka North",
      totalOrders: 12,
      totalSpent: 9250,
      lastOrder: "2024-01-16",
      status: "Active",
      joinedDate: "2023-04-20"
    },
    {
      id: "STD-003",
      name: "Fatima Rahman",
      email: "fatima.rahman@email.com",
      phone: "+880-1923-567890",
      program: "Diploma CS",
      class: "2nd Year",
      institution: "Dhaka Polytechnic Institute",
      preferredBranch: "Chittagong",
      totalOrders: 5,
      totalSpent: 4200,
      lastOrder: "2024-01-12",
      status: "Active",
      joinedDate: "2023-08-10"
    },
    {
      id: "STD-004",
      name: "Karim Ahmed",
      email: "karim.ahmed@email.com",
      phone: "+880-1634-678901",
      program: "HSC Arts",
      class: "Class XII",
      institution: "Govt. College",
      preferredBranch: "Sylhet",
      totalOrders: 3,
      totalSpent: 2100,
      lastOrder: "2024-01-08",
      status: "Active",
      joinedDate: "2023-09-05"
    },
    {
      id: "STD-005",
      name: "Nusrat Jahan",
      email: "nusrat.jahan@email.com",
      phone: "+880-1745-789012",
      program: "HSC Science",
      class: "Class XI",
      institution: "Holy Cross College",
      preferredBranch: "Rajshahi",
      totalOrders: 15,
      totalSpent: 12800,
      lastOrder: "2024-01-14",
      status: "VIP",
      joinedDate: "2023-03-12"
    },
    {
      id: "STD-006",
      name: "Ibrahim Khan",
      email: "ibrahim.khan@email.com",
      phone: "+880-1856-890123",
      program: "Diploma Engineering",
      class: "3rd Year",
      institution: "Dhaka Engineering Institute",
      preferredBranch: "Barisal",
      totalOrders: 1,
      totalSpent: 850,
      lastOrder: "2023-12-20",
      status: "Inactive",
      joinedDate: "2023-11-28"
    }
  ];

  const programs = ["HSC Science", "HSC Business", "HSC Arts", "Diploma CS", "Diploma Engineering"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "VIP": return "bg-purple-100 text-purple-800";
      case "Active": return "bg-green-100 text-green-800";
      case "Inactive": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.institution.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = programFilter === "all" || student.program === programFilter;
    return matchesSearch && matchesProgram;
  });

  const studentStats = {
    total: students.length,
    active: students.filter(s => s.status === "Active").length,
    vip: students.filter(s => s.status === "VIP").length,
    inactive: students.filter(s => s.status === "Inactive").length,
    totalRevenue: students.reduce((sum, s) => sum + s.totalSpent, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
            <p className="text-gray-600 mt-2">Manage student accounts and track purchase behavior</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{studentStats.total}</div>
              <div className="text-sm text-gray-600">Total Students</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{studentStats.active}</div>
              <div className="text-sm text-gray-600">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{studentStats.vip}</div>
              <div className="text-sm text-gray-600">VIP</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{studentStats.inactive}</div>
              <div className="text-sm text-gray-600">Inactive</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">৳{(studentStats.totalRevenue / 1000).toFixed(0)}K</div>
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
                    placeholder="Search students, emails, institutions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={programFilter} onValueChange={setProgramFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by Program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  {programs.map(program => (
                    <SelectItem key={program} value={program}>{program}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Students Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{student.name}</CardTitle>
                      <CardDescription>{student.email}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(student.status)}>
                    {student.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Academic Information */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="h-3 w-3 text-gray-400" />
                    <div>{student.program} • {student.class}</div>
                  </div>
                  <div className="text-sm text-gray-600">{student.institution}</div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <div>Preferred Branch: {student.preferredBranch}</div>
                  </div>
                </div>

                {/* Purchase Information */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <div className="text-sm text-gray-600">Total Orders</div>
                    <div className="text-lg font-semibold">{student.totalOrders}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Total Spent</div>
                    <div className="text-lg font-semibold text-green-600">
                      ৳{student.totalSpent.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Last Order</div>
                    <div className="text-sm">{student.lastOrder}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Member Since</div>
                    <div className="text-sm">{student.joinedDate}</div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="pt-4 border-t">
                  <div className="text-sm text-gray-600 mb-1">Contact</div>
                  <div className="text-sm">{student.phone}</div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Orders
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-600">No students found matching your criteria</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
