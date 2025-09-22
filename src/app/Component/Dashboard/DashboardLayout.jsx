"use client";

import { useState } from "react";
import WelcomeBar from "../UserComponent/WelcomeBar";
import { navItems } from "./navItems";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({ children, role }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar items={navItems[role]} isCollapsed={isCollapsed} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        {/* Topbar */}
        <div
          className={`transition-all duration-300 ${
            isCollapsed ? "ml-16" : "ml-64"
          }`}
        >
          <Topbar toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
        </div>

        {/* Main content */}
        <main
          className={`flex-1 p-6 bg-[var(--dashboard-bg)] overflow-y-auto transition-all duration-300 ${
            isCollapsed ? "ml-16" : "ml-64"
          }`}
        >
          <WelcomeBar />
          {children}
        </main>
      </div>
    </div>
  );
}
