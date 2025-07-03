import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Download, Share, Star, Volume2, VolumeX, Search, Filter, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

export default function CallRecordings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecording, setSelectedRecording] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState([80]);
  const [playbackSpeed, setPlaybackSpeed] = useState("1");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const recordings = [
    {
      id: "REC001",
      callId: "CALL-001",
      customerNumber: "+1 (555) 123-4567",
      agentName: "Sarah Johnson",
      department: "Support",
      date: "2024-01-15",
      time: "10:30 AM",
      duration: "3m 45s",
      durationSeconds: 225,
      fileSize: "2.8 MB",
      sentiment: "Positive",
      score: 9.2,
      tags: ["billing", "resolved", "satisfaction"],
      transcript: "Customer called about billing inquiry. Agent Sarah helped resolve the issue by explaining the charges and processing a partial refund. Customer was satisfied with the resolution.",
      starred: true,
      shared: false,
      notes: "Excellent handling of billing dispute. Used empathy and clear explanation."
    },
    {
      id: "REC002",
      callId: "CALL-002",
      customerNumber: "+1 (555) 987-6543",
      agentName: "Mike Wilson",
      department: "Sales",
      date: "2024-01-15",
      time: "11:15 AM",
      duration: "7m 12s",
      durationSeconds: 432,
      fileSize: "5.2 MB",
      sentiment: "Neutral",
      score: 7.8,
      tags: ["sales", "product-demo", "follow-up"],
      transcript: "Sales call regarding product upgrade options. Customer showed moderate interest in premium package features but requested time to consider.",
      starred: false,
      shared: true,
      notes: "Good product presentation. Customer needs follow-up in 3 days."
    },
    {
      id: "REC003",
      callId: "CALL-004",
      customerNumber: "+1 (555) 321-0987",
      agentName: "John Smith",
      department: "Technical",
      date: "2024-01-15",
      time: "1:22 PM",
      duration: "5m 56s",
      durationSeconds: 356,
      fileSize: "4.1 MB",
      sentiment: "Positive",
      score: 8.9,
      tags: ["technical", "troubleshooting", "resolved"],
      transcript: "Customer service inquiry about account settings. Agent guided customer through password reset and security settings update successfully.",
      starred: true,
      shared: false,
      notes: "Clear technical guidance provided. Customer very satisfied with help."
    },
    {
      id: "REC004",
      callId: "CALL-005",
      customerNumber: "+1 (555) 111-2222",
      agentName: "Lisa Brown",
      department: "Billing",
      date: "2024-01-15",
      time: "2:45 PM",
      duration: "9m 18s",
      durationSeconds: 558,
      fileSize: "6.8 MB",
      sentiment: "Negative",
      score: 6.5,
      tags: ["billing", "complaint", "escalated"],
      transcript: "Complex billing issue requiring multiple department involvement. Customer initially frustrated but situation was resolved through proper escalation.",
      starred: false,
      shared: false,
      notes: "Initially challenging but resolved well. Good escalation process followed."
    }
  ];

  const filteredRecordings = recordings.filter(recording => {
    const matchesSearch = recording.customerNumber.includes(searchTerm) ||
                         recording.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recording.transcript.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recording.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "starred" && recording.starred) ||
                         (selectedFilter === "shared" && recording.shared) ||
                         recording.department.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRecordingSelect = (recording) => {
    setSelectedRecording(recording);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value) => {
    if (selectedRecording) {
      setCurrentTime(value[0]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Call Recordings</h1>
            <p className="text-purple-100">Listen, analyze, and manage your call recordings</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{recordings.length}</div>
            <div className="text-purple-100">Total Recordings</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search by phone number, agent, or transcript content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter recordings" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Recordings</SelectItem>
                <SelectItem value="starred">Starred</SelectItem>
                <SelectItem value="shared">Shared</SelectItem>
                <SelectItem value="support">Support</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recordings List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Recordings ({filteredRecordings.length})
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Calendar size={16} className="mr-2" />
                Date Range
              </Button>
              <Button variant="outline" size="sm">
                <Filter size={16} className="mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredRecordings.map((recording) => (
              <Card 
                key={recording.id} 
                className={`hover:shadow-md transition-shadow cursor-pointer ${
                  selectedRecording?.id === recording.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => handleRecordingSelect(recording)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-medium text-gray-900">{recording.customerNumber}</span>
                        <Badge variant="outline">{recording.department}</Badge>
                        <Badge variant={recording.sentiment === "Positive" ? "default" : recording.sentiment === "Negative" ? "destructive" : "secondary"}>
                          {recording.sentiment}
                        </Badge>
                        {recording.starred && <Star className="text-yellow-500" size={16} />}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>Agent: {recording.agentName} • {recording.date} {recording.time}</div>
                        <div>Duration: {recording.duration} • Score: {recording.score}/10</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Toggle star
                        }}
                      >
                        <Star size={16} className={recording.starred ? "text-yellow-500 fill-yellow-500" : "text-gray-400"} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {recording.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2">{recording.transcript}</p>
                    {recording.notes && (
                      <p className="text-xs text-blue-700 bg-blue-50 p-2 rounded">
                        Note: {recording.notes}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Audio Player */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="text-purple-600" size={20} />
                Audio Player
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedRecording ? (
                <>
                  <div className="text-center space-y-2">
                    <h3 className="font-medium text-gray-900">{selectedRecording.customerNumber}</h3>
                    <p className="text-sm text-gray-600">{selectedRecording.agentName} • {selectedRecording.date}</p>
                    <Badge variant="outline">{selectedRecording.department}</Badge>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <Slider
                      value={[currentTime]}
                      max={selectedRecording.durationSeconds}
                      step={1}
                      onValueChange={handleSeek}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{formatTime(currentTime)}</span>
                      <span>{selectedRecording.duration}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-3">
                    <Button variant="ghost" size="sm">
                      <SkipBack size={16} />
                    </Button>
                    <Button onClick={togglePlayPause} size="sm">
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <SkipForward size={16} />
                    </Button>
                  </div>

                  {/* Volume and Speed */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Volume2 size={16} className="text-gray-600" />
                      <Slider
                        value={volume}
                        max={100}
                        step={1}
                        onValueChange={setVolume}
                        className="flex-1"
                      />
                      <span className="text-xs text-gray-500 w-8">{volume[0]}%</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">Speed:</span>
                      <Select value={playbackSpeed} onValueChange={setPlaybackSpeed}>
                        <SelectTrigger className="w-20">
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

                  {/* Recording Details */}
                  <div className="space-y-3 pt-4 border-t">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">Call ID:</span>
                        <div className="font-medium">{selectedRecording.callId}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">File Size:</span>
                        <div className="font-medium">{selectedRecording.fileSize}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Score:</span>
                        <div className="font-medium">{selectedRecording.score}/10</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Sentiment:</span>
                        <div className="font-medium">{selectedRecording.sentiment}</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download size={14} className="mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share size={14} className="mr-2" />
                      Share
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Volume2 size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>Select a recording to play</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recording Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Total Duration</div>
                  <div className="font-semibold">2h 45m</div>
                </div>
                <div>
                  <div className="text-gray-600">Avg Score</div>
                  <div className="font-semibold">8.1/10</div>
                </div>
                <div>
                  <div className="text-gray-600">Starred</div>
                  <div className="font-semibold">{recordings.filter(r => r.starred).length}</div>
                </div>
                <div>
                  <div className="text-gray-600">Shared</div>
                  <div className="font-semibold">{recordings.filter(r => r.shared).length}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}