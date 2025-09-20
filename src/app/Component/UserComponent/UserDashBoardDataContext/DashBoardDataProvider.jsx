// "use client"

// import React, { use, useEffect, useState } from 'react';
// import { DashBoardDataContext } from './DashboardDataContext';
// import { useQuery } from '@tanstack/react-query';
// import { useParams } from 'next/navigation';
// import axios from 'axios';

// const DashBoardDataProvider = ({ children }) => {

//     const [goalData, setGoalData] = useState([])


//     const { userId } = useParams()

//     const getUserGoal = async () => {
//         const response = await axios.get(`/api/user-goal/${userId}`);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response;
//     }







//     const { data, isLoading, error } = useQuery({
//         queryKey: ["daily_goal"],
//         queryFn: getUserGoal,
//         enabled: !!userId, 
//     })

//     console.log(data)





//     const allDashBoardData = {
//         goalData
//     }


//     return <DashBoardDataContext.Provider value={allDashBoardData} >{children}</DashBoardDataContext.Provider>


// };

// export default DashBoardDataProvider; 


"use client";

import React, { useState, useEffect, use } from "react";
import { DashBoardDataContext } from "./DashboardDataContext";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axios from "axios";

const DashBoardDataProvider = ({ children }) => {


  const [appointmentData, setAppointmentData] = useState([])

  const [userHealthStats, setHealthStats] = useState([])

  const [userToDo, setUserToDo] = useState([])

  const { userId } = useParams()

  // const { user } = use(AuthContext)





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




  const [goalData, setGoalData] = useState([]);



  // Query function
  const getUserGoal = async () => {
    const response = await axios.get(`/api/user-goal/${userId}`);
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["daily_goal", userId],
    queryFn: getUserGoal,
    enabled: !!userId,
  });


  useEffect(() => {
    if (data) {
      setGoalData(data);
    }
  }, [data]);











// all data


  const allDashBoardData = {
    // users goal
    goalData,
    isLoading,
    error,

    //  appointment details
    appointmentData, setAppointmentData,

    // user health stats

    userHealthStats, setHealthStats,

    // user to do 

    userToDo, setUserToDo

  };







  return (
    <DashBoardDataContext.Provider value={allDashBoardData}>
      {children}
    </DashBoardDataContext.Provider>
  );
};

export default DashBoardDataProvider;
