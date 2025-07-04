
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Phone, Users, Settings, BarChart, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const quickActions = [
  {
    title: "Start AI Agent",
    description: "Deploy new AI agent",
    icon: Bot,
    href: "/ai-agents",
    color: "from-blue-500 to-cyan-500",
    badge: "Popular"
  },
  {
    title: "Monitor Calls",
    description: "Live call monitoring",
    icon: Phone,
    href: "/live-monitoring",
    color: "from-green-500 to-teal-500"
  },
  {
    title: "Manage Customers",
    description: "Customer database",
    icon: Users,
    href: "/customer-crm",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "View Analytics",
    description: "Performance insights",
    icon: BarChart,
    href: "/analytics",
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Auto-Scale",
    description: "Scale operations",
    icon: Zap,
    href: "/performance",
    color: "from-yellow-500 to-orange-500",
    badge: "New"
  },
  {
    title: "Configure",
    description: "System settings",
    icon: Settings,
    href: "/settings",
    color: "from-gray-500 to-slate-500"
  }
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <Link key={action.title} to={action.href}>
              <Button
                variant="ghost"
                className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all group"
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color} text-white group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-4 w-4" />
                  </div>
                  {action.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {action.badge}
                    </Badge>
                  )}
                </div>
                <div className="text-left">
                  <p className="font-medium text-sm text-gray-900">{action.title}</p>
                  <p className="text-xs text-gray-600">{action.description}</p>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
