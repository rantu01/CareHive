"use client";
import React, { useState, useContext } from "react";
import UpdateModal from "./UpdateModal";
import { DashBoardDataContext } from "./UserDashBoardDataContext/DashboardDataContext";
import { AuthContext } from "@/app/context/authContext";

const WelcomeBar = () => {
  const { userHealthStats, setHealthStats } = useContext(DashBoardDataContext);
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[var(--dashboard-bg)] dark:bg-[var(--dashboard-bg)] p-6 rounded-lg shadow-md border border-[var(--dashboard-border)] gap-4 md:gap-0">
      
      <div className="flex flex-col">
        <h1 className="text-[var(--fourground-color)] font-bold text-2xl md:text-4xl mb-2">
          Welcome back, {user?.displayName}!
        </h1>
        <p className="text-[var(--fourground-color)] text-sm md:text-xl">
          Here’s your health overview for today
        </p>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-5 py-2 rounded-lg font-medium text-white bg-[var(--dashboard-blue)] hover:bg-[var(--color-calm-blue)] transition-colors duration-300 self-start md:self-auto"
      >
        Update
      </button>

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
