
export interface CallReport {
  id: string;
  date: string;
  caller: string;
  duration: string;
  agent: string;
  status: 'completed' | 'failed' | 'transferred';
  category: string;
  satisfaction?: number;
  cost: string;
}

export const sampleCallReports: CallReport[] = [
  {
    id: "CALL-001",
    date: "2024-01-15 10:30",
    caller: "+1 (555) 123-4567",
    duration: "4m 23s",
    agent: "Customer Support Agent",
    status: "completed",
    category: "Billing Inquiry",
    satisfaction: 4.8,
    cost: "$0.15"
  },
  {
    id: "CALL-002",
    date: "2024-01-15 11:15",
    caller: "+1 (555) 987-6543",
    duration: "7m 45s",
    agent: "Technical Agent",
    status: "completed",
    category: "Technical Support",
    satisfaction: 4.2,
    cost: "$0.31"
  },
  {
    id: "CALL-003",
    date: "2024-01-15 12:05",
    caller: "+1 (555) 456-7890",
    duration: "2m 12s",
    agent: "Sales Agent",
    status: "failed",
    category: "Sales Inquiry",
    cost: "$0.09"
  },
  {
    id: "CALL-004",
    date: "2024-01-15 13:22",
    caller: "+1 (555) 321-0987",
    duration: "6m 18s",
    agent: "VIP Agent",
    status: "completed",
    category: "Premium Support",
    satisfaction: 5.0,
    cost: "$0.25"
  },
  {
    id: "CALL-005",
    date: "2024-01-15 14:10",
    caller: "+1 (555) 111-2222",
    duration: "9m 33s",
    agent: "Customer Support Agent",
    status: "transferred",
    category: "Complex Issue",
    satisfaction: 3.8,
    cost: "$0.38"
  }
];

export const sampleCallAnalytics = {
  totalCalls: 1247,
  completedCalls: 1156,
  failedCalls: 91,
  averageDuration: "5m 24s",
  totalCost: "$287.45",
  averageSatisfaction: 4.3,
  topCategories: [
    { category: "Billing Inquiry", count: 342 },
    { category: "Technical Support", count: 289 },
    { category: "Sales Inquiry", count: 267 },
    { category: "Premium Support", count: 189 },
    { category: "General Support", count: 160 }
  ]
};
