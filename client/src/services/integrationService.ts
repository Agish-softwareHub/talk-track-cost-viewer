
import { retellService } from './retellService';
import { getCallReports } from './reportsService';
import { getRecentCalls } from './callsService';
import { getAIAgents } from './agentsService';
import { getSentimentData } from './sentimentService';
import { getCallVolumeData } from './analyticsService';

export class IntegrationService {
  // Unified dashboard data aggregation
  async getDashboardData() {
    try {
      const [agents, calls, reports, sentiment, analytics] = await Promise.all([
        retellService.getAgents(),
        getRecentCalls(),
        getCallReports(),
        getSentimentData(),
        getCallVolumeData()
      ]);

      return {
        agents,
        calls,
        reports,
        sentiment,
        analytics,
        summary: {
          totalAgents: agents.length,
          activeCalls: calls.filter(call => call.status === 'active').length,
          totalCalls: calls.length,
          avgSentiment: sentiment.overall || 0
        }
      };
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      throw error;
    }
  }

  // Real-time call monitoring integration
  async getLiveData() {
    try {
      const [calls, agents, phoneNumbers] = await Promise.all([
        retellService.getCalls(50, undefined, { call_status: 'ongoing' }),
        retellService.getAgents(),
        retellService.getPhoneNumbers()
      ]);

      return {
        activeCalls: calls.calls,
        availableAgents: agents.filter(agent => agent.agent_id),
        phoneNumbers,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to fetch live data:', error);
      throw error;
    }
  }

  // Comprehensive analytics aggregation
  async getAnalyticsData(timeRange: string = '7d') {
    try {
      const endDate = new Date();
      const startDate = new Date();
      
      switch (timeRange) {
        case '24h':
          startDate.setDate(endDate.getDate() - 1);
          break;
        case '7d':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(endDate.getDate() - 30);
          break;
        default:
          startDate.setDate(endDate.getDate() - 7);
      }

      const analytics = await retellService.getCallAnalytics({
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        granularity: timeRange === '24h' ? 'hour' : 'day'
      });

      return analytics;
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
      throw error;
    }
  }

  // Knowledge base search and management
  async searchKnowledgeBase(query: string, category?: string) {
    // This would integrate with your knowledge base
    // For now, returning a mock structure that matches your KnowledgeBase component
    const mockResults = [
      {
        id: 1,
        title: `How to handle ${query}`,
        category: category || "General",
        content: `Comprehensive guide for handling ${query}...`,
        tags: [query.toLowerCase(), "guide"],
        author: "AI Assistant",
        lastUpdated: new Date().toISOString().split('T')[0],
        views: Math.floor(Math.random() * 1000),
        rating: 4.5 + Math.random() * 0.5,
        helpful: Math.floor(Math.random() * 50),
        notHelpful: Math.floor(Math.random() * 5),
        featured: Math.random() > 0.7
      }
    ];

    return mockResults;
  }

  // Unified call management
  async initiateCall(callData: {
    to_number: string;
    agent_id: string;
    from_number?: string;
    metadata?: Record<string, any>;
  }) {
    try {
      const fromNumber = callData.from_number || await this.getAvailablePhoneNumber();
      
      const call = await retellService.createCall({
        from_number: fromNumber,
        to_number: callData.to_number,
        agent_id: callData.agent_id,
        metadata: callData.metadata
      });

      return call;
    } catch (error) {
      console.error('Failed to initiate call:', error);
      throw error;
    }
  }

  // Get available phone number for outbound calls
  private async getAvailablePhoneNumber(): Promise<string> {
    const phoneNumbers = await retellService.getPhoneNumbers();
    const availableNumber = phoneNumbers.find(num => num.phone_number);
    
    if (!availableNumber) {
      throw new Error('No available phone numbers for outbound calls');
    }
    
    return availableNumber.phone_number;
  }

  // Agent performance analytics
  async getAgentPerformance(agentId: string, timeRange: string = '7d') {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - (timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : 30));

      const analytics = await retellService.getAgentAnalytics(
        agentId,
        startDate.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0]
      );

      return analytics;
    } catch (error) {
      console.error('Failed to fetch agent performance:', error);
      throw error;
    }
  }

  // Call quality monitoring
  async getCallQualityMetrics() {
    try {
      const calls = await retellService.getCalls(100);
      
      const qualityMetrics = {
        avgResponseTime: 0,
        avgCallDuration: 0,
        successRate: 0,
        customerSatisfaction: 0
      };

      if (calls.calls.length > 0) {
        const completedCalls = calls.calls.filter(call => call.call_status === 'ended');
        
        qualityMetrics.avgResponseTime = completedCalls.reduce((sum, call) => 
          sum + (call.agent_response_latency_p50 || 0), 0) / completedCalls.length;
        
        qualityMetrics.avgCallDuration = completedCalls.reduce((sum, call) => 
          sum + (call.call_duration_ms || 0), 0) / completedCalls.length;
        
        qualityMetrics.successRate = (completedCalls.length / calls.calls.length) * 100;
        qualityMetrics.customerSatisfaction = 85 + Math.random() * 15; // Mock data
      }

      return qualityMetrics;
    } catch (error) {
      console.error('Failed to fetch call quality metrics:', error);
      throw error;
    }
  }
}

export const integrationService = new IntegrationService();
