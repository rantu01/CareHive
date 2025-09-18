"use client"
import React, { useState } from 'react';
import UpdateModal from './UpdateModal';

const WelcomeBar = ({ name,userHealthStats,setHealthStats }) => {

    const [isOpen,setIsOpen]=useState(false)

    return (
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-black font-bold text-2xl md:text-4xl">
                    Welcome back, {name}!
                </h1>
                <p className="text-gray-500 text-sm md:text-xl">
                    Here’s your health overview for today
                </p>
            </div>

            <button onClick={()=>setIsOpen(!isOpen)} className="px-4 py-2 rounded text-white font-medium bg-[var(--dashboard-blue)] cursor-pointer">
                Update 
            </button>

            {
                isOpen && <UpdateModal setIsOpen={setIsOpen} userHealthStats={userHealthStats} setHealthStats={setHealthStats}/>
            }
        </div>
    );
};

export default WelcomeBar;