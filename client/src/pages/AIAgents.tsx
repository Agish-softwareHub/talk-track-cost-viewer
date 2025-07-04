
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bot, Plus, Settings, Play, Pause, Trash2, Edit, BarChart3, Check, X } from "lucide-react";
import { useRetellAgents, useUpdateAgentStatus } from "@/hooks/useRetell";
import { retellService } from "@/services/retellService";
import { toast } from "sonner";

export default function AIAgents() {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const { data: agents, isLoading, refetch } = useRetellAgents();
  const updateAgentStatus = useUpdateAgentStatus();

  const [newAgent, setNewAgent] = useState({
    agent_name: "",
    voice_id: "11labs-Adrian",
    language: "en-US",
    response_engine: { type: "retell-llm" },
    general_prompt: "",
    begin_message: "",
    general_tools: [],
    states: []
  });

  const handleCreateAgent = async () => {
    try {
      await retellService.createAgent(newAgent);
      toast.success("Agent created successfully");
      setIsCreateModalOpen(false);
      setNewAgent({
        agent_name: "",
        voice_id: "11labs-Adrian",
        language: "en-US", 
        response_engine: { type: "retell-llm" },
        general_prompt: "",
        begin_message: "",
        general_tools: [],
        states: []
      });
      refetch();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Failed to create agent: ${errorMessage}`);
    }
  };

  const handleDeleteAgent = async (agentId: string) => {
    if (confirm("Are you sure you want to delete this agent?")) {
      try {
        await retellService.deleteAgent(agentId);
        toast.success("Agent deleted successfully");
        refetch();
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        toast.error(`Failed to delete agent: ${errorMessage}`);
      }
    }
  };

  const getVoiceDisplayName = (voiceId: string) => {
    const voiceMap: Record<string, string> = {
      "11labs-Adrian": "Adrian (Male, Warm)",
      "11labs-Bella": "Bella (Female, Professional)", 
      "11labs-Charlie": "Charlie (Male, Friendly)",
      "11labs-Emily": "Emily (Female, Clear)",
      "openai-alloy": "Alloy (Neutral)",
      "openai-echo": "Echo (Male)",
      "openai-fable": "Fable (British Male)",
      "openai-onyx": "Onyx (Male, Deep)",
      "openai-nova": "Nova (Female, Youthful)",
      "openai-shimmer": "Shimmer (Female, Soft)"
    };
    return voiceMap[voiceId] || voiceId;
  };

  const getEngineDisplayName = (engine: any) => {
    if (typeof engine === 'object' && engine.type) {
      const typeMap: Record<string, string> = {
        "retell-llm": "Retell LLM",
        "openai": "OpenAI GPT",
        "anthropic": "Claude",
        "azure-openai": "Azure OpenAI",
        "together-ai": "Together AI",
        "groq": "Groq",
        "anyscale": "Anyscale"
      };
      return typeMap[engine.type] || engine.type;
    }
    return typeof engine === 'string' ? engine : 'Unknown';
  };

  const isAgentActive = (agent: any) => {
    // Consider agent active if it has required fields and is properly configured
    return !!(agent.agent_name && agent.voice_id && agent.response_engine);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading AI agents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">AI Agents Management</h1>
            <p className="text-blue-100 text-lg">Configure and manage your AI agents with full Retell API integration</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{agents?.length || 0}</div>
            <div className="text-blue-100">Total Agents</div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold text-gray-900">Your AI Agents</h2>
          <Badge variant="secondary">{agents?.length || 0} total</Badge>
          <Badge variant="outline" className="text-green-600 border-green-600">
            {agents?.filter(agent => isAgentActive(agent)).length || 0} active
          </Badge>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create New Agent
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New AI Agent</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="agent_name">Agent Name *</Label>
                  <Input
                    id="agent_name"
                    value={newAgent.agent_name}
                    onChange={(e) => setNewAgent({...newAgent, agent_name: e.target.value})}
                    placeholder="Customer Support Agent"
                  />
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select value={newAgent.language} onValueChange={(value) => setNewAgent({...newAgent, language: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="en-GB">English (UK)</SelectItem>
                      <SelectItem value="en-AU">English (AU)</SelectItem>
                      <SelectItem value="en-IN">English (IN)</SelectItem>
                      <SelectItem value="es-ES">Spanish (Spain)</SelectItem>
                      <SelectItem value="es-MX">Spanish (Mexico)</SelectItem>
                      <SelectItem value="fr-FR">French (France)</SelectItem>
                      <SelectItem value="fr-CA">French (Canada)</SelectItem>
                      <SelectItem value="de-DE">German</SelectItem>
                      <SelectItem value="it-IT">Italian</SelectItem>
                      <SelectItem value="pt-BR">Portuguese (Brazil)</SelectItem>
                      <SelectItem value="pt-PT">Portuguese (Portugal)</SelectItem>
                      <SelectItem value="pl-PL">Polish</SelectItem>
                      <SelectItem value="tr-TR">Turkish</SelectItem>
                      <SelectItem value="ru-RU">Russian</SelectItem>
                      <SelectItem value="nl-NL">Dutch</SelectItem>
                      <SelectItem value="cs-CZ">Czech</SelectItem>
                      <SelectItem value="sk-SK">Slovak</SelectItem>
                      <SelectItem value="da-DK">Danish</SelectItem>
                      <SelectItem value="sv-SE">Swedish</SelectItem>
                      <SelectItem value="no-NO">Norwegian</SelectItem>
                      <SelectItem value="ja-JP">Japanese</SelectItem>
                      <SelectItem value="zh-CN">Chinese (Simplified)</SelectItem>
                      <SelectItem value="zh-TW">Chinese (Traditional)</SelectItem>
                      <SelectItem value="ko-KR">Korean</SelectItem>
                      <SelectItem value="hi-IN">Hindi</SelectItem>
                      <SelectItem value="ar-SA">Arabic</SelectItem>
                      <SelectItem value="th-TH">Thai</SelectItem>
                      <SelectItem value="vi-VN">Vietnamese</SelectItem>
                      <SelectItem value="uk-UA">Ukrainian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="voice_id">Voice</Label>
                  <Select 
                    value={newAgent.voice_id} 
                    onValueChange={(value) => setNewAgent({...newAgent, voice_id: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="11labs-Adrian">Adrian (Male, Warm)</SelectItem>
                      <SelectItem value="11labs-Bella">Bella (Female, Professional)</SelectItem>
                      <SelectItem value="11labs-Charlie">Charlie (Male, Friendly)</SelectItem>
                      <SelectItem value="11labs-Emily">Emily (Female, Clear)</SelectItem>
                      <SelectItem value="openai-alloy">Alloy (Neutral)</SelectItem>
                      <SelectItem value="openai-echo">Echo (Male)</SelectItem>
                      <SelectItem value="openai-fable">Fable (British Male)</SelectItem>
                      <SelectItem value="openai-onyx">Onyx (Male, Deep)</SelectItem>
                      <SelectItem value="openai-nova">Nova (Female, Youthful)</SelectItem>
                      <SelectItem value="openai-shimmer">Shimmer (Female, Soft)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="response_engine">Response Engine</Label>
                  <Select 
                    value={newAgent.response_engine.type} 
                    onValueChange={(value) => setNewAgent({...newAgent, response_engine: { type: value }})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retell-llm">Retell LLM</SelectItem>
                      <SelectItem value="openai">OpenAI GPT</SelectItem>
                      <SelectItem value="anthropic">Claude (Anthropic)</SelectItem>
                      <SelectItem value="azure-openai">Azure OpenAI</SelectItem>
                      <SelectItem value="together-ai">Together AI</SelectItem>
                      <SelectItem value="groq">Groq</SelectItem>
                      <SelectItem value="anyscale">Anyscale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="begin_message">Welcome Message</Label>
                <Input
                  id="begin_message"
                  value={newAgent.begin_message}
                  onChange={(e) => setNewAgent({...newAgent, begin_message: e.target.value})}
                  placeholder="Hello! How can I help you today?"
                />
              </div>

              <div>
                <Label htmlFor="general_prompt">System Prompt</Label>
                <Textarea
                  id="general_prompt"
                  value={newAgent.general_prompt}
                  onChange={(e) => setNewAgent({...newAgent, general_prompt: e.target.value})}
                  placeholder="You are a helpful customer service agent. You should be friendly, professional, and provide accurate information..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateAgent} disabled={!newAgent.agent_name}>
                  Create Agent
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents?.map((agent) => (
          <Card key={agent.agent_id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Bot className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{agent.agent_name}</CardTitle>
                    <p className="text-sm text-gray-500">{agent.language}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isAgentActive(agent) ? (
                    <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                      <Check className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-gray-500 text-white">
                      <X className="h-3 w-3 mr-1" />
                      Inactive
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Voice:</span>
                  <span className="font-medium text-right max-w-[60%]">
                    {getVoiceDisplayName(agent.voice_id)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Engine:</span>
                  <span className="font-medium">
                    {getEngineDisplayName(agent.response_engine)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Agent ID:</span>
                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                    {agent.agent_id.substring(0, 8)}...
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Modified:</span>
                  <span className="font-medium">
                    {new Date(agent.last_modification_timestamp * 1000).toLocaleDateString()}
                  </span>
                </div>
                {agent.llm_websocket_url && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">WebSocket:</span>
                    <Badge variant="outline" className="text-xs">Connected</Badge>
                  </div>
                )}
              </div>

              {agent.begin_message && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Welcome Message:</p>
                  <p className="text-sm font-medium line-clamp-2">"{agent.begin_message}"</p>
                </div>
              )}

              {agent.general_tools && agent.general_tools.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Tools:</span>
                  <Badge variant="outline" className="text-xs">
                    {agent.general_tools.length} configured
                  </Badge>
                </div>
              )}

              {agent.states && agent.states.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">States:</span>
                  <Badge variant="outline" className="text-xs">
                    {agent.states.length} defined
                  </Badge>
                </div>
              )}

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Settings className="h-4 w-4 mr-1" />
                  Configure
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Analytics
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleDeleteAgent(agent.agent_id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {(!agents || agents.length === 0) && (
          <div className="col-span-full text-center py-12">
            <Bot className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No AI Agents Yet</h3>
            <p className="text-gray-600 mb-4">Create your first AI agent to get started with automated customer service using the full Retell API.</p>
            <Button onClick={() => setIsCreateModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Agent
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
