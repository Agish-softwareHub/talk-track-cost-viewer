
export interface CallReport {
  id: string;
  number: string;
  date: string;
  time: string;
  duration: string;
  cost: string;
  status: string;
  agent: string;
  department: string;
  sentiment: string;
  resolution: string;
  callScore: number;
  recording: boolean;
  transcript: boolean;
  recordingUrl?: string | null;
  transcriptText?: string | null;
  tags: string[];
}
