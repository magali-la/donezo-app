import TaskForm from "../components/TaskForm/TaskForm";
import TaskList from "../components/TaskList/TaskList";

export default function Dashboard() {
    return (
        <div>
            <TaskForm />
            <TaskList/>
        </div>
    )
}