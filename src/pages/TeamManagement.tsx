
import { useState } from "react";
import { Users, UserPlus, Star, TrendingUp, Phone, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TeamManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Agent",
      department: "Sales",
      status: "Available",
      rating: 4.8,
      callsToday: 15,
      avgDuration: "4m 32s",
      avatar: "SJ",
      performance: 92
    },
    {
      id: 2,
      name: "Mike Wilson",
      role: "Support Specialist", 
      department: "Technical",
      status: "On Call",
      rating: 4.6,
      callsToday: 12,
      avgDuration: "6m 15s",
      avatar: "MW",
      performance: 88
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Team Lead",
      department: "Customer Service",
      status: "Break",
      rating: 4.9,
      callsToday: 8,
      avgDuration: "3m 45s",
      avatar: "ED",
      performance: 95
    },
    {
      id: 4,
      name: "John Smith",
      role: "Junior Agent",
      department: "Sales",
      status: "Available",
      rating: 4.3,
      callsToday: 18,
      avgDuration: "5m 20s",
      avatar: "JS",
      performance: 85
    }
  ];

  const departments = [
    { name: "Sales", members: 12, performance: 91, color: "blue" },
    { name: "Support", members: 8, performance: 88, color: "green" },
    { name: "Technical", members: 6, performance: 92, color: "purple" },
    { name: "Management", members: 4, performance: 96, color: "orange" }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">Team Management</h1>
            <p className="text-purple-100 text-lg">Manage your team performance and assignments</p>
          </div>
          <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
            <UserPlus size={16} className="mr-2" />
            Add Team Member
          </Button>
        </div>
      </div>

      {/* Department Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {departments.map((dept, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r from-${dept.color}-500 to-${dept.color}-600`}>
                <Users size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{dept.members}</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{dept.name}</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Performance</span>
              <span className={`text-sm font-medium text-${dept.color}-600`}>{dept.performance}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className={`bg-gradient-to-r from-${dept.color}-500 to-${dept.color}-600 h-2 rounded-full`}
                style={{ width: `${dept.performance}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <select className="border border-gray-300 rounded-lg px-4 py-2">
              <option>All Departments</option>
              <option>Sales</option>
              <option>Support</option>
              <option>Technical</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-4 py-2">
              <option>All Status</option>
              <option>Available</option>
              <option>On Call</option>
              <option>Break</option>
            </select>
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {member.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                member.status === 'Available' ? 'bg-green-100 text-green-700' :
                member.status === 'On Call' ? 'bg-blue-100 text-blue-700' :
                'bg-orange-100 text-orange-700'
              }`}>
                {member.status}
              </span>
            </div>

            {/* Performance Metrics */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Performance</span>
                <span className="text-sm font-medium text-gray-900">{member.performance}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                  style={{ width: `${member.performance}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Phone size={16} className="text-blue-500 mr-1" />
                    <span className="font-bold text-gray-900">{member.callsToday}</span>
                  </div>
                  <p className="text-xs text-gray-500">Calls Today</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Clock size={16} className="text-orange-500 mr-1" />
                    <span className="font-bold text-gray-900">{member.avgDuration}</span>
                  </div>
                  <p className="text-xs text-gray-500">Avg Duration</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-500 fill-current" />
                  <span className="font-medium text-gray-900">{member.rating}</span>
                </div>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {member.department}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Award className="text-yellow-500" size={24} />
            Top Performers This Month
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.slice(0, 3).map((member, index) => (
              <div key={member.id} className="text-center">
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto">
                    {member.avatar}
                  </div>
                  <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                  }`}>
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{member.department}</p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <TrendingUp size={14} className="text-green-500" />
                    {member.performance}%
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-500" />
                    {member.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
