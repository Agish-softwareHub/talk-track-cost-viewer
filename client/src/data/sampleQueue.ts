
export interface QueuedCall {
  id: string;
  number: string;
  waitTime: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  estimatedDuration: string;
  customerTier: string;
}

export const sampleQueuedCalls: QueuedCall[] = [
  {
    id: "QUEUE-001",
    number: "+1 (555) 111-2222",
    waitTime: "00:45",
    priority: "urgent",
    category: "Technical Issue",
    estimatedDuration: "8m",
    customerTier: "Enterprise"
  },
  {
    id: "QUEUE-002", 
    number: "+1 (555) 333-4444",
    waitTime: "01:20",
    priority: "high",
    category: "Billing Question",
    estimatedDuration: "5m",
    customerTier: "Premium"
  },
  {
    id: "QUEUE-003",
    number: "+1 (555) 555-6666",
    waitTime: "02:15",
    priority: "medium",
    category: "Sales Inquiry",
    estimatedDuration: "6m",
    customerTier: "Standard"
  },
  {
    id: "QUEUE-004",
    number: "+1 (555) 777-8888",
    waitTime: "00:30",
    priority: "high",
    category: "Account Access",
    estimatedDuration: "4m",
    customerTier: "Premium"
  }
];

export const sampleQueueStats = {
  totalInQueue: 12,
  averageWaitTime: "1m 35s",
  longestWait: "4m 12s",
  peakHours: "2:00 PM - 4:00 PM",
  agentsAvailable: 5,
  agentsBusy: 3
};
