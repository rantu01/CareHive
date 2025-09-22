"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ items, isCollapsed }) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed top-0 left-0 h-screen px-4 py-6 flex flex-col justify-between transition-all duration-300 ease-in-out overflow-y-auto
        ${isCollapsed ? "w-16" : "w-64"}`}
      style={{
        backgroundColor: "var(--sidebar-bg)",
        borderRight: "1px solid var(--dashboard-border)",
      }}
    >
      {/* Logo */}
      <div>
        <h1
          className={`font-bold mb-6 transition-opacity duration-300
            ${isCollapsed ? "opacity-0 h-0" : "text-xl opacity-100"}`}
          style={{ color: "var(--fourground-color)" }}
        >
          <Link href="/">CareHive</Link>
        </h1>

        <ul className="menu space-y-2">
          {items.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300
                  ${isCollapsed ? "justify-center" : ""}`}
                style={{
                  backgroundColor:
                    pathname === item.path ? "var(--color-calm-blue)" : "transparent",
                  color:
                    pathname === item.path ? "var(--color-white)" : "var(--fourground-color)",
                }}
              >
                {item.icon}
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom section */}
      <div className="mt-auto flex flex-col items-center">
        <Link
          href="/profile"
          className="block px-3 py-2 rounded-lg transition-all duration-300"
          style={{
            textAlign: isCollapsed ? "center" : "left",
            color: "var(--fourground-color)",
            backgroundColor: "transparent",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--dashboard-blue)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          {isCollapsed ? "👤" : "Profile"}
        </Link>
        {!isCollapsed && (
          <button
            className="w-full mt-3 py-2 rounded-lg font-medium transition-colors duration-300"
            style={{
              backgroundColor: "var(--color-calm-blue)",
              color: "var(--color-white)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-light-green)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-calm-blue)")
            }
          >
            Logout
          </button>
        )}
      </div>
    </aside>
  );
}
