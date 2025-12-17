// define type for task status
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

// create interface for task info
export interface Task {
    id: string;
    title: string;
    desc: string;
    status: TaskStatus;
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
}

// interface for list, an array of Tasks and callback functions
export interface TaskListProps {
    tasks: Task[];
    onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
    onDelete: (taskId: string) => void;
}
