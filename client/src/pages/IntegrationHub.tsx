import { useState } from "react";
import { Puzzle, Settings, CheckCircle, AlertCircle, Plus, ExternalLink, Chrome, MessageCircle, Key, QrCode, Phone, Eye, EyeOff, Copy, RefreshCw, Zap, Activity, Globe, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function IntegrationHub() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  
  // Google Integration State
  const [googleClientId, setGoogleClientId] = useState("");
  const [googleClientSecret, setGoogleClientSecret] = useState("");
  const [googleIsConnected, setGoogleIsConnected] = useState(false);
  const [showGoogleSecret, setShowGoogleSecret] = useState(false);
  
  // WhatsApp Integration State
  const [whatsappPhoneNumber, setWhatsappPhoneNumber] = useState("");
  const [whatsappBusinessName, setWhatsappBusinessName] = useState("");
  const [whatsappIsConnected, setWhatsappIsConnected] = useState(false);
  const [showWhatsappQR, setShowWhatsappQR] = useState(false);
  
  // Advanced Features State
  const [autoResponses, setAutoResponses] = useState(true);
  const [smartRouting, setSmartRouting] = useState(true);
  const [realTimeSync, setRealTimeSync] = useState(false);
  const [customWebhooks, setCustomWebhooks] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();

  // Handler Functions
  const handleGoogleConnect = async () => {
    if (!googleClientId || !googleClientSecret) {
      toast({
        title: "Missing Credentials",
        description: "Please provide both Client ID and Client Secret.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setGoogleIsConnected(true);
      toast({
        title: "Google Integration Connected",
        description: "Successfully connected to Google services.",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect to Google services. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppConnect = async () => {
    if (!whatsappPhoneNumber || !whatsappBusinessName) {
      toast({
        title: "Missing Information",
        description: "Please provide both phone number and business name.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setShowWhatsappQR(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setWhatsappIsConnected(true);
      setShowWhatsappQR(false);
      toast({
        title: "WhatsApp Connected",
        description: "Successfully connected to WhatsApp Business API.",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect to WhatsApp. Please try again.",
        variant: "destructive",
      });
      setShowWhatsappQR(false);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard.",
    });
  };

  const integrations = [
    {
      id: "whatsapp",
      name: "WhatsApp Business",
      description: "Connect WhatsApp for messaging and notifications",
      category: "messaging",
      status: whatsappIsConnected ? "connected" : "available",
      icon: "💬",
      features: ["Message automation", "Status updates", "Customer support"],
      setupTime: "5 minutes"
    },
    {
      id: "google",
      name: "Google Workspace",
      description: "Integrate with Google Calendar, Drive, and Contacts",
      category: "productivity",
      status: googleIsConnected ? "connected" : "available",
      icon: "🔍",
      features: ["Calendar sync", "Contact management", "File storage"],
      setupTime: "10 minutes"
    },
    {
      id: "slack",
      name: "Slack",
      description: "Get call notifications and updates in Slack",
      category: "communication",
      status: "available",
      icon: "💼",
      features: ["Real-time alerts", "Team notifications", "Custom channels"],
      setupTime: "3 minutes"
    },
    {
      id: "zapier",
      name: "Zapier",
      description: "Automate workflows with 5000+ apps",
      category: "automation",
      status: "available",
      icon: "⚡",
      features: ["Workflow automation", "Custom triggers", "Data sync"],
      setupTime: "15 minutes"
    },
    {
      id: "hubspot",
      name: "HubSpot CRM",
      description: "Sync customer data and call records",
      category: "crm",
      status: "available",
      icon: "📊",
      features: ["Contact sync", "Deal tracking", "Activity logging"],
      setupTime: "20 minutes"
    },
    {
      id: "microsoft",
      name: "Microsoft Teams",
      description: "Collaborate and get notifications in Teams",
      category: "communication",
      status: "available",
      icon: "🏢",
      features: ["Team chat", "Video calls", "File sharing"],
      setupTime: "8 minutes"
    }
  ];

  const categories = [
    { id: "all", name: "All Integrations" },
    { id: "messaging", name: "Messaging" },
    { id: "productivity", name: "Productivity" },
    { id: "communication", name: "Communication" },
    { id: "automation", name: "Automation" },
    { id: "crm", name: "CRM" }
  ];

  const filteredIntegrations = selectedCategory === "all" 
    ? integrations 
    : integrations.filter(integration => integration.category === selectedCategory);

  const connectedCount = integrations.filter(i => i.status === "connected").length;
  const availableCount = integrations.filter(i => i.status === "available").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">Integration Hub</h1>
            <p className="text-cyan-100 text-lg">Connect your favorite tools and automate workflows</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{connectedCount}</div>
              <div className="text-cyan-100">Connected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{availableCount}</div>
              <div className="text-cyan-100">Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Active Integrations", value: connectedCount, icon: CheckCircle, color: "green" },
          { title: "Available Apps", value: availableCount, icon: Puzzle, color: "blue" },
          { title: "Custom Workflows", value: "4", icon: Settings, color: "purple" }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600`}>
                <stat.icon size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
            </div>
            <p className="text-gray-600 font-medium">{stat.title}</p>
          </div>
        ))}
      </div>

      <Tabs defaultValue="browse" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="browse">Browse Integrations</TabsTrigger>
          <TabsTrigger value="configure">Configure</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Category Filter */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration) => (
              <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{integration.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <Badge variant={integration.status === "connected" ? "default" : "secondary"}>
                          {integration.status === "connected" ? (
                            <><CheckCircle size={12} className="mr-1" /> Connected</>
                          ) : (
                            <><AlertCircle size={12} className="mr-1" /> Available</>
                          )}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm">{integration.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-900">Features:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {integration.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-gray-500">Setup: {integration.setupTime}</span>
                    <Button 
                      size="sm" 
                      variant={integration.status === "connected" ? "outline" : "default"}
                    >
                      {integration.status === "connected" ? (
                        <>
                          <Settings size={14} className="mr-1" />
                          Configure
                        </>
                      ) : (
                        <>
                          <Plus size={14} className="mr-1" />
                          Connect
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="configure" className="space-y-6">
          {/* Google Integration Configuration */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Chrome className="text-blue-600" size={24} />
                  <h2 className="text-xl font-semibold text-gray-900">Google Integration</h2>
                </div>
                <div className="flex items-center gap-2">
                  {googleIsConnected ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle size={20} />
                      <span className="font-medium">Connected</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-gray-500">
                      <AlertCircle size={20} />
                      <span className="font-medium">Not Connected</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="p-6">
              {googleIsConnected ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-600" size={24} />
                    <div>
                      <h3 className="font-medium text-green-900">Google Services Connected</h3>
                      <p className="text-green-700 text-sm">Your application is connected to Google services.</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <Button variant="outline" onClick={() => setGoogleIsConnected(false)}>
                      Disconnect
                    </Button>
                    <Button variant="outline">
                      <Settings size={16} className="mr-2" />
                      Manage Permissions
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="google-client-id">Client ID</Label>
                      <div className="relative">
                        <Input
                          id="google-client-id"
                          value={googleClientId}
                          onChange={(e) => setGoogleClientId(e.target.value)}
                          placeholder="Enter Google Client ID"
                          className="pr-10"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                          onClick={() => copyToClipboard(googleClientId)}
                        >
                          <Copy size={14} />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="google-client-secret">Client Secret</Label>
                      <div className="relative">
                        <Input
                          id="google-client-secret"
                          type={showGoogleSecret ? "text" : "password"}
                          value={googleClientSecret}
                          onChange={(e) => setGoogleClientSecret(e.target.value)}
                          placeholder="Enter Google Client Secret"
                          className="pr-20"
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => setShowGoogleSecret(!showGoogleSecret)}
                          >
                            {showGoogleSecret ? <EyeOff size={14} /> : <Eye size={14} />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => copyToClipboard(googleClientSecret)}
                          >
                            <Copy size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleGoogleConnect} disabled={isLoading} className="w-full">
                    {isLoading ? "Connecting..." : "Connect Google Account"}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* WhatsApp Integration Configuration */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageCircle className="text-green-600" size={24} />
                  <h2 className="text-xl font-semibold text-gray-900">WhatsApp Integration</h2>
                </div>
                <div className="flex items-center gap-2">
                  {whatsappIsConnected ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle size={20} />
                      <span className="font-medium">Connected</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-gray-500">
                      <AlertCircle size={20} />
                      <span className="font-medium">Not Connected</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="p-6">
              {whatsappIsConnected ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-600" size={24} />
                    <div>
                      <h3 className="font-medium text-green-900">WhatsApp Business Connected</h3>
                      <p className="text-green-700 text-sm">Your business account is connected and ready to use.</p>
                      <p className="text-green-600 text-sm mt-1">Business: {whatsappBusinessName} • Phone: {whatsappPhoneNumber}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <Button variant="outline" onClick={() => setWhatsappIsConnected(false)}>
                      Disconnect
                    </Button>
                    <Button variant="outline">
                      <Settings size={16} className="mr-2" />
                      Manage Settings
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {showWhatsappQR ? (
                    <div className="text-center p-8">
                      <div className="bg-gray-100 rounded-lg p-8 mx-auto w-64 h-64 flex items-center justify-center mb-4">
                        <QrCode size={120} className="text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Scan QR Code</h3>
                      <p className="text-gray-600 mb-4">Open WhatsApp on your phone and scan this QR code to connect</p>
                      <Button variant="outline" onClick={() => setShowWhatsappQR(false)}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="whatsapp-business-name">Business Name</Label>
                          <Input
                            id="whatsapp-business-name"
                            value={whatsappBusinessName}
                            onChange={(e) => setWhatsappBusinessName(e.target.value)}
                            placeholder="Enter your business name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="whatsapp-phone">Phone Number</Label>
                          <div className="relative">
                            <Phone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                              id="whatsapp-phone"
                              value={whatsappPhoneNumber}
                              onChange={(e) => setWhatsappPhoneNumber(e.target.value)}
                              placeholder="+1 (555) 123-4567"
                              className="pl-10"
                            />
                          </div>
                        </div>
                      </div>
                      <Button onClick={handleWhatsAppConnect} disabled={isLoading} className="w-full">
                        {isLoading ? "Connecting..." : "Connect WhatsApp Business"}
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Automated Workflows</h2>
              <Button>
                <Plus size={16} className="mr-2" />
                Create Workflow
              </Button>
            </div>

            <div className="space-y-4">
              {[
                {
                  name: "New Call Notification",
                  description: "Send Slack message when new call is received",
                  apps: ["AI CallCenter", "Slack"],
                  status: "active",
                  runs: "245 this month"
                },
                {
                  name: "CRM Contact Sync",
                  description: "Update HubSpot contacts after each call",
                  apps: ["AI CallCenter", "HubSpot"],
                  status: "active",
                  runs: "189 this month"
                },
                {
                  name: "Call Summary Email",
                  description: "Email call summary to team leads",
                  apps: ["AI CallCenter", "Gmail"],
                  status: "paused",
                  runs: "67 this month"
                },
                {
                  name: "Calendar Booking",
                  description: "Create calendar events for follow-up calls",
                  apps: ["AI CallCenter", "Google Calendar"],
                  status: "active",
                  runs: "98 this month"
                }
              ].map((workflow, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-gray-900">{workflow.name}</h3>
                      <Badge variant={workflow.status === "active" ? "default" : "secondary"}>
                        {workflow.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{workflow.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>Apps: {workflow.apps.join(" → ")}</span>
                      <span>•</span>
                      <span>{workflow.runs}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Settings size={14} className="mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          {/* Advanced Integration Features */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Zap className="text-purple-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">Advanced Features</h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Automation Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Automation Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Auto-Response System</h4>
                      <p className="text-sm text-gray-600">Automatically respond to common inquiries</p>
                    </div>
                    <Switch checked={autoResponses} onCheckedChange={setAutoResponses} />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Smart Call Routing</h4>
                      <p className="text-sm text-gray-600">Route calls based on AI analysis</p>
                    </div>
                    <Switch checked={smartRouting} onCheckedChange={setSmartRouting} />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Real-Time Sync</h4>
                      <p className="text-sm text-gray-600">Sync data across all platforms instantly</p>
                    </div>
                    <Switch checked={realTimeSync} onCheckedChange={setRealTimeSync} />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Advanced Analytics</h4>
                      <p className="text-sm text-gray-600">Deep insights and predictive analysis</p>
                    </div>
                    <Switch checked={true} onCheckedChange={() => {}} />
                  </div>
                </div>
              </div>

              {/* Webhook Configuration */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Custom Webhooks</h3>
                <div className="space-y-3">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="webhook-url"
                      value={customWebhooks}
                      onChange={(e) => setCustomWebhooks(e.target.value)}
                      placeholder="https://your-domain.com/webhook"
                      className="flex-1"
                    />
                    <Button variant="outline">
                      <Globe size={16} className="mr-2" />
                      Test
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Receive real-time notifications about call events, status changes, and analytics updates
                  </p>
                </div>
              </div>

              {/* Security & Compliance */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Security & Compliance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Lock className="text-green-600" size={20} />
                      <h4 className="font-medium text-gray-900">Data Encryption</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">End-to-end encryption for all data transfers</p>
                    <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Activity className="text-blue-600" size={20} />
                      <h4 className="font-medium text-gray-900">Audit Logging</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Complete activity logs for compliance</p>
                    <Badge variant="default" className="bg-blue-100 text-blue-800">Enabled</Badge>
                  </div>
                </div>
              </div>

              {/* API Rate Limiting */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">API Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="rate-limit">Rate Limit (requests/minute)</Label>
                    <Select defaultValue="1000">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100">100</SelectItem>
                        <SelectItem value="500">500</SelectItem>
                        <SelectItem value="1000">1,000</SelectItem>
                        <SelectItem value="5000">5,000</SelectItem>
                        <SelectItem value="unlimited">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timeout">Request Timeout (seconds)</Label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                        <SelectItem value="60">60</SelectItem>
                        <SelectItem value="120">120</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="retry-attempts">Retry Attempts</Label>
                    <Select defaultValue="3">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Custom Scripts */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Custom Integration Scripts</h3>
                <div className="space-y-3">
                  <Label htmlFor="custom-script">Custom JavaScript Code</Label>
                  <Textarea
                    id="custom-script"
                    placeholder="// Add your custom integration logic here
// Example: Custom data transformation, validation, or routing logic
function onCallReceived(callData) {
  // Process call data
  return transformedData;
}"
                    rows={8}
                    className="font-mono text-sm"
                  />
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <RefreshCw size={16} className="mr-2" />
                      Validate
                    </Button>
                    <Button>
                      Save Script
                    </Button>
                  </div>
                </div>
              </div>

              {/* Integration Health Monitoring */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Health Monitoring</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: "Google", status: "healthy", uptime: "99.9%", response: "120ms" },
                    { name: "WhatsApp", status: "healthy", uptime: "99.8%", response: "85ms" },
                    { name: "Webhooks", status: "warning", uptime: "98.5%", response: "250ms" }
                  ].map((service, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{service.name}</h4>
                        <Badge 
                          variant={service.status === "healthy" ? "default" : "secondary"}
                          className={service.status === "healthy" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                        >
                          {service.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Uptime:</span>
                          <span>{service.uptime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Response:</span>
                          <span>{service.response}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}