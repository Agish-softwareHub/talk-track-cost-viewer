
import { useState } from "react";
import { Bot, FileText, Clock, Activity, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Reports() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("today");
  const [selectedAgent, setSelectedAgent] = useState("all");
  
  const callData = [
    {
      id: "CALL-001",
      number: "+1 (555) 123-4567",
      date: "2024-01-15",
      time: "10:30 AM",
      duration: "3m 45s",
      cost: "$0.12",
      status: "completed",
      agent: "Customer Support Agent",
      department: "Support",
      sentiment: "Positive",
      resolution: "Resolved"
    },
    {
      id: "CALL-002",
      number: "+1 (555) 987-6543",
      date: "2024-01-15",
      time: "11:15 AM",
      duration: "7m 12s",
      cost: "$0.28",
      status: "completed",
      agent: "Sales Agent",
      department: "Sales",
      sentiment: "Neutral",
      resolution: "Follow-up"
    },
    {
      id: "CALL-003",
      number: "+1 (555) 456-7890",
      date: "2024-01-15",
      time: "12:05 PM",
      duration: "1m 23s",
      cost: "$0.05",
      status: "failed",
      agent: "Technical Agent",
      department: "Technical",
      sentiment: "Negative",
      resolution: "Escalated"
    },
    {
      id: "CALL-004",
      number: "+1 (555) 321-0987",
      date: "2024-01-15",
      time: "1:22 PM",
      duration: "5m 56s",
      cost: "$0.19",
      status: "completed",
      agent: "Customer Support Agent",
      department: "Support",
      sentiment: "Positive",
      resolution: "Resolved"
    },
    {
      id: "CALL-005",
      number: "+1 (555) 111-2222",
      date: "2024-01-15",
      time: "2:45 PM",
      duration: "9m 18s",
      cost: "$0.34",
      status: "completed",
      agent: "Sales Agent",
      department: "Sales",
      sentiment: "Positive",
      resolution: "Converted"
    }
  ];

  const [selectedCall, setSelectedCall] = useState(null);

  const timeRanges = [
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "custom", label: "Custom Range" }
  ];

  const agents = [
    { value: "all", label: "All Agents" },
    { value: "support", label: "Customer Support Agent" },
    { value: "sales", label: "Sales Agent" },
    { value: "technical", label: "Technical Agent" }
  ];

  const showCallDetails = (call) => {
    setSelectedCall(call);
  };

  if (selectedCall) {
    return (
      <div className="p-8">
        <div className="mb-6">
          <button 
            onClick={() => setSelectedCall(null)}
            className="text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            ← Back to Reports
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Call Details - {selectedCall.id}</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Call Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Phone Number</p>
                  <p className="font-semibold text-gray-900">{selectedCall.number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold text-gray-900">{selectedCall.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date & Time</p>
                  <p className="font-semibold text-gray-900">{selectedCall.date} at {selectedCall.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cost</p>
                  <p className="font-semibold text-gray-900">{selectedCall.cost}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">AI Agent</p>
                    <p className="font-semibold text-gray-900">{selectedCall.agent}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <Badge variant="outline">{selectedCall.department}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sentiment</p>
                    <Badge variant={selectedCall.sentiment === 'Positive' ? 'default' : selectedCall.sentiment === 'Negative' ? 'destructive' : 'secondary'}>
                      {selectedCall.sentiment}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Resolution</p>
                    <Badge variant="outline">{selectedCall.resolution}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Call Summary</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">AI Analysis</h3>
                <p className="text-gray-700 text-sm">
                  The customer contacted support regarding a billing inquiry. The AI agent successfully 
                  identified the issue, provided clear explanations, and resolved the matter efficiently. 
                  Customer satisfaction was high throughout the interaction.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Key Topics</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Billing</Badge>
                  <Badge variant="secondary">Account Support</Badge>
                  <Badge variant="secondary">Resolution</Badge>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Agent Performance</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Response Time</span>
                    <span className="font-medium">0.8s</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Resolution Time</span>
                    <span className="font-medium">{selectedCall.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Customer Satisfaction</span>
                    <span className="font-medium">9.2/10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Agent Reports</h1>
        <p className="text-gray-600">Detailed analysis of AI agent performance and call activities</p>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">AI Agent</label>
            <select 
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {agents.map((agent) => (
                <option key={agent.value} value={agent.value}>{agent.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1"></div>
          
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-shadow duration-300">
            Export Report
          </button>
        </div>
      </div>

      {/* AI Agent Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Calls</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
            <Bot className="text-blue-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg Response</p>
              <p className="text-2xl font-bold text-gray-900">0.8s</p>
            </div>
            <Clock className="text-green-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">94.2%</p>
            </div>
            <Activity className="text-purple-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900">9.1/10</p>
            </div>
            <FileText className="text-orange-500" size={24} />
          </div>
        </div>
      </div>

      {/* Call Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Calls by AI Agents</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Call ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Agent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sentiment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                      <div className="font-medium">{call.agent}</div>
                      <div className="text-xs text-gray-500">{call.department}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {call.duration}
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={call.sentiment === 'Positive' ? 'default' : call.sentiment === 'Negative' ? 'destructive' : 'secondary'}>
                      {call.sentiment}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button 
                      onClick={() => showCallDetails(call)}
                      className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <Eye size={14} />
                      View Details
                    </button>
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
