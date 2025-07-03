
import { useState } from "react";
import { Calendar, FileText, Clock, Activity } from "lucide-react";

export default function Reports() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("today");
  
  const callData = [
    {
      id: "CALL-001",
      number: "+1 (555) 123-4567",
      date: "2024-01-15",
      time: "10:30 AM",
      duration: "3m 45s",
      cost: "$0.12",
      status: "completed",
      recording: true,
      transcript: true
    },
    {
      id: "CALL-002",
      number: "+1 (555) 987-6543",
      date: "2024-01-15",
      time: "11:15 AM",
      duration: "7m 12s",
      cost: "$0.28",
      status: "completed",
      recording: true,
      transcript: true
    },
    {
      id: "CALL-003",
      number: "+1 (555) 456-7890",
      date: "2024-01-15",
      time: "12:05 PM",
      duration: "1m 23s",
      cost: "$0.05",
      status: "failed",
      recording: false,
      transcript: false
    },
    {
      id: "CALL-004",
      number: "+1 (555) 321-0987",
      date: "2024-01-15",
      time: "1:22 PM",
      duration: "5m 56s",
      cost: "$0.19",
      status: "completed",
      recording: true,
      transcript: true
    },
    {
      id: "CALL-005",
      number: "+1 (555) 111-2222",
      date: "2024-01-15",
      time: "2:45 PM",
      duration: "9m 18s",
      cost: "$0.34",
      status: "completed",
      recording: true,
      transcript: true
    }
  ];

  const timeRanges = [
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "custom", label: "Custom Range" }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Call Reports</h1>
        <p className="text-gray-600">Detailed analysis of all your call activities</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
            <select 
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="in-progress">In Progress</option>
            </select>
          </div>
          
          <div className="flex-1"></div>
          
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-shadow duration-300">
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Calls</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
            <Activity className="text-blue-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Duration</p>
              <p className="text-2xl font-bold text-gray-900">94h 23m</p>
            </div>
            <Clock className="text-green-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Cost</p>
              <p className="text-2xl font-bold text-gray-900">$284.76</p>
            </div>
            <Calendar className="text-purple-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">94.2%</p>
            </div>
            <FileText className="text-orange-500" size={24} />
          </div>
        </div>
      </div>

      {/* Call Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Calls</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Call ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Features</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {callData.map((call) => (
                <tr key={call.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {call.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {call.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div>{call.date}</div>
                      <div className="text-gray-500">{call.time}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {call.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {call.cost}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      call.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {call.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex gap-2">
                      {call.recording && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded">Recording</span>
                      )}
                      {call.transcript && (
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 text-xs rounded">Transcript</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
