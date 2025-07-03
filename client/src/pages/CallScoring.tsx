
import { useState } from "react";
import { Target, TrendingUp, Star, Award, BarChart3, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function CallScoring() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const scoreCategories = [
    { name: "Communication", score: 85, target: 90, color: "blue" },
    { name: "Problem Resolution", score: 92, target: 88, color: "green" },
    { name: "Product Knowledge", score: 78, target: 85, color: "purple" },
    { name: "Customer Satisfaction", score: 88, target: 90, color: "orange" },
    { name: "Call Efficiency", score: 94, target: 90, color: "teal" },
    { name: "Follow-up Quality", score: 82, target: 85, color: "pink" }
  ];

  const recentScores = [
    { id: "CALL-001", agent: "Sarah J.", score: 92, category: "Sales", date: "Today", highlights: ["Excellent rapport", "Clear communication"] },
    { id: "CALL-002", agent: "Mike W.", score: 88, category: "Support", date: "Today", highlights: ["Quick resolution", "Good follow-up"] },
    { id: "CALL-003", agent: "Emily D.", score: 95, category: "Technical", date: "Yesterday", highlights: ["Expert knowledge", "Patient explanation"] },
    { id: "CALL-004", agent: "John S.", score: 76, category: "Sales", date: "Yesterday", highlights: ["Needs improvement", "Better preparation needed"] }
  ];

  const topPerformers = [
    { name: "Emily Davis", avg: 94.2, calls: 28, improvement: "+2.1%" },
    { name: "Sarah Johnson", avg: 91.8, calls: 35, improvement: "+1.8%" },
    { name: "Mike Wilson", avg: 89.5, calls: 42, improvement: "+0.9%" }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">Call Scoring & Quality</h1>
            <p className="text-orange-100 text-lg">Monitor and improve call quality with AI-powered scoring</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">87.3</div>
            <div className="text-orange-100">Overall Score</div>
          </div>
        </div>
      </div>

      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scoreCategories.map((category, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
              <div className={`p-2 rounded-lg bg-gradient-to-r from-${category.color}-500 to-${category.color}-600`}>
                <Target size={16} className="text-white" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">{category.score}</span>
                <span className="text-sm text-gray-500">Target: {category.target}</span>
              </div>
              
              <Progress value={category.score} className="h-2" />
              
              <div className="flex items-center justify-between text-sm">
                <span className={`flex items-center gap-1 ${
                  category.score >= category.target ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp size={14} />
                  {category.score >= category.target ? 'Above Target' : 'Below Target'}
                </span>
                <span className="text-gray-500">
                  {category.score >= category.target ? '+' : ''}{category.score - category.target}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Call Scores */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <BarChart3 size={24} className="text-blue-600" />
                Recent Call Scores
              </h2>
              <select 
                value={selectedPeriod} 
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {recentScores.map((call) => (
                <div key={call.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-medium text-gray-900">{call.id}</span>
                        <span className="text-gray-600">by {call.agent}</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {call.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{call.date}</p>
                    </div>
                    <div className={`text-2xl font-bold ${
                      call.score >= 90 ? 'text-green-600' : 
                      call.score >= 80 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {call.score}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {call.highlights.map((highlight, index) => (
                      <span 
                        key={index} 
                        className={`px-2 py-1 rounded-full text-xs ${
                          highlight.includes('Excellent') || highlight.includes('Good') || highlight.includes('Expert') || highlight.includes('Patient')
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Award size={24} className="text-yellow-600" />
              Top Performers
            </h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{performer.name}</p>
                    <p className="text-sm text-gray-500">{performer.calls} calls</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{performer.avg}</p>
                    <p className="text-xs text-green-600">{performer.improvement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scoring Criteria */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Scoring Criteria</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Excellent (90-100)", color: "green", criteria: ["Clear communication", "Problem resolved", "Customer satisfied", "Follow-up completed"] },
              { title: "Good (80-89)", color: "blue", criteria: ["Good communication", "Issue addressed", "Minor improvements needed", "Adequate follow-up"] },
              { title: "Needs Improvement (Below 80)", color: "red", criteria: ["Communication unclear", "Issue unresolved", "Customer dissatisfied", "Poor follow-up"] }
            ].map((level, index) => (
              <div key={index} className="space-y-3">
                <h3 className={`font-semibold text-${level.color}-600`}>{level.title}</h3>
                <ul className="space-y-2">
                  {level.criteria.map((criterion, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className={`w-2 h-2 rounded-full bg-${level.color}-500`}></div>
                      {criterion}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
