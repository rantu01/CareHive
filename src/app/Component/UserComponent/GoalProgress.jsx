"use client"

import { use } from "react";


import { DashBoardDataContext } from "./UserDashBoardDataContext/DashboardDataContext";
import { Goal, TrendingUp } from "lucide-react";
import { div } from "framer-motion/client";


const GoalProgress = () => {
    const { goalData } = use(DashBoardDataContext)

    const goalList = goalData[0]?.goalData
    console.log(goalList)








    
    return (
        <div>

            <header>
                <h1 className="text-3xl text-[var(--fourground-color)] font-bold">Goal & Progress</h1>
                <p className="text-[var(--fourground-color)]">Track your health and wellness objectives</p>
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
        </div>
    );
};

export default GoalProgress;