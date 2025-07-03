
import { useState } from "react";
import { Bot, Save, Plus, Edit, Trash2, Tag, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

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
}

export default function AIAgents() {
  const [agents, setAgents] = useState<AIAgent[]>([
    {
      id: "agent-1",
      name: "Customer Support Agent",
      department: "Support",
      tags: ["support", "general"],
      systemPrompt: "You are a professional customer support agent. Handle inquiries with empathy and provide clear solutions.",
      temperature: "0.7",
      maxTokens: "2000",
      isActive: true,
      callsHandled: 1247,
      successRate: 94.2
    },
    {
      id: "agent-2",
      name: "Sales Agent",
      department: "Sales",
      tags: ["sales", "conversion"],
      systemPrompt: "You are an expert sales agent. Focus on understanding customer needs and presenting compelling solutions.",
      temperature: "0.8",
      maxTokens: "2500",
      isActive: true,
      callsHandled: 856,
      successRate: 89.7
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
      successRate: 0
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Bot className="text-blue-600" size={32} />
            AI Agents
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your AI agents, customize prompts, and track performance
          </p>
        </div>
        <Button onClick={handleCreateAgent} className="bg-gradient-to-r from-blue-500 to-purple-600">
          <Plus size={16} className="mr-2" />
          Create Agent
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Agents List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>AI Agents ({agents.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedAgent?.id === agent.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedAgent(agent)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant={agent.isActive ? "default" : "secondary"}>
                        {agent.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteAgent(agent.id);
                        }}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Building2 size={14} />
                    {agent.department}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {agent.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Calls:</span>
                      <span className="font-medium ml-1">{agent.callsHandled}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Success:</span>
                      <span className="font-medium ml-1">{agent.successRate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Agent Details */}
        <div className="lg:col-span-2">
          {selectedAgent ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Agent Configuration</CardTitle>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? "default" : "outline"}
                  >
                    <Edit size={16} className="mr-2" />
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
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
                      <SelectTrigger>
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

                {/* Tags */}
                <div>
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedAgent.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        <Tag size={12} />
                        {tag}
                        {isEditing && (
                          <button
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-red-500"
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

                {/* System Prompt */}
                <div>
                  <Label htmlFor="system-prompt">System Prompt</Label>
                  <Textarea
                    id="system-prompt"
                    value={selectedAgent.systemPrompt}
                    onChange={(e) => setSelectedAgent({
                      ...selectedAgent,
                      systemPrompt: e.target.value
                    })}
                    className="min-h-[150px]"
                    disabled={!isEditing}
                  />
                </div>

                {/* AI Parameters */}
                <div className="grid md:grid-cols-2 gap-4">
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
                    />
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
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end">
                    <Button onClick={handleSaveAgent} className="bg-gradient-to-r from-green-500 to-green-600">
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Bot size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Select an agent to view and edit its configuration</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
