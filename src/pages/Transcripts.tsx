
import { useState } from "react";
import { Search, Download, FileText, Clock } from "lucide-react";

export default function Transcripts() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const transcripts = [
    {
      id: "CALL-001",
      number: "+1 (555) 123-4567",
      date: "2024-01-15",
      time: "10:30 AM",
      duration: "3m 45s",
      preview: "Customer called about billing inquiry. Agent Sarah helped resolve the issue by explaining the charges and processing a partial refund...",
      keywords: ["billing", "refund", "charges"]
    },
    {
      id: "CALL-002",
      number: "+1 (555) 987-6543",
      date: "2024-01-15",
      time: "11:15 AM",
      duration: "7m 12s",
      preview: "Technical support call regarding internet connectivity issues. Customer's router was causing intermittent disconnections...",
      keywords: ["technical support", "internet", "router", "connectivity"]
    },
    {
      id: "CALL-004",
      number: "+1 (555) 321-0987",
      date: "2024-01-15",
      time: "1:22 PM",
      duration: "5m 56s",
      preview: "Customer service inquiry about account settings. Agent guided customer through password reset and security settings...",
      keywords: ["account", "password", "security", "settings"]
    },
    {
      id: "CALL-005",
      number: "+1 (555) 111-2222",
      date: "2024-01-15",
      time: "2:45 PM",
      duration: "9m 18s",
      preview: "Sales call regarding product upgrade options. Customer showed interest in premium package features...",
      keywords: ["sales", "upgrade", "premium", "features"]
    }
  ];

  const filteredTranscripts = transcripts.filter(transcript =>
    transcript.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transcript.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase())) ||
    transcript.number.includes(searchTerm)
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Call Transcripts</h1>
        <p className="text-gray-600">Search and browse through all call transcriptions</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search transcripts by content, keywords, or phone number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            <select className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="all">All Categories</option>
              <option value="technical">Technical Support</option>
              <option value="billing">Billing</option>
              <option value="sales">Sales</option>
              <option value="general">General Inquiry</option>
            </select>
            
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-shadow duration-300">
              Export All
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Transcripts</p>
              <p className="text-2xl font-bold text-gray-900">{transcripts.length}</p>
            </div>
            <FileText className="text-blue-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Average Length</p>
              <p className="text-2xl font-bold text-gray-900">6m 32s</p>
            </div>
            <Clock className="text-green-500" size={24} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Search Results</p>
              <p className="text-2xl font-bold text-gray-900">{filteredTranscripts.length}</p>
            </div>
            <Search className="text-purple-500" size={24} />
          </div>
        </div>
      </div>

      {/* Transcripts List */}
      <div className="space-y-6">
        {filteredTranscripts.map((transcript) => (
          <div key={transcript.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{transcript.id}</h3>
                  <span className="text-gray-600">{transcript.number}</span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={16} className="mr-1" />
                    {transcript.duration}
                  </div>
                </div>
                <div className="text-sm text-gray-500 mb-3">
                  {transcript.date} at {transcript.time}
                </div>
              </div>
              
              <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                <Download size={16} className="mr-2" />
                Download
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-700 leading-relaxed">{transcript.preview}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {transcript.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                View Full Transcript →
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTranscripts.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <Search className="text-gray-400 mx-auto mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No transcripts found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
}
