"use client";
import React from "react";
import { User, Activity, Stethoscope, Cpu } from "lucide-react";

const steps = [
  {
    icon: <User className="text-[var(--color-calm-blue)] text-8xl" />, // বড় icon
    title: "Sign Up",
    description: "Register quickly and securely to access our wellness features.",
  },
  {
    icon: <Activity className="text-[var(--color-calm-blue)] text-8xl" />,
    title: "Track Health",
    description: "Monitor your physical and mental well-being with ease.",
  },
  {
    icon: <Stethoscope className="text-[var(--color-calm-blue)] text-8xl" />,
    title: "Consult Doctors",
    description: "Book online appointments with certified professionals.",
  },
  {
    icon: <Cpu className="text-[var(--color-calm-blue)] text-8xl" />,
    title: "Personalized Care",
    description: "Receive tailored wellness recommendations for your lifestyle.",
  },
];

const HowItWorkGrid = () => {
  return (
    <section className="py-20 px-6 bg-[var(--dashboard-bg)]">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-bold mb-4 text-[var(--color-calm-blue)]">How It Works</h2>
        <p className="text-lg text-[var(--fourground-color)] max-w-2xl mx-auto">
          Follow these steps to take control of your health and wellness journey.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-[var(--color-white)] border border-[var(--color-calm-blue)] rounded-2xl p-10 flex flex-col items-center text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="mb-8">{step.icon}</div>
            <h3 className="text-2xl font-semibold mb-4 text-[var(--color-calm-blue)]">{step.title}</h3>
            <p className="text-[var(--fourground-color)] text-base leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorkGrid;
