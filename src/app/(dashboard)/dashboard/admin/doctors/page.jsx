"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Stethoscope,
  HeartPulse,
  Brain,
  Baby,
  Bone,
  User2,
} from "lucide-react";

const doctors = [
  {
    id: 1,
    name: "Dr. Ahsan Kabir",
    specialty: "Cardiologist",
    hospital: "City Hospital",
    icon: HeartPulse,
  },
  {
    id: 2,
    name: "Dr. Rima Akter",
    specialty: "Dermatologist",
    hospital: "Green Life Hospital",
    icon: User2,
  },
  {
    id: 3,
    name: "Dr. Mahmud Hasan",
    specialty: "Neurologist",
    hospital: "Square Hospital",
    icon: Brain,
  },
  {
    id: 4,
    name: "Dr. Farhana Rahman",
    specialty: "Pediatrician",
    hospital: "Popular Hospital",
    icon: Baby,
  },
  {
    id: 5,
    name: "Dr. Saif Ullah",
    specialty: "Orthopedic Surgeon",
    hospital: "United Hospital",
    icon: Bone,
  },
  {
    id: 6,
    name: "Dr. Nusrat Jahan",
    specialty: "Gynecologist",
    hospital: "Apollo Hospital",
    icon: Stethoscope,
  },
];

export default function Page() {
  return (
    <div className="p-8 bg-[var(--dashboard-bg)] min-h-screen">
      {/* Title Center */}
      <h1 className="text-3xl font-bold mb-10 text-center text-[var(--fourground-color)]">
        Available Doctors
      </h1>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map((doc) => {
          const Icon = doc.icon;

          return (
            <motion.div
              key={doc.id}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0px 0px 25px rgba(70,130,180,0.45), 0px 0px 50px rgba(70,130,180,0.25)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative cursor-pointer rounded-2xl p-6 shadow-md bg-[var(--sidebar-bg)]"
            >
              {/* Content */}
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <Icon className="w-12 h-12 text-[var(--color-calm-blue)] mb-4" />

                {/* Info */}
                <h2 className="text-xl font-semibold text-[var(--color-calm-blue)] mb-1">
                  {doc.name}
                </h2>
                <p className="text-[var(--fourground-color)] font-medium">
                  {doc.specialty}
                </p>
                <p className="text-sm text-[var(--color-black)] dark:text-[var(--color-white)] mt-1">
                  {doc.hospital}
                </p>

                {/* Button */}
                <button className="mt-6 w-full py-2 rounded-xl font-semibold text-[var(--color-white)] bg-gradient-to-r from-[var(--color-calm-blue)] to-[var(--color-light-green)] hover:opacity-90 transition">
                  Book Appointment
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
