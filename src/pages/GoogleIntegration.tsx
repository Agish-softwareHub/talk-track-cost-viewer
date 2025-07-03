
import { useState } from "react";
import { Chrome, Key, Link, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function GoogleIntegration() {
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    if (!clientId || !clientSecret) {
      toast({
        title: "Missing Credentials",
        description: "Please provide both Client ID and Client Secret.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsConnected(true);
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

  const handleDisconnect = () => {
    setIsConnected(false);
    setClientId("");
    setClientSecret("");
    toast({
      title: "Disconnected",
      description: "Google integration has been disconnected.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Chrome className="text-blue-600" size={32} />
            Google Integration
          </h1>
          <p className="text-gray-600 mt-2">
            Connect your Google account to enable additional features
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isConnected ? (
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

      {/* Integration Status */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Connection Status</h2>
        {isConnected ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600" size={24} />
              <div>
                <h3 className="font-medium text-green-900">Google Services Connected</h3>
                <p className="text-green-700 text-sm">Your application is connected to Google services.</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={handleDisconnect}
              className="mt-4 border-red-300 text-red-600 hover:bg-red-50"
            >
              Disconnect
            </Button>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-gray-500" size={24} />
              <div>
                <h3 className="font-medium text-gray-900">Not Connected</h3>
                <p className="text-gray-600 text-sm">Connect your Google account to enable additional features.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Configuration */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Google OAuth Configuration</h2>
        
        <div className="space-y-6">
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Setup Instructions</h3>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Go to the <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
              <li>Create a new project or select an existing one</li>
              <li>Enable the APIs you need (Calendar, Gmail, Drive, etc.)</li>
              <li>Go to "Credentials" and create OAuth 2.0 Client IDs</li>
              <li>Copy the Client ID and Client Secret below</li>
            </ol>
          </div>

          {/* Form */}
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="client-id">Client ID</Label>
              <Input
                id="client-id"
                type="text"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                placeholder="Your Google OAuth Client ID"
                disabled={isConnected}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="client-secret">Client Secret</Label>
              <Input
                id="client-secret"
                type="password"
                value={clientSecret}
                onChange={(e) => setClientSecret(e.target.value)}
                placeholder="Your Google OAuth Client Secret"
                disabled={isConnected}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {!isConnected && (
              <Button onClick={handleConnect} disabled={isLoading}>
                <Link size={16} className="mr-2" />
                {isLoading ? "Connecting..." : "Connect to Google"}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Available Services */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Google Calendar", description: "Schedule and manage meetings", enabled: isConnected },
            { name: "Gmail", description: "Send follow-up emails", enabled: isConnected },
            { name: "Google Drive", description: "Store call recordings and documents", enabled: isConnected },
            { name: "Google Contacts", description: "Sync customer information", enabled: isConnected },
          ].map((service) => (
            <div 
              key={service.name}
              className={`p-4 rounded-lg border ${
                service.enabled 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <h3 className="font-medium text-gray-900">{service.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{service.description}</p>
              <div className="flex items-center gap-2 mt-2">
                {service.enabled ? (
                  <>
                    <CheckCircle className="text-green-600" size={16} />
                    <span className="text-sm text-green-600">Available</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="text-gray-400" size={16} />
                    <span className="text-sm text-gray-500">Requires connection</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
