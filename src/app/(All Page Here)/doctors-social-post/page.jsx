"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

const categories = ["Fitness", "Diet", "Yoga", "Mental Health"];

const Page = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Fetch the Lottie JSON from public folder
    fetch("/mental-therapy.json")
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Title & Description */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1
          className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
          style={{ color: "var(--color-calm-blue)" }}
        >
          <span className="text-gray-600">Social</span> Health Interaction
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          A dedicated space for doctors to publish{" "}
          <span className="font-semibold">blogs</span> and{" "}
          <span className="font-semibold">health tips</span>, organized under{" "}
          <span className="italic">Fitness, Diet, Yoga</span>, and{" "}
          <span className="italic">Mental Health</span> categories, helping users gain reliable insights and guidance for a healthier lifestyle.
        </p>
      </motion.div>

      {/* Form + Lottie Container */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Form */}
        <motion.div
          className="flex-1 p-8 rounded-2xl shadow-lg"
          style={{
            backgroundColor: "var(--dashboard-bg)",
            border: "1px solid var(--dashboard-border)",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <form className="space-y-6">
            {/* Title + Category */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-gray-200">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter blog or tip title"
                  className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[var(--color-calm-blue)] transition duration-200"
                  style={{
                    backgroundColor: "var(--gray-color)",
                    color: "var(--fourground-color)",
                    borderColor: "var(--dashboard-border)",
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-gray-200">
                  Category
                </label>
                <select
                  className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[var(--color-calm-blue)] transition duration-200"
                  style={{
                    backgroundColor: "var(--gray-color)",
                    color: "var(--fourground-color)",
                    borderColor: "var(--dashboard-border)",
                  }}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </motion.div>
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-gray-200">
                Content
              </label>
              <textarea
                placeholder="Write your blog or health tip..."
                rows={6}
                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[var(--color-calm-blue)] transition duration-200"
                style={{
                  backgroundColor: "var(--gray-color)",
                  color: "var(--fourground-color)",
                  borderColor: "var(--dashboard-border)",
                }}
              />
            </motion.div>

            {/* Button */}
            <motion.div
              className="pt-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 rounded-lg font-semibold transition-all duration-200 hover:opacity-90"
                style={{
                  backgroundColor: "var(--color-calm-blue)",
                  color: "var(--color-white)",
                }}
              >
                Post
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        {/* Lottie Animation */}
        <motion.div
          className="flex-1 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {animationData && <Lottie animationData={animationData} loop={true} />}
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
