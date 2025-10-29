"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, MessageCircle, Stethoscope } from "lucide-react";
import axios from "axios";
import UseAuth from "@/app/Hooks/UseAuth";
import { useRouter } from "next/navigation";


export default function Header({ doctorId }) {
  const [greeting, setGreeting] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const { user } = UseAuth();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);

  const [stats, setStats] = useState({
    totalAppointments: 0,
    completed: 0,
    inProgress: 0,
    upcoming: 0,
  });

  const todayDate = new Date();
  const todayFormatted = todayDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Greeting logic
  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting("Good Morning");
      else if (hour < 17) setGreeting("Good Afternoon");
      else if (hour < 20) setGreeting("Good Evening");
      else setGreeting("Good Night");
    };
    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

// ✅ Fetch patient messages count for badge
const [pendingCount, setPendingCount] = useState(0);
useEffect(() => {
  if (!user?.email) return;

  axios
    .get(`/api/messages?doctorEmail=${user.email}`)
    .then((res) => {
      const allMsgs = res.data || [];

      const pending = allMsgs.filter(
        (msg) =>
          msg.senderEmail !== user.email &&        // ✅ Only patient messages
          (!msg.reply || msg.reply.trim() === "")  // ✅ Not replied yet
      ).length;

      setPendingCount(pending);
    })
    .catch((err) => console.error("Message Count Error:", err));
}, [user]);



  // ✅ Fetch doctor info + stats
  useEffect(() => {
    if (!doctorId) return;

    async function fetchData() {
      try {
        const res = await fetch(`/api/doctor-appointments/${doctorId}`);
        const data = await res.json();
        const appointments = data.appointments || [];

        if (appointments.length > 0) {
          setDoctorName(appointments[0].doctorName || "Doctor");
        }

        // ✅ Today by Day Name (not Date)
        const todayDayName = new Date()
          .toLocaleDateString("en-US", { weekday: "long" })
          .toLowerCase();

        const todayAppointments = appointments.filter((appt) =>
          appt.bookedSlot?.toLowerCase().includes(todayDayName)
        );

        const completed = todayAppointments.filter(
          (a) => a.status?.toLowerCase() === "completed"
        ).length;

        const inProgress = todayAppointments.filter(
          (a) => a.status?.toLowerCase() === "in-progress"
        ).length;

        const upcoming = todayAppointments.length - completed - inProgress;

        // ✅ Current month logic
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);

        const monthlyAppointments = appointments.filter((appt) => {
          const created = new Date(appt.bookedAt);
          return created >= monthStart && created < monthEnd;
        });

        setStats({
          completed,
          inProgress,
          upcoming,
          totalAppointments: monthlyAppointments.length, // ✅ Changed ✅
        });
      } catch (error) {
        console.error("Header Data Fetch Error:", error);
      }
    }

    fetchData();
  }, [doctorId]);

  // Helper for animated dot
  const AnimatedDot = ({ color }) => (
    <span className="relative flex w-3 h-3">
      <span
        className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${color}`}
      ></span>
      <span
        className={`relative inline-flex rounded-full h-3 w-3 ${color}`}
      ></span>
    </span>
  );

  return (
    <div className="bg-gradient-to-r from-[var(--color-primary)] to-cyan-400 p-6 rounded-xl shadow-md text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left Section */}
        <div>
          <div className="flex items-center gap-4">
            <button className="py-2 px-3 bg-[#4da9f9] btn-md rounded-2xl">
              <Stethoscope size={28} />
            </button>
            <div>
              <h1 className="text-2xl font-bold">
                {greeting}, {doctorName || "Doctor"}!
              </h1>
              <div className="flex items-center text-sm mt-1 space-x-3">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{todayFormatted}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    {stats.totalAppointments}{" "}
                    {stats.totalAppointments === 1
                      ? "appointment scheduled in this month"
                      : "appointments scheduled in this month"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Section */}
          <div className="flex items-center space-x-6 mt-3 text-sm">
            <div className="flex items-center space-x-2">
              <AnimatedDot color="bg-green-500" />
              <span>{stats.completed} completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <AnimatedDot color="bg-yellow-500" />
              <span>{stats.inProgress} in progress</span>
            </div>
            <div className="flex items-center space-x-2">
              <AnimatedDot color="bg-blue-500" />
              <span>{stats.upcoming} upcoming</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
<button
  onClick={() => router.push("/dashboard/doctor/messages")}
  className="btn btn-md rounded-2xl relative bg-[#75cddf] border-none hover:bg-[#5fc0d2] transition-all"
>
  <MessageCircle className="w-5 h-5" />
  Messages

  {pendingCount > 0 && (
    <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-red-600 text-white rounded-full text-xs flex items-center justify-center animate-bounce shadow-lg">
      {pendingCount}
    </span>
  )}
</button>


        </div>
      </div>
    </div>
  );
}
