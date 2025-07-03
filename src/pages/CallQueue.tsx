
import { useState } from "react";
import { Phone, PhoneCall, Clock, User, MoreVertical, Play, Pause, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CallQueue() {
  const [queueStatus, setQueueStatus] = useState("active");

  const queuedCalls = [
    { id: "Q001", number: "+1 (555) 123-4567", waitTime: "2m 15s", priority: "High", agent: "Unassigned", type: "Sales" },
    { id: "Q002", number: "+1 (555) 987-6543", waitTime: "1m 45s", priority: "Medium", agent: "Sarah", type: "Support" },
    { id: "Q003", number: "+1 (555) 456-7890", waitTime: "3m 02s", priority: "High", agent: "Unassigned", type: "Technical" },
    { id: "Q004", number: "+1 (555) 321-0987", waitTime: "45s", priority: "Low", agent: "Mike", type: "General" },
  ];

  const agents = [
    { name: "Sarah Johnson", status: "Available", calls: 3, avgTime: "4m 32s" },
    { name: "Mike Wilson", status: "On Call", calls: 5, avgTime: "3m 45s" },
    { name: "Emily Davis", status: "Break", calls: 2, avgTime: "5m 12s" },
    { name: "John Smith", status: "Available", calls: 4, avgTime: "4m 08s" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">Call Queue Management</h1>
            <p className="text-green-100 text-lg">Real-time queue monitoring and agent management</p>
          </div>
          <div className="flex gap-4">
            <Button 
              variant="secondary" 
              onClick={() => setQueueStatus(queueStatus === "active" ? "paused" : "active")}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              {queueStatus === "active" ? <Pause size={16} /> : <Play size={16} />}
              {queueStatus === "active" ? "Pause Queue" : "Resume Queue"}
            </Button>
          </div>
        </div>
      </div>

      {/* Queue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Calls in Queue", value: "12", icon: Phone, color: "blue" },
          { title: "Average Wait", value: "2m 15s", icon: Clock, color: "orange" },
          { title: "Active Agents", value: "8/12", icon: User, color: "green" },
          { title: "Completed Today", value: "147", icon: PhoneCall, color: "purple" },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600`}>
                <stat.icon size={24} className="text-white" />
              </div>
              <span className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</span>
            </div>
            <p className="text-gray-600 font-medium">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Queue List */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Active Queue</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {queuedCalls.map((call, index) => (
                <div key={call.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{call.number}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Wait: {call.waitTime}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          call.priority === 'High' ? 'bg-red-100 text-red-700' :
                          call.priority === 'Medium' ? 'bg-orange-100 text-orange-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {call.priority}
                        </span>
                        <span>{call.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {call.agent === 'Unassigned' ? 'Unassigned' : `Agent: ${call.agent}`}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Assign Agent</DropdownMenuItem>
                        <DropdownMenuItem>Change Priority</DropdownMenuItem>
                        <DropdownMenuItem>Skip to Front</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Remove from Queue</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Agent Status */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Agent Status</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {agents.map((agent, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-900">{agent.name}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      agent.status === 'Available' ? 'bg-green-100 text-green-700' :
                      agent.status === 'On Call' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>Calls Today: {agent.calls}</p>
                    <p>Avg Time: {agent.avgTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
