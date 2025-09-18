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

import React, { useState, useEffect } from "react";
import { DashBoardDataContext } from "./DashboardDataContext";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axios from "axios";

const DashBoardDataProvider = ({ children }) => {
  const { userId } = useParams();
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

  const allDashBoardData = {
    goalData,
    isLoading,
    error,
  };


  return (
    <DashBoardDataContext.Provider value={allDashBoardData}>
      {children}
    </DashBoardDataContext.Provider>
  );
};

export default DashBoardDataProvider;
