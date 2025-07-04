
import { toast } from 'sonner';

export interface CallEvent {
  type: 'call_started' | 'call_ended' | 'call_transferred' | 'agent_status_changed';
  data: {
    call_id?: string;
    agent_id?: string;
    timestamp: string;
    details?: Record<string, any>;
  };
}

export class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private eventListeners: Map<string, Function[]> = new Map();

  connect() {
    try {
      // In a real implementation, this would connect to your WebSocket server
      // For now, we'll simulate real-time events
      this.simulateRealTimeEvents();
      console.log('WebSocket connected (simulated)');
    } catch (error) {
      console.error('WebSocket connection failed:', error);
      this.handleReconnect();
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  subscribe(eventType: string, callback: Function) {
    if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, []);
    }
    this.eventListeners.get(eventType)?.push(callback);
  }

  unsubscribe(eventType: string, callback: Function) {
    const listeners = this.eventListeners.get(eventType);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  private emit(eventType: string, data: any) {
    const listeners = this.eventListeners.get(eventType);
    if (listeners) {
      listeners.forEach(callback => callback(data));
    }
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      setTimeout(() => {
        this.reconnectAttempts++;
        this.connect();
      }, this.reconnectDelay * Math.pow(2, this.reconnectAttempts));
    } else {
      toast.error('Unable to connect to real-time updates');
    }
  }

  // Simulate real-time events for demonstration
  private simulateRealTimeEvents() {
    const events = [
      'call_started',
      'call_ended',
      'agent_status_changed',
      'call_transferred'
    ];

    setInterval(() => {
      const eventType = events[Math.floor(Math.random() * events.length)];
      const mockData = {
        call_id: `call_${Date.now()}`,
        agent_id: `agent_${Math.floor(Math.random() * 10)}`,
        timestamp: new Date().toISOString(),
        details: {
          duration: Math.floor(Math.random() * 600),
          status: Math.random() > 0.5 ? 'successful' : 'ended'
        }
      };

      this.emit(eventType, mockData);
    }, 15000); // Emit an event every 15 seconds
  }
}

export const websocketService = new WebSocketService();
