"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ items, isCollapsed }) {
  const pathname = usePathname();

  return (
    <aside
      className={`h-screen border-r border-r-[var(--dashboard-border)] px-4 py-6 flex flex-col justify-between bg-[var(--gray-color)] 
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-16" : "w-64"}
      `}
    >
      {/* Logo */}
      <div>
        <h1
          className={`font-bold mb-6 transition-opacity duration-300
            ${isCollapsed ? "opacity-0 h-0" : "text-xl opacity-100"}
          `}
        >
          CareHive
        </h1>

        <ul className="menu space-y-2">
          {items.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300
                  ${pathname === item.path ? "bg-primary text-white" : "hover:bg-base-300"}
                  ${isCollapsed ? "justify-center" : ""}
                `}
              >
                {item.icon}
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom section */}
      <div className="mt-auto">
        <Link
          href="/profile"
          className={`block px-3 py-2 hover:bg-base-300 rounded-lg transition-all duration-300 
            ${isCollapsed ? "text-center" : ""}
          `}
        >
          {isCollapsed ? "👤" : "Profile"}
        </Link>
        {!isCollapsed && (
          <button className="btn btn-error btn-sm w-full mt-3">Logout</button>
        )}
      </div>
    </aside>
  );
}
