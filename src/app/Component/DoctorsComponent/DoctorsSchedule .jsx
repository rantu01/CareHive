// components/DoctorDashboardOverview.js
"use client";

import { Calendar, Clock, Video, Phone, User } from "lucide-react";

const scheduleData = [
  {
    name: "Emily Johnson",
    type: "Follow-up",
    time: "9:00 AM",
    duration: "30 min",
    status: "completed",
  },
  {
    name: "Michael Davis",
    type: "Consultation",
    time: "10:30 AM",
    duration: "45 min",
    status: "in-progress",
  },
  {
    name: "Sarah Wilson",
    type: "Check-up",
    time: "2:00 PM",
    duration: "30 min",
    status: "upcoming",
  },
  {
    name: "Robert Brown",
    type: "Follow-up",
    time: "3:30 PM",
    duration: "30 min",
    status: "upcoming",
  },
];

const messagesData = [
  {
    name: "Anna Thompson",
    time: "2 hours ago",
    message: "Thank you for the consultation. When should I schedule the follow-up?",
  },
  {
    name: "John Smith",
    time: "4 hours ago",
    message: "I'm experiencing some side effects from the medication.",
  },
  {
    name: "Lisa Garcia",
    time: "1 day ago",
    message: "The test results look good. Thank you!",
  },
];

export default function DoctorsSchedule() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Today's Schedule */}
      <div className="lg:col-span-2 bg-[var(--sidebar-bg)] text-[var(--fourground-color)] rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-[var(--fourground-color)]">
            <Calendar className="w-5 h-5" />
            Today&apos;s Schedule
          </h2>
          <button className="btn btn-sm rounded-lg bg-blue-600 hover:bg-blue-700 border-none text-white">
            View Calendar
          </button>
        </div>

        <div className="space-y-4">
          {scheduleData.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-[var(--sidebar-bg)] rounded-xl p-4 border border-[var(--dashboard-border)] hover:bg-[var(--gray-color)]"
            >
              {/* Left section */}
              <div className="flex items-center gap-3">
                <div className="bg-[var(--dashboard-blue)] p-2 rounded-full">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-400">{item.type}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                    <Clock className="w-4 h-4" />
                    <span>{item.time}</span>
                    <span>{item.duration}</span>
                  </div>
                </div>
              </div>

              {/* Right section */}
              <div className="flex items-center gap-2">
                {item.status === "completed" && (
                  <span className="px-3 py-1 text-xs rounded-full bg-green-600 text-white">
                    completed
                  </span>
                )}
                {item.status === "in-progress" && (
                  <>
                    <span className="px-3 py-1 text-xs rounded-full bg-gray-600 text-white">
                      in-progress
                    </span>
                    <button className="btn btn-sm bg-blue-600 hover:bg-blue-700 border-none text-white flex items-center gap-1">
                      <Video className="w-4 h-4" /> Join
                    </button>
                  </>
                )}
                {item.status === "upcoming" && (
                  <>
                    <button className="btn btn-sm bg-gray-700 hover:bg-gray-600 border-none text-white">
                      <Video className="w-4 h-4" />
                    </button>
                    <button className="btn btn-sm bg-gray-700 hover:bg-gray-600 border-none text-white">
                      <Phone className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Patient Messages */}
      <div className="bg-[var(--sidebar-bg)] text-[var(--fourground-color)] rounded-xl p-6 shadow-md">
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
          Patient Messages
        </h2>
        <div className="space-y-4">
          {messagesData.map((msg, i) => (
            <div
              key={i}
              className="bg-[var(--gray-color)] rounded-xl p-4 flex flex-col gap-2 "
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{msg.name}</h3>
                <span className="text-xs text-[var(--fourground-color)]">{msg.time}</span>
              </div>
              <p className="text-sm text-[var(--fourground-color)]">{msg.message}</p>
              <button className="self-start btn btn-xs rounded-lg bg-blue-600 hover:bg-blue-700 border-none text-white">
                Reply
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
