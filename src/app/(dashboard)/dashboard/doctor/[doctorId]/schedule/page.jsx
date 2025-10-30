"use client";

import { Calendar, Clock, Video, User } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import UseAuth from "@/app/Hooks/UseAuth";
import { useParams } from "next/navigation";

export default function Schedule() {
  const { doctorId } = useParams();
  const { user } = UseAuth();
  const [appointments, setAppointments] = useState([]);
  const [meetingLinks, setMeetingLinks] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // ✅ Fetch today's schedule
  useEffect(() => {
    if (!doctorId) return;

    async function fetchData() {
      try {
        const res = await fetch(`/api/doctor-appointments/${doctorId}`);
        const data = await res.json();

        const todayName = new Date().toLocaleDateString("en-US", {
          weekday: "long",
        });

        const todayAppointments = (data.appointments || [])
          .filter((appt) =>
            appt.bookedSlot?.toLowerCase().includes(todayName.toLowerCase())
          )
          .sort((a, b) => a.serialNo - b.serialNo);

        setAppointments(todayAppointments);

        const meetRes = await fetch(`/api/doctors-slots/${doctorId}`);
        const meetData = await meetRes.json();
        setMeetingLinks(meetData?.meetLink || {});
      } catch (err) {
        console.error("Error fetching schedule:", err);
      }
    }

    fetchData();
  }, [doctorId]);

  // ✅ Update appointment status
  const handleUpdateStatus = async (userId, serialNo, newStatus) => {
    try {
      await axios.put(`/api/doc-appointments-status/${userId}/${serialNo}`, {
        status: newStatus,
      });

      setAppointments((prev) =>
        prev.map((appt) =>
          appt.userId === userId && appt.serialNo === serialNo
            ? { ...appt, status: newStatus }
            : appt
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // ✅ Pagination logic
  const totalPages = Math.ceil(appointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAppointments = appointments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  // ✅ Status Badge Component
  const StatusBadge = ({ status }) => {
    const base =
      "px-3 py-1 text-xs rounded-full font-semibold text-white transition-all";
    if (status === "completed")
      return <span className={`${base} bg-green-600`}>Completed</span>;
    if (status === "in-progress")
      return (
        <span
          className={`${base} bg-gradient-to-r from-yellow-400 to-orange-500 shadow-md animate-pulse`}
        >
          In Progress...
        </span>
      );
    return <span className={`${base} bg-blue-600`}>Upcoming</span>;
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:ml-5">
      {/* ✅ Analytics Section */}
      <div className="mt-6 p-6 rounded-xl shadow-md border border-[var(--dashboard-border)] bg-[var(--sidebar-bg)] transition-colors">
        <h2 className="text-lg font-semibold text-[var(--text-color-all)] mb-6">
          Analytics Overview
        </h2>

        {/* ✅ Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total"
            value={appointments.length}
            gradient="from-[var(--color-primary)] to-[var(--color-gradient)]"
          />
          <StatsCard
            title="Completed"
            value={appointments.filter((a) => a.status === "completed").length}
            gradient="from-green-500 to-green-600 dark:from-green-400 dark:to-green-500"
          />
          <StatsCard
            title="In Progress"
            value={
              appointments.filter((a) => a.status === "in-progress").length
            }
            gradient="from-[var(--dashboard-blue)] to-[var(--color-primary)]"
          />
          <StatsCard
            title="Upcoming"
            value={appointments.filter((a) => a.status === "upcoming").length}
            gradient="from-gray-400 to-gray-500 dark:from-gray-300 dark:to-gray-400"
          />
        </div>

        {/* ✅ Progress Bar */}
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
          Today’s Progress
        </p>

        <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--dashboard-blue)] to-[var(--color-primary)] transition-all duration-500"
            style={{
              width:
                (appointments.filter((a) => a.status === "completed").length /
                  (appointments.length || 1)) *
                  100 +
                "%",
            }}
          ></div>
        </div>
      </div>

      {/* ✅ Today's Schedule */}
      <div className="bg-[var(--sidebar-bg)] text-[var(--text-color-all)] rounded-xl p-6 shadow-md border border-[var(--dashboard-border)]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Calendar className="w-5 h-5" />
            Today's Schedule
          </h2>
        </div>

        <div className="space-y-4">
          {appointments.length === 0 ? (
            <p className="text-sm text-gray-400">No appointments today.</p>
          ) : (
            currentAppointments.map((item, i) => {
              const day = item.bookedSlot?.split("-")[0]?.toLowerCase();
              const meetUrl = meetingLinks?.[day] || "#";
              const serial = startIndex + i + 1; // ✅ serial number

              return (
                <div
                  key={i}
                  className="flex justify-between items-center bg-[var(--sidebar-bg)] rounded-xl p-4 border border-[var(--dashboard-border)] hover:bg-[var(--bg-color-all)] hover:shadow-md transition-all duration-200"
                >
                  {/* Left Side */}
                  <div className="flex items-center gap-3">
                    <div className="bg-[var(--color-primary)] p-2 rounded-full shadow-sm">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.patientName}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                        <Clock className="w-4 h-4" />
                        <span>{item.bookedSlot?.split("-")[1]}</span>
                      </div>
                      {/* <div className="text-xs mt-1">Serial No: {item.serialNo}</div> */}
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="flex flex-wrap items-center gap-2 justify-end">
                    <StatusBadge status={item.status} />

                    {item.status === "upcoming" && (
                      <button
                        className="btn btn-sm bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-700 border-none text-white transition-all"
                        onClick={() =>
                          handleUpdateStatus(
                            item.userId,
                            item.serialNo,
                            "in-progress"
                          )
                        }
                      >
                        Start Meeting
                      </button>
                    )}

                    {item.status === "in-progress" && (
                      <>
                        <a
                          href={meetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-gradient)] border-none text-white flex items-center gap-1 shadow-sm hover:shadow-lg transition-all"
                        >
                          <Video className="w-4 h-4" /> Join
                        </a>
                        <button
                          className="btn btn-sm bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 border-none text-white"
                          onClick={() =>
                            handleUpdateStatus(
                              item.userId,
                              item.serialNo,
                              "completed"
                            )
                          }
                        >
                          Complete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ✅ Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-[var(--bg-color-all)] hover:bg-[var(--color-primary)] hover:text-white disabled:opacity-50 transition-all"
            >
              Prev
            </button>

            <span className="px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-gradient)] text-white font-semibold shadow-md">
              Page {currentPage} / {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-[var(--bg-color-all)] hover:bg-[var(--color-primary)] hover:text-white disabled:opacity-50 transition-all"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ✅ Small Stats Card Component
function StatsCard({ title, value, gradient }) {
  return (
    <div className="rounded-xl p-4 bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] shadow-sm transition-all hover:shadow-md">
      <div
        className={`rounded-lg px-4 py-3 text-center bg-gradient-to-r ${gradient}`}
      >
        <p className="text-xs font-medium text-white/80">{title}</p>
        <p className="text-xl font-bold text-white mt-1">{value}</p>
      </div>
    </div>
  );
}
