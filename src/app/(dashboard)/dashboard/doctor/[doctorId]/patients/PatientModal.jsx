"use client";

import { X, Mail, Calendar, Clock, Video, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function PatientModal({ patient, onClose }) {
  if (!patient) return null;

  const history = patient.appointmentHistory || [];
  const meetingStats = history.reduce(
    (acc, curr) => {
      acc[curr.meetingType === "online" ? "online" : "offline"]++;
      return acc;
    },
    { online: 0, offline: 0 }
  );

  const chartData = [
    { name: "Online", value: meetingStats.online },
    { name: "Offline", value: meetingStats.offline },
  ];

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          key="modal"
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-100 relative flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-[var(--color-primary)] z-50"
          >
            <X size={24} />
          </button>

          {/* Header */}
          <div className="relative text-center p-8 bg-gradient-to-br from-[var(--color-primary)] via-[#008b8b] to-[#004d4d] text-white flex-shrink-0">
            <div className="absolute inset-0 opacity-20 bg-[url('/grid.svg')] bg-cover"></div>

            <img
              src={
                patient.profileImage ||
                `https://api.dicebear.com/9.x/avataaars/svg?seed=${patient.patientName}`
              }
              alt={patient.patientName}
              className="w-28 h-28 rounded-full mx-auto mb-3 border-4 border-white shadow-xl relative z-10 object-cover"
            />
            <h2 className="text-2xl font-bold relative z-10 tracking-wide drop-shadow-sm">
              {patient.patientName}
            </h2>
            <p className="text-sm opacity-90 relative z-10">
              {patient.patientEmail}
            </p>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6 overflow-y-auto flex-1">
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "User ID", value: patient.userId, icon: Mail },
                {
                  label: "Last Slot",
                  value: patient.lastBookedSlot || "N/A",
                  icon: Clock,
                },
                {
                  label: "Last Appointment",
                  value: patient.lastBookedAt
                    ? new Date(patient.lastBookedAt).toLocaleString("en-BD", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "N/A",
                  icon: Calendar,
                },
                {
                  label: "Total Visits",
                  value: patient.totalAppointments || 0,
                  icon: Video,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border bg-gray-50 hover:shadow-md transition"
                >
                  <item.icon
                    size={20}
                    className="text-[var(--color-primary)] mb-1 inline-block"
                  />
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="font-semibold text-gray-800 truncate">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="bg-gradient-to-br from-gray-50 to-white border rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-[var(--color-primary)]">
                Appointment Type Breakdown
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="name" tick={{ fill: "#555" }} />
                  <YAxis allowDecimals={false} tick={{ fill: "#555" }} />
                  <Tooltip
                    contentStyle={{
                      background: "white",
                      borderRadius: "10px",
                      border: "1px solid #eee",
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill="var(--color-primary)"
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* History */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-[var(--color-primary)]">
                Appointment History
              </h3>
              {history.length === 0 ? (
                <p className="text-sm text-gray-500">No past appointments.</p>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {history.map((a, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl border bg-gray-50 hover:bg-gray-100 hover:shadow transition"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-900">
                          {a.hospitalName}
                        </p>
                        <span
                          className={`px-2 py-1 rounded text-xs text-white ${
                            a.meetingType === "online"
                              ? "bg-blue-500"
                              : "bg-green-500"
                          }`}
                        >
                          {a.meetingType}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1 space-y-1">
                        <p>
                          <Calendar size={14} className="inline-block mr-1" />
                          {new Date(a.bookedAt).toLocaleString("en-BD", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                        <p>
                          <Clock size={14} className="inline-block mr-1" />
                          Slot: {a.bookedSlot}
                        </p>
                        <p>
                          <DollarSign size={14} className="inline-block mr-1" />
                          Fees: {a.fees} BDT
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
