"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, MessageCircle, Stethoscope } from "lucide-react";

export default function Header({ doctorId }) {
  const [greeting, setGreeting] = useState("");
  const [doctorName, setDoctorName] = useState("");
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

  // Fetch doctor info + appointments
  useEffect(() => {
    if (!doctorId) return;

    async function fetchData() {
      try {
        const res = await fetch(`/api/doctor-appointments/${doctorId}`);
        const data = await res.json();
        const appointments = data.appointments || [];

        // Set doctor name dynamically
        if (appointments.length > 0) {
          setDoctorName(appointments[0].doctorName || "Doctor");
        }

        // Total appointments
        const totalAppointments = appointments.length;

        // Today filter
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const todayAppointments = appointments.filter((appt) => {
          const booked = new Date(appt.bookedAt);
          return booked >= today && booked < tomorrow;
        });

        // Status counts
        const completed = todayAppointments.filter(
          (appt) => appt.status?.toLowerCase() === "completed"
        ).length;
        const inProgress = todayAppointments.filter(
          (appt) => appt.status?.toLowerCase() === "in-progress"
        ).length;
        const upcoming = todayAppointments.length - completed - inProgress;

        setStats({
          totalAppointments,
          completed,
          inProgress,
          upcoming,
        });
      } catch (err) {
        console.error("Failed to fetch header data:", err);
      }
    }

    fetchData();
  }, [doctorId]);

  // Helper for animated dot
  const AnimatedDot = ({ color }) => (
    <span className="relative flex w-3 h-3">
      <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${color}`}></span>
      <span className={`relative inline-flex rounded-full h-3 w-3 ${color}`}></span>
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
                      ? "appointment scheduled"
                      : "appointments scheduled"}
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
          <button className="btn btn-md rounded-2xl relative bg-[#75cddf] border-none hover:bg-[#5fc0d2]">
            <MessageCircle className="w-5 h-5" />
            Messages
            <span className="absolute top-0 right-0 -mt-1 -mr-1 w-4 h-4 bg-orange-500 text-white rounded-full text-xs flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
