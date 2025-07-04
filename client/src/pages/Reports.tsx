
import { useState } from "react";
import { Bot, FileText, Clock, Activity, Eye, Play, Download, Star, Heart, ThumbsUp, ThumbsDown, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CallReport } from "@/types/reports";

export default function Reports() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("today");
  const [selectedAgent, setSelectedAgent] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSentiment, setSelectedSentiment] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const callData: CallReport[] = [
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
      resolution: "Resolved",
      callScore: 9.2,
      recording: true,
      transcript: true,
      recordingUrl: "#",
      transcriptText: "Customer called about billing inquiry. Agent Sarah helped resolve the issue by explaining the charges and processing a partial refund. Customer was satisfied with the resolution.",
      tags: ["billing", "refund", "satisfied"]
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
      resolution: "Follow-up",
      callScore: 7.8,
      recording: true,
      transcript: true,
      recordingUrl: "#",
      transcriptText: "Sales call regarding product upgrade options. Customer showed moderate interest in premium package features but requested time to consider.",
      tags: ["sales", "upgrade", "consideration"]
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
      resolution: "Escalated",
      callScore: 4.1,
      recording: false,
      transcript: false,
      recordingUrl: null,
      transcriptText: null,
      tags: ["technical", "escalated", "connection-issue"]
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
      resolution: "Resolved",
      callScore: 8.9,
      recording: true,
      transcript: true,
      recordingUrl: "#",
      transcriptText: "Customer service inquiry about account settings. Agent guided customer through password reset and security settings update successfully.",
      tags: ["account", "password", "security"]
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
      resolution: "Converted",
      callScore: 9.5,
      recording: true,
      transcript: true,
      recordingUrl: "#",
      transcriptText: "Excellent sales call with successful conversion to premium plan. Customer was very satisfied with the presentation and pricing options.",
      tags: ["sales", "conversion", "premium"]
    }
  ];

  const [selectedCall, setSelectedCall] = useState<CallReport | null>(null);

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

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "completed", label: "Completed" },
    { value: "failed", label: "Failed" },
    { value: "in-progress", label: "In Progress" }
  ];

  const sentimentOptions = [
    { value: "all", label: "All Sentiment" },
    { value: "positive", label: "Positive" },
    { value: "neutral", label: "Neutral" },
    { value: "negative", label: "Negative" }
  ];

  const filteredCalls = callData.filter(call => {
    const matchesSearch = call.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         call.number.includes(searchTerm) ||
                         call.agent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAgent = selectedAgent === "all" || call.department.toLowerCase() === selectedAgent;
    const matchesStatus = selectedStatus === "all" || call.status === selectedStatus;
    const matchesSentiment = selectedSentiment === "all" || call.sentiment.toLowerCase() === selectedSentiment;
    
    return matchesSearch && matchesAgent && matchesStatus && matchesSentiment;
  });

  const getSentimentBadge = (sentiment: string) => {
    switch(sentiment) {
      case 'Positive': return <Badge className="bg-green-100 text-green-800 hover:bg-green-200"><ThumbsUp size={12} className="mr-1" />{sentiment}</Badge>;
      case 'Negative': return <Badge className="bg-red-100 text-red-800 hover:bg-red-200"><ThumbsDown size={12} className="mr-1" />{sentiment}</Badge>;
      default: return <Badge variant="secondary">{sentiment}</Badge>;
    }
  };

  const getScoreBadge = (score: number) => {
    const color = score >= 8 ? "bg-green-100 text-green-800" : score >= 6 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800";
    return <Badge className={color}><Star size={12} className="mr-1" />{score}/10</Badge>;
  };

  const showCallDetails = (call: CallReport) => {
    setSelectedCall(call);
  };

  if (selectedCall) {
    return (
      <div className="p-8">
        <div className="mb-6">
          <Button 
            onClick={() => setSelectedCall(null)}
            variant="outline"
            className="mb-4"
          >
            ← Back to All Calls
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Call Details - {selectedCall.id}</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Call Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
              
              <div className="pt-4 border-t space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">AI Agent</span>
                  <Badge variant="outline">{selectedCall.agent}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Department</span>
                  <Badge variant="outline">{selectedCall.department}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sentiment</span>
                  {getSentimentBadge(selectedCall.sentiment)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Call Score</span>
                  {getScoreBadge(selectedCall.callScore)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Resolution</span>
                  <Badge variant="outline">{selectedCall.resolution}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Call Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selectedCall.tags?.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recording Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Call Recording</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedCall.recording ? (
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                      <Play className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Call Recording</p>
                      <p className="text-sm text-gray-600">Duration: {selectedCall.duration}</p>
                    </div>
                  </div>
                  <Button variant="outline">
                    <Download size={16} className="mr-2" />
                    Download
                  </Button>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">0:00</span>
                    <span className="text-sm text-gray-600">{selectedCall.duration}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{width: '35%'}}></div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                      <Play size={16} className="mr-2" />
                      Play Recording
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-600">No recording available for this call</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Transcript Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Call Transcript</CardTitle>
              {selectedCall.transcript && (
                <Button variant="outline">
                  <Download size={16} className="mr-2" />
                  Export
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {selectedCall.transcript ? (
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="prose prose-sm max-w-none">
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedCall.transcriptText}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-600">No transcript available for this call</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Agent Call Reports</h1>
        <p className="text-gray-600">Comprehensive analysis of all AI agent call activities and performance</p>
      </div>

      {/* Enhanced Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter size={20} />
            Filter & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <Input
                placeholder="Search calls..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>{range.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">AI Agent</label>
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.value} value={agent.value}>{agent.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sentiment</label>
              <Select value={selectedSentiment} onValueChange={setSelectedSentiment}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sentimentOptions.map((sentiment) => (
                    <SelectItem key={sentiment.value} value={sentiment.value}>{sentiment.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {filteredCalls.length} of {callData.length} calls
            </p>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
              Export Filtered Results
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Calls</p>
                <p className="text-2xl font-bold text-gray-900">{filteredCalls.length}</p>
              </div>
              <Bot className="text-blue-500" size={24} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(filteredCalls.reduce((acc, call) => acc + call.callScore, 0) / filteredCalls.length).toFixed(1)}
                </p>
              </div>
              <Star className="text-yellow-500" size={24} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {((filteredCalls.filter(call => call.status === 'completed').length / filteredCalls.length) * 100).toFixed(1)}%
                </p>
              </div>
              <Activity className="text-green-500" size={24} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg Duration</p>
                <p className="text-2xl font-bold text-gray-900">5m 42s</p>
              </div>
              <Clock className="text-purple-500" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Call Table */}
      <Card>
        <CardHeader>
          <CardTitle>All AI Agent Calls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Call Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Agent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sentiment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCalls.map((call) => (
                  <tr key={call.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => showCallDetails(call)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{call.id}</div>
                        <div className="text-sm text-gray-500">{call.number}</div>
                        <div className="text-xs text-gray-400">{call.date} at {call.time}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{call.agent}</div>
                        <div className="text-xs text-gray-500">{call.department}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {call.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={call.status === 'completed' ? 'default' : 'destructive'}>
                        {call.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getSentimentBadge(call.sentiment)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getScoreBadge(call.callScore)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <Button 
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          showCallDetails(call);
                        }}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Eye size={14} className="mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
