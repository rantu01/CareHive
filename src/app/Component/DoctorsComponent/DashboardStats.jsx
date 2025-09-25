// components/DashboardStats.js
"use client";


import { Calendar, Users, DollarSign, Star } from "lucide-react";
import StatCard from "./StatCard";

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
      <StatCard
        title="Today's Appointments"
        value="12 of 15"
        icon={Calendar}
        change="+2"
        changeLabel="last week"
      />

      <StatCard
        title="Total Patients"
        value="1,247"
        suffix="active"
        icon={Users}
        change="+23"
        changeLabel="last week"
      />

      <StatCard
        title="This Month Earnings"
        value="$8,420"
        suffix="revenue"
        icon={DollarSign}
        change="+12%"
        changeLabel="last week"
      />

      <StatCard
        title="Rating"
        value="4.9 / 5.0"
        icon={Star}
        change="+0.1"
        changeLabel="last week"
      />
    </div>
  );
}
