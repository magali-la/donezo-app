import { useState } from "react";
import { type TaskStatus, type TaskItemProps } from "../../types";

export default function TaskItem({task: {id, title, desc, status, priority, dueDate }, onStatusChange, onDelete}: TaskItemProps){
    // create status state
    const [selectedStatus, setSelectedStatus] = useState<TaskStatus>(status);

    // handler function to update state and run callback function from dashboard
    function handleStatusChange(event: React.ChangeEvent<HTMLSelectElement>) {
        // set variable with the value, assert union type for the values
        const newStatus = event.target.value as TaskStatus;
        console.log('User selected new status:', newStatus);
        // update state
        setSelectedStatus(newStatus);

        // send arguments to callback function in dashboard
        onStatusChange(id, newStatus)
    }

    // create custom test colors based on priority status
    const priorityStyles = {
        high: 'bg-tomato drop-shadow-cream drop-shadow-2xl',
        medium: 'bg-orange-400 drop-shadow-2xl shadow-cream',
        low: 'bg-sage'
    }

    // define empty variable to use in class as a string type
    let priorityClass: string;

    // switch statement to determine what the styles are based off prop
    switch (priority){
        case "high":
            priorityClass = priorityStyles.high;
            break;
        case "medium":
            priorityClass = priorityStyles.medium;
            break;
        case "low":
            priorityClass = priorityStyles.low;
            break;
    };

    return (
        <div className="flex flex-col gap-3 px-5 py-4 border-2 border-shadow rounded-2xl bg-white" aria-label="individual task item">
            {/* title and buttons section */}
            <section className="flex flex-col sm:flex-row justify-between items-center">
                <h3 className="text-lg font-semibold">{title}</h3>
                {/* status change buttons and delete button */}
                <section className="flex flex-row gap-5" aria-label="change status or delete this task">
                    {/* status change dropdown */}
                    <select value={selectedStatus} onChange={handleStatusChange}>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    {/* delete link/button */}
                    <button className="text-tomato font-semibold cursor-pointer hover:font-bold" onClick={() => onDelete(id)} role="button" aria-label="delete this task">Delete</button>
                </section>
            </section>
            {/* details section */}
            <section className="flex flex-col gap-2" aria-label="review task details">
                <p>{desc}</p>
            </section>
            {/* priority and due date section */}
            <section className="flex flex-col sm:flex-row gap-2 sm:gap-6" aria-label="review priority status and due date">
                <p className={`font-medium text-cream ${priorityClass}`}>Priority: {priority}</p>
                <p>Due Date: {dueDate}</p>
            </section>

        </div>
    )
}