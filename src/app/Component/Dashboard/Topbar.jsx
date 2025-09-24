"use client";
import { Bell, PanelLeft } from "lucide-react";
import { useUser } from "../../context/UserContext"; // adjust path
import { use } from "react";
import ThemeToggle from "../ThemeToggle";

export default function Topbar({ toggleSidebar }) {
  const { user, loading, role } = useUser();

  console.log(user.photoURL);

  if (loading) return null; // or a loading spinner

  return (
    <header
      className="w-full px-4 sm:px-6 py-3 flex items-center justify-between transition-colors duration-300"
      style={{
        backgroundColor: "var(--sidebar-bg)",
        borderBottom: "1px solid var(--dashboard-border)",
        color: "var(--fourground-color)",
      }}
    >
      {/* Left Section: Sidebar toggle */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={toggleSidebar}
          className="cursor-pointer sm:w-10 sm:h-10 w-8 h-8"
          style={{ color: "var(--fourground-color)" }}
        >
          <PanelLeft size={20} />
        </button>
      </div>

      {/* Right Section: User + Notifications */}
      <div className="flex items-center gap-2 sm:gap-4 ml-2">

        {/* dark mode toggle */}
        <ThemeToggle />

        {/* Notification Bell */}
        <button
          className="cursor-pointer relative sm:w-10 sm:h-10 w-8 h-8 transition-colors duration-300"
          style={{ color: "var(--fourground-color)" }}
        >
          <Bell size={20} />
          <span
            className="absolute top-1 sm:top-2 right-1 sm:right-2 w-2 h-2 rounded-full"
            style={{ backgroundColor: "var(--dashboard-blue)" }}
          ></span>
        </button>

        {/* User Info */}
        <div className="flex items-center gap-1 sm:gap-2 cursor-pointer">
          <div
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 overflow-hidden"
            style={{ borderColor: "var(--dashboard-blue)" }}
          >
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="flex items-center justify-center w-full h-full text-xs text-gray-500">
                {user?.displayName?.charAt(0) || "U"}
              </span>
            )}
          </div>

          <div className="hidden sm:flex flex-col text-sm leading-tight">
            <span
              style={{ color: "var(--fourground-color)" }}
              className="font-medium"
            >
              {user?.displayName || "No Name"}
            </span>
            <span
              className="text-xs"
              style={{ color: "var(--dashboard-blue)" }}
            >
              {role || "User"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
