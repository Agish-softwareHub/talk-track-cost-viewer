
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Download, Calendar, Clock, Phone, User, TrendingUp, Activity } from "lucide-react";
import { useRetellCalls } from "@/hooks/useRetell";
import { retellService } from "@/services/retellService";
import { toast } from "sonner";

export default function Reports() {
  const [selectedCall, setSelectedCall] = useState<any>(null);
  const [callDetails, setCallDetails] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  const { data: callData, isLoading } = useRetellCalls(100);

  const handleCallClick = async (call: any) => {
    try {
      const details = await retellService.getCall(call.call_id);
      setCallDetails(details);
      setSelectedCall(call);
      setIsDetailModalOpen(true);
    } catch (error) {
      toast.error("Failed to fetch call details");
      console.error("Error fetching call details:", error);
    }
  };

  const formatDuration = (ms?: number) => {
    if (!ms) return "N/A";
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatTimestamp = (timestamp?: number) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp * 1000).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading call reports...</p>
        </div>
      </div>
    );
  }

  const calls = callData?.calls || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">Call Reports</h1>
            <p className="text-purple-100 text-lg">Detailed analysis of all call activities</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{calls.length}</div>
            <div className="text-purple-100">Total Calls</div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { 
            title: "Total Calls", 
            value: calls.length.toString(), 
            icon: Phone, 
            color: "blue" 
          },
          { 
            title: "Completed", 
            value: calls.filter(call => call.call_status === 'ended').length.toString(), 
            icon: TrendingUp, 
            color: "green" 
          },
          { 
            title: "Ongoing", 
            value: calls.filter(call => call.call_status === 'ongoing').length.toString(), 
            icon: Activity, 
            color: "orange" 
          },
          { 
            title: "Total Duration", 
            value: formatDuration(calls.reduce((sum, call) => sum + (call.call_duration_ms || 0), 0)), 
            icon: Clock, 
            color: "purple" 
          }
        ].map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600`}>
                  <stat.icon size={24} className="text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="text-purple-600" size={20} />
              Call History
            </CardTitle>
            <Button variant="outline">
              <Download size={16} className="mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {calls.map((call) => (
              <div 
                key={call.call_id} 
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleCallClick(call)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-gray-500" />
                      <span className="font-medium">{call.to_number || call.from_number || "Unknown"}</span>
                    </div>
                    <Badge 
                      variant={
                        call.call_status === 'ended' ? 'default' : 
                        call.call_status === 'ongoing' ? 'destructive' : 
                        'secondary'
                      }
                    >
                      {call.call_status}
                    </Badge>
                    <Badge variant="outline">{call.direction}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Duration: {formatDuration(call.call_duration_ms)}</span>
                    <span>{formatTimestamp(call.start_timestamp)}</span>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Call ID: {call.call_id}
                </div>
              </div>
            ))}

            {calls.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Calls Found</h3>
                <p className="text-gray-600">No call reports available at the moment.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Call Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Call Details</DialogTitle>
          </DialogHeader>
          {callDetails && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Call ID</label>
                  <p className="font-mono text-sm bg-gray-100 p-2 rounded">{callDetails.call_id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <Badge className="ml-2">{callDetails.call_status}</Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone Number</label>
                  <p>{callDetails.to_number || callDetails.from_number || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Direction</label>
                  <p className="capitalize">{callDetails.direction}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Duration</label>
                  <p>{formatDuration(callDetails.call_duration_ms || callDetails.duration_ms)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Start Time</label>
                  <p>{formatTimestamp(callDetails.start_timestamp)}</p>
                </div>
              </div>

              {/* Performance Metrics */}
              {callDetails.latency && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="text-sm font-medium text-gray-600">LLM Latency (P50)</label>
                      <p className="text-xl font-bold">{callDetails.latency.llm?.p50 || 'N/A'}ms</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="text-sm font-medium text-gray-600">E2E Latency (P50)</label>
                      <p className="text-xl font-bold">{callDetails.latency.e2e?.p50 || 'N/A'}ms</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="text-sm font-medium text-gray-600">TTS Latency (P50)</label>
                      <p className="text-xl font-bold">{callDetails.latency.tts?.p50 || 'N/A'}ms</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Call Analysis */}
              {callDetails.call_analysis && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Call Analysis</h3>
                  <div className="space-y-3">
                    {callDetails.call_analysis.call_summary && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Summary</label>
                        <p className="bg-gray-50 p-3 rounded-lg">{callDetails.call_analysis.call_summary}</p>
                      </div>
                    )}
                    {callDetails.call_analysis.user_sentiment && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">User Sentiment</label>
                        <Badge variant="outline" className="ml-2">{callDetails.call_analysis.user_sentiment}</Badge>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Call Successful</label>
                        <Badge variant={callDetails.call_analysis.call_successful ? "default" : "destructive"} className="ml-2">
                          {callDetails.call_analysis.call_successful ? "Yes" : "No"}
                        </Badge>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Task Completion</label>
                        <Badge variant="outline" className="ml-2">{callDetails.call_analysis.agent_task_completion_rating}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Call Cost */}
              {callDetails.call_cost && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Call Cost</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="text-sm font-medium text-gray-600">Total Cost</label>
                      <p className="text-xl font-bold">${(callDetails.call_cost.combined_cost / 100).toFixed(2)}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="text-sm font-medium text-gray-600">Duration</label>
                      <p className="text-xl font-bold">{callDetails.call_cost.total_duration_seconds}s</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="text-sm font-medium text-gray-600">Unit Price</label>
                      <p className="text-xl font-bold">${callDetails.call_cost.total_duration_unit_price}/s</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Transcript */}
              {callDetails.transcript && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Transcript</h3>
                  <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm">{callDetails.transcript}</pre>
                  </div>
                </div>
              )}

              {/* Recording and Actions */}
              <div className="flex gap-3">
                {callDetails.recording_url && (
                  <Button variant="outline" onClick={() => window.open(callDetails.recording_url, '_blank')}>
                    <Download size={16} className="mr-2" />
                    Download Recording
                  </Button>
                )}
                {callDetails.public_log_url && (
                  <Button variant="outline" onClick={() => window.open(callDetails.public_log_url, '_blank')}>
                    <FileText size={16} className="mr-2" />
                    View Logs
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
