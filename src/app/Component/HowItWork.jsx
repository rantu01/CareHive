"use client";
import React from "react";
import { motion } from "framer-motion";
import { User, Activity, Stethoscope, Cpu } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Sign Up & Create Profile",
    icon: <User className="w-10 h-10 text-blue-500" />,
    points: [
      "Register as a General User, Patient, or Doctor",
      "Set up your profile: name, age, weight, height",
      "Add your medical history and health goals",
    ],
  },
  {
    id: 2,
    title: "Explore & Track Health",
    icon: <Activity className="w-10 h-10 text-green-500" />,
    points: [
      "Track BMI, calories, and steps in the dashboard",
      "Get health reports and personalized recommendations",
      "Explore wellness programs like gym, yoga, and diet plans",
    ],
  },
  {
    id: 3,
    title: "Connect with Doctors & Book Appointments",
    icon: <Stethoscope className="w-10 h-10 text-purple-500" />,
    points: [
      "Search doctors by specialization, hospital, or location",
      "Check available slots and book appointments online",
      "Access doctor profiles and patient medical history",
    ],
  },
  {
    id: 4,
    title: "Get Personalized Care & Services",
    icon: <Cpu className="w-10 h-10 text-orange-500" />,
    points: [
      "Receive doctor consultations and read health blogs/tips",
      "Get 24/7 guidance from the AI Health Chatbot",
      "Use hospital directory and wellness services",
      "Make secure online payments for premium features",
    ],
  },
];

const HowItWork = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-light-green)] to-[var(--color-calm-blue)]">
  How It Works
</h2>

       


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-md transition relative"
              whileHover={{
                y: -10, // hover এ card উপরে উঠবে
                boxShadow: "0px 20px 40px rgba(0,0,0,0.1)", // shadow বড় হবে
              }}
            >
              {/* Number Badge */}
              <div className="absolute -top-5 -left-5 bg-blue-400 text-white w-12 h-12 flex items-center justify-center rounded-full font-bold shadow">
                {step.id}
              </div>

              {/* Icon */}
              <div className="mb-4 flex justify-center">{step.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-4 text-blue-400">{step.title}</h3>

              {/* Points */}
              <ul className="list-disc text-left space-y-2 pl-5 text-gray-800">
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
