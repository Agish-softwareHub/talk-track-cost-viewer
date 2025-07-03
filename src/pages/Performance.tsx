
import { Zap, TrendingUp, Award, Clock, Target, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const performanceData = [
  { metric: 'Call Volume', current: 95, previous: 88, target: 100 },
  { metric: 'Resolution Rate', current: 89, previous: 85, target: 90 },
  { metric: 'Response Time', current: 92, previous: 88, target: 95 },
  { metric: 'Customer Satisfaction', current: 87, previous: 83, target: 90 },
  { metric: 'Agent Efficiency', current: 91, previous: 89, target: 92 },
  { metric: 'Quality Score', current: 86, previous: 82, target: 88 }
];

export default function Performance() {
  const kpis = [
    { title: "Overall Performance", value: "89.2%", change: "+4.3%", icon: Zap, color: "purple" },
    { title: "Target Achievement", value: "92.1%", change: "+2.8%", icon: Target, color: "green" },
    { title: "Team Efficiency", value: "87.5%", change: "+1.9%", icon: Users, color: "blue" },
    { title: "Improvement Rate", value: "+5.7%", change: "vs last month", icon: TrendingUp, color: "orange" }
  ];

  const departmentPerformance = [
    { department: "Sales", score: 92, calls: 450, efficiency: 89 },
    { department: "Support", score: 88, calls: 320, efficiency: 91 },
    { department: "Technical", score: 90, calls: 180, efficiency: 87 },
    { department: "Management", score: 94, calls: 80, efficiency: 95 }
  ];

  const topAchievers = [
    { name: "Emily Davis", score: 96.2, department: "Technical", badge: "Excellence" },
    { name: "Sarah Johnson", score: 94.8, department: "Sales", badge: "Top Performer" },
    { name: "Mike Wilson", score: 93.1, department: "Support", badge: "Consistent" }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">Performance Dashboard</h1>
            <p className="text-yellow-100 text-lg">Track and optimize team performance metrics</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">A+</div>
            <div className="text-yellow-100">Performance Grade</div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r from-${kpi.color}-500 to-${kpi.color}-600`}>
                <kpi.icon size={24} className="text-white" />
              </div>
              <div className="text-green-600 text-sm font-medium flex items-center gap-1">
                <TrendingUp size={14} />
                {kpi.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
            <p className="text-gray-600 font-medium">{kpi.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Radar */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Overview</h2>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={performanceData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" className="text-sm" />
              <PolarRadiusAxis angle={0} domain={[0, 100]} className="text-xs" />
              <Radar name="Current" dataKey="current" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} strokeWidth={2} />
              <Radar name="Previous" dataKey="previous" stroke="#94A3B8" fill="#94A3B8" fillOpacity={0.1} strokeWidth={1} />
              <Radar name="Target" dataKey="target" stroke="#10B981" fill="none" strokeWidth={2} strokeDasharray="5,5" />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Department Performance */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Department Performance</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={departmentPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="department" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Detailed Metrics</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {performanceData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{item.metric}</span>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-600">Target: {item.target}%</span>
                    <span className={`font-medium ${
                      item.current >= item.target ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {item.current}%
                    </span>
                    <span className={`text-xs ${
                      item.current > item.previous ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.current > item.previous ? '↗' : '↘'} {Math.abs(item.current - item.previous)}%
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        item.current >= item.target 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                          : 'bg-gradient-to-r from-orange-500 to-red-600'
                      }`}
                      style={{ width: `${item.current}%` }}
                    ></div>
                  </div>
                  <div 
                    className="absolute top-0 w-0.5 h-3 bg-gray-700"
                    style={{ left: `${item.target}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Achievers */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Award size={24} className="text-yellow-600" />
            Top Achievers This Month
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topAchievers.map((achiever, index) => (
              <div key={index} className="text-center relative">
                <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-medium ${
                  index === 0 ? 'bg-yellow-100 text-yellow-700' :
                  index === 1 ? 'bg-blue-100 text-blue-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {achiever.badge}
                </div>
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                  index === 0 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                  index === 1 ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                  'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}>
                  {achiever.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{achiever.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{achiever.department}</p>
                <div className="text-2xl font-bold text-green-600">{achiever.score}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
