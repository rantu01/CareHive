import React from 'react';

const NavigationButtons = ({ currentStep, steps, onPrev, onNext, isNextDisabled }) => {
    return (
        <div className="mt-6 flex justify-between">
            <button
                onClick={onPrev}
                disabled={currentStep === 0}
                className={`px-4 py-2 rounded-lg font-medium ${currentStep === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
            >
                Previous
            </button>

            <button
                onClick={onNext}
                disabled={isNextDisabled}
                className={`px-4 py-2 rounded-lg font-medium text-white ${isNextDisabled
                    ? 'bg-gray-400 cursor-not-allowed'
                    : currentStep === steps.length - 1
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-blue-500 hover:bg-blue-600'
                    }`}
            >
                {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            </button>
        </div>
    );
};
export default NavigationButtons;