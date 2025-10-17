"use client";

import { useEffect, useState } from "react";
import { Calendar, Users, DollarSign, Star } from "lucide-react";
import StatCard from "./StatCard";

export default function DashboardStats({ doctorId }) {
  console.log("stats doctorId:" , doctorId);
  
  const [stats, setStats] = useState({
    todayAppointments: 0,
    totalPatients: 0,
  });

  useEffect(() => {
    if (!doctorId) return;

    async function fetchStats() {
      try {
        const res = await fetch(`/api/all-doctor-appointments`);
        const data = await res.json();
        const allAppointments = data.appointments;

        // Doctor specific filter
        const doctorAppointments = allAppointments.filter(
          appt => appt.docId == doctorId
        );

        // Today filter
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const todayAppointments = doctorAppointments.filter(appt => {
          const booked = new Date(appt.bookedAt);
          return booked >= today && booked < tomorrow;
        }).length;

        // Total unique patients
        const patientIds = new Set(doctorAppointments.map(appt => appt.userId));
        const totalPatients = patientIds.size;

        setStats({ todayAppointments, totalPatients });
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    }

    fetchStats();
  }, [doctorId]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
      <StatCard
        title="Today's Appointments"
        value={stats.todayAppointments}
        icon={Calendar}
      />

      <StatCard
        title="Total Patients"
        value={stats.totalPatients}
        icon={Users}
      />

      <StatCard
        title="This Month Earnings"
        value="$8,420"
        suffix="revenue"
        icon={DollarSign}
      />

      <StatCard
        title="Rating"
        value="4.9 / 5.0"
        icon={Star}
      />
    </div>
  );
}
