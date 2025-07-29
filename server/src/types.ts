/**
 * Интерфейс задачи для серверной части
 * @interface Task
 */
export interface Task {
    id: string;
    title: string;
    description: string;
    category: "Bug" | "Feature" | "Documentation" | "Refactor" | "Test";
    status: "To Do" | "In Progress" | "Done";
    priority: "Low" | "Medium" | "High";
    createdAt: string;
}