"use client";
import { Bell, PanelLeft, UserPlus } from "lucide-react";
import { useUser } from "../../context/UserContext";
import { useEffect, useState, useRef } from "react";
import ThemeToggle from "../ThemeToggle";
import Link from "next/link";
import useNotifications from "@/app/Hooks/useNotifications";
import usePendingDoctorApprovals from "@/app/Hooks/usePendingDoctorApprovals";

export default function Topbar({ toggleSidebar }) {
  const { user, loading, role } = useUser();
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Firebase notifications
  const fcmNotifications = useNotifications();

  // Admin notifications & pending count (using centralized hook)
  const { pendingCount, adminNotifications } = usePendingDoctorApprovals(role);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return null;

  // Merge notifications: Firebase + Admin (if admin)
  const notifications = role === "admin" ? [...fcmNotifications, ...adminNotifications] : fcmNotifications;
  const unreadCount = notifications.length;

  return (
    <header
      className="w-full px-4 sm:px-6 py-3 flex items-center justify-between transition-all duration-300 backdrop-blur-sm"
      style={{
        backgroundColor: "var(--sidebar-bg)",
        borderBottom: "2px solid var(--dashboard-border)",
        color: "var(--fourground-color)",
        boxShadow: "0 2px 20px rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* Left Section */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={toggleSidebar}
          className="cursor-pointer sm:w-10 sm:h-10 w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 hover:scale-105"
          style={{
            color: "var(--fourground-color)",
            backgroundColor: "var(--gray-color)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <PanelLeft size={20} />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-5 ml-2">
        <ThemeToggle />

        {/* Notification Bell */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="cursor-pointer relative sm:w-10 sm:h-10 w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 hover:scale-105 group"
            style={{
              color: "var(--fourground-color)",
              backgroundColor: "var(--gray-color)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            <Bell size={20} className="group-hover:scale-110 transition-transform duration-300" />
            {unreadCount > 0 && (
              <span
                className="absolute -top-1 -right-1 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse"
                style={{
                  minWidth: "18px",
                  height: "18px",
                  padding: "0 5px",
                  background: "linear-gradient(135deg, #FF6B6B, #FF8E8E)",
                  boxShadow: "0 2px 6px rgba(255, 107, 107, 0.4)",
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {openDropdown && (
            <div className="absolute right-0 mt-2 w-72 max-h-80 overflow-y-auto bg-white rounded-lg shadow-lg z-50">
              {notifications.length === 0 ? (
                <p className="text-gray-500 text-sm p-4">No notifications</p>
              ) : (
                notifications.map((n, i) => (
                  <div
                    key={i}
                    className="px-4 py-3 border-b last:border-none hover:bg-gray-50 cursor-pointer"
                  >
                    <p className="font-semibold text-gray-800 text-sm">
                      {n.title || n.name || "Notification"}
                    </p>
                    <p className="text-gray-600 text-xs">
                      {n.body || n.email || "Pending action"}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
          <div
            className="w-7 h-7 sm:w-9 sm:h-9 rounded-full overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
            style={{
              border: "3px solid var(--dashboard-blue)",
              boxShadow: "0 4px 12px rgba(49, 153, 238, 0.3)",
            }}
          >
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <div
                className="flex items-center justify-center w-full h-full text-sm font-semibold transition-colors duration-300"
                style={{
                  backgroundColor: "var(--dashboard-blue)",
                  color: "white",
                }}
              >
                {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
          </div>

          <div className="hidden sm:flex flex-col text-sm leading-tight">
            <span
              style={{ color: "var(--fourground-color)" }}
              className="font-semibold transition-colors duration-300 group-hover:text-[var(--dashboard-blue)]"
            >
              {user?.displayName || "No Name"}
            </span>
            <span
              className="text-xs font-medium transition-colors duration-300 group-hover:text-[var(--color-calm-blue)]"
              style={{ color: "var(--dashboard-blue)" }}
            >
              {role || "User"}
            </span>
          </div>
        </div>

        {role === "user" && (
          <Link
            href={"/dashboard/user/apply-for-doctor"}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--dashboard-blue)] to-[var(--dashboard-blue)]/90 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer border border-[var(--dashboard-blue)]/30 hover:from-[var(--dashboard-blue)]/90 hover:to-[var(--dashboard-blue)]"
          >
            <UserPlus size={18} />
            <span>Become A Doctor</span>
          </Link>
        )}
      </div>
    </header>
  );
}
