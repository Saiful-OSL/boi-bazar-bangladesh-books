
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Filter, Star, ShoppingCart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedClass, setSelectedClass] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const products = [
    {
      id: "PRD-001",
      title: "Higher Mathematics - Class XI",
      author: "Dr. Rahman Ahmed",
      program: "HSC Science",
      class: "Class XI",
      subject: "Mathematics",
      price: 850,
      originalPrice: 1000,
      stock: 45,
      rating: 4.8,
      reviews: 127,
      image: "/placeholder.svg",
      publisher: "Academic Publications",
      isbn: "978-984-123-456-7"
    },
    {
      id: "PRD-002",
      title: "Physics Practical Guide",
      author: "Prof. Hassan Khan", 
      program: "HSC Science",
      class: "Class XII",
      subject: "Physics",
      price: 650,
      originalPrice: 750,
      stock: 32,
      rating: 4.6,
      reviews: 89,
      image: "/placeholder.svg",
      publisher: "Science Books Ltd",
      isbn: "978-984-234-567-8"
    },
    {
      id: "PRD-003",
      title: "Business Studies Foundation",
      author: "Fatima Rahman",
      program: "HSC Business",
      class: "Class XI",
      subject: "Business Studies",
      price: 750,
      originalPrice: 850,
      stock: 67,
      rating: 4.7,
      reviews: 156,
      image: "/placeholder.svg",
      publisher: "Business Education Press",
      isbn: "978-984-345-678-9"
    },
    {
      id: "PRD-004",
      title: "Programming with Python",
      author: "Karim Hassan",
      program: "Diploma CS",
      class: "2nd Year",
      subject: "Programming",
      price: 920,
      originalPrice: 1100,
      stock: 28,
      rating: 4.9,
      reviews: 203,
      image: "/placeholder.svg",
      publisher: "Tech Publications",
      isbn: "978-984-456-789-0"
    },
    {
      id: "PRD-005",
      title: "English Grammar & Composition",
      author: "Sarah Ahmed",
      program: "HSC All",
      class: "Class XI-XII",
      subject: "English",
      price: 580,
      originalPrice: 680,
      stock: 89,
      rating: 4.5,
      reviews: 234,
      image: "/placeholder.svg",
      publisher: "Language Learning Co",
      isbn: "978-984-567-890-1"
    },
    {
      id: "PRD-006",
      title: "Accounting Principles",
      author: "Mohammad Ali",
      program: "HSC Business",
      class: "Class XI-XII",
      subject: "Accounting",
      price: 795,
      originalPrice: 900,
      stock: 41,
      rating: 4.4,
      reviews: 98,
      image: "/placeholder.svg",
      publisher: "Finance Books BD",
      isbn: "978-984-678-901-2"
    }
  ];

  const programs = ["HSC Science", "HSC Business", "HSC Arts", "Diploma CS", "Diploma Engineering"];
  const classes = ["Class XI", "Class XII", "1st Year", "2nd Year", "3rd Year", "4th Year"];
  const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "Business Studies", "Accounting", "English", "Programming"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = selectedProgram === "all" || product.program === selectedProgram;
    const matchesClass = selectedClass === "all" || product.class === selectedClass;
    
    let matchesPrice = true;
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      matchesPrice = product.price >= min && (max ? product.price <= max : true);
    }
    
    return matchesSearch && matchesProgram && matchesClass && matchesPrice;
  });

  const getDiscountPercentage = (price: number, originalPrice: number) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Educational Books Catalog</h1>
            <p className="text-gray-600 mt-2">Browse and manage books for all programs and classes</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Link to="/add-book">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Book
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search books, authors, subjects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                <SelectTrigger>
                  <SelectValue placeholder="Program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  {programs.map(program => (
                    <SelectItem key={program} value={program}>{program}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.map(cls => (
                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-500">৳0 - ৳500</SelectItem>
                  <SelectItem value="500-800">৳500 - ৳800</SelectItem>
                  <SelectItem value="800-1000">৳800 - ৳1000</SelectItem>
                  <SelectItem value="1000">৳1000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} books
          </p>
          <Select defaultValue="newest">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.originalPrice > product.price && (
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                      -{getDiscountPercentage(product.price, product.originalPrice)}%
                    </Badge>
                  )}
                  <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                    {product.stock} in stock
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {product.program}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {product.class}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm">by {product.author}</p>
                  
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.rating})</span>
                    <span className="text-xs text-gray-500">• {product.reviews} reviews</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-green-600">৳{product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">৳{product.originalPrice}</span>
                    )}
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    <p>Publisher: {product.publisher}</p>
                    <p>ISBN: {product.isbn}</p>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-600">No books found matching your criteria</div>
            <Button variant="outline" className="mt-4" onClick={() => {
              setSearchTerm("");
              setSelectedProgram("all");
              setSelectedClass("all");
              setPriceRange("all");
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
