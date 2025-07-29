import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./store";

/**
 * Кастомный хук для типизированного использования useSelector
 * @returns TypedUseSelectorHook<RootState>
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;