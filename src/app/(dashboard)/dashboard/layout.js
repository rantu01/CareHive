"use client";
import React from "react";
import DashboardLayout from "@/app/Component/Dashboard/DashboardLayout";
import { useUser } from "../../context/UserContext"; // check path
import Loader from "@/app/Component/Loader";
import Notifications from "@/app/Component/Notifications";
import { Toaster } from "react-hot-toast";
import LoginPrompt from "@/app/Component/LoginPrompt";

function MainLayout({ children }) {
  const { user, role, loading } = useUser();

  if (loading) return <Loader />; // waiting for user data
  if (!user) return <LoginPrompt></LoginPrompt>; // role check

  return (
    <DashboardLayout role={role}>
      <Notifications />
      <Toaster />
      {children}
    </DashboardLayout>
  );
}

export default MainLayout;
