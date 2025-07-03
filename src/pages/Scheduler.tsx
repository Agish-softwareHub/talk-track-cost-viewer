
import { useState } from "react";
import { Calendar, Clock, Plus, User, Phone, Video, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Scheduler() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const appointments = [
    {
      id: 1,
      title: "Sales Call - ABC Corp",
      time: "09:00 AM",
      duration: "30 min",
      type: "sales",
      client: "John Doe",
      phone: "+1 (555) 123-4567",
      status: "confirmed"
    },
    {
      id: 2,
      title: "Support Follow-up",
      time: "11:30 AM", 
      duration: "15 min",
      type: "support",
      client: "Jane Smith",
      phone: "+1 (555) 987-6543",
      status: "pending"
    },
    {
      id: 3,
      title: "Product Demo",
      time: "02:00 PM",
      duration: "45 min",
      type: "demo",
      client: "Tech Solutions Inc",
      phone: "+1 (555) 456-7890",
      status: "confirmed"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sales': return 'from-blue-500 to-blue-600';
      case 'support': return 'from-green-500 to-green-600';
      case 'demo': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">Call Scheduler</h1>
            <p className="text-indigo-100 text-lg">Manage your appointments and scheduled calls</p>
          </div>
          <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
            <Plus size={16} className="mr-2" />
            Schedule Call
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar size={24} className="text-indigo-600" />
            Calendar
          </h2>
          
          {/* Mini Calendar */}
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 5; // Adjust for month start
                const isToday = day === 15;
                const hasAppointment = [3, 7, 15, 22, 28].includes(day);
                
                return (
                  <button
                    key={i}
                    className={`
                      aspect-square p-2 text-sm rounded-lg transition-colors relative
                      ${day < 1 || day > 30 ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'}
                      ${isToday ? 'bg-indigo-600 text-white' : ''}
                    `}
                  >
                    {day > 0 && day <= 30 ? day : ''}
                    {hasAppointment && !isToday && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Today's Calls</span>
                <span className="font-semibold text-gray-900">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">This Week</span>
                <span className="font-semibold text-gray-900">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Next Week</span>
                <span className="font-semibold text-gray-900">8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Clock size={24} className="text-green-600" />
              Today's Schedule
            </h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{appointment.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {appointment.time}
                        </span>
                        <span>({appointment.duration})</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${getTypeColor(appointment.type)}`}>
                      <Phone size={16} className="text-white" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{appointment.client}</span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-600">{appointment.phone}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Phone size={14} className="mr-1" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline">
                        <Video size={14} className="mr-1" />
                        Meet
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Upcoming This Week</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { day: "Tomorrow", count: 4, color: "blue" },
              { day: "Wednesday", count: 3, color: "green" },
              { day: "Thursday", count: 5, color: "purple" },
              { day: "Friday", count: 2, color: "orange" },
              { day: "Saturday", count: 1, color: "pink" },
              { day: "Sunday", count: 0, color: "gray" }
            ].map((item, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 flex items-center justify-center text-white font-bold`}>
                  {item.count}
                </div>
                <p className="font-medium text-gray-900">{item.day}</p>
                <p className="text-sm text-gray-500">
                  {item.count === 0 ? 'No calls' : `${item.count} call${item.count > 1 ? 's' : ''}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
