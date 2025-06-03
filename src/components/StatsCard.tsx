
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
}

const StatsCard = ({ title, value, icon: Icon, trend }: StatsCardProps) => {
  const isPositive = trend.startsWith('+');
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <Badge 
              variant={isPositive ? "default" : "secondary"} 
              className={`mt-2 ${isPositive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
            >
              {trend}
            </Badge>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
