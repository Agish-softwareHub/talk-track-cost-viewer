
import { useState } from "react";
import { Search, Download, FileText, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTranscripts, searchTranscripts } from "@/services/transcriptsService";

export default function Transcripts() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: transcripts = [], isLoading } = useQuery({
    queryKey: ['transcripts', searchTerm],
    queryFn: () => searchTerm ? searchTranscripts(searchTerm) : getTranscripts(),
  });

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
              <p className="text-2xl font-bold text-gray-900">{transcripts.length}</p>
            </div>
            <Search className="text-purple-500" size={24} />
          </div>
        </div>
      </div>

      {/* Transcripts List */}
      {isLoading ? (
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="h-16 bg-gray-200 rounded mb-4"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {transcripts.map((transcript: any) => (
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
                  {transcript.keywords.map((keyword: string, index: number) => (
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
      )}

      {transcripts.length === 0 && !isLoading && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <Search className="text-gray-400 mx-auto mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No transcripts found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
}
