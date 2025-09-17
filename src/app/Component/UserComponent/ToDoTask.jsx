"use client"

import axios from "axios";
import { BookCheck } from "lucide-react";
import { useParams } from "next/navigation";


const ToDoTask = ({ userToDo, setUserToDo }) => {

    const { userId } = useParams()



    const handleSubmit = async (e) => {
        e.preventDefault()

        const addToDoUrl = `/api/get-todo-task/${userId}`

        try {
            const todo = e.target.todo.value;

            const newTodoData = {
                taskId: "122",

                title: todo,
                completed: false,
            };

            await axios.post(addToDoUrl, newTodoData);

            const toDoListResponse = await axios.get(addToDoUrl )
            setUserToDo(toDoListResponse?.data[0]?.todo)

        } catch (error) {
            console.log(error);
        }
    }


    const handleComplete = (index) => {
        console.log("indexIs", index)
        const completedTaskIndex = index
        const newArray = [
            ...todos.slice(0, completedTaskIndex),
            ...todos.slice(completedTaskIndex + 1)
        ];
        setToDos(newArray)
    }

    return (
        <div className="border-1 border-gray-200 p-4 rounded">
            <div className="flex items-center mb-4 gap-2">
                <BookCheck />
                <p className="text-xl">Set your daily goal</p>
            </div>
            <form onSubmit={handleSubmit} className="w-full">
                <input
                    type="text"
                    placeholder="Add a new task"
                    name="todo"
                    className="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
                />
                <button type="submit" className="px-4 py-2 rounded text-white font-medium bg-[var(--dashboard-blue)] cursor-pointer">Add Task</button>
            </form>

            <div className="mt-5 h-[12.50rem] max-h-[12.50rem] overflow-auto">
                <div className="flex flex-col gap-4">
                    {
                        userToDo?.length === 0 ? (
                            <p className="text-center">It's like you do not have add any task</p>
                        ) : (
                            userToDo?.map((todo) => (
                                <div
                                    key={todo.taskId}
                                    className="flex justify-between items-center border border-gray-400 p-2 rounded"
                                >
                                    <div>
                                        <p className="text-xl">{todo.title}</p>
                                        <p className="text-sm text-gray-500">
                                            {todo.completed ? "✅ Completed" : "🕒 Pending"}
                                        </p>
                                    </div>
                                    <button
                                        className="bg-[var(--dashboard-blue)] p-2 cursor-pointer rounded text-sm"
                                    >
                                        Complete
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