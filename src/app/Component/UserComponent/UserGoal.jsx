import { Goal } from "lucide-react";
import { use, useState } from "react";
import { DashBoardDataContext } from "./UserDashBoardDataContext/DashboardDataContext";


const UserGoal = () => {


    const { goalData } = use(DashBoardDataContext)


    return (
        <div className="border-1 border-gray-200 p-4 rounded">

            <div className="flex items-center justify-between">
                <div className="flex gap-2">
                    <Goal color="var(--dashboard-blue)" />
                    <h1 className="2xl font-bold">Health Goal</h1>
                </div>
                <button className="bg-[var(--dashboard-blue)] p-2 cursor-pointer rounded text-sm text-white">Add New Goal</button>
            </div>

            <div className="mt-5">

                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                    <div className="bg-[var(--dashboard-blue)] text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-[45%] " > 45%</div>
                </div>

            </div>


        </div>
    );
};

export default UserGoal;