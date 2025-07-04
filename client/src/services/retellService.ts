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
    llm_websocket_url?: string;
  };
  llm_websocket_url?: string;
  begin_message?: string;
  general_prompt?: string;
  general_tools?: any[];
  states?: any[];
  last_modification_timestamp: number;
  // Additional Retell API fields
  voice_temperature?: number;
  voice_speed?: number;
  volume?: number;
  responsiveness?: number;
  interruption_sensitivity?: number;
  enable_backchannel?: boolean;
  backchannel_frequency?: number;
  backchannel_words?: string[];
  reminder_trigger_ms?: number;
  reminder_max_count?: number;
  ambient_sound?: string;
  ambient_sound_volume?: number;
  language_detection?: boolean;
  opt_out_sensitive_data_storage?: boolean;
  pronunciation_dictionary?: Array<{
    word: string;
    phoneme: string;
    alphabet?: string;
  }>;
  normalize_for_speech?: boolean;
  end_call_after_silence_ms?: number;
  max_call_duration_ms?: number;
  inbound_dynamic_variables_webhook_url?: string;
  outbound_dynamic_variables_webhook_url?: string;
  end_call_function_enabled?: boolean;
  boosted_keywords?: string[];
  enable_transcription_formatting?: boolean;
  post_call_analysis_data?: any[];
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
  // Additional call fields
  call_analysis?: {
    call_summary?: string;
    user_sentiment?: string;
    call_successful?: boolean;
    custom_analysis_data?: any[];
  };
  disconnection_reason?: string;
  call_duration_ms?: number;
  agent_response_latency_p50?: number;
  agent_response_latency_p90?: number;
  agent_response_latency_p95?: number;
  agent_interruption_count?: number;
  user_interruption_count?: number;
  llm_response_latency_p50?: number;
  llm_response_latency_p90?: number;
  llm_response_latency_p95?: number;
  e2e_latency_p50?: number;
  e2e_latency_p90?: number;
  e2e_latency_p95?: number;
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
  // Additional phone number fields
  phone_number_type?: 'local' | 'toll_free';
  monthly_fee_cents?: number;
  setup_fee_cents?: number;
  per_minute_fee_cents?: number;
  country_code?: string;
  city?: string;
  state?: string;
}

export interface CreateCallRequest {
  from_number: string;
  to_number: string;
  agent_id: string;
  metadata?: Record<string, any>;
  // Additional create call parameters
  retell_llm_dynamic_variables?: Record<string, any>;
  drop_call_if_machine_detected?: boolean;
  machine_detection_timeout_ms?: number;
  max_duration_ms?: number;
  voice_id?: string;
  voice_temperature?: number;
  voice_speed?: number;
  volume?: number;
  responsiveness?: number;
  interruption_sensitivity?: number;
  enable_backchannel?: boolean;
  backchannel_frequency?: number;
  ambient_sound?: string;
  ambient_sound_volume?: number;
}

export interface CreateCallResponse {
  call_id: string;
  agent_id: string;
  call_status: string;
  call_type: string;
  access_token: string;
  // Additional response fields
  sample_rate?: number;
  audio_websocket_protocol?: string;
  audio_encoding?: string;
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
    console.log(`Making request to: ${url}`, options);
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    console.log(`Response status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Retell API error: ${response.status} ${response.statusText} - ${errorText}`);
      throw new Error(`Retell API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Response data:', data);
    return data;
  }

  // Agent Management - Fixed endpoints according to API docs
  async getAgents(): Promise<RetellAgent[]> {
    try {
      const response = await this.makeRequest('/list-agents');
      return Array.isArray(response) ? response : (response.agents || []);
    } catch (error) {
      console.error('Error fetching agents:', error);
      return [];
    }
  }

  async getAgent(agentId: string): Promise<RetellAgent> {
    return this.makeRequest(`/get-agent/${agentId}`);
  }

  async createAgent(agentData: Partial<RetellAgent>): Promise<RetellAgent> {
    // Clean and validate agent data
    const cleanedData = {
      agent_name: agentData.agent_name || 'New Agent',
      voice_id: agentData.voice_id || '11labs-Adrian',
      language: agentData.language || 'en-US',
      response_engine: {
        type: 'retell-llm',
        ...(typeof agentData.response_engine === 'object' ? agentData.response_engine : {})
      },
      // Optional fields with defaults
      begin_message: agentData.begin_message || 'Hello! How can I help you today?',
      general_prompt: agentData.general_prompt || 'You are a helpful AI assistant.',
      voice_temperature: agentData.voice_temperature ?? 1.0,
      voice_speed: agentData.voice_speed ?? 1.0,
      volume: agentData.volume ?? 1.0,
      responsiveness: agentData.responsiveness ?? 1.0,
      interruption_sensitivity: agentData.interruption_sensitivity ?? 1.0,
      enable_backchannel: agentData.enable_backchannel ?? false,
      normalize_for_speech: agentData.normalize_for_speech ?? true,
      // Include other provided fields
      ...(agentData.general_tools && { general_tools: agentData.general_tools }),
      ...(agentData.states && { states: agentData.states }),
      ...(agentData.llm_websocket_url && { llm_websocket_url: agentData.llm_websocket_url }),
      ...(agentData.backchannel_frequency && { backchannel_frequency: agentData.backchannel_frequency }),
      ...(agentData.backchannel_words && { backchannel_words: agentData.backchannel_words }),
      ...(agentData.reminder_trigger_ms && { reminder_trigger_ms: agentData.reminder_trigger_ms }),
      ...(agentData.reminder_max_count && { reminder_max_count: agentData.reminder_max_count }),
      ...(agentData.ambient_sound && { ambient_sound: agentData.ambient_sound }),
      ...(agentData.ambient_sound_volume && { ambient_sound_volume: agentData.ambient_sound_volume }),
      ...(agentData.language_detection !== undefined && { language_detection: agentData.language_detection }),
      ...(agentData.opt_out_sensitive_data_storage !== undefined && { opt_out_sensitive_data_storage: agentData.opt_out_sensitive_data_storage }),
      ...(agentData.pronunciation_dictionary && { pronunciation_dictionary: agentData.pronunciation_dictionary }),
      ...(agentData.end_call_after_silence_ms && { end_call_after_silence_ms: agentData.end_call_after_silence_ms }),
      ...(agentData.max_call_duration_ms && { max_call_duration_ms: agentData.max_call_duration_ms }),
      ...(agentData.inbound_dynamic_variables_webhook_url && { inbound_dynamic_variables_webhook_url: agentData.inbound_dynamic_variables_webhook_url }),
      ...(agentData.outbound_dynamic_variables_webhook_url && { outbound_dynamic_variables_webhook_url: agentData.outbound_dynamic_variables_webhook_url }),
      ...(agentData.end_call_function_enabled !== undefined && { end_call_function_enabled: agentData.end_call_function_enabled }),
      ...(agentData.boosted_keywords && { boosted_keywords: agentData.boosted_keywords }),
      ...(agentData.enable_transcription_formatting !== undefined && { enable_transcription_formatting: agentData.enable_transcription_formatting }),
      ...(agentData.post_call_analysis_data && { post_call_analysis_data: agentData.post_call_analysis_data })
    };
    
    console.log('Creating agent with data:', cleanedData);
    return this.makeRequest('/create-agent', {
      method: 'POST',
      body: JSON.stringify(cleanedData),
    });
  }

  async updateAgent(agentId: string, agentData: Partial<RetellAgent>): Promise<RetellAgent> {
    // Clean the update data, removing read-only fields
    const { agent_id, last_modification_timestamp, ...updateData } = agentData;
    
    const cleanedData = {
      ...updateData,
      ...(updateData.response_engine && typeof updateData.response_engine === 'string' 
        ? { response_engine: { type: updateData.response_engine } }
        : updateData.response_engine && { response_engine: updateData.response_engine })
    };
    
    console.log('Updating agent with data:', cleanedData);
    return this.makeRequest(`/update-agent/${agentId}`, {
      method: 'PATCH',
      body: JSON.stringify(cleanedData),
    });
  }

  async deleteAgent(agentId: string): Promise<void> {
    await this.makeRequest(`/delete-agent/${agentId}`, {
      method: 'DELETE',
    });
  }

  // Call Management - Enhanced with all parameters
  async getCalls(limit: number = 100, pagination_key?: string, filter_criteria?: {
    agent_id?: string;
    call_type?: 'web_call' | 'phone_call';
    call_status?: 'registered' | 'ongoing' | 'ended' | 'error';
    direction?: 'inbound' | 'outbound';
    start_timestamp_after?: number;
    start_timestamp_before?: number;
  }): Promise<{ calls: RetellCall[]; has_more: boolean; next_pagination_key?: string }> {
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        ...(pagination_key && { pagination_key }),
        ...(filter_criteria?.agent_id && { agent_id: filter_criteria.agent_id }),
        ...(filter_criteria?.call_type && { call_type: filter_criteria.call_type }),
        ...(filter_criteria?.call_status && { call_status: filter_criteria.call_status }),
        ...(filter_criteria?.direction && { direction: filter_criteria.direction }),
        ...(filter_criteria?.start_timestamp_after && { start_timestamp_after: filter_criteria.start_timestamp_after.toString() }),
        ...(filter_criteria?.start_timestamp_before && { start_timestamp_before: filter_criteria.start_timestamp_before.toString() }),
      });
      
      const response = await this.makeRequest(`/v2/list-calls?${params}`);
      return {
        calls: Array.isArray(response) ? response : (response.calls || []),
        has_more: response.has_more || false,
        next_pagination_key: response.next_pagination_key
      };
    } catch (error) {
      console.error('Error fetching calls:', error);
      return { calls: [], has_more: false };
    }
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

  // Phone Number Management - Enhanced with all parameters
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

  async buyPhoneNumber(areaCode: string, agentId?: string, nickname?: string): Promise<RetellPhoneNumber> {
    return this.makeRequest('/buy-phone-number', {
      method: 'POST',
      body: JSON.stringify({
        area_code: areaCode,
        ...(agentId && { agent_id: agentId }),
        ...(nickname && { nickname }),
      }),
    });
  }

  async deletePhoneNumber(phoneNumber: string): Promise<void> {
    await this.makeRequest(`/delete-phone-number/${phoneNumber}`, {
      method: 'DELETE',
    });
  }

  // Analytics - Enhanced with more parameters
  async getCallAnalytics(options?: {
    start_date?: string;
    end_date?: string;
    agent_id?: string;
    call_type?: 'web_call' | 'phone_call';
    granularity?: 'hour' | 'day' | 'week' | 'month';
  }): Promise<any> {
    const params = new URLSearchParams({
      ...(options?.start_date && { start_date: options.start_date }),
      ...(options?.end_date && { end_date: options.end_date }),
      ...(options?.agent_id && { agent_id: options.agent_id }),
      ...(options?.call_type && { call_type: options.call_type }),
      ...(options?.granularity && { granularity: options.granularity }),
    });
    
    return this.makeRequest(`/analytics/call?${params}`);
  }

  // Additional Analytics Methods
  async getAgentAnalytics(agentId: string, startDate?: string, endDate?: string): Promise<any> {
    const params = new URLSearchParams({
      ...(startDate && { start_date: startDate }),
      ...(endDate && { end_date: endDate }),
    });
    
    return this.makeRequest(`/analytics/agent/${agentId}?${params}`);
  }

  async getCallTranscript(callId: string): Promise<{ transcript: string; transcript_object: any[] }> {
    return this.makeRequest(`/get-call-transcript/${callId}`);
  }

  async getCallRecording(callId: string): Promise<{ recording_url: string }> {
    return this.makeRequest(`/get-call-recording/${callId}`);
  }
}

export const retellService = new RetellService();
