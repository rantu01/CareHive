"use client";

import { Goal, X } from "lucide-react";
import { use, useEffect, useState } from "react";
import { DashBoardDataContext } from "./UserDashBoardDataContext/DashboardDataContext";
import { useParams } from "next/navigation";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { nanoid} from "nanoid";


const UserGoal = () => {
    const { goalData, isLoading, setGoalData } = use(DashBoardDataContext);
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [goal, setGoal] = useState("");

    const { userId } = useParams()

    console.log("user goal data", goalData)

    const goalList = goalData[0]?.goalData
    console.log("The goal list", goalList)

    const addNewGoal = async (goalData) => {
        const res = await axios.patch(`/api/user-goal/${userId}`, goalData)
    }


    const mutation = useMutation({
        mutationFn: addNewGoal,
        onSuccess: (data) => {
            console.log("goal data", data)
        },
        onError: (error) => {
            console.error("Error", error)
        }

    })



    const handleAddNewGoal = (e) => {
        e.preventDefault();

        if (!title.trim() || !goal) {
            alert("Both fields are required!");
            return;
        }

        const goalInformation = {
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

    if (isLoading) return <p>Loading......</p>


    return (
        <div className="border-1 border-gray-200 p-4 rounded">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <Goal color="var(--dashboard-blue)" />
                    <h1 className="text-xl font-bold">Weekly Health Goal</h1>
                </div>
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-[var(--dashboard-blue)] p-2 cursor-pointer rounded text-sm text-white"
                >
                    Add New Goal
                </button>
            </div>

            <div className="mt-5">
                <div className="w-full space-y-4">
                    {goalList?.map((goal, idx) => (
                        <div key={goal?.id} className="space-y-2">
                            {/* Goal Title and Numbers */}
                            <div className="flex justify-between">
                                <p>{goal?.title}</p>
                                <div>
                                    <span>{goal?.completed}</span>/<span>{goal?.goal}</span>
                                </div>
                            </div>

                            <input
                                type="range"
                                min="0"
                                max={goal?.goal}
                                defaultValue={goal?.completed}
                                // onChange={(e) => handleOnchangeRange(e, goal?.id)}
                                className="w-full accent-[var(--dashboard-blue)] cursor-default"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
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

export default UserGoal;
