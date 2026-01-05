import { type SearchBarProps, type TaskFilters } from "../../types"

export default function SearchBar({ searchInput, searchFilter, onSearchChange, onFilterChange }: SearchBarProps) {

    return (
        <div className="flex flex-col md:flex-row justify-between items-start px-[5vw] md:px-[10vw] gap-3">
            <section aria-label="search for tasks" className="flex flex-col gap-2 w-full md:w-[50vw]">
                <label htmlFor="searchBar">Search</label>
                <input className="border-shadow border-3" type="text" id="searchBar" placeholder="Search for Tasks" value={searchInput} onChange={(event) => onSearchChange(event.target.value)} />
            </section>
            <section aria-label="filter tasks by status" className="flex flex-col gap-2 h-fit self-center">
                <label>Filter</label>
                <select value={searchFilter} onChange={(event) => onFilterChange(event.target.value as TaskFilters)}>
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </section>
        </div>
    )
}