"use client";
import BmiCalculator from "@/app/Component/BmiCalculator";
import Footer from "@/app/Component/Footer";
import HealthLog from "@/app/Component/HealthLog";
import CalorieTracker from "@/app/Component/CalorieTracker";
import Navbar from "@/app/Component/Navbar";
import QuickHealthTips from "@/app/Component/QuickHealthTips";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [descVisible, setDescVisible] = useState(false);

  useEffect(() => {
    setTitleVisible(true);
    setTimeout(() => setDescVisible(true), 300);
  }, []);

  return (
    <div
      style={{
        background: "var(--dashboard-bg)",
        color: "var(--text-color-all)",
        minHeight: "100vh",
        fontFamily: "var(--font-primary)",
      }}
    >
      {/* Hero Section */}
      <div className="pt-30 mb-14 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto py-12">
          {/* Title */}
          <h1
            className={`text-4xl md:text-5xl lg:text-5xl font-bold mb-6 transition-all duration-1000 ease-out ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-6"
            }`}
            style={{
              color: "var(--color-secondary)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.02em",
            }}
          >
            Your Complete Health & Wellness Solution
          </h1>

          {/* Description */}
          <p
            className={`text-lg md:text-xl lg:text-xl mb-12 transition-all duration-1000 ease-out delay-300 ${
              descVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{
              color: "var(--text-color-all)",
              lineHeight: "1.7",
              fontFamily: "var(--font-primary)",
            }}
          >
            CareHive is a unified digital platform designed to support your
            overall health and wellness. Track key health metrics, manage
            appointments, and follow personalized wellness programs to achieve a
            healthier, more balanced lifestyle.
          </p>
        </div>

        {/* Components Grid */}
        {/* Components Grid */}
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Full-width BMI Calculator */}
          <div
            className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: "var(--sidebar-bg)",
              border: "1px solid var(--dashboard-border)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div className="flex items-center mb-6">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                style={{ background: "var(--color-primary)" }}
              >
                <svg
                  className="w-6 h-6"
                  fill="var(--color-white)"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 8C16 10.21 14.21 12 12 12C9.79 12 8 10.21 8 8C8 5.79 9.79 4 12 4C14.21 4 16 5.79 16 8Z" />
                  <path d="M12 14C7.58 14 4 15.79 4 18V20H20V18C20 15.79 16.42 14 12 14Z" />
                </svg>
              </div>
              <h3
                className="text-2xl font-semibold"
                style={{
                  color: "var(--text-color-all)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                BMI Calculator
              </h3>
            </div>
            <BmiCalculator />
          </div>

          {/* Other Components Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calorie Tracker Card */}
            <div
              className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "var(--sidebar-bg)",
                border: "1px solid var(--dashboard-border)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              }}
            >
              <div className="flex items-center mb-6">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                  style={{ background: "var(--color-primary)" }}
                >
                  {/* Add your icon here */}
                </div>
                <h3
                  className="text-2xl font-semibold"
                  style={{
                    color: "var(--text-color-all)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  Calorie Tracker
                </h3>
              </div>
              <CalorieTracker />
            </div>

            {/* Health Log Card */}
            <div
              className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "var(--sidebar-bg)",
                border: "1px solid var(--dashboard-border)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              }}
            >
              <div className="flex items-center mb-6">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                  style={{ background: "var(--color-primary)" }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="var(--color-white)"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
                  </svg>
                </div>
                <h3
                  className="text-2xl font-semibold"
                  style={{
                    color: "var(--text-color-all)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  AI Health Log
                </h3>
              </div>
              <HealthLog />
            </div>
          </div>

          {/* Quick Health Tips */}
          <QuickHealthTips />
        </div>
      </div>
    </div>
  );
};

export default Page;
