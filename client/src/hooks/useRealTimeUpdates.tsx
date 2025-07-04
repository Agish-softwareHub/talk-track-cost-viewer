
import { useEffect, useState } from 'react';
import { websocketService, CallEvent } from '@/services/websocketService';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useRealTimeUpdates() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastEvent, setLastEvent] = useState<CallEvent | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    websocketService.connect();
    setIsConnected(true);

    const handleCallStarted = (data: any) => {
      setLastEvent({ type: 'call_started', data });
      queryClient.invalidateQueries({ queryKey: ['retell-calls'] });
      queryClient.invalidateQueries({ queryKey: ['live-monitoring'] });
      toast.success(`New call started: ${data.call_id}`);
    };

    const handleCallEnded = (data: any) => {
      setLastEvent({ type: 'call_ended', data });
      queryClient.invalidateQueries({ queryKey: ['retell-calls'] });
      queryClient.invalidateQueries({ queryKey: ['live-monitoring'] });
      toast.info(`Call ended: ${data.call_id}`);
    };

    const handleAgentStatusChanged = (data: any) => {
      setLastEvent({ type: 'agent_status_changed', data });
      queryClient.invalidateQueries({ queryKey: ['retell-agents'] });
      queryClient.invalidateQueries({ queryKey: ['live-monitoring'] });
    };

    const handleCallTransferred = (data: any) => {
      setLastEvent({ type: 'call_transferred', data });
      queryClient.invalidateQueries({ queryKey: ['retell-calls'] });
      toast.info(`Call transferred: ${data.call_id}`);
    };

    websocketService.subscribe('call_started', handleCallStarted);
    websocketService.subscribe('call_ended', handleCallEnded);
    websocketService.subscribe('agent_status_changed', handleAgentStatusChanged);
    websocketService.subscribe('call_transferred', handleCallTransferred);

    return () => {
      websocketService.unsubscribe('call_started', handleCallStarted);
      websocketService.unsubscribe('call_ended', handleCallEnded);
      websocketService.unsubscribe('agent_status_changed', handleAgentStatusChanged);
      websocketService.unsubscribe('call_transferred', handleCallTransferred);
      websocketService.disconnect();
      setIsConnected(false);
    };
  }, [queryClient]);

  return {
    isConnected,
    lastEvent,
  };
}
