
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  tier: string;
  location: string;
  lastContact: string;
  totalCalls: number;
  totalSpent: string;
  satisfaction: number;
  avatar: string;
  joinDate: string;
  notes: string;
  callHistory: CallHistoryItem[];
}

export interface CallHistoryItem {
  id: string;
  date: string;
  duration: string;
  type: string;
  outcome: string;
}
