
import { sampleRecentCalls } from '@/data/sampleCalls';
import { API_CONFIG, isDevelopment } from '@/config/apiConfig';

export const getRecentCalls = async () => {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return sampleRecentCalls;
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.RECENT_CALLS}`);
  if (!response.ok) {
    throw new Error('Failed to fetch recent calls');
  }
  
  return response.json();
};

export const getAllCalls = async () => {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, 400));
    return sampleRecentCalls;
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CALLS}`);
  if (!response.ok) {
    throw new Error('Failed to fetch calls');
  }
  
  return response.json();
};
