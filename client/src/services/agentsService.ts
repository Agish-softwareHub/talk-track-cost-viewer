
import { sampleAIAgents } from '@/data/sampleAgents';
import { API_CONFIG, isDevelopment } from '@/config/apiConfig';

export const getAIAgents = async () => {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, 400));
    return sampleAIAgents;
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AI_AGENTS}`);
  if (!response.ok) {
    throw new Error('Failed to fetch AI agents');
  }
  
  return response.json();
};

export const getAgentById = async (id: string) => {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return sampleAIAgents.find(agent => agent.id === id);
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AI_AGENTS}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch agent');
  }
  
  return response.json();
};

export const updateAgentStatus = async (id: string, status: 'active' | 'inactive' | 'training') => {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const agent = sampleAIAgents.find(a => a.id === id);
    if (agent) {
      agent.status = status;
    }
    return agent;
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AI_AGENTS}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update agent status');
  }
  
  return response.json();
};
