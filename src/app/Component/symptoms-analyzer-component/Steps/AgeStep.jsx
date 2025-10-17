import React from 'react';


const AgeStep = ({ value, onChange }) => {
    return (
        <div className="space-y-3">
            <input
                type="number"
                min="1"
                max="120"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Enter your age"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            {value && (value <= 0 || value > 120) && (
                <div className="text-red-500 text-sm">Please enter a valid age (1-120)</div>
            )}
        </div>
    );
};


export default AgeStep;