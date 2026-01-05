// define type for task status
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';
export type TaskFilters = 'All' | 'Pending' | 'In Progress' | 'Completed';

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

// interface for props for task item - pass the same callbacks to task item which is nested in task list
export interface TaskItemProps {
    task: Task;
    onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
    onDelete: (taskId: string) => void;
}

// interface for props for task form - pass callbacks to update tasks array
export interface TaskFormProps {
    addTask: (task: Task) => void;
}

// interface for props for searchfilter component - pass callbacks from dashboard to control the tasks filtered in the list component
export interface SearchBarProps {
    searchInput: string;
    searchFilter: TaskFilters;
    onSearchChange: (userInput: string) => void;
    onFilterChange: (newFilter: TaskFilters) => void;
}