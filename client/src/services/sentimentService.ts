
import { 
  sampleSentimentData, 
  sampleWeeklyTrend, 
  sampleSentimentInsights, 
  sampleRecentAnalysis 
} from '@/data/sampleSentiment';
import { API_CONFIG, isDevelopment } from '@/config/apiConfig';

export const getSentimentData = async () => {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, 400));
    return sampleSentimentData;
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SENTIMENT}`);
  if (!response.ok) {
    throw new Error('Failed to fetch sentiment data');
  }
  
  return response.json();
};

export const getWeeklyTrend = async () => {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return sampleWeeklyTrend;
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SENTIMENT_TRENDS}`);
  if (!response.ok) {
    throw new Error('Failed to fetch sentiment trends');
  }
  
  return response.json();
};

export const getSentimentInsights = async () => {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, 350));
    return sampleSentimentInsights;
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SENTIMENT_INSIGHTS}`);
  if (!response.ok) {
    throw new Error('Failed to fetch sentiment insights');
  }
  
  return response.json();
};

export const getRecentAnalysis = async () => {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return sampleRecentAnalysis;
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SENTIMENT_ANALYSIS}`);
  if (!response.ok) {
    throw new Error('Failed to fetch recent analysis');
  }
  
  return response.json();
};
