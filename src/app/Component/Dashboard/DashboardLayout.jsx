// ----------------------------- DashboardLayout.jsx -----------------------------
"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { navItems } from "./navItems";

export default function DashboardLayout({ children, role = "default" }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (typeof window === "undefined") return;
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile sidebar on Escape key
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar
        items={navItems[role] || []}
        isCollapsed={isCollapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main content wrapper */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? "md:ml-16" : "md:ml-64"}`}>
        {/* Topbar */}
        <Topbar
          toggleSidebar={() => {
            if (window.innerWidth >= 768) {
              setIsCollapsed(!isCollapsed);
            } else {
              setMobileOpen(!mobileOpen);
            }
          }}
        />

        {/* Main content */}
        <main className="flex-1 p-3 md:p-6 bg-[var(--dashboard-bg)] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
