"use client";
import React from "react";

export default function Loader() {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "var(--dashboard-bg)" }}
    >
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-t-[var(--color-secondary)] border-gray-300 rounded-full animate-spin"></div>
        {/* Text */}
        <p
          className="mt-4 text-lg font-semibold"
          style={{ color: "var(--text-color-all)" }}
        >
          Loading...
        </p>
      </div>
    </div>
  );
}
