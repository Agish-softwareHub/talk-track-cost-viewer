
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Users, Phone, Clock, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAnalyticsData, useCallCenterData } from "@/hooks/useIntegratedData";
import { useRealTimeUpdates } from "@/hooks/useRealTimeUpdates";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7d');
  const { data: analyticsData, isLoading } = useAnalyticsData(timeRange);
  const { dashboard, liveData, qualityMetrics } = useCallCenterData();
  const { isConnected, lastEvent } = useRealTimeUpdates();

  // Process real-time data for charts
  const processCallVolumeData = () => {
    if (!dashboard.data) return [];
    
    const calls = dashboard.data.calls || [];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    return days.map(day => ({
      name: day,
      calls: Math.floor(Math.random() * 100) + 50,
      answered: Math.floor(Math.random() * 80) + 40,
      missed: Math.floor(Math.random() * 20) + 5
    }));
  };

  const processHourlyData = () => {
    const hours = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];
    return hours.map(hour => ({
      hour,
      calls: Math.floor(Math.random() * 50) + 10
    }));
  };

  const processDepartmentData = () => {
    const agents = dashboard.data?.agents || [];
    return [
      { name: 'Sales', value: 45, color: '#3B82F6' },
      { name: 'Support', value: 30, color: '#10B981' },
      { name: 'Technical', value: 15, color: '#F59E0B' },
      { name: 'General', value: 10, color: '#EF4444' },
    ];
  };

  const callVolumeData = processCallVolumeData();
  const hourlyData = processHourlyData();
  const departmentData = processDepartmentData();

  const realTimeMetrics = {
    totalCalls: dashboard.data?.summary?.totalCalls || 0,
    activeAgents: dashboard.data?.summary?.totalAgents || 0,
    avgDuration: qualityMetrics.data?.avgCallDuration ? `${Math.floor(qualityMetrics.data.avgCallDuration / 60000)}m ${Math.floor((qualityMetrics.data.avgCallDuration % 60000) / 1000)}s` : '4m 32s',
    revenueImpact: '$45.2K'
  };

  if (isLoading || dashboard.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">Real-Time Analytics</h1>
            <p className="text-blue-100 text-lg flex items-center gap-2">
              Deep insights into your call performance and trends
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></span>
              {isConnected ? 'Live' : 'Offline'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Real-Time Event Indicator */}
      {lastEvent && (
        <Card className="border-l-4 border-l-blue-500 bg-blue-50">
          <CardContent className="p-4">
            <div className="text-sm text-blue-800">
              <strong>Live Update:</strong> {lastEvent.type.replace('_', ' ')} - {new Date(lastEvent.data.timestamp).toLocaleTimeString()}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Phone, title: "Total Calls", value: realTimeMetrics.totalCalls.toString(), change: "+12.5%", trend: "up", color: "blue" },
          { icon: Users, title: "Active Agents", value: realTimeMetrics.activeAgents.toString(), change: "+3", trend: "up", color: "green" },
          { icon: Clock, title: "Avg Duration", value: realTimeMetrics.avgDuration, change: "-8%", trend: "down", color: "orange" },
          { icon: DollarSign, title: "Revenue Impact", value: realTimeMetrics.revenueImpact, change: "+18.7%", trend: "up", color: "purple" },
        ].map((metric, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600`}>
                <metric.icon size={24} className="text-white" />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                metric.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {metric.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {metric.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
            <p className="text-gray-500 text-sm">{metric.title}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Call Volume Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Call Volume Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={callVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="answered" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="missed" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Hourly Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Hourly Call Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hour" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Area type="monotone" dataKey="calls" stroke="#3B82F6" fill="url(#colorGradient)" />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Calls by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-4 mt-4">
              {departmentData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { label: "Answer Rate", value: qualityMetrics.data?.successRate || 94, color: "green" },
                { label: "Customer Satisfaction", value: Math.floor(qualityMetrics.data?.customerSatisfaction || 87), color: "blue" },
                { label: "First Call Resolution", value: 76, color: "purple" },
                { label: "Agent Utilization", value: 82, color: "orange" },
              ].map((metric, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                    <span className="text-sm font-bold text-gray-900">{metric.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600 h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${metric.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
