import { bodyPartSymptoms } from '@/app/utils/iterableVariable';
import React, { useState } from 'react';

const SymptomsStep = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const symptoms = bodyPartSymptoms[value] || [];

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="mb-6">
                <h3 
                    className="text-2xl mb-2 text-[var(--fourground-color)] font-[var(--font-heading)]"
                >
                    What symptoms are you experiencing?
                </h3>
                <p 
                    className="text-sm opacity-70"
                    style={{ 
                        color: 'var(--fourground-color)',
                        fontFamily: 'var(--font-primary)'
                    }}
                >
                    Select the symptom that best describes your condition
                </p>
            </div>

            {/* Custom Select Dropdown */}
            <div className="relative">
                {/* Selected Value / Trigger */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-6 py-4 rounded-2xl text-left flex items-center justify-between transition-all duration-300 group"
                    style={{
                        background: value ? 'var(--dashboard-bg)' : 'var(--gray-color)',
                        border: `2px solid ${isOpen ? 'var(--dashboard-blue)' : value ? 'var(--color-primary)' : 'var(--dashboard-border)'}`,
                        boxShadow: isOpen 
                            ? '0 8px 24px rgba(37, 99, 235, 0.15)' 
                            : value 
                                ? '0 4px 12px rgba(25, 180, 180, 0.1)'
                                : 'none',
                        color: value ? 'var(--fourground-color)' : 'var(--fourground-color)',
                        fontFamily: 'var(--font-primary)'
                    }}
                >
                    <div className="flex items-center gap-3 flex-1">
                        {/* Icon */}
                        <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                            style={{
                                background: value 
                                    ? 'linear-gradient(135deg, var(--color-primary), var(--color-gradient))'
                                    : isOpen
                                        ? 'rgba(37, 99, 235, 0.1)'
                                        : 'var(--dashboard-border)'
                            }}
                        >
                            <svg 
                                className="w-5 h-5 transition-transform duration-300"
                                style={{ 
                                    color: value ? 'var(--color-white)' : 'var(--fourground-color)',
                                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                                }}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {/* Text */}
                        <span className={`text-base ${value ? 'font-semibold' : 'font-normal'}`}>
                            {value || 'Select a symptom'}
                        </span>
                    </div>

                    {/* Checkmark for selected */}
                    {value && (
                        <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{
                                background: 'rgba(25, 180, 180, 0.1)',
                                color: 'var(--color-primary)'
                            }}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    )}
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div 
                        className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-50 animate-slideDown"
                        style={{
                            background: 'var(--dashboard-bg)',
                            border: '2px solid var(--dashboard-blue)',
                            boxShadow: '0 12px 40px rgba(37, 99, 235, 0.2)',
                            maxHeight: '400px'
                        }}
                    >
                        {/* Options List */}
                        <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
                            {symptoms.length > 0 ? (
                                symptoms.map((symptom, index) => (
                                    <button
                                        key={symptom}
                                        onClick={() => {
                                            onChange(symptom);
                                            setIsOpen(false);
                                        }}
                                        className="w-full px-6 py-4 text-left flex items-center gap-4 transition-all duration-200 group"
                                        style={{
                                            background: value === symptom 
                                                ? 'linear-gradient(90deg, rgba(25, 180, 180, 0.1), rgba(41, 230, 230, 0.05))'
                                                : 'transparent',
                                            borderBottom: index < symptoms.length - 1 ? '1px solid var(--dashboard-border)' : 'none',
                                            color: 'var(--fourground-color)',
                                            fontFamily: 'var(--font-primary)'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (value !== symptom) {
                                                e.currentTarget.style.background = 'var(--gray-color)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (value !== symptom) {
                                                e.currentTarget.style.background = 'transparent';
                                            }
                                        }}
                                    >
                                        {/* Symptom Icon */}
                                        <div 
                                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                                            style={{
                                                background: value === symptom 
                                                    ? 'linear-gradient(135deg, var(--color-primary), var(--color-gradient))'
                                                    : 'var(--gray-color)'
                                            }}
                                        >
                                            <svg 
                                                className="w-5 h-5"
                                                style={{ color: value === symptom ? 'var(--color-white)' : 'var(--fourground-color)' }}
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>

                                        {/* Symptom Text */}
                                        <span className={`flex-1 ${value === symptom ? 'font-semibold' : 'font-normal'}`}>
                                            {symptom}
                                        </span>

                                        {/* Selected Checkmark */}
                                        {value === symptom && (
                                            <svg 
                                                className="w-5 h-5 flex-shrink-0"
                                                style={{ color: 'var(--color-primary)' }}
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>
                                ))
                            ) : (
                                <div 
                                    className="px-6 py-12 text-center"
                                    style={{ color: 'var(--fourground-color)', opacity: 0.5 }}
                                >
                                    <p className="font-medium">No symptoms available</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Selected Symptom Card */}
            {value && (
                <div 
                    className="mt-6 p-6 rounded-2xl animate-fadeIn"
                    style={{
                        background: 'linear-gradient(135deg, rgba(25, 180, 180, 0.05), rgba(41, 230, 230, 0.02))',
                        border: '2px solid rgba(25, 180, 180, 0.2)'
                    }}
                >
                    <div className="flex items-start gap-4">
                        <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{
                                background: 'linear-gradient(135deg, var(--color-primary), var(--color-gradient))',
                                boxShadow: '0 4px 12px rgba(25, 180, 180, 0.3)'
                            }}
                        >
                            <svg 
                                className="w-6 h-6"
                                style={{ color: 'var(--color-white)' }}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <p 
                                className="text-sm font-medium mb-1 opacity-70"
                                style={{ 
                                    color: 'var(--color-primary)',
                                    fontFamily: 'var(--font-primary)'
                                }}
                            >
                                Selected Symptom
                            </p>
                            <p 
                                className="text-lg font-semibold"
                                style={{ 
                                    color: 'var(--fourground-color)',
                                    fontFamily: 'var(--font-heading)'
                                }}
                            >
                                {value}
                            </p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default SymptomsStep;