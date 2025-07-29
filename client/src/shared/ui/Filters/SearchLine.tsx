import { TextField, InputAdornment, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent } from "react";

/**
 * Интерфейс пропсов для компонента строки поиска
 * @interface SearchLineProps
 * @property {string} value - Текущее значение поискового запроса
 * @property {(value: string) => void} onChange - Функция обработки изменения значения
 */
interface SearchLineProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Компонент строки поиска с иконками поиска и очистки
 * @param props Пропсы компонента
 * @returns JSX.Element
 */
export const SearchLine = ({ value, onChange }: SearchLineProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <TextField
      id="search-line"
      fullWidth
      placeholder="Поиск по названию задачи"
      value={value}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: value && (
          <InputAdornment position="end">
            <IconButton onClick={handleClear} size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
      InputLabelProps={{ htmlFor: "search-line" }}
      sx={{
        mb: 3,
        "& .MuiInputBase-root": { height: 40, fontSize: "0.9rem", py: 0.5 },
        "& .MuiInputLabel-root": { fontSize: "0.9rem", top: -3 },
      }}
    />
  );
};