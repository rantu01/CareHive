"use client";

import { Goal, X, Trophy, Target, TrendingUp, Calendar, Award, CheckCircle } from "lucide-react";
import { use, useEffect, useState, } from "react";
import { DashBoardDataContext } from "./UserDashBoardDataContext/DashboardDataContext";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import Swal from "sweetalert2";
import { AuthContext } from "@/app/context/authContext";
import Link from "next/link";

const UserGoal = () => {
    const { goalData, isLoading, setGoalData } = use(DashBoardDataContext);

    const { user } = use(AuthContext)
    const userId = user?.uid

    const queryClient = useQueryClient();

    const goalList = goalData[0]?.goalData

    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        setCurrentUrl(window.location.pathname);
    }, []);

    const checkCurrentUrl = (url, array) => {

        if (url === "/dashboard/user") {
            return 3
        } else if (url === "/dashboard/user/goals") {
            return array.length
        }
    }



    // update goal progress
    const trackGoalChange = async (completedData) => {
        const res = await axios.patch(`/api/user-goal/${userId}`, completedData)
    }

    // delete goal after complete
    const deleteCompletedGoal = async (goalId) => {
        const res = await axios.delete(`/api/user-goal/${userId}`, { data: { id: goalId } })
    }

    const completeGoalMutation = useMutation({
        mutationFn: trackGoalChange,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["daily_goal", userId] });
        },
        onError: (error) => {
            Swal.fire({
                title: error,
                icon: 'warning'
            })
        }
    })

    const deleteGoalMutation = useMutation({
        mutationFn: deleteCompletedGoal,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["daily_goal", userId] });
        },
        onError: (error) => {
            Swal.fire({
                title: error,
                icon: 'warning'
            })
        }
    })

    const trackGoalComplete = (e, target, goalId) => {
        const completed = e.target.value
        const remaining = target - completed

        const updatedData = { actionType: "update-completed", completed: completed, id: goalId, target: target }

        completeGoalMutation.mutate(updatedData)

        if (remaining === 0) {
            Swal.fire({
                title: "You have reached your goal.",
                text: "Do you want delete this",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteGoalMutation.mutate(goalId)
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            });
        }
    }

    if (isLoading) return (
        <div className="bg-gradient-to-br from-[var(--card-bg)] to-[var(--sidebar-bg)] border-2 border-[var(--dashboard-border)] p-8 rounded-3xl shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-center py-12">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-[var(--dashboard-blue)] to-[var(--dashboard-blue)]/80 rounded-full flex items-center justify-center mx-auto animate-pulse">
                        <Goal className="text-white animate-bounce" size={24} />
                    </div>
                    <p className="text-lg font-semibold text-[var(--dashboard-blue)]">Loading your goals...</p>
                    <p className="text-sm text-[var(--fourground-color)]/60">Tracking your health progress</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-gradient-to-br from-[var(--card-bg)] to-[var(--sidebar-bg)] border-2 border-[var(--dashboard-border)] p-2 md:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm relative overflow-hidden">
            {/* Decorative Background Elements */}
            {/* <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--dashboard-blue)]/10 to-transparent rounded-full blur-2xl -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[var(--dashboard-blue)]/5 to-transparent rounded-full blur-xl translate-y-12 -translate-x-12"></div> */}

            <div className="relative z-10">

                <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-4 items-center">
                        <div className="p-3 bg-gradient-to-br from-[var(--dashboard-blue)] to-[var(--dashboard-blue)]/80 rounded-2xl shadow-lg">
                            <Goal className="text-white" size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--fourground-color)] to-[var(--dashboard-blue)] bg-clip-text text-transparent">
                                Weekly Health Goals
                            </h1>
                            <p className="text-[var(--fourground-color)]/60 text-sm">
                                Track your progress and achieve your targets
                            </p>
                        </div>
                    </div>


                    <div className="hidden md:flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2 text-[var(--fourground-color)]/60">
                            <Target size={16} />
                            <span>{goalList?.length || 0} Goals</span>
                        </div>
                        <div className="flex items-center gap-2 text-[var(--dashboard-blue)]">
                            <CheckCircle size={16} />
                            <span>
                                {goalList?.filter(goal => goal.completed === goal.goal).length || 0} Completed
                            </span>
                        </div>
                    </div>
                </div>

                {/* Goals List */}
                <div className="space-y-6">
                    {goalList?.slice(0, checkCurrentUrl(currentUrl, goalList)).map((goal, idx) => {
                        const progressPercentage = Math.round((goal?.completed / goal?.goal) * 100);
                        const isCompleted = goal?.completed === goal?.goal;

                        return (
                            <div
                                key={goal?.id}
                                className={`group p-4 sm:p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg relative overflow-hidden ${isCompleted
                                    ? 'bg-gradient-to-r from-[var(--dashboard-blue)]/10 to-[var(--dashboard-blue)]/5 border-[var(--dashboard-blue)]/30 shadow-[var(--dashboard-blue)]/10'
                                    : 'bg-[var(--dashboard-bg)] border-[var(--dashboard-border)] hover:border-[var(--dashboard-blue)]/30'
                                    }`}
                            >
                                {/* Goal Progress Overlay */}
                                <div
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--dashboard-blue)]/10 to-[var(--dashboard-blue)]/5 transition-all duration-500 rounded-2xl"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>

                                <div className="relative z-10 space-y-4">
                                    {/* Goal Header */}
                                    <div className="flex flex-col sm:flex-row sm:justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div
                                                    className={`p-2 rounded-lg ${isCompleted ? 'bg-[var(--dashboard-blue)]/20' : 'bg-[var(--dashboard-blue)]/15'}`}
                                                >
                                                    {isCompleted ? (
                                                        <Award className="text-[var(--dashboard-blue)]" size={18} />
                                                    ) : (
                                                        <TrendingUp className="text-[var(--dashboard-blue)]" size={18} />
                                                    )}
                                                </div>
                                                <h3
                                                    className={`text-sm sm:text-lg font-bold ${isCompleted ? 'text-[var(--dashboard-blue)]' : 'text-[var(--fourground-color)]'}`}
                                                >
                                                    {goal?.title}
                                                </h3>
                                            </div>

                                            {/* Progress Stats */}
                                            <div className="flex flex-wrap gap-4 text-xs sm:text-sm">
                                                <span className={`font-semibold ${isCompleted ? 'text-[var(--dashboard-blue)]' : 'text-[var(--dashboard-blue)]'}`}>
                                                    {progressPercentage}% Complete
                                                </span>
                                                <span className="text-[var(--fourground-color)]/60">
                                                    {goal?.goal - goal?.completed} remaining
                                                </span>
                                            </div>
                                        </div>

                                        {/* Progress Numbers */}
                                        <div className="text-right">
                                            <div
                                                className={`text-xl sm:text-2xl font-bold ${isCompleted ? 'text-[var(--dashboard-blue)]' : 'text-[var(--dashboard-blue)]'}`}
                                            >
                                                <span>{goal?.completed}</span>
                                                <span className="text-[var(--fourground-color)]/40">/{goal?.goal} {goal?.measurementType}</span>
                                            </div>
                                            {isCompleted && (
                                                <div className="flex items-center gap-1 text-[var(--dashboard-blue)] text-xs font-medium">
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
                                            {/* Custom Range Input Styling */}
                                            <input
                                                type="range"
                                                min="0"
                                                max={goal?.goal}
                                                defaultValue={goal?.completed}
                                                onMouseLeave={(e) => trackGoalComplete(e, goal?.goal, goal?.id)}
                                                className="w-full h-3 bg-[var(--dashboard-border)]/30 rounded-full appearance-none cursor-pointer slider"
                                                style={{
                                                    background: `linear-gradient(to right, var(--dashboard-blue) 0%, var(--dashboard-blue) ${progressPercentage}%, var(--dashboard-border) ${progressPercentage}%, var(--dashboard-border) 100%)`
                                                }}
                                            />

                                            {/* Progress Markers */}
                                            <div className="flex justify-between mt-2 text-xs text-[var(--fourground-color)]/40">
                                                <span>0</span>
                                                <span>{Math.floor(goal?.goal / 2)}</span>
                                                <span>{goal?.goal}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Achievement Badge */}
                                    {isCompleted && (
                                        <div className="flex items-center justify-center p-2 sm:p-3 bg-gradient-to-r from-[var(--dashboard-blue)]/20 to-[var(--dashboard-blue)]/10 rounded-xl border border-[var(--dashboard-blue)]/30">
                                            <div className="flex items-center gap-2 text-[var(--dashboard-blue)]">
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
                        <div className="w-20 h-20 bg-gradient-to-br from-[var(--dashboard-blue)]/20 to-[var(--dashboard-blue)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Target className="text-[var(--dashboard-blue)]" size={32} />
                        </div>
                        <h3 className="text-xl font-semibold text-[var(--fourground-color)] mb-2">No Goals Set Yet</h3>
                        <p className="text-[var(--fourground-color)]/60 mb-6 max-w-md mx-auto">
                            Start your health journey by setting your first weekly goal. Track your progress and achieve your targets!
                        </p>
                        {/* <Link href='/dashboard/user/goals' className="px-6 py-3 bg-gradient-to-r from-[var(--dashboard-blue)] to-[var(--dashboard-blue)]/90 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                            Set Your First Goal
                        </Link> */}
                    </div>
                )}
            </div>

            {/* Custom CSS for range slider */}
            <style jsx>{`
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: var(--dashboard-blue);
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    border: 2px solid white;
                }

                .slider::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: var(--dashboard-blue);
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    border: 2px solid white;
                }
            `}</style>
        </div>
    );
};

export default UserGoal;