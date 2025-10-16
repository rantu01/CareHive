import React from 'react';

const GenderStep = ({ value, onChange }) => {
    return (
        <div>
            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={() => onChange('male')}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${value === 'male'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                >
                    <div className="font-medium">Male</div>
                </button>
                <button
                    onClick={() => onChange('female')}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${value === 'female'
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                >
                    <div className="font-medium">Female</div>
                </button>
            </div>
        </div>
    );
};


export default GenderStep;