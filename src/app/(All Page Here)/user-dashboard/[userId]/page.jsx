"use client"

import KPIcard from '@/app/Component/UserComponent/KPIcard';
import ToDoTask from '@/app/Component/UserComponent/ToDoTask';
import UpcomingAppointment from '@/app/Component/UserComponent/UpcomingAppointment';
import WelcomeBar from '@/app/Component/UserComponent/WelcomeBar';
import { AuthContext } from '@/app/context/authContext';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { use, useEffect, useState } from 'react';



const UserDashboard = () => {

    const [userStatsData, setUserStatData] = useState([])
    const [userHealthStats, setHealthStats] = useState([])


    const data = [{ "title": "bmi", "value": 50 }, { "title": "daily-step", "value": 5000, "target": 6000 }, { "title": "heart-rate", "value": 90 }, { "title": "weight", "value": 36 }]

    const { userId } = useParams()

    const { user } = use(AuthContext)


    useEffect(() => {
        const getUserStats = async () => {

            try {
                const url = `/api/get-health-stats/${userId}`;
                console.log(url)
                const response = await axios.get(url)
                console.log(response)
            } catch (error) {
                console.error('Error fetching health stats:', error);
            }
        }

        getUserStats()

    }, [])

    return (
        <div className='w-full p-6 md:max-w-9/12 md:p-0 mx-auto space-y-10'>
            <div className='mb-4'>
                <p>{userId}</p>
                <WelcomeBar name={user?.displayName} />
            </div>
            <div className='grid md:grid-cols-4 gap-6 sm:grid-cols-2 grid-cols-1'>
                {/* <KPIcard title={"bmi"} value={16} /> */}
                {
                    data?.map((activity) => (
                        <KPIcard key={activity.title} title={activity.title} value={activity.value} target={activity?.target} />
                    ))
                }

            </div>

            <div className='grid grid-cols-1 md:grid-cols-6 gap-6'>
                <div className='md:col-span-4'><UpcomingAppointment /></div>
                <div className='md:col-span-2'><ToDoTask /></div>
            </div>
        </div>
    );
};

export default UserDashboard;