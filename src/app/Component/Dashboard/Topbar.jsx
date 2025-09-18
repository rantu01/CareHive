"use client";
import { Menu, Search, Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header className="w-full bg-white border-b px-6 py-3 flex items-center justify-between">
      {/* Left Section: Sidebar toggle + Search */}
      <div className="flex items-center gap-3">
        {/* Sidebar toggle (for mobile) */}
        <button className="btn btn-ghost btn-circle">
          <Menu size={20} />
        </button>

        {/* Search bar */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
          />
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered pl-10 w-64 bg-[var(--gray-color)] text-black"
          />
        </div>
      </div>

      {/* Right Section: Notifications + User */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="btn btn-ghost btn-circle relative">
          <Bell size={20} />
          {/* Notification dot */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--dashboard-blue)] rounded-full"></span>
        </button>

        {/* User profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="avatar">
            <div className="w-8 h-8 rounded-full border-2 border-[var(--dashboard-blue)]"></div>
          </div>
          <div className="flex flex-col text-sm leading-tight">
            <span className="font-medium">John Doe</span>
            <span className="text-xs text-gray-500">User</span>
          </div>
        </div>
      </div>
    </header>
  );
}
