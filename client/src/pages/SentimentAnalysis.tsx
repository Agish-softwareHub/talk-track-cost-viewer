
import { Brain, TrendingUp, TrendingDown, Smile, Frown, Meh } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const sentimentData = [
  { name: 'Positive', value: 65, color: '#10B981' },
  { name: 'Neutral', value: 25, color: '#F59E0B' },
  { name: 'Negative', value: 10, color: '#EF4444' }
];

const weeklyTrend = [
  { day: 'Mon', positive: 68, neutral: 22, negative: 10 },
  { day: 'Tue', positive: 72, neutral: 20, negative: 8 },
  { day: 'Wed', positive: 65, neutral: 25, negative: 10 },
  { day: 'Thu', positive: 70, neutral: 23, negative: 7 },
  { day: 'Fri', positive: 75, neutral: 18, negative: 7 },
  { day: 'Sat', positive: 62, neutral: 28, negative: 10 },
  { day: 'Sun', positive: 58, neutral: 30, negative: 12 }
];

export default function SentimentAnalysis() {
  const sentimentInsights = [
    {
      type: "Positive Triggers",
      items: ["Quick resolution", "Friendly service", "Clear explanation", "Follow-up calls"],
      color: "green"
    },
    {
      type: "Negative Triggers", 
      items: ["Long wait times", "Unclear responses", "Multiple transfers", "Unresolved issues"],
      color: "red"
    },
    {
      type: "Improvement Areas",
      items: ["First call resolution", "Agent training", "Process optimization", "Customer education"],
      color: "blue"
    }
  ];

  const recentAnalysis = [
    { id: "CALL-001", sentiment: "Positive", score: 0.85, keywords: ["satisfied", "helpful", "quick"], agent: "Sarah J." },
    { id: "CALL-002", sentiment: "Neutral", score: 0.12, keywords: ["okay", "average", "expected"], agent: "Mike W." },
    { id: "CALL-003", sentiment: "Negative", score: -0.65, keywords: ["frustrated", "disappointed", "slow"], agent: "John S." },
    { id: "CALL-004", sentiment: "Positive", score: 0.78, keywords: ["excellent", "resolved", "professional"], agent: "Emily D." }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">Sentiment Analysis</h1>
            <p className="text-pink-100 text-lg">AI-powered emotional intelligence for your calls</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold">7.8/10</div>
              <div className="text-pink-100">Avg Sentiment</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">65%</div>
              <div className="text-pink-100">Positive Calls</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sentiment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Smile, title: "Positive", value: "65%", count: "1,247", color: "green", trend: "+5.2%" },
          { icon: Meh, title: "Neutral", value: "25%", count: "481", color: "yellow", trend: "-1.8%" },
          { icon: Frown, title: "Negative", value: "10%", count: "192", color: "red", trend: "-3.4%" }
        ].map((sentiment, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${sentiment.color}-100`}>
                <sentiment.icon size={24} className={`text-${sentiment.color}-600`} />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                sentiment.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {sentiment.trend.startsWith('+') ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {sentiment.trend}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{sentiment.value}</h3>
            <p className="text-gray-600 font-medium">{sentiment.title} Sentiment</p>
            <p className="text-sm text-gray-500 mt-1">{sentiment.count} calls</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sentiment Distribution */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Brain size={24} className="text-pink-600" />
            Sentiment Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {sentimentData.map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Weekly Sentiment Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line type="monotone" dataKey="positive" stroke="#10B981" strokeWidth={3} />
              <Line type="monotone" dataKey="neutral" stroke="#F59E0B" strokeWidth={2} />
              <Line type="monotone" dataKey="negative" stroke="#EF4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sentiment Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {sentimentInsights.map((insight, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className={`font-semibold text-${insight.color}-600 mb-4 flex items-center gap-2`}>
              <div className={`w-3 h-3 rounded-full bg-${insight.color}-500`}></div>
              {insight.type}
            </h3>
            <ul className="space-y-3">
              {insight.items.map((item, idx) => (
                <li key={idx} className={`flex items-center gap-2 text-sm text-gray-700 p-2 bg-${insight.color}-50 rounded-lg`}>
                  <div className={`w-1.5 h-1.5 rounded-full bg-${insight.color}-500`}></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Recent Analysis */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Recent Sentiment Analysis</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentAnalysis.map((analysis) => (
              <div key={analysis.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-medium text-gray-900">{analysis.id}</span>
                      <span className="text-gray-600">by {analysis.agent}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        analysis.sentiment === 'Positive' ? 'bg-green-100 text-green-700' :
                        analysis.sentiment === 'Neutral' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {analysis.sentiment}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywords.map((keyword, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      analysis.score > 0.5 ? 'text-green-600' :
                      analysis.score > -0.5 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {analysis.score > 0 ? '+' : ''}{analysis.score.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">Score</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
