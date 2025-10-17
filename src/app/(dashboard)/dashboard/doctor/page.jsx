"use client";
import { useEffect, useState } from "react";
import DashboardStats from "@/app/Component/DoctorsComponent/DashboardStats";

import Header from "@/app/Component/DoctorsComponent/Header";
import PerformanceAndActions from "@/app/Component/DoctorsComponent/PerformanceAndActions";
import { useUser } from "@/app/context/UserContext";
import DoctorsSchedule from "@/app/Component/DoctorsComponent/DoctorsSchedule ";

export default function DoctorDashboard() {
  const [doctorId, setDoctorId] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchDoctorId = async () => {
      if (!user?.email) return;

      try {
        const res = await fetch("/api/doctors");
        const doctors = await res.json();

        // Match doctor by logged-in user's email
        const matchedDoctor = doctors.find(
          (doc) => doc.personalInfo?.email === user.email
        );

        if (matchedDoctor?._id) {
          setDoctorId(matchedDoctor._id);
          // console.log("✅ Found doctor ID:", matchedDoctor._id);
        } else {
          console.warn("⚠️ No matching doctor found for email:", user.email);
        }
      } catch (error) {
        console.error("❌ Error fetching doctors:", error);
      }
    };

    fetchDoctorId();
  }, [user?.email]);

  if (!doctorId) {
    return <p className="text-center py-10 text-gray-500">Loading doctor data...</p>;
  }

  return (
    <div className="ml-5">
      <Header doctorId={doctorId} />
      <DashboardStats doctorId={doctorId} />
      <DoctorsSchedule doctorId={doctorId} />
      <PerformanceAndActions doctorId={doctorId} />
    </div>
  );
}
