import { useState } from "react";
import { Users, Search, Plus, Phone, Mail, MapPin, Calendar, Star, Edit, Trash2, Eye, MessageSquare, Filter, ArrowUpDown, Bot, Zap, Brain, TrendingUp, Clock, Target, AlertCircle, CheckCircle2, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Customer } from "@/types/customers";
import BulkCustomerActions from "@/components/BulkCustomerActions";

interface Opportunity {
  id: string;
  customerName: string;
  title: string;
  value: string;
  stage: string;
  probability: number;
  closeDate: string;
  lastActivity: string;
  aiRecommendation?: string;
}

interface AIInsight {
  type: 'opportunity' | 'risk' | 'satisfaction' | 'engagement';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  customerId: string;
  action?: string;
}

export default function CustomerCRM() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [allCustomers, setAllCustomers] = useState<Customer[]>(customers);
  const { toast } = useToast();

  const customers: Customer[] = [
    {
      id: "CUST001",
      name: "John Anderson",
      email: "john.anderson@email.com",
      phone: "+1 (555) 123-4567",
      company: "TechCorp Solutions",
      status: "active",
      tier: "premium",
      location: "New York, NY",
      lastContact: "2024-01-15",
      totalCalls: 8,
      totalSpent: "$12,450",
      satisfaction: 4.8,
      avatar: "JA",
      joinDate: "2023-03-15",
      notes: "Prefers AI agents for technical support, high satisfaction with automated responses",
      tags: ["tech-savvy", "high-value", "automation"],
      callHistory: [
        { id: "1", date: "2024-01-15", type: "Support", duration: "12m", outcome: "Resolved" },
        { id: "2", date: "2024-01-10", type: "Sales", duration: "8m", outcome: "Follow-up" },
        { id: "3", date: "2024-01-05", type: "Technical", duration: "25m", outcome: "Escalated" }
      ]
    },
    {
      id: "CUST002",
      name: "Sarah Mitchell",
      email: "sarah.mitchell@company.com",
      phone: "+1 (555) 987-6543",
      company: "Design Studios Inc",
      status: "active",
      tier: "standard",
      location: "San Francisco, CA",
      lastContact: "2024-01-12",
      totalCalls: 15,
      totalSpent: "$5,280",
      satisfaction: 4.2,
      avatar: "SM",
      joinDate: "2023-08-22",
      notes: "Frequent user, prefers quick AI responses for routine inquiries",
      tags: ["frequent-user", "design", "quick-response"],
      callHistory: [
        { id: "1", date: "2024-01-12", type: "Billing", duration: "6m", outcome: "Resolved" },
        { id: "2", date: "2024-01-08", type: "Support", duration: "15m", outcome: "Resolved" }
      ]
    },
    {
      id: "CUST003",
      name: "Michael Chen",
      email: "m.chen@startup.io",
      phone: "+1 (555) 456-7890",
      company: "StartupFlow",
      status: "potential",
      tier: "basic",
      location: "Austin, TX",
      lastContact: "2024-01-14",
      totalCalls: 3,
      totalSpent: "$890",
      satisfaction: 3.9,
      avatar: "MC",
      joinDate: "2024-01-01",
      notes: "New to AI call agents, showing high interest in automation features",
      tags: ["startup", "potential", "new-user"],
      callHistory: [
        { id: "1", date: "2024-01-14", type: "Sales", duration: "22m", outcome: "Interested" },
        { id: "2", date: "2024-01-02", type: "Onboarding", duration: "18m", outcome: "Completed" }
      ]
    },
    {
      id: "CUST004",
      name: "Lisa Rodriguez",
      email: "lisa.r@consulting.com",
      phone: "+1 (555) 321-0987",
      company: "Global Consulting",
      status: "inactive",
      tier: "premium",
      location: "Chicago, IL",
      lastContact: "2023-12-20",
      totalCalls: 22,
      totalSpent: "$18,900",
      satisfaction: 4.6,
      avatar: "LR",
      joinDate: "2022-11-10",
      notes: "Previously active, satisfied with AI agent efficiency but needs re-engagement",
      tags: ["consulting", "re-engagement-needed", "premium"],
      callHistory: [
        { id: "1", date: "2023-12-20", type: "Support", duration: "9m", outcome: "Resolved" },
        { id: "2", date: "2023-12-15", type: "Account Review", duration: "35m", outcome: "Renewed" }
      ]
    }
  ];

  const aiInsights: AIInsight[] = [
    {
      type: 'opportunity',
      title: 'Upsell Opportunity',
      description: 'John Anderson has been using basic features heavily. Consider premium upgrade.',
      priority: 'high',
      customerId: 'CUST001',
      action: 'Schedule demo call'
    },
    {
      type: 'risk',
      title: 'Churn Risk',
      description: 'Lisa Rodriguez has been inactive for 25 days. Previous high-value customer.',
      priority: 'high',
      customerId: 'CUST004',
      action: 'Send re-engagement campaign'
    },
    {
      type: 'satisfaction',
      title: 'High Satisfaction',
      description: 'Sarah Mitchell consistently rates AI interactions 5 stars.',
      priority: 'medium',
      customerId: 'CUST002',
      action: 'Request testimonial'
    }
  ];

  const opportunities: Opportunity[] = [
    {
      id: "OPP001",
      customerName: "Michael Chen",
      title: "Premium Plan Upgrade",
      value: "$2,400",
      stage: "Negotiation",
      probability: 75,
      closeDate: "2024-02-15",
      lastActivity: "Demo scheduled",
      aiRecommendation: "Customer showed 80% engagement in premium features demo"
    },
    {
      id: "OPP002",
      customerName: "John Anderson",
      title: "Enterprise Add-ons",
      value: "$5,000",
      stage: "Proposal",
      probability: 60,
      closeDate: "2024-03-01",
      lastActivity: "Proposal sent",
      aiRecommendation: "High API usage suggests need for enterprise tier"
    },
    {
      id: "OPP003",
      customerName: "TechStart Inc",
      title: "New Account",
      value: "$8,500",
      stage: "Discovery",
      probability: 40,
      closeDate: "2024-02-28",
      lastActivity: "Needs assessment",
      aiRecommendation: "Similar companies typically convert within 30 days"
    }
  ];

  const filteredCustomers = allCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    const matchesStatus = filterStatus === "all" || customer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "lastContact":
        return new Date(b.lastContact).getTime() - new Date(a.lastContact).getTime();
      case "totalCalls":
        return b.totalCalls - a.totalCalls;
      case "satisfaction":
        return b.satisfaction - a.satisfaction;
      default:
        return 0;
    }
  });

  const handleCustomerSelection = (customerId: string, checked: boolean) => {
    if (checked) {
      setSelectedCustomers([...selectedCustomers, customerId]);
    } else {
      setSelectedCustomers(selectedCustomers.filter(id => id !== customerId));
    }
  };

  const handleBulkCall = (customerIds: string[]) => {
    const selectedCustomerNames = allCustomers
      .filter(c => customerIds.includes(c.id))
      .map(c => c.name);
    
    toast({
      title: "AI Bulk Calling Started",
      description: `Initiating AI calls to ${customerIds.length} customers: ${selectedCustomerNames.slice(0, 3).join(', ')}${customerIds.length > 3 ? '...' : ''}`,
    });
    
    // Here you would integrate with your actual calling service
    console.log("Starting bulk AI calls for customers:", customerIds);
    
    // Clear selection after calling
    setSelectedCustomers([]);
  };

  const handleAddCustomers = (newCustomers: Partial<Customer>[]) => {
    const customersWithDefaults = newCustomers.map(customer => ({
      ...customer,
      id: customer.id || `CUST-${Date.now()}-${Math.random()}`,
      status: customer.status || "potential",
      tier: customer.tier || "basic",
      lastContact: customer.lastContact || new Date().toISOString().split('T')[0],
      totalCalls: customer.totalCalls || 0,
      totalSpent: customer.totalSpent || "$0",
      satisfaction: customer.satisfaction || 0,
      avatar: customer.avatar || customer.name?.split(' ').map(n => n[0]).join('').toUpperCase() || "??",
      joinDate: customer.joinDate || new Date().toISOString().split('T')[0],
      notes: customer.notes || "New customer",
      tags: customer.tags || ["new-customer"],
      callHistory: customer.callHistory || []
    })) as Customer[];

    setAllCustomers([...allCustomers, ...customersWithDefaults]);
    
    toast({
      title: "Customers Added",
      description: `Successfully added ${customersWithDefaults.length} new customer${customersWithDefaults.length > 1 ? 's' : ''}`,
    });
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "potential": return "bg-blue-100 text-blue-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTierColor = (tier: string): string => {
    switch (tier) {
      case "premium": return "bg-purple-100 text-purple-800";
      case "standard": return "bg-blue-100 text-blue-800";
      case "basic": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return TrendingUp;
      case 'risk': return AlertCircle;
      case 'satisfaction': return Star;
      case 'engagement': return Activity;
      default: return Target;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'bg-green-100 text-green-800 border-green-200';
      case 'risk': return 'bg-red-100 text-red-800 border-red-200';
      case 'satisfaction': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'engagement': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI-Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-4 right-4">
          <Bot className="h-12 w-12 text-white/30" />
        </div>
        <div className="relative">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <Brain className="h-8 w-8" />
                AI-Powered Customer CRM
              </h1>
              <p className="text-blue-100">Intelligent customer insights powered by AI agents</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{allCustomers.length}</div>
                <div className="text-blue-100 text-sm">Total Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{aiInsights.length}</div>
                <div className="text-blue-100 text-sm">AI Insights</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{selectedCustomers.length}</div>
                <div className="text-blue-100 text-sm">Selected</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {aiInsights.map((insight, index) => {
          const IconComponent = getInsightIcon(insight.type);
          return (
            <Card key={index} className={`border-l-4 ${getInsightColor(insight.type)} hover:shadow-lg transition-shadow`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/50">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">{insight.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{insight.description}</p>
                    {insight.action && (
                      <Button size="sm" variant="outline" className="text-xs h-7">
                        <Zap className="h-3 w-3 mr-1" />
                        {insight.action}
                      </Button>
                    )}
                  </div>
                  <Badge variant={insight.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                    {insight.priority}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Enhanced Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Active Customers", value: allCustomers.filter(c => c.status === "active").length, color: "green", icon: Users },
          { label: "AI Resolution Rate", value: "94%", color: "blue", icon: Bot },
          { label: "Avg Satisfaction", value: "4.4/5", color: "yellow", icon: Star },
          { label: "Response Time", value: "0.8s", color: "purple", icon: Zap },
          { label: "Total Revenue", value: "$37.5K", color: "green", icon: TrendingUp }
        ].map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="customers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-6">
          {/* Bulk Actions */}
          <BulkCustomerActions
            customers={sortedCustomers}
            selectedCustomers={selectedCustomers}
            onSelectionChange={setSelectedCustomers}
            onBulkCall={handleBulkCall}
            onAddCustomers={handleAddCustomers}
          />

          {/* Enhanced Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    placeholder="Search customers by name, email, company, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="potential">Potential</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="lastContact">Last Contact</SelectItem>
                    <SelectItem value="totalCalls">Total Calls</SelectItem>
                    <SelectItem value="satisfaction">Satisfaction</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <Bot className="mr-2 h-4 w-4" />
                  AI Analyze
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Enhanced Customer List */}
            <div className="lg:col-span-2 space-y-4">
              {sortedCustomers.map((customer) => (
                <Card 
                  key={customer.id} 
                  className={`hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 ${
                    selectedCustomer?.id === customer.id ? 'ring-2 ring-blue-500 border-l-blue-500' : 'border-l-transparent'
                  } ${customer.status === 'inactive' ? 'bg-gray-50' : ''}`}
                  onClick={() => setSelectedCustomer(customer)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={selectedCustomers.includes(customer.id)}
                            onCheckedChange={(checked) => handleCustomerSelection(customer.id, checked as boolean)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                              {customer.avatar}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            {customer.name}
                            {customer.satisfaction > 4.5 && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                          </h3>
                          <p className="text-sm text-gray-600">{customer.company}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getStatusColor(customer.status)}>
                              {customer.status}
                            </Badge>
                            <Badge className={getTierColor(customer.tier)}>
                              {customer.tier}
                            </Badge>
                            {customer.tags.includes('automation') && (
                              <Badge variant="outline" className="text-purple-600 border-purple-200">
                                <Bot className="h-3 w-3 mr-1" />
                                AI Preferred
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-center">
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="text-yellow-500 h-4 w-4" />
                            <span className="font-medium">{customer.satisfaction}</span>
                          </div>
                          <div className="text-xs text-gray-500">Satisfaction</div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-50">
                          <Phone size={14} />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                          <Mail size={14} />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-50">
                          <Bot size={14} />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-600">Total Calls:</span>
                        <div className="font-medium flex items-center gap-1">
                          {customer.totalCalls}
                          {customer.totalCalls > 10 && <TrendingUp className="h-3 w-3 text-green-500" />}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Total Spent:</span>
                        <div className="font-medium text-green-600">{customer.totalSpent}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Contact:</span>
                        <div className="font-medium">{customer.lastContact}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">AI Interactions:</span>
                        <div className="font-medium text-purple-600">
                          {Math.floor(customer.totalCalls * 0.7)}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {customer.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Enhanced Customer Details */}
            <div className="space-y-4">
              {selectedCustomer ? (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="text-blue-600" size={20} />
                        Customer Profile
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <Avatar className="h-16 w-16 mx-auto mb-3">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-bold">
                            {selectedCustomer.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold text-lg">{selectedCustomer.name}</h3>
                        <p className="text-gray-600">{selectedCustomer.company}</p>
                        
                        {/* AI Preference Indicator */}
                        {selectedCustomer.tags.includes('automation') && (
                          <Badge className="mt-2 bg-purple-100 text-purple-800">
                            <Bot className="h-3 w-3 mr-1" />
                            AI Agent Preferred
                          </Badge>
                        )}
                      </div>

                      {/* Customer Score */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Customer Health Score</span>
                          <span className="text-sm font-bold text-green-600">
                            {Math.round(selectedCustomer.satisfaction * 20)}%
                          </span>
                        </div>
                        <Progress value={selectedCustomer.satisfaction * 20} className="h-2" />
                      </div>

                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone size={16} className="text-gray-400" />
                          <span>{selectedCustomer.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail size={16} className="text-gray-400" />
                          <span>{selectedCustomer.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-gray-400" />
                          <span>{selectedCustomer.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-gray-400" />
                          <span>Joined {selectedCustomer.joinDate}</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <h4 className="font-medium mb-2">AI Agent Notes</h4>
                        <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">
                          {selectedCustomer.notes}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                          <Bot size={14} className="mr-2" />
                          AI Chat
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit size={14} />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare size={14} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI-Enhanced Call History */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Activity className="text-purple-600" size={18} />
                        AI Interaction History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedCustomer.callHistory.map((call, index) => (
                          <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gradient-to-r from-gray-50 to-blue-50">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="flex items-center gap-1">
                                  {call.type === "Support" && <Bot className="h-3 w-3" />}
                                  {call.type}
                                </Badge>
                                {call.outcome === "Resolved" && (
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                )}
                              </div>
                              <span className="text-xs text-gray-500">{call.date}</span>
                            </div>
                            <div className="text-sm space-y-1">
                              <div className="flex justify-between">
                                <span>Duration: {call.duration}</span>
                                <Badge 
                                  variant={call.outcome === "Resolved" ? "default" : "secondary"} 
                                  className="text-xs"
                                >
                                  {call.outcome}
                                </Badge>
                              </div>
                              {call.type === "Support" && (
                                <div className="text-xs text-purple-600 bg-purple-50 p-2 rounded mt-2">
                                  <Bot className="h-3 w-3 inline mr-1" />
                                  Handled by AI Agent - High satisfaction score
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center text-gray-500">
                    <Bot size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>Select a customer to view AI-powered insights</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="text-green-600" />
                AI-Identified Sales Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunities.map((opportunity) => (
                  <div key={opportunity.id} className="p-4 border border-gray-200 rounded-lg bg-gradient-to-r from-green-50 to-blue-50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                          {opportunity.title}
                          <Zap className="h-4 w-4 text-yellow-500" />
                        </h3>
                        <p className="text-sm text-gray-600">{opportunity.customerName}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600 text-lg">{opportunity.value}</div>
                        <div className="text-sm text-gray-500">{opportunity.probability}% probability</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="border-green-300 text-green-700">
                        {opportunity.stage}
                      </Badge>
                      <div className="text-sm text-gray-600">
                        Close: {opportunity.closeDate}
                      </div>
                    </div>
                    <div className="text-sm text-gray-700 mb-2">
                      Last activity: {opportunity.lastActivity}
                    </div>
                    {opportunity.aiRecommendation && (
                      <div className="bg-purple-50 border border-purple-200 rounded p-3 mt-3">
                        <div className="flex items-center gap-2 text-purple-700 text-sm">
                          <Brain className="h-4 w-4" />
                          <strong>AI Insight:</strong> {opportunity.aiRecommendation}
                        </div>
                      </div>
                    )}
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="bg-gradient-to-r from-green-600 to-blue-600">
                        <Bot className="h-3 w-3 mr-1" />
                        AI Follow-up
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="text-purple-600" />
                  AI Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI Resolution Rate</span>
                    <div className="flex items-center gap-2">
                      <Progress value={94} className="w-20 h-2" />
                      <span className="text-sm font-bold">94%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Customer Satisfaction</span>
                    <div className="flex items-center gap-2">
                      <Progress value={88} className="w-20 h-2" />
                      <span className="text-sm font-bold">4.4/5</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Response Time</span>
                    <div className="flex items-center gap-2">
                      <Progress value={96} className="w-20 h-2" />
                      <span className="text-sm font-bold">0.8s</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="text-blue-600" />
                  Customer Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Prefer AI Agents</span>
                    <Badge className="bg-green-100 text-green-800">68%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Quick Response Priority</span>
                    <Badge className="bg-blue-100 text-blue-800">84%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Self-Service Options</span>
                    <Badge className="bg-purple-100 text-purple-800">72%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="text-yellow-600" />
                AI Automation Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="h-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white flex-col gap-2">
                  <Bot className="h-6 w-6" />
                  <span>Auto-assign AI Agents</span>
                </Button>
                <Button className="h-20 bg-gradient-to-r from-green-600 to-teal-600 text-white flex-col gap-2">
                  <TrendingUp className="h-6 w-6" />
                  <span>Predictive Lead Scoring</span>
                </Button>
                <Button className="h-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white flex-col gap-2">
                  <MessageSquare className="h-6 w-6" />
                  <span>Smart Follow-up Campaigns</span>
                </Button>
                <Button className="h-20 bg-gradient-to-r from-orange-600 to-red-600 text-white flex-col gap-2">
                  <AlertCircle className="h-6 w-6" />
                  <span>Churn Prevention AI</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
