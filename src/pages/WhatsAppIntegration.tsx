
import { useState } from "react";
import { MessageCircle, Phone, QrCode, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function WhatsAppIntegration() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    if (!phoneNumber || !businessName) {
      toast({
        title: "Missing Information",
        description: "Please provide both phone number and business name.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setShowQRCode(true);
    
    try {
      // Simulate QR code generation and connection process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setIsConnected(true);
      setShowQRCode(false);
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
      setShowQRCode(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setPhoneNumber("");
    setBusinessName("");
    toast({
      title: "Disconnected",
      description: "WhatsApp integration has been disconnected.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <MessageCircle className="text-green-600" size={32} />
            WhatsApp Integration
          </h1>
          <p className="text-gray-600 mt-2">
            Connect WhatsApp to enable messaging and call notifications
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

      {/* Connection Status */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Connection Status</h2>
        {isConnected ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600" size={24} />
              <div>
                <h3 className="font-medium text-green-900">WhatsApp Business Connected</h3>
                <p className="text-green-700 text-sm">Your business account is connected and ready to use.</p>
                <p className="text-green-600 text-sm mt-1">Business: {businessName} • Phone: {phoneNumber}</p>
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
                <p className="text-gray-600 text-sm">Connect your WhatsApp Business account to enable messaging features.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Setup Form */}
      {!isConnected && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">WhatsApp Business Setup</h2>
          
          <div className="space-y-6">
            {/* Instructions */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-900 mb-2">Setup Instructions</h3>
              <ol className="text-sm text-green-800 space-y-1 list-decimal list-inside">
                <li>Make sure you have WhatsApp Business installed on your phone</li>
                <li>Enter your business details below</li>
                <li>Click "Connect WhatsApp" and scan the QR code with your phone</li>
                <li>Follow the verification process</li>
              </ol>
            </div>

            {/* Form */}
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="business-name">Business Name</Label>
                <Input
                  id="business-name"
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Your business name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone-number">Phone Number</Label>
                <Input
                  id="phone-number"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1234567890"
                />
                <p className="text-sm text-gray-500">
                  Include country code (e.g., +1 for US)
                </p>
              </div>
            </div>

            {/* QR Code Section */}
            {showQRCode && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                <QrCode className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="font-medium text-gray-900 mb-2">Scan with WhatsApp</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Open WhatsApp on your phone and scan this QR code to connect
                </p>
                {/* Placeholder for actual QR code */}
                <div className="w-48 h-48 mx-auto bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <QrCode className="mx-auto text-gray-400 mb-2" size={64} />
                    <p className="text-sm text-gray-500">QR Code appears here</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Waiting for connection...
                </p>
              </div>
            )}

            {/* Connect Button */}
            <Button onClick={handleConnect} disabled={isLoading || showQRCode} className="bg-green-600 hover:bg-green-700">
              <MessageCircle size={16} className="mr-2" />
              {isLoading ? "Connecting..." : "Connect WhatsApp"}
            </Button>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">WhatsApp Features</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { 
              name: "Automated Notifications", 
              description: "Send call summaries and follow-ups",
              icon: Phone,
              enabled: isConnected 
            },
            { 
              name: "Customer Updates", 
              description: "Notify customers about appointment changes",
              icon: MessageCircle,
              enabled: isConnected 
            },
            { 
              name: "Team Notifications", 
              description: "Alert team members about important calls",
              icon: CheckCircle,
              enabled: isConnected 
            },
            { 
              name: "Two-way Messaging", 
              description: "Receive and respond to customer messages",
              icon: MessageCircle,
              enabled: isConnected 
            },
          ].map((feature) => (
            <div 
              key={feature.name}
              className={`p-4 rounded-lg border ${
                feature.enabled 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <feature.icon className={feature.enabled ? 'text-green-600' : 'text-gray-400'} size={20} />
                <h3 className="font-medium text-gray-900">{feature.name}</h3>
              </div>
              <p className="text-sm text-gray-600">{feature.description}</p>
              <div className="flex items-center gap-2 mt-2">
                {feature.enabled ? (
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
