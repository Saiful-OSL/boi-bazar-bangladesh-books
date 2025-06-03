
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Upload, Plus } from "lucide-react";
import Header from "@/components/Header";

const AddBook = () => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    program: "",
    class: "",
    subject: "",
    publisher: "",
    edition: "",
    language: "Bengali",
    pages: "",
    price: "",
    costPrice: "",
    description: "",
    stock: "",
    reorderLevel: "",
    supplier: ""
  });

  const categories = ["Mathematics", "Science", "Business", "Arts", "Engineering", "Computer Science"];
  const programs = ["HSC Science", "HSC Business", "HSC Arts", "Diploma CS", "Diploma Engineering"];
  const classes = ["Class IX", "Class X", "Class XI", "Class XII", "1st Year", "2nd Year", "3rd Year"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Book data:", bookData);
    // Handle book creation
  };

  const handleInputChange = (field: string, value: string) => {
    setBookData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Book</h1>
            <p className="text-gray-600">Add a new book to the inventory system</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter the basic details of the book</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Book Title *</Label>
                      <Input 
                        id="title"
                        value={bookData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="author">Author *</Label>
                      <Input 
                        id="author"
                        value={bookData.author}
                        onChange={(e) => handleInputChange("author", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="isbn">ISBN</Label>
                      <Input 
                        id="isbn"
                        value={bookData.isbn}
                        onChange={(e) => handleInputChange("isbn", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="publisher">Publisher</Label>
                      <Input 
                        id="publisher"
                        value={bookData.publisher}
                        onChange={(e) => handleInputChange("publisher", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edition">Edition</Label>
                      <Input 
                        id="edition"
                        value={bookData.edition}
                        onChange={(e) => handleInputChange("edition", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="pages">Pages</Label>
                      <Input 
                        id="pages"
                        type="number"
                        value={bookData.pages}
                        onChange={(e) => handleInputChange("pages", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description"
                      value={bookData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Academic Classification</CardTitle>
                  <CardDescription>Categorize the book for students</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select value={bookData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="program">Program *</Label>
                      <Select value={bookData.program} onValueChange={(value) => handleInputChange("program", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select program" />
                        </SelectTrigger>
                        <SelectContent>
                          {programs.map(program => (
                            <SelectItem key={program} value={program}>{program}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="class">Class/Year *</Label>
                      <Select value={bookData.class} onValueChange={(value) => handleInputChange("class", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map(cls => (
                            <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input 
                        id="subject"
                        value={bookData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Book Cover</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-4">Upload book cover image</p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Inventory</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="price">Selling Price (৳) *</Label>
                    <Input 
                      id="price"
                      type="number"
                      value={bookData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="costPrice">Cost Price (৳)</Label>
                    <Input 
                      id="costPrice"
                      type="number"
                      value={bookData.costPrice}
                      onChange={(e) => handleInputChange("costPrice", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="stock">Initial Stock *</Label>
                    <Input 
                      id="stock"
                      type="number"
                      value={bookData.stock}
                      onChange={(e) => handleInputChange("stock", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="reorderLevel">Reorder Level</Label>
                    <Input 
                      id="reorderLevel"
                      type="number"
                      value={bookData.reorderLevel}
                      onChange={(e) => handleInputChange("reorderLevel", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button type="submit" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Book
                  </Button>
                  <Button type="button" variant="outline" className="w-full">
                    Save as Draft
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
