import { useParams } from "react-router-dom";
import { Dialog, DialogContent } from "@mui/material";
import { selectTaskById } from "@entities/task/model/selectors";
import { TaskForm } from "@features/task/ui/TaskForm";
import { useAppSelector } from "@/app/hooks";
import { useAppDispatch } from "@/app/store";
import { useEffect } from "react";
import { fetchTaskById } from "@entities/task/model/taskSlice";

/**
 * Компонент страницы формы задачи
 * @returns JSX.Element
 */
export const TaskFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const task = useAppSelector((state) => selectTaskById(id || "")(state));
  const isNewTask = !id;

  /**
   * Загружает задачу по ID при монтировании
   */
  useEffect(() => {
    if (id) {
      dispatch(fetchTaskById(id));
    }
  }, [id, dispatch]);

  return (
    <Dialog
      open={true}
      onClose={() => window.history.back()}
      maxWidth="sm"
      fullWidth
    >
      <DialogContent>
        <TaskForm task={task} isNewTask={isNewTask} />
      </DialogContent>
    </Dialog>
  );
};