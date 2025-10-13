"use client";
import React from "react";

const doctorFeatures = [
  {
    icon: "🏥",
    title: "Associate with a Hospital",
    description: "ডাক্তার নিজেকে এক বা একাধিক হাসপাতালের সাথে যুক্ত করতে পারবে।",
  },
  {
    icon: "✍️",
    title: "Manage Own Profile",
    description: "নিজের তথ্য (specialty, qualification, visiting hours) আপডেট করা।",
  },
  {
    icon: "👀",
    title: "View Hospital Details",
    description: "যেসব হাসপাতালে যুক্ত আছে, সেগুলোর তথ্য দেখা যাবে।",
  },
  {
    icon: "🩺",
    title: "Manage Appointment Slots",
    description: "হাসপাতালের মাধ্যমে অ্যাপয়েন্টমেন্ট নেওয়ার সিস্টেম থাকলে।",
  },
  {
    icon: "📝",
    title: "Hospital Feedback",
    description: "হাসপাতাল ম্যানেজমেন্টকে নোট বা ফিডব্যাক দিতে পারবে।",
  },
];

const DoctorFeatures = () => {
  return (
    <div
      className="p-8 bg-[var(--gray-color)] min-h-screen flex flex-col items-center"
    >
      <h1
        className="text-3xl md:text-4xl font-bold mb-12 text-center"
        style={{ color: "var(--fourground-color)" }}
      >
        Doctor Features
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {doctorFeatures.map((feature, index) => (
          <div
            key={index}
            className="p-5 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border"
            style={{
              backgroundColor: "var(--dashboard-bg)",
              borderColor: "var(--dashboard-border)",
            }}
          >
            <div
              className="text-4xl mb-3 flex justify-center"
              style={{ color: "var(--color-calm-blue)" }}
            >
              {feature.icon}
            </div>
            <h2
              className="text-lg md:text-xl font-semibold text-center mb-2"
              style={{ color: "var(--fourground-color)" }}
            >
              {feature.title}
            </h2>
            <p
              className="text-sm text-center text-gray-600"
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

export default DoctorFeatures;
