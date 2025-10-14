"use client"

import { AuthContext } from "@/app/context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Plus, Bell, Check, Pill, Delete, X, Clock, Calendar } from "lucide-react";
import { use, useState } from "react";
import Swal from "sweetalert2";
import { DashBoardDataContext } from "./UserDashBoardDataContext/DashboardDataContext";

const Medication = () => {
  const [isOpen, setOpen] = useState(false);
  const { user } = use(AuthContext);
  const userId = user?.uid;
  const queryClient = useQueryClient();
  const [timeLoop, setTimeLoop] = useState(1);

  const [timeValue, setTimeValue] = useState([]);
  const [userMedicineWeekDays, setMedicineTakingDays] = useState([]);
  const [medicineName, setMedicineName] = useState("");
  const [pillCount, setPillCount] = useState([]);

  const weekDays = [
    { name: "Sunday", value: 0 },
    { name: "Monday", value: 1 },
    { name: "Tuesday", value: 2 },
    { name: "Wednesday", value: 3 },
    { name: "Thursday", value: 4 },
    { name: "Friday", value: 5 },
    { name: "Saturday", value: 6 },
  ];

  const { medicineData } = use(DashBoardDataContext);
  const medicationDataList = medicineData[0]?.medicineData;

  const handleMedicineTakingTimes = (e) => {
    const { name, value } = e.target;
    setTimeValue({ ...timeValue, [name]: value.toLocaleString() });
  };

  const handleMedicineTakingWeekdays = (e) => {
    if (e.target.value && e.target.checked) {
      setMedicineTakingDays([...userMedicineWeekDays, e.target.value]);
    } else {
      const newArray = userMedicineWeekDays.filter((day) => day !== e.target.value);
      setMedicineTakingDays(newArray);
    }
  };

  const handleMedicineName = (e) => {
    setMedicineName(e.target.value);
  };

  const handleNumberOfPill = (e) => {
    const { name, value } = e.target;
    setPillCount({ ...pillCount, [name]: value });
  };

  const addNewMedicine = () => {
    const medicineData = {
      userId: userId,
      medicineName,
      medicineTakingDays: userMedicineWeekDays,
      medicineTakingTime: timeValue,
      numberOfPill: pillCount,
    };
    return axios.patch(`/api/medicine-remainder/`, medicineData);
  };

  const deleteMedicine = (id) => {
    axios.delete(`/api/medicine-remainder/`, { data: { userId, id } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewMedicineMutation.mutate();
  };

  const addNewMedicineMutation = useMutation({
    mutationFn: addNewMedicine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicine", userId] });
      Swal.fire({ title: "Medicine Added", icon: "success" });
    },
    onError: (error) => {
      Swal.fire({ title: error.message || "Error", icon: "warning" });
    },
  });

  const deleteNewMedicineMutation = useMutation({
    mutationFn: deleteMedicine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicine", userId] });
    },
    onError: (error) => {
      Swal.fire({ title: error.message || "Error", icon: "warning" });
    },
  });

  const handleDelete = (id) => deleteNewMedicineMutation.mutate(id);

  const checkToday = (dayIndex) => {
    const today = new Date().getDay();
    return dayIndex == today;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-4 p-6 bg-gradient-to-r from-[var(--card-bg)] to-[var(--sidebar-bg)] rounded-2xl border border-[var(--dashboard-border)] shadow-lg backdrop-blur-sm relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--dashboard-blue)]/10 to-transparent rounded-full blur-2xl -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[var(--dashboard-blue)]/5 to-transparent rounded-full blur-xl translate-y-12 -translate-x-12"></div>

        <div className="relative z-10 flex-1">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-[var(--dashboard-blue)]/20 rounded-xl border border-[var(--dashboard-blue)]/30">
              <Pill className="text-[var(--dashboard-blue)]" size={24} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)]">
              Medications
            </h1>
          </div>
          <p className="text-[var(--fourground-color)]/70 text-base md:text-lg font-medium ml-16">
            Manage your medication schedule
          </p>
          <div className="flex items-center gap-4 mt-2 text-sm text-[var(--fourground-color)]/50 ml-16">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {medicationDataList?.length || 0} Active medications
            </span>
          </div>
        </div>

        <button
          onClick={() => setOpen(!isOpen)}
          className="group w-full lg:w-auto bg-[var(--color-primary)] text-white rounded-xl flex items-center justify-center gap-3 px-6 py-4 md:py-4 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold text-sm md:text-base relative z-10 border border-[var(--color-primary)]/80"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>Add Medication</span>
        </button>
      </header>

      {/* Medication Cards */}
      <main className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {medicationDataList?.map((med, idx) => {
          const daysMap = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
          return (
            <div key={idx} className="bg-gradient-to-br from-[var(--card-bg)] to-[var(--card-bg)]/90 p-6 shadow-lg border border-[var(--dashboard-border)]/50 rounded-2xl hover:shadow-xl transition-all duration-300 backdrop-blur-sm relative overflow-hidden">
              {/* Header */}
              <div className="relative z-10 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 bg-[var(--dashboard-blue)]/15 rounded-xl">
                    <Pill className="text-[var(--dashboard-blue)]" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--color-primary)] tracking-tight">
                    {med?.medicineName}
                  </h2>
                </div>
              </div>

              {/* Days */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[var(--fourground-color)]/80 uppercase tracking-wide">
                  Schedule Days
                </h4>
                <div className="flex flex-wrap gap-2">
                  {med?.medicineTakingDays?.map((dayVal, index) => (
                    <span
                      key={index}
                      className={`px-3 py-2 bg-[var(--dashboard-blue)]/10 text-[var(--dashboard-blue)] text-sm font-medium rounded-full border border-[var(--dashboard-blue)]/20 ${checkToday(dayVal) ? "text-red-700 font-bold" : ""}`}
                    >
                      {daysMap[parseInt(dayVal)]}
                    </span>
                  ))}
                </div>
              </div>

              {/* Times */}
              <div className="space-y-3 mt-4">
                <div className="flex items-center gap-2">
                  <Bell size={16} className="text-[var(--fourground-color)]/60" />
                  <h4 className="text-sm font-semibold text-[var(--fourground-color)]/80 uppercase tracking-wide">
                    Timing
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.values(med.medicineTakingTime || {}).map((time, i) => (
                    <span key={i} className="px-3 py-2 bg-[var(--card-bg)] border-2 border-[var(--dashboard-border)] text-[var(--fourground-color)] text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      {time}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pills */}
              <div className="space-y-3 mt-4">
                <div className="flex items-center gap-2">
                  <Pill size={16} className="text-[var(--fourground-color)]/60" />
                  <h4 className="text-sm font-semibold text-[var(--fourground-color)]/80 uppercase tracking-wide">
                    Dosage
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.values(med.numberOfPill || {}).map((pill, i) => (
                    <span key={i} className="px-3 py-2 bg-[var(--card-bg)] border-2 border-[var(--dashboard-border)] text-[var(--fourground-color)] text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      {pill} {pill === 1 ? "pill" : "pills"}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-between flex-wrap pt-4 border-t border-[var(--dashboard-border)]/30">
                <button className="flex items-center gap-2 bg-[var(--card-bg)] hover:bg-[var(--hover-color)] border-2 border-[var(--dashboard-border)] px-4 py-2.5 rounded-xl cursor-pointer text-[var(--fourground-color)] transition-all duration-200 text-sm font-medium hover:scale-105 hover:shadow-md group">
                  <Bell size={16} className="group-hover:animate-pulse" />
                  Remind
                </button>
                <button className="flex items-center gap-2 bg-[var(--color-primary)]/20 border-2 border-[var(--color-primary)]/30 px-4 py-2.5 rounded-xl cursor-pointer text-[var(--color-primary)] transition-all duration-200 text-sm font-medium hover:scale-105 hover:shadow-md group">
                  <Check size={16} className="group-hover:animate-bounce" />
                  Mark Taken
                </button>
                <button
                  onClick={() => handleDelete(med?.id)}
                  className="flex items-center gap-2 bg-red-500/20 border-2 border-red-500/30 px-4 py-2.5 rounded-xl cursor-pointer text-red-600 transition-all duration-200 text-sm font-medium hover:scale-105 hover:shadow-md group"
                >
                  <Delete size={16} className="group-hover:animate-pulse" />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default Medication;
