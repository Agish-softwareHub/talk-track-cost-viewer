
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { FileText, Download, Calendar, Clock, Phone, User, TrendingUp, Activity, Play, Pause, Volume2, SkipBack, SkipForward, Star, Share2, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRetellCalls } from "@/hooks/useRetell";
import { retellService } from "@/services/retellService";
import { toast } from "sonner";

export default function Reports() {
  const [selectedCall, setSelectedCall] = useState<any>(null);
  const [callDetails, setCallDetails] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState([80]);
  const [playbackSpeed, setPlaybackSpeed] = useState("1");
  
  const { data: callData, isLoading } = useRetellCalls(100);

  const handleCallClick = async (call: any) => {
    try {
      const details = await retellService.getCall(call.call_id);
      setCallDetails(details);
      setSelectedCall(call);
      setIsDetailModalOpen(true);
      setIsPlaying(false);
      setCurrentTime(0);
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

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
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

  const calls:any = callData || [];
  const filteredCalls = calls.filter(call => {
    const matchesSearch = call.call_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (call.to_number && call.to_number.includes(searchTerm)) ||
                         (call.from_number && call.from_number.includes(searchTerm));
    const matchesFilter = filterStatus === "all" || call.call_status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">Call Reports</h1>
            <p className="text-purple-100 text-lg">Comprehensive analysis of all call activities</p>
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
            color: "blue",
            bgColor: "bg-blue-500"
          },
          { 
            title: "Completed", 
            value: calls.filter(call => call.call_status === 'ended').length.toString(), 
            icon: TrendingUp, 
            color: "green",
            bgColor: "bg-green-500"
          },
          { 
            title: "Ongoing", 
            value: calls.filter(call => call.call_status === 'ongoing').length.toString(), 
            icon: Activity, 
            color: "orange",
            bgColor: "bg-orange-500"
          },
          { 
            title: "Total Duration", 
            value: formatDuration(calls.reduce((sum, call) => sum + (call.call_duration_ms || 0), 0)), 
            icon: Clock, 
            color: "purple",
            bgColor: "bg-purple-500"
          }
        ].map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
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

      {/* Search and Filters */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search by call ID, phone number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Calls</SelectItem>
                <SelectItem value="ended">Completed</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="registered">Registered</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Call List */}
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="text-purple-600" size={20} />
              Call History ({filteredCalls.length})
            </CardTitle>
            <Button variant="outline" className="hover:bg-gray-50">
              <Download size={16} className="mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredCalls.map((call) => (
              <Card 
                key={call.call_id} 
                className="hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100 hover:border-purple-200"
                onClick={() => handleCallClick(call)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-gray-500" />
                        <span className="font-semibold text-gray-900">{call.to_number || call.from_number || "Unknown"}</span>
                      </div>
                      <Badge 
                        variant={
                          call.call_status === 'ended' ? 'default' : 
                          call.call_status === 'ongoing' ? 'destructive' : 
                          'secondary'
                        }
                        className="capitalize"
                      >
                        {call.call_status}
                      </Badge>
                      <Badge variant="outline" className="capitalize">{call.direction}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{formatDuration(call.call_duration_ms)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{formatTimestamp(call.start_timestamp)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 font-mono">
                      ID: {call.call_id}
                    </div>
                    <div className="flex items-center gap-2">
                      {call.recording_url && (
                        <Badge variant="secondary" className="text-xs">
                          <Play size={12} className="mr-1" />
                          Recording
                        </Badge>
                      )}
                      {call.transcript && (
                        <Badge variant="secondary" className="text-xs">
                          <FileText size={12} className="mr-1" />
                          Transcript
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredCalls.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Calls Found</h3>
                <p className="text-gray-600">No call reports match your current filters.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Call Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-2xl font-semibold">Call Details</DialogTitle>
          </DialogHeader>
          {callDetails && (
            <div className="space-y-8 py-4">
              {/* Basic Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-sm">
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-gray-600 mb-1">Call ID</div>
                    <div className="font-mono text-sm bg-gray-100 p-2 rounded">{callDetails.call_id}</div>
                  </CardContent>
                </Card>
                <Card className="shadow-sm">
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-gray-600 mb-1">Status</div>
                    <Badge className="capitalize">{callDetails.call_status}</Badge>
                  </CardContent>
                </Card>
                <Card className="shadow-sm">
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-gray-600 mb-1">Direction</div>
                    <div className="capitalize font-medium">{callDetails.direction}</div>
                  </CardContent>
                </Card>
                <Card className="shadow-sm">
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-gray-600 mb-1">Phone Number</div>
                    <div className="font-medium">{callDetails.to_number || callDetails.from_number || "N/A"}</div>
                  </CardContent>
                </Card>
                <Card className="shadow-sm">
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-gray-600 mb-1">Duration</div>
                    <div className="font-medium">{formatDuration(callDetails.call_duration_ms)}</div>
                  </CardContent>
                </Card>
                <Card className="shadow-sm">
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-gray-600 mb-1">Start Time</div>
                    <div className="font-medium">{formatTimestamp(callDetails.start_timestamp)}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Recording Player Section */}
              {callDetails.recording_url && (
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Play className="text-blue-600" size={20} />
                      Call Recording
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            {isPlaying ? <Pause className="text-white" size={20} /> : <Play className="text-white" size={20} />}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">Call Recording</div>
                            <div className="text-sm text-gray-600">Duration: {formatDuration(callDetails.call_duration_ms)}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Download size={16} className="mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 size={16} className="mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2 mb-4">
                        <Slider
                          value={[currentTime]}
                          max={Math.floor((callDetails.call_duration_ms || 0) / 1000)}
                          step={1}
                          onValueChange={handleSeek}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{formatTime(currentTime)}</span>
                          <span>{formatDuration(callDetails.call_duration_ms)}</span>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <Button variant="ghost" size="sm">
                          <SkipBack size={16} />
                        </Button>
                        <Button onClick={togglePlayPause} size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <SkipForward size={16} />
                        </Button>
                      </div>

                      {/* Volume and Speed Controls */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <Volume2 size={16} className="text-gray-600" />
                          <Slider
                            value={volume}
                            max={100}
                            step={1}
                            onValueChange={setVolume}
                            className="flex-1"
                          />
                          <span className="text-xs text-gray-500 w-12">{volume[0]}%</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">Speed:</span>
                          <Select value={playbackSpeed} onValueChange={setPlaybackSpeed}>
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0.5">0.5x</SelectItem>
                              <SelectItem value="0.75">0.75x</SelectItem>
                              <SelectItem value="1">1x</SelectItem>
                              <SelectItem value="1.25">1.25x</SelectItem>
                              <SelectItem value="1.5">1.5x</SelectItem>
                              <SelectItem value="2">2x</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Enhanced Transcript Section */}
              {callDetails.transcript && (
                <Card className="shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="text-green-600" size={20} />
                        Call Transcript
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download size={14} className="mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 size={14} className="mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto">
                      <div className="prose prose-sm max-w-none">
                        <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-sans">
                          {callDetails.transcript}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Performance Metrics */}
              {(callDetails.agent_response_latency_p50 || callDetails.llm_response_latency_p50 || callDetails.e2e_latency_p50) && (
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {callDetails.agent_response_latency_p50 && (
                        <div className="bg-blue-50 p-4 rounded-lg text-center">
                          <div className="text-sm font-medium text-gray-600 mb-1">Agent Response (P50)</div>
                          <div className="text-2xl font-bold text-blue-600">{callDetails.agent_response_latency_p50}ms</div>
                        </div>
                      )}
                      {callDetails.llm_response_latency_p50 && (
                        <div className="bg-green-50 p-4 rounded-lg text-center">
                          <div className="text-sm font-medium text-gray-600 mb-1">LLM Response (P50)</div>
                          <div className="text-2xl font-bold text-green-600">{callDetails.llm_response_latency_p50}ms</div>
                        </div>
                      )}
                      {callDetails.e2e_latency_p50 && (
                        <div className="bg-purple-50 p-4 rounded-lg text-center">
                          <div className="text-sm font-medium text-gray-600 mb-1">End-to-End (P50)</div>
                          <div className="text-2xl font-bold text-purple-600">{callDetails.e2e_latency_p50}ms</div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Call Analysis */}
              {callDetails.call_analysis && (
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Call Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {callDetails.call_analysis.call_summary && (
                      <div>
                        <div className="text-sm font-medium text-gray-600 mb-2">Summary</div>
                        <div className="bg-blue-50 p-4 rounded-lg text-gray-700">
                          {callDetails.call_analysis.call_summary}
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {callDetails.call_analysis.user_sentiment && (
                        <div>
                          <div className="text-sm font-medium text-gray-600 mb-1">User Sentiment</div>
                          <Badge variant="outline">{callDetails.call_analysis.user_sentiment}</Badge>
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-600 mb-1">Call Successful</div>
                        <Badge variant={callDetails.call_analysis.call_successful ? "default" : "destructive"}>
                          {callDetails.call_analysis.call_successful ? "Yes" : "No"}
                        </Badge>
                      </div>
                      {callDetails.call_analysis.agent_task_completion_rating && (
                        <div>
                          <div className="text-sm font-medium text-gray-600 mb-1">Task Completion</div>
                          <Badge variant="outline">{callDetails.call_analysis.agent_task_completion_rating}</Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
