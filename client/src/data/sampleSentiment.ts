
export const sampleSentimentData = [
  { name: 'Positive', value: 65, color: '#10B981' },
  { name: 'Neutral', value: 25, color: '#F59E0B' },
  { name: 'Negative', value: 10, color: '#EF4444' }
];

export const sampleWeeklyTrend = [
  { day: 'Mon', positive: 68, neutral: 22, negative: 10 },
  { day: 'Tue', positive: 72, neutral: 20, negative: 8 },
  { day: 'Wed', positive: 65, neutral: 25, negative: 10 },
  { day: 'Thu', positive: 70, neutral: 23, negative: 7 },
  { day: 'Fri', positive: 75, neutral: 18, negative: 7 },
  { day: 'Sat', positive: 62, neutral: 28, negative: 10 },
  { day: 'Sun', positive: 58, neutral: 30, negative: 12 }
];

export const sampleSentimentInsights = [
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

export const sampleRecentAnalysis = [
  { id: "CALL-001", sentiment: "Positive", score: 0.85, keywords: ["satisfied", "helpful", "quick"], agent: "Sarah J." },
  { id: "CALL-002", sentiment: "Neutral", score: 0.12, keywords: ["okay", "average", "expected"], agent: "Mike W." },
  { id: "CALL-003", sentiment: "Negative", score: -0.65, keywords: ["frustrated", "disappointed", "slow"], agent: "John S." },
  { id: "CALL-004", sentiment: "Positive", score: 0.78, keywords: ["excellent", "resolved", "professional"], agent: "Emily D." }
];
