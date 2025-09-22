"use client"
import React, { use, useState } from 'react';
import UpdateModal from './UpdateModal';
import { DashBoardDataContext } from './UserDashBoardDataContext/DashboardDataContext';
import { AuthContext } from '@/app/context/authContext';

const WelcomeBar = () => {

    const {userHealthStats,setHealthStats}=use(DashBoardDataContext)

    const {user}=use(AuthContext)
    const [isOpen,setIsOpen]=useState(false)

    return (
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-[var(--gray-color)] dark:text-[var(--gray-color)] font-bold text-2xl md:text-4xl mb-5">
                    Welcome back, {user?.displayName}!
                </h1>
                <p className="text-gray-500 text-sm md:text-xl mb-5">
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