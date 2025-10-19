import React from 'react';

const SelectedButton = ({setIsOpen,isOpen,value="",selecType}) => {
    return (
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
                <span className={`text-base ${value ? 'font-semibold' : 'font-normal'} text-[var(--color-primary)]`}>
                    {value ||  `Select a ${selecType}`}
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
    );
};

export default SelectedButton;