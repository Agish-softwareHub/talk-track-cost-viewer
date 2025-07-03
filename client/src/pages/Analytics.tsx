
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Users, Phone, Clock, DollarSign } from 'lucide-react';

const callVolumeData = [
  { name: 'Mon', calls: 120, answered: 95, missed: 25 },
  { name: 'Tue', calls: 150, answered: 120, missed: 30 },
  { name: 'Wed', calls: 180, answered: 160, missed: 20 },
  { name: 'Thu', calls: 200, answered: 175, missed: 25 },
  { name: 'Fri', calls: 220, answered: 190, missed: 30 },
  { name: 'Sat', calls: 100, answered: 85, missed: 15 },
  { name: 'Sun', calls: 80, answered: 70, missed: 10 },
];

const hourlyData = [
  { hour: '9AM', calls: 15 }, { hour: '10AM', calls: 25 }, { hour: '11AM', calls: 30 },
  { hour: '12PM', calls: 45 }, { hour: '1PM', calls: 55 }, { hour: '2PM', calls: 65 },
  { hour: '3PM', calls: 70 }, { hour: '4PM', calls: 50 }, { hour: '5PM', calls: 35 },
];

const departmentData = [
  { name: 'Sales', value: 45, color: '#3B82F6' },
  { name: 'Support', value: 30, color: '#10B981' },
  { name: 'Marketing', value: 15, color: '#F59E0B' },
  { name: 'Technical', value: 10, color: '#EF4444' },
];

export default function Analytics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">Advanced Analytics</h1>
        <p className="text-blue-100 text-lg">Deep insights into your call performance and trends</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Phone, title: "Total Calls", value: "2,847", change: "+12.5%", trend: "up", color: "blue" },
          { icon: Users, title: "Active Agents", value: "24", change: "+3", trend: "up", color: "green" },
          { icon: Clock, title: "Avg Duration", value: "4m 32s", change: "-8%", trend: "down", color: "orange" },
          { icon: DollarSign, title: "Revenue Impact", value: "$45.2K", change: "+18.7%", trend: "up", color: "purple" },
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
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Weekly Call Volume</h2>
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
        </div>

        {/* Hourly Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Hourly Call Distribution</h2>
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
        </div>

        {/* Department Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Calls by Department</h2>
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
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Insights</h2>
          <div className="space-y-6">
            {[
              { label: "Answer Rate", value: 94, color: "green" },
              { label: "Customer Satisfaction", value: 87, color: "blue" },
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
        </div>
      </div>
    </div>
  );
}
