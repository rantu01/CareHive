"use client"

import React, { useState } from 'react';
import { DashBoardDataContext } from './DashboardDataContext';
import { useQuery } from '@tanstack/react-query';

const DashBoardDataProvider = ({ children }) => {


    const [goalData,setGoalData]=useState([])

    const { data, isLoading, error } = useQuery({
        queryKey: ["daily_goal"],
        queryFn: async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
    })

    const allDashBoardData={
        goalData
    }


    return <DashBoardDataContext value={allDashBoardData} >{children}</DashBoardDataContext>


};

export default DashBoardDataProvider;