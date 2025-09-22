"use client";
import { Search, Bell, PanelLeft } from "lucide-react";

export default function Topbar({ toggleSidebar }) {
  return (
    <header
      className="w-full px-4 sm:px-6 py-3 flex items-center justify-between transition-colors duration-300"
      style={{
        backgroundColor: "var(--sidebar-bg)",
        borderBottom: "1px solid var(--dashboard-border)",
        color: "var(--fourground-color)",
      }}
    >
      {/* Left Section: Sidebar toggle + Search */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1">
        <button
          onClick={toggleSidebar}
          className="cursor-pointer sm:w-10 sm:h-10 w-8 h-8"
          style={{ color: "var(--fourground-color)" }}
        >
          <PanelLeft size={20} />
        </button>

        {/* Search bar */}
        <div className="relative flex-1 max-w-full">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--fourground-color)" }}
          />
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full transition-colors duration-300 text-sm sm:text-base"
            style={{
              backgroundColor: "var(--gray-color)",
              borderColor: "var(--dashboard-border)",
              color: "var(--fourground-color)",
              paddingLeft: "2.5rem",
            }}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-4 ml-2">
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

        <div className="flex items-center gap-1 sm:gap-2 cursor-pointer">
          <div className="avatar">
            <div
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2"
              style={{ borderColor: "var(--dashboard-blue)" }}
            ></div>
          </div>
          <div className="hidden sm:flex flex-col text-sm leading-tight">
            <span style={{ color: "var(--fourground-color)" }} className="font-medium">
              John Doe
            </span>
            <span className="text-xs" style={{ color: "var(--dashboard-blue)" }}>
              User
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
