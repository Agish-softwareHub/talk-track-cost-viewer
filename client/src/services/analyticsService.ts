
import { 
  sampleCallVolumeData, 
  samplePerformanceData, 
  sampleCostAnalysis, 
  sampleResponseTimes 
} from '@/data/sampleAnalytics';
import { API_CONFIG, isDevelopment } from '@/config/apiConfig';

export const getCallVolumeData = async () => {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, 400));
    return sampleCallVolumeData;
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ANALYTICS}/call-volume`);
  if (!response.ok) {
    throw new Error('Failed to fetch call volume data');
  }
  
  return response.json();
};

export const getPerformanceData = async () => {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, 350));
    return samplePerformanceData;
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ANALYTICS}/performance`);
  if (!response.ok) {
    throw new Error('Failed to fetch performance data');
  }
  
  return response.json();
};

export const getCostAnalysis = async () => {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return sampleCostAnalysis;
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ANALYTICS}/cost`);
  if (!response.ok) {
    throw new Error('Failed to fetch cost analysis');
  }
  
  return response.json();
};

export const getResponseTimes = async () => {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, 450));
    return sampleResponseTimes;
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ANALYTICS}/response-times`);
  if (!response.ok) {
    throw new Error('Failed to fetch response times');
  }
  
  return response.json();
};
