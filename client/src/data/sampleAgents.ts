
export interface AIAgent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'training';
  language: string;
  specialty: string;
  totalCalls: number;
  successRate: number;
  avgDuration: string;
  lastActive: string;
  description: string;
  capabilities: string[];
  trainingData: string;
}

export const sampleAIAgents: AIAgent[] = [
  {
    id: "AGENT-001",
    name: "Customer Support Agent",
    type: "Support",
    status: "active",
    language: "English",
    specialty: "General Support",
    totalCalls: 1247,
    successRate: 94.2,
    avgDuration: "4m 32s",
    lastActive: "2 minutes ago",
    description: "Primary customer support agent handling general inquiries, billing questions, and account issues.",
    capabilities: ["Issue Resolution", "Account Management", "Billing Support", "Product Information"],
    trainingData: "10,000+ support conversations, knowledge base, FAQ documents"
  },
  {
    id: "AGENT-002",
    name: "Sales Agent",
    type: "Sales",
    status: "active",
    language: "English",
    specialty: "Lead Qualification",
    totalCalls: 892,
    successRate: 87.5,
    avgDuration: "6m 18s",
    lastActive: "5 minutes ago",
    description: "Specialized in qualifying leads, product demonstrations, and converting prospects to customers.",
    capabilities: ["Lead Qualification", "Product Demo", "Pricing Information", "Objection Handling"],
    trainingData: "5,000+ sales conversations, product catalog, pricing strategies"
  },
  {
    id: "AGENT-003",
    name: "Technical Agent",
    type: "Technical",
    status: "active",
    language: "English",
    specialty: "Technical Support",
    totalCalls: 634,
    successRate: 91.8,
    avgDuration: "8m 45s",
    lastActive: "12 minutes ago",
    description: "Handles complex technical issues, troubleshooting, and advanced product configuration.",
    capabilities: ["Technical Troubleshooting", "System Configuration", "API Support", "Integration Help"],
    trainingData: "Technical documentation, code examples, troubleshooting guides"
  },
  {
    id: "AGENT-004",
    name: "Multilingual Agent",
    type: "Support",
    status: "training",
    language: "Spanish/English",
    specialty: "Bilingual Support",
    totalCalls: 156,
    successRate: 89.1,
    avgDuration: "5m 22s",
    lastActive: "1 hour ago",
    description: "Provides support in both English and Spanish for our international customers.",
    capabilities: ["Bilingual Support", "Cultural Sensitivity", "International Billing", "Multi-timezone"],
    trainingData: "Bilingual training data, cultural context, regional preferences"
  },
  {
    id: "AGENT-005",
    name: "VIP Agent",
    type: "Premium",
    status: "active",
    language: "English",
    specialty: "Premium Support",
    totalCalls: 287,
    successRate: 96.8,
    avgDuration: "7m 12s",
    lastActive: "8 minutes ago",
    description: "Dedicated agent for premium and enterprise customers with specialized training.",
    capabilities: ["Premium Support", "Priority Handling", "Escalation Management", "Custom Solutions"],
    trainingData: "Premium customer data, advanced product features, enterprise solutions"
  }
];
