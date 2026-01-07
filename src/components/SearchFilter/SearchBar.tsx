import { type SearchBarProps, type TaskFilters } from "../../types"

export default function SearchBar({ searchInput, searchFilter, onSearchChange, onFilterChange }: SearchBarProps) {

    return (
        <div className="flex flex-col md:flex-row justify-between items-start px-[5vw] md:px-[10vw] gap-3">
            <section aria-label="search section" className="flex flex-col gap-2 w-full md:w-[50vw]">
                <label htmlFor="searchBar" className="text-xl font-semibold">Search</label>
                <input className="border-shadow border-3 !bg-white" type="text" id="searchBar" placeholder="Search for tasks in orbit..." aria-label="search for tasks in orbit" value={searchInput} onChange={(event) => onSearchChange(event.target.value)} />
            </section>
            <section aria-label="filter tasks section" className="flex md:flex-col gap-4 md:gap-2 h-fit self-center">
                <label className="text-xl font-semibold">Filter</label>
                <select value={searchFilter} onChange={(event) => onFilterChange(event.target.value as TaskFilters)} className="cursor-pointer" aria-label="filter tasks by completion status">
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </section>
        </div>
    )
}