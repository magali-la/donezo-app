import type { Task } from "../types";

// set items in local storage
export function setLocal(key: string, value: Task[]) {
// stringify the array of objects to be interpreted
    return localStorage.setItem(key, JSON.stringify(value));
}

export function getLocal(key: string): Task[] | null {
    const storedTasks = localStorage.getItem(key);
    // return either the tasks if they exist or an empty array
    return storedTasks ? JSON.parse(storedTasks) : null;
}