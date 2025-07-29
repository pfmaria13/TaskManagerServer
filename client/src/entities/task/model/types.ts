/**
 * Интерфейс представляющий задачу
 * @interface Task
 * @property {string} id - Уникальный идентификатор задачи
 * @property {string} title - Название задачи
 * @property {string} description - Описание задачи
 * @property {"Bug" | "Feature" | "Documentation" | "Refactor" | "Test"} category - Категория задачи
 * @property {"To Do" | "In Progress" | "Done"} status - Статус задачи
 * @property {"Low" | "Medium" | "High"} priority - Приоритет задачи
 * @property {string} createdAt - Дата создания задачи в формате ISO
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

/**
 * Интерфейс состояния слайса задач
 * @interface TaskState
 * @property {Task[]} tasks - Массив задач
 * @property {Object} filters - Объект фильтров с полями category, status, priority, searchQuery
 */
export interface TaskState {
  tasks: Task[];
  filters: {
    category: string;
    status: string;
    priority: string;
    searchQuery: string;
  };
}
