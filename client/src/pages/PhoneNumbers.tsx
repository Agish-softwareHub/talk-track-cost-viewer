
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Plus, Trash2, Edit, MapPin, Bot, Search } from "lucide-react";
import { retellService, RetellPhoneNumber, RetellAgent } from "@/services/retellService";
import { useToast } from "@/hooks/use-toast";

export default function PhoneNumbers() {
  const [phoneNumbers, setPhoneNumbers] = useState<RetellPhoneNumber[]>([]);
  const [agents, setAgents] = useState<RetellAgent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAreaCode, setSelectedAreaCode] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const areaCodes = [
    { code: "212", city: "New York, NY" },
    { code: "213", city: "Los Angeles, CA" },
    { code: "312", city: "Chicago, IL" },
    { code: "415", city: "San Francisco, CA" },
    { code: "617", city: "Boston, MA" },
    { code: "202", city: "Washington, DC" },
    { code: "305", city: "Miami, FL" },
    { code: "713", city: "Houston, TX" },
    { code: "206", city: "Seattle, WA" },
    { code: "404", city: "Atlanta, GA" },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [numbersData, agentsData] = await Promise.all([
        retellService.getPhoneNumbers(),
        retellService.getAgents()
      ]);
      setPhoneNumbers(numbersData);
      setAgents(agentsData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load phone numbers and agents",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyNumber = async () => {
    if (!selectedAreaCode) {
      toast({
        title: "Error",
        description: "Please select an area code",
        variant: "destructive",
      });
      return;
    }

    try {
      await retellService.buyPhoneNumber(selectedAreaCode, selectedAgent || undefined);
      toast({
        title: "Success",
        description: "Phone number purchased successfully",
      });
      setIsDialogOpen(false);
      setSelectedAreaCode("");
      setSelectedAgent("");
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to purchase phone number",
        variant: "destructive",
      });
    }
  };

  const handleAssignAgent = async (phoneNumber: string, agentId: string) => {
    try {
      await retellService.updatePhoneNumber(phoneNumber, { agent_id: agentId });
      toast({
        title: "Success",
        description: "Agent assigned successfully",
      });
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign agent",
        variant: "destructive",
      });
    }
  };

  const handleDeleteNumber = async (phoneNumber: string) => {
    try {
      await retellService.deletePhoneNumber(phoneNumber);
      toast({
        title: "Success",
        description: "Phone number deleted successfully",
      });
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete phone number",
        variant: "destructive",
      });
    }
  };

  const filteredNumbers = phoneNumbers.filter(number =>
    number.phone_number_pretty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    number.nickname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    number.area_code.includes(searchTerm)
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading phone numbers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Phone Numbers</h1>
          <p className="text-gray-600 mt-1">Manage your phone numbers and agent assignments</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Buy Number
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Purchase Phone Number</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="area-code">Area Code</Label>
                <Select value={selectedAreaCode} onValueChange={setSelectedAreaCode}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select area code" />
                  </SelectTrigger>
                  <SelectContent>
                    {areaCodes.map((area) => (
                      <SelectItem key={area.code} value={area.code}>
                        {area.code} - {area.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="agent">Assign to Agent (Optional)</Label>
                <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {agents.map((agent) => (
                      <SelectItem key={agent.agent_id} value={agent.agent_id}>
                        {agent.agent_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleBuyNumber} className="w-full">
                Purchase Number
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search phone numbers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          {filteredNumbers.length} numbers
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredNumbers.map((number) => {
          const assignedAgent = agents.find(agent => agent.agent_id === number.agent_id);
          
          return (
            <Card key={number.phone_number} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{number.phone_number_pretty}</CardTitle>
                      {number.nickname && (
                        <p className="text-sm text-gray-600">{number.nickname}</p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteNumber(number.phone_number)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Area Code: {number.area_code}</span>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Assigned Agent</Label>
                  <Select
                    value={number.agent_id || ""}
                    onValueChange={(value) => handleAssignAgent(number.phone_number, value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select agent">
                        {assignedAgent && (
                          <div className="flex items-center gap-2">
                            <Bot className="h-4 w-4" />
                            <span>{assignedAgent.agent_name}</span>
                          </div>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No agent assigned</SelectItem>
                      {agents.map((agent) => (
                        <SelectItem key={agent.agent_id} value={agent.agent_id}>
                          <div className="flex items-center gap-2">
                            <Bot className="h-4 w-4" />
                            <span>{agent.agent_name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Last modified</span>
                    <span>{new Date(number.last_modification_timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredNumbers.length === 0 && (
        <div className="text-center py-12">
          <Phone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No phone numbers found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? "No numbers match your search criteria." : "Get started by purchasing your first phone number."}
          </p>
          {!searchTerm && (
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Buy Your First Number
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
