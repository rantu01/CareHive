"use client";
import React from "react";
import DashboardLayout from "@/app/Component/Dashboard/DashboardLayout";
import { useUser } from "../../context/UserContext"; // check path

function Page() {
  const { user, role, loading } = useUser();
  console.log(role)

  if (loading) return <p>Loading...</p>;             // waiting for user data
  if (!user) return <p>Please log in</p>; // role check

  return <DashboardLayout role={role} />;
}

export default Page;
