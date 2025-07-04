
export const API_CONFIG = {
  BASE_URL: import.meta.env.PROD ? 'https://your-production-api.com/api' : 'http://localhost:5000/api',
  ENDPOINTS: {
    METRICS: '/metrics',
    CALLS: '/calls',
    RECENT_CALLS: '/calls/recent',
    TRANSCRIPTS: '/transcripts',
    SENTIMENT: '/sentiment',
    SENTIMENT_ANALYSIS: '/sentiment/analysis',
    SENTIMENT_TRENDS: '/sentiment/trends',
    SENTIMENT_INSIGHTS: '/sentiment/insights'
  }
};

export const isDevelopment = import.meta.env.DEV;
