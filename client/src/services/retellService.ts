
const RETELL_API_KEY = 'key_c268a85876e43b9fa1f42662b910';
const RETELL_BASE_URL = 'https://api.retellai.com';

export interface RetellAgent {
  agent_id: string;
  agent_name: string;
  voice_id: string;
  language: string;
  response_engine: string;
  llm_websocket_url?: string;
  begin_message?: string;
  general_prompt?: string;
  general_tools?: any[];
  states?: any[];
  last_modification_timestamp: number;
}

export interface RetellCall {
  call_id: string;
  agent_id: string;
  call_type: 'web_call' | 'phone_call';
  call_status: 'registered' | 'ongoing' | 'ended' | 'error';
  from_number?: string;
  to_number?: string;
  direction: 'inbound' | 'outbound';
  start_timestamp?: number;
  end_timestamp?: number;
  transcript?: string;
  recording_url?: string;
  public_log_url?: string;
  metadata?: Record<string, any>;
}

export interface RetellPhoneNumber {
  phone_number: string;
  phone_number_pretty: string;
  agent_id?: string;
  inbound_agent_id?: string;
  outbound_agent_id?: string;
  area_code: string;
  nickname?: string;
  last_modification_timestamp: number;
}

export interface CreateCallRequest {
  from_number: string;
  to_number: string;
  agent_id: string;
  metadata?: Record<string, any>;
}

export interface CreateCallResponse {
  call_id: string;
  agent_id: string;
  call_status: string;
  call_type: string;
  access_token: string;
}

class RetellService {
  private apiKey: string;
  private baseURL: string;

  constructor() {
    this.apiKey = RETELL_API_KEY;
    this.baseURL = RETELL_BASE_URL;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Retell API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Agent Management
  async getAgents(): Promise<RetellAgent[]> {
    const response = await this.makeRequest('/list-agents');
    return response.agents || [];
  }

  async getAgent(agentId: string): Promise<RetellAgent> {
    return this.makeRequest(`/get-agent/${agentId}`);
  }

  async createAgent(agentData: Partial<RetellAgent>): Promise<RetellAgent> {
    return this.makeRequest('/create-agent', {
      method: 'POST',
      body: JSON.stringify(agentData),
    });
  }

  async updateAgent(agentId: string, agentData: Partial<RetellAgent>): Promise<RetellAgent> {
    return this.makeRequest(`/update-agent/${agentId}`, {
      method: 'PATCH',
      body: JSON.stringify(agentData),
    });
  }

  async deleteAgent(agentId: string): Promise<void> {
    await this.makeRequest(`/delete-agent/${agentId}`, {
      method: 'DELETE',
    });
  }

  // Call Management
  async getCalls(limit: number = 100, pagination_key?: string): Promise<{ calls: RetellCall[]; has_more: boolean; next_pagination_key?: string }> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      ...(pagination_key && { pagination_key }),
    });
    
    return this.makeRequest(`/v2/list-calls?${params}`);
  }

  async getCall(callId: string): Promise<RetellCall> {
    return this.makeRequest(`/v2/get-call/${callId}`);
  }

  async createCall(callData: CreateCallRequest): Promise<CreateCallResponse> {
    return this.makeRequest('/v2/create-call', {
      method: 'POST',
      body: JSON.stringify(callData),
    });
  }

  // Phone Number Management
  async getPhoneNumbers(): Promise<RetellPhoneNumber[]> {
    const response = await this.makeRequest('/list-phone-numbers');
    return response.phone_numbers || [];
  }

  async getPhoneNumber(phoneNumber: string): Promise<RetellPhoneNumber> {
    return this.makeRequest(`/get-phone-number/${phoneNumber}`);
  }

  async updatePhoneNumber(phoneNumber: string, data: Partial<RetellPhoneNumber>): Promise<RetellPhoneNumber> {
    return this.makeRequest(`/update-phone-number/${phoneNumber}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async buyPhoneNumber(areaCode: string, agentId?: string): Promise<RetellPhoneNumber> {
    return this.makeRequest('/buy-phone-number', {
      method: 'POST',
      body: JSON.stringify({
        area_code: areaCode,
        ...(agentId && { agent_id: agentId }),
      }),
    });
  }

  async deletePhoneNumber(phoneNumber: string): Promise<void> {
    await this.makeRequest(`/delete-phone-number/${phoneNumber}`, {
      method: 'DELETE',
    });
  }

  // Analytics
  async getCallAnalytics(startDate?: string, endDate?: string): Promise<any> {
    const params = new URLSearchParams({
      ...(startDate && { start_date: startDate }),
      ...(endDate && { end_date: endDate }),
    });
    
    return this.makeRequest(`/analytics/call?${params}`);
  }
}

export const retellService = new RetellService();
