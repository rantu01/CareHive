
"use client";

import { useState, useEffect, use, useContext } from "react";
import { DashBoardDataContext } from "./DashboardDataContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "@/app/context/authContext";


const DashBoardDataProvider = ({ children }) => {


  const [appointmentData, setAppointmentData] = useState([])

  const [userHealthStats, setHealthStats] = useState([])

  const [userToDo, setUserToDo] = useState([])



  const { user } = useContext(AuthContext)
  const userId = user?.uid


  console.log(user)

  console.log("data provider", userId)





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











  // all data of dashboard


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
