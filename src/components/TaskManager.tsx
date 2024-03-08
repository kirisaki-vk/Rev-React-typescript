import { nanoid } from "nanoid";
import { useState } from "react";
import "./TaskManager.css";
import {useTaskManager} from "../hooks/taskManagerHooks.ts";

type Task = {
  title: string;
  id: string;
}

export const TaskManager = () => {
  const [title, setTitle] = useState("");

  const {
    saveTask,
      task,
      deleteTask,
      searchTask
  } = useTaskManager();

  // remove task from list
  const completeTask = (id: string) => {
    deleteTask(id)
  };

  const updateTask = (id: string, taskTitleUpdate: string) => {
    saveTask({
      id,
      title: taskTitleUpdate
    })
  };

  const addTask = () => {
    if (title.length < 1) {
      return;
    }

    const newTask: Task = {
      // using nanoid to generate unique id
      id: nanoid(),
      title,
    };
    saveTask(newTask);
    setTitle("");
  };

  const handleSearch = (keyword: string) => {
    searchTask(keyword);
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div>
        <input type="text" onChange={e => handleSearch(e.target.value)} placeholder="Search Task" />
      </div>

      <div className="task">
        <input
          type="text"
          value={title}
          onChange={(ev) => {
            setTitle(ev.target.value);
          }}
          placeholder="New task title"
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className="container">
        {task.map((task) => (
          <li key={task.id} className="task">
            <div className="task">
              <input
                type="text"
                placeholder="Add new task"
                value={task.title}
                onChange={(e) => updateTask(task.id, e.target.value)}
              />
              <button onClick={() => completeTask(task.id)}>Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
