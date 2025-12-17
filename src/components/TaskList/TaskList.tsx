import type { Task } from "../../types"

export default function TaskList() {
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
        }
    ];

    return (
        <div className="flex flex-col p-4 gap-5">
            {dummyTasks.length !==0 ? (
                dummyTasks.map((task) => (
                    <div key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.desc}</p>
                        <p>{task.status}</p>
                        <p>{task.priority}</p>
                        <p>{task.dueDate}</p>
                    </div>
                ))
            ) : (
                <p>no tasks yet</p>
            )}
        </div>
    )
}