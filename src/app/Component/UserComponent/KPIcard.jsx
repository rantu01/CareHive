import { Activity, Heart, TrendingUp, Weight, ArrowUp, ArrowDown, Minus } from "lucide-react";

const KPIcard = ({ title, value, target = '' }) => {
  const iconsMap = {
    "bp": <Activity className="w-5 h-5 text-white" />,
    "daily-step": <TrendingUp className="w-5 h-5 text-white" />,
    "heart-rate": <Heart className="w-5 h-5 text-white" />,
    "weight": <Weight className="w-5 h-5 text-white" />
  };

  const status =
    value < 18.5 ? "Low" :
    value <= 24.9 ? "Normal" :
    "High";

  const getStatusColor = (status, title) => {
    if (title === "bp") {
      return status === "Normal" ? "text-[var(--color-primary)]" : 
             status === "Low" ? "text-[var(--fourground-color)]/60" : "text-[var(--color-primary)]";
    }
    return "text-[var(--fourground-color)]/60";
  };

  const getStatusIcon = (status) => {
    if (status === "High") return <ArrowUp size={14} />;
    if (status === "Low") return <ArrowDown size={14} />;
    return <Minus size={14} />;
  };

  const getProgressPercentage = () => {
    if (title === "daily-step" && target) {
      return Math.min((value / parseInt(target)) * 100, 100);
    }
    return 0;
  };

  return (
    <div className="group relative bg-gradient-to-br from-[var(--card-bg)] to-[var(--sidebar-bg)] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[var(--dashboard-border)] hover:border-[var(--color-primary)]/30 backdrop-blur-sm overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[var(--color-primary)]/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-12 translate-x-12"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[var(--color-primary)]/5 to-transparent rounded-full blur-lg -translate-y-8 -translate-x-8"></div>

      <div className="relative z-10 flex justify-between items-center">
        {/* Left section */}
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-[var(--fourground-color)]/70 font-bold text-xs tracking-widest uppercase">
              {title.replace('-', ' ')}
            </p>
            <div className="h-1 w-8 bg-gradient-to-r from-[var(--color-primary)]/30 to-transparent rounded-full"></div>
          </div>

          <div className="space-y-2">
            {title === "bp" && (
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl md:text-4xl font-black text-[var(--color-primary)] tracking-tight">
                    {value}
                  </span>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(status, title)} bg-[var(--dashboard-border)]/30`}>
                    {getStatusIcon(status)}
                    <span>{status}</span>
                  </div>
                </div>
                <p className="text-xs text-[var(--fourground-color)]/50 font-medium">Blood Pressure Reading</p>
              </div>
            )}

            {title === "daily-step" && (
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl md:text-4xl font-black text-[var(--color-primary)] tracking-tight">
                    {value?.toLocaleString()}
                  </span>
                  <span className="text-sm text-[var(--fourground-color)]/60 font-medium">/ {target?.toLocaleString()}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-[var(--fourground-color)]/60">
                    <span>Progress</span>
                    <span>{Math.round(getProgressPercentage())}%</span>
                  </div>
                  <div className="w-full bg-[var(--dashboard-border)]/40 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/80 h-2 rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${getProgressPercentage()}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {title === "heart-rate" && (
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl md:text-4xl font-black text-[var(--color-primary)] tracking-tight">
                    {value}
                  </span>
                  <span className="text-sm text-[var(--fourground-color)]/60 font-medium">bpm</span>
                </div>
                <p className="text-xs text-[var(--fourground-color)]/50 font-medium">Beats per minute</p>
              </div>
            )}

            {title === "weight" && (
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl md:text-4xl font-black text-[var(--color-primary)] tracking-tight">
                    {value}
                  </span>
                  <span className="text-sm text-[var(--fourground-color)]/60 font-medium">kg</span>
                </div>
                <p className="text-xs text-[var(--fourground-color)]/50 font-medium">Current weight</p>
              </div>
            )}
          </div>
        </div>

        {/* Right section (icon) */}
        <div className="flex-shrink-0 ml-4">
          <div className="relative">
            <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)]/80 flex justify-center items-center p-4 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-[var(--color-primary)]/30">
              {iconsMap[title]}
            </div>
            <div className="absolute inset-0 bg-[var(--color-primary)]/20 rounded-2xl animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-110"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-primary)]/30 via-[var(--color-primary)]/10 to-transparent"></div>
    </div>
  );
};

export default KPIcard;
