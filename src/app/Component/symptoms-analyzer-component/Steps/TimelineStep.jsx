import React from 'react';

const TimelineStep = ({ step, index, currentStep, formData }) => {
    const isCompleted = index < currentStep;
    const isActive = index === currentStep;

    const getCompletedValue = () => {
        switch(step) {
            case "Select Gender":
                return formData.gender ? `Selected: ${formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)}` : '';
            case "Age":
                return formData.age ? `Age: ${formData.age}` : '';
            case "Body Part":
                return formData.bodyPart ? `Body Part: ${formData.bodyPart}` : '';
            case "Symptoms":
                return formData.symptoms ? `Symptom: ${formData.symptoms}` : '';
            default:
                return '';
        }
    };

    // You were missing this return statement!
    return (
        <div className="mb-6 ml-6 relative">
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
                <div className={`font-medium mb-2 ${isActive ? 'text-blue-800' : isCompleted ? 'text-green-800' : 'text-gray-500'}`}>
                    {step}
                </div>
                {isCompleted && getCompletedValue() && (
                    <div className="text-xs text-green-600">{getCompletedValue()}</div>
                )}
            </div>
        </div>
    );
};

export default TimelineStep;