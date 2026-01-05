import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm/TaskForm";
import TaskList from "../components/TaskList/TaskList";
import type { Task, TaskStatus } from "../types";
import { getLocal, setLocal } from "../utils/localStorageUtils";
import SearchBar from "../components/SearchFilter/SearchBar";

export default function Dashboard() {
    // state for tasks list - use functional initializer to retrieve from local storage or empty array
    const [tasks, setTasks] = useState<Task[]>(() => {
        return getLocal('storedTasks') || [];
    });

    // set local storage by listening for changes in [tasks] state variable
    useEffect(() => {
        // stringify the array of objects to be interpreted
        setLocal('storedTasks', tasks);
    }, [tasks]);

    // callback for adding task
    function addTask(newTask: Task) {
        // functional state update
        setTasks(prevTasks => [...prevTasks, newTask])
    }

    // callbacks for status change and delete
    function handleStatusChange(taskId: string, newStatus: TaskStatus) {
        console.log(`Changing status for ${taskId} to ${newStatus}`);

        // use map to update state array - match the array item with the taskID that was sent up from the task item component
        setTasks(prevTasks => prevTasks.map((task) => {
            if (task.id === taskId){
                console.log('found the matching task in the list', task.id);
                return {...task, status: newStatus}
            }
            // otherwise do nothing to the other tasks
            return task;
        }));        
    }

    function handleDelete(taskId: string) {
        console.log(`Deleting task: ${taskId}`);
    }

    return (
        <div>
            <TaskForm 
                addTask={addTask}
            />
            <h2>Search and Filter Tasks</h2>
            <SearchBar/>
            <TaskList
                tasks={tasks}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
            />
        </div>
    )
}