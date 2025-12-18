import { useState } from "react"
import type { Task, TaskFormProps } from "../../types";

export default function TaskForm({addTask}: TaskFormProps) {
    // states for controlled inputs
    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>('');
    const [priority, setPriority] = useState<'high' | 'medium' | 'low'| null >(null);

    // // function to check every state is not length 0 before adding the task
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // use test before dashboard integration for validation
        if (title.length === 0 || desc.length === 0 || dueDate.length === 0 || priority === null ){
            alert('Attention! There are missing fields. Please fill out all fields.')
            console.log('Error: missing fields');
        } else {
            // create an object using the task type
            const newTask: Task = {
                id: Date.now().toString(),
                title: title,
                desc: desc,
                status: 'Pending',
                priority: priority,
                dueDate: dueDate
            }
            console.log("New task being added to dashboard list", newTask)

            // add the task via callback function in dashboard
            addTask(newTask);

            // reset all field state variables to their original
            setTitle('');
            setDesc('');
            setDueDate('');
            setPriority(null);
            console.log('Submitted task');
        }
    }

    return (
        <form className="flex flex-col gap-4 py-8 px-8 md:px-10 sm:w-[50vw] bg-banana rounded-2xl border-3 border-shadow" onSubmit={handleSubmit} aria-label="add a new task to your list">
            <h2 className="text-2xl font-semibold">Add a Task</h2>
            {/* title input */}
            <label htmlFor="taskTitle" className="font-medium">Task Title</label>
            <input type="text" id="taskTitle" value={title} onChange={(event) => setTitle(event.target.value)}/>
            {/* description input */}
            <label htmlFor="taskDesc" className="font-medium">Description</label>
            <textarea rows={6} id="taskDesc" value={desc} onChange={(event) => setDesc(event.target.value)}/>
            {/* due date input */}
            <label htmlFor="taskDue" className="font-medium">Due Date</label>
            <input type="date" id="taskDue" value={dueDate} onChange={(event) => setDueDate(event.target.value)}/>
            {/* priority radio group */}
            <label htmlFor="taskPriority" className="font-medium">Priority Level</label>
            <div id="taskPriority" className="flex flex-row gap-12" role="radiogroup">
                <label htmlFor="priorityHigh">
                    <input id="priorityHigh" type="radio" role="radio" aria-checked="false" value="high" checked={priority === 'high'} onChange={() =>setPriority('high')}/> High
                </label>
                <label htmlFor="priorityMedium">
                    <input id="priorityMedium" type="radio" role="radio" aria-checked="false" value="medium" checked={priority === 'medium'} onChange={() =>setPriority('medium')}/> Medium
                </label>
                <label htmlFor="priorityLow">
                    <input id="priorityLow" type="radio" role="radio" aria-checked="false" value="low" checked={priority === 'low'} onChange={() =>setPriority('low')}/> Low
                </label>
            </div>
            {/* add button */}
            <button type="submit" role="button" className="w-fit py-2 px-6 bg-plum/80 hover:bg-plum rounded-2xl transition-colors duration-500 cursor-pointer">Add Task</button>
        </form>
    )
}