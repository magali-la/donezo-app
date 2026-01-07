import type { Task, TaskListProps } from "../../types"
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onStatusChange, onDelete}: TaskListProps) {

    return (
        <div className="flex flex-col gap-5 px-[5vw] md:px-[10vw]">
            {tasks.length !==0 ? (
                tasks.map((task: Task) => (
                    // inject each task into the TaskItem component
                    <TaskItem
                        // add key for React tracking with task.id
                        key={task.id}
                        task={task}
                        onStatusChange={onStatusChange}
                        onDelete={onDelete}
                    />
                ))
            ) : (
                <div className="space-y-3 flex flex-col items-center">
                    <p className="text-xl font-semibold text-shadow/70 italic">No active missions found. Let's get motivated!</p>
                    <img src="/404.svg" alt="illustration of a purple cat sleeping on a laptop with 404 on the screen" className="w-[75%] md:w-[40%]"/>
                </div>
            )}
        </div>
    )
}