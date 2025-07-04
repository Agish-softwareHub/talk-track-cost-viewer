
import { useState } from "react";
import { Code2, Copy, Eye, EyeOff, Key, BookOpen, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ApiEndpoint } from "@/types/developer";

export default function Developer() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(null);
  const { toast } = useToast();

  const apiKey = "sk_live_1234567890abcdef...";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The code has been copied to your clipboard.",
    });
  };

  const endpoints: ApiEndpoint[] = [
    {
      id: "calls",
      title: "Call Management",
      description: "Manage AI agent calls and retrieve call data",
      methods: [
        {
          method: "GET",
          endpoint: "/api/calls",
          description: "Retrieve all calls with optional filtering",
          parameters: [
            { name: "page", type: "integer", required: false, description: "Page number for pagination (default: 1)" },
            { name: "limit", type: "integer", required: false, description: "Number of results per page (default: 20, max: 100)" },
            { name: "agent_id", type: "string", required: false, description: "Filter by specific AI agent ID" },
            { name: "status", type: "string", required: false, description: "Filter by call status (completed, failed, in-progress)" },
            { name: "date_from", type: "string", required: false, description: "Start date filter (YYYY-MM-DD)" },
            { name: "date_to", type: "string", required: false, description: "End date filter (YYYY-MM-DD)" },
            { name: "sentiment", type: "string", required: false, description: "Filter by sentiment (positive, negative, neutral)" }
          ],
          response: {
            calls: [
              {
                id: "call_123",
                phone_number: "+1234567890",
                agent_id: "agent_456",
                status: "completed",
                duration: 185,
                cost: 0.25,
                sentiment: "positive",
                call_score: 8.5,
                created_at: "2024-01-15T10:30:00Z",
                recording_url: "https://recordings.example.com/call_123.mp3",
                transcript: "Call transcript text..."
              }
            ],
            pagination: {
              page: 1,
              limit: 20,
              total: 150,
              total_pages: 8
            }
          }
        },
        {
          method: "GET",
          endpoint: "/api/calls/{call_id}",
          description: "Retrieve detailed information about a specific call",
          parameters: [
            { name: "call_id", type: "string", required: true, description: "Unique identifier for the call" }
          ],
          response: {
            id: "call_123",
            phone_number: "+1234567890",
            agent_id: "agent_456",
            status: "completed",
            duration: 185,
            cost: 0.25,
            sentiment: "positive",
            call_score: 8.5,
            recording_url: "https://recordings.example.com/call_123.mp3",
            transcript: "Full call transcript...",
            metadata: {
              keywords: ["billing", "support", "resolved"],
              resolution_type: "resolved"
            }
          }
        },
        {
          method: "POST",
          endpoint: "/api/calls",
          description: "Initiate a new AI agent call",
          parameters: [
            { name: "phone_number", type: "string", required: true, description: "Target phone number in E.164 format" },
            { name: "agent_id", type: "string", required: true, description: "ID of the AI agent to use for the call" },
            { name: "callback_url", type: "string", required: false, description: "Webhook URL for call status updates" },
            { name: "metadata", type: "object", required: false, description: "Additional metadata for the call" }
          ],
          response: {
            id: "call_789",
            status: "initiated",
            phone_number: "+1234567890",
            agent_id: "agent_456",
            created_at: "2024-01-15T10:30:00Z"
          }
        }
      ]
    },
    {
      id: "agents",
      title: "AI Agent Management",
      description: "Manage AI agents and their configurations",
      methods: [
        {
          method: "GET",
          endpoint: "/api/agents",
          description: "Retrieve all AI agents",
          parameters: [
            { name: "active_only", type: "boolean", required: false, description: "Filter to only active agents" }
          ],
          response: {
            agents: [
              {
                id: "agent_456",
                name: "Customer Support Agent",
                department: "Support",
                is_active: true,
                system_prompt: "You are a professional customer support agent...",
                temperature: 0.7,
                max_tokens: 2000,
                calls_handled: 1247,
                success_rate: 94.2
              }
            ]
          }
        },
        {
          method: "POST",
          endpoint: "/api/agents",
          description: "Create a new AI agent",
          parameters: [
            { name: "name", type: "string", required: true, description: "Name of the AI agent" },
            { name: "department", type: "string", required: true, description: "Department the agent belongs to" },
            { name: "system_prompt", type: "string", required: true, description: "System prompt for the AI agent" },
            { name: "temperature", type: "number", required: false, description: "AI temperature setting (0.0-2.0)" },
            { name: "max_tokens", type: "integer", required: false, description: "Maximum tokens per response" }
          ],
          response: {
            id: "agent_789",
            name: "New Agent",
            department: "Sales",
            is_active: true,
            created_at: "2024-01-15T10:30:00Z"
          }
        }
      ]
    },
    {
      id: "analytics",
      title: "Analytics & Reporting",
      description: "Access analytics data and generate reports",
      methods: [
        {
          method: "GET",
          endpoint: "/api/analytics/summary",
          description: "Get summary analytics for a date range",
          parameters: [
            { name: "date_from", type: "string", required: true, description: "Start date (YYYY-MM-DD)" },
            { name: "date_to", type: "string", required: true, description: "End date (YYYY-MM-DD)" },
            { name: "agent_id", type: "string", required: false, description: "Filter by specific agent" }
          ],
          response: {
            total_calls: 1247,
            successful_calls: 1175,
            success_rate: 94.2,
            average_duration: 342,
            total_cost: 156.75,
            sentiment_distribution: {
              positive: 65.4,
              neutral: 28.1,
              negative: 6.5
            }
          }
        }
      ]
    },
    {
      id: "webhooks",
      title: "Webhooks",
      description: "Configure webhooks for real-time notifications",
      methods: [
        {
          method: "POST",
          endpoint: "/api/webhooks",
          description: "Create a new webhook endpoint",
          parameters: [
            { name: "url", type: "string", required: true, description: "The webhook URL to call" },
            { name: "events", type: "array", required: true, description: "Array of events to subscribe to" },
            { name: "secret", type: "string", required: false, description: "Secret for webhook signature verification" }
          ],
          response: {
            id: "webhook_123",
            url: "https://your-app.com/webhook",
            events: ["call.completed", "call.failed"],
            created_at: "2024-01-15T10:30:00Z"
          }
        }
      ]
    }
  ];

  const webhookEvents = [
    { name: "call.started", description: "Triggered when a call is initiated" },
    { name: "call.completed", description: "Triggered when a call completes successfully" },
    { name: "call.failed", description: "Triggered when a call fails" },
    { name: "agent.created", description: "Triggered when a new AI agent is created" },
    { name: "agent.updated", description: "Triggered when an AI agent is updated" }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <Code2 className="text-blue-600" size={32} />
          Developer API Documentation
        </h1>
        <p className="text-gray-600">Complete API reference for integrating with AI CallCenter</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen size={24} />
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Base URL</h3>
                <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">
                  https://api.aicallcenter.com/v1
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Response Format</h3>
                <p className="text-gray-600">All API responses are in JSON format with consistent structure:</p>
                <pre className="bg-gray-100 p-3 rounded-lg text-sm mt-2 overflow-x-auto">
{`{
  "success": true,
  "data": { ... },
  "error": null,
  "timestamp": "2024-01-15T10:30:00Z"
}`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Rate Limits</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>1000 requests per hour for standard endpoints</li>
                  <li>100 requests per hour for call initiation endpoints</li>
                  <li>Rate limit headers included in all responses</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Error Codes</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Badge variant="destructive">400</Badge>
                    <span className="text-sm">Bad Request - Invalid parameters</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="destructive">401</Badge>
                    <span className="text-sm">Unauthorized - Invalid API key</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="destructive">403</Badge>
                    <span className="text-sm">Forbidden - Insufficient permissions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="destructive">429</Badge>
                    <span className="text-sm">Too Many Requests - Rate limit exceeded</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="destructive">500</Badge>
                    <span className="text-sm">Internal Server Error</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="authentication" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key size={24} />
                API Authentication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Your API Key</h3>
                <div className="flex items-center gap-2">
                  <Input
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    readOnly
                    className="font-mono"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(apiKey)}
                  >
                    <Copy size={16} className="mr-2" />
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Keep your API key secure and never share it publicly.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Authentication Method</h3>
                <p className="text-gray-600 mb-3">
                  Include your API key in the Authorization header of all requests:
                </p>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <pre className="text-sm">
{`curl -X GET "https://api.aicallcenter.com/v1/calls" \\
  -H "Authorization: Bearer sk_live_1234567890abcdef..." \\
  -H "Content-Type: application/json"`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Test Your Authentication</h3>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                  Test API Connection
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-6">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Endpoint Categories */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">API Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {endpoints.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedEndpoint(category)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedEndpoint?.id === category.id
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="font-medium">{category.title}</div>
                        <div className="text-sm text-gray-600">{category.description}</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Endpoint Details */}
            <div className="lg:col-span-3">
              {selectedEndpoint ? (
                <div className="space-y-6">
                  {selectedEndpoint.methods.map((method, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Badge 
                            className={`${
                              method.method === 'GET' ? 'bg-green-100 text-green-800' :
                              method.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                              method.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}
                          >
                            {method.method}
                          </Badge>
                          <code className="text-lg font-mono">{method.endpoint}</code>
                        </div>
                        <p className="text-gray-600">{method.description}</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Parameters */}
                        <div>
                          <h4 className="font-semibold mb-2">Parameters</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-3 py-2 text-left">Name</th>
                                  <th className="px-3 py-2 text-left">Type</th>
                                  <th className="px-3 py-2 text-left">Required</th>
                                  <th className="px-3 py-2 text-left">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                {method.parameters.map((param, paramIndex) => (
                                  <tr key={paramIndex} className="border-t">
                                    <td className="px-3 py-2 font-mono">{param.name}</td>
                                    <td className="px-3 py-2">{param.type}</td>
                                    <td className="px-3 py-2">
                                      <Badge variant={param.required ? "destructive" : "secondary"}>
                                        {param.required ? "Required" : "Optional"}
                                      </Badge>
                                    </td>
                                    <td className="px-3 py-2">{param.description}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Response Example */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">Response Example</h4>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(JSON.stringify(method.response, null, 2))}
                            >
                              <Copy size={14} className="mr-2" />
                              Copy
                            </Button>
                          </div>
                          <pre className="bg-gray-100 p-3 rounded-lg text-sm overflow-x-auto">
                            {JSON.stringify(method.response, null, 2)}
                          </pre>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Code2 size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Select an API category to view endpoints</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Webhook Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Available Events</h3>
                <div className="space-y-2">
                  {webhookEvents.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <code className="font-mono text-sm">{event.name}</code>
                        <p className="text-sm text-gray-600">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Webhook Payload Example</h3>
                <pre className="bg-gray-100 p-3 rounded-lg text-sm overflow-x-auto">
{`{
  "event": "call.completed",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "call_id": "call_123",
    "phone_number": "+1234567890",
    "agent_id": "agent_456",
    "status": "completed",
    "duration": 185,
    "sentiment": "positive",
    "call_score": 8.5
  },
  "signature": "sha256=abc123..."
}`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Webhook Security</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>All webhooks include a signature header for verification</li>
                  <li>Webhook URLs must use HTTPS</li>
                  <li>Failed webhook deliveries are retried up to 3 times</li>
                  <li>Webhook timeouts after 10 seconds</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
