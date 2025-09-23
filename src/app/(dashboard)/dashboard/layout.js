"use client";
import React from "react";
import DashboardLayout from "@/app/Component/Dashboard/DashboardLayout";
import { useUser } from "../../context/UserContext"; // check path
import Loader from "@/app/Component/Loader";

function MainLayout({ children }) {
  const { user, role, loading } = useUser();
  console.log(role)

  if (loading) return <Loader />;             // waiting for user data
  if (!user) return <p>Please log in</p>; // role check

  return <DashboardLayout role={role}>{children}</DashboardLayout>;
}

export default MainLayout;
