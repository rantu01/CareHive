"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdFitnessCenter } from "react-icons/md";

export default function AllGymPlansPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlans = async () => {
    try {
      const res = await fetch("/api/gym-plans");
      const data = await res.json();
      if (data.success) {
        setPlans(data.data);
      } else {
        setPlans([]);
      }
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
      <div className="text-center mt-20 text-lg font-semibold text-[#3b7f81]">
        Loading gym plans...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-24 px-6 overflow-hidden bg-gradient-to-br from-[#f0f4f8] via-[#ffffff] to-[#e7f4f3] text-[#000000]">
      {/* Premium Glowing Background Shapes */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#78c0b5]/25 blur-[220px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#5ca2a5]/25 blur-[220px] rounded-full animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-1/2 w-[400px] h-[400px] bg-[#3b7f81]/10 blur-[220px] rounded-full animate-pulse-slow"></div>

      {/* Header Section */}
      <div className="relative text-center mb-28 mt-14 z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          
          <h1
            className="text-5xl sm:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#3b7f81] via-[#5ca2a5] to-[#78c0b5] bg-clip-text text-transparent drop-shadow-md tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Discover All Gym Training Plans
          </h1>
          <p
            className="text-[#1f3f40] max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Premium programs designed to enhance strength, performance, and endurance.
            Choose plans tailored to every unique fitness journey.
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
            className="relative bg-white border border-[#dce9e8] rounded-3xl p-6 shadow-xl hover:shadow-3xl transition-all flex flex-col overflow-hidden group"
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
                className="text-2xl font-bold mb-2 text-[#1f3f40]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {plan.planName}
              </h2>
              <p className="text-sm mb-3 italic text-[#3b7f81]">
                {plan.category} • {plan.duration} • {plan.intensity}
              </p>
              <p className="text-[#1f3f40] text-sm leading-relaxed mb-5">
                {plan.description?.length > 120
                  ? plan.description.slice(0, 120) + "..."
                  : plan.description}
              </p>
            </div>

            {/* Exercises + Equipment */}
            <div className="border-t border-[#f0f4f8] pt-4 text-sm text-[#1f3f40] space-y-2">
              {plan.exercises && (
                <p>
                  <span className="font-semibold text-[#5ca2a5]">Exercises:</span>{" "}
                  {plan.exercises}
                </p>
              )}
              {plan.equipment && (
                <p>
                  <span className="font-semibold text-[#78c0b5]">Equipment:</span>{" "}
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
