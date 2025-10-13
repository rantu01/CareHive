"use client"

import axios from "axios";
import { BookCheck, Plus, Check, Trash2, Target, Clock, CheckCircle } from "lucide-react";
import { nanoid } from "nanoid";
import { use } from "react";
import { DashBoardDataContext } from "./UserDashBoardDataContext/DashboardDataContext";
import { AuthContext } from "@/app/context/authContext";

const ToDoTask = () => {
    const { user } = use(AuthContext);
    const userId = user?.uid;
    const { userToDo, setUserToDo } = use(DashBoardDataContext);

    const addToDoUrl = `/api/get-todo-task/${userId}`;
    const patchUrl = `/api/get-todo-task/${userId}`;

    const fetchUserToDo = async () => {
        const res = await axios.get(addToDoUrl);
        setUserToDo(res?.data[0]?.todo);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const todo = e.target.todo.value;
            if(!todo) return;

            const newTodoData = { taskId: nanoid(7), title: todo, completed: false };
            await axios.post(addToDoUrl, newTodoData);
            const res = await axios.get(addToDoUrl);
            setUserToDo(res?.data[0]?.todo);
            e.target.todo.value="";
        } catch (error) {
            console.log(error);
        }
    }

    const handleMarkAsComplete = async (taskId) => {
        try {
            await axios.patch(patchUrl, { taskId });
            const res = await axios.get(addToDoUrl);
            setUserToDo(res?.data[0]?.todo);
        } catch (error) {
            console.error("Failed to mark as completed", error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const deleteUrl = `/api/get-todo-task/${userId}`;
            await axios.delete(deleteUrl, { data: { taskId } });
            fetchUserToDo();
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    };

    const completedTasks = userToDo?.filter(task => task.completed).length || 0;
    const totalTasks = userToDo?.length || 0;
    const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <div className="bg-[var(--card-bg)] border-2 border-[var(--dashboard-border)] p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm h-fit relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-light-green)]/15 rounded-full blur-2xl -translate-y-12 translate-x-12"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-[var(--color-light-green)]/10 rounded-full blur-xl translate-y-10 -translate-x-10"></div>

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-[var(--color-light-green)] rounded-2xl shadow-lg">
                            <BookCheck className="text-white" size={22} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[var(--color-light-green)]">Daily Goals</h2>
                            <p className="text-[var(--color-light-green)]/60 text-sm">Track your daily tasks</p>
                        </div>
                    </div>

                    {/* Progress Circle */}
                    <div className="relative w-12 h-12">
                        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                            <path
                                className="text-[var(--dashboard-border)]"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                                className="text-[var(--color-light-green)]"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeDasharray={`${progressPercentage}, 100`}
                                strokeLinecap="round"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-bold text-[var(--color-light-green)]">{progressPercentage}%</span>
                        </div>
                    </div>
                </div>

                {/* Progress Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3 bg-[var(--dashboard-bg)] rounded-xl border border-[var(--dashboard-border)]/50">
                        <div className="flex items-center gap-2">
                            <Target className="text-[var(--color-light-green)]" size={16} />
                            <span className="text-sm text-[var(--fourground-color)]/70">Total</span>
                        </div>
                        <p className="text-xl font-bold text-[var(--color-light-green)]">{totalTasks}</p>
                    </div>
                    <div className="p-3 bg-[var(--dashboard-bg)] rounded-xl border border-[var(--dashboard-border)]/50">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="text-[var(--color-light-green)]" size={16} />
                            <span className="text-sm text-[var(--fourground-color)]/70">Done</span>
                        </div>
                        <p className="text-xl font-bold text-[var(--color-light-green)]">{completedTasks}</p>
                    </div>
                </div>

                {/* Add Task Form */}
                <form onSubmit={handleSubmit} className="mb-6 space-y-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Add a new health goal..."
                            name="todo"
                            className="w-full px-4 py-3 pr-12 text-[var(--fourground-color)] bg-[var(--dashboard-bg)] border-2 border-[var(--dashboard-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-light-green)]/30 focus:border-[var(--color-light-green)] transition-all duration-300 placeholder-[var(--fourground-color)]/50"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <Plus className="text-[var(--color-light-green)]" size={20} />
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className="group w-full px-4 py-3 rounded-xl text-white font-semibold bg-[var(--color-light-green)] hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                        <span>Add Task</span>
                    </button>
                </form>

                {/* Tasks List */}
                <div className="h-[15rem] max-h-[15rem] overflow-auto pr-2 custom-scrollbar">
                    {userToDo?.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full py-8">
                            <div className="w-16 h-16 bg-[var(--color-light-green)]/20 rounded-full flex items-center justify-center mb-4">
                                <Target className="text-[var(--color-light-green)]" size={24} />
                            </div>
                            <p className="text-center text-[var(--color-light-green)]/60 font-medium">
                                No tasks added yet
                            </p>
                            <p className="text-center text-[var(--color-light-green)]/40 text-sm mt-1">
                                Start by adding your first health goal above
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {userToDo?.map((todo) => (
                                <div
                                    key={todo?.taskId}
                                    className={`group p-4 rounded-2xl border-2 transition-all duration-300 hover:shadow-md ${
                                        todo?.completed 
                                            ? 'bg-[var(--color-light-green)]/20 border-[var(--color-light-green)]/50 shadow-[var(--color-light-green)]/30' 
                                            : 'bg-[var(--dashboard-bg)] border-[var(--dashboard-border)] hover:border-[var(--color-light-green)]/30'
                                    }`}
                                >
                                    <div className="flex justify-between items-start gap-3">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start gap-3">
                                                <div className={`p-2 rounded-xl flex-shrink-0 ${
                                                    todo?.completed 
                                                        ? 'bg-[var(--color-light-green)] border border-[var(--color-light-green)]' 
                                                        : 'bg-[var(--color-light-green)]/20 border border-[var(--color-light-green)]/50'
                                                }`}>
                                                    {todo?.completed ? (
                                                        <CheckCircle className="text-[var(--color-light-green)]" size={18} />
                                                    ) : (
                                                        <Clock className="text-[var(--color-light-green)]" size={18} />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className={`font-semibold break-words ${
                                                        todo?.completed 
                                                            ? 'text-[var(--color-light-green)] line-through' 
                                                            : 'text-[var(--fourground-color)]'
                                                    }`}>
                                                        {todo.title}
                                                    </p>
                                                    <p className={`text-sm font-medium ${
                                                        todo?.completed 
                                                            ? 'text-[var(--color-light-green)]' 
                                                            : 'text-[var(--fourground-color)]/60'
                                                    }`}>
                                                        {todo?.completed ? "✅ Completed" : "🕒 Pending"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => {
                                                if (todo.completed) {
                                                    handleDeleteTask(todo.taskId);
                                                } else {
                                                    handleMarkAsComplete(todo.taskId);
                                                }
                                            }}
                                            className={`group/btn flex items-center gap-2 px-3 py-2 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                                                todo.completed 
                                                    ? 'bg-red-100 text-red-600 border border-red-400' 
                                                    : 'bg-[var(--color-light-green)] text-white hover:shadow-lg'
                                            }`}
                                        >
                                            {todo.completed ? (
                                                <>
                                                    <Trash2 size={14} className="group-hover/btn:scale-110 transition-transform duration-300" />
                                                    <span>Delete</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Check size={14} className="group-hover/btn:scale-110 transition-transform duration-300" />
                                                    <span>Complete</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Custom Scrollbar Styles */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: var(--dashboard-border); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--color-light-green); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--color-light-green); }
            `}</style>
        </div>
    );
};

export default ToDoTask;
