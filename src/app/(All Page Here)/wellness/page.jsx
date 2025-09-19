"use client"; // Add this line at the very top
import BmiCalculator from '@/app/Component/BmiCalculator';
import Footer from '@/app/Component/Footer';
import HealthLog from '@/app/Component/HealthLog';
import CalorieTracker from '@/app/Component/CalorieTracker';
import Navbar from '@/app/Component/Navbar';
import QuickHealthTips from '@/app/Component/QuickHealthTips';
import React, { useEffect, useState } from 'react';

const page = () => {
    const [titleVisible, setTitleVisible] = useState(false);
    const [descVisible, setDescVisible] = useState(false);

    useEffect(() => {
        setTitleVisible(true);
        setTimeout(() => setDescVisible(true), 300); // small delay for description
    }, []);

    return (
        <div>
            <Navbar />
            <div className="pt-30 text-center  bg-amber-50">
                {/* Animated Title */}
                <h1
                    className={`text-3xl md:text-4xl font-extrabold mt-6 transition-all duration-1000 ease-out ${
                        titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6 '
                    }`}
                    style={{ color: "var(--color-calm-blue)" }}
                >
                   Your Complete Health & Wellness Solution
                </h1>

                {/* Description */}
                <p
                    className={`mt-4 text-sm md:text-lg max-w-6xl mx-auto text-gray-600 transition-all duration-1000 ease-out ${
                        descVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                >
                    CareHive is a unified digital platform designed to support your overall health and wellness. 
                    Track key health metrics, manage appointments, and follow personalized wellness programs to 
                    achieve a healthier, more balanced lifestyle.
                </p>

                {/* BMI Calculator */}
                <div className="mt-8">
                    <BmiCalculator />
                    <CalorieTracker></CalorieTracker>
                    <HealthLog></HealthLog>
                    <QuickHealthTips></QuickHealthTips>
                    <Footer></Footer>
                    
                    
                </div>
            </div>
        </div>
    );
};

export default page;
