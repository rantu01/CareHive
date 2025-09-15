import React from 'react';

const WelcomeBar = ({ name }) => {
    return (
        <div>
            <div>
                <div>
                    <h1>Welcome back, {name}</h1>
                    <p>Here's your health report for today</p>
                </div>
                <button>Update</button>
            </div>
        </div>
    );
};

export default WelcomeBar;