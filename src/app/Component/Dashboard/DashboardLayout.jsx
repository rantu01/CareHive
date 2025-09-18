"use client";

import WelcomeBar from "../UserComponent/WelcomeBar";
import { navItems } from "./navItems";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({ children, role }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar items={navItems[role]} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-white">
        <Topbar />
        <WelcomeBar />
        <main className="flex-1 p-6 bg-white overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
