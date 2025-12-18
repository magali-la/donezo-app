import { useState } from "react";
import TaskForm from "../components/TaskForm/TaskForm";
import TaskList from "../components/TaskList/TaskList";
import type { Task, TaskStatus } from "../types";

export default function Dashboard() {
    // state for tasks list
    const [tasks, setTasks] = useState<Task[]>([]);

    // callback for adding task
    function addTask(newTask: Task) {
        // functional state update
        setTasks(prevTasks => [...prevTasks, newTask])
    }

    // callbacks for status change and delete
    function handleStatusChange(taskId: string, newStatus: TaskStatus) {
        console.log(`Changing status for ${taskId} to ${newStatus}`);
    }

    function handleDelete(taskId: string) {
        console.log(`Deleting task: ${taskId}`);
    }

    return (
        <div>
            <TaskForm 
                addTask={addTask}
            />
            <TaskList
                tasks={tasks}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
            />
        </div>
    )
}