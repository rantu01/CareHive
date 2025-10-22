"use client";

import { Calendar, Clock, Video, User } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import UseAuth from "@/app/Hooks/UseAuth";

export default function DoctorsSchedule({ doctorId }) {
  const { user } = UseAuth();
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [meetingLinks, setMeetingLinks] = useState({});

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

  const handleReplyRedirect = () => {
    router.push("/dashboard/doctor/messages");
  };

  // ✅ Animated Status Badge
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* ✅ Today's Schedule */}
      <div className="lg:col-span-2 bg-[var(--sidebar-bg)] text-[var(--text-color-all)] rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-[var(--text-color-all)]">
            <Calendar className="w-5 h-5" />
            Today's Schedule
          </h2>

          <button
            onClick={() => router.push("/dashboard/doctor/schedule")}
            className="btn btn-sm rounded-lg bg-[var(--color-primary)] hover:bg-[#18cfcf] border-none text-white"
          >
            View Calendar
          </button>
        </div>

        <div className="space-y-4">
          {appointments.length === 0 ? (
            <p className="text-sm text-gray-400">No appointments today.</p>
          ) : (
            appointments.slice(0, 5).map((item, i) => {
              const day = item.bookedSlot?.split("-")[0]?.toLowerCase();
              const meetUrl = meetingLinks?.[day] || "#";

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
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="flex items-center gap-2">
                    <StatusBadge status={item.status} />

                    {item.status === "upcoming" && (
                      <button
                        className="btn btn-sm bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-700 border-none text-white transition-all"
                        onClick={() =>
                          handleUpdateStatus(item.userId, item.serialNo, "in-progress")
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
                          className="btn btn-sm bg-gradient-to-r from-[var(--color-primary)] to-[#18cfcf] border-none text-white flex items-center gap-1 shadow-sm hover:shadow-lg transition-all"
                        >
                          <Video className="w-4 h-4" /> Join
                        </a>
                        <button
                          className="btn btn-sm bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 border-none text-white"
                          onClick={() =>
                            handleUpdateStatus(item.userId, item.serialNo, "completed")
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

        {appointments.length > 5 && (
          <button
            onClick={() => router.push("/dashboard/doctor/schedule")}
            className="w-full mt-6 btn btn-sm rounded-lg bg-gray-700 hover:bg-gray-600 border-none text-white"
          >
            View All Appointments →
          </button>
        )}
      </div>

      <PatientMessages handleReplyRedirect={handleReplyRedirect} />
    </div>
  );
}

// 📨 Messages Sidebar
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
