import { bodyPartSymptoms } from '@/app/utils/iterableVariable';
import React, { useState } from 'react';
import SelectedButton from '../SelectButton/SelectedButton';
import DropDownMenu from '../DropDownMenu/DropDownMenu';

const SymptomsStep = ({ value, onChange, bodyPart }) => {
    const [isOpen, setIsOpen] = useState(false);

    const symptoms = bodyPartSymptoms[bodyPart] || [];

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="mb-6">
                <h3
                    className="text-2xl mb-2 text-[var(--color-primary)] font-[var(--font-heading)]"
                >
                    What symptoms are you experiencing?
                </h3>
                <p
                    className="text-sm opacity-70"
                    style={{
                        color: 'var(--color-primary)',
                        fontFamily: 'var(--font-primary)'
                    }}
                >
                    Select the symptom that best describes your condition
                </p>
            </div>

            {/* Custom Select Dropdown */}
            <div className="relative">
                {/* Selected Value / Trigger */}
                <SelectedButton setIsOpen={setIsOpen} isOpen={isOpen} value={value} selecType="symptom"/>

                {/* Dropdown Menu */}
                {isOpen && <DropDownMenu iterable={symptoms} onChange={onChange} setIsOpen={setIsOpen}/>}
                    
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
                                    color: 'var(--color-primary)',
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