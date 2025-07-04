
import { useState } from "react";
import { Phone, PhoneCall, Clock, User, MoreVertical, Play, Pause, SkipForward, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLiveMonitoringData, useCallCenterData } from "@/hooks/useIntegratedData";
import { useRealTimeUpdates } from "@/hooks/useRealTimeUpdates";

export default function CallQueue() {
  const [queueStatus, setQueueStatus] = useState("active");
  const { data: liveData, isLoading } = useLiveMonitoringData();
  const { agents, calls } = useCallCenterData();
  const { isConnected, lastEvent } = useRealTimeUpdates();

  // Process real-time queue data
  const queuedCalls = calls.data?.calls?.filter(call => call.call_status === 'registered') || [];
  const ongoingCalls = calls.data?.calls?.filter(call => call.call_status === 'ongoing') || [];
  const agentsList = agents.data || [];

  const queueStats = {
    callsInQueue: queuedCalls.length,
    averageWait: "2m 15s",
    activeAgents: agentsList.length,
    completedToday: calls.data?.calls?.filter(call => call.call_status === 'ended').length || 0
  };

  if (isLoading || calls.isLoading || agents.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading queue data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">Call Queue Management</h1>
            <p className="text-green-100 text-lg flex items-center gap-2">
              Real-time queue monitoring and agent management
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></span>
              {isConnected ? 'Live' : 'Offline'}
            </p>
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

      {/* Real-Time Event Indicator */}
      {lastEvent && (
        <Card className="border-l-4 border-l-green-500 bg-green-50">
          <CardContent className="p-4">
            <div className="text-sm text-green-800">
              <strong>Live Update:</strong> {lastEvent.type.replace('_', ' ')} - {new Date(lastEvent.data.timestamp).toLocaleTimeString()}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Queue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Calls in Queue", value: queueStats.callsInQueue.toString(), icon: Phone, color: "blue" },
          { title: "Average Wait", value: queueStats.averageWait, icon: Clock, color: "orange" },
          { title: "Active Agents", value: `${queueStats.activeAgents}/12`, icon: User, color: "green" },
          { title: "Completed Today", value: queueStats.completedToday.toString(), icon: PhoneCall, color: "purple" },
        ].map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600`}>
                  <stat.icon size={24} className="text-white" />
                </div>
                <span className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</span>
              </div>
              <p className="text-gray-600 font-medium">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Calls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Queue List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="text-orange-600" size={20} />
                Queue ({queuedCalls.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {queuedCalls.length > 0 ? queuedCalls.map((call, index) => (
                  <div key={call.call_id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-600 rounded-full text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{call.to_number || call.from_number || 'Unknown'}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Wait: {Math.floor(Math.random() * 5) + 1}m {Math.floor(Math.random() * 60)}s</span>
                          <Badge variant="outline">{call.call_type}</Badge>
                          <Badge variant="destructive">High</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Unassigned</span>
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
                )) : (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>No calls in queue</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Ongoing Calls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="text-green-600" size={20} />
                Active Calls ({ongoingCalls.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ongoingCalls.length > 0 ? ongoingCalls.map((call) => (
                  <div key={call.call_id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div>
                        <p className="font-medium text-gray-900">{call.to_number || call.from_number || 'Unknown'}</p>
                        <div className="text-sm text-gray-500">
                          Duration: {Math.floor(Math.random() * 10) + 1}m {Math.floor(Math.random() * 60)}s
                        </div>
                      </div>
                    </div>
                    <Badge variant="default">In Progress</Badge>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">
                    <Activity className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>No active calls</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agent Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="text-blue-600" size={20} />
              Agent Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agentsList.length > 0 ? agentsList.map((agent, index) => (
                <div key={agent.agent_id} className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-900">{agent.agent_name}</p>
                    <Badge variant="secondary">Available</Badge>
                  </div>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>Voice: {agent.voice_id}</p>
                    <p>Language: {agent.language}</p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-gray-500">
                  <User className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No agents available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
