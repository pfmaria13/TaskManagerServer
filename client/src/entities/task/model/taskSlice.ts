import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Task, TaskState } from "./types";

const API_URL = "http://localhost:5000/tasks";

/**
 * Асинхронный thunk для получения всех задач с сервера
 */
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async ({ title, date }: { title?: string; date?: string }) => {
    const query = new URLSearchParams();
    if (title) query.set("title", title);
    if (date) query.set("date", date);
    const response = await fetch(`${API_URL}?${query.toString()}`);
    if (!response.ok) {
      throw new Error("Ошибка при получении задач");
    }
    return (await response.json()) as Task[];
  }
);

/**
 * Асинхронный thunk для получения задачи по ID
 */
export const fetchTaskById = createAsyncThunk(
  "tasks/fetchTaskById",
  async (id: string) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Задача не найдена");
    }
    return (await response.json()) as Task;
  }
);

/**
 * Асинхронный thunk для создания задачи
 */
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData: Omit<Task, "id" | "createdAt">) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error("Ошибка при создании задачи");
    }
    return (await response.json()) as Task;
  }
);

/**
 * Асинхронный thunk для обновления задачи
 */
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task: Task) => {
    const response = await fetch(`${API_URL}/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error("Ошибка при обновлении задачи");
    }
    return (await response.json()) as Task;
  }
);

/**
 * Асинхронный thunk для удаления задачи
 */
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string) => {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error("Ошибка при удалении задачи");
    }
    return id;
  }
);

const initialState: TaskState = {
  tasks: [],
  filters: {
    category: "",
    status: "",
    priority: "",
    searchQuery: "",
  },
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<Partial<TaskState["filters"]>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.unshift(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
          state.tasks.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      });
  },
});

export const { setFilter } = taskSlice.actions;
export default taskSlice.reducer;