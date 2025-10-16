"use client"

import React, { useState } from 'react';

const page = () => {

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Select Gender",
    "Age",
    "Body Part",
    "Symptoms", // Fixed typo
    "Apple Watch"
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] bg-clip-text ">
        Your Path To Undertand Your Health

        <div>
          <header>Who is the survey for?</header>
          <div>

            {/* Gender */}
            <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
              <div className="w-full max-w-md">
                <ul className="relative border-l-2 border-gray-200">
                  {steps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isActive = index === currentStep;

                    return (
                      <li key={index} className="mb-6 ml-6 relative">
                        {/* Timeline dot */}
                        <div className={`absolute -left-2.5 top-1 w-5 h-5 rounded-full flex items-center justify-center z-10 ${isCompleted
                            ? 'bg-green-500 border-4 border-white'
                            : isActive
                              ? 'bg-blue-500 border-4 border-white'
                              : 'bg-gray-200 border-4 border-white'
                          }`}>
                          {isCompleted && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>

                        {/* Step content */}
                        <div className={`p-4 rounded-lg transition-all duration-300 ${isActive
                            ? 'bg-blue-50 border border-blue-200 shadow-md'
                            : isCompleted
                              ? 'bg-green-50 border border-green-200'
                              : 'bg-gray-100 border border-gray-200 opacity-70'
                          }`}>
                          <div className={`font-medium ${isActive ? 'text-blue-800' : isCompleted ? 'text-green-800' : 'text-gray-500'
                            }`}>
                            {step}
                          </div>
                          {isCompleted && (
                            <div className="text-xs text-green-600 mt-1">Completed</div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* Navigation buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className={`px-4 py-2 rounded-lg font-medium ${currentStep === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                  >
                    Previous
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={currentStep === steps.length - 1}
                    className={`px-4 py-2 rounded-lg font-medium text-white ${currentStep === steps.length - 1
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-blue-500 hover:bg-blue-600'
                      }`}
                  >
                    {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </h1>
    </div>
  );
};

export default page;