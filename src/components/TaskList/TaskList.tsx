import type { Task, TaskListProps } from "../../types"
import TaskItem from "./TaskItem";

export default function TaskList({ onStatusChange, onDelete}: TaskListProps) {
    // define dummy data for test
    const dummyTasks: Task[] = [
        {
            id: '1',
            title: 'Test task 1',
            desc: "i'm test 1",
            status: 'Pending',
            priority: 'high',
            dueDate: '2025-12-16',
        },
        {
            id: '2',
            title: 'Test task 2',
            desc: "i'm test 2",
            status: 'Completed',
            priority: 'low',
            dueDate: '2025-12-17'
        },
        {
            id: '3',
            title: 'Test task 3',
            desc: "i'm test 3",
            status: 'Completed',
            priority: 'medium',
            dueDate: '2025-12-17'
        }
    ];

    return (
        <div className="flex flex-col gap-5 mx-[20vw]">
            {dummyTasks.length !==0 ? (
                dummyTasks.map((task) => (
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
                <p>No tasks yet. Let's get motivated!</p>
            )}
        </div>
    )
}