"use client";
import React from "react";

export default function AdminLinks() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      <a
        href="/dashboard/admin/reports"
        className="p-4 sm:p-6 text-center rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-bg)] shadow hover:bg-[var(--sidebar-bg)] transition"
      >
        <h4 className="text-base sm:text-lg font-semibold text-[var(--text-color-all)]">
          Reports
        </h4>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          View system reports
        </p>
      </a>

      <a
        href="/dashboard/admin/doctors"
        className="p-4 sm:p-6 text-center rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-bg)] shadow hover:bg-[var(--sidebar-bg)] transition"
      >
        <h4 className="text-base sm:text-lg font-semibold text-[var(--text-color-all)]">
          Doctors
        </h4>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Manage doctors
        </p>
      </a>

      <a
        href="/dashboard/admin/users"
        className="p-4 sm:p-6 text-center rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-bg)] shadow hover:bg-[var(--sidebar-bg)] transition"
      >
        <h4 className="text-base sm:text-lg font-semibold text-[var(--text-color-all)]">
          Users
        </h4>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Manage users
        </p>
      </a>

      <a
        href="/dashboard/admin"
        className="p-4 sm:p-6 text-center rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-bg)] shadow hover:bg-[var(--sidebar-bg)] transition"
      >
        <h4 className="text-base sm:text-lg font-semibold text-[var(--text-color-all)]">
          Dashboard
        </h4>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Back to overview
        </p>
      </a>
    </div>
  );
}
