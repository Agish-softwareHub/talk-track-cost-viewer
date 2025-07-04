import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {RetellAgent, retellService} from '@/services/retellService';
import {toast} from 'sonner';

export function useRetellAgents() {
  return useQuery({
    queryKey: ['retell-agents'],
    queryFn: () => retellService.getAgents(),
    staleTime: 30000, // 30 seconds
  });
}

export function useRetellCalls(limit = 50, filterCriteria?: {
  agent_id?: string;
  call_type?: 'web_call' | 'phone_call';
  call_status?: 'registered' | 'ongoing' | 'ended' | 'error';
  direction?: 'inbound' | 'outbound';
}) {
  return useQuery({
    queryKey: ['retell-calls', limit, filterCriteria],
    queryFn: async () => {
      return await retellService.getCalls(limit, undefined, filterCriteria);
    },
    staleTime: 10000, // 10 seconds
  });
}

export function useRetellPhoneNumbers() {
  return useQuery({
    queryKey: ['retell-phone-numbers'],
    queryFn: () => retellService.getPhoneNumbers(),
    staleTime: 60000, // 1 minute
  });
}

export function useCreateCall() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: retellService.createCall.bind(retellService),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retell-calls'] });
      toast.success('Call created successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create call: ${error.message}`);
    },
  });
}

export function useUpdateAgentStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, agentData }: { id: string; agentData: Partial<RetellAgent> }) =>
      retellService.updateAgent(id, agentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retell-agents'] });
      toast.success('Agent updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update agent: ${error.message}`);
    },
  });
}

export function useBuyPhoneNumber() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ areaCode, agentId, nickname }: { areaCode: string; agentId?: string; nickname?: string }) =>
      retellService.buyPhoneNumber(areaCode, agentId, nickname),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retell-phone-numbers'] });
      toast.success('Phone number purchased successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to buy phone number: ${error.message}`);
    },
  });
}

export function useCreateAgent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (agentData: Partial<RetellAgent>) => retellService.createAgent(agentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retell-agents'] });
      toast.success('Agent created successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create agent: ${error.message}`);
    },
  });
}

export function useDeleteAgent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (agentId: string) => retellService.deleteAgent(agentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retell-agents'] });
      toast.success('Agent deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete agent: ${error.message}`);
    },
  });
}

export function useCallAnalytics(options?: {
  start_date?: string;
  end_date?: string;
  agent_id?: string;
  call_type?: 'web_call' | 'phone_call';
}) {
  return useQuery({
    queryKey: ['retell-analytics', options],
    queryFn: () => retellService.getCallAnalytics(options),
    staleTime: 300000, // 5 minutes
  });
}

export function useAgentAnalytics(agentId: string, startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ['retell-agent-analytics', agentId, startDate, endDate],
    queryFn: () => retellService.getAgentAnalytics(agentId, startDate, endDate),
    enabled: !!agentId,
    staleTime: 300000, // 5 minutes
  });
}
