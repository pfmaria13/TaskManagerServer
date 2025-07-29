import styles from "./Header.module.css";

/**
 * Компонент заголовка
 * @returns {JSX.Element} - Заголовок
 */
export const Header = () => {
  return (
    <>
      <h1 className={styles.header}>Менеджер задач</h1>
    </>
  );
};
