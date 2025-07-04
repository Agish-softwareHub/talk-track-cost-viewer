
import { Customer } from '@/types/customers';

export const sampleCustomers: Customer[] = [
  {
    id: "CUST-001",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp Solutions",
    status: "active",
    tier: "premium",
    location: "New York, NY",
    lastContact: "2024-01-15",
    totalCalls: 24,
    totalSpent: "$12,450",
    satisfaction: 4.8,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    joinDate: "2023-03-15",
    notes: "High-value customer, prefers email communication",
    tags: ["vip", "tech-savvy", "loyal"],
    callHistory: [
      { id: "CALL-001", date: "2024-01-15", duration: "12m 34s", type: "support", outcome: "resolved" },
      { id: "CALL-002", date: "2024-01-10", duration: "8m 12s", type: "sales", outcome: "interested" }
    ]
  },
  {
    id: "CUST-002",
    name: "Michael Chen",
    email: "m.chen@businesscorp.com",
    phone: "+1 (555) 987-6543",
    company: "Business Corp",
    status: "active",
    tier: "standard",
    location: "San Francisco, CA",
    lastContact: "2024-01-14",
    totalCalls: 18,
    totalSpent: "$8,200",
    satisfaction: 4.2,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    joinDate: "2023-06-20",
    notes: "Regular customer, likes detailed explanations",
    tags: ["regular", "detail-oriented"],
    callHistory: [
      { id: "CALL-003", date: "2024-01-14", duration: "15m 20s", type: "support", outcome: "resolved" }
    ]
  },
  {
    id: "CUST-003",
    name: "Emily Rodriguez",
    email: "emily.r@startup.io",
    phone: "+1 (555) 456-7890",
    company: "StartupIO",
    status: "prospect",
    tier: "basic",
    location: "Austin, TX",
    lastContact: "2024-01-12",
    totalCalls: 5,
    totalSpent: "$1,200",
    satisfaction: 3.9,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    joinDate: "2024-01-01",
    notes: "New prospect, interested in our premium features",
    tags: ["prospect", "startup", "price-sensitive"],
    callHistory: [
      { id: "CALL-004", date: "2024-01-12", duration: "6m 45s", type: "sales", outcome: "follow-up" }
    ]
  },
  {
    id: "CUST-004",
    name: "David Wilson",
    email: "david.wilson@enterprise.com",
    phone: "+1 (555) 321-0987",
    company: "Enterprise Solutions",
    status: "active",
    tier: "enterprise",
    location: "Chicago, IL",
    lastContact: "2024-01-13",
    totalCalls: 42,
    totalSpent: "$25,600",
    satisfaction: 4.9,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    joinDate: "2022-11-10",
    notes: "Enterprise customer, decision maker",
    tags: ["enterprise", "decision-maker", "high-value"],
    callHistory: [
      { id: "CALL-005", date: "2024-01-13", duration: "22m 15s", type: "support", outcome: "resolved" },
      { id: "CALL-006", date: "2024-01-11", duration: "18m 30s", type: "consultation", outcome: "completed" }
    ]
  }
];
