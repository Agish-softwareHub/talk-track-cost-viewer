import { useState, useEffect } from "react";
import { Activity, Phone, Users, AlertTriangle, CheckCircle, Clock, Zap, Volume2, VolumeX, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function LiveMonitoring() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const realTimeStats = {
    activeCalls: 23,
    waitingCalls: 8,
    availableAgents: 12,
    totalAgents: 18,
    avgWaitTime: "2m 15s",
    longestWait: "8m 42s"
  };

  const liveCalls = [
    { id: "LC001", agent: "Sarah Johnson", customer: "+1 (555) 123-4567", duration: "3m 45s", type: "Support", priority: "High", sentiment: "Positive" },
    { id: "LC002", agent: "Mike Wilson", customer: "+1 (555) 987-6543", duration: "7m 12s", type: "Sales", priority: "Medium", sentiment: "Neutral" },
    { id: "LC003", agent: "Emily Davis", customer: "+1 (555) 456-7890", duration: "1m 33s", type: "Technical", priority: "High", sentiment: "Negative" },
    { id: "LC004", agent: "John Smith", customer: "+1 (555) 321-0987", duration: "5m 21s", type: "Billing", priority: "Low", sentiment: "Positive" },
    { id: "LC005", agent: "Lisa Brown", customer: "+1 (555) 111-2222", duration: "2m 08s", type: "General", priority: "Medium", sentiment: "Neutral" }
  ];

  const queuedCalls = [
    { id: "QC001", customer: "+1 (555) 777-8888", waitTime: "2m 15s", type: "Support", priority: "High" },
    { id: "QC002", customer: "+1 (555) 999-0000", waitTime: "1m 45s", type: "Sales", priority: "Medium" },
    { id: "QC003", customer: "+1 (555) 444-5555", waitTime: "4m 12s", type: "Technical", priority: "High" },
    { id: "QC004", customer: "+1 (555) 666-7777", waitTime: "45s", type: "General", priority: "Low" }
  ];

  const agentStatus = [
    { name: "Sarah Johnson", status: "On Call", department: "Support", callsToday: 18, avgHandleTime: "4m 32s", performance: 94 },
    { name: "Mike Wilson", status: "On Call", department: "Sales", callsToday: 15, avgHandleTime: "6m 15s", performance: 89 },
    { name: "Emily Davis", status: "On Call", department: "Technical", callsToday: 12, avgHandleTime: "8m 45s", performance: 96 },
    { name: "John Smith", status: "On Call", department: "Billing", callsToday: 20, avgHandleTime: "3m 28s", performance: 87 },
    { name: "Lisa Brown", status: "On Call", department: "General", callsToday: 16, avgHandleTime: "5m 12s", performance: 92 },
    { name: "David Lee", status: "Available", department: "Support", callsToday: 14, avgHandleTime: "4m 18s", performance: 88 },
    { name: "Anna Chen", status: "Break", department: "Sales", callsToday: 11, avgHandleTime: "7m 02s", performance: 85 },
    { name: "Tom Rodriguez", status: "Available", department: "Technical", callsToday: 9, avgHandleTime: "9m 15s", performance: 93 }
  ];

  const alerts = [
    { id: 1, type: "warning", message: "High wait time detected: 8m 42s", time: "2 min ago" },
    { id: 2, type: "info", message: "Agent Sarah Johnson exceeded daily target", time: "5 min ago" },
    { id: 3, type: "error", message: "System integration timeout - Google Services", time: "12 min ago" },
    { id: 4, type: "success", message: "New agent Lisa Brown came online", time: "18 min ago" }
  ];

  const filteredCalls = activeFilter === "all" ? liveCalls : liveCalls.filter(call => call.type.toLowerCase() === activeFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Live Call Monitoring</h1>
            <p className="text-emerald-100">Real-time oversight of all call center operations</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{currentTime.toLocaleTimeString()}</div>
            <div className="text-emerald-100">{currentTime.toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Active Calls", value: realTimeStats.activeCalls, icon: Phone, color: "blue" },
          { label: "In Queue", value: realTimeStats.waitingCalls, icon: Clock, color: "orange" },
          { label: "Available", value: realTimeStats.availableAgents, icon: CheckCircle, color: "green" },
          { label: "Total Agents", value: realTimeStats.totalAgents, icon: Users, color: "purple" },
          { label: "Avg Wait", value: realTimeStats.avgWaitTime, icon: Activity, color: "yellow" },
          { label: "Longest Wait", value: realTimeStats.longestWait, icon: AlertTriangle, color: "red" }
        ].map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon size={20} className={`text-${stat.color}-600`} />
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Calls */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="text-green-600" size={20} />
                  Active Calls ({liveCalls.length})
                </CardTitle>
                <div className="flex gap-1">
                  {["all", "support", "sales", "technical"].map((filter) => (
                    <Button
                      key={filter}
                      variant={activeFilter === filter ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveFilter(filter)}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredCalls.map((call) => (
                  <div key={call.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="font-medium text-gray-900">{call.agent}</span>
                        </div>
                        <Badge variant="outline">{call.type}</Badge>
                        <Badge variant={call.priority === "High" ? "destructive" : call.priority === "Medium" ? "default" : "secondary"}>
                          {call.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Volume2 size={14} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Pause size={14} />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{call.customer}</span>
                      <div className="flex items-center gap-4">
                        <span>Duration: {call.duration}</span>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                          call.sentiment === "Positive" ? "bg-green-100 text-green-700" :
                          call.sentiment === "Negative" ? "bg-red-100 text-red-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {call.sentiment}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Queue Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="text-orange-600" size={20} />
                Call Queue ({queuedCalls.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {queuedCalls.map((call, index) => (
                  <div key={call.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 bg-orange-100 text-orange-600 rounded-full text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="font-medium">{call.customer}</span>
                      <Badge variant="outline" className="text-xs">{call.type}</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span>Wait: {call.waitTime}</span>
                      <Badge variant={call.priority === "High" ? "destructive" : "secondary"} className="text-xs">
                        {call.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Agent Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="text-blue-600" size={20} />
                Agent Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {agentStatus.map((agent, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{agent.name}</span>
                      <Badge variant={agent.status === "On Call" ? "default" : agent.status === "Available" ? "secondary" : "outline"}>
                        {agent.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Calls: {agent.callsToday}</span>
                        <span>{agent.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg: {agent.avgHandleTime}</span>
                        <span>{agent.performance}%</span>
                      </div>
                      <Progress value={agent.performance} className="h-1 mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="text-red-600" size={20} />
                Live Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
                    alert.type === "error" ? "border-red-500 bg-red-50" :
                    alert.type === "warning" ? "border-yellow-500 bg-yellow-50" :
                    alert.type === "success" ? "border-green-500 bg-green-50" :
                    "border-blue-500 bg-blue-50"
                  }`}>
                    <div className="text-sm font-medium text-gray-900">{alert.message}</div>
                    <div className="text-xs text-gray-500 mt-1">{alert.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}