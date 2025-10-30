



"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Dumbbell,
  HeartPulse,
  Activity,
  RefreshCcw,
} from "lucide-react";
import UseAuth from "@/app/Hooks/UseAuth";
import Swal from "sweetalert2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const mentalOptions = ["Calm", "Stressed", "Motivated", "Tired", "Happy", "Neutral"];

export default function ProgressPage() {
  const { user } = UseAuth();
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    gymTime: "",
    yogaTime: "",
    mentalState: "",
  });

  const [data, setData] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchData = async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(`/api/progress?email=${user.email}`);
      const data = await res.json();
      if (data.success && data.data) {
        setData(data.data);
        setFormData({
          age: data.data.age,
          weight: data.data.weight,
          gymTime: data.data.gymTime,
          yogaTime: data.data.yogaTime,
          mentalState: data.data.mentalState,
        });
        setIsUpdating(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.email) return Swal.fire("Please log in first", "", "warning");

    try {
      const res = await fetch("/api/progress", {
        method: isUpdating ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, email: user.email }),
      });

      const result = await res.json();
      if (result.success) {
        Swal.fire({
          title: isUpdating ? "Updated!" : "Submitted!",
          text: "Your progress has been saved.",
          icon: "success",
        });
        fetchData();
      } else {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const chartData =
    data && {
      labels: ["Gym (hrs)", "Yoga (hrs)", "Weight (kg)"],
      datasets: [
        {
          label: "Progress Overview",
          data: [data.gymTime, data.yogaTime, data.weight],
          backgroundColor: [
            "rgba(56,189,248,0.7)", // Sky
            "rgba(16,185,129,0.7)", // Emerald
            "rgba(248,113,113,0.7)", // Red
          ],
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    };

  return (
    <div className="relative min-h-screen overflow-hidden  py-12 px-5 transition-colors duration-500">
      {/* Animated background glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.15),transparent_70%)] blur-2xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-300 dark:border-gray-700 rounded-2xl shadow-2xl p-8 transition-colors duration-500"
      >
        {/* Header */}
        <div className="flex justify-center items-center gap-3 mb-6">
          <HeartPulse className="text-red-500 dark:text-red-400 animate-pulse w-8 h-8" />
          <h1 className="text-4xl font-extrabold bg-clip-text">
            Progress Tracker
          </h1>
        </div>
        <p className="text-center text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          Monitor your{" "}
          <span className="text-red-500 font-semibold">physical</span> and{" "}
          <span className="text-red-500 font-semibold">mental wellness</span>.
          Track your age, workout hours, and mindset daily.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800/60 px-4 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800/90 transition">
            <Activity className="text-sky-500 w-5 h-5" />
            <input
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              type="number"
              className="bg-transparent text-gray-800 dark:text-gray-100 focus:outline-none w-full"
              required
            />
          </div>

          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800/60 px-4 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800/90 transition">
            <Dumbbell className="text-emerald-500 w-5 h-5" />
            <input
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Current Weight (kg)"
              type="number"
              className="bg-transparent text-gray-800 dark:text-gray-100 focus:outline-none w-full"
              required
            />
          </div>

          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800/60 px-4 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800/90 transition">
            <HeartPulse className="text-pink-500 w-5 h-5" />
            <input
              name="gymTime"
              value={formData.gymTime}
              onChange={handleChange}
              placeholder="Time Spent in Gym (hrs)"
              type="number"
              className="bg-transparent text-gray-800 dark:text-gray-100 focus:outline-none w-full"
              required
            />
          </div>

          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800/60 px-4 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800/90 transition">
            <Dumbbell className="text-indigo-500 w-5 h-5" />
            <input
              name="yogaTime"
              value={formData.yogaTime}
              onChange={handleChange}
              placeholder="Time Spent in Yoga (hrs)"
              type="number"
              className="bg-transparent text-gray-800 dark:text-gray-100 focus:outline-none w-full"
              required
            />
          </div>

          <div className="md:col-span-2">
            <p className="font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <Brain className="text-purple-500 w-5 h-5" /> Mental State:
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {mentalOptions.map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, mentalState: option }))
                  }
                  className={`px-4 py-1.5 rounded-full border text-sm transition ${
                    formData.mentalState === option
                      ? "bg-red-500 text-white border-transparent"
                      : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <input
              name="mentalState"
              value={formData.mentalState}
              onChange={handleChange}
              placeholder="Or type your own..."
              className="bg-gray-100 dark:bg-gray-800/60 text-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:ring-sky-500/40"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="md:col-span-2  text-white py-3 rounded-xl font-semibold tracking-wide flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition"
            style={{ background: "var(--color-secondary)" }}
          >
            <RefreshCcw className="w-5 h-5" />
            {isUpdating ? "Update Progress" : "Submit Progress"}
          </motion.button>
        </form>

        {/* Chart Section */}
        {data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center bg-clip-text">
              Your Progress Overview
            </h2>

            <div className="flex flex-col md:flex-row justify-center gap-8">
              <div className="bg-gray-100 dark:bg-gray-800/60 rounded-xl p-4 shadow-lg w-full md:w-1/2">
                <Pie data={chartData} />
              </div>
              <div className="bg-gray-100 dark:bg-gray-800/60 rounded-xl p-4 shadow-lg w-full md:w-1/2">
                <Bar data={chartData} />
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}


