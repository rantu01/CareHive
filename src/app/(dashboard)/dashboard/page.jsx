"use client";
import React from "react";
import { useUser } from "../../context/UserContext"; // adjust path if needed
import Loader from "@/app/Component/Loader";

export default function DashboardPage() {
  const { user, role, loading } = useUser();

  if (loading) return <Loader />;
  if (!user) return <p>Please log in</p>;

  return (
    <div
      className="p-6 rounded-lg"
      style={{
        backgroundColor: "var(--dashboard-bg)",
        color: "var(--fourground-color)",
      }}
    >
      <h2 className="text-2xl font-bold mb-4">Dashboard Home</h2>
      <p className="mb-6">
        Welcome, <span className="font-semibold">{user?.email}</span> 👋
      </p>

      {/* Role-based content */}
      {role === "admin" && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Admin Panel</h3>
          <p className="text-sm">Here you can manage users, doctors, and settings.</p>
        </div>
      )}

      {role === "doctor" && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Doctor Dashboard</h3>
          <p className="text-sm">Check appointments, manage patients, and update availability.</p>
        </div>
      )}

      {role === "user" && (
        <div>
          <h3 className="text-xl font-semibold mb-2">User Dashboard</h3>
          <p className="text-sm">Book appointments and track your health records.</p>
        </div>
      )}
    </div>
  );
}
