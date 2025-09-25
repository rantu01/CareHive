
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

  const [mealData, setMealData] = useState([])

  const { user } = useContext(AuthContext)
  const userId = user?.uid

  const [medicineData, setMedicineData] = useState([])

  const [goalData, setGoalData] = useState([]);


  useEffect(() => {
    const getUserStats = async () => {

      try {
        // url
        const healthStatsUrl = `/api/get-health-stats/${userId}`;
        const doctorListUrl = `/api/get-appointment-list/${userId}`;
        const toDoUrl = `/api/get-todo-task/${userId}`;
        const mealUrl = `/api/calories`

        // response
        const healthStatsResponse = await axios.get(healthStatsUrl)
        const doctorListResponse = await axios.get(doctorListUrl)
        const toDoListResponse = await axios.get(toDoUrl)
        const mealResponse = await axios.get(mealUrl)

        // set data in state
        // console.log("I am meal response",mealResponse)
        setHealthStats(healthStatsResponse?.data[0]?.userStats)
        setAppointmentData(doctorListResponse?.data[0]?.appointmentDetails)
        setUserToDo(toDoListResponse?.data[0]?.todo)

      } catch (error) {
        console.error('Error fetching health stats:', error);
      }
    }

    getUserStats()

  }, [userId])








  const getUserGoal = async () => {
    const response = await axios.get(`/api/user-goal/${userId}`);
    return response.data;
  };


  // get user medicine information
  const getUserMedicine = async () => {
    const response = await axios.get(`/api/medicine-remainder/`, {params: { userId }});
    return response.data
  }




  // Query function

  const { data: goalInfo, isLoading: goalLoading, error: goalError } = useQuery({
    queryKey: ["daily_goal", userId],
    queryFn: getUserGoal,
    enabled: !!userId,
  });

  const { data: medicineInfo, isLoading: medicineLoading, error: medicineError } = useQuery({
    queryKey: ["medicine", userId],
    queryFn: getUserMedicine,
    enabled: !!userId,
  });



  useEffect(() => {
    if (goalInfo) {
      setGoalData(goalInfo);
    }
  }, [goalInfo]);


  useEffect(() => {
    if (medicineInfo) {
      setMedicineData(medicineInfo)
    }

  }, [medicineInfo])









  // all data of dashboard


  const allDashBoardData = {
    // users goal
    goalData,
    goalLoading,
    goalError,

    // medicine 
    medicineData,
    medicineLoading,
    medicineError,


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
