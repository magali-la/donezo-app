import { useState } from "react";
import TaskForm from "../components/TaskForm/TaskForm";
import TaskList from "../components/TaskList/TaskList";
import type { Task } from "../types";

export default function Dashboard() {
    // state for tasks list
    const [tasks, setTasks] = useState<Task[]>([]);

    // callback for adding task
    function addTask(newTask: Task){
        // functional state update
        setTasks(prevTasks => [...prevTasks, newTask])
    }

    return (
        <div>
            <TaskForm 
                addTask={addTask}
            />
            <TaskList/>
        </div>
    )
}