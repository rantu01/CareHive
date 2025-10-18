"use client";

import { Calendar, Clock, Video, Phone, User } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import UseAuth from "@/app/Hooks/UseAuth";

export default function DoctorsSchedule({ doctorId }) {
  const { user } = UseAuth();
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments from API
  useEffect(() => {
    if (!doctorId) return;
    async function fetchAppointments() {
      try {
        const res = await fetch("/api/all-doctor-appointments");
        const data = await res.json();
        if (data.appointments) {
          // Filter doctor-specific + fallback status
          const doctorAppointments = data.appointments
            .filter((appt) => appt.docId === doctorId)
            .map((a) => ({
              ...a,
              status: a.status?.toLowerCase() || "upcoming",
            }))
             .sort((a, b) => a.serialNo - b.serialNo);
          setAppointments(doctorAppointments);
        }
      } catch (err) {
        console.error("Error loading appointments:", err);
      }
    }
    fetchAppointments();
  }, [doctorId]);

  // Update appointment status
  const handleUpdateStatus = async (userId, serialNo, newStatus) => {
    try {
      await axios.put(`/api/doc-appointments-status/${userId}/${serialNo}`, {
        status: newStatus,
      });

      // Update frontend instantly
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

  const handleReplyRedirect = () => {
    router.push("/dashboard/doctor/messages");
  };

  // Status Badge component
  const StatusBadge = ({ status }) => {
    let color = "bg-gray-500";
    if (status === "completed") color = "bg-green-600";
    else if (status === "in-progress") color = "bg-gray-600";
    else if (status === "upcoming") color = "bg-blue-600";

    return (
      <span className={`px-3 py-1 text-xs rounded-full text-white ${color}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Today's Schedule */}
      <div className="lg:col-span-2 bg-[var(--sidebar-bg)] text-[var(--text-color-all)] rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-[var(--text-color-all)]">
            <Calendar className="w-5 h-5" />
            Today's Schedule
          </h2>
          <button className="btn btn-sm rounded-lg bg-[var(--color-primary)] hover:bg-[#18cfcf] border-none text-white">
            View Calendar
          </button>
        </div>

        <div className="space-y-4">
          {appointments.length === 0 ? (
            <p className="text-sm text-gray-400">No appointments today.</p>
          ) : (
            appointments.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-[var(--sidebar-bg)] rounded-xl p-4 border border-[var(--dashboard-border)] hover:bg-[var(--bg-color-all)]"
              >
                {/* Left info */}
                <div className="flex items-center gap-3">
                  <div className="bg-[var(--color-primary)] p-2 rounded-full">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.patientName}</h3>
                    <p className="text-sm text-gray-400">{item.meetingType}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                      <Clock className="w-4 h-4" />
                      <span>{item.bookedSlot?.split("-")[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Right: status & actions */}
                <div className="flex items-center gap-2">
                  <StatusBadge status={item.status} />

                  {/* Upcoming → Start Consultation button */}
                  {item.status === "upcoming" && (
                    <button
                      className="btn btn-sm bg-gray-700 hover:bg-gray-600 border-none text-white"
                      onClick={() =>
                        handleUpdateStatus(item.userId, item.serialNo, "in-progress")
                      }
                    >
                      Start Consultation
                    </button>
                  )}

                  {/* In-progress → Complete + Join button */}
                  {item.status === "in-progress" && (
                    <>
                      <button
                        className="btn btn-sm bg-green-600 hover:bg-green-700 border-none text-white"
                        onClick={() =>
                          handleUpdateStatus(item.userId, item.serialNo, "completed")
                        }
                      >
                        Complete
                      </button>
                      <button className="btn btn-sm bg-[var(--color-primary)] hover:bg-[#18cfcf] border-none text-white flex items-center gap-1">
                        <Video className="w-4 h-4" /> Join
                      </button>
                    </>
                  )}

                  {/* Upcoming / Video & Phone buttons (optional) */}
                  {item.status === "upcoming" && (
                    <>
                      <button className="btn btn-sm bg-gray-700 hover:bg-gray-600 border-none text-white">
                        <Video className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Patient Messages */}
      <PatientMessages handleReplyRedirect={handleReplyRedirect} />
    </div>
  );
}

// Patient Messages component
function PatientMessages({ handleReplyRedirect }) {
  const { user } = UseAuth();
  const router = useRouter();
  const [messagesData, setMessagesData] = useState([]);

  useEffect(() => {
    if (!user?.email) return;
    axios
      .get(`/api/messages?doctorEmail=${user.email}`)
      .then((res) => setMessagesData(res.data))
      .catch((err) => console.error("Error loading messages:", err));
  }, [user]);

  const latestMessages = messagesData.slice(-3).reverse();

  return (
    <div className="bg-[var(--sidebar-bg)] text-[var(--text-color-all)] rounded-xl p-6 shadow-md flex flex-col">
      <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
        Patient Messages
      </h2>

      <div className="space-y-4 flex-1">
        {latestMessages.length === 0 ? (
          <p className="text-sm text-gray-400">No messages yet.</p>
        ) : (
          latestMessages.map((msg, i) => (
            <div
              key={i}
              className="bg-[var(--bg-color-all)] rounded-xl p-4 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{msg.senderEmail}</h3>
                <span className="text-xs text-[var(--text-color-all)]">
                  {new Date(msg.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-[var(--text-color-all)]">{msg.message}</p>
              <button
                onClick={handleReplyRedirect}
                className="self-start btn btn-xs rounded-lg bg-blue-600 hover:bg-blue-700 border-none text-white"
              >
                Reply
              </button>
            </div>
          ))
        )}
      </div>

      {messagesData.length > 3 && (
        <button
          onClick={() => router.push("/dashboard/doctor/messages")}
          className="mt-4 btn btn-sm bg-gray-700 hover:bg-gray-600 border-none text-white"
        >
          View All Messages
        </button>
      )}
    </div>
  );
}
