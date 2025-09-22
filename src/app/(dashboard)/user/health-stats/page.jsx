"use client"

import HealthStatsBarChart from "@/app/Component/UserComponent/HealthStasBarChart";
import KPIcard from "@/app/Component/UserComponent/KPIcard";
import { DashBoardDataContext } from "@/app/Component/UserComponent/UserDashBoardDataContext/DashboardDataContext";
import { use } from "react";


const page = () => {
    const { userHealthStats } = use(DashBoardDataContext)
    return (
        <div>
            <div className='grid md:grid-cols-4 gap-6 sm:grid-cols-2 grid-cols-1'>

                {
                    userHealthStats?.map((activity) => (
                        <KPIcard key={activity.title} title={activity.title} value={activity.value} target={activity?.target} />
                    ))
                }

            </div>

            <div>
                <HealthStatsBarChart/>
            </div>
        </div>
    );
};

export default page;