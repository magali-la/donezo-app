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
        <div className="flex flex-col gap-8 mb-6">
            <nav className="bg-plum w-fit max-w-full flex flex-row items-center border-3 border-shadow text-cream rounded-3xl gap-8 sm:gap-12 md:gap-16 px-6 py-5 self-center sticky top-2 z-500">
                <a href="#" className="text-2xl font-extrabold">donezo</a>
                <div className="text-lg font-semibold flex flex-row gap-4 md:gap-9">
                    <a href="#addATask">Add</a>
                    <a href="#yourTasks">All Tasks</a>
                </div>
            </nav>
            <section aria-label="hero section" className="h-fit flex flex-col md:flex-row justify-between items-center mx-[5vw] md:mx-[15vw]">
                <div className="flex flex-col gap-5 text-center">
                    <h1 className="text-6xl font-black text-shadow">Welcome to donezo!</h1>
                    <h3 className="text-xl text-shadow/70 font-semibold">Turn everyday tasks into missions worth completing!</h3>
                    <a href="#addATask" role="button" className="w-fit py-2 px-6 bg-sage/80 hover:bg-sage hover:text-shadow-2xs hover:text-shadow-shadow/40 rounded-2xl transition-all duration-500 cursor-pointer self-center">Start Mission</a>
                </div>
                <img src="/astro.svg" alt="illustration of an astronaut with a computer, notebook, and pen floating" className="w-[75%] md:w-[40%]"/>
            </section>
            <TaskForm 
                addTask={addTask}
            />
            <div className="self-center flex flex-col gap-2 justify-center items-center text-center">
                <h2 className="text-3xl font-bold scroll-m-28" id="yourTasks">Your Tasks</h2>
                <h3 className="text-xl text-shadow/70 font-semibold">Track your missions and move forward!</h3>
            </div>
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