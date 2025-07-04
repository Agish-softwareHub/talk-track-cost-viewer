
const RETELL_API_KEY = 'key_c268a85876e43b9fa1f42662b910';
const RETELL_BASE_URL = 'https://api.retellai.com';

export interface RetellAgent {
  agent_id: string;
  agent_name: string;
  voice_id: string;
  language: string;
  response_engine: {
    type: string;
    llm_id?: string;
  };
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
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Retell API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }

  // Agent Management - Updated endpoints according to API docs
  async getAgents(): Promise<RetellAgent[]> {
    const response = await this.makeRequest('/list-agents');
    return response || [];
  }

  async getAgent(agentId: string): Promise<RetellAgent> {
    return this.makeRequest(`/get-agent/${agentId}`);
  }

  async createAgent(agentData: Partial<RetellAgent>): Promise<RetellAgent> {
    // Transform the response_engine from string to object format expected by API
    const transformedData = {
      ...agentData,
      response_engine: typeof agentData.response_engine === 'string' 
        ? { type: agentData.response_engine }
        : agentData.response_engine
    };
    
    return this.makeRequest('/create-agent', {
      method: 'POST',
      body: JSON.stringify(transformedData),
    });
  }

  async updateAgent(agentId: string, agentData: Partial<RetellAgent>): Promise<RetellAgent> {
    const transformedData = {
      ...agentData,
      response_engine: typeof agentData.response_engine === 'string' 
        ? { type: agentData.response_engine }
        : agentData.response_engine
    };
    
    return this.makeRequest(`/update-agent/${agentId}`, {
      method: 'PATCH',
      body: JSON.stringify(transformedData),
    });
  }

  async deleteAgent(agentId: string): Promise<void> {
    await this.makeRequest(`/delete-agent/${agentId}`, {
      method: 'DELETE',
    });
  }

  // Call Management - Corrected endpoints
  async getCalls(limit: number = 100, pagination_key?: string): Promise<{ calls: RetellCall[]; has_more: boolean; next_pagination_key?: string }> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      ...(pagination_key && { pagination_key }),
    });
    
    return this.makeRequest(`/list-calls?${params}`);
  }

  async getCall(callId: string): Promise<RetellCall> {
    return this.makeRequest(`/get-call/${callId}`);
  }

  async createCall(callData: CreateCallRequest): Promise<CreateCallResponse> {
    return this.makeRequest('/create-call', {
      method: 'POST',
      body: JSON.stringify(callData),
    });
  }

  // Phone Number Management - Updated according to API docs
  async getPhoneNumbers(): Promise<RetellPhoneNumber[]> {
    const response = await this.makeRequest('/list-phone-numbers');
    return response || [];
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

  // Analytics - Updated endpoint
  async getCallAnalytics(startDate?: string, endDate?: string): Promise<any> {
    const params = new URLSearchParams({
      ...(startDate && { start_date: startDate }),
      ...(endDate && { end_date: endDate }),
    });
    
    return this.makeRequest(`/analytics/call?${params}`);
  }
}

export const retellService = new RetellService();
