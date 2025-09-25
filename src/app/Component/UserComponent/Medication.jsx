"use client"

import { AuthContext } from "@/app/context/authContext";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import { Plus, Bell, Check, Pill, Delete, X } from "lucide-react";
import { use, useState } from "react";
import Swal from "sweetalert2";
import { DashBoardDataContext } from "./UserDashBoardDataContext/DashboardDataContext";


const Medication = () => {

  const [isOpen, setOpen] = useState(false)
  const { user } = use(AuthContext)
  const userId = user.uid
  const queryClient = useQueryClient();
  const [timeLoop, setTimeLoop] = useState(1)

  // user medicine taking time and weekdays
  const [timeValue, setTimeValue] = useState([])
  const [userMedicineWeekDays, setMedicineTakingDays] = useState([])
  const [medicineName, setMedicineName] = useState("");
  const [pillCount, setPillCount] = useState([])


  const weekDays = [
    { name: "Sunday", value: 0 },
    { name: "Monday", value: 1 },
    { name: "Tuesday", value: 2 },
    { name: "Wednesday", value: 3 },
    { name: "Thursday", value: 4 },
    { name: "Friday", value: 5 },
    { name: "Saturday", value: 6 },
  ];



  const { medicineData } = use(DashBoardDataContext)

  console.log(medicineData)

  const medicationDataList = medicineData[0]?.medicineData

  const formatNextTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleString("en-US", {
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };


  // get the time values
  const handleMedicineTakingTimes = (e) => {
    const { name, value } = e.target
    setTimeValue({
      ...timeValue,
      [name]: value
    })

  }


  // get the weekdays value
  const handleMedicineTakingWeekdays = (e) => {
    if (e.target.value && e.target.checked) {
      setMedicineTakingDays([...userMedicineWeekDays, e.target.value])
    } else {
      const newArray = userMedicineWeekDays.filter((day) => (day !== e.target.value))
      setMedicineTakingDays(newArray)

    }
  }


  //get medicine name
  const handleMedicineName = (e) => {
    setMedicineName(e.target.value)
  };


  // get number of pill


  const handleNumberOfPill = (e) => {
    const { name, value } = e.target
    setPillCount({
      ...pillCount,
      [name]: value
    })
  }


  // axios to add new medicine
  const addNewMedicine = () => {
    const medicineData = {
      userId: userId,
      medicineName: medicineName,
      medicineTakingDays: userMedicineWeekDays,
      medicineTakingTime: timeValue,
      numberOfPill: pillCount
    }
    axios.patch(`/api/medicine-remainder/`, medicineData)
  }

  // axios to delete new medicine

  const deleteMedicine = (id) => {
    axios.delete(`/api/medicine-remainder/`, { data: { userId, id } })
  }


  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log([timeValue])
    // console.log(userMedicineWeekDays)
    addNewMedicineMutation.mutate()
  };


  // mutation for add new medicine

  const addNewMedicineMutation = useMutation({
    mutationFn: addNewMedicine,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["medicine", userId] });
    },
    onError: (data) => {
      Swal.fire({
        title: error,
        icon: 'warning'
      })
    }
  })

  // mutation for delete medicine

  const deleteNewMedicineMutation = useMutation({
    mutationFn: deleteMedicine,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["medicine", userId] });
    },
    onError: (data) => {
      Swal.fire({
        title: error,
        icon: 'warning'
      })
    }
  })


  const handleDelete = (id) => {

    deleteNewMedicineMutation.mutate(id)

  }






  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center ">
        <div>
          <h1 className="text-3xl text-[var(--fourground-color)] font-bold mb-1">
            Medications
          </h1>
          <p className="text-[var(--fourground-color)]">
            Manage your medication schedule
          </p>
        </div>
        <button onClick={() => setOpen(!isOpen)} className="bg-[var(--dashboard-blue)] text-[var(--fourground-color)] rounded flex items-center gap-2 h-fit px-4 py-2 md:py-4 cursor-pointer hover:opacity-90 transition text-sm md:text-[1rem]">
          <Plus size={18} /> <span>Add Medication</span>
        </button>
      </header>

      {/* Medication Cards */}

      <main className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {medicationDataList?.map((med, idx) => {
          const daysMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          return (
            <div
              key={idx}
              className="bg-gradient-to-br from-[var(--card-bg)] to-[var(--card-bg)]/90 p-6 shadow-lg border border-[var(--dashboard-border)]/50 rounded-2xl hover:shadow-xl transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
            >
              {/* Decorative gradient overlay */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--dashboard-blue)]/10 to-transparent rounded-full blur-2xl -translate-y-16 translate-x-16"></div>

              {/* Header Section */}
              <div className="relative z-10 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 bg-[var(--dashboard-blue)]/15 rounded-xl">
                    <Pill className="text-[var(--dashboard-blue)]" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--dashboard-blue)] tracking-tight">
                    {med?.medicineName}
                  </h2>
                </div>
              </div>

              {/* Content Grid */}
              <div className="space-y-5 mb-6">
                {/* Days Section */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-[var(--fourground-color)]/80 uppercase tracking-wide">
                    Schedule Days
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {med?.medicineTakingDays?.map((dayVal, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-gradient-to-r from-[var(--dashboard-blue)]/20 to-[var(--dashboard-blue)]/10 text-[var(--dashboard-blue)] text-sm font-medium rounded-full border border-[var(--dashboard-blue)]/20 backdrop-blur-sm"
                      >
                        {daysMap[parseInt(dayVal)]}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Times Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Bell size={16} className="text-[var(--fourground-color)]/60" />
                    <h4 className="text-sm font-semibold text-[var(--fourground-color)]/80 uppercase tracking-wide">
                      Timing
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.values(med.medicineTakingTime || {}).map((time, i) => (
                      <span
                        key={i}
                        className="px-3 py-2 bg-[var(--card-bg)] border-2 border-[var(--dashboard-border)] text-[var(--fourground-color)] text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pills Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Pill size={16} className="text-[var(--fourground-color)]/60" />
                    <h4 className="text-sm font-semibold text-[var(--fourground-color)]/80 uppercase tracking-wide">
                      Dosage
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.values(med.numberOfPill || {}).map((pill, i) => (
                      <span
                        key={pill}
                        className="px-3 py-2 bg-[var(--card-bg)] border-2 border-[var(--dashboard-border)] text-[var(--fourground-color)] text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      >
                        {pill} {pill == 1 ? 'pill' : 'pills'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-between flex-wrap pt-4 border-t border-[var(--dashboard-border)]/30">
                <button className="flex items-center gap-2 bg-[var(--card-bg)] hover:bg-[var(--hover-color)] border-2 border-[var(--dashboard-border)] px-4 py-2.5 rounded-xl cursor-pointer text-[var(--fourground-color)] transition-all duration-200 text-sm font-medium hover:scale-105 hover:shadow-md group">
                  <Bell size={16} className="group-hover:animate-pulse" />
                  Remind
                </button>
                <button className="flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-green-600/20 hover:from-green-500/30 hover:to-green-600/30 border-2 border-green-500/30 px-4 py-2.5 rounded-xl cursor-pointer text-green-600 transition-all duration-200 text-sm font-medium hover:scale-105 hover:shadow-md group">
                  <Check size={16} className="group-hover:animate-bounce" />
                  Mark Taken
                </button>
                <button
                  onClick={() => handleDelete(med?.id)}
                  className="flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 border-2 border-red-500/30 px-4 py-2.5 rounded-xl cursor-pointer text-red-600 transition-all duration-200 text-sm font-medium hover:scale-105 hover:shadow-md group"
                >
                  <Delete size={16} className="group-hover:animate-pulse" />
                  Delete
                </button>
              </div>
            </div>
          );
        })}


      </main>
      {
        isOpen && <div className="form-container md:min-w-[30rem] max-w-fit mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between">
              <label htmlFor="medicineName" className="text-sm text-gray-800 dark:text-white mb-2 block">Medicine Name</label> <X size={15} onClick={() => setOpen(!isOpen)} className="cursor-pointer" />
            </div>
            <input onChange={handleMedicineName} id="medicine-name" name="medicineName" type="text" placeholder="Enter Medicine Name" className="w-full p-3 text-sm border rounded-md bg-gray-100 dark:bg-gray-600 dark:text-white dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6" />

            <div className="dose-section mb-6">
              <label htmlFor="douse-type" className="text-sm text-gray-800 dark:text-white mb-2 block">Dose Per Day</label>
              <select onChange={(e) => setTimeLoop(e.target.value)} name="douseType" id="douse-type" className="w-full p-3 text-sm border rounded-md bg-gray-100 dark:bg-gray-600 dark:text-white dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value=" "></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>

              </select>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 gap-3.5 mb-6">
              {weekDays.map((day) => (
                <div key={day.value} className="flex items-center me-4">
                  <input
                    id={`${day.name.toLowerCase()}-checkbox`}
                    type="checkbox"
                    value={day.value}
                    name="day-checkbox"
                    onChange={(e) => handleMedicineTakingWeekdays(e)}
                    className="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-2"
                  />
                  <label
                    htmlFor={`${day.name.toLowerCase()}-checkbox`}
                    className="ms-2 text-sm font-medium text-white"
                  >
                    {day.name}
                  </label>
                </div>
              ))}
            </div>


            <div className="flex justify-between gap-4 mb-6">
              {
                (() => {
                  const inputs = [];
                  for (let i = 0; i < timeLoop; i++) {
                    inputs.push(
                      <div key={i} className="w-full">
                        <label htmlFor={`time-${i}`} className="text-sm text-gray-800 dark:text-white mb-2 block">
                          Time {i + 1}
                        </label>
                        <input
                          onChange={handleMedicineTakingTimes}
                          type="time"
                          id={`time-${i}`}
                          name={`time-${i}`}
                          className="w-full p-3 text-sm border rounded-md bg-gray-100 dark:bg-gray-600 dark:text-white dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    );
                  }
                  return inputs;
                })()
              }
            </div>


            <div className="flex justify-between gap-4 mb-6">
              {
                (() => {
                  const inputsPill = [];
                  for (let i = 0; i < timeLoop; i++) {
                    inputsPill.push(
                      <div key={i} className="w-full">
                        <label htmlFor={`pill-${i}`} className="text-sm text-gray-800 dark:text-white mb-2 block">
                          Pill {i + 1}
                        </label>
                        <input
                          onChange={handleNumberOfPill}
                          type="pill"
                          id={`pill-${i}`}
                          name={`pill-${i}`}
                          className="w-full p-3 text-sm border rounded-md bg-gray-100 dark:bg-gray-600 dark:text-white dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    );
                  }
                  return inputsPill;
                })()
              }
            </div>


            <button type="submit" className="w-full p-3 text-sm text-white bg-[var(--dashboard-blue)] cursor-pointer">Submit</button>
          </form>
        </div>

      }
    </div>
  );
};

export default Medication;
