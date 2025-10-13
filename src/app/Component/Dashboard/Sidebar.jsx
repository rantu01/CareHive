"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import usePendingDoctorApprovals from "@/app/Hooks/usePendingDoctorApprovals";
import { LogOut, User, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Sidebar({ items = [], isCollapsed, mobileOpen, onCloseMobile, role, onToggleCollapse }) {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState(null);

  // Get pending doctor approvals count (for admin only)
  const { pendingCount } = usePendingDoctorApprovals(role);

  return (
    <>
      {/* Enhanced Mobile backdrop */}
      <div
        aria-hidden={!mobileOpen}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-all duration-300  ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onCloseMobile}
      />

      {/* Enhanced Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen py-6 flex flex-col justify-between transition-all duration-300 ease-in-out overflow-y-auto z-50 transform ${
          isCollapsed ? "w-20" : "w-72"
        } md:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ 
          backgroundColor: "var(--sidebar-bg)", 
          borderRight: "1px solid var(--dashboard-border)",
          boxShadow: "0 0 40px rgba(0,0,0,0.1)"
        }}
      >
        {/* Enhanced Mobile close button */}
        <div className="md:hidden mb-4 flex justify-end px-4">
          <button 
            aria-label="Close menu" 
            onClick={onCloseMobile} 
            className="p-2 rounded-xl transition-all duration-300 hover:scale-110"
            style={{ 
              backgroundColor: "var(--color-light-green)",
              color: "var(--color-white)"
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1">
          {/* Enhanced Logo/Brand */}
          <div className={`px-4 mb-8 transition-all duration-300 ${
            isCollapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
          }`}>
            <Link href="/" className="flex items-center gap-3 group">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: "var(--color-light-green)" }}
              >
                CH
              </div>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: "var(--color-light-green)" }}>
                  CareHive
                </h1>
                <p className="text-xs opacity-70" style={{ color: "var(--fourground-color)" }}>
                  Medical Platform
                </p>
              </div>
            </Link>
          </div>

          {/* Collapsed Logo */}
          <div className={`mb-8 transition-all duration-300 ${
            isCollapsed ? "opacity-100 flex justify-center" : "opacity-0 h-0 overflow-hidden"
          }`}>
            <Link href="/" className="group">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg transition-transform duration-300 group-hover:scale-110 mx-auto"
                style={{ backgroundColor: "var(--color-light-green)" }}
              >
                CH
              </div>
            </Link>
          </div>

          {/* Collapse Toggle Button */}
          {/* <div className="px-4 mb-6">
            <button
              onClick={onToggleCollapse}
              className="w-full flex items-center justify-center p-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ 
                backgroundColor: "var(--color-light-green)",
                color: "var(--color-white)"
              }}
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div> */}

          {/* Enhanced Navigation Menu */}
          <ul className="menu space-y-2 px-3">
            {items.map((item) => (
              <li key={item.path} className="relative group">
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                    isCollapsed ? "justify-center" : ""
                  } ${
                    pathname === item.path 
                      ? "shadow-lg transform scale-105" 
                      : "hover:transform hover:scale-105 hover:shadow-md"
                  }`}
                  style={{
                    backgroundColor: pathname === item.path 
                      ? "var(--color-light-green)" 
                      : "transparent",
                    color: pathname === item.path 
                      ? "var(--color-white)" 
                      : "var(--fourground-color)",
                    border: pathname === item.path 
                      ? "none" 
                      : "1px solid transparent"
                  }}
                  onMouseEnter={() => {
                    setHoveredItem(item.path);
                    if (pathname !== item.path) {
                      const element = document.querySelector(`[href="${item.path}"]`);
                      if (element) {
                        element.style.backgroundColor = "var(--gray-color)";
                        element.style.borderColor = "var(--dashboard-border)";
                      }
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredItem(null);
                    if (pathname !== item.path) {
                      const element = document.querySelector(`[href="${item.path}"]`);
                      if (element) {
                        element.style.backgroundColor = "transparent";
                        element.style.borderColor = "transparent";
                      }
                    }
                  }}
                >
                  {/* Icon */}
                  <div className={`transition-transform duration-300 ${
                    pathname === item.path ? "scale-110" : "group-hover:scale-110"
                  }`}>
                    {item.icon}
                  </div>
                  
                  {/* Label */}
                  {!isCollapsed && (
                    <span className="font-medium transition-all duration-300 flex-1">
                      {item.name}
                    </span>
                  )}

                  {/* Enhanced Badge for Doctor Approval */}
                  {!isCollapsed && item.path === "/dashboard/admin/doctor-approval" && pendingCount > 0 && (
                    <span
                      className="text-xs font-bold text-white rounded-full flex items-center justify-center min-w-6 h-6 px-1.5 shadow-lg animate-pulse"
                      style={{ backgroundColor: "var(--color-light-green)" }}
                    >
                      {pendingCount > 9 ? "9+" : pendingCount}
                    </span>
                  )}

                  {/* Collapsed Badge */}
                  {isCollapsed && item.path === "/dashboard/admin/doctor-approval" && pendingCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 text-[10px] font-bold text-white rounded-full flex items-center justify-center min-w-4 h-4 px-0.5 shadow-lg animate-pulse"
                      style={{ backgroundColor: "var(--color-light-green)" }}
                    >
                      {pendingCount > 9 ? "9+" : pendingCount}
                    </span>
                  )}

                  {/* Hover Tooltip for Collapsed State */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                      {item.name}
                      {item.path === "/dashboard/admin/doctor-approval" && pendingCount > 0 && (
                        <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full"
                              style={{ backgroundColor: "var(--color-light-green)" }}>
                          {pendingCount}
                        </span>
                      )}
                    </div>
                  )}
                </Link>

                {/* Active Indicator */}
                {pathname === item.path && (
                  <div 
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 rounded-l-full"
                    style={{ backgroundColor: "var(--color-light-green)" }}
                  ></div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="mt-auto flex flex-col items-center space-y-4 px-3">
          {/* User Role Badge */}
          {!isCollapsed && role && (
            <div className="w-full text-center mb-2">
              <span 
                className="inline-block px-3 py-1.5 text-xs font-semibold rounded-full uppercase tracking-wide border"
                style={{ 
                  backgroundColor: "var(--color-light-green)",
                  color: "var(--color-white)",
                  borderColor: "var(--color-light-green)"
                }}
              >
                {role}
              </span>
            </div>
          )}

          {/* Profile Link */}
          <Link
            href="/profile"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 w-full group ${
              isCollapsed ? "justify-center" : ""
            }`}
            style={{ 
              color: "var(--fourground-color)",
              backgroundColor: pathname === "/profile" ? "var(--color-light-green)" : "transparent",
              border: pathname === "/profile" ? "none" : "1px solid transparent"
            }}
            onMouseEnter={(e) => {
              if (pathname !== "/profile") {
                e.currentTarget.style.backgroundColor = "var(--gray-color)";
                e.currentTarget.style.borderColor = "var(--dashboard-border)";
                e.currentTarget.style.transform = "scale(1.05)";
              }
            }}
            onMouseLeave={(e) => {
              if (pathname !== "/profile") {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.transform = "scale(1)";
              }
            }}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md transition-transform duration-300 group-hover:scale-110 ${
              pathname === "/profile" ? "bg-white" : "bg-[var(--color-light-green)]"
            }`}
            style={{ 
              color: pathname === "/profile" ? "var(--color-light-green)" : "var(--color-white)"
            }}>
              <User size={16} />
            </div>
            {!isCollapsed && (
              <span className={`font-medium ${
                pathname === "/profile" ? "text-white" : "text-[var(--fourground-color)]"
              }`}>
                My Profile
              </span>
            )}
          </Link>

          {/* Enhanced Logout Button */}
          <button
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 w-full group ${
              isCollapsed ? "justify-center" : ""
            }`}
            style={{ 
              backgroundColor: "var(--color-light-green)",
              color: "var(--color-white)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <LogOut 
              size={18} 
              className={`transform transition-transform duration-300 group-hover:scale-110 ${
                isCollapsed ? "" : "mr-1"
              }`} 
            />
            {!isCollapsed && <span>Sign Out</span>}

            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                Sign Out
              </div>
            )}
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-light-green)] to-transparent opacity-20"></div>
      </aside>
    </>
  );
}