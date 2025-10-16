"use client";
import React from "react";
import { User, Activity, Stethoscope, Cpu, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: <User className="w-16 h-16" />,
    title: "Sign Up",
    description: "Register quickly and securely to access our wellness features.",
  },
  {
    icon: <Activity className="w-16 h-16" />,
    title: "Track Health",
    description: "Monitor your physical and mental well-being with ease.",
  },
  {
    icon: <Stethoscope className="w-16 h-16" />,
    title: "Consult Doctors",
    description: "Book online appointments with certified professionals.",
  },
  {
    icon: <Cpu className="w-16 h-16" />,
    title: "Personalized Care",
    description: "Receive tailored wellness recommendations for your lifestyle.",
  },
];

const HowItWorkGrid = () => {
  return (
    <section className="py-20 px-6 bg-[var(--dashboard-bg)] container mx-auto">
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

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="group relative bg-[var(--bg-color-all)] rounded-2xl p-8 flex flex-col items-center text-center border border-[var(--dashboard-border)] hover:border-[var(--color-primary)] transition-all duration-500 hover:shadow-2xl"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center font-bold text-sm">
                {idx + 1}
              </div>
              
              {/* Icon Container */}
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
              
              {/* Connecting Line for Desktop */}
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
    </section>
  );
};

export default HowItWorkGrid;