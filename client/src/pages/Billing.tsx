
import { useState } from "react";
import { CreditCard, Download, Star, Check, Zap, Crown, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Billing() {
  const [billingPeriod, setBillingPeriod] = useState("monthly");

  const plans = [
    {
      name: "Starter",
      icon: Zap,
      price: billingPeriod === "monthly" ? 29 : 290,
      period: billingPeriod === "monthly" ? "/month" : "/year",
      description: "Perfect for small businesses getting started with AI calls",
      features: [
        "500 AI calls per month",
        "2 AI agents",
        "Basic analytics",
        "Email support",
        "Call recordings",
        "Basic transcripts"
      ],
      color: "from-blue-500 to-cyan-500",
      popular: false
    },
    {
      name: "Professional",
      icon: Crown,
      price: billingPeriod === "monthly" ? 99 : 990,
      period: billingPeriod === "monthly" ? "/month" : "/year",
      description: "Advanced features for growing businesses",
      features: [
        "2,500 AI calls per month",
        "10 AI agents",
        "Advanced analytics & reporting",
        "Priority support",
        "Call recordings & transcripts",
        "Sentiment analysis",
        "Call scoring",
        "Custom integrations",
        "Team management"
      ],
      color: "from-purple-500 to-pink-500",
      popular: true,
      current: true
    },
    {
      name: "Enterprise",
      icon: Rocket,
      price: billingPeriod === "monthly" ? 299 : 2990,
      period: billingPeriod === "monthly" ? "/month" : "/year",
      description: "Complete solution for large organizations",
      features: [
        "Unlimited AI calls",
        "Unlimited AI agents",
        "Enterprise analytics",
        "24/7 dedicated support",
        "Advanced security",
        "Custom AI training",
        "API access",
        "White-label options",
        "Custom integrations",
        "SLA guarantee"
      ],
      color: "from-orange-500 to-red-500",
      popular: false
    }
  ];

  const usageHistory = [
    { month: "January 2024", calls: 1847, cost: 99.00, plan: "Professional" },
    { month: "December 2023", calls: 2156, cost: 99.00, plan: "Professional" },
    { month: "November 2023", calls: 1923, cost: 99.00, plan: "Professional" },
    { month: "October 2023", calls: 1654, cost: 99.00, plan: "Professional" },
    { month: "September 2023", calls: 1432, cost: 99.00, plan: "Professional" }
  ];

  const paymentHistory = [
    { date: "Jan 15, 2024", amount: 99.00, status: "Paid", invoice: "INV-2024-001" },
    { date: "Dec 15, 2023", amount: 99.00, status: "Paid", invoice: "INV-2023-012" },
    { date: "Nov 15, 2023", amount: 99.00, status: "Paid", invoice: "INV-2023-011" },
    { date: "Oct 15, 2023", amount: 99.00, status: "Paid", invoice: "INV-2023-010" },
    { date: "Sep 15, 2023", amount: 99.00, status: "Paid", invoice: "INV-2023-009" }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Plans</h1>
        <p className="text-gray-600">Manage your subscription, usage, and payment history</p>
      </div>

      <Tabs defaultValue="plans" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="plans">Plans & Pricing</TabsTrigger>
          <TabsTrigger value="usage">Usage History</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-8">
          {/* Current Plan Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="text-purple-500" size={24} />
                Current Plan: Professional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Monthly Cost</p>
                  <p className="text-2xl font-bold text-gray-900">$99.00</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Calls This Month</p>
                  <p className="text-2xl font-bold text-gray-900">1,847</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Next Billing</p>
                  <p className="text-2xl font-bold text-gray-900">Feb 15, 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing Period Toggle */}
          <div className="flex justify-center">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  billingPeriod === "monthly"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  billingPeriod === "yearly"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Yearly (Save 20%)
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card key={plan.name} className={`relative ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4`}>
                    <plan.icon className="text-white" size={24} />
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-gray-900">
                    ${plan.price}
                    <span className="text-lg font-normal text-gray-600">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="text-green-500 mr-3 flex-shrink-0" size={16} />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${
                      plan.current 
                        ? 'bg-gray-100 text-gray-600 cursor-not-allowed' 
                        : `bg-gradient-to-r ${plan.color} hover:shadow-lg`
                    }`}
                    disabled={plan.current}
                  >
                    {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Usage History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">AI Calls</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {usageHistory.map((usage, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{usage.month}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{usage.calls.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm">
                          <Badge variant="outline">{usage.plan}</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">${usage.cost.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paymentHistory.map((payment, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{payment.date}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">${payment.amount.toFixed(2)}</td>
                        <td className="px-6 py-4 text-sm">
                          <Badge className="bg-green-100 text-green-800">{payment.status}</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{payment.invoice}</td>
                        <td className="px-6 py-4 text-sm">
                          <Button variant="ghost" size="sm">
                            <Download size={14} className="mr-2" />
                            Download
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
