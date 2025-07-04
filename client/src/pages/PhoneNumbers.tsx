
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Phone, Plus, Settings, Trash2, MapPin, Bot } from "lucide-react";
import { useRetellPhoneNumbers, useRetellAgents, useBuyPhoneNumber } from "@/hooks/useRetell";
import { retellService } from "@/services/retellService";
import { toast } from "sonner";

export default function PhoneNumbers() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedAreaCode, setSelectedAreaCode] = useState("");
  const [selectedAgentId, setSelectedAgentId] = useState("");
  
  const { data: phoneNumbers, isLoading: numbersLoading, refetch: refetchNumbers } = useRetellPhoneNumbers();
  const { data: agents, isLoading: agentsLoading } = useRetellAgents();
  const buyPhoneNumber = useBuyPhoneNumber();

  const handleBuyNumber = async () => {
    if (!selectedAreaCode) {
      toast.error("Please select an area code");
      return;
    }

    try {
      await buyPhoneNumber.mutateAsync({
        areaCode: selectedAreaCode,
        agentId: selectedAgentId || undefined
      });
      setIsCreateModalOpen(false);
      setSelectedAreaCode("");
      setSelectedAgentId("");
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  const handleDeleteNumber = async (phoneNumber: string) => {
    if (confirm(`Are you sure you want to delete ${phoneNumber}?`)) {
      try {
        await retellService.deletePhoneNumber(phoneNumber);
        toast.success("Phone number deleted successfully");
        refetchNumbers();
      } catch (error) {
        toast.error(`Failed to delete phone number: ${error.message}`);
      }
    }
  };

  const handleAssignAgent = async (phoneNumber: string, agentId: string) => {
    try {
      await retellService.updatePhoneNumber(phoneNumber, { 
        agent_id: agentId 
      });
      toast.success("Agent assigned successfully");
      refetchNumbers();
    } catch (error) {
      toast.error(`Failed to assign agent: ${error.message}`);
    }
  };

  const areaCodes = [
    { code: "212", location: "New York, NY" },
    { code: "310", location: "Los Angeles, CA" },
    { code: "415", location: "San Francisco, CA" },
    { code: "617", location: "Boston, MA" },
    { code: "312", location: "Chicago, IL" },
    { code: "713", location: "Houston, TX" },
    { code: "404", location: "Atlanta, GA" },
    { code: "206", location: "Seattle, WA" },
    { code: "305", location: "Miami, FL" },
    { code: "702", location: "Las Vegas, NV" }
  ];

  if (numbersLoading || agentsLoading) {
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
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">Phone Number Management</h1>
            <p className="text-green-100 text-lg">Manage your Retell phone numbers and agent assignments</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{phoneNumbers?.length || 0}</div>
            <div className="text-green-100">Active Numbers</div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold text-gray-900">Your Phone Numbers</h2>
          <Badge variant="secondary">{phoneNumbers?.length || 0} total</Badge>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Buy Phone Number
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Purchase New Phone Number</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="area_code">Area Code</Label>
                <Select value={selectedAreaCode} onValueChange={setSelectedAreaCode}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select area code" />
                  </SelectTrigger>
                  <SelectContent>
                    {areaCodes.map((area) => (
                      <SelectItem key={area.code} value={area.code}>
                        {area.code} - {area.location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="agent">Assign to Agent (Optional)</Label>
                <Select value={selectedAgentId} onValueChange={setSelectedAgentId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select agent or leave unassigned" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Unassigned</SelectItem>
                    {agents?.map((agent) => (
                      <SelectItem key={agent.agent_id} value={agent.agent_id}>
                        {agent.agent_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleBuyNumber}
                  disabled={buyPhoneNumber.isPending}
                >
                  {buyPhoneNumber.isPending ? "Purchasing..." : "Purchase Number"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Phone Numbers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {phoneNumbers?.map((number) => {
          const assignedAgent = agents?.find(agent => agent.agent_id === number.agent_id);
          
          return (
            <Card key={number.phone_number} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Phone className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{number.phone_number_pretty}</CardTitle>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Area {number.area_code}
                      </p>
                    </div>
                  </div>
                  <Badge variant={number.agent_id ? "default" : "secondary"}>
                    {number.agent_id ? "Assigned" : "Available"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {number.nickname && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Nickname:</span>
                      <span className="font-medium">{number.nickname}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-green-600">Active</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Added:</span>
                    <span className="font-medium">
                      {new Date(number.last_modification_timestamp * 1000).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {assignedAgent ? (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Bot className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Assigned Agent</span>
                    </div>
                    <p className="text-sm text-blue-700">{assignedAgent.agent_name}</p>
                  </div>
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">No agent assigned</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Select 
                    value={number.agent_id || ""} 
                    onValueChange={(agentId) => handleAssignAgent(number.phone_number, agentId)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Assign agent" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Unassigned</SelectItem>
                      {agents?.map((agent) => (
                        <SelectItem key={agent.agent_id} value={agent.agent_id}>
                          {agent.agent_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDeleteNumber(number.phone_number)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {(!phoneNumbers || phoneNumbers.length === 0) && (
          <div className="col-span-full text-center py-12">
            <Phone className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Phone Numbers Yet</h3>
            <p className="text-gray-600 mb-4">Purchase your first phone number to start receiving calls.</p>
            <Button onClick={() => setIsCreateModalOpen(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Buy Your First Number
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
