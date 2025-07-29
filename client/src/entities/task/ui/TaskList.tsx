import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { selectFilteredTasks } from "@entities/task/model/selectors";
import { TaskItem } from "./TaskItem";
import { useDispatch } from "react-redux";
import { fetchTasks } from "@entities/task/model/taskSlice";
import { useEffect } from "react";
import { useAppDispatch } from "@/app/store";

/**
 * Компонент списка отфильтрованных задач
 * @returns JSX.Element
 */
export const TaskList = () => {
  const dispatch = useAppDispatch();
  const tasks = useSelector(selectFilteredTasks);
  const filters = useSelector((state: any) => state.tasks.filters);

  /**
   * Загружает задачи с сервера при монтировании или изменении фильтров
   */
  useEffect(() => {
    dispatch(fetchTasks({ title: filters.searchQuery, date: "" }));
  }, [dispatch, filters.searchQuery]);

  return (
    <Grid container spacing={2}>
      {tasks.map((task) => (
        <Grid
          size={{ xs: 12, sm: 6, md: 4 }}
          key={task.id}
          sx={{ display: "flex" }}
        >
          <TaskItem {...task} />
        </Grid>
      ))}
    </Grid>
  );
};