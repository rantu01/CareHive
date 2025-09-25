"use client";

import { Goal, X } from "lucide-react";
import { use, } from "react";
import { DashBoardDataContext } from "./UserDashBoardDataContext/DashboardDataContext";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import Swal from "sweetalert2";
import { AuthContext } from "@/app/context/authContext";



const UserGoal = () => {
    const { goalData, isLoading, setGoalData } = use(DashBoardDataContext);


    const { user } = use(AuthContext)
    const userId = user?.uid


    const queryClient = useQueryClient();








    const goalList = goalData[0]?.goalData



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

    if (isLoading) return <p>Loading......</p>


    return (
        <div className="border-1  border-[var(--dashboard-border)] p-4 rounded">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <Goal color="var(--dashboard-blue)" />
                    <h1 className="text-xl font-semibold text-[var(--fourground-color)]">Weekly Health Goal</h1>
                </div>
            </div>

            <div className="mt-5">
                <div className="w-full space-y-4">
                    {goalList?.map((goal, idx) => (
                        <div key={goal?.id} className="space-y-2">
                            {/* Goal Title and Numbers */}
                            <div className="flex justify-between">
                                <p className="text-[var(--fourground-color)]">{goal?.title}</p>
                                <div>
                                    <span>{goal?.completed}</span>/<span>{goal?.goal}</span>
                                </div>
                            </div>

                            <input
                                type="range"
                                min="0"
                                max={goal?.goal}
                                defaultValue={goal?.completed}
                                onMouseLeave={(e) => trackGoalComplete(e, goal?.goal, goal?.id)}
                                className="w-full accent-[var(--dashboard-blue)] cursor-default"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}

        </div>
    );
};

export default UserGoal;
