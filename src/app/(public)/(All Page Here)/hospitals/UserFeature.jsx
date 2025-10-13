"use client";
import React from "react";

const userFeatures = [
  {
    icon: "🔍",
    title: "Search & Filter Hospitals",
    description: "Name, location বা specialty অনুযায়ী হাসপাতাল খুঁজতে পারবে।",
  },
  {
    icon: "🏥",
    title: "View Hospital Details",
    description: "Address, contact info, services, doctors list, website, state, city দেখা যাবে।",
  },
  {
    icon: "🗺️",
    title: "Map View (Optional)",
    description: "গুগল ম্যাপে হাসপাতাল চেক করা যাবে।",
  },
  {
    icon: "❤️",
    title: "Save Favourite Hospitals",
    description: "নিজের অ্যাকাউন্টে প্রিয় হাসপাতাল সংরক্ষণ করা যাবে।",
  },
  {
    icon: "⭐",
    title: "Review / Rating System (Optional)",
    description: "ইউজাররা তাদের অভিজ্ঞতা অনুযায়ী রিভিউ বা রেটিং দিতে পারবে।",
  },
];

const UserFeatures = () => {
  return (
    <div
      className="p-8 min-h-screen"
      style={{ backgroundColor: "var(--gray-color)" }}
    >
      <h1
        className="text-4xl font-bold text-center mb-10"
        style={{ color: "var(--fourground-color)" }}
      >
        User Features
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {userFeatures.map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl"
            style={{ backgroundColor: "var(--dashboard-bg)", borderColor: "var(--dashboard-border)", borderWidth: "1px" }}
          >
            <div
              className="text-5xl mb-4"
              style={{ color: "var(--color-calm-blue)" }}
            >
              {feature.icon}
            </div>
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--fourground-color)" }}
            >
              {feature.title}
            </h2>
            <p
              className="text-gray-600"
              style={{ color: "var(--fourground-color)" }}
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserFeatures;
