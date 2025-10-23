"use client";

import { useState } from "react";
import MapView from "@/app/(dashboard)/dashboard/user/sos/MapView";
import KPIcard from "@/app/Component/UserComponent/KPIcard";
import ToDoTask from "@/app/Component/UserComponent/ToDoTask";
import UpcomingAppointment from "@/app/Component/UserComponent/UpcomingAppointment";
import { DashBoardDataContext } from "@/app/Component/UserComponent/UserDashBoardDataContext/DashboardDataContext";
import UserGoal from "@/app/Component/UserComponent/UserGoal";
import WelcomeBar from "@/app/Component/UserComponent/WelcomeBar";
import UseAuth from "@/app/Hooks/UseAuth";
import { use } from "react";

export default function UserDashboard() {
  const { userHealthStats } = use(DashBoardDataContext);
  const { user } = UseAuth();

  // 🆘 SOS State
  const [userCoords, setUserCoords] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [showMap, setShowMap] = useState(false);

  // 🚨 Handle SOS
  const handleSOS = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser");
      return;
    }

    setLoading(true);
    setMsg("Fetching your location...");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setUserCoords({ lat, lon });

        setMsg(`📍 Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)} — Sending SOS...`);

        try {
          const res = await fetch("/api/sos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lat, lon, userId: user?.uid }),
          });

          const data = await res.json();
          if (data.hospitals?.length > 0) {
            setHospitals(data.hospitals);
            setMsg("✅ SOS Sent Successfully! Nearby Hospitals Found.");
            setShowMap(true);
          } else {
            setMsg("⚠️ No hospitals found nearby.");
          }
        } catch (err) {
          console.error(err);
          setMsg("❌ Error sending SOS");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setMsg("❌ Unable to fetch location");
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-[var(--dashboard-bg)] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-3xl -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--color-primary)]/5 rounded-full blur-2xl translate-y-40 -translate-x-40"></div>

      <div className="relative z-10 w-full p-4 md:p-6 lg:p-8 space-y-8 md:space-y-12">
        {/* Welcome Section */}
        <WelcomeBar />

        {/* 🆘 SOS Section */}
        <div className="mt-6 mb-10 text-center">
          <h2 className="text-2xl font-bold mb-3 text-[var(--text-color-all)]">
            🚨 Emergency Health Assistance (SOS)
          </h2>
          <button
            onClick={handleSOS}
            disabled={loading}
            className={`bg-red-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-red-700 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending SOS..." : "Send SOS"}
          </button>
          {msg && (
            <p className="mt-3 text-[var(--text-color-all)] font-medium">
              {msg}
            </p>
          )}
        </div>

        {/* KPI Cards */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--text-color-all)]">
            Health Metrics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {userHealthStats?.map((activity) => (
              <div
                key={activity.title}
                className="transform transition-all duration-300 hover:scale-105"
              >
                <KPIcard
                  title={activity.title}
                  value={activity.value}
                  target={activity?.target}
                  color="light-green"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Activity + ToDo */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 md:gap-8 mt-10">
          <div className="lg:col-span-4">
            <UpcomingAppointment />
          </div>
          <div className="lg:col-span-2">
            <ToDoTask />
          </div>
        </div>

        {/* Goals */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-[var(--text-color-all)] mb-3">
            Recent Goals
          </h2>
          <UserGoal />
        </div>
      </div>

      {/* 🗺️ Modal Map View */}
      {showMap && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[2000] p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[500px] relative">
            <button
              onClick={() => setShowMap(false)}
              className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm"
            >
              ✕
            </button>
            <MapView userCoords={userCoords} hospitals={hospitals} />
          </div>
        </div>
      )}
    </div>
  );
}
