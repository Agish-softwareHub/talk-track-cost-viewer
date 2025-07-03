
import { MetricCard } from "@/components/MetricCard";
import { Activity, Clock, FileText, BarChart } from "lucide-react";

export default function Dashboard() {
  const metrics = [
    {
      title: "Total Calls Today",
      value: "1,247",
      subtitle: "32 active calls",
      icon: Activity,
      trend: { value: "12%", isPositive: true },
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Average Duration",
      value: "4m 32s",
      subtitle: "Per call average",
      icon: Clock,
      trend: { value: "8%", isPositive: false },
      gradient: "from-green-500 to-green-600"
    },
    {
      title: "Total Cost",
      value: "$2,847",
      subtitle: "This month",
      icon: BarChart,
      trend: { value: "15%", isPositive: true },
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Credits Available",
      value: "8,492",
      subtitle: "Expires in 30 days",
      icon: FileText,
      trend: { value: "156", isPositive: false },
      gradient: "from-orange-500 to-orange-600"
    }
  ];

  const recentCalls = [
    {
      id: "CALL-001",
      number: "+1 (555) 123-4567",
      duration: "3m 45s",
      cost: "$0.12",
      status: "completed",
      timestamp: "2 minutes ago"
    },
    {
      id: "CALL-002",
      number: "+1 (555) 987-6543",
      duration: "7m 12s",
      cost: "$0.28",
      status: "completed",
      timestamp: "5 minutes ago"
    },
    {
      id: "CALL-003",
      number: "+1 (555) 456-7890",
      duration: "1m 23s",
      cost: "$0.05",
      status: "failed",
      timestamp: "8 minutes ago"
    },
    {
      id: "CALL-004",
      number: "+1 (555) 321-0987",
      duration: "5m 56s",
      cost: "$0.19",
      status: "completed",
      timestamp: "12 minutes ago"
    }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Monitor your call analytics and performance metrics</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Calls */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Calls</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentCalls.map((call) => (
              <div key={call.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-medium text-gray-900">{call.number}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      call.status === 'completed' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {call.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {call.duration} • {call.cost} • {call.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Stats</h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Success Rate</span>
                <span className="font-semibold text-gray-900">94.2%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{width: '94.2%'}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Peak Hours</span>
                <span className="font-semibold text-gray-900">2PM - 4PM</span>
              </div>
              <div className="text-sm text-gray-500">Highest call volume today</div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Average Wait Time</span>
                <span className="font-semibold text-gray-900">23 seconds</span>
              </div>
              <div className="text-sm text-gray-500">12% improvement from yesterday</div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Credits Usage</span>
                <span className="font-semibold text-gray-900">68%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" style={{width: '68%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
