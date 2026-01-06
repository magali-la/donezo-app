import type { Task, TaskListProps } from "../../types"
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onStatusChange, onDelete}: TaskListProps) {

    return (
        <div className="flex flex-col gap-5 mx-[20vw]">
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
                <p className="text-xl font-semibold text-shadow/70 italic">No tasks yet. Let's get motivated!</p>
            )}
        </div>
    )
}