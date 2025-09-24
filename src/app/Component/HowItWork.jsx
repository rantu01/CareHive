"use client";
import React from "react";
import { motion } from "framer-motion";
import { User, Activity, Stethoscope, Cpu } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Sign Up & Create Profile",
    icon: <User className="w-7 h-7" style={{ color: "var(--color-calm-blue)" }} />,
    points: [
      "Register as a General User, Patient, or Doctor",
      "Set up your profile: name, age, weight, height",
      "Add your medical history and health goals",
    ],
  },
  {
    id: 2,
    title: "Explore & Track Health",
    icon: <Activity className="w-7 h-7" style={{ color: "var(--color-light-green)" }} />,
    points: [
      "Track BMI, calories, and steps in the dashboard",
      "Get health reports and personalized recommendations",
      "Explore wellness programs like gym, yoga, and diet plans",
    ],
  },
  {
    id: 3,
    title: "Connect with Doctors",
    icon: <Stethoscope className="w-7 h-7" style={{ color: "var(--dashboard-blue)" }} />,
    points: [
      "Search doctors by specialization, hospital, or location",
      "Check available slots and book appointments online",
      "Access doctor profiles and patient medical history",
    ],
  },
  {
    id: 4,
    title: "Get Personalized Care",
    icon: <Cpu className="w-7 h-7" style={{ color: "var(--color-calm-blue)" }} />,
    points: [
      "Receive consultations & read health blogs",
      "24/7 guidance from AI Health Chatbot",
      "Use hospital directory & wellness services",
      "Make secure online payments for premium features",
    ],
  },
];

const HowItWork = () => {
  return (
    <section
      className="py-20 px-6 md:px-20"
      style={{ backgroundColor: "var(--dashboard-bg)" }}
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h2
          className="text-4xl md:text-5xl font-extrabold mb-6"
          style={{ color: "var(--color-calm-blue)" }}
        >
          How It Works
        </h2>

        {/* Subtitle */}
        <p
          className="text-lg max-w-2xl mx-auto mb-14"
          style={{ color: "var(--fourground-color)" }}
        >
          A simple and seamless process to take care of your health,
          connect with doctors, and track your wellness journey.
        </p>

        {/* Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95, rotate: -1 }}
              className="p-6 rounded-2xl shadow-lg relative border transition"
              style={{
                background: `linear-gradient(to bottom right, var(--color-light-green)/50, var(--color-white)/20, var(--color-calm-blue)/40)`,
                borderColor: "var(--dashboard-border)",
              }}
            >
              {/* Number Badge */}
              <div
                className="absolute -top-5 -left-5 w-12 h-12 flex items-center justify-center rounded-full font-bold shadow-lg"
                style={{
                  background: `linear-gradient(to right, var(--color-light-green), var(--color-calm-blue))`,
                  color: "var(--color-white)",
                }}
              >
                {step.id}
              </div>

              {/* Icon Circle */}
              <div className="mb-6 flex justify-center">
                <div
                  className="p-4 rounded-full shadow-inner"
                  style={{
                    background: `linear-gradient(to bottom right, var(--color-light-green), var(--color-calm-blue))`,
                  }}
                >
                  {step.icon}
                </div>
              </div>

              {/* Title */}
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "var(--fourground-color)" }}
              >
                {step.title}
              </h3>

              {/* Points */}
              <ul
                className="list-disc text-left space-y-2 pl-5 text-sm"
                style={{ color: "var(--fourground-color)" }}
              >
                {step.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWork;
