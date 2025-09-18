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

    const [appointmentData, setAppointmentData] = useState([])

    const [userHealthStats, setHealthStats] = useState([])

    const [userToDo, setUserToDo] = useState([])


    const { userId } = useParams()

    const { user } = use(AuthContext)


    useEffect(() => {
        const getUserStats = async () => {

            try {
                // url
                const healthStatsUrl = `/api/get-health-stats/${userId}`;
                const doctorListUrl = `/api/get-appointment-list/${userId}`;
                const toDoUrl = `/api/get-todo-task/${userId}`;

                // response
                const healthStatsResponse = await axios.get(healthStatsUrl)
                const doctorListResponse = await axios.get(doctorListUrl)
                const toDoListResponse = await axios.get(toDoUrl)

                // set data in state
                setHealthStats(healthStatsResponse?.data[0]?.userStats)
                setAppointmentData(doctorListResponse?.data[0]?.appointmentDetails)
                setUserToDo(toDoListResponse?.data[0]?.todo)

            } catch (error) {
                console.error('Error fetching health stats:', error);
            }
        }

        getUserStats()

    }, [userId])

    return (

        <div className='w-full p-6 md:max-w-9/12 md:p-0 mx-auto space-y-10'>
            <div className='mb-4'>
                <WelcomeBar name={user?.displayName} userHealthStats={userHealthStats}/>
            </div>
            <div className='grid md:grid-cols-4 gap-6 sm:grid-cols-2 grid-cols-1'>

                {
                    userHealthStats?.map((activity) => (
                        <KPIcard key={activity.title} title={activity.title} value={activity.value} target={activity?.target} />
                    ))
                }

            </div>

            <div className='grid grid-cols-1 md:grid-cols-6 gap-6'>
                <div className='md:col-span-4'><UpcomingAppointment appointmentData={appointmentData} /></div>
                <div className='md:col-span-2'><ToDoTask userToDo={userToDo} setUserToDo={setUserToDo}/></div>
            </div>
        </div>

    );
};

export default UserDashboard;