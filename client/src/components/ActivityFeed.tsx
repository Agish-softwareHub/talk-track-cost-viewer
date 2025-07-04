
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Phone, User, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  type: 'call' | 'agent_action' | 'customer_interaction' | 'system_alert';
  title: string;
  description: string;
  timestamp: string;
  status?: 'success' | 'warning' | 'error' | 'info';
  metadata?: Record<string, any>;
}

const sampleActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'call',
    title: 'Incoming Call Handled',
    description: 'AI Agent successfully resolved billing inquiry from John Smith',
    timestamp: '2 minutes ago',
    status: 'success'
  },
  {
    id: '2',
    type: 'agent_action',
    title: 'AI Agent Learning Update',
    description: 'Agent model updated with new customer service protocols',
    timestamp: '15 minutes ago',
    status: 'info'
  },
  {
    id: '3',
    type: 'customer_interaction',
    title: 'Customer Satisfaction Survey',
    description: 'Sarah Johnson rated her experience 5/5 stars',
    timestamp: '32 minutes ago',
    status: 'success'
  },
  {
    id: '4',
    type: 'system_alert',
    title: 'High Call Volume Detected',
    description: 'Auto-scaling activated to handle increased traffic',
    timestamp: '1 hour ago',
    status: 'warning'
  }
];

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'call':
      return Phone;
    case 'agent_action':
      return Bot;
    case 'customer_interaction':
      return User;
    case 'system_alert':
      return AlertCircle;
    default:
      return Clock;
  }
};

const getStatusColor = (status: ActivityItem['status']) => {
  switch (status) {
    case 'success':
      return 'text-green-600 bg-green-100';
    case 'warning':
      return 'text-yellow-600 bg-yellow-100';
    case 'error':
      return 'text-red-600 bg-red-100';
    case 'info':
      return 'text-blue-600 bg-blue-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export function ActivityFeed() {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sampleActivities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          return (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0",
                getStatusColor(activity.status)
              )}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </p>
                  <span className="text-xs text-gray-500">{activity.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
              </div>
            </div>
          );
        })}
        <div className="pt-2 border-t">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View all activities →
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
