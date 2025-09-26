// components/PerformanceAndActions.js
"use client";

import { TrendingUp, Calendar, FileText, MessageSquare, Plus } from "lucide-react";

const performanceData = [
  { label: "Appointments Completed", value: "142" },
  { label: "New Patients", value: "23" },
  { label: "Patient Satisfaction", value: "96%" },
  { label: "Revenue Growth", value: "+12%", highlight: true },
];

const quickActions = [
  {
    label: "Schedule New Appointment",
    icon: Calendar,
    highlight: true,
  },
  {
    label: "View Patient Records",
    icon: FileText,
  },
  {
    label: "Send Bulk Message",
    icon: MessageSquare,
  },
  {
    label: "Add Health Article",
    icon: Plus,
  },
];

export default function PerformanceAndActions() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
      {/* Performance Section */}
      <div className="bg-[var(--sidebar-bg)] text-[var(--fourground-color)] rounded-xl p-6 shadow-md">
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
          <TrendingUp className="w-5 h-5" />
          This Month Performance
        </h2>
        <div className="space-y-3">
          {performanceData.map((item, i) => (
            <div
              key={i}
              className={`flex justify-between items-center px-4 py-3 rounded-lg bg-[var(--gray-color)] text-[var(--fourground-color)] ${
                item.highlight
                  ? " text-green-400 font-semibold"
                  : "bg-[#1e293b] text-[var(--fourground-color)]"
              }`}
            >
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[var(--sidebar-bg)] text-[var(--fourground-color)] rounded-xl p-6 shadow-md">
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
          Quick Actions
        </h2>
        <div className="space-y-3">
          {quickActions.map((action, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition bg-[var(--sidebar-bg)] border border-[var(--dashboard-border)] hover:bg-[var(--gray-color)] ${
                action.highlight
                  ? "bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  : "bg-[#1e293b] hover:bg-[#2c3a52] text-[var(--fourground-color)] "
              }`}
            >
              <action.icon className="w-5 h-5" />
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
