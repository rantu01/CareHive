


"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Dumbbell,
  HeartPulse,
  Flame,
  Timer,
  ClipboardList,
} from "lucide-react";

export default function AllGymPlansPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlans = async () => {
    try {
      const res = await fetch("/api/gym-plans");
      const data = await res.json();
      if (data.success) setPlans(data.data);
      else setPlans([]);
    } catch (error) {
      console.error("Error fetching gym plans:", error);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div
        className="text-center mt-20 text-lg font-semibold"
        style={{ color: "var(--color-secondary)" }}
      >
        Loading gym plans...
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen py-24 px-6 overflow-hidden transition-colors duration-300"
      style={{
        background: "var(--bg-color-all)",
        color: "var(--text-color-all)",
      }}
    >
      {/* Background glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[var(--color-secondary)]/20 blur-[220px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[var(--color-primary)]/20 blur-[220px] rounded-full animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-1/2 w-[400px] h-[400px] bg-[var(--color-primary)]/10 blur-[220px] rounded-full animate-pulse-slow"></div>

      {/* Header Section */}
      <div className="relative text-center mb-28 mt-14 z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1
            className="text-5xl sm:text-6xl font-extrabold mb-4 bg-clip-text text-transparent drop-shadow-md tracking-tight flex justify-center items-center gap-3"
            style={{
              fontFamily: "'Playfair Display', serif",
              backgroundImage:
                "linear-gradient(to right, var(--color-secondary), var(--color-primary))",
            }}
          >
            <Dumbbell className="w-10 h-10" style={{ color: "var(--color-primary)" }} />
            Discover All Gym Training Plans
          </h1>
          <p
            className="max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed opacity-90"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "var(--text-color-all)",
            }}
          >
            Premium programs designed to enhance strength, performance, and
            endurance. Choose plans tailored to every unique fitness journey.
          </p>
        </motion.div>
      </div>

      {/* Plans Grid */}
      <motion.div
        className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto z-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        {plans.map((plan) => (
          <motion.div
            key={plan._id}
            variants={{
              hidden: { opacity: 0, y: 70 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.06, translateY: -6 }}
            transition={{ duration: 0.5 }}
            className="relative border rounded-3xl p-6 shadow-xl hover:shadow-3xl transition-all flex flex-col overflow-hidden group"
            style={{
              background: "var(--dashboard-bg, #ffffff)",
              borderColor: "var(--dashboard-border, #dce9e8)",
            }}
          >
            {/* Plan Image */}
            {plan.image && (
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <img
                  src={plan.image}
                  alt={plan.planName}
                  className="w-full h-60 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-30 transition-all duration-500 rounded-2xl"></div>
              </div>
            )}

            {/* Plan Info */}
            <div className="flex-1 relative z-10">
              <h2
                className="text-2xl font-bold mb-2 flex items-center gap-2"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "var(--color-secondary)",
                }}
              >
                <Flame
                  className="w-5 h-5 group-hover:rotate-12 transition-transform"
                  style={{ color: "var(--color-primary)" }}
                />
                {plan.planName}
              </h2>
              <p
                className="text-sm mb-3 italic opacity-80 flex items-center gap-2"
                style={{ color: "var(--color-secondary)" }}
              >
                <Timer
                  className="w-4 h-4"
                  style={{ color: "var(--color-primary)" }}
                />
                {plan.category} • {plan.duration} • {plan.intensity}
              </p>

              <p className="text-sm leading-relaxed mb-5 opacity-90">
                {plan.description?.length > 120
                  ? plan.description.slice(0, 120) + "..."
                  : plan.description}
              </p>
            </div>

            {/* Exercises + Equipment */}
            <div className="border-t pt-4 text-sm space-y-2 flex flex-col"
              style={{
                borderColor: "var(--dashboard-border, #e0e7ea)",
                color: "var(--text-color-all)",
              }}
            >
              {plan.exercises && (
                <p className="flex items-center gap-2">
                  <HeartPulse
                    className="w-4 h-4"
                    style={{ color: "var(--color-primary)" }}
                  />
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Exercises:
                  </span>{" "}
                  {plan.exercises}
                </p>
              )}
              {plan.equipment && (
                <p className="flex items-center gap-2">
                  <ClipboardList
                    className="w-4 h-4"
                    style={{ color: "var(--color-secondary)" }}
                  />
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-secondary)" }}
                  >
                    Equipment:
                  </span>{" "}
                  {plan.equipment}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}


