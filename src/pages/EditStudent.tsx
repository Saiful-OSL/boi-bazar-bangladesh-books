
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Save, ArrowLeft, User } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";

const EditStudent = () => {
  const { studentId } = useParams();
  
  const [studentData, setStudentData] = useState({
    id: studentId || "STD-001",
    name: "Rashida Khan",
    email: "rashida.khan@email.com",
    phone: "+880-1712-345678",
    address: "123 Main Street, Dhanmondi, Dhaka",
    program: "HSC Science",
    class: "Class XII",
    institution: "Dhaka College",
    preferredBranch: "Dhaka Central",
    status: "Active",
    studentId: "DHA2023001",
    dateOfBirth: "2005-03-15",
    guardianName: "Mr. Khan",
    guardianPhone: "+880-1712-345679",
    notes: ""
  });

  const programs = ["HSC Science", "HSC Business", "HSC Arts", "Diploma CS", "Diploma Engineering"];
  const classes = ["Class IX", "Class X", "Class XI", "Class XII", "1st Year", "2nd Year", "3rd Year"];
  const branches = ["Dhaka Central", "Dhaka North", "Chittagong", "Sylhet", "Rajshahi", "Barisal"];
  const statuses = ["Active", "Inactive", "Suspended"];

  const handleSave = () => {
    console.log("Saving student:", studentData);
    // Handle save logic
  };

  const handleFieldChange = (field: string, value: string) => {
    setStudentData(prev => ({ ...prev, [field]: value }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Inactive": return "bg-gray-100 text-gray-800";
      case "Suspended": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to={`/students/${studentId}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Student Profile</h1>
            <p className="text-gray-600">{studentData.name} • {studentData.id}</p>
          </div>
          <Badge className={getStatusColor(studentData.status)}>
            {studentData.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Basic student details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={studentData.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  value={studentData.studentId}
                  onChange={(e) => handleFieldChange("studentId", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={studentData.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={studentData.phone}
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={studentData.dateOfBirth}
                  onChange={(e) => handleFieldChange("dateOfBirth", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={studentData.address}
                  onChange={(e) => handleFieldChange("address", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>Student's educational details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="institution">Institution</Label>
                <Input
                  id="institution"
                  value={studentData.institution}
                  onChange={(e) => handleFieldChange("institution", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="program">Program</Label>
                <Select value={studentData.program} onValueChange={(value) => handleFieldChange("program", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {programs.map(program => (
                      <SelectItem key={program} value={program}>{program}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="class">Class/Year</Label>
                <Select value={studentData.class} onValueChange={(value) => handleFieldChange("class", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map(cls => (
                      <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="preferredBranch">Preferred Branch</Label>
                <Select value={studentData.preferredBranch} onValueChange={(value) => handleFieldChange("preferredBranch", value)}>
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
                <Label htmlFor="status">Account Status</Label>
                <Select value={studentData.status} onValueChange={(value) => handleFieldChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Guardian Information */}
          <Card>
            <CardHeader>
              <CardTitle>Guardian Information</CardTitle>
              <CardDescription>Emergency contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="guardianName">Guardian Name</Label>
                <Input
                  id="guardianName"
                  value={studentData.guardianName}
                  onChange={(e) => handleFieldChange("guardianName", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="guardianPhone">Guardian Phone</Label>
                <Input
                  id="guardianPhone"
                  value={studentData.guardianPhone}
                  onChange={(e) => handleFieldChange("guardianPhone", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes & Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Internal notes and actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="notes">Internal Notes</Label>
                <Textarea
                  id="notes"
                  value={studentData.notes}
                  onChange={(e) => handleFieldChange("notes", e.target.value)}
                  placeholder="Add any internal notes about this student..."
                  rows={3}
                />
              </div>

              <div className="space-y-3 pt-4">
                <Button onClick={handleSave} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    Send Email
                  </Button>
                  <Button variant="outline" size="sm">
                    Send SMS
                  </Button>
                  <Button variant="outline" size="sm">
                    Reset Password
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600">
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
