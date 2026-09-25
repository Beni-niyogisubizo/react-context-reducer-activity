import { useReducer, useState, type FormEvent } from "react";
import { LIGHT_THEME } from "../constants/theme";
import { useTheme } from "../context/ThemeContext";
import {
  taskReducer,
  type TaskState,
} from "../reducers/taskReducer";
import styles from "./TaskManager.module.css";

function TaskManager() {
  const [tasks, dispatch] = useReducer(
    taskReducer,
    [] as TaskState,
  );
  const [taskText, setTaskText] = useState("");
  const { theme } = useTheme();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTask = taskText.trim();

    if (!trimmedTask) {
      return;
    }

    dispatch({
      type: "add",
      payload: trimmedTask,
    });

    setTaskText("");
  }

  return (
    <main
      className={`${styles.container} ${
        theme === LIGHT_THEME ? styles.light : styles.dark
      }`}
    >
      <h1>Task Manager</h1>

      <form className={styles.taskForm} onSubmit={handleSubmit}>
        <input
          className={styles.taskInput}
          type="text"
          value={taskText}
          placeholder="Enter a task"
          aria-label="Task description"
          onChange={(event) => setTaskText(event.target.value)}
        />

        <button
          className={styles.addButton}
          type="submit"
          disabled={!taskText.trim()}
        >
          Add Task
        </button>
      </form>

      {tasks.length === 0 ? (
        <p className={styles.emptyMessage}>No tasks added yet.</p>
      ) : (
        <ul className={styles.taskList}>
          {tasks.map((task) => (
            <li className={styles.taskItem} key={task.id}>
              <span>{task.text}</span>

              <button
                className={styles.removeButton}
                type="button"
                aria-label={`Remove ${task.text}`}
                onClick={() =>
                  dispatch({
                    type: "remove",
                    payload: task.id,
                  })
                }
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default TaskManager;
