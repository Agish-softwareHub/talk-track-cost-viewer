
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { retellService, RetellAgent, RetellCall, RetellPhoneNumber } from '@/services/retellService';
import { toast } from 'sonner';

export function useRetellAgents() {
  return useQuery({
    queryKey: ['retell-agents'],
    queryFn: () => retellService.getAgents(),
    staleTime: 30000, // 30 seconds
  });
}

export function useRetellCalls(limit = 50) {
  return useQuery({
    queryKey: ['retell-calls', limit],
    queryFn: () => retellService.getCalls(limit),
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
    mutationFn: ({ id, status }: { id: string; status: 'active' | 'inactive' | 'training' }) =>
      retellService.updateAgent(id, { agent_id: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retell-agents'] });
      toast.success('Agent status updated');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update agent: ${error.message}`);
    },
  });
}

export function useBuyPhoneNumber() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ areaCode, agentId }: { areaCode: string; agentId?: string }) =>
      retellService.buyPhoneNumber(areaCode, agentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retell-phone-numbers'] });
      toast.success('Phone number purchased successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to buy phone number: ${error.message}`);
    },
  });
}
