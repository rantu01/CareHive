"use client";

import { useParams } from "next/navigation";
import AvailableTimeSlots from "../AvailableTimeSlots";

export default function DoctorAvailableTimePage() {
  const { doctorId } = useParams();
  if (!doctorId) return <p>Loading...</p>;

  return <AvailableTimeSlots doctorId={doctorId} />;
}
