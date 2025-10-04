"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/UserContext"; // adjust path if needed
import Loader from "@/app/Component/Loader";
import AdminLinks from "@/app/Component/Admin-Dashboard/adminLink";

export default function DashboardPage() {
  const { user, role, loading } = useUser();
  const router = useRouter();

  // Redirect based on role
  useEffect(() => {
    if (!loading && user) {
      if (role === "admin") router.push("/dashboard/admin");
      else if (role === "doctor") router.push("/dashboard/doctor");
      else if (role === "user") router.push("/dashboard/user");
    }
  }, [loading, user, role, router]);

  if (loading) return <Loader />;
  if (!user) return <p className="text-center p-6">Please log in</p>;

  // Optional: You can keep this content if you want a "landing page" before redirect
  return (
    <div className="rounded-lg min-h-screen" style={{ backgroundColor: "var(--dashboard-bg)", color: "var(--fourground-color)" }}>
      <p className="text-center p-6">Redirecting to your dashboard...</p>
    </div>
  );
}
