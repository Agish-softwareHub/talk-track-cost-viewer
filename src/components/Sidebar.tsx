
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
  MessageCircle
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Call Reports", url: "/reports", icon: BarChart },
  { title: "Call Details", url: "/details", icon: Activity },
  { title: "Transcripts", url: "/transcripts", icon: FileText },
  { title: "Usage & Credits", url: "/credits", icon: Clock },
  { title: "AI Configuration", url: "/ai-config", icon: Bot },
  { title: "Google Integration", url: "/google-integration", icon: Chrome },
  { title: "WhatsApp Integration", url: "/whatsapp-integration", icon: MessageCircle },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 flex flex-col ${collapsed ? "w-16" : "w-64"}`}>
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-white">CallAnalytics</h1>
              <p className="text-slate-300 text-sm">Dashboard</p>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.title}>
              <NavLink
                to={item.url}
                className={`flex items-center p-3 rounded-lg transition-all duration-200 group ${
                  isActive(item.url)
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "hover:bg-slate-700 text-slate-300 hover:text-white"
                }`}
              >
                <item.icon size={20} className="flex-shrink-0" />
                {!collapsed && (
                  <span className="ml-3 font-medium">{item.title}</span>
                )}
                {collapsed && (
                  <div className="absolute left-16 bg-slate-800 text-white px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                    {item.title}
                  </div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        {!collapsed && (
          <div className="text-center">
            <div className="text-sm text-slate-400">Version 1.0.0</div>
          </div>
        )}
      </div>
    </div>
  );
}
