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
      className="p-8"
      style={{ backgroundColor: "var(--gray-color)" }}
    >
      {/* Main Title */}
      <div className="mb-10 text-left md:text-center">
        <h1
          className="text-4xl md:text-5xl font-extrabold mb-2"
          style={{ 
            background: "linear-gradient(90deg, #4f46e5, #3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          User Features
        </h1>
        <p
          className="text-md md:text-lg text-gray-500"
          style={{ color: "var(--fourground-color)" }}
        >
          আমাদের প্ল্যাটফর্মে ইউজাররা যে সুবিধাগুলো পাবে তার একটি সংক্ষিপ্ত তালিকা।
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {userFeatures.map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-3xl border transition transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl relative"
            style={{
              backgroundColor: "var(--dashboard-bg)",
              borderImageSlice: 1,
              borderWidth: "1px",
              borderStyle: "solid",
              borderImageSource: "linear-gradient(90deg, #4f46e5, #3b82f6)",
            }}
          >
            <div
              className="text-5xl mb-4 text-center"
              style={{ color: "var(--color-calm-blue)" }}
            >
              {feature.icon}
            </div>
            <h2
              className="text-xl font-semibold mb-2 text-center"
              style={{ color: "var(--fourground-color)" }}
            >
              {feature.title}
            </h2>
            <p
              className="text-center text-gray-500"
              style={{ color: "var(--fourground-color)", lineHeight: "1.5" }}
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
