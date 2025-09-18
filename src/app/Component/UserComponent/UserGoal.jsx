"use client";

import { Goal, X } from "lucide-react";
import { use, useState } from "react";
import { DashBoardDataContext } from "./UserDashBoardDataContext/DashboardDataContext";
import { useParams } from "next/navigation";

const UserGoal = () => {
    const { goalData } = use(DashBoardDataContext);

    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [goal, setGoal] = useState("");


    const { userId } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !goal) {
            alert("Both fields are required!");
            return;
        }

        const goalInformation = { userId, goalData: { title, goal } }

        const getUserGoal = async () => {
            const res = await axios.post('/api/users', userData);
            return res.data;
        }



        // Reset & close
        setTitle("");
        setGoal("");
        setIsOpen(false);
    };

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

            {/* Progress bar (example static 45%) */}
            <div className="mt-5">
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                    <div className="bg-[var(--dashboard-blue)] text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-[45%]">
                        45%
                    </div>
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

                        <form onSubmit={handleSubmit} className="space-y-4">
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
