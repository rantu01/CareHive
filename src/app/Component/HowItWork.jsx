"use client";
import React from "react";
import { motion } from "framer-motion";
import { User, Activity, Stethoscope, Cpu } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Sign Up & Create Profile",
    icon: <User className="w-8 h-8 text-blue-600" />,
    points: [
      "Register as a General User, Patient, or Doctor",
      "Set up your profile: name, age, weight, height",
      "Add your medical history and health goals",
    ],
  },
  {
    id: 2,
    title: "Explore & Track Health",
    icon: <Activity className="w-8 h-8 text-green-600" />,
    points: [
      "Track BMI, calories, and steps in the dashboard",
      "Get health reports and personalized recommendations",
      "Explore wellness programs like gym, yoga, and diet plans",
    ],
  },
  {
    id: 3,
    title: "Connect with Doctors",
    icon: <Stethoscope className="w-8 h-8 text-purple-600" />,
    points: [
      "Search doctors by specialization, hospital, or location",
      "Check available slots and book appointments online",
      "Access doctor profiles and patient medical history",
    ],
  },
  {
    id: 4,
    title: "Get Personalized Care",
    icon: <Cpu className="w-8 h-8 text-orange-600" />,
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
    <section className="py-20 px-6 bg-gradient-to-r from-[var(--color-light-green)]/30 to-[var(--color-calm-blue)]/20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
          How It Works
        </h2>
        <p
  className="text-lg max-w-2xl mx-auto mb-14 
  text-transparent bg-clip-text bg-gradient-to-r 
  from-[var(--color-black)] via-[var(--color-calm-blue)] to-[var(--color-light-green)]"
>
  A simple and seamless process to take care of your health, 
  connect with doctors, and track your wellness journey.
</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg relative border border-gray-100 hover:shadow-2xl transition"
            >
              {/* Number Badge */}
              <div className="absolute -top-5 -left-5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white w-12 h-12 flex items-center justify-center rounded-full font-bold shadow-lg">
                {step.id}
              </div>

              {/* Icon Circle */}
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full shadow-inner">
                  {step.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                {step.title}
              </h3>

              {/* Points */}
              <ul className="list-disc text-left space-y-2 pl-5 text-gray-700">
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
