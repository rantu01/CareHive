'use client';
import { useState } from "react";

const ChallengeFilters = () => {
  const [activeFilter, setActiveFilter] = useState("All Challenges");
  
  const filters = [
    "All Challenges",
    "Weekly Step",
    "Monthly Cycling",
    "30-Day Yoga"
  ];

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-wrap gap-3 mb-6">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeFilter === filter
                ? "bg-[var(--color-primary)] text-white shadow-md"
                : "bg-[var(--color-secondary)] bg-opacity-10 hover:bg-opacity-20"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      
      <div className="relative">
        <input
          type="text"
          placeholder="Find a participant"
          className="w-full px-4 py-3 pl-10 rounded-lg bg-[var(--color-secondary)] bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};


export default ChallengeFilters;