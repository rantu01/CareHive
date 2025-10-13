"use client";

import { Goal, X, Trophy, Target, TrendingUp, Award, CheckCircle } from "lucide-react";
import { use, useEffect, useState } from "react";
import { DashBoardDataContext } from "./UserDashBoardDataContext/DashboardDataContext";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import Swal from "sweetalert2";
import { AuthContext } from "@/app/context/authContext";
import Link from "next/link";

const UserGoal = () => {
    const { goalData, isLoading, setGoalData } = use(DashBoardDataContext);
    const { user } = use(AuthContext);
    const userId = user?.uid;
    const queryClient = useQueryClient();

    const goalList = goalData[0]?.goalData;
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        setCurrentUrl(window.location.pathname);
    }, []);

    const checkCurrentUrl = (url, array) => {
        if (url === "/dashboard/user") return 3;
        if (url === "/dashboard/user/goals") return array.length;
    }

    const trackGoalChange = async (completedData) => {
        await axios.patch(`/api/user-goal/${userId}`, completedData);
    }

    const deleteCompletedGoal = async (goalId) => {
        await axios.delete(`/api/user-goal/${userId}`, { data: { id: goalId } });
    }

    const completeGoalMutation = useMutation({
        mutationFn: trackGoalChange,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["daily_goal", userId] }),
        onError: (error) => Swal.fire({ title: error, icon: 'warning' })
    });

    const deleteGoalMutation = useMutation({
        mutationFn: deleteCompletedGoal,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["daily_goal", userId] }),
        onError: (error) => Swal.fire({ title: error, icon: 'warning' })
    });

    const trackGoalComplete = (e, target, goalId) => {
        const completed = e.target.value;
        const remaining = target - completed;
        const updatedData = { actionType: "update-completed", completed, id: goalId, target };
        completeGoalMutation.mutate(updatedData);

        if (remaining === 0) {
            Swal.fire({
                title: "You have reached your goal.",
                text: "Do you want to delete this?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#28a745",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteGoalMutation.mutate(goalId);
                    Swal.fire({ title: "Deleted!", text: "Goal has been deleted.", icon: "success" });
                }
            });
        }
    }

    if (isLoading) return (
        <div className="bg-[var(--card-bg)] border-2 border-[var(--dashboard-border)] p-8 rounded-3xl shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-center py-12">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto animate-pulse">
                        <Goal className="text-white animate-bounce" size={24} />
                    </div>
                    <p className="text-lg font-semibold text-[var(--color-primary)]">Loading your goals...</p>
                    <p className="text-sm text-[var(--fourground-color)]/60">Tracking your health progress</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-[var(--card-bg)] border-2 border-[var(--dashboard-border)] p-2 md:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm relative overflow-hidden">

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-4 items-center">
                        <div className="p-3 bg-[var(--color-primary)] rounded-2xl shadow-lg">
                            <Goal className="text-white" size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[var(--color-primary)]">Weekly Health Goals</h1>
                            <p className="text-[var(--fourground-color)]/60 text-sm">Track your progress and achieve your targets</p>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2 text-[var(--fourground-color)]/60">
                            <Target size={16} />
                            <span>{goalList?.length || 0} Goals</span>
                        </div>
                        <div className="flex items-center gap-2 text-[var(--color-primary)]">
                            <CheckCircle size={16} />
                            <span>{goalList?.filter(goal => goal.completed === goal.goal).length || 0} Completed</span>
                        </div>
                    </div>
                </div>

                {/* Goals List */}
                <div className="space-y-6">
                    {goalList?.slice(0, checkCurrentUrl(currentUrl, goalList)).map((goal) => {
                        const progressPercentage = Math.round((goal?.completed / goal?.goal) * 100);
                        const isCompleted = goal?.completed === goal?.goal;

                        return (
                            <div
                                key={goal?.id}
                                className={`group p-4 sm:p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg relative overflow-hidden ${isCompleted
                                    ? 'bg-[var(--color-primary)]/20 border-[var(--color-primary)]/50 shadow-[var(--color-primary)]/20'
                                    : 'bg-[var(--dashboard-bg)] border-[var(--dashboard-border)] hover:border-[var(--color-primary)]/30'
                                    }`}
                            >
                                <div className="relative z-10 space-y-4">
                                    {/* Goal Header */}
                                    <div className="flex flex-col sm:flex-row sm:justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className={`p-2 rounded-lg ${isCompleted ? 'bg-[var(--color-primary)]/50' : 'bg-[var(--color-primary)]/20'}`}>
                                                    {isCompleted ? <Award className="text-[var(--color-primary)]" size={18} /> : <TrendingUp className="text-[var(--color-primary)]" size={18} />}
                                                </div>
                                                <h3 className={`text-sm sm:text-lg font-bold ${isCompleted ? 'text-[var(--color-primary)]' : 'text-[var(--fourground-color)]'}`}>{goal?.title}</h3>
                                            </div>

                                            {/* Progress Stats */}
                                            <div className="flex flex-wrap gap-4 text-xs sm:text-sm">
                                                <span className={`font-semibold text-[var(--color-primary)]`}>{progressPercentage}% Complete</span>
                                                <span className="text-[var(--fourground-color)]/60">{goal?.goal - goal?.completed} remaining</span>
                                            </div>
                                        </div>

                                        {/* Progress Numbers */}
                                        <div className="text-right">
                                            <div className={`text-xl sm:text-2xl font-bold text-[var(--color-primary)]`}>
                                                <span>{goal?.completed}</span>
                                                <span className="text-[var(--fourground-color)]/40">/{goal?.goal} {goal?.measurementType}</span>
                                            </div>
                                            {isCompleted && (
                                                <div className="flex items-center gap-1 text-[var(--color-primary)] text-xs font-medium">
                                                    <Trophy size={12} />
                                                    <span>Goal Achieved!</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs sm:text-sm text-[var(--fourground-color)]/60">
                                            <span>Progress</span>
                                            <span>{progressPercentage}%</span>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="range"
                                                min="0"
                                                max={goal?.goal}
                                                defaultValue={goal?.completed}
                                                onMouseLeave={(e) => trackGoalComplete(e, goal?.goal, goal?.id)}
                                                className="w-full h-3 bg-[var(--dashboard-border)]/30 rounded-full appearance-none cursor-pointer slider"
                                                style={{ background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${progressPercentage}%, var(--dashboard-border) ${progressPercentage}%, var(--dashboard-border) 100%)` }}
                                            />
                                            <div className="flex justify-between mt-2 text-xs text-[var(--fourground-color)]/40">
                                                <span>0</span>
                                                <span>{Math.floor(goal?.goal / 2)}</span>
                                                <span>{goal?.goal}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Achievement Badge */}
                                    {isCompleted && (
                                        <div className="flex items-center justify-center p-2 sm:p-3 bg-[var(--color-primary)]/20 rounded-xl border border-[var(--color-primary)]/50">
                                            <div className="flex items-center gap-2 text-[var(--color-primary)]">
                                                <CheckCircle size={18} />
                                                <span className="font-semibold text-sm sm:text-base">Congratulations! Goal completed!</span>
                                                <Trophy size={18} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {(!goalList || goalList.length === 0) && (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-[var(--color-primary)]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Target className="text-[var(--color-primary)]" size={32} />
                        </div>
                        <h3 className="text-xl font-semibold text-[var(--fourground-color)] mb-2">No Goals Set Yet</h3>
                        <p className="text-[var(--fourground-color)]/60 mb-6 max-w-md mx-auto">
                            Start your health journey by setting your first weekly goal. Track your progress and achieve your targets!
                        </p>
                    </div>
                )}
            </div>

            <style jsx>{`
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: var(--color-primary);
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    border: 2px solid white;
                }
                .slider::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: var(--color-primary);
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    border: 2px solid white;
                }
            `}</style>
        </div>
    );
};

export default UserGoal;
