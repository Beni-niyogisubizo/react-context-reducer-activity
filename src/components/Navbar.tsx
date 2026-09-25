import { DARK_THEME, LIGHT_THEME } from "../constants/theme";
import { useTheme } from "../context/ThemeContext";
import styles from "./Navbar.module.css";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;

  return (
    <nav
      className={`${styles.navbar} ${
        theme === LIGHT_THEME ? styles.light : styles.dark
      }`}
    >
      <span className={styles.brand}>React State Manager</span>

      <button
        className={styles.toggleButton}
        type="button"
        onClick={toggleTheme}
      >
        Switch to {nextTheme} mode
      </button>
    </nav>
  );
}

export default Navbar;
