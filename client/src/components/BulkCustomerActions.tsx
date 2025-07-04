
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Phone, Users, Upload, X, Bot } from "lucide-react";
import { Customer } from "@/types/customers";

interface BulkCustomerActionsProps {
  customers: Customer[];
  selectedCustomers: string[];
  onSelectionChange: (customerIds: string[]) => void;
  onBulkCall: (customerIds: string[]) => void;
  onAddCustomers: (customers: Partial<Customer>[]) => void;
}

export default function BulkCustomerActions({
  customers,
  selectedCustomers,
  onSelectionChange,
  onBulkCall,
  onAddCustomers,
}: BulkCustomerActionsProps) {
  const [showBulkAdd, setShowBulkAdd] = useState(false);
  const [bulkAddText, setBulkAddText] = useState("");
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    tier: "basic" as const,
    location: "",
  });

  const handleSelectAll = () => {
    if (selectedCustomers.length === customers.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(customers.map(c => c.id));
    }
  };

  const handleSingleCustomerAdd = () => {
    if (newCustomer.name && newCustomer.email && newCustomer.phone) {
      onAddCustomers([{
        ...newCustomer,
        id: `CUST-${Date.now()}`,
        status: "potential",
        lastContact: new Date().toISOString().split('T')[0],
        totalCalls: 0,
        totalSpent: "$0",
        satisfaction: 0,
        avatar: newCustomer.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        joinDate: new Date().toISOString().split('T')[0],
        notes: "New customer added via bulk import",
        tags: ["new-customer"],
        callHistory: []
      }]);
      setNewCustomer({
        name: "",
        email: "",
        phone: "",
        company: "",
        tier: "basic",
        location: "",
      });
    }
  };

  const handleBulkTextAdd = () => {
    const lines = bulkAddText.trim().split('\n');
    const newCustomers: Partial<Customer>[] = [];

    lines.forEach((line, index) => {
      const parts = line.split(',').map(p => p.trim());
      if (parts.length >= 3) {
        const [name, email, phone, company = "", location = ""] = parts;
        newCustomers.push({
          id: `CUST-BULK-${Date.now()}-${index}`,
          name,
          email,
          phone,
          company,
          status: "potential",
          tier: "basic",
          location,
          lastContact: new Date().toISOString().split('T')[0],
          totalCalls: 0,
          totalSpent: "$0",
          satisfaction: 0,
          avatar: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
          joinDate: new Date().toISOString().split('T')[0],
          notes: "Bulk imported customer",
          tags: ["bulk-import"],
          callHistory: []
        });
      }
    });

    if (newCustomers.length > 0) {
      onAddCustomers(newCustomers);
      setBulkAddText("");
      setShowBulkAdd(false);
    }
  };

  const handleBulkCall = () => {
    if (selectedCustomers.length > 0) {
      onBulkCall(selectedCustomers);
    }
  };

  return (
    <div className="space-y-4">
      {/* Bulk Actions Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={selectedCustomers.length === customers.length && customers.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <label htmlFor="select-all" className="text-sm font-medium">
                  Select All ({customers.length})
                </label>
              </div>
              {selectedCustomers.length > 0 && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {selectedCustomers.length} selected
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              {selectedCustomers.length > 0 && (
                <Button
                  onClick={handleBulkCall}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Selected ({selectedCustomers.length})
                </Button>
              )}

              <Dialog open={showBulkAdd} onOpenChange={setShowBulkAdd}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Bulk Add Customers
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Add Customers in Bulk
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-6">
                    {/* Single Customer Add */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Add Single Customer</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Name *</Label>
                            <Input
                              id="name"
                              value={newCustomer.name}
                              onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={newCustomer.email}
                              onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                              placeholder="john@company.com"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone *</Label>
                            <Input
                              id="phone"
                              value={newCustomer.phone}
                              onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                          <div>
                            <Label htmlFor="company">Company</Label>
                            <Input
                              id="company"
                              value={newCustomer.company}
                              onChange={(e) => setNewCustomer({...newCustomer, company: e.target.value})}
                              placeholder="Company Name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              value={newCustomer.location}
                              onChange={(e) => setNewCustomer({...newCustomer, location: e.target.value})}
                              placeholder="City, State"
                            />
                          </div>
                          <div>
                            <Label htmlFor="tier">Tier</Label>
                            <Select value={newCustomer.tier} onValueChange={(value: any) => setNewCustomer({...newCustomer, tier: value})}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="basic">Basic</SelectItem>
                                <SelectItem value="standard">Standard</SelectItem>
                                <SelectItem value="premium">Premium</SelectItem>
                                <SelectItem value="enterprise">Enterprise</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Button onClick={handleSingleCustomerAdd} className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Customer
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Bulk Text Import */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Bulk Import from Text</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="bulk-text">
                            Paste customer data (one per line)
                          </Label>
                          <p className="text-sm text-gray-600 mb-2">
                            Format: Name, Email, Phone, Company, Location
                          </p>
                          <Textarea
                            id="bulk-text"
                            value={bulkAddText}
                            onChange={(e) => setBulkAddText(e.target.value)}
                            placeholder="John Doe, john@company.com, +1-555-123-4567, Tech Corp, New York
Jane Smith, jane@startup.io, +1-555-987-6543, StartupIO, San Francisco"
                            rows={6}
                            className="font-mono text-sm"
                          />
                        </div>
                        <Button onClick={handleBulkTextAdd} className="w-full" disabled={!bulkAddText.trim()}>
                          <Upload className="h-4 w-4 mr-2" />
                          Import Customers
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Call Preview */}
      {selectedCustomers.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bot className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-medium text-blue-900">
                    AI Bulk Call Ready
                  </h3>
                  <p className="text-sm text-blue-700">
                    {selectedCustomers.length} customers selected for AI-powered calling
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-600 text-white">
                  Estimated: {selectedCustomers.length * 3}min
                </Badge>
                <Button
                  onClick={handleBulkCall}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Start AI Calls
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
