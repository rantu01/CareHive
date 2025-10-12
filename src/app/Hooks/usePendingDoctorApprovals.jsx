// hooks/usePendingDoctorApprovals.js
import { useState, useEffect, useCallback } from "react";

export default function usePendingDoctorApprovals(role) {
  const [pendingCount, setPendingCount] = useState(0);
  const [adminNotifications, setAdminNotifications] = useState([]);

  const fetchPending = useCallback(async () => {
    if (role !== "admin") return;
    try {
      const res = await fetch("/api/approved-doctor");
      const data = await res.json();
      if (data.ok) {
        setPendingCount(data.data.length);
        setAdminNotifications(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch admin notifications:", err);
    }
  }, [role]);

  useEffect(() => {
    if (role !== "admin") return;
    fetchPending();
    const interval = setInterval(fetchPending, 30000);
    return () => clearInterval(interval);
  }, [role, fetchPending]);

  return { pendingCount, adminNotifications, refresh: fetchPending };
}
