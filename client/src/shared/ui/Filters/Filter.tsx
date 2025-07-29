import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/**
 * Интерфейс пропсов для компонента фильтра
 * @interface FilterProps
 * @property {string} label - Название фильтра (например, "Категория")
 * @property {string[]} options - Массив доступных опций для выбора
 * @property {string} value - Текущее значение фильтра
 * @property {(value: string) => void} onChange - Функция обработки изменения значения
 */
interface FilterProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

/**
 * Компонент выпадающего фильтра с возможностью очистки
 * @param props Пропсы компонента
 * @returns JSX.Element
 */
export const Filter = ({ label, options, value, onChange }: FilterProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  const handleClear = () => {
    onChange("");
  };

  // Генерируем уникальный id на основе label, заменяя пробелы на дефисы
  const selectId = `filter-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <FormControl sx={{ minWidth: 180, maxWidth: 250 }}>
      <InputLabel sx={{ fontSize: "0.9rem", top: -6 }} htmlFor={selectId}>
        {label}
      </InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        label={label}
        inputProps={{ id: selectId }}
        sx={{
          height: 40,
          "& .MuiSelect-select": { py: 0.1 },
        }}
        endAdornment={
          value && (
            <IconButton
              sx={{
                display: value ? "inline-flex" : "none",
                mr: 1,
                height: 40,
              }}
              onClick={handleClear}
              size="small"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )
        }
      >
        {options.map((option) => (
          <MenuItem key={option} value={option} sx={{ fontSize: "0.85rem" }}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};