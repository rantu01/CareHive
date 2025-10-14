import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { use } from "react";
import { DashBoardDataContext } from "./UserDashBoardDataContext/DashboardDataContext";
import { Brain, Sparkles, RefreshCw, Lightbulb, Heart, Activity, TrendingUp, Zap } from "lucide-react";
import Swal from "sweetalert2";

const AiHealthTips = () => {
  const { userHealthStats } = use(DashBoardDataContext);
  const userStats = userHealthStats;

  const notUserHealthStats = () => {
    Swal.fire("Please set your health stats");
  }

  const fetchAiTips = async (userStats) => {
    const res = await axios.post("/api/dashboard-ai", { userStats });
    let data = res.data;
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
    refetch,
  } = useQuery({
    queryKey: ["aiTips", userStats],
    queryFn: () => fetchAiTips(userStats),
    enabled: false,
  });

  const tipIcons = [Heart, Activity, TrendingUp, Zap, Brain, Lightbulb];

  return (
    <div className="bg-gradient-to-br from-[var(--dashboard-bg)] to-[var(--dashboard-bg)]/90 text-[var(--fourground-color)] py-8 px-6 rounded-3xl relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[var(--color-primary)]/10 to-transparent rounded-full blur-3xl -translate-y-20 translate-x-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[var(--color-primary)]/5 to-transparent rounded-full blur-2xl translate-y-16 -translate-x-16"></div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8 items-start lg:items-center">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)]/80 rounded-2xl shadow-lg">
                <Brain className="text-white" size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/80 bg-clip-text text-transparent">
                  AI Health Tips
                </h2>
                <p className="text-[var(--fourground-color)]/60 text-sm">
                  Personalized recommendations powered by AI
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={userHealthStats? () => refetch():()=>notUserHealthStats()}
            disabled={isLoading}
            className="group px-6 py-3 rounded-xl text-white bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/80 hover:from-[var(--color-primary)]/80 hover:to-[var(--color-primary)]/90 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3 font-semibold"
          >
            <div className="relative">
              <Sparkles className={`transition-all duration-300 ${isLoading ? 'opacity-0' : 'group-hover:rotate-12'}`} size={20} />
              <RefreshCw className={`absolute inset-0 transition-all duration-300 ${isLoading ? 'animate-spin opacity-100' : 'opacity-0'}`} size={20} />
            </div>
            <span>{isLoading ? 'Generating...' : 'Get AI Health Tips'}</span>
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-16 space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/80 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Brain className="text-white animate-bounce" size={24} />
              </div>
              <p className="text-lg font-semibold text-[var(--color-primary)]">Analyzing your health data...</p>
              <p className="text-sm text-[var(--fourground-color)]/60">Our AI is generating personalized tips for you</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="text-red-500" size={24} />
            </div>
            <p className="text-lg font-semibold text-red-600 mb-2">Failed to load tips</p>
            <p className="text-sm text-[var(--fourground-color)]/60 mb-4">Something went wrong while generating your AI health tips</p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Tips Grid */}
        {!isLoading && !isError && aiTips.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiTips.map((tip, index) => {
              const IconComponent = tipIcons[index % tipIcons.length];
              return (
                <div
                  key={index}
                  className="group p-6 rounded-2xl border-2 shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm relative overflow-hidden hover:scale-105"
                  style={{
                    borderColor: "var(--dashboard-border)",
                    backgroundColor: "var(--sidebar-bg)",
                  }}
                >
                  {/* Card Gradient Overlay */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[var(--color-primary)]/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-12 translate-x-12"></div>

                  <div className="relative z-10">
                    {/* Tip Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/50 rounded-xl border border-[var(--color-primary)]/30 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="text-[var(--color-primary)]" size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-[var(--color-primary)] group-hover:text-[var(--color-primary)]/90 transition-colors duration-300">
                        Health Tip {index + 1}
                      </h3>
                    </div>

                    {/* Tip Content */}
                    <p className="text-[var(--fourground-color)]/80 leading-relaxed text-sm font-medium group-hover:text-[var(--fourground-color)] transition-colors duration-300">
                      {tip}
                    </p>

                    {/* Decorative Bottom Border */}
                    <div className="mt-4 h-1 bg-gradient-to-r from-[var(--color-primary)]/20 via-[var(--color-primary)]/10 to-transparent rounded-full"></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && aiTips.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lightbulb className="text-[var(--color-primary)]" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-[var(--fourground-color)] mb-2">Ready for AI Insights?</h3>
            <p className="text-[var(--fourground-color)]/60 mb-6 max-w-md mx-auto">
              Click the button above to get personalized health recommendations based on your current stats and goals.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiHealthTips;
