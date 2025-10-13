"use client";
import { Bell, PanelLeft, UserPlus, Search, Settings, LogOut } from "lucide-react";
import { useUser } from "../../context/UserContext";
import { useEffect, useState, useRef, useCallback } from "react";
import ThemeToggle from "../ThemeToggle";
import Link from "next/link";
import useNotifications from "@/app/Hooks/useNotifications";

export default function Topbar({ toggleSidebar }) {
  const { user, loading, role } = useUser();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  // Local notifications state
  const [storedNotifications, setStoredNotifications] = useState([]);

  // Memoized callback to handle incoming notification
  const saveNotification = useCallback(
    async (notification) => {
      if (!user?.email || !notification?.title) return;

      // 1️⃣ Optimistic update for immediate UI
      const tempId = Date.now().toString();
      setStoredNotifications((prev) => [
        { ...notification, read: false, _id: tempId },
        ...prev,
      ]);

      try {
        const res = await fetch("/api/notifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail: user.email,
            title: notification.title,
            body: notification.body,
            read: false,
          }),
        });
        const data = await res.json();

        if (data.success && data.notification) {
          // Replace temp ID with real DB ID
          setStoredNotifications((prev) =>
            prev.map((n) => (n._id === tempId ? data.notification : n))
          );
        }
      } catch (err) {
        console.error("Failed to save notification:", err);
      }
    },
    [user]
  );

  // Real-time FCM listener
  useNotifications({ onNewNotification: user?.email ? saveNotification : undefined });

  // Fetch existing notifications from DB on load
  useEffect(() => {
    if (!user?.email) return;

    const fetchNotifications = async () => {
      try {
        const res = await fetch(`/api/notifications?email=${user.email}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.notifications)) {
          setStoredNotifications(data.notifications);
        }
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };

    fetchNotifications();
  }, [user]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          profileRef.current && !profileRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <header
        className="w-full px-4 sm:px-6 py-3 flex items-center justify-between backdrop-blur-sm animate-pulse"
        style={{
          backgroundColor: "var(--sidebar-bg)",
          borderBottom: "2px solid var(--dashboard-border)",
        }}
      >
        <div className="w-8 h-8 rounded-lg bg-[var(--gray-color)]"></div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--gray-color)]"></div>
          <div className="w-8 h-8 rounded-full bg-[var(--gray-color)]"></div>
        </div>
      </header>
    );
  }

  const unreadCount = storedNotifications.filter((n) => !n.read).length;

  const handleMarkAsRead = async (n) => {
    if (n.read) return;

    try {
      await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: n._id, read: true }),
      });

      setStoredNotifications((prev) =>
        prev.map((notif) =>
          notif._id === n._id ? { ...notif, read: true } : notif
        )
      );
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    const unreadNotifications = storedNotifications.filter(n => !n.read);
    
    try {
      await Promise.all(
        unreadNotifications.map(n =>
          fetch("/api/notifications", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: n._id, read: true }),
          })
        )
      );

      setStoredNotifications(prev =>
        prev.map(notif => ({ ...notif, read: true }))
      );
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  return (
    <header
      className="w-full px-4 sm:px-6 py-3 flex items-center justify-between transition-all duration-300 backdrop-blur-sm sticky top-0 z-40"
      style={{
        backgroundColor: "var(--sidebar-bg)",
        borderBottom: "2px solid var(--dashboard-border)",
        color: "var(--fourground-color)",
        boxShadow: "0 2px 20px rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* Left Section */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={toggleSidebar}
          className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 hover:scale-105 group"
          style={{
            color: "var(--fourground-color)",
            backgroundColor: "var(--gray-color)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <PanelLeft 
            size={20} 
            className="group-hover:scale-110 transition-transform duration-300" 
          />
        </button>

        {/* Search Bar */}
        <div className="hidden md:flex items-center relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-[var(--color-light-green)]" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2.5 w-64 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-light-green)] focus:border-transparent"
            style={{
              backgroundColor: "var(--dashboard-bg)",
              borderColor: "var(--dashboard-border)",
              color: "var(--fourground-color)",
            }}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Become Doctor Button - Only for users */}
        {role === "user" && (
          <Link
            href={"/dashboard/user/apply-for-doctor"}
            className="hidden sm:flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            style={{ backgroundColor: "var(--color-light-green)" }}
          >
            <UserPlus size={18} className="transform group-hover:scale-110 transition-transform" />
            <span>Become A Doctor</span>
          </Link>
        )}

        <ThemeToggle />

        {/* Notification Bell */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpenDropdown(openDropdown === 'notifications' ? null : 'notifications')}
            className="cursor-pointer relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 hover:scale-105 group"
            style={{
              color: "var(--fourground-color)",
              backgroundColor: "var(--gray-color)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Bell
              size={20}
              className="group-hover:scale-110 transition-transform duration-300"
            />
            {unreadCount > 0 && (
              <span
                className="absolute -top-1 -right-1 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse min-w-5 h-5 px-1"
                style={{ backgroundColor: "var(--color-light-green)" }}
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {openDropdown === 'notifications' && (
            <div
              className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-2xl shadow-2xl z-50 transition-all duration-300 border"
              style={{
                backgroundColor: "var(--dashboard-bg)",
                borderColor: "var(--dashboard-border)",
              }}
            >
              {/* Notifications Header */}
              <div className="p-4 border-b" style={{ borderColor: "var(--dashboard-border)" }}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg" style={{ color: "var(--color-light-green)" }}>
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllAsRead}
                      className="text-sm font-medium px-3 py-1 rounded-lg transition-all duration-300 hover:scale-105"
                      style={{ 
                        backgroundColor: "var(--color-light-green)",
                        color: "var(--color-white)"
                      }}
                    >
                      Mark all read
                    </button>
                  )}
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-64 overflow-y-auto">
                {storedNotifications.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell size={32} className="mx-auto mb-2 opacity-50" style={{ color: "var(--fourground-color)" }} />
                    <p className="text-sm opacity-70" style={{ color: "var(--fourground-color)" }}>
                      No notifications
                    </p>
                  </div>
                ) : (
                  storedNotifications.map((n) => (
                    <div
                      key={n._id}
                      className={`px-4 py-3 border-b transition-all duration-200 cursor-pointer group ${
                        !n.read ? 'animate-pulse' : ''
                      }`}
                      style={{
                        backgroundColor: n.read ? "transparent" : "var(--gray-color)",
                        borderColor: "var(--dashboard-border)",
                      }}
                      onClick={() => handleMarkAsRead(n)}
                    >
                      <div className="flex items-start gap-3">
                        <div 
                          className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            n.read ? 'bg-transparent' : 'bg-[var(--color-light-green)]'
                          }`}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <p
                            className="font-semibold text-sm truncate"
                            style={{
                              color: n.read ? "var(--fourground-color)" : "var(--color-light-green)",
                            }}
                          >
                            {n.title}
                          </p>
                          <p
                            className="text-xs mt-1 line-clamp-2"
                            style={{ color: "var(--fourground-color)" }}
                          >
                            {n.body}
                          </p>
                          <p className="text-xs opacity-60 mt-1" style={{ color: "var(--fourground-color)" }}>
                            {new Date(n.createdAt || Date.now()).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Notifications Footer */}
              {storedNotifications.length > 0 && (
                <div className="p-3 border-t" style={{ borderColor: "var(--dashboard-border)" }}>
                  <Link
                    href="/dashboard/notifications"
                    className="block text-center text-sm font-medium py-2 rounded-lg transition-all duration-300 hover:scale-105"
                    style={{ 
                      backgroundColor: "var(--color-light-green)",
                      color: "var(--color-white)"
                    }}
                  >
                    View All Notifications
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setOpenDropdown(openDropdown === 'profile' ? null : 'profile')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group p-1 rounded-xl transition-all duration-300 hover:bg-[var(--gray-color)]"
          >
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg border-2"
              style={{ borderColor: "var(--color-light-green)" }}
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
                    backgroundColor: "var(--color-light-green)",
                    color: "var(--color-white)",
                  }}
                >
                  {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
            </div>

            <div className="hidden sm:flex flex-col text-sm leading-tight text-left">
              <span
                style={{ color: "var(--fourground-color)" }}
                className="font-semibold transition-colors duration-300 group-hover:text-[var(--color-light-green)]"
              >
                {user?.displayName || "No Name"}
              </span>
              <span
                className="text-xs font-medium capitalize transition-colors duration-300"
                style={{ color: "var(--color-light-green)" }}
              >
                {role || "User"}
              </span>
            </div>
          </button>

          {openDropdown === 'profile' && (
            <div
              className="absolute right-0 mt-2 w-56 rounded-2xl shadow-2xl z-50 transition-all duration-300 border"
              style={{
                backgroundColor: "var(--dashboard-bg)",
                borderColor: "var(--dashboard-border)",
              }}
            >
              {/* Profile Header */}
              <div className="p-4 border-b" style={{ borderColor: "var(--dashboard-border)" }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full overflow-hidden border-2"
                    style={{ borderColor: "var(--color-light-green)" }}
                  >
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="flex items-center justify-center w-full h-full text-lg font-semibold"
                        style={{
                          backgroundColor: "var(--color-light-green)",
                          color: "var(--color-white)",
                        }}
                      >
                        {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: "var(--fourground-color)" }}>
                      {user?.displayName || "No Name"}
                    </p>
                    <p className="text-sm capitalize" style={{ color: "var(--color-light-green)" }}>
                      {role || "User"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile Menu */}
              <div className="p-2">
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-[var(--gray-color)] group"
                >
                  <UserPlus size={18} style={{ color: "var(--color-light-green)" }} />
                  <span style={{ color: "var(--fourground-color)" }}>My Profile</span>
                </Link>
                
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-[var(--gray-color)] group"
                >
                  <Settings size={18} style={{ color: "var(--color-light-green)" }} />
                  <span style={{ color: "var(--fourground-color)" }}>Settings</span>
                </Link>
              </div>

              {/* Logout Section */}
              <div className="p-3 border-t" style={{ borderColor: "var(--dashboard-border)" }}>
                <button
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{ backgroundColor: "var(--color-light-green)" }}
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}