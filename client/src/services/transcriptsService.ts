
import { sampleTranscripts } from '@/data/sampleTranscripts';
import { API_CONFIG, isDevelopment } from '@/config/apiConfig';

export const getTranscripts = async () => {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, 600));
    return sampleTranscripts;
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TRANSCRIPTS}`);
  if (!response.ok) {
    throw new Error('Failed to fetch transcripts');
  }
  
  return response.json();
};

export const searchTranscripts = async (searchTerm: string) => {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return sampleTranscripts.filter(transcript =>
      transcript.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transcript.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase())) ||
      transcript.number.includes(searchTerm)
    );
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TRANSCRIPTS}?search=${encodeURIComponent(searchTerm)}`);
  if (!response.ok) {
    throw new Error('Failed to search transcripts');
  }
  
  return response.json();
};
