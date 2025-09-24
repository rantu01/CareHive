"use client";

import HealthStatsBarChart from "@/app/Component/UserComponent/HealthStasBarChart";
import KPIcard from "@/app/Component/UserComponent/KPIcard";
import FoodLogChart from "@/app/Component/UserComponent/MacrosPieChart";
import { DashBoardDataContext } from "@/app/Component/UserComponent/UserDashBoardDataContext/DashboardDataContext";
import WelcomeBar from "@/app/Component/UserComponent/WelcomeBar";
import { use } from "react";

const page = () => {
  const { userHealthStats } = use(DashBoardDataContext);
  return (
    <div className="max-w-[90%] mx-auto mt-20">

      <div className="grid md:grid-cols-4 gap-6 sm:grid-cols-2 grid-cols-1 mt-12">
        {userHealthStats?.map((activity) => (
          <KPIcard
            key={activity.title}
            title={activity.title}
            value={activity.value}
            target={activity?.target}
          />
        ))}
      </div>

      {/* all chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 mt-10">
        <div className="flex-1">
          <HealthStatsBarChart />
        </div>

        <div className="flex-1">
          <FoodLogChart />
        </div>
      </div>
    </div>
  );
};

export default page;
