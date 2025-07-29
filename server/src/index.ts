import express, { Request, Response } from "express";
import cors from "cors";
import { Task } from "./types";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

/**
 * Хранилище задач в памяти
 * @remarks
 */
let tasks: Task[] = [];

/**
 * Получение всех задач с возможностью фильтрации по названию и/или дате
 * @route GET /tasks
 * @param req Запрос с опциональными query-параметрами title и date
 * @param res Ответ с массивом задач
 */
app.get("/tasks", (req: Request, res: Response) => {
    const { title, date } = req.query;
    let filteredTasks = tasks;

    if (typeof title === "string" && title) {
        filteredTasks = filteredTasks.filter((task) =>
          task.title.toLowerCase().includes(title.toLowerCase())
        );
    }

    if (typeof date === "string" && date) {
        filteredTasks = filteredTasks.filter(
          (task) => task.createdAt.split("T")[0] === date
        );
    }

    res.json(filteredTasks);
});

/**
 * Получение задачи по ID
 * @route GET /tasks/:id
 * @param req Запрос с параметром id
 * @param res Ответ с задачей или ошибкой 404
 */
app.get("/tasks/:id", (req: Request, res: Response) => {
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) {
        return res.status(404).json({ error: "Задача не найдена" });
    }
    res.json(task);
});

/**
 * Создание новой задачи
 * @route POST /tasks
 * @param req Запрос с данными задачи (без id и createdAt)
 * @param res Ответ с созданной задачей или ошибкой 400
 */
app.post("/tasks", (req: Request, res: Response) => {
    const taskData = req.body;
    if (!isValidTask(taskData)) {
        return res.status(400).json({ error: "Некорректные данные задачи" });
    }

    const newTask: Task = {
        ...taskData,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
    };
    tasks.unshift(newTask);
    res.status(201).json(newTask);
});

/**
 * Обновление задачи по ID
 * @route PATCH /tasks/:id
 * @param req Запрос с данными для обновления
 * @param res Ответ с обновленной задачей или ошибкой 404/400
 */
app.patch("/tasks/:id", (req: Request, res: Response) => {
    const taskData = req.body;
    if (!isValidTask(taskData)) {
        return res.status(400).json({ error: "Некорректные данные задачи" });
    }

    const index = tasks.findIndex((t) => t.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: "Задача не найдена" });
    }

    tasks[index] = { ...taskData, id: req.params.id, createdAt: tasks[index].createdAt };
    res.json(tasks[index]);
});

/**
 * Удаление задачи по ID
 * @route DELETE /tasks/:id
 * @param req Запрос с параметром id
 * @param res Ответ с подтверждением удаления или ошибкой 404
 */
app.delete("/tasks/:id", (req: Request, res: Response) => {
    const index = tasks.findIndex((t) => t.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: "Задача не найдена" });
    }

    tasks.splice(index, 1);
    res.status(204).send();
});

/**
 * Проверяет валидность данных задачи
 * @param task Объект для проверки
 * @returns {boolean} Возвращает true, если данные соответствуют интерфейсу Task
 */
function isValidTask(task: unknown): task is Omit<Task, "id" | "createdAt"> {
    if (typeof task !== "object" || task === null) return false;
    const t = task as Record<string, unknown>;
    return (
      typeof t.title === "string" &&
      typeof t.description === "string" &&
      ["Bug", "Feature", "Documentation", "Refactor", "Test"].includes(t.category as string) &&
      ["To Do", "In Progress", "Done"].includes(t.status as string) &&
      ["Low", "Medium", "High"].includes(t.priority as string)
    );
}

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});