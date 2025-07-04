
import { useState, useEffect } from "react";
import { MetricCard } from "@/components/MetricCard";
import { Activity, Clock, FileText, BarChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMetrics } from "@/services/metricsService";
import { getRecentCalls } from "@/services/callsService";

export default function Dashboard() {
  const navigate = useNavigate();
  
  const { data: metrics = [], isLoading: metricsLoading } = useQuery({
    queryKey: ['metrics'],
    queryFn: getMetrics,
  });

  const { data: recentCalls = [], isLoading: callsLoading } = useQuery({
    queryKey: ['recentCalls'],
    queryFn: getRecentCalls,
  });

  const iconMap = {
    Activity,
    Clock,
    FileText,
    BarChart
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Monitor your AI agent performance and call analytics</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metricsLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded"></div>
            </div>
          ))
        ) : (
          metrics.map((metric: any, index: number) => (
            <MetricCard 
              key={index} 
              {...metric} 
              icon={iconMap[metric.icon as keyof typeof iconMap]}
            />
          ))
        )}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Calls */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Calls</h2>
            <button 
              onClick={() => navigate('/reports')}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {callsLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="p-4 border border-gray-100 rounded-lg animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))
            ) : (
              recentCalls.map((call: any) => (
                <div key={call.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-medium text-gray-900">{call.number}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        call.status === 'completed' 
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {call.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {call.duration} • {call.cost} • {call.timestamp}
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      Agent: {call.agent}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* AI Agent Performance - Static for now */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">AI Agent Performance</h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Overall Success Rate</span>
                <span className="font-semibold text-gray-900">94.2%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{width: '94.2%'}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Peak Hours</span>
                <span className="font-semibold text-gray-900">2PM - 4PM</span>
              </div>
              <div className="text-sm text-gray-500">Highest call volume today</div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Average Response Time</span>
                <span className="font-semibold text-gray-900">0.8 seconds</span>
              </div>
              <div className="text-sm text-gray-500">AI agent response time</div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Active Agents</span>
                <span className="font-semibold text-gray-900">5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{width: '100%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
