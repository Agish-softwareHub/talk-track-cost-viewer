
import { useQuery } from '@tanstack/react-query';
import { integrationService } from '@/services/integrationService';
import { useRetellAgents, useRetellCalls, useRetellPhoneNumbers } from './useRetell';

export function useDashboardData() {
  return useQuery({
    queryKey: ['dashboard-data'],
    queryFn: () => integrationService.getDashboardData(),
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // 1 minute
  });
}

export function useLiveMonitoringData() {
  return useQuery({
    queryKey: ['live-monitoring'],
    queryFn: () => integrationService.getLiveData(),
    staleTime: 5000, // 5 seconds
    refetchInterval: 10000, // 10 seconds
  });
}

export function useAnalyticsData(timeRange: string = '7d') {
  return useQuery({
    queryKey: ['analytics-data', timeRange],
    queryFn: () => integrationService.getAnalyticsData(timeRange),
    staleTime: 300000, // 5 minutes
  });
}

export function useKnowledgeBaseSearch(query: string, category?: string) {
  return useQuery({
    queryKey: ['knowledge-base-search', query, category],
    queryFn: () => integrationService.searchKnowledgeBase(query, category),
    enabled: query.length > 2,
    staleTime: 60000, // 1 minute
  });
}

export function useAgentPerformance(agentId: string, timeRange: string = '7d') {
  return useQuery({
    queryKey: ['agent-performance', agentId, timeRange],
    queryFn: () => integrationService.getAgentPerformance(agentId, timeRange),
    enabled: !!agentId,
    staleTime: 300000, // 5 minutes
  });
}

export function useCallQualityMetrics() {
  return useQuery({
    queryKey: ['call-quality-metrics'],
    queryFn: () => integrationService.getCallQualityMetrics(),
    staleTime: 120000, // 2 minutes
    refetchInterval: 300000, // 5 minutes
  });
}

// Combined hook for comprehensive call center data
export function useCallCenterData() {
  const agents = useRetellAgents();
  const calls = useRetellCalls();
  const phoneNumbers = useRetellPhoneNumbers();
  const dashboard = useDashboardData();
  const liveData = useLiveMonitoringData();
  const qualityMetrics = useCallQualityMetrics();

  return {
    agents,
    calls,
    phoneNumbers,
    dashboard,
    liveData,
    qualityMetrics,
    isLoading: agents.isLoading || calls.isLoading || dashboard.isLoading,
    error: agents.error || calls.error || dashboard.error,
  };
}
