"use client"

import { use, useState } from "react";


import { DashBoardDataContext } from "./UserDashBoardDataContext/DashboardDataContext";
import { Goal, TrendingUp, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "@/app/context/authContext";


const GoalProgress = () => {


    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [goal, setGoal] = useState("");

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
            percentage: "0%"
        }

        mutation.mutate(goalInformation)

        // Reset & close
        setTitle("");
        setGoal("");
        setIsOpen(false);
    };


    return (
        <div>

            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl text-[var(--fourground-color)] font-bold">Goal & Progress</h1>
                    <p className="text-[var(--fourground-color)]">Track your health and wellness objectives</p>
                </div>

                <div>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-[var(--dashboard-blue)] p-2 cursor-pointer rounded text-sm text-[var(--fourground-color)]"
                    >
                        Add New Goal
                    </button>
                </div>
            </header>
            <div className=" grid grid-cols-2 gap-4 mt-8">
                {
                    goalList?.map(({ id, title, goal, completed, percentage }) => (
                        <div key={id} className="p-4 rounded-lg shadow bg-[var(--dashboard-blue)]/10">
                            <div className="flex gap-5 items-center">
                                <Goal size={26} color="var(--dashboard-blue)" />
                                <h1 className="text-2xl font-bold text-[var(--fourground-color)]">{title}</h1>
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-[var(--fourground-color)] text-lg">Progress</h1>
                                    <div className="text-[var(--fourground-color)] text-lg">
                                        <span>{completed}</span> / <span>{goal}</span>
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <div className="w-full bg-gray-300 rounded-full h-2.5">
                                        <div
                                            className="bg-[var(--dashboard-blue)] h-2.5 rounded-full"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mt-3">
                                    <TrendingUp className="text-[var(--dashboard-blue)]" />
                                    <div className="text-[var(--fourground-color)]">
                                        {percentage}% <span>completed</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))
                }
            </div>


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