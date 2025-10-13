"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { navItems } from "./navItems";
import { useUser } from "@/app/context/UserContext";

export default function DashboardLayout({ children, role = "default" }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [doctorId, setDoctorId] = useState(null);
  const { user } = useUser();

  // Automatically fetch doctorId from your existing doctors API
  useEffect(() => {
    const fetchDoctorId = async () => {
      if (role !== "doctor" || !user?.email) return;

      try {
        const res = await fetch("/api/doctors");
        const doctors = await res.json();

        const matchedDoctor = doctors.find(
          (doc) => doc.personalInfo?.email === user.email
        );

        if (matchedDoctor?._id) {
          setDoctorId(matchedDoctor._id);
          console.log(" Found doctor ID:", matchedDoctor._id);
        } else {
          console.warn(" No matching doctor found for email:", user.email);
        }
      } catch (error) {
        console.error(" Error fetching doctors:", error);
      }
    };

    fetchDoctorId();
  }, [role, user?.email]);

  // ✅ Build sidebar dynamically (only Availability uses doctorId)
  const dynamicItems =
    navItems[role]?.map((item) => {
      if (role === "doctor" && typeof item.path === "function") {
        return {
          ...item,
          path: doctorId ? item.path(doctorId) : "#",
        };
      }
      return item;
    }) || [];

  // Sidebar toggle effects
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        items={dynamicItems}
        isCollapsed={isCollapsed}
        role={role}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isCollapsed ? "md:ml-16" : "md:ml-64"
        }`}
      >
        <Topbar
          toggleSidebar={() => {
            if (window.innerWidth >= 768) setIsCollapsed(!isCollapsed);
            else setMobileOpen(!mobileOpen);
          }}
        />
        <main className="flex-1 p-3 md:p-6 bg-[var(--dashboard-bg)] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
