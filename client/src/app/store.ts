import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "@entities/task/model/taskSlice";
import { useDispatch } from "react-redux";

/**
 * Создает и экспортирует настроенный store Redux с редюсером задач
 * @type {Store<RootState, AnyAction>}
 */
export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

/**
 * Тип состояния приложения, получаемого из store.getState()
 * @typedef {Object} RootState
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Тип диспетчера действий для приложения
 * @typedef {Function} AppDispatch
 */
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
