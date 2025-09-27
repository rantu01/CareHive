"use client";
import KPIcard from "@/app/Component/UserComponent/KPIcard";
import ToDoTask from "@/app/Component/UserComponent/ToDoTask";
import UpcomingAppointment from "@/app/Component/UserComponent/UpcomingAppointment";
import { DashBoardDataContext } from "@/app/Component/UserComponent/UserDashBoardDataContext/DashboardDataContext";
import UserGoal from "@/app/Component/UserComponent/UserGoal";
import WelcomeBar from "@/app/Component/UserComponent/WelcomeBar";
import { AuthContext } from "@/app/context/authContext";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";

const UserDashboard = () => {
  const { userHealthStats } = use(DashBoardDataContext);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--dashboard-bg)] via-[var(--card-bg)] to-[var(--sidebar-bg)] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[var(--dashboard-blue)]/5 to-transparent rounded-full blur-3xl -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[var(--dashboard-blue)]/3 to-transparent rounded-full blur-2xl translate-y-40 -translate-x-40"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-[var(--dashboard-blue)]/2 to-transparent rounded-full blur-3xl -translate-x-32 -translate-y-32"></div>

      <div className="relative z-10 w-full p-4 md:p-6 lg:p-8 space-y-8 md:space-y-12">
        {/* Welcome Section */}
        <div className="mb-6 md:mb-8">
          <WelcomeBar />
        </div>

        {/* KPI Cards Grid */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-[var(--dashboard-blue)] to-[var(--dashboard-blue)]/50 rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--fourground-color)]">
              Health Metrics
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[var(--dashboard-border)] to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {userHealthStats?.map((activity) => (
              <div key={activity.title} className="transform transition-all duration-300 hover:scale-105">
                <KPIcard
                  title={activity.title}
                  value={activity.value}
                  target={activity?.target}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-[var(--dashboard-blue)] to-[var(--dashboard-blue)]/50 rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--fourground-color)]">
              Activity Center
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[var(--dashboard-border)] to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 md:gap-8">
            {/* Appointments Section */}
            <div className="lg:col-span-4 transform transition-all duration-300 hover:scale-[1.02]">
              <UpcomingAppointment />
            </div>
            
            {/* Todo Section */}
            <div className="lg:col-span-2 transform transition-all duration-300 hover:scale-[1.02]">
              <ToDoTask />
            </div>
          </div>
        </div>

        {/* Goals Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-[var(--dashboard-blue)] to-[var(--dashboard-blue)]/50 rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--fourground-color)]">
              Goals & Progress
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[var(--dashboard-border)] to-transparent"></div>
          </div>
          
          <div className="transform transition-all duration-300 ">
            <UserGoal />
          </div>
        </div>

        {/* Quick Stats Footer */}
        <div className="pt-8 border-t border-[var(--dashboard-border)]/30">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-gradient-to-br from-[var(--card-bg)] to-[var(--sidebar-bg)] border border-[var(--dashboard-border)]/50">
              <p className="text-2xl font-bold text-[var(--dashboard-blue)]">
                {userHealthStats?.length || 0}
              </p>
              <p className="text-sm text-[var(--fourground-color)]/60 font-medium">Active Metrics</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-[var(--card-bg)] to-[var(--sidebar-bg)] border border-[var(--dashboard-border)]/50">
              <p className="text-2xl font-bold text-[var(--dashboard-blue)]">100%</p>
              <p className="text-sm text-[var(--fourground-color)]/60 font-medium">Dashboard Health</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-[var(--card-bg)] to-[var(--sidebar-bg)] border border-[var(--dashboard-border)]/50">
              <p className="text-2xl font-bold text-[var(--dashboard-blue)]">Live</p>
              <p className="text-sm text-[var(--fourground-color)]/60 font-medium">Data Sync</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;