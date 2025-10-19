import { Info, LassoSelectIcon } from 'lucide-react';
import React from 'react';

const DropDownMenu = ({iterable,value="",onChange,setIsOpen}) => {

    console.log("the value is",value)
    return (
        <div
            // className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-50 animate-slideDown"
            // style={{
            //     background: 'var(--dashboard-bg)',
            //     border: '2px solid var(--dashboard-blue)',
            //     boxShadow: '0 12px 40px rgba(37, 99, 235, 0.2)',
            //     maxHeight: '400px'
            // }}
        >
            {/* Options List */}
            <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
                {iterable.length > 0 ? (
                    iterable.map((item, index) => (
                        <button
                            key={item}
                            onClick={() => {
                                onChange(item);
                                setIsOpen(false);
                            }}
                            className="w-full px-6 py-4 text-left flex items-center gap-4 transition-all duration-200 group"
                            style={{
                                background: value === item
                                    ? 'linear-gradient(90deg, rgba(25, 180, 180, 0.1), rgba(41, 230, 230, 0.05))'
                                    : 'transparent',
                                borderBottom: index < iterable.length - 1 ? '1px solid var(--dashboard-border)' : 'none',
                                color: 'var(--fourground-color)',
                                fontFamily: 'var(--font-primary)'
                            }}
                            onMouseEnter={(e) => {
                                if (value !== item) {
                                    e.currentTarget.style.background = 'var(--gray-color)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (value !== item) {
                                    e.currentTarget.style.background = 'transparent';
                                }
                            }}
                        >
                            {/* Symptom Icon */}
                            <div>
                                <Info color='var(--color-primary)'/>
                            </div>

                            {/* Symptom Text */}
                            <span className={`flex-1 ${value === item ? 'font-semibold' : 'font-normal'} text-[var(--color-primary)]`}>
                                {item}
                            </span>

                            {/* Selected Checkmark */}
                            {value === item && (
                                <LassoSelectIcon/>
                            )}
                        </button>
                    ))
                ) : (
                    <div
                        className="px-6 py-12 text-center"
                        style={{ color: 'var(--fourground-color)', opacity: 0.5 }}
                    >
                        <p className="font-medium">No data available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DropDownMenu;