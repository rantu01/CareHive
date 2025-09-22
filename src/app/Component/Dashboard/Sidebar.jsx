// ----------------------------- Sidebar.jsx -----------------------------
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ items = [], isCollapsed, mobileOpen, onCloseMobile }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      <div
        aria-hidden={!mobileOpen}
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-200 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onCloseMobile}
      />

      <aside
        className={`fixed top-0 left-0 h-screen px-4 py-6 flex flex-col justify-between transition-all duration-300 ease-in-out overflow-y-auto z-50 transform ${
          isCollapsed ? "w-16" : "w-64"
        } md:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ backgroundColor: "var(--sidebar-bg)", borderRight: "1px solid var(--dashboard-border)" }}
      >
        {/* Mobile close button */}
        <div className="md:hidden mb-3 flex justify-end">
          <button aria-label="Close menu" onClick={onCloseMobile} className="p-2 rounded-md hover:bg-white/5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div>
          <h1
            className={`font-bold mb-6 transition-all duration-300 ${
              isCollapsed ? "opacity-0 h-0 overflow-hidden" : "text-xl opacity-100"
            }`}
            style={{ color: "var(--fourground-color)" }}
          >
            <Link href="/">CareHive</Link>
          </h1>

          <ul className="menu space-y-2">
            {items.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isCollapsed ? "justify-center" : ""
                  }`}
                  style={{
                    backgroundColor: pathname === item.path ? "var(--color-calm-blue)" : "transparent",
                    color: pathname === item.path ? "var(--color-white)" : "var(--fourground-color)",
                  }}
                >
                  {item.icon}
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex flex-col items-center">
          <Link
            href="/profile"
            className="block px-3 py-2 rounded-lg transition-all duration-300 w-full"
            style={{ textAlign: isCollapsed ? "center" : "left", color: "var(--fourground-color)", backgroundColor: "transparent" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--dashboard-blue)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            {isCollapsed ? "👤" : "Profile"}
          </Link>

          {!isCollapsed && (
            <button
              className="w-full mt-3 py-2 rounded-lg font-medium transition-colors duration-300"
              style={{ backgroundColor: "var(--color-calm-blue)", color: "var(--color-white)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-light-green)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-calm-blue)")}
            >
              Logout
            </button>
          )}
        </div>
      </aside>
    </>
  );
}