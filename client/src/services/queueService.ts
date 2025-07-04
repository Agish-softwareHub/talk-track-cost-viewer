
import { sampleQueuedCalls, sampleQueueStats } from '@/data/sampleQueue';
import { API_CONFIG, isDevelopment } from '@/config/apiConfig';

export const getQueuedCalls = async () => {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return sampleQueuedCalls;
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.QUEUE}`);
  if (!response.ok) {
    throw new Error('Failed to fetch queued calls');
  }
  
  return response.json();
};

export const getQueueStats = async () => {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return sampleQueueStats;
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.QUEUE}/stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch queue stats');
  }
  
  return response.json();
};

export const prioritizeCall = async (callId: string, priority: 'low' | 'medium' | 'high' | 'urgent') => {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const call = sampleQueuedCalls.find(c => c.id === callId);
    if (call) {
      call.priority = priority;
    }
    return call;
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.QUEUE}/${callId}/priority`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ priority }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update call priority');
  }
  
  return response.json();
};
