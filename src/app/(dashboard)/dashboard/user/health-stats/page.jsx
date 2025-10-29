"use client";

import AiHealthTips from "@/app/Component/UserComponent/AiHealthTips";
import HealthStatsBarChart from "@/app/Component/UserComponent/HealthStasBarChart";
import KPIcard from "@/app/Component/UserComponent/KPIcard";
import FoodLogChart from "@/app/Component/UserComponent/MacrosPieChart";
import { DashBoardDataContext } from "@/app/Component/UserComponent/UserDashBoardDataContext/DashboardDataContext";
import WelcomeBar from "@/app/Component/UserComponent/WelcomeBar";
import { use } from "react";

const page = () => {
  const { userHealthStats } = use(DashBoardDataContext);

  return (
    <div className="">

      <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] bg-clip-text ">Stay on Top of Your Health: Easy Monitoring, Clear Insights</h1>

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

        <div className="flex-1 mt-10">
          <FoodLogChart />
        </div>
      </div>

      {/* ai health tips */}

      <div className="mt-10">
        <AiHealthTips />
      </div>
    </div>
  );
};

export default page;
