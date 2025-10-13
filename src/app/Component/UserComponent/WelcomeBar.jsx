"use client";
import React, { useState, useContext } from "react";
import UpdateModal from "./UpdateModal";
import { DashBoardDataContext } from "./UserDashBoardDataContext/DashboardDataContext";
import { AuthContext } from "@/app/context/authContext";
import { Calendar, RefreshCw, User } from "lucide-react";

const WelcomeBar = () => {
  const { userHealthStats, setHealthStats } = useContext(DashBoardDataContext);
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[var(--dashboard-bg)] p-8 rounded-2xl shadow-xl border border-[var(--dashboard-border)] gap-6 md:gap-4 relative overflow-hidden backdrop-blur-sm">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--dashboard-blue)]/15 rounded-full blur-3xl -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--dashboard-blue)]/10 rounded-full blur-2xl translate-y-16 -translate-x-16"></div>

        <div className="relative z-10 flex flex-col flex-1">
          {/* Main Welcome Content */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0 w-16 h-16 bg-[var(--color-light-green)] rounded-2xl flex items-center justify-center shadow-lg">
              <User className="text-white" size={28} />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-bold text-2xl md:text-4xl mb-2 text-[var(--color-light-green)] leading-tight">
                Welcome back, {user?.displayName}!
              </h1>
              <p className="text-[var(--color-light-green)]/70 text-sm md:text-xl font-medium">
                Here's your health overview for today
              </p>
            </div>
          </div>

          {/* Additional Context Information */}
          <div className="flex items-center gap-6 text-sm text-[var(--fourground-color)]/60">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[var(--color-light-green)]" />
              <span>{new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--color-light-green)]/10 rounded-full border border-[var(--color-light-green)]/20">
              <div className="w-2 h-2 bg-[var(--color-light-green)] rounded-full animate-pulse"></div>
              <span className="text-[var(--color-light-green)] text-xs font-semibold">Health Dashboard Active</span>
            </div>
          </div>
        </div>

        {/* Update Button */}
        <div className="relative z-10 self-start md:self-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group px-6 py-3 rounded-xl font-semibold text-white bg-[var(--color-light-green)] hover:bg-[var(--color-light-green)] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 border border-[var(--color-light-green)]/30"
          >
            <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
            <span>{userHealthStats ? "Update" : "Add Health Stats"}</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <UpdateModal
          setIsOpen={setIsOpen}
          userHealthStats={userHealthStats}
          setHealthStats={setHealthStats}
        />
      )}
    </div>
  );
};

export default WelcomeBar;
