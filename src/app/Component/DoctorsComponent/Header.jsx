// components/Header.js
"use client";
import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  MessageCircle,
  Plus,
  Stethoscope,
} from "lucide-react";

export default function Header({ doctorId }) {
  const [greeting, setGreeting] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [totalAppointments, setTotalAppointments] = useState(0);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Greeting
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

  // Fetch doctor data and appointment 
  useEffect(() => {
    if (!doctorId) return;

    async function fetchStats() {
      try {
        const res = await fetch(`/api/all-doctor-appointments`);
        const data = await res.json();
        const allAppointments = data.appointments || [];

        const doctorAppointments = allAppointments.filter(
          (appt) => appt.docId === doctorId
        );

        setTotalAppointments(doctorAppointments.length);

        // Get doctor name dynamically from first matching appointment
        if (doctorAppointments.length > 0) {
          setDoctorName(doctorAppointments[0].doctorName || "Doctor");
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    }

    fetchStats();
  }, [doctorId]);

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
                  <span>{today}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    {totalAppointments}{" "}
                    {totalAppointments === 1
                      ? "appointment scheduled"
                      : "appointments scheduled"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center space-x-4 mt-3 text-sm">
            <div className="flex items-center space-x-1">
              <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span>
              <span>2 completed</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-3 h-3 bg-yellow-500 rounded-full inline-block"></span>
              <span>1 in progress</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-3 h-3 bg-blue-500 rounded-full inline-block"></span>
              <span>5 upcoming</span>
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
          <button className="btn border-none bg-white btn-md rounded-2xl flex items-center gap-2 text-[var(--dashboard-blue)] hover:bg-[#ebf7f9]">
            <Plus className="w-4 h-4" />
            Add Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
