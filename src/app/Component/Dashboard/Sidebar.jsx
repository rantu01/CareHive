"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ items }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-[var(--color-gray)] border-r px-4 py-6 flex flex-col justify-between">
      {/* Logo */}
      <div>
        <h1 className="text-xl font-bold mb-6">CareHive</h1>
        <ul className="menu space-y-2">
          {items.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                  pathname === item.path ? "bg-primary text-white" : "hover:bg-base-300"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom section */}
      <div className="mt-auto">
        <Link href="/profile" className="block px-3 py-2 hover:bg-base-300 rounded-lg">
          Profile
        </Link>
        <button className="btn btn-error btn-sm w-full mt-3">Logout</button>
      </div>
    </aside>
  );
}
