import React, { useState } from "react"
import { type TaskFilters } from "../../types"

export default function SearchBar() {
    const [searchInput, setSearchInput] = useState<string>('');
    const [selectedFilter, setSelectedFilter] = useState<TaskFilters>('All');

    // handler function for filter selection
    function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
        // assign value to filter selected
        const newFilter = event.target.value as TaskFilters
        // setter function for controlled component
        setSelectedFilter(newFilter);
    }

    return (
        <div className="flex flex-col md:flex-row justify-between items-start px-[5vw] md:px-[10vw] gap-3">
            <section aria-label="search for tasks" className="flex flex-col gap-2 w-full md:w-[50vw]">
                <label htmlFor="searchBar">Search</label>
                <input className="border-shadow border-3" type="text" id="searchBar" placeholder="Search for Tasks" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
            </section>
            <section aria-label="filter tasks by status" className="flex flex-col gap-2 h-fit self-center">
                <label>Filter </label>
                <select value={selectedFilter} onChange={handleFilterChange}>
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </section>
        </div>
    )
}