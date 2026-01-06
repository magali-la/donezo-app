import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm/TaskForm";
import TaskList from "../components/TaskList/TaskList";
import type { Task, TaskFilters, TaskStatus } from "../types";
import { getLocal, setLocal } from "../utils/localStorageUtils";
import SearchBar from "../components/SearchFilter/SearchBar";

export default function Dashboard() {
    // state for tasks list - use functional initializer to retrieve from local storage or empty array
    const [tasks, setTasks] = useState<Task[]>(() => {
        return getLocal('storedTasks') || [];
    });
    // state for search and filters - defined here to be sent down to taskList as a filtered list
    const [searchInput, setSearchInput] = useState<string>('');
    const [selectedFilter, setSelectedFilter] = useState<TaskFilters>('All');

    // state for filteredTasks list - used for display in the list
    const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

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
        // filter everything that isn't the clicked taskID / key of the list item clicked being passed up
        setTasks(tasks.filter(task => task.id !== taskId));
    }
    
    // update search input state from searchbar component
    function handleSearchInput(userInput: string): void {
        setSearchInput(userInput);
        console.log('User search input changed to: ', userInput)
    }

    // update filter state from searchbar component
    function handleFilter(newFilter: TaskFilters): void {
        setSelectedFilter(newFilter);
        console.log('Search filter changed to: ', newFilter);
    }

    // listen for changes to tasks, searchInput or selectedFilter to update filter and search logic and pass it down to the task list
    useEffect(() => {
        // create a new variable with the filtered tasks    
        const newFilteredTasks = tasks.filter(task => (selectedFilter === 'All' || task.status === selectedFilter) && (task.title.includes(searchInput) || task.desc.includes(searchInput)));
        // use setter function
        setFilteredTasks(newFilteredTasks);
    }, [searchInput, selectedFilter, tasks]);

    return (
        <div>
            <TaskForm 
                addTask={addTask}
            />
            <h2>Search and Filter Tasks</h2>
            <SearchBar
                searchInput={searchInput}
                searchFilter={selectedFilter}
                onSearchChange={handleSearchInput}
                onFilterChange={handleFilter}
            />
            <TaskList
                tasks={filteredTasks}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
            />
        </div>
    )
}