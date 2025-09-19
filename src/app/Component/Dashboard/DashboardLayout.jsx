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
      <div className="flex-1 flex flex-col">
        <Topbar toggleSidebar={() => setIsCollapsed(!isCollapsed)} />

        <main className="flex-1 p-6 bg-[var(--dashboard-bg)] overflow-y-auto">
          <WelcomeBar />
          {children}
        </main>
      </div>
    </div>
  );
}
