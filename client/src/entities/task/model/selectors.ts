import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

const selectTaskState = (state: RootState) => state.tasks;

export const selectTasks = createSelector(
    [selectTaskState],
    (taskState) => taskState.tasks,
);

/**
 * Селектор для получения отфильтрованных задач
 * @returns Task[]
 */
export const selectFilteredTasks = createSelector(
    [selectTaskState],
    (taskState) => {
        const { tasks, filters } = taskState;
        if (!Array.isArray(tasks)) {
            console.error("tasks не является массивом:", tasks);
            return [];
        }
        return tasks.filter((task) => {
            return (
                (filters.category === "" || task.category === filters.category) &&
                (filters.status === "" || task.status === filters.status) &&
                (filters.priority === "" || task.priority === filters.priority) &&
                (filters.searchQuery === "" ||
                    task.title.toLowerCase().includes(filters.searchQuery.toLowerCase()))
            );
        });
    },
);

export const selectTaskById = (id: string) =>
    createSelector([selectTaskState], (taskState) =>
        Array.isArray(taskState.tasks)
            ? taskState.tasks.find((task) => task.id === id)
            : undefined,
    );

export const selectFilters = createSelector(
    [selectTaskState],
    (taskState) => taskState.filters,
);