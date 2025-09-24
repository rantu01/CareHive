"use client"; 
import BmiCalculator from '@/app/Component/BmiCalculator';
import Footer from '@/app/Component/Footer';
import HealthLog from '@/app/Component/HealthLog';
import CalorieTracker from '@/app/Component/CalorieTracker';
import Navbar from '@/app/Component/Navbar';
import QuickHealthTips from '@/app/Component/QuickHealthTips';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [descVisible, setDescVisible] = useState(false);

  useEffect(() => {
    setTitleVisible(true);
    setTimeout(() => setDescVisible(true), 300);
  }, []);

  return (
    <div style={{ background: "var(--dashboard-bg)", color: "var(--fourground-color)" }}>
      

      {/* Hero Section */}
      <div className="pt-30 text-center">
        {/* Title */}
        <h1
          className={`text-3xl md:text-4xl font-extrabold mt-6 transition-all duration-1000 ease-out ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
          }`}
          style={{ color: "var(--color-calm-blue)" }}
        >
          Your Complete Health & Wellness Solution
        </h1>

        {/* Description */}
        <p
          className={`mt-4 text-sm md:text-lg max-w-6xl mx-auto transition-all duration-1000 ease-out ${
            descVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ color: "var(--fourground-color)" }}
        >
          CareHive is a unified digital platform designed to support your overall health and wellness.
          Track key health metrics, manage appointments, and follow personalized wellness programs to
          achieve a healthier, more balanced lifestyle.
        </p>

        {/* Components */}
        <div className="mt-8">
          <BmiCalculator />
          <CalorieTracker />
          <HealthLog />
          <QuickHealthTips />
        </div>
      </div>
    </div>
  );
};

export default Page;
