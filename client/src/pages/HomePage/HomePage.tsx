import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Button } from "@mui/material";
import { Header } from "@/shared/ui/Header/Header";
import { Filter } from "@/shared/ui/Filters/Filter";
import { SearchLine } from "@/shared/ui/Filters/SearchLine";
import { TaskList } from "@entities/task/ui/TaskList";
import { setFilter } from "@entities/task/model/taskSlice";
import { selectFilters } from "@entities/task/model/selectors";
import styles from "./HomePage.module.css";
import AddIcon from "@mui/icons-material/Add";

/**
 * Компонент главной страницы приложения
 * Отображает строку поиска, фильтры и список задач
 * @return {JSX.Element} - Главная страница
 */
export const HomePage = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  return (
    <div className={styles.container}>
      <Header />
      <main>
        <SearchLine
          value={filters.searchQuery}
          onChange={(value) => dispatch(setFilter({ searchQuery: value }))}
        />
        <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid
            sx={{
              mb: 2,
              display: "flex",
              flexWrap: "wrap",
              gap: {
                xs: "10px",
                sm: "20px",
                md: "30px",
              },
            }}
          >
            <Grid size={{ xs: 12, sm: 4 }}>
              <Filter
                label="Категория"
                options={[
                  "Bug",
                  "Feature",
                  "Documentation",
                  "Refactor",
                  "Test",
                ]}
                value={filters.category}
                onChange={(value) => dispatch(setFilter({ category: value }))}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Filter
                label="Статус"
                options={["To Do", "In Progress", "Done"]}
                value={filters.status}
                onChange={(value) => dispatch(setFilter({ status: value }))}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Filter
                label="Приоритет"
                options={["Low", "Medium", "High"]}
                value={filters.priority}
                onChange={(value) => dispatch(setFilter({ priority: value }))}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            component={Link}
            to="/task/new"
            startIcon={<AddIcon />}
            sx={{
              height: 40,
              backgroundColor: "#000",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.77)" },
            }}
          >
            Создать
          </Button>
        </Grid>

        <TaskList />
      </main>
    </div>
  );
};
