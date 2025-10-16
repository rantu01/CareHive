
"use client"

import { AuthContext } from "@/app/context/authContext";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import { Plus, Bell, Check, Pill, Delete, X, Clock, Calendar } from "lucide-react";
import { use, useState } from "react";
import Swal from "sweetalert2";
import { DashBoardDataContext } from "./UserDashBoardDataContext/DashboardDataContext";


const Medication = () => {

  const [isOpen, setOpen] = useState(false)
  const { user } = use(AuthContext)
  const userId = user?.uid
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

  console.log("medication data", medicineData)

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
      [name]: value.toLocaleString()
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
    return axios.patch(`/api/medicine-remainder/`, medicineData)
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
      Swal.fire({
        title: "Medicine Added",
        icon: 'success'
      })
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

    return deleteNewMedicineMutation.mutate(id)

  }


  const checkToday = (dayIndex) => {
    const currentDate = new Date()
    const today = currentDate.getDay();

    if (dayIndex == today) {
      console.log("matcheds")
      return true
    }
  }



  const checkCurrentTime = (pillTime) => {
    const [hours, minutes] = pillTime.split(':').map(Number);

    console.log(hours, minutes)

    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    console.log("formatted time", formattedTime)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-4 p-6 bg-gradient-to-r from-[var(--card-bg)] to-[var(--sidebar-bg)] rounded-2xl border border-[var(--dashboard-border)] shadow-lg backdrop-blur-sm relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--color-primary)]/10 to-transparent rounded-full blur-2xl -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[var(--color-primary)]/5 to-transparent rounded-full blur-xl translate-y-12 -translate-x-12"></div>

        <div className="relative z-10 flex-1">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-[var(--color-primary)]/20 rounded-xl border border-[var(--color-primary)]/30">
              <Pill className="text-[var(--color-primary)]" size={24} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] bg-clip-text ">
              Medications
            </h1>
          </div>
          <p className="text-[var(--text-color-all)]/70 text-base md:text-lg font-medium ml-16">
            Manage your medication schedule
          </p>
          <div className="flex items-center gap-4 mt-2 text-sm text-[var(--text-color-all)]/50 ml-16">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {medicationDataList && medicationDataList.length} Active medications
            </span>
            {/* <span className="flex items-center gap-1">
              <Bell size={14} />
              Next dose: 2:30 PM
            </span> */}
          </div>
        </div>

        <button
          onClick={() => setOpen(!isOpen)}
          className="group w-full lg:w-auto bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/90 text-white rounded-xl flex items-center justify-center gap-3 px-6 py-4 md:py-4 cursor-pointer hover:from-[var(--color-primary)]/90 hover:to-[var(--color-primary)] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold text-sm md:text-base relative z-10 border border-[var(--color-primary)]/30"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>Add Medication</span>
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
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--color-primary)]/10 to-transparent rounded-full blur-2xl -translate-y-16 translate-x-16"></div>

              {/* Header Section */}
              <div className="relative z-10 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 bg-[var(--color-primary)]/15 rounded-xl">
                    <Pill className="text-[var(--color-primary)]" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--color-primary)] tracking-tight">
                    {med?.medicineName}
                  </h2>
                </div>
              </div>

              {/* Content Grid */}
              <div className="space-y-5 mb-6">
                {/* Days Section */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-[var(--text-color-all)]/80 uppercase tracking-wide">
                    Schedule Days
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {med?.medicineTakingDays?.map((dayVal, index) => (
                      <span
                        key={index}
                        className={`px-3 py-2 bg-gradient-to-r from-[var(--color-primary)]/20 to-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-medium rounded-full border border-[var(--color-primary)]/20 backdrop-blur-sm ${checkToday(dayVal) && "text-red-700 font-bold"}`}
                      >
                        {daysMap[parseInt(dayVal)]}

                        {checkToday(dayVal)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Times Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Bell size={16} className="text-[var(--text-color-all)]/60" />
                    <h4 className="text-sm font-semibold text-[var(--text-color-all)]/80 uppercase tracking-wide">
                      Timing
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.values(med.medicineTakingTime || {}).map((time, i) => (
                      <span
                        key={i}
                        className="px-3 py-2 bg-[var(--card-bg)] border-2 border-[var(--dashboard-border)] text-[var(--text-color-all)] text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      >
                        {time}

                        {checkCurrentTime(time)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pills Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Pill size={16} className="text-[var(--text-color-all)]/60" />
                    <h4 className="text-sm font-semibold text-[var(--text-color-all)]/80 uppercase tracking-wide">
                      Dosage
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.values(med.numberOfPill || {}).map((pill, i) => (
                      <span
                        key={i}
                        className="px-3 py-2 bg-[var(--card-bg)] border-2 border-[var(--dashboard-border)] text-[var(--text-color-all)] text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      >
                        {pill} {pill == 1 ? 'pill' : 'pills'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-between flex-wrap pt-4 border-t border-[var(--dashboard-border)]/30">
                <button className="flex items-center gap-2 bg-[var(--card-bg)] hover:bg-[var(--hover-color)] border-2 border-[var(--dashboard-border)] px-4 py-2.5 rounded-xl cursor-pointer text-[var(--text-color-all)] transition-all duration-200 text-sm font-medium hover:scale-105 hover:shadow-md group">
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
        isOpen && <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50 p-4">
          <div className="bg-gradient-to-br from-[var(--dashboard-bg)] to-[var(--card-bg)] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border-2 border-[var(--dashboard-border)] relative">

            <div className="relative z-10">
              {/* Header */}
              <div className="px-8 py-6 border-b-2 border-[var(--dashboard-border)]/50 bg-gradient-to-r from-[var(--card-bg)] to-[var(--sidebar-bg)] rounded-t-3xl">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[var(--color-primary)]/20 rounded-xl">
                      <Pill className="text-[var(--color-primary)]" size={20} />
                    </div>
                    <h2 className="text-2xl font-bold text-[var(--text-color-all)]">Add Medication</h2>
                  </div>
                  <button
                    onClick={() => setOpen(!isOpen)}
                    className="p-2 hover:bg-[var(--dashboard-border)]/20 rounded-full transition-colors duration-300 cursor-pointer group"
                  >
                    <X size={20} className="text-[var(--text-color-all)]/60 group-hover:text-[var(--color-primary)] transition-colors duration-300" />
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {/* Medicine Name */}
                <div className="space-y-3">
                  <label htmlFor="medicineName" className="flex items-center gap-2 text-sm font-semibold text-[var(--text-color-all)] uppercase tracking-wide">
                    <Pill size={16} className="text-[var(--color-primary)]" />
                    Medicine Name
                  </label>
                  <input
                    onChange={handleMedicineName}
                    id="medicine-name"
                    name="medicineName"
                    type="text"
                    placeholder="Enter Medicine Name"
                    className="w-full p-4 text-[var(--text-color-all)] bg-[var(--sidebar-bg)] border-2 border-[var(--dashboard-border)] rounded-2xl placeholder-[var(--text-color-all)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all duration-300"
                  />
                </div>

                {/* Dose Per Day */}
                <div className="space-y-3">
                  <label htmlFor="douse-type" className="flex items-center gap-2 text-sm font-semibold text-[var(--text-color-all)] uppercase tracking-wide">
                    <Clock size={16} className="text-[var(--color-primary)]" />
                    Doses Per Day
                  </label>
                  <select
                    onChange={(e) => setTimeLoop(e.target.value)}
                    name="douseType"
                    id="douse-type"
                    required
                    className="w-full p-4 text-[var(--text-color-all)] bg-[var(--sidebar-bg)] border-2 border-[var(--dashboard-border)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all duration-300"
                  >
                    <option value="1">1 dose per day</option>
                    <option value="2">2 doses per day</option>
                    <option value="3">3 doses per day</option>
                    <option value="4">4 doses per day</option>
                  </select>
                </div>

                {/* Days Selection */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text-color-all)] uppercase tracking-wide">
                    <Calendar size={16} className="text-[var(--color-primary)]" />
                    Select Days
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {weekDays.map((day) => (
                      <div key={day.value} className="flex items-center p-3 bg-[var(--sidebar-bg)] border-2 border-[var(--dashboard-border)] rounded-xl hover:border-[var(--color-primary)]/30 transition-all duration-300">
                        <input
                          id={`${day.name.toLowerCase()}-checkbox`}
                          type="checkbox"
                          value={day.value}
                          name="day-checkbox"
                          onChange={(e) => handleMedicineTakingWeekdays(e)}
                          className="w-4 h-4 text-[var(--color-primary)] bg-[var(--sidebar-bg)] border-[var(--dashboard-border)] rounded focus:ring-[var(--color-primary)] focus:ring-2"
                        />
                        <label
                          htmlFor={`${day.name.toLowerCase()}-checkbox`}
                          className="ml-2 text-sm font-medium text-[var(--text-color-all)] cursor-pointer"
                        >
                          {day.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time Inputs */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text-color-all)] uppercase tracking-wide">
                    <Clock size={16} className="text-[var(--color-primary)]" />
                    Medication Times
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {
                      (() => {
                        const inputs = [];
                        for (let i = 0; i < timeLoop; i++) {
                          inputs.push(
                            <div key={i} className="space-y-2">
                              <label htmlFor={`time-${i}`} className="text-sm text-[var(--text-color-all)]/70 font-medium">
                                Time {i + 1}
                              </label>
                              <input
                                onChange={handleMedicineTakingTimes}
                                type="time"
                                id={`time-${i}`}
                                name={`time-${i}`}
                                className="w-full p-3 text-[var(--text-color-all)] bg-[var(--sidebar-bg)] border-2 border-[var(--dashboard-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all duration-300"
                              />
                            </div>
                          );
                        }
                        return inputs;
                      })()
                    }
                  </div>
                </div>

                {/* Pill Count Inputs */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text-color-all)] uppercase tracking-wide">
                    <Pill size={16} className="text-[var(--color-primary)]" />
                    Number of Pills
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {
                      (() => {
                        const inputsPill = [];
                        for (let i = 0; i < timeLoop; i++) {
                          inputsPill.push(
                            <div key={i} className="space-y-2">
                              <label htmlFor={`pill-${i}`} className="text-sm text-[var(--text-color-all)]/70 font-medium">
                                Dose {i + 1} Pills
                              </label>
                              <input
                                onChange={handleNumberOfPill}
                                type="number"
                                id={`pill-${i}`}
                                name={`pill-${i}`}
                                min="1"
                                placeholder="1"
                                className="w-full p-3 text-[var(--text-color-all)] bg-[var(--sidebar-bg)] border-2 border-[var(--dashboard-border)] rounded-xl placeholder-[var(--text-color-all)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all duration-300"
                              />
                            </div>
                          );
                        }
                        return inputsPill;
                      })()
                    }
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="group w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/90 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:from-[var(--color-primary)]/90 hover:to-[var(--color-primary)] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center gap-3"
                  >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    <span>Add Medication</span>
                  </button>
                </div>

                {/* Help Text */}
                <p className="text-center text-xs text-[var(--text-color-all)]/60">
                  Fill in all required fields to add your medication schedule
                </p>
              </form>
            </div>
          </div>
        </div>

      }
    </div>
  );
};

export default Medication;