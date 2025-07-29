import { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { createTask, updateTask } from "@entities/task/model/taskSlice";
import { Task } from "@entities/task/model/types";
import { ChangeEvent } from "react";
import { useAppDispatch } from "@/app/store";

/**
 * Интерфейс пропсов для компонента формы создания или редактирования задачи
 * @interface TaskFormProps
 * @property {Task} [task] - Задача для редактирования (опционально)
 * @property {boolean} isNewTask - Флаг, указывающий, создается ли новая задача
 *
 */
interface TaskFormProps {
  task?: Task;
  isNewTask: boolean;
}

/**
 * Компонент формы создания/редактирования задачи
 * @param props Пропсы компонента
 * @returns JSX.Element
 */
export const TaskForm = ({ task, isNewTask }: TaskFormProps) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<Partial<Task>>({
    title: task?.title || "",
    description: task?.description || "",
    category: task?.category || "Bug",
    status: task?.status || "To Do",
    priority: task?.priority || "Low",
  });
  const [errors, setErrors] = useState<{ title?: string }>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "title" && value) {
      setErrors((prev) => ({ ...prev, title: undefined }));
    }
  };

  /**
   * Проверяет валидность данных формы
   * @returns {boolean} Возвращает true, если данные валидны
   */
  const validate = () => {
    const newErrors: { title?: string } = {};
    if (!formData.title) {
      newErrors.title = "Заголовок обязателен";
    } else if (formData.title.length < 3) {
      newErrors.title = "Заголовок должен содержать минимум 3 символа";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Сохраняет задачу через Redux
   */
  const handleSave = () => {
    if (!validate()) return;
    if (isNewTask) {
      dispatch(createTask(formData as Omit<Task, "id" | "createdAt">));
    } else {
      dispatch(updateTask({ ...task!, ...formData } as Task));
    }
    window.history.back();
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {isNewTask ? "Создать задачу" : "Редактировать задачу"}
      </Typography>
      <Stack spacing={2}>
        <TextField
          id="task-title"
          label="Заголовок"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          required
          error={!!errors.title}
          helperText={errors.title}
          InputLabelProps={{ htmlFor: "task-title" }}
        />
        <TextField
          id="task-description"
          label="Описание"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          InputLabelProps={{ htmlFor: "task-description" }}
        />
        <TextField
          id="task-category"
          select
          label="Категория"
          name="category"
          value={formData.category}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ htmlFor: "task-category" }}
          inputProps={{ id: "task-category" }}
        >
          {["Bug", "Feature", "Documentation", "Refactor", "Test"].map(
            (option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ),
          )}
        </TextField>
        <TextField
          id="task-status"
          select
          label="Статус"
          name="status"
          value={formData.status}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ htmlFor: "task-status" }}
          inputProps={{ id: "task-status" }}
        >
          {["To Do", "In Progress", "Done"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="task-priority"
          select
          label="Приоритет"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ htmlFor: "task-priority" }}
          inputProps={{ id: "task-priority" }}
        >
          {["Low", "Medium", "High"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!formData.title}
          sx={{
            backgroundColor: "#000",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.77)" },
          }}
        >
          Сохранить
        </Button>
        <Button
          variant="outlined"
          onClick={handleCancel}
          sx={{
            color: "#6c757d",
            borderColor: "#6c757d",
            "&:hover": { color: "#000", borderColor: "#000" },
          }}
        >
          Отмена
        </Button>
      </Box>
    </Box>
  );
};