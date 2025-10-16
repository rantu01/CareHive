"use client";
import React from "react";
import DailyWellnessCheckIn from "./DailyWellnessCheckIn";
import MoodBasedHealth from "./MoodBasedHealth";

const WellnessSection = () => {
  return (
    <section className="w-full bg-[var(--bg-color-all)] dark:bg-[var(--dashboard-bg)] py-16 px-6 container mx-auto">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] font-heading mb-4">
            🌿 Daily & Mood-Based Wellness
          </h2>
          <p className="text-lg text-[var(--text-color-all)] opacity-80 max-w-2xl mx-auto">
            Check in with your wellness and explore mood-based tips to stay balanced.
          </p>
        </div>

        {/* Two Components Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Daily Wellness Check-In */}
          <div className="w-full">
            <DailyWellnessCheckIn />
          </div>

          {/* Right: Mood-Based Wellness */}
          <div className="w-full">
            <MoodBasedHealth />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WellnessSection;
