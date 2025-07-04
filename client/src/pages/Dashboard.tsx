
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bot, 
  Phone, 
  Users, 
  TrendingUp, 
  Clock, 
  Zap,
  Target,
  AlertCircle,
  PlayCircle,
  Pause,
  BarChart3,
  Activity
} from "lucide-react";
import { EnhancedMetricCard } from "@/components/EnhancedMetricCard";
import { ActivityFeed } from "@/components/ActivityFeed";
import { QuickActions } from "@/components/QuickActions";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const performanceData = [
  { time: '9AM', calls: 45, satisfaction: 98 },
  { time: '10AM', calls: 52, satisfaction: 97 },
  { time: '11AM', calls: 38, satisfaction: 99 },
  { time: '12PM', calls: 65, satisfaction: 96 },
  { time: '1PM', calls: 58, satisfaction: 98 },
  { time: '2PM', calls: 72, satisfaction: 97 },
  { time: '3PM', calls: 48, satisfaction: 99 },
];

export default function Dashboard() {
  const [isLive, setIsLive] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              AI CallCenter Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Real-time insights into your AI-powered customer service operations
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-sm font-medium">
                {isLive ? 'Live' : 'Offline'} • {currentTime.toLocaleTimeString()}
              </span>
            </div>
            <Button
              onClick={() => setIsLive(!isLive)}
              variant={isLive ? "secondary" : "default"}
              className="flex items-center gap-2"
            >
              {isLive ? <Pause className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
              {isLive ? 'Pause' : 'Start'} Live Mode
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <EnhancedMetricCard
            title="Active AI Agents"
            value="12"
            change={{ value: 20, type: 'increase', period: 'last hour' }}
            icon={Bot}
            gradient="from-blue-500 to-cyan-500"
            description="Handling customer inquiries"
          />
          <EnhancedMetricCard
            title="Calls Today"
            value="1,247"
            change={{ value: 15, type: 'increase', period: 'yesterday' }}
            icon={Phone}
            gradient="from-green-500 to-teal-500"
            description="Average 3.2 min duration"
          />
          <EnhancedMetricCard
            title="Customer Satisfaction"
            value="98.5%"
            change={{ value: 2.3, type: 'increase', period: 'last week' }}
            icon={Target}
            gradient="from-purple-500 to-pink-500"
            description="Based on 892 surveys"
          />
          <EnhancedMetricCard
            title="Response Time"
            value="0.8s"
            change={{ value: 12, type: 'decrease', period: 'last hour' }}
            icon={Zap}
            gradient="from-orange-500 to-red-500"
            description="Average AI response"
          />
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Call Volume & Satisfaction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="calls" 
                    stackId="1"
                    stroke="#3b82f6" 
                    fill="url(#colorCalls)" 
                  />
                  <defs>
                    <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Satisfaction Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[95, 100]} />
                  <Tooltip />
                  <Line 
                    type="monotone"
                    dataKey="satisfaction"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: '#10b981', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Lower Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* System Status */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'AI Processing', status: 'operational', uptime: '99.9%' },
                { name: 'Call Routing', status: 'operational', uptime: '100%' },
                { name: 'Database', status: 'operational', uptime: '99.8%' },
                { name: 'Analytics', status: 'maintenance', uptime: '98.5%' }
              ].map((service) => (
                <div key={service.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      service.status === 'operational' ? 'bg-green-400' : 
                      service.status === 'maintenance' ? 'bg-yellow-400' : 'bg-red-400'
                    }`}></div>
                    <span className="font-medium">{service.name}</span>
                  </div>
                  <div className="text-right">
                    <Badge variant={service.status === 'operational' ? 'default' : 'secondary'}>
                      {service.uptime}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <QuickActions />

          {/* Activity Feed */}
          <ActivityFeed />
        </div>

        {/* Performance Alerts */}
        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                <AlertCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Performance Insights</h3>
                <p className="text-gray-600 mb-4">
                  Your AI agents are performing exceptionally well today with a 15% increase in call resolution rate.
                  Consider scaling up to handle the increased demand.
                </p>
                <div className="flex gap-3">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Auto-Scale Now
                  </Button>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
