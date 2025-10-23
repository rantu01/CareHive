"use client";
import React, { useState } from "react";
import { User, Activity, Stethoscope, Cpu, ArrowRight, X } from "lucide-react";

const steps = [
  {
    icon: <User className="w-16 h-16" />,
    title: "Sign Up",
    description: "Register quickly and securely to access our wellness features.",
    details:
      "Create your account in seconds using your email or social login. Once registered, you can personalize your dashboard and access health tools tailored to your needs.",
  },
  {
    icon: <Activity className="w-16 h-16" />,
    title: "Track Health",
    description: "Monitor your physical and mental well-being with ease.",
    details:
      "Track your daily activity, diet, and sleep patterns. Visualize your progress and set reminders to build consistent wellness habits.",
  },
  {
    icon: <Stethoscope className="w-16 h-16" />,
    title: "Consult Doctors",
    description: "Book online appointments with certified professionals.",
    details:
      "Choose from a list of verified doctors and book appointments for virtual or in-person consultations directly through the platform.",
  },
  {
    icon: <Cpu className="w-16 h-16" />,
    title: "Personalized Care",
    description: "Receive tailored wellness recommendations for your lifestyle.",
    details:
      "Our AI system analyzes your data and provides personalized diet, exercise, and health improvement tips for a balanced life.",
  },
];

const HowItWorkGrid = () => {
  const [selectedStep, setSelectedStep] = useState(null);

  return (
    <section className="py-20 px-6 bg-[var(--dashboard-bg)] container mx-auto relative">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-[var(--color-primary)]"></div>
          <span className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider">
            Our Process
          </span>
          <div className="w-3 h-3 rounded-full bg-[var(--color-primary)]"></div>
        </div>

        <h2 className="text-5xl font-bold mb-6 text-[var(--color-primary)] font-heading">
          How It Works
        </h2>

        <p className="text-xl text-[var(--text-color-all)] max-w-2xl mx-auto leading-relaxed">
          Follow these simple steps to take control of your health and wellness journey with our comprehensive platform.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedStep(step)}
              className="group relative bg-[var(--bg-color-all)] rounded-2xl p-8 flex flex-col items-center text-center border border-[var(--dashboard-border)] hover:border-[var(--color-primary)] transition-all duration-500 hover:shadow-2xl cursor-pointer"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center font-bold text-sm">
                {idx + 1}
              </div>

              {/* Icon */}
              <div className="w-24 h-24 bg-[var(--bg-color-all)] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary)] transition-all duration-500">
                <div className="text-[var(--color-primary)] group-hover:text-white transition-colors duration-500">
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-4 text-[var(--color-primary)] group-hover:text-[var(--text-color-all)] transition-colors duration-300">
                {step.title}
              </h3>

              <p className="text-[var(--text-color-all)] text-base leading-relaxed mb-4 flex-grow">
                {step.description}
              </p>

              {/* Animated Arrow */}
              <div className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <ArrowRight className="w-5 h-5" />
              </div>

              {/* Connecting Line */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 w-8 h-0.5 bg-[var(--dashboard-border)] group-hover:bg-[var(--color-primary)] transition-colors duration-500 z-0">
                  <div className="absolute -right-2 -top-1 w-2 h-2 border-r-2 border-t-2 border-[var(--dashboard-border)] group-hover:border-[var(--color-primary)] rotate-45 transition-colors duration-500"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <button className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[var(--color-secondary)] transition-all duration-300 hover:shadow-lg hover:scale-105 inline-flex items-center gap-3">
            Get Started Today
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Modal (Popup) */}
      {selectedStep && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className="bg-[var(--bg-color-all)] rounded-2xl p-8 max-w-lg mx-4 relative text-center border border-[var(--color-primary)] shadow-2xl transform transition-all duration-300 scale-100 animate-zoomIn"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedStep(null)}
              className="absolute top-4 right-4 text-[var(--text-color-all)] hover:text-[var(--color-primary)] transition"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-4 text-[var(--color-primary)]">
              {selectedStep.icon}
            </div>

            {/* Title */}
            <h3 className="text-3xl font-bold mb-3 text-[var(--color-primary)]">
              {selectedStep.title}
            </h3>

            {/* Details */}
            <p className="text-[var(--text-color-all)] text-lg leading-relaxed">
              {selectedStep.details}
            </p>

            {/* Close CTA */}
            <button
              onClick={() => setSelectedStep(null)}
              className="mt-6 bg-[var(--color-primary)] text-white px-6 py-2 rounded-xl hover:bg-[var(--color-secondary)] transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HowItWorkGrid;
