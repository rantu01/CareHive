import { AuthContext } from "@/app/context/authContext";
import axios from "axios";
import { use, useState } from "react";
import { X, Activity, TrendingUp, Heart, Weight, Save, AlertCircle } from "lucide-react";
import Swal from "sweetalert2";

const UpdateModal = ({ setIsOpen, userHealthStats, setHealthStats }) => {
  const { user } = use(AuthContext);
  const userId = user?.uid;
  const [formData, setFormData] = useState({});
  const [invalidInputError, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    setError("");
    for (const [key, val] of Object.entries(values)) {
      if (val.trim() === "" || isNaN(val)) {
        setError(`Stat information must be a number`);
        return; // stop execution if invalid
      }
    }

    const updatedStats = [
      { title: "bp", value: parseFloat(values.bloodPressure) },
      { title: "daily-step", value: parseInt(values.dailyStep, 10), target: parseInt(values.dailyStepTarget, 10) },
      { title: "heart-rate", value: parseInt(values.heartRate, 10) },
      { title: "weight", value: parseInt(values.weight, 10) },
    ];

    try {
      if (!userHealthStats && userId) {
        await axios.post(`/api/get-health-stats/${userId}`, {
          userStats: updatedStats,
          userId,
        });
      } else {
        await axios.put(`/api/get-health-stats/${userId}`, {
          userStats: updatedStats,
          userId,
        });
      }

      const healthStatsUrl = `/api/get-health-stats/${userId}`;
      const healthStatsResponse = await axios.get(healthStatsUrl);
      setHealthStats(healthStatsResponse?.data[0]?.userStats);

      Swal.fire({
        title: "Updated!",
        text: "Health stats updated successfully!",
        icon: "success"
      });

    } catch (err) {
      console.error("Update failed:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50 p-4 sm:p-6 md:p-8">
      <div className="bg-gradient-to-br from-[var(--dashboard-bg)] to-[var(--card-bg)] w-full max-w-[90vw] lg:max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl border-2 border-[var(--dashboard-border)] relative">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-bl from-[var(--color-primary)]/15 to-transparent rounded-full blur-2xl -translate-y-12 translate-x-12"></div>
        <div className="absolute bottom-0 left-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-tr from-[var(--color-primary)]/10 to-transparent rounded-full blur-xl translate-y-10 -translate-x-10"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-b-2 border-[var(--dashboard-border)]/50 bg-gradient-to-r from-[var(--card-bg)] to-[var(--sidebar-bg)] rounded-t-3xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 bg-[var(--color-primary)]/20 rounded-xl">
                  <Activity className="text-[var(--color-primary)]" size={20} />
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--fourground-color)]">
                  Update Health Data
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-[var(--dashboard-border)]/20 rounded-full transition-colors duration-300 cursor-pointer group"
              >
                <X
                  size={20}
                  className="text-[var(--fourground-color)]/60 group-hover:text-[var(--color-primary)] transition-colors duration-300"
                />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
            {/* Blood Pressure */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Activity className="text-[var(--color-primary)]" size={16} />
                <label
                  htmlFor="bloodPressure"
                  className="text-xs sm:text-sm font-semibold text-[var(--fourground-color)] uppercase tracking-wide"
                >
                  Blood Pressure
                </label>
              </div>
              <input
                id="bloodPressure"
                name="bloodPressure"
                defaultValue={userHealthStats ? userHealthStats[0]?.value : 0}
                type="text"
                placeholder="120/80"
                required
                className="w-full p-2 sm:p-3 bg-[var(--sidebar-bg)] border-2 border-[var(--dashboard-border)] rounded-xl text-[var(--fourground-color)] placeholder-[var(--fourground-color)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all duration-300"
              />
            </div>

            {/* Daily Step */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="text-[var(--color-primary)]" size={16} />
                <label
                  htmlFor="dailyStep"
                  className="text-xs sm:text-sm font-semibold text-[var(--fourground-color)] uppercase tracking-wide"
                >
                  Daily Steps
                </label>
              </div>
              <input
                id="dailyStep"
                name="dailyStep"
                defaultValue={userHealthStats ? userHealthStats[1]?.value : 0}
                type="text"
                placeholder="8000"
                required
                className="w-full p-2 sm:p-3 bg-[var(--sidebar-bg)] border-2 border-[var(--dashboard-border)] rounded-xl text-[var(--fourground-color)] placeholder-[var(--fourground-color)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all duration-300"
              />
            </div>

            {/* Daily Step Target */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="text-[var(--color-primary)]" size={16} />
                <label
                  htmlFor="dailyStepTarget"
                  className="text-xs sm:text-sm font-semibold text-[var(--fourground-color)] uppercase tracking-wide"
                >
                  Daily Step Goal
                </label>
              </div>
              <input
                id="dailyStepTarget"
                name="dailyStepTarget"
                defaultValue={userHealthStats ? userHealthStats[1]?.target : 0}
                type="text"
                placeholder="10000"
                required
                className="w-full p-2 sm:p-3 bg-[var(--sidebar-bg)] border-2 border-[var(--dashboard-border)] rounded-xl text-[var(--fourground-color)] placeholder-[var(--fourground-color)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all duration-300"
              />
            </div>

            {/* Heart Rate */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Heart className="text-[var(--color-primary)]" size={16} />
                <label
                  htmlFor="heartRate"
                  className="text-xs sm:text-sm font-semibold text-[var(--fourground-color)] uppercase tracking-wide"
                >
                  Heart Rate
                </label>
              </div>
              <input
                id="heartRate"
                name="heartRate"
                defaultValue={userHealthStats ? userHealthStats[2]?.value : 0}
                type="text"
                placeholder="72"
                required
                className="w-full p-2 sm:p-3 bg-[var(--sidebar-bg)] border-2 border-[var(--dashboard-border)] rounded-xl text-[var(--fourground-color)] placeholder-[var(--fourground-color)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all duration-300"
              />
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Weight className="text-[var(--color-primary)]" size={16} />
                <label
                  htmlFor="weight"
                  className="text-xs sm:text-sm font-semibold text-[var(--fourground-color)] uppercase tracking-wide"
                >
                  Weight (kg)
                </label>
              </div>
              <input
                id="weight"
                name="weight"
                defaultValue={userHealthStats ? userHealthStats[3]?.value : 0}
                type="text"
                placeholder="70"
                required
                className="w-full p-2 sm:p-3 bg-[var(--sidebar-bg)] border-2 border-[var(--dashboard-border)] rounded-xl text-[var(--fourground-color)] placeholder-[var(--fourground-color)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all duration-300"
              />
            </div>

            {/* Error Message */}
            {invalidInputError && (
              <div className="flex items-center gap-2 p-2 sm:p-3 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 rounded-xl">
                <AlertCircle className="text-[var(--color-primary)]" size={16} />
                <p className="text-xs sm:text-sm text-[var(--color-primary)] font-medium">{invalidInputError}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="group w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/90 text-white py-2 sm:py-3 rounded-xl font-semibold hover:from-[var(--color-primary)]/90 hover:to-[var(--color-primary)] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Save size={18} className="group-hover:scale-110 transition-transform duration-300" />
              <span>Update Health Data</span>
            </button>

            {/* Help Text */}
            <p className="text-center text-[10px] sm:text-xs md:text-sm text-[var(--fourground-color)]/60">
              Enter your current health metrics to track your progress
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
