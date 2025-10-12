"use client";
import { Bell, PanelLeft, UserPlus } from "lucide-react";
import { useUser } from "../../context/UserContext";
import { useEffect, useState, useRef, useCallback } from "react";
import ThemeToggle from "../ThemeToggle";
import Link from "next/link";
import useNotifications from "@/app/Hooks/useNotifications";
import { toast } from "react-hot-toast";

export default function Topbar({ toggleSidebar }) {
  const { user, loading, role } = useUser();
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

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

      // 2️⃣ Show toast immediately
      // toast(`${notification.title}: ${notification.body}`, {
      //   duration: 5000,
      //   position: "top-right",
      // });

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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return null;

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

  return (
    <header
      className="w-full px-4 sm:px-6 py-3 flex items-center justify-between transition-all duration-300 backdrop-blur-sm"
      style={{
        backgroundColor: "var(--sidebar-bg)",
        borderBottom: "2px solid var(--dashboard-border)",
        color: "var(--fourground-color)",
        boxShadow: "0 2px 20px rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* Left Section */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={toggleSidebar}
          className="cursor-pointer sm:w-10 sm:h-10 w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 hover:scale-105"
          style={{
            color: "var(--fourground-color)",
            backgroundColor: "var(--gray-color)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <PanelLeft size={20} />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-5 ml-2">
        <ThemeToggle />

        {/* Notification Bell */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="cursor-pointer relative sm:w-10 sm:h-10 w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 hover:scale-105 group"
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
                className="absolute -top-1 -right-1 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse"
                style={{
                  minWidth: "18px",
                  height: "18px",
                  padding: "0 5px",
                  background: "linear-gradient(135deg, #FF6B6B, #FF8E8E)",
                  boxShadow: "0 2px 6px rgba(255, 107, 107, 0.4)",
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {openDropdown && (
            <div
              className="absolute right-0 mt-2 w-72 max-h-80 overflow-y-auto rounded-lg shadow-lg z-50 transition-all duration-300"
              style={{
                backgroundColor: "var(--sidebar-bg)",
                border: "1px solid var(--dashboard-border)",
              }}
            >
              {storedNotifications.length === 0 ? (
                <p
                  className="text-sm p-4 text-center"
                  style={{ color: "var(--fourground-color)" }}
                >
                  No notifications
                </p>
              ) : (
                storedNotifications.map((n) => (
                  <div
                    key={n._id}
                    className="px-4 py-3 border-b last:border-none cursor-pointer transition-colors duration-200"
                    style={{
                      backgroundColor: n.read
                        ? "var(--sidebar-bg)"
                        : "var(--notification-unread)",
                      borderColor: "var(--dashboard-border)",
                    }}
                    onClick={() => handleMarkAsRead(n)}
                  >
                    <p
                      className="font-semibold text-sm"
                      style={{
                        color: n.read
                          ? "var(--fourground-color-faded)"
                          : "var(--fourground-color)",
                      }}
                    >
                      {n.title}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{
                        color: n.read
                          ? "var(--fourground-color-faded)"
                          : "var(--fourground-color)",
                      }}
                    >
                      {n.body}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
          <div
            className="w-7 h-7 sm:w-9 sm:h-9 rounded-full overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
            style={{
              border: "3px solid var(--dashboard-blue)",
              boxShadow: "0 4px 12px rgba(49, 153, 238, 0.3)",
            }}
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
                  backgroundColor: "var(--dashboard-blue)",
                  color: "white",
                }}
              >
                {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
          </div>

          <div className="hidden sm:flex flex-col text-sm leading-tight">
            <span
              style={{ color: "var(--fourground-color)" }}
              className="font-semibold transition-colors duration-300 group-hover:text-[var(--dashboard-blue)]"
            >
              {user?.displayName || "No Name"}
            </span>
            <span
              className="text-xs font-medium transition-colors duration-300 group-hover:text-[var(--color-calm-blue)]"
              style={{ color: "var(--dashboard-blue)" }}
            >
              {role || "User"}
            </span>
          </div>
        </div>

        {role === "user" && (
          <Link
            href={"/dashboard/user/apply-for-doctor"}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--dashboard-blue)] to-[var(--dashboard-blue)]/90 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer border border-[var(--dashboard-blue)]/30 hover:from-[var(--dashboard-blue)]/90 hover:to-[var(--dashboard-blue)]"
          >
            <UserPlus size={18} />
            <span>Become A Doctor</span>
          </Link>
        )}
      </div>
    </header>
  );
}
