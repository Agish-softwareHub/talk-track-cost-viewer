
import { useState } from "react";
import { Clock, Activity, BarChart, Calendar } from "lucide-react";

export default function Credits() {
  const [selectedPlan, setSelectedPlan] = useState("current");
  
  const creditInfo = {
    available: 8492,
    used: 3508,
    total: 12000,
    expiryDate: "2024-02-15",
    monthlyUsage: 1247,
    dailyAverage: 41
  };

  const usageHistory = [
    { date: "2024-01-01", credits: 45, cost: "$1.35" },
    { date: "2024-01-02", credits: 38, cost: "$1.14" },
    { date: "2024-01-03", credits: 52, cost: "$1.56" },
    { date: "2024-01-04", credits: 41, cost: "$1.23" },
    { date: "2024-01-05", credits: 47, cost: "$1.41" },
  ];

  const plans = [
    {
      name: "Starter",
      credits: 5000,
      price: "$49",
      period: "month",
      features: ["5,000 credits/month", "Basic support", "30-day history"]
    },
    {
      name: "Professional",
      credits: 15000,
      price: "$129",
      period: "month",
      features: ["15,000 credits/month", "Priority support", "90-day history", "Advanced analytics"],
      current: true
    },
    {
      name: "Enterprise",
      credits: 50000,
      price: "$399",
      period: "month",
      features: ["50,000 credits/month", "24/7 support", "Unlimited history", "Custom integrations"]
    }
  ];

  const usagePercentage = (creditInfo.used / creditInfo.total) * 100;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Usage & Credits</h1>
        <p className="text-gray-600">Monitor your credit usage and manage your billing plan</p>
      </div>

      {/* Credit Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600">
              <Activity className="text-white" size={24} />
            </div>
            <span className="text-sm text-green-600 font-medium">Available</span>
          </div>
          <div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Credits Remaining</h3>
            <div className="text-2xl font-bold text-gray-900 mb-1">{creditInfo.available.toLocaleString()}</div>
            <p className="text-gray-500 text-sm">Expires {creditInfo.expiryDate}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
              <BarChart className="text-white" size={24} />
            </div>
            <span className="text-sm text-blue-600 font-medium">Used</span>
          </div>
          <div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Credits Used</h3>
            <div className="text-2xl font-bold text-gray-900 mb-1">{creditInfo.used.toLocaleString()}</div>
            <p className="text-gray-500 text-sm">This billing period</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600">
              <Calendar className="text-white" size={24} />
            </div>
            <span className="text-sm text-purple-600 font-medium">Monthly</span>
          </div>
          <div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Monthly Usage</h3>
            <div className="text-2xl font-bold text-gray-900 mb-1">{creditInfo.monthlyUsage.toLocaleString()}</div>
            <p className="text-gray-500 text-sm">Average per month</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600">
              <Clock className="text-white" size={24} />
            </div>
            <span className="text-sm text-orange-600 font-medium">Daily</span>
          </div>
          <div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Daily Average</h3>
            <div className="text-2xl font-bold text-gray-900 mb-1">{creditInfo.dailyAverage}</div>
            <p className="text-gray-500 text-sm">Credits per day</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Usage Progress */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Credit Usage Progress</h2>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Current Usage</span>
              <span className="font-semibold text-gray-900">{usagePercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300" 
                style={{width: `${usagePercentage}%`}}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>{creditInfo.used.toLocaleString()} used</span>
              <span>{creditInfo.total.toLocaleString()} total</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Projected monthly usage</span>
              <span className="font-semibold text-gray-900">{Math.round(creditInfo.dailyAverage * 30)} credits</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Estimated cost</span>
              <span className="font-semibold text-gray-900">${(Math.round(creditInfo.dailyAverage * 30) * 0.03).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Next renewal</span>
              <span className="font-semibold text-gray-900">{creditInfo.expiryDate}</span>
            </div>
          </div>
        </div>

        {/* Recent Usage */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Usage</h2>
          
          <div className="space-y-3">
            {usageHistory.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div>
                  <div className="font-medium text-gray-900">{new Date(day.date).toLocaleDateString()}</div>
                  <div className="text-sm text-gray-500">{day.credits} credits used</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{day.cost}</div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
            View Full History →
          </button>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Pricing Plans</h2>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-shadow duration-300">
            Upgrade Plan
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div key={index} className={`border-2 rounded-xl p-6 transition-all duration-300 ${
              plan.current 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}>
              <div className="text-center mb-6">
                {plan.current && (
                  <span className="bg-blue-500 text-white px-3 py-1 text-xs rounded-full mb-2 inline-block">
                    Current Plan
                  </span>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">{plan.price}</div>
                <div className="text-gray-600">per {plan.period}</div>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-lg font-semibold text-gray-900">{plan.credits.toLocaleString()}</div>
                <div className="text-gray-600 text-sm">credits included</div>
              </div>
              
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                plan.current
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg'
              }`}>
                {plan.current ? 'Current Plan' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
