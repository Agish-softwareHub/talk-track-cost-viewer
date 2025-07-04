
import { sampleCallReports, sampleCallAnalytics } from '@/data/sampleReports';
import { API_CONFIG, isDevelopment } from '@/config/apiConfig';

export const getCallReports = async () => {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return sampleCallReports;
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REPORTS}`);
  if (!response.ok) {
    throw new Error('Failed to fetch call reports');
  }
  
  return response.json();
};

export const getCallAnalytics = async () => {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, 400));
    return sampleCallAnalytics;
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REPORTS}/analytics`);
  if (!response.ok) {
    throw new Error('Failed to fetch call analytics');
  }
  
  return response.json();
};

export const exportReports = async (format: 'csv' | 'excel' | 'pdf') => {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Return a mock URL for development
    return `mock-export.${format}`;
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REPORTS}/export?format=${format}`);
  if (!response.ok) {
    throw new Error('Failed to export reports');
  }
  
  return response.blob();
};
