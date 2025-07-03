
import { useState } from "react";
import { Play, Download, FileText, Clock, Activity } from "lucide-react";

export default function CallDetails() {
  const [selectedCall, setSelectedCall] = useState("CALL-002");
  
  const callDetail = {
    id: "CALL-002",
    number: "+1 (555) 987-6543",
    date: "2024-01-15",
    time: "11:15 AM",
    duration: "7m 12s",
    cost: "$0.28",
    status: "completed",
    recording: true,
    transcript: true,
    recordingUrl: "#",
    transcriptText: `Agent: Thank you for calling TechSupport Solutions, this is Sarah. How can I help you today?

Customer: Hi Sarah, I'm having trouble with my internet connection. It keeps dropping every few minutes.

Agent: I'm sorry to hear you're experiencing connectivity issues. Let me help you troubleshoot this. Can you tell me what type of router you're using?

Customer: It's a Netgear Nighthawk, I think it's about 2 years old.

Agent: Great, thank you. First, let's try restarting your router. Can you unplug it for about 30 seconds and then plug it back in?

Customer: Okay, I'm doing that now... Alright, it's back on.

Agent: Perfect. Now let's check if the connection is stable. Can you try browsing to a website or running a speed test?

Customer: It seems to be working better now. The connection feels more stable.

Agent: Excellent! Sometimes routers just need a refresh. If you experience any more issues, don't hesitate to call us back. Is there anything else I can help you with today?

Customer: No, that's all. Thank you so much for your help, Sarah!

Agent: You're very welcome! Have a great day and thank you for choosing TechSupport Solutions.`
  };

  const recentCalls = [
    { id: "CALL-001", number: "+1 (555) 123-4567", time: "10:30 AM", status: "completed" },
    { id: "CALL-002", number: "+1 (555) 987-6543", time: "11:15 AM", status: "completed" },
    { id: "CALL-003", number: "+1 (555) 456-7890", time: "12:05 PM", status: "failed" },
    { id: "CALL-004", number: "+1 (555) 321-0987", time: "1:22 PM", status: "completed" },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Call Details</h1>
        <p className="text-gray-600">View detailed information, recordings, and transcripts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Call List Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Calls</h2>
            <div className="space-y-2">
              {recentCalls.map((call) => (
                <button
                  key={call.id}
                  onClick={() => setSelectedCall(call.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedCall === call.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="font-medium text-sm">{call.id}</div>
                  <div className={`text-xs ${selectedCall === call.id ? 'text-blue-100' : 'text-gray-500'}`}>
                    {call.number}
                  </div>
                  <div className={`text-xs ${selectedCall === call.id ? 'text-blue-100' : 'text-gray-500'}`}>
                    {call.time}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Call Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Call Information</h2>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                callDetail.status === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {callDetail.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <Activity className="text-blue-500 mr-3" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Call ID</p>
                  <p className="font-semibold text-gray-900">{callDetail.id}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <FileText className="text-green-500 mr-3" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Phone Number</p>
                  <p className="font-semibold text-gray-900">{callDetail.number}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="text-purple-500 mr-3" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold text-gray-900">{callDetail.duration}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Date & Time</p>
                  <p className="font-semibold text-gray-900">{callDetail.date} at {callDetail.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Cost</p>
                  <p className="font-semibold text-gray-900">{callDetail.cost}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recording Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Call Recording</h2>
            
            {callDetail.recording ? (
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                      <Play className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Call Recording</p>
                      <p className="text-sm text-gray-600">Duration: {callDetail.duration}</p>
                    </div>
                  </div>
                  <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                    <Download size={16} className="mr-2" />
                    Download
                  </button>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">0:00</span>
                    <span className="text-sm text-gray-600">{callDetail.duration}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{width: '35%'}}></div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-shadow duration-300 flex items-center">
                      <Play size={16} className="mr-2" />
                      Play Recording
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-600">No recording available for this call</p>
              </div>
            )}
          </div>

          {/* Transcript Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Call Transcript</h2>
              {callDetail.transcript && (
                <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                  <Download size={16} className="mr-2" />
                  Export
                </button>
              )}
            </div>
            
            {callDetail.transcript ? (
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
                    {callDetail.transcriptText}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-600">No transcript available for this call</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
