import { useState } from "react";
import { Bot, Save, Plus, Edit, Trash2, Tag, Building2, Star, Activity, Clock, Zap, Brain, Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AIAgent {
  id: string;
  name: string;
  department: string;
  tags: string[];
  systemPrompt: string;
  temperature: string;
  maxTokens: string;
  isActive: boolean;
  callsHandled: number;
  successRate: number;
  averageScore: number;
  lastUsed: string;
}

type DepartmentColors = {
  Support: string;
  Sales: string;
  Technical: string;
  Billing: string;
  General: string;
  [key: string]: string;
};

export default function AIAgents() {
  const [agents, setAgents] = useState<AIAgent[]>([
    {
      id: "agent-1",
      name: "Customer Support Agent",
      department: "Support",
      tags: ["support", "general", "billing"],
      systemPrompt: "You are a professional customer support agent. Handle inquiries with empathy and provide clear solutions. Always maintain a helpful and courteous tone.",
      temperature: "0.7",
      maxTokens: "2000",
      isActive: true,
      callsHandled: 1247,
      successRate: 94.2,
      averageScore: 8.7,
      lastUsed: "2 hours ago"
    },
    {
      id: "agent-2",
      name: "Sales Agent",
      department: "Sales",
      tags: ["sales", "conversion", "upsell"],
      systemPrompt: "You are an expert sales agent. Focus on understanding customer needs and presenting compelling solutions. Be persuasive but not pushy.",
      temperature: "0.8",
      maxTokens: "2500",
      isActive: true,
      callsHandled: 856,
      successRate: 89.7,
      averageScore: 8.2,
      lastUsed: "1 hour ago"
    },
    {
      id: "agent-3",
      name: "Technical Support Agent",
      department: "Technical",
      tags: ["technical", "troubleshooting", "advanced"],
      systemPrompt: "You are a technical support specialist. Provide step-by-step troubleshooting guidance and explain technical concepts clearly.",
      temperature: "0.6",
      maxTokens: "3000",
      isActive: true,
      callsHandled: 432,
      successRate: 91.5,
      averageScore: 8.9,
      lastUsed: "30 minutes ago"
    }
  ]);

  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTag, setNewTag] = useState("");
  const { toast } = useToast();

  const departments = ["Support", "Sales", "Technical", "Billing", "General"];

  const handleSaveAgent = () => {
    if (!selectedAgent) return;
    
    setAgents(agents.map(agent => 
      agent.id === selectedAgent.id ? selectedAgent : agent
    ));
    
    toast({
      title: "Agent Updated",
      description: `${selectedAgent.name} has been updated successfully.`,
    });
    
    setIsEditing(false);
  };

  const handleCreateAgent = () => {
    const newAgent: AIAgent = {
      id: `agent-${Date.now()}`,
      name: "New Agent",
      department: "General",
      tags: [],
      systemPrompt: "You are a professional AI assistant. Help users with their inquiries in a clear and helpful manner.",
      temperature: "0.7",
      maxTokens: "2000",
      isActive: true,
      callsHandled: 0,
      successRate: 0,
      averageScore: 0,
      lastUsed: "Never"
    };
    
    setAgents([...agents, newAgent]);
    setSelectedAgent(newAgent);
    setIsEditing(true);
    
    toast({
      title: "Agent Created",
      description: "New AI agent has been created successfully.",
    });
  };

  const handleDeleteAgent = (agentId: string) => {
    setAgents(agents.filter(agent => agent.id !== agentId));
    if (selectedAgent?.id === agentId) {
      setSelectedAgent(null);
    }
    
    toast({
      title: "Agent Deleted",
      description: "AI agent has been deleted successfully.",
    });
  };

  const addTag = () => {
    if (!selectedAgent || !newTag.trim()) return;
    
    const updatedAgent = {
      ...selectedAgent,
      tags: [...selectedAgent.tags, newTag.trim()]
    };
    
    setSelectedAgent(updatedAgent);
    setNewTag("");
  };

  const removeTag = (tagToRemove: string) => {
    if (!selectedAgent) return;
    
    const updatedAgent = {
      ...selectedAgent,
      tags: selectedAgent.tags.filter(tag => tag !== tagToRemove)
    };
    
    setSelectedAgent(updatedAgent);
  };

  const getDepartmentColor = (department: string): string => {
    const colors: DepartmentColors = {
      Support: "from-blue-500 to-cyan-500",
      Sales: "from-green-500 to-emerald-500",
      Technical: "from-purple-500 to-violet-500",
      Billing: "from-orange-500 to-red-500",
      General: "from-gray-500 to-slate-500"
    };
    return colors[department] || colors.General;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Bot size={40} />
              </div>
              AI Agent Management
            </h1>
            <p className="text-blue-100 mt-3 text-lg">
              Create, customize, and manage your AI agents with advanced configurations
            </p>
          </div>
          <Button 
            onClick={handleCreateAgent} 
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-xl shadow-lg"
          >
            <Plus size={20} className="mr-2" />
            Create New Agent
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Agents</p>
                <p className="text-3xl font-bold text-gray-900">{agents.length}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                <Bot className="text-white" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Agents</p>
                <p className="text-3xl font-bold text-gray-900">{agents.filter(a => a.isActive).length}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                <Activity className="text-white" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-violet-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Calls</p>
                <p className="text-3xl font-bold text-gray-900">
                  {agents.reduce((sum, agent) => sum + agent.callsHandled, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl">
                <Zap className="text-white" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-50 to-red-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Avg Success Rate</p>
                <p className="text-3xl font-bold text-gray-900">
                  {(agents.reduce((sum, agent) => sum + agent.successRate, 0) / agents.length).toFixed(1)}%
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                <Star className="text-white" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Enhanced Agents List */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Brain className="text-blue-600" size={20} />
                AI Agents ({agents.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-y-auto">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    className={`p-6 cursor-pointer transition-all duration-200 border-b border-gray-100 hover:bg-gray-50 ${
                      selectedAgent?.id === agent.id
                        ? 'bg-blue-50 border-l-4 border-l-blue-500'
                        : ''
                    }`}
                    onClick={() => setSelectedAgent(agent)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${getDepartmentColor(agent.department)}`}>
                          <Bot className="text-white" size={16} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                          <p className="text-sm text-gray-500">{agent.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={agent.isActive ? "default" : "secondary"} className="text-xs">
                          {agent.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAgent(agent.id);
                          }}
                          className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {agent.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs px-2 py-1">
                          {tag}
                        </Badge>
                      ))}
                      {agent.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs px-2 py-1">
                          +{agent.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">{agent.callsHandled}</div>
                        <div className="text-gray-500">Calls</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">{agent.successRate}%</div>
                        <div className="text-gray-500">Success</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">{agent.averageScore}</div>
                        <div className="text-gray-500">Score</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock size={12} className="mr-1" />
                        Last used: {agent.lastUsed}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Agent Details */}
        <div className="lg:col-span-2">
          {selectedAgent ? (
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${getDepartmentColor(selectedAgent.department)}`}>
                      <SettingsIcon className="text-white" size={20} />
                    </div>
                    Agent Configuration
                  </CardTitle>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? "default" : "outline"}
                    className={isEditing ? "bg-gradient-to-r from-green-500 to-green-600" : ""}
                  >
                    <Edit size={16} className="mr-2" />
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="basic" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="prompt">System Prompt</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="agent-name">Agent Name</Label>
                        <Input
                          id="agent-name"
                          value={selectedAgent.name}
                          onChange={(e) => setSelectedAgent({
                            ...selectedAgent,
                            name: e.target.value
                          })}
                          disabled={!isEditing}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="department">Department</Label>
                        <Select
                          value={selectedAgent.department}
                          onValueChange={(value) => setSelectedAgent({
                            ...selectedAgent,
                            department: value
                          })}
                          disabled={!isEditing}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Tags</Label>
                      <div className="flex flex-wrap gap-2 mt-2 mb-3">
                        {selectedAgent.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                            <Tag size={12} />
                            {tag}
                            {isEditing && (
                              <button
                                onClick={() => removeTag(tag)}
                                className="ml-1 hover:text-red-500 font-bold"
                              >
                                ×
                              </button>
                            )}
                          </Badge>
                        ))}
                      </div>
                      {isEditing && (
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add new tag"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addTag()}
                          />
                          <Button onClick={addTag} size="sm">Add</Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="prompt" className="space-y-6">
                    <div>
                      <Label htmlFor="system-prompt">System Prompt</Label>
                      <Textarea
                        id="system-prompt"
                        value={selectedAgent.systemPrompt}
                        onChange={(e) => setSelectedAgent({
                          ...selectedAgent,
                          systemPrompt: e.target.value
                        })}
                        className="min-h-[200px] mt-2 font-mono text-sm"
                        disabled={!isEditing}
                        placeholder="Enter the system prompt that defines your AI agent's behavior and personality..."
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="advanced" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="temperature">Temperature</Label>
                        <Input
                          id="temperature"
                          type="number"
                          min="0"
                          max="2"
                          step="0.1"
                          value={selectedAgent.temperature}
                          onChange={(e) => setSelectedAgent({
                            ...selectedAgent,
                            temperature: e.target.value
                          })}
                          disabled={!isEditing}
                          className="mt-2"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Controls randomness (0.0 = focused, 2.0 = creative)
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="max-tokens">Max Tokens</Label>
                        <Input
                          id="max-tokens"
                          type="number"
                          min="100"
                          max="4000"
                          value={selectedAgent.maxTokens}
                          onChange={(e) => setSelectedAgent({
                            ...selectedAgent,
                            maxTokens: e.target.value
                          })}
                          disabled={!isEditing}
                          className="mt-2"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Maximum response length
                        </p>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid md:grid-cols-3 gap-4 pt-6 border-t">
                      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-0">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-gray-900">{selectedAgent.callsHandled}</div>
                          <div className="text-sm text-gray-600">Total Calls</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-0">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-gray-900">{selectedAgent.successRate}%</div>
                          <div className="text-sm text-gray-600">Success Rate</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-0">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-gray-900">{selectedAgent.averageScore}</div>
                          <div className="text-sm text-gray-600">Avg Score</div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>

                {isEditing && (
                  <div className="flex justify-end pt-6 border-t">
                    <Button 
                      onClick={handleSaveAgent} 
                      className="bg-gradient-to-r from-green-500 to-green-600 px-8"
                    >
                      <Save size={16} className="mr-2" />
                      Save All Changes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Bot size={48} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select an AI Agent</h3>
                <p className="text-gray-500">Choose an agent from the list to view and edit its configuration</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
