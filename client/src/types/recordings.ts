
export interface CallRecording {
  id: string;
  callId: string;
  customerNumber: string;
  agentName: string;
  department: string;
  date: string;
  time: string;
  duration: string;
  durationSeconds: number;
  fileSize: string;
  sentiment: string;
  score: number;
  tags: string[];
  transcript: string;
  starred: boolean;
  shared: boolean;
  notes: string;
}
