
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhancedMetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period: string;
  };
  icon?: React.ComponentType<{ className?: string }>;
  gradient?: string;
  description?: string;
}

export function EnhancedMetricCard({
  title,
  value,
  change,
  icon: Icon,
  gradient = "from-blue-500 to-purple-500",
  description
}: EnhancedMetricCardProps) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-gray-900">{value}</p>
              {change && (
                <Badge
                  variant="secondary"
                  className={cn(
                    "text-xs flex items-center gap-1",
                    change.type === 'increase'
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  )}
                >
                  {change.type === 'increase' ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {change.value}%
                </Badge>
              )}
            </div>
            {description && (
              <p className="text-xs text-gray-500">{description}</p>
            )}
          </div>
          {Icon && (
            <div className={cn(
              "flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r text-white group-hover:scale-110 transition-transform duration-300",
              gradient
            )}>
              <Icon className="h-6 w-6" />
            </div>
          )}
        </div>
        {change && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              {change.type === 'increase' ? '+' : ''}{change.value}% from {change.period}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
