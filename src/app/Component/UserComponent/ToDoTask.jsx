"use client"

import { useState } from "react";


const ToDoTask = () => {

    const [todos,setToDos]=useState([])


    return (
        <div>
            {
                todos.length===0 && <p>Add your activities</p>
            }
        </div>
    );
};

export default ToDoTask;