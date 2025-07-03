import { useState } from "react";
import { Users, Search, Plus, Phone, Mail, MapPin, Calendar, Star, Edit, Trash2, Eye, MessageSquare, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function CustomerCRM() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const customers = [
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
      tags: ["vip", "enterprise", "technical"],
      notes: "Long-term customer, prefers technical discussions",
      avatar: "JA",
      joinDate: "2023-03-15",
      callHistory: [
        { date: "2024-01-15", type: "Support", duration: "12m", outcome: "Resolved", agent: "Sarah Johnson" },
        { date: "2024-01-10", type: "Sales", duration: "8m", outcome: "Follow-up", agent: "Mike Wilson" },
        { date: "2024-01-05", type: "Technical", duration: "25m", outcome: "Escalated", agent: "Emily Davis" }
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
      tags: ["creative", "recurring"],
      notes: "Frequent user, works in design industry",
      avatar: "SM",
      joinDate: "2023-08-22",
      callHistory: [
        { date: "2024-01-12", type: "Billing", duration: "6m", outcome: "Resolved", agent: "John Smith" },
        { date: "2024-01-08", type: "Support", duration: "15m", outcome: "Resolved", agent: "Lisa Brown" }
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
      tags: ["startup", "potential"],
      notes: "Interested in upgrading to premium plan",
      avatar: "MC",
      joinDate: "2024-01-01",
      callHistory: [
        { date: "2024-01-14", type: "Sales", duration: "22m", outcome: "Interested", agent: "Mike Wilson" },
        { date: "2024-01-02", type: "Onboarding", duration: "18m", outcome: "Completed", agent: "David Lee" }
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
      tags: ["consulting", "high-value"],
      notes: "Previously very active, may need re-engagement",
      avatar: "LR",
      joinDate: "2022-11-10",
      callHistory: [
        { date: "2023-12-20", type: "Support", duration: "9m", outcome: "Resolved", agent: "Emily Davis" },
        { date: "2023-12-15", type: "Account Review", duration: "35m", outcome: "Renewed", agent: "Sarah Johnson" }
      ]
    }
  ];

  const opportunities = [
    {
      id: "OPP001",
      customerName: "Michael Chen",
      title: "Premium Plan Upgrade",
      value: "$2,400",
      stage: "Negotiation",
      probability: 75,
      closeDate: "2024-02-15",
      lastActivity: "Demo scheduled"
    },
    {
      id: "OPP002",
      customerName: "John Anderson",
      title: "Enterprise Add-ons",
      value: "$5,000",
      stage: "Proposal",
      probability: 60,
      closeDate: "2024-03-01",
      lastActivity: "Proposal sent"
    },
    {
      id: "OPP003",
      customerName: "TechStart Inc",
      title: "New Account",
      value: "$8,500",
      stage: "Discovery",
      probability: 40,
      closeDate: "2024-02-28",
      lastActivity: "Needs assessment"
    }
  ];

  const filteredCustomers = customers.filter(customer => {
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

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "potential": return "bg-blue-100 text-blue-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case "premium": return "bg-purple-100 text-purple-800";
      case "standard": return "bg-blue-100 text-blue-800";
      case "basic": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Customer CRM</h1>
            <p className="text-blue-100">Manage customer relationships and track interactions</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{customers.length}</div>
              <div className="text-blue-100">Total Customers</div>
            </div>
            <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              <Plus size={16} className="mr-2" />
              Add Customer
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Customers", value: customers.filter(c => c.status === "active").length, color: "green" },
          { label: "Premium Tier", value: customers.filter(c => c.tier === "premium").length, color: "purple" },
          { label: "Avg Satisfaction", value: "4.4/5", color: "yellow" },
          { label: "Total Revenue", value: "$37.5K", color: "blue" }
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="customers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-6">
          {/* Search and Filters */}
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
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Customer List */}
            <div className="lg:col-span-2 space-y-4">
              {sortedCustomers.map((customer) => (
                <Card 
                  key={customer.id} 
                  className={`hover:shadow-lg transition-shadow cursor-pointer ${
                    selectedCustomer?.id === customer.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedCustomer(customer)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {customer.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                          <p className="text-sm text-gray-600">{customer.company}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getStatusColor(customer.status)}>
                              {customer.status}
                            </Badge>
                            <Badge className={getTierColor(customer.tier)}>
                              {customer.tier}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="text-yellow-500" size={14} />
                          <span className="text-sm">{customer.satisfaction}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Phone size={14} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mail size={14} />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Total Calls:</span>
                        <div className="font-medium">{customer.totalCalls}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Total Spent:</span>
                        <div className="font-medium">{customer.totalSpent}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Contact:</span>
                        <div className="font-medium">{customer.lastContact}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Location:</span>
                        <div className="font-medium">{customer.location}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {customer.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Customer Details */}
            <div className="space-y-4">
              {selectedCustomer ? (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="text-blue-600" size={20} />
                        Customer Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <Avatar className="h-16 w-16 mx-auto mb-3">
                          <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                            {selectedCustomer.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold text-lg">{selectedCustomer.name}</h3>
                        <p className="text-gray-600">{selectedCustomer.company}</p>
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
                        <h4 className="font-medium mb-2">Notes</h4>
                        <p className="text-sm text-gray-700">{selectedCustomer.notes}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Edit size={14} className="mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare size={14} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Call History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedCustomer.callHistory.map((call, index) => (
                          <div key={index} className="p-3 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline">{call.type}</Badge>
                              <span className="text-xs text-gray-500">{call.date}</span>
                            </div>
                            <div className="text-sm space-y-1">
                              <div className="flex justify-between">
                                <span>Duration: {call.duration}</span>
                                <span>Agent: {call.agent}</span>
                              </div>
                              <div>
                                <Badge variant={call.outcome === "Resolved" ? "default" : "secondary"} className="text-xs">
                                  {call.outcome}
                                </Badge>
                              </div>
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
                    <Users size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>Select a customer to view details</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunities.map((opportunity) => (
                  <div key={opportunity.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{opportunity.title}</h3>
                        <p className="text-sm text-gray-600">{opportunity.customerName}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">{opportunity.value}</div>
                        <div className="text-sm text-gray-500">{opportunity.probability}% probability</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{opportunity.stage}</Badge>
                      <div className="text-sm text-gray-600">
                        Close: {opportunity.closeDate}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-700">
                      Last activity: {opportunity.lastActivity}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["Active", "Potential", "Inactive"].map((status) => {
                    const count = customers.filter(c => c.status === status.toLowerCase()).length;
                    const percentage = (count / customers.length) * 100;
                    return (
                      <div key={status} className="flex items-center justify-between">
                        <span className="text-sm">{status}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                status === "Active" ? "bg-green-500" :
                                status === "Potential" ? "bg-blue-500" : "bg-gray-500"
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tier Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["Premium", "Standard", "Basic"].map((tier) => {
                    const count = customers.filter(c => c.tier === tier.toLowerCase()).length;
                    const percentage = (count / customers.length) * 100;
                    return (
                      <div key={tier} className="flex items-center justify-between">
                        <span className="text-sm">{tier}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                tier === "Premium" ? "bg-purple-500" :
                                tier === "Standard" ? "bg-blue-500" : "bg-gray-500"
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}