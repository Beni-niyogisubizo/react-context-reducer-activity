import "./App.css";
import Navbar from "./components/Navbar";
import TaskManager from "./components/TaskManager";
import { LIGHT_THEME } from "./constants/theme";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { theme } = useTheme();

  return (
    <div
      className={`app ${
        theme === LIGHT_THEME ? "app--light" : "app--dark"
      }`}
    >
      <Navbar />
      <TaskManager />
    </div>
  );
}

export default App;
