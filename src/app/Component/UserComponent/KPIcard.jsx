

import { Activity, Heart, TrendingUp, Weight } from "lucide-react";

const KPIcard = ({ title, value, target = '' }) => {
  const iconsMap = {
    "bp": <Activity className="w-4 h-4 text-white" />,
    "daily-step": <TrendingUp className="w-4 h-4 text-white" />,
    "heart-rate": <Heart className="w-4 h-4 text-white" />,
    "weight": <Weight className="w-4 h-4 text-white" />
  };

  const status =
    value < 18.5 ? "Low" :
    value <= 24.9 ? "Normal" :
    "High";

  return (
    <div className="flex justify-between items-center rounded-2xl p-6 shadow hover:shadow-lg transition-all duration-500 hover:-translate-y-1 flex-wrap border border-[var(--dashboard-border)]">
      
      {/* Left section */}
      <div className="flex flex-col gap-4">
        <p className="text-gray-600 font-semibold text-sm tracking-wide ">
          {title.toUpperCase()}
        </p>

        <div className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          {title === "bp" && (
            <>
              <span className="text-3xl font-bold text-[var(--dashboard-blue)]">
                {value}
              </span>
              <span className="text-sm text-gray-500">{status}</span>
            </>
          )}

          {title === "daily-step" && (
            <>
              <span className="text-3xl font-bold text-[var(--dashboard-blue)]">
                {value}
              </span>
              <span className="text-sm text-gray-500">/ {target}</span>
            </>
          )}

          {title === "heart-rate" && (
            <>
              <span className="text-3xl font-bold text-[var(--dashboard-blue)]">
                {value}
              </span>
              <span className="text-sm text-gray-500">bpm</span>
            </>
          )}

          {title === "weight" && (
            <>
              <span className="text-3xl font-bold text-[var(--dashboard-blue)]">
                {value}
              </span>
              <span className="text-sm text-gray-500">kg</span>
            </>
          )}
        </div>
      </div>

      {/* Right section (icon) */}
      <div className="bg-[var(--dashboard-blue)] flex justify-center items-center p-4 rounded-xl shadow-sm">
        {iconsMap[title]}
      </div>
    </div>
  );
};

export default KPIcard;
