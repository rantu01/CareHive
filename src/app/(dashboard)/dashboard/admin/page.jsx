"use client";
import React from "react";
import { Users, UserCog, CalendarCheck2, Settings } from "lucide-react";

export default function AdminDashboard() {
  const features = [
    {
      id: 1,
      title: "User Management",
      desc: "View, edit, and manage all registered users.",
      icon: Users,
      color: "var(--color-calm-blue)",
    },
    {
      id: 2,
      title: "Doctor Management",
      desc: "Approve or remove doctors, manage their profiles.",
      icon: UserCog,
      color: "var(--dashboard-blue)",
    },
    {
      id: 3,
      title: "Appointments",
      desc: "Track and manage patient appointments.",
      icon: CalendarCheck2,
      color: "var(--color-light-green)",
    },
    {
      id: 4,
      title: "Settings",
      desc: "Manage system settings and preferences.",
      icon: Settings,
      color: "var(--color-black)",
    },
  ];

  return (
    <div
      className="p-8 min-h-screen"
      style={{
        backgroundColor: "var(--dashboard-bg)",
        color: "var(--fourground-color)",
      }}
    >
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-10">
        Admin Dashboard
      </h1>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="p-6 rounded-2xl shadow-md transition hover:shadow-lg"
              style={{
                backgroundColor: "var(--sidebar-bg)",
                border: "1px solid var(--dashboard-border)",
              }}
            >
              <div className="flex flex-col items-center text-center">
                <Icon
                  className="w-12 h-12 mb-4"
                  style={{ color: item.color }}
                />
                <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                <p className="text-sm text-[var(--fourground-color)] mb-4">
                  {item.desc}
                </p>
                <button
                  className="w-full py-2 rounded-xl font-semibold text-[var(--color-white)] bg-gradient-to-r from-[var(--color-calm-blue)] to-[var(--color-light-green)] hover:opacity-90 transition"
                >
                  Manage
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
