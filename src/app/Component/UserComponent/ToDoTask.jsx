"use client"

import { BookCheck } from "lucide-react";
import { ClientPageRoot } from "next/dist/client/components/client-page";
import { useState } from "react";


const ToDoTask = () => {

    const [todos, setToDos] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        setToDos([...todos, e.target.todo.value])
        e.target.todo.value = ""
    }
    console.log(todos)
    return (
        <div className="border-1 border-gray-200 p-4 rounded">
            <div className="flex items-center mb-4 gap-2">
                <BookCheck />
                <p className="text-xl">Track your self</p>
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

            <div className="mt-5 min-h-[12.50rem]">
                <div className="flex flex-col gap-4">
                    {
                        todos.length === 0 ? (<p className="text-center">It's like you do not have add any task</p>)
                            :
                            (
                                todos.map((todo) => (
                                    <div key={todo} className="flex justify-between items-center">
                                        <p className="text-xl">{todo}</p>
                                        <button className="bg-[var(--dashboard-blue)] p-2 cursor-pointer rounded "> Mark As Read</button>
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