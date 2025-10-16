"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";

export default function AppointmentsPage() {
  const { doctorId } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [total, setTotal] = useState(0);
  const [byMeetingType, setByMeetingType] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    if (!doctorId) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/doctor-appointments/${doctorId}`);
      if (!res.ok) throw new Error("Failed to fetch appointments");
      const data = await res.json();

      setAppointments(data.appointments || []);
      setTotal(data.total || 0);
      setByMeetingType(data.byMeetingType || {});
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load appointments");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [doctorId]);

  if (loading)
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="loading loading-spinner loading-lg text-[var(--color-primary)]"></div>
        <p className="mt-3 text-gray-500">Loading appointments...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        {error}
      </div>
    );

  return (
    <div className="relative p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-teal-500 bg-clip-text text-transparent">
          My Appointments
        </h1>

        <button
          onClick={fetchAppointments}
          className="flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-medium hover:scale-105 transition-all duration-200"
          style={{
            borderColor: "var(--color-primary)",
            color: "var(--color-primary)",
          }}
        >
          <RefreshCcw size={16} /> Refresh
        </button>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-2xl shadow-lg p-6 text-white bg-gradient-to-r from-[var(--color-primary)] to-[#006d6d]">
          <h2 className="text-lg font-semibold">Total Appointments</h2>
          <div className="text-5xl font-bold mt-2">{total}</div>
        </div>

        <div className="rounded-2xl shadow-lg p-6 bg-gradient-to-r from-[#009999] to-[var(--color-primary)] text-white">
          <h2 className="text-lg font-semibold">Meeting Types</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {Object.entries(byMeetingType).map(([type, count]) => (
              <span
                key={type}
                className="px-3 py-1 bg-white/20 rounded-full text-sm"
              >
                {type}: {count}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl shadow-lg p-6 bg-gradient-to-r from-[var(--color-primary)] to-[#007777] text-white">
          <h2 className="text-lg font-semibold">Latest Appointment</h2>
          <div className="mt-2 text-lg">
            {appointments[0]?.patientName || "No recent appointment"}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-[var(--color-primary)]">
            Appointment Details
          </h2>
          <span className="text-sm text-gray-500">
            {appointments.length} records
          </span>
        </div>

        {appointments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No appointments found.</div>
        ) : (
          // ✅ Responsive table wrapper with smooth horizontal scroll
          <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <table className="min-w-[800px] w-full text-sm text-gray-700">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs sm:text-sm">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Patient</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Meeting</th>
                  <th className="px-4 py-3 text-left">Slot</th>
                  <th className="px-4 py-3 text-left">Fees</th>
                  <th className="px-4 py-3 text-left">Hospital</th>
                  <th className="px-4 py-3 text-left">Booked At</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50 transition border-b border-gray-100"
                  >
                    <td className="px-4 py-3">{i + 1}</td>
                    <td className="px-4 py-3 font-medium">{a.patientName}</td>
                    <td className="px-4 py-3">{a.patientEmail}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-semibold ${
                          a.meetingType === "online"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {a.meetingType}
                      </span>
                    </td>
                    <td className="px-4 py-3">{a.bookedSlot}</td>
                    <td className="px-4 py-3">{a.fees}</td>
                    <td className="px-4 py-3">{a.hospitalName}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(a.bookedAt).toLocaleString("en-BD", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
