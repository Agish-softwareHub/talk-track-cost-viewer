
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Activity, 
  FileText, 
  Settings, 
  BarChart, 
  Clock,
  ChevronLeft,
  ChevronRight,
  Bot,
  Chrome,
  MessageCircle,
  TrendingUp,
  Users,
  Phone,
  Calendar,
  Shield,
  Zap,
  Brain,
  Target
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard, color: "from-blue-500 to-cyan-500" },
  { title: "Call Reports", url: "/reports", icon: BarChart, color: "from-purple-500 to-pink-500" },
  { title: "Call Details", url: "/details", icon: Activity, color: "from-green-500 to-emerald-500" },
  { title: "Transcripts", url: "/transcripts", icon: FileText, color: "from-orange-500 to-red-500" },
  { title: "Analytics", url: "/analytics", icon: TrendingUp, color: "from-indigo-500 to-purple-500" },
  { title: "Call Queue", url: "/queue", icon: Phone, color: "from-teal-500 to-cyan-500" },
  { title: "Team Management", url: "/team", icon: Users, color: "from-rose-500 to-pink-500" },
  { title: "Scheduler", url: "/scheduler", icon: Calendar, color: "from-amber-500 to-orange-500" },
  { title: "Usage & Credits", url: "/credits", icon: Clock, color: "from-violet-500 to-purple-500" },
  { title: "AI Configuration", url: "/ai-config", icon: Bot, color: "from-emerald-500 to-teal-500" },
  { title: "Call Scoring", url: "/scoring", icon: Target, color: "from-blue-500 to-indigo-500" },
  { title: "Sentiment Analysis", url: "/sentiment", icon: Brain, color: "from-pink-500 to-rose-500" },
  { title: "Performance", url: "/performance", icon: Zap, color: "from-yellow-500 to-orange-500" },
  { title: "Security", url: "/security", icon: Shield, color: "from-red-500 to-pink-500" },
  { title: "Google Integration", url: "/google-integration", icon: Chrome, color: "from-blue-500 to-green-500" },
  { title: "WhatsApp Integration", url: "/whatsapp-integration", icon: MessageCircle, color: "from-green-500 to-teal-500" },
  { title: "Settings", url: "/settings", icon: Settings, color: "from-gray-500 to-slate-500" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`bg-white/95 backdrop-blur-lg border-r border-gray-200/50 shadow-xl transition-all duration-300 flex flex-col ${collapsed ? "w-16" : "w-72"}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CallAnalytics
              </h1>
              <p className="text-gray-500 text-sm mt-1">Advanced Dashboard</p>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.title}>
              <NavLink
                to={item.url}
                className={`flex items-center p-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                  isActive(item.url)
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg transform scale-105`
                    : "hover:bg-gray-50 text-gray-700 hover:text-gray-900 hover:shadow-md"
                }`}
              >
                <div className={`flex items-center justify-center w-6 h-6 rounded-lg ${
                  isActive(item.url) ? 'text-white' : `bg-gradient-to-r ${item.color} text-white`
                } flex-shrink-0`}>
                  <item.icon size={16} />
                </div>
                {!collapsed && (
                  <span className="ml-4 font-medium text-sm">{item.title}</span>
                )}
                {collapsed && (
                  <div className="absolute left-16 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 text-sm whitespace-nowrap">
                    {item.title}
                  </div>
                )}
                {isActive(item.url) && !collapsed && (
                  <div className="absolute right-3 w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200/50">
        {!collapsed && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
            <div className="text-center">
              <div className="text-xs text-gray-600 mb-1">Version 2.0.0</div>
              <div className="text-xs text-gray-500">Pro Edition</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
