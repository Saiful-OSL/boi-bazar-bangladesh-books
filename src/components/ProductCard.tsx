
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  image: string;
  program: string;
  class: string;
  stock: number;
  rating: number;
}

interface ProductCardProps {
  book: Book;
}

const ProductCard = ({ book }: ProductCardProps) => {
  const discount = book.originalPrice ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100) : 0;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={book.image} 
            alt={book.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              -{discount}%
            </Badge>
          )}
          <Badge className="absolute top-2 right-2 bg-green-500 text-white">
            {book.stock} in stock
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {book.program}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {book.class}
            </Badge>
          </div>
          
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
            {book.title}
          </h3>
          
          <p className="text-gray-600 text-sm">by {book.author}</p>
          
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({book.rating})</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-green-600">৳{book.price}</span>
            {book.originalPrice && (
              <span className="text-sm text-gray-500 line-through">৳{book.originalPrice}</span>
            )}
          </div>
          
          <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
