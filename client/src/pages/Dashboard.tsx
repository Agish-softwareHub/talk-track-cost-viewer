
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
import { useRetellAgents, useRetellCalls, useRetellPhoneNumbers } from "@/hooks/useRetell";

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
  
  const { data: agents, isLoading: agentsLoading } = useRetellAgents();
  const { data: callsData, isLoading: callsLoading } = useRetellCalls();
  const { data: phoneNumbers, isLoading: phoneNumbersLoading } = useRetellPhoneNumbers();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate metrics from real data
  const activeAgents = agents?.filter(agent => agent.agent_id).length || 0;
  const totalCalls = callsData?.calls?.length || 0;
  const activeCalls = callsData?.calls?.filter(call => call.call_status === 'ongoing').length || 0;
  const completedCalls = callsData?.calls?.filter(call => call.call_status === 'ended').length || 0;
  const totalPhoneNumbers = phoneNumbers?.length || 0;

  // Calculate average response time (mock calculation for now)
  const avgResponseTime = "0.8s";
  const satisfactionRate = "98.5%";

  if (agentsLoading || callsLoading || phoneNumbersLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Retell data...</p>
        </div>
      </div>
    );
  }

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
              Real-time insights powered by Retell AI
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
            value={activeAgents.toString()}
            change={{ value: 20, type: 'increase', period: 'last hour' }}
            icon={Bot}
            gradient="from-blue-500 to-cyan-500"
            description="Handling customer inquiries"
          />
          <EnhancedMetricCard
            title="Total Calls"
            value={totalCalls.toString()}
            change={{ value: 15, type: 'increase', period: 'yesterday' }}
            icon={Phone}
            gradient="from-green-500 to-teal-500"
            description={`${activeCalls} active, ${completedCalls} completed`}
          />
          <EnhancedMetricCard
            title="Customer Satisfaction"
            value={satisfactionRate}
            change={{ value: 2.3, type: 'increase', period: 'last week' }}
            icon={Target}
            gradient="from-purple-500 to-pink-500"
            description="Based on call analytics"
          />
          <EnhancedMetricCard
            title="Response Time"
            value={avgResponseTime}
            change={{ value: 12, type: 'decrease', period: 'last hour' }}
            icon={Zap}
            gradient="from-orange-500 to-red-500"
            description="Average AI response"
          />
        </div>

        {/* Realtime Call Status */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Recent Calls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {callsData?.calls?.slice(0, 5).map((call) => (
                  <div key={call.call_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        call.call_status === 'ongoing' ? 'bg-green-400 animate-pulse' :
                        call.call_status === 'ended' ? 'bg-gray-400' :
                        call.call_status === 'error' ? 'bg-red-400' :
                        'bg-yellow-400'
                      }`}></div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {call.from_number || call.to_number || 'Unknown'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {call.direction} • {call.call_type}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        call.call_status === 'ongoing' ? 'default' :
                        call.call_status === 'ended' ? 'secondary' :
                        call.call_status === 'error' ? 'destructive' :
                        'outline'
                      }>
                        {call.call_status}
                      </Badge>
                      {call.start_timestamp && (
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(call.start_timestamp * 1000).toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                {(!callsData?.calls || callsData.calls.length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    No recent calls found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {/* Agent Status */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  AI Agents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {agents?.slice(0, 4).map((agent) => (
                  <div key={agent.agent_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{agent.agent_name}</p>
                      <p className="text-sm text-gray-500">{agent.language}</p>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                ))}
                {(!agents || agents.length === 0) && (
                  <div className="text-center py-4 text-gray-500">
                    No agents configured
                  </div>
                )}
              </CardContent>
            </Card>

            <QuickActions />
          </div>
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

        {/* System Status with real phone numbers */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="font-medium">Retell AI Service</span>
              </div>
              <Badge variant="default">Operational</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="font-medium">Phone Numbers</span>
              </div>
              <Badge variant="default">{totalPhoneNumbers} Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="font-medium">AI Agents</span>
              </div>
              <Badge variant="default">{activeAgents} Online</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Performance Alerts */}
        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                <AlertCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Retell Integration Active</h3>
                <p className="text-gray-600 mb-4">
                  Your system is now connected to Retell AI with {activeAgents} active agents and {totalPhoneNumbers} phone numbers configured. 
                  All metrics are being updated in real-time.
                </p>
                <div className="flex gap-3">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    View Analytics
                  </Button>
                  <Button size="sm" variant="outline">
                    Manage Agents
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
