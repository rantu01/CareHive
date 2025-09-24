"use client";
import React from "react";
import { useUser } from "../../context/UserContext"; // adjust path if needed
import Loader from "@/app/Component/Loader";
import AdminLinks from "@/app/Component/Admin-Dashboard/adminLink";

export default function DashboardPage() {
  const { user, role, loading } = useUser();

  if (loading) return <Loader />;
  if (!user) return <p className="text-center p-6">Please log in</p>;

  return (
    <div
      className="rounded-lg min-h-screen"
      style={{
        backgroundColor: "var(--dashboard-bg)",
        color: "var(--fourground-color)",
      }}
    >
      {/* Welcome Section */}
      <div
        className="mb-8 p-4 sm:p-6 rounded-xl border"
        style={{
          background:
            "linear-gradient(135deg, var(--dashboard-blue) 0%, var(--color-calm-blue) 100%)",
          borderColor: "var(--dashboard-border)",
          color: "var(--color-white)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left side */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Welcome Back, {user?.email}!
            </h1>
            <p className="text-base sm:text-lg opacity-90">
              We're glad to see you again. Your dedication makes a difference.
            </p>
          </div>

          {/* Right side badge */}
          <div
            className="flex md:flex hidden items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full"
            style={{ backgroundColor: "var(--color-light-green)" }}
          >
            <span className="text-xl sm:text-2xl">👋</span>
          </div>
        </div>

        {/* Role Badge */}
        <div className="mt-4">
          <span
            className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold"
            style={{
              backgroundColor: "var(--color-white)",
              color: "var(--dashboard-blue)",
            }}
          >
            {role?.toUpperCase()} ACCESS
          </span>
        </div>
      </div>

      {/* Overview Heading */}
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Dashboard Overview</h2>

      {/* Role-based content */}
      {role === "admin" && (
        <div className="space-y-6">
          <h3 className="text-lg sm:text-xl font-semibold">Admin Panel</h3>
          <p className="text-sm text-gray-500">
            Here you can manage users, doctors, and settings.
          </p>

          {/* Dashboard Buttons */}
          <AdminLinks></AdminLinks>
        </div>
      )}

      {role === "doctor" && (
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            Doctor Dashboard
          </h3>
          <p className="text-sm sm:text-base">
            Check appointments, manage patients, and update availability.
          </p>
        </div>
      )}

      {role === "user" && (
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            User Dashboard
          </h3>
          <p className="text-sm sm:text-base">
            Book appointments and track your health records.
          </p>
        </div>
      )}
    </div>
  );
}
