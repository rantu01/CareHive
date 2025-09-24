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
  const [timeValue, setTimeValue] = useState([])
  const [formData, setFormData] = useState([]);

  console.log("the time value", timeValue)
  
  const { medicineData } = use(DashBoardDataContext)

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

  const [times, setTimes] = useState([])

  const handle = (e) => {
    console.log(e.target.value)
    console.log(e.target.name)

    const { name, value } = e.target
    setTimeValue({
      ...timeValue,
      [name]: value
    })

  }
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // axios to add new medicine
  const addNewMedicine = () => {
    const medicineData = {
      userId: userId,
      medicineData: formData
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
        {medicationDataList?.map((med, idx) => (

          <div
            key={idx}
            className="bg-[var(--card-bg)] p-4 shadow-sm border border-[var(--dashboard-border)] rounded-lg "
          >
            {/* Top Section */}
            <div className="flex justify-between items-start mb-3 flex-wrap">
              <h2 className="text-2xl font-semibold text-[var(--dashboard-blue)] flex items-center gap-2">
                <Pill /> {med.medicineName}
              </h2>
              <span
                className={`text-xs px-2 py-1 rounded-full ${med.status === "taken"
                  ? "text-green-400"
                  : "text-yellow-400"
                  }`}
              >
                {med.status}
              </span>
            </div>

            {/* Details */}
            <div className="mb-4">
              <p className="text-[var(--fourground-color)] text-xl">
                {med.douseType}
              </p>
              <p className="text-[var(--fourground-color)] text-lg">
                {med.perDouse}
              </p>
              <p className="text-[var(--fourground-color)] text-sm flex items-center gap-2 mt-1">
                <Bell size={14} /> Next: {formatNextTime(med.timeToTake)}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-between mt-6 flex-wrap">
              <button className="flex items-center gap-1 border border-[var(--dashboard-border)] px-3 py-1.5 rounded-lg cursor-pointer hover:bg-[var(--hover-color)] text-[var(--fourground-color)] transition text-sm">
                <Bell size={16} /> Remind
              </button>
              <button className="flex items-center gap-1 border border-[var(--dashboard-border)] px-3 py-1.5 rounded-lg cursor-pointer hover:bg-[var(--accent-color)] text-[var(--fourground-color)] transition text-sm">
                <Check size={16} /> Mark Taken
              </button>

              <button onClick={() => handleDelete(med?.id)} className="flex items-center gap-1 border border-[var(--dashboard-border)] px-3 py-1.5 rounded-lg cursor-pointer hover:bg-[var(--accent-color)] text-[var(--fourground-color)] transition text-sm">
                <Delete size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </main>
      {
        isOpen && <div className="form-container min-w-[30rem] max-w-fit mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between">
              <label htmlFor="medicineName" className="text-sm text-gray-800 dark:text-white mb-2 block">Medicine Name</label> <X size={15} onClick={() => setOpen(!isOpen)} className="cursor-pointer" />
            </div>
            <input onChange={handleChange} id="medicine-name" name="medicineName" type="text" placeholder="Enter Medicine Name" className="w-full p-3 text-sm border rounded-md bg-gray-100 dark:bg-gray-600 dark:text-white dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6" />

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

            <div className="dose-qty-section mb-6">
              <label htmlFor="douse-qty" className="text-sm text-gray-800 dark:text-white mb-2 block">Week Days</label>
              <select onChange={handleChange} name="douseQty" id="douse-qty" className="w-full p-3 text-sm border rounded-md bg-gray-100 dark:bg-gray-600 dark:text-white dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="0">Sunday</option>
                <option value="1">Monday</option>
                <option value="2">Tuesday</option>
                <option value="3">Wednesday</option>
                <option value="4">Thursday</option>
                <option value="5">Friday</option>
                <option value="6">Saturday</option>
              </select>
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
                          onChange={handle}
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


            <button type="submit" className="w-full p-3 text-sm text-white bg-[var(--dashboard-blue)] cursor-pointer">Submit</button>
          </form>
        </div>

      }
    </div>
  );
};

export default Medication;
