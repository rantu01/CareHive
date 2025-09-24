"use client";
import { useState } from "react";

export default function Page() {
  const [selectedCard, setSelectedCard] = useState(null);

  // Dashboard Stats (Dummy Data)
  const stats = [
    { id: 1, title: "Total Users", value: "1,245", color: "from-[var(--color-calm-blue)] to-[var(--color-light-green)]" },
    { id: 2, title: "Active Users", value: "876", color: "from-[var(--color-light-green)] to-[var(--dashboard-blue)]" },
    { id: 3, title: "Reports Generated", value: "534", color: "from-purple-400 to-blue-400" },
    { id: 4, title: "Pending Reports", value: "42", color: "from-red-400 to-pink-500" },
    { id: 5, title: "Articles Published", value: "89", color: "from-yellow-400 to-orange-500" },
    { id: 6, title: "Appointments", value: "312", color: "from-teal-400 to-green-500" },
  ];

  // Reports List (Dummy Data)
  const reports = [
    { id: 1, title: "Weekly Wellness Report", date: "2025-09-24", summary: "Overview of user activity, steps, sleep, and stress levels." },
    { id: 2, title: "Diet & Nutrition Report", date: "2025-09-20", summary: "Nutritional intake and calorie balance for the past week." },
    { id: 3, title: "Mental Health Report", date: "2025-09-18", summary: "Weekly mood patterns and stress management insights." },
  ];

  return (
    <div className="p-8 bg-[var(--dashboard-bg)] min-h-screen">
      {/* Dashboard Title */}
      <h1 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-[var(--color-calm-blue)] to-[var(--color-light-green)] bg-clip-text text-transparent drop-shadow">
        Admin Reports Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={`p-6 rounded-2xl shadow-md text-center text-white font-bold bg-gradient-to-r ${stat.color} transform hover:-translate-y-1 transition-all duration-300`}
          >
            <h2 className="text-lg">{stat.title}</h2>
            <p className="text-3xl mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Reports Section */}
     
      <h2
            className="text-4xl font-extrabold mb-4 relative inline-block text-center"
            style={{ color: "var(--fourground-color)" }}
          >
             Recent Reports
            <span
              className="absolute left-0 -bottom-2 w-1/2 h-1 rounded"
              style={{ backgroundColor: "var(--color-calm-blue)" }}
            ></span>
          </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {reports.map((report) => (
          <div
            key={report.id}
            onClick={() =>
              setSelectedCard(selectedCard === report.id ? null : report.id)
            }
            className={`relative cursor-pointer card border border-[var(--dashboard-border)] shadow-md rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-lg ${
              selectedCard === report.id
                ? "ring-4 ring-offset-2 ring-offset-[var(--dashboard-bg)] ring-transparent bg-gradient-to-r from-[var(--color-light-green)]/40 to-[var(--color-calm-blue)]/40 animate-pulse"
                : "bg-[var(--dashboard-bg)]"
            }`}
          >
            <div className="card-body">
              <h2 className="card-title text-[var(--color-calm-blue)]">
                {report.title}
              </h2>
              <p className="text-sm text-[var(--fourground-color)] opacity-70">
                {report.date}
              </p>
              <p className="mt-3 text-[var(--fourground-color)] leading-relaxed">
                {report.summary}
              </p>
              <div className="card-actions justify-end mt-6">
                <button className="btn btn-sm rounded-full px-5 bg-gradient-to-r from-[var(--color-light-green)] to-[var(--color-calm-blue)] text-[var(--color-white)] border-none hover:opacity-90 transition-all duration-300">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
