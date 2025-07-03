
import { useState } from "react";
import { Bot, Save, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function AIConfiguration() {
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a professional call analytics assistant. Analyze call transcripts and provide insights on customer sentiment, key topics, and actionable recommendations."
  );
  const [temperature, setTemperature] = useState("0.7");
  const [maxTokens, setMaxTokens] = useState("2000");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "AI Configuration Updated",
        description: "Your AI system prompt and settings have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update AI configuration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSystemPrompt("You are a professional call analytics assistant. Analyze call transcripts and provide insights on customer sentiment, key topics, and actionable recommendations.");
    setTemperature("0.7");
    setMaxTokens("2000");
    
    toast({
      title: "Settings Reset",
      description: "AI configuration has been reset to default values.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Bot className="text-blue-600" size={32} />
            AI Configuration
          </h1>
          <p className="text-gray-600 mt-2">
            Configure your AI system prompts and processing parameters
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw size={16} className="mr-2" />
            Reset to Default
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save size={16} className="mr-2" />
            {isLoading ? "Saving..." : "Save Configuration"}
          </Button>
        </div>
      </div>

      {/* Main Configuration */}
      <div className="grid gap-6">
        {/* System Prompt */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">System Prompt</h2>
          <p className="text-gray-600 mb-4">
            Define how your AI assistant should behave and respond when analyzing calls.
          </p>
          <div className="space-y-2">
            <Label htmlFor="system-prompt">AI System Prompt</Label>
            <Textarea
              id="system-prompt"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="min-h-[200px] resize-none"
              placeholder="Enter your system prompt here..."
            />
            <p className="text-sm text-gray-500">
              {systemPrompt.length} characters
            </p>
          </div>
        </div>

        {/* AI Parameters */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Parameters</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature</Label>
              <Input
                id="temperature"
                type="number"
                min="0"
                max="2"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
              />
              <p className="text-sm text-gray-500">
                Controls randomness (0 = focused, 2 = creative)
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-tokens">Max Tokens</Label>
              <Input
                id="max-tokens"
                type="number"
                min="100"
                max="4000"
                value={maxTokens}
                onChange={(e) => setMaxTokens(e.target.value)}
              />
              <p className="text-sm text-gray-500">
                Maximum response length
              </p>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Preview</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2"><strong>System Prompt:</strong></p>
            <p className="text-sm text-gray-800 mb-4">{systemPrompt}</p>
            <div className="flex gap-4 text-sm text-gray-600">
              <span><strong>Temperature:</strong> {temperature}</span>
              <span><strong>Max Tokens:</strong> {maxTokens}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
