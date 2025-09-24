"use client"

import axios from "axios";
import { BookCheck } from "lucide-react";
import { nanoid } from "nanoid";
import { useParams } from "next/navigation";
import { use } from "react";
import { DashBoardDataContext } from "./UserDashBoardDataContext/DashboardDataContext";
import { AuthContext } from "@/app/context/authContext";


const ToDoTask = () => {

    const {user}=use(AuthContext)
    const  userId  = user?.uid

    const {userToDo,setUserToDo}=use(DashBoardDataContext)

    const addToDoUrl = `/api/get-todo-task/${userId}`
    const patchUrl = `/api/get-todo-task/${userId}`;


    const fetchUserToDo = async () => {
        const toDoListResponse = await axios.get(addToDoUrl)
        setUserToDo(toDoListResponse?.data[0]?.todo)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()



        try {
            const todo = e.target.todo.value;

            if(!todo) return

            const newTodoData = {
                taskId: nanoid(7),

                title: todo,
                completed: false,
            };

            await axios.post(addToDoUrl, newTodoData);

            const toDoListResponse = await axios.get(addToDoUrl)
            setUserToDo(toDoListResponse?.data[0]?.todo)

            e.target.todo.value=""

        } catch (error) {
            console.log(error);
        }
    }


    const handleMarkAsComplete = async (taskId) => {
        try {

            await axios.patch(patchUrl, { taskId });

            const toDoListResponse = await axios.get(addToDoUrl)
            setUserToDo(toDoListResponse?.data[0]?.todo)

        } catch (error) {
            console.error("Failed to mark as completed", error);
        }
    };


    const handleDeleteTask = async (taskId) => {
        try {
            const deleteUrl = `/api/get-todo-task/${userId}`;

            await axios.delete(deleteUrl, {
                data: { taskId }, // DELETE in axios needs `data` for body
            });

            fetchUserToDo()

        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    };




    return (
        <div className="border-1 border-[var(--dashboard-border)] p-4 rounded shadow-lg">
            <div className="flex items-center mb-4 gap-2">
                <BookCheck color="var(--dashboard-blue)"/>
                <p className="text-xl text-[var(--fourground-color)] font-semibold">Set your daily goal</p>
            </div>
            <form onSubmit={handleSubmit} className="w-full">
                <input
                    type="text"
                    placeholder="Add a new task"
                    name="todo"
                    className="w-full px-4 py-2 text-[var(--fourground-color)] border border-[var(--dashboard-border)] rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
                />
                <button type="submit" className="px-4 py-2 rounded text-[var(--fourground-color)] font-medium bg-[var(--dashboard-blue)] cursor-pointer">Add Task</button>
            </form>

            <div className="mt-5 h-[12.50rem] max-h-[12.50rem] overflow-auto">
                <div className="flex flex-col gap-4">
                    {
                        userToDo?.length === 0 ? (
                            <p className="text-center">It's like you do not have add any task</p>
                        ) : (
                            userToDo?.map((todo) => (
                                <div
                                    key={todo?.taskId}
                                    className="flex justify-between items-center border border-gray-400 p-2 rounded"
                                >
                                    <div>
                                        <p className="text-xl text-[var(--fourground-color)]">{todo.title}</p>
                                        <p className="text-sm text-[var(--fourground-color)]">
                                            {todo?.completed ? "✅ Completed" : "🕒 Pending"}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (todo.completed) {
                                                handleDeleteTask(todo.taskId);
                                            } else {
                                                handleMarkAsComplete(todo.taskId);
                                            }
                                        }}
                                        className="bg-[var(--dashboard-blue)] p-2 cursor-pointer rounded text-sm text-[var(--fourground-color)]"
                                    >
                                        {todo.completed ? "Delete" : "Complete"}
                                    </button>
                                </div>
                            ))
                        )
                    }

                </div>


            </div>

        </div>
    );
};

export default ToDoTask;