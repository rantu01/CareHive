import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { use } from "react";
import { DashBoardDataContext } from "./UserDashBoardDataContext/DashboardDataContext";

const AiHealthTips = () => {
  const { userHealthStats } = use(DashBoardDataContext);
  const userStats = userHealthStats;

  const fetchAiTips = async (userStats) => {
    const res = await axios.post("/api/dashboard-ai", { userStats });

    let data = res.data;

    // In your route you are returning raw JSON string like: "[ ... ]"
    if (typeof data === "string") {
      try {
        data = JSON.parse(data);
      } catch (error) {
        console.error("JSON parse failed:", error);
        data = [];
      }
    }

    return data || [];
  };

  const {
    data: aiTips = [],
    isLoading,
    isError,
    refetch, // 🔑 this allows manual triggering
  } = useQuery({
    queryKey: ["aiTips", userStats],
    queryFn: () => fetchAiTips(userStats),
    enabled: false, // 🔑 don't run automatically
  });

  return (
    <div className="bg-[var(--dashboard-bg)] text-[var(--fourground-color)] py-6">
      <div className="flex gap-5 mb-5 items-center">
        <h2 className="text-2xl font-bold mb-4">AI Health Tips</h2>
        <button
          type="button"
          onClick={() => refetch()} // 🔑 trigger API call on button click
          className="px-2 py-1.5 rounded text-[var(--fourground-color)] bg-[var(--dashboard-blue)] cursor-pointer"
        >
          Get AI Health Tips
        </button>
      </div>

      {isLoading && <div>Loading tips…</div>}
      {isError && <div>Failed to load tips.</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aiTips.map((tip, index) => (
          <div
            key={index}
            className="p-4 rounded-2xl border shadow-sm"
            style={{
              borderColor: "var(--dashboard-border)",
              backgroundColor: "var(--sidebar-bg)",
            }}
          >
            <h3 className="text-lg font-semibold text-[var(--dashboard-blue)] mb-2">
              Tip {index + 1}
            </h3>
            <p className="text-sm leading-relaxed">{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiHealthTips;
