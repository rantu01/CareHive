"use client";

import { useEffect, useState } from "react";
import { Calendar, Users, DollarSign, Star } from "lucide-react";
import StatCard from "./StatCard";

export default function DashboardStats({ doctorId }) {
  const [stats, setStats] = useState({
    todayAppointments: 0,
    completedPatients: 0,
    pendingPatients: 0,
    monthlyEarnings: 0,
  });

  useEffect(() => {
    if (!doctorId) return;

    async function fetchStats() {
      try {
        const res = await fetch(`/api/doctor-appointments/${doctorId}`);
        const data = await res.json();
        const allAppointments = data.appointments || [];

        // আজকের day (Monday, Tuesday...)
        const todayName = new Date().toLocaleDateString("en-US", {
          weekday: "long",
        });

        // আজকের appointments filter by bookedSlot day
        const todayAppointments = allAppointments.filter((appt) =>
          appt.bookedSlot?.toLowerCase().includes(todayName.toLowerCase())
        );

        // Completed patients
        const completedPatients = todayAppointments.filter(
          (appt) => appt.status?.toLowerCase() === "completed"
        ).length;

        // Pending patients
        const pendingPatients = todayAppointments.length - completedPatients;

        // Monthly earnings (Paid appointments)
        const today = new Date();
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        const monthlyEarnings = allAppointments
          .filter(
            (appt) =>
              new Date(appt.bookedAt) >= monthStart &&
              new Date(appt.bookedAt) < monthEnd &&
              appt.paymentStatus === "Paid"
          )
          .reduce((sum, appt) => sum + Number(appt.fees || appt.doctorFee || 0), 0);

        setStats({
          todayAppointments: todayAppointments.length,
          completedPatients,
          pendingPatients,
          monthlyEarnings,
        });
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
        title="Completed Patients"
        value={stats.completedPatients}
        icon={Users}
      />

      <StatCard
        title="Pending Patients"
        value={stats.pendingPatients}
        icon={Users}
      />

      <StatCard
        title="This Month Earnings"
        value={`৳${stats.monthlyEarnings.toLocaleString()}`}
        icon={DollarSign}
      />
    </div>
  );
}
