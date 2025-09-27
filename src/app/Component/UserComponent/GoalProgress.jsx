"use client"

import { use, useState } from "react";


import { DashBoardDataContext } from "./UserDashBoardDataContext/DashboardDataContext";
import { Calendar, Goal, Plus, Target, TrendingUp, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "@/app/context/authContext";


const GoalProgress = () => {


    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [goal, setGoal] = useState("");
    const [measurement,setMeasurement]=useState("m")


    console.log(measurement)

    const { goalData } = use(DashBoardDataContext)

    const { user } = use(AuthContext)
    const userId = user?.uid


    const queryClient = useQueryClient();

    const goalList = goalData[0]?.goalData
    console.log(goalList)



    // add new goal
    const addNewGoal = async (goalData) => {
        const res = await axios.patch(`/api/user-goal/${userId}`, goalData)
    }


    // add new goal mutation
    const mutation = useMutation({
        mutationFn: addNewGoal,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["daily_goal", userId] });
            Swal.fire({
                title: "Goal added successfully",
                icon: "success"
            })
        },
        onError: (error) => {
            Swal.fire({
                title: error,
                icon: 'warning'
            })
        }

    })



    const handleAddNewGoal = (e) => {
        e.preventDefault();

        if (!title.trim() || !goal) {
            alert("Both fields are required!");
            return;
        }

        const goalInformation = {
            actionType: "add-goal",
            id: nanoid(7),
            title: title,
            goal: goal,
            completed: 0,
            percentage: "0%",
            measurementType:measurement
        }

        mutation.mutate(goalInformation)

        // Reset & close
        setTitle("");
        setGoal("");
        setIsOpen(false);
    };


    return (
        <div>

            <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-4 p-6 bg-gradient-to-r from-[var(--card-bg)] to-[var(--sidebar-bg)] rounded-2xl border border-[var(--dashboard-border)] shadow-lg backdrop-blur-sm relative overflow-hidden mb-6">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--dashboard-blue)]/10 to-transparent rounded-full blur-2xl -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[var(--dashboard-blue)]/5 to-transparent rounded-full blur-xl translate-y-12 -translate-x-12"></div>

                <div className="relative z-10 flex-1">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-[var(--dashboard-blue)]/20 rounded-xl border border-[var(--dashboard-blue)]/30">
                            <Target className="text-[var(--dashboard-blue)]" size={24} />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--fourground-color)] to-[var(--dashboard-blue)] bg-clip-text text-transparent">
                            Goal & Progress
                        </h1>
                    </div>
                    <p className="text-[var(--fourground-color)]/70 text-base md:text-lg font-medium ml-16">
                        Track your health and wellness objectives
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-[var(--fourground-color)]/50 ml-16">
                        <span className="flex items-center gap-1">
                            <TrendingUp size={14} />
                            Active goals tracking
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            Weekly progress
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => setIsOpen(true)}
                    className="group w-full lg:w-auto bg-gradient-to-r from-[var(--dashboard-blue)] to-[var(--dashboard-blue)]/90 text-white rounded-xl flex items-center justify-center gap-3 px-6 py-4 cursor-pointer hover:from-[var(--dashboard-blue)]/90 hover:to-[var(--dashboard-blue)] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold text-base relative z-10 border border-[var(--dashboard-blue)]/30"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    <span>Add New Goal</span>
                </button>
            </header>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 text-black">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-lg font-bold mb-4">Add New Goal</h2>

                        <form onSubmit={handleAddNewGoal} className="space-y-4">
                            {/* Goal Title */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Goal Title
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Goal title"
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-blue)]"
                                    required
                                />
                            </div>

                            {/* Goal Number */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Target
                                </label>

                                <input
                                    type="number"
                                    value={goal}
                                    onChange={(e) => setGoal(e.target.value)}
                                    placeholder="Target"
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-blue)]"
                                    required
                                />

                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Measurement
                                </label>

                                <select
                                    onChange={(e) => setMeasurement(e.target.value)}
                                    name="douseType"
                                    id="douse-type"
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-blue)]"
                                >
                                    <option value="m">M</option>
                                    <option value="kg">Kg</option>
                                    <option value="l">L</option>
                                    <option value="h">H</option>
                                </select>

                            </div>

                            {/* Submit button */}
                            <button
                                type="submit"
                                className="bg-[var(--dashboard-blue)] text-white px-4 py-2 rounded w-full hover:opacity-90 cursor-pointer"
                            >
                                Save Goal
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default GoalProgress;