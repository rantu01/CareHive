"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";

export default function AppointmentsPage() {
  const { doctorId } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [total, setTotal] = useState(0);
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
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--color-primary)]/10 via-white to-transparent backdrop-blur-3xl"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[var(--color-primary)] to-teal-500 bg-clip-text text-transparent drop-shadow-sm">
          My Appointments
        </h1>

        <button
          onClick={fetchAppointments}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-medium shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
        >
          <RefreshCcw size={16} /> Refresh
        </button>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="relative overflow-hidden rounded-2xl shadow-lg p-6 text-white bg-gradient-to-r from-[var(--color-primary)] to-[#007a7a] border border-white/10 backdrop-blur-md">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.1),_transparent)]"></div>
          <h2 className="text-base sm:text-lg font-semibold mb-1 opacity-90">
            Total Appointments
          </h2>
          <div className="text-4xl sm:text-5xl font-extrabold">{total}</div>
          <p className="mt-2 opacity-80 text-sm">
            Total number of patients who booked with you.
          </p>
        </div>

        <div className="rounded-2xl shadow-lg p-6 text-white bg-gradient-to-r from-teal-600 to-[var(--color-primary)] border border-white/10 backdrop-blur-md">
          <h2 className="text-base sm:text-lg font-semibold mb-1 opacity-90">
            Upcoming Appointment
          </h2>
          <div className="text-lg sm:text-xl font-bold">
            {appointments[0]
              ? new Date(appointments[0].appointmentDate).toLocaleDateString(
                  "en-BD",
                  { dateStyle: "medium" }
                )
              : "No appointments yet"}
          </div>
          <p className="mt-1 text-sm opacity-80">Next patient schedule.</p>
        </div>

        <div className="rounded-2xl shadow-lg p-6 text-white bg-gradient-to-r from-[#006d6d] to-[var(--color-primary)] border border-white/10 backdrop-blur-md">
          <h2 className="text-base sm:text-lg font-semibold mb-1 opacity-90">
            Latest Patient
          </h2>
          <div className="text-lg sm:text-xl font-bold">
            {appointments[0]?.userId || "N/A"}
          </div>
          <p className="mt-1 text-sm opacity-80">Recently booked appointment.</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg sm:text-xl font-semibold text-[var(--color-primary)]">
            Appointment Details
          </h2>
          <span className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-0">
            Showing {appointments.length} records
          </span>
        </div>

        {appointments.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm sm:text-base">
            No appointments found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full text-sm sm:text-base">
              <thead className="text-xs sm:text-sm uppercase tracking-wider text-gray-600 bg-gray-100">
                <tr>
                  <th className="py-3 px-2 sm:px-4">#</th>
                  <th className="py-3 px-2 sm:px-4">Doctor</th>
                  <th className="py-3 px-2 sm:px-4">Specialist</th>
                  <th className="py-3 px-2 sm:px-4">Patient ID</th>
                  <th className="py-3 px-2 sm:px-4">Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a, i) => (
                  <tr
                    key={`${a.doctorId}-${i}`}
                    className="hover:bg-[var(--color-primary)]/10 transition-all duration-200"
                  >
                    <td className="py-3 px-2 sm:px-4 font-semibold text-gray-800">
                      {i + 1}
                    </td>
                    <td className="py-3 px-2 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                      {a.doctorName}
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-gray-700">
                      {a.specialist}
                    </td>
                    <td className="py-3 px-2 sm:px-4">
                      <span
                        className="px-2 py-1 sm:px-3 rounded-full text-xs font-semibold shadow-sm"
                        style={{
                          backgroundColor: "var(--color-primary)",
                          color: "#fff",
                        }}
                      >
                        {a.userId}
                      </span>
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-gray-700 whitespace-nowrap">
                      {new Date(a.appointmentDate).toLocaleString("en-BD", {
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

      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)]/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#00c2c2]/10 rounded-full blur-3xl -z-10"></div>
    </div>
  );
}
