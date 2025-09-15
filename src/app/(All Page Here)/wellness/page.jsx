import BmiCalculator from '@/app/Component/BmiCalculator';
import Navbar from '@/app/Component/Navbar';
import React from 'react';

const page = () => {
    return (
        <div>
            <Navbar />
            <div className="pt-30 text-center px-4">
                {/* Animated Title */}
                <h1
                    className="text-3xl md:text-4xl font-extrabold animate-bounce mt-6"
                    style={{ color: "var(--color-calm-blue)" }}
                >
                   Your Complete Health & Wellness Solution
                </h1>

                {/* Description */}
                <p
                    className="mt-4 text-sm md:text-xl max-w-6xl mx-auto animate-fadeIn text-gray-700"
                   
                >
                    CareHive is a unified digital platform designed to support your overall health and wellness. 
                    Track key health metrics, manage appointments, and follow personalized wellness programs to 
                    achieve a healthier, more balanced lifestyle.
                </p>

                {/* BMI Calculator */}
                <div className="mt-8">
                    <BmiCalculator />
                </div>
            </div>
        </div>
    );
};

export default page;
