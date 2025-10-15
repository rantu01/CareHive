// components/StatCard.js
"use client";

export default function StatCard({ title, value, suffix, icon: Icon, change, changeLabel }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-[0_10px_25px_rgba(59,130,246,0.35)] transition-transform duration-300 transform hover:scale-105 p-6 flex flex-col justify-between w-full">
      {/* Title + Icon */}
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="bg-[var(--color-primary)] shadow-lg shadow-blue-400/50 p-3 rounded-2xl text-white flex items-center justify-center">
          <Icon className="w-7 h-7" /> {/* Bigger Icon */}
        </div>
      </div>

      {/* Value */}
      <div className="mt-4">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        {suffix && <span className="text-sm text-gray-500 ml-1">{suffix}</span>}
      </div>

      {/* Change Label */}
      <div className="mt-3 text-xs flex items-center gap-1 text-green-600 font-medium">
        <span>⬆ {change}</span>
        <span className="text-gray-500">vs {changeLabel}</span>
      </div>
    </div>
  );
}
