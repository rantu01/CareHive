import React from 'react';

const WelcomeBar = ({ name }) => {
    return (
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-black font-bold text-4xl">
                    Welcome back, {name}!
                </h1>
                <p className="text-gray-500 text-xl">
                    Here’s your health overview for today
                </p>
            </div>

            <button className="px-4 py-2 rounded text-white font-medium bg-[var(--dashboard-blue)] cursor-pointer">
                Update 
            </button>
        </div>
    );
};

export default WelcomeBar;