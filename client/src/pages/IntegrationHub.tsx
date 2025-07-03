import { useState } from "react";
import { Puzzle, Settings, CheckCircle, AlertCircle, Plus, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function IntegrationHub() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const integrations = [
    {
      id: "whatsapp",
      name: "WhatsApp Business",
      description: "Connect WhatsApp for messaging and notifications",
      category: "messaging",
      status: "connected",
      icon: "💬",
      features: ["Message automation", "Status updates", "Customer support"],
      setupTime: "5 minutes"
    },
    {
      id: "google",
      name: "Google Workspace",
      description: "Integrate with Google Calendar, Drive, and Contacts",
      category: "productivity",
      status: "connected",
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
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">Browse Integrations</TabsTrigger>
          <TabsTrigger value="workflows">Automated Workflows</TabsTrigger>
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
      </Tabs>
    </div>
  );
}