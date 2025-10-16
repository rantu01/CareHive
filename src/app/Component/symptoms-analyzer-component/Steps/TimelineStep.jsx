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

    return (
        <div className="mb-8 ml-8 relative group">
            {/* Animated connecting line */}
            {index > 0 && (
                <div 
                    className="absolute -left-4 -top-8 w-0.5 h-8 transition-all duration-500"
                    style={{
                        background: isCompleted 
                            ? 'var(--color-primary)' 
                            : 'var(--dashboard-border)'
                    }}
                />
            )}

            {/* Timeline dot with pulse animation */}
            <div 
                className="absolute -left-4 top-2 w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all duration-300 transform group-hover:scale-110"
                style={{
                    background: isCompleted
                        ? 'linear-gradient(135deg, var(--color-primary), var(--color-gradient))'
                        : isActive
                            ? 'var(--dashboard-blue)'
                            : 'var(--dashboard-border)',
                    boxShadow: isActive 
                        ? '0 0 0 8px rgba(37, 99, 235, 0.1), 0 4px 12px rgba(37, 99, 235, 0.3)' 
                        : isCompleted
                            ? '0 0 0 6px rgba(25, 180, 180, 0.1), 0 4px 12px rgba(25, 180, 180, 0.2)'
                            : 'none'
                }}
            >
                {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" stroke="var(--color-white)" viewBox="0 0 24 24" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                ) : isActive ? (
                    <div 
                        className="w-3 h-3 rounded-full animate-pulse" 
                        style={{ background: 'var(--color-white)' }}
                    />
                ) : (
                    <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ background: 'var(--gray-color)' }}
                    />
                )}
            </div>

            {/* Step content card */}
            <div 
                className="relative overflow-hidden rounded-2xl transition-all duration-500 transform group-hover:translate-x-1"
                style={{
                    background: isActive
                        ? 'var(--color-white)'
                        : isCompleted
                            ? 'var(--dashboard-bg)'
                            : 'var(--gray-color)',
                    border: `2px solid ${isActive 
                        ? 'var(--dashboard-blue)' 
                        : isCompleted 
                            ? 'var(--color-primary)' 
                            : 'var(--dashboard-border)'}`,
                    boxShadow: isActive 
                        ? '0 10px 30px rgba(37, 99, 235, 0.15), 0 2px 8px rgba(37, 99, 235, 0.1)' 
                        : isCompleted
                            ? '0 4px 16px rgba(25, 180, 180, 0.1)'
                            : 'none',
                    opacity: isActive || isCompleted ? 1 : 0.6
                }}
            >
                {/* Gradient accent bar */}
                {(isActive || isCompleted) && (
                    <div 
                        className="absolute top-0 left-0 right-0 h-1"
                        style={{
                            background: isActive
                                ? 'var(--dashboard-blue)'
                                : 'linear-gradient(90deg, var(--color-primary), var(--color-gradient))'
                        }}
                    />
                )}

                <div className="p-6 pt-7">
                    {/* Step number badge */}
                    <div 
                        className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-semibold mb-3 transition-all duration-300"
                        style={{
                            background: isActive
                                ? 'rgba(37, 99, 235, 0.1)'
                                : isCompleted
                                    ? 'rgba(25, 180, 180, 0.1)'
                                    : 'var(--dashboard-border)',
                            color: isActive
                                ? 'var(--dashboard-blue)'
                                : isCompleted
                                    ? 'var(--color-primary)'
                                    : 'var(--fourground-color)'
                        }}
                    >
                        {index + 1}
                    </div>

                    {/* Step title */}
                    <h3 
                        className="font-semibold text-lg mb-2 transition-colors duration-300"
                        style={{
                            color: isActive 
                                ? 'var(--dashboard-blue)' 
                                : isCompleted 
                                    ? 'var(--color-primary)' 
                                    : 'var(--fourground-color)',
                            fontFamily: 'var(--font-heading)'
                        }}
                    >
                        {step}
                    </h3>

                    {/* Completed value */}
                    {isCompleted && getCompletedValue() && (
                        <div 
                            className="mt-3 px-4 py-2 rounded-xl text-sm font-medium inline-flex items-center gap-2 transition-all duration-300"
                            style={{
                                background: 'linear-gradient(135deg, rgba(25, 180, 180, 0.1), rgba(41, 230, 230, 0.05))',
                                color: 'var(--color-primary)',
                                fontFamily: 'var(--font-primary)',
                                border: '1px solid rgba(25, 180, 180, 0.2)'
                            }}
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {getCompletedValue()}
                        </div>
                    )}

                    {/* Active indicator */}
                    {isActive && (
                        <div className="mt-3 flex items-center gap-2">
                            <div 
                                className="flex gap-1"
                            >
                                <span 
                                    className="w-2 h-2 rounded-full animate-pulse"
                                    style={{ 
                                        background: 'var(--dashboard-blue)',
                                        animationDelay: '0ms'
                                    }}
                                />
                                <span 
                                    className="w-2 h-2 rounded-full animate-pulse"
                                    style={{ 
                                        background: 'var(--dashboard-blue)',
                                        animationDelay: '150ms'
                                    }}
                                />
                                <span 
                                    className="w-2 h-2 rounded-full animate-pulse"
                                    style={{ 
                                        background: 'var(--dashboard-blue)',
                                        animationDelay: '300ms'
                                    }}
                                />
                            </div>
                            <span 
                                className="text-sm font-medium"
                                style={{ 
                                    color: 'var(--dashboard-blue)',
                                    fontFamily: 'var(--font-primary)'
                                }}
                            >
                                In Progress
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TimelineStep