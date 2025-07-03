
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, XCircle, Key, Users, Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function Security() {
  const securityMetrics = [
    { title: "Security Score", value: "94/100", status: "excellent", icon: Shield, change: "+2" },
    { title: "Active Sessions", value: "23", status: "normal", icon: Users, change: "-1" },
    { title: "Failed Logins", value: "3", status: "low", icon: Lock, change: "-5" },
    { title: "Alerts Today", value: "0", status: "good", icon: AlertTriangle, change: "0" }
  ];

  const securityChecks = [
    { item: "Two-Factor Authentication", status: "enabled", critical: true },
    { item: "Password Policy", status: "enabled", critical: true },
    { item: "Session Timeout", status: "enabled", critical: false },
    { item: "IP Restrictions", status: "disabled", critical: false },
    { item: "Audit Logging", status: "enabled", critical: true },
    { item: "Data Encryption", status: "enabled", critical: true },
    { item: "Access Controls", status: "enabled", critical: true },
    { item: "Regular Backups", status: "enabled", critical: false }
  ];

  const recentActivity = [
    { type: "login", user: "Sarah Johnson", action: "Successful login", time: "2 minutes ago", risk: "low" },
    { type: "access", user: "Mike Wilson", action: "Accessed call records", time: "15 minutes ago", risk: "low" },
    { type: "failed", user: "Unknown", action: "Failed login attempt", time: "1 hour ago", risk: "medium" },
    { type: "config", user: "Admin", action: "Updated security settings", time: "2 hours ago", risk: "low" }
  ];

  const complianceStatus = [
    { standard: "GDPR", status: "compliant", score: 96 },
    { standard: "HIPAA", status: "compliant", score: 94 },
    { standard: "SOC 2", status: "compliant", score: 92 },
    { standard: "ISO 27001", status: "pending", score: 88 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">Security Center</h1>
            <p className="text-red-100 text-lg">Monitor and manage your system security</p>
          </div>
          <div className="flex items-center gap-3">
            <Shield size={48} className="text-white" />
            <div className="text-right">
              <div className="text-3xl font-bold">94%</div>
              <div className="text-red-100">Security Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${
                metric.status === 'excellent' ? 'bg-green-100' :
                metric.status === 'good' ? 'bg-blue-100' :
                metric.status === 'normal' ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                <metric.icon size={24} className={
                  metric.status === 'excellent' ? 'text-green-600' :
                  metric.status === 'good' ? 'text-blue-600' :
                  metric.status === 'normal' ? 'text-yellow-600' : 'text-red-600'
                } />
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                metric.change.startsWith('+') || metric.change === '0' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {metric.change !== '0' && (metric.change.startsWith('+') ? '+' : '')}{metric.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
            <p className="text-gray-600 font-medium">{metric.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Security Checklist */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <CheckCircle size={24} className="text-green-600" />
              Security Checklist
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {securityChecks.map((check, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    {check.status === 'enabled' ? (
                      <CheckCircle size={20} className="text-green-600" />
                    ) : (
                      <XCircle size={20} className="text-red-600" />
                    )}
                    <span className="text-gray-900 font-medium">{check.item}</span>
                    {check.critical && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                        Critical
                      </span>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    check.status === 'enabled' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {check.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Security Activity */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Activity size={24} className="text-blue-600" />
              Recent Activity
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'login' ? 'bg-blue-100' :
                    activity.type === 'access' ? 'bg-green-100' :
                    activity.type === 'failed' ? 'bg-red-100' : 'bg-purple-100'
                  }`}>
                    {activity.type === 'login' && <Users size={16} className="text-blue-600" />}
                    {activity.type === 'access' && <Eye size={16} className="text-green-600" />}
                    {activity.type === 'failed' && <Lock size={16} className="text-red-600" />}
                    {activity.type === 'config' && <Key size={16} className="text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">{activity.user}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        activity.risk === 'low' ? 'bg-green-100 text-green-700' :
                        activity.risk === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {activity.risk} risk
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Status */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Compliance Status</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceStatus.map((compliance, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  compliance.status === 'compliant' ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  {compliance.status === 'compliant' ? (
                    <CheckCircle size={32} className="text-green-600" />
                  ) : (
                    <AlertTriangle size={32} className="text-yellow-600" />
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{compliance.standard}</h3>
                <div className="space-y-2">
                  <Progress value={compliance.score} className="h-2" />
                  <p className="text-sm text-gray-600">{compliance.score}%</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    compliance.status === 'compliant' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {compliance.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Recommendations */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Security Recommendations</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-green-600">Strengths</h3>
              <ul className="space-y-2">
                {[
                  "Strong authentication system",
                  "Regular security updates",
                  "Comprehensive audit logging",
                  "Data encryption enabled"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle size={16} className="text-green-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-orange-600">Improvements</h3>
              <ul className="space-y-2">
                {[
                  "Enable IP access restrictions",
                  "Implement advanced threat detection",
                  "Schedule security training",
                  "Review user permissions"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <AlertTriangle size={16} className="text-orange-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
