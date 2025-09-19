"use client";
import { Search, Bell, PanelLeft } from "lucide-react";

export default function Topbar({ toggleSidebar }) {
  return (
    <header className="w-full bg-[var(--gray-color)] border-b border-b-[var(--dashboard-border)] px-6 py-3 flex items-center justify-between">
      {/* Left Section: Sidebar toggle + Search */}
      <div className="flex items-center gap-3">
        <button onClick={toggleSidebar} className="btn btn-ghost btn-circle">
          <PanelLeft size={20} />
        </button>

        {/* Search bar */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--fourground-color)]"
          />
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered pl-10 w-64 bg-[var(--gray-color)] text-[var(--fourground-color)]"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button className="btn btn-ghost btn-circle relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--dashboard-blue)] rounded-full"></span>
        </button>

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
