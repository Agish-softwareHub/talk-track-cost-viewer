
import { sampleMetrics } from '@/data/sampleMetrics';
import { API_CONFIG, isDevelopment } from '@/config/apiConfig';

export const getMetrics = async () => {
  if (isDevelopment) {
    // Simulate API delay in development
    await new Promise(resolve => setTimeout(resolve, 500));
    return sampleMetrics;
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.METRICS}`);
  if (!response.ok) {
    throw new Error('Failed to fetch metrics');
  }
  
  return response.json();
};
