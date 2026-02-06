import { useState } from 'react';
import './TodoList.scss';

export default function TodoList() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([
    "Walk the dog",
    "Water the plants",
    "Wash the dishes",
  ]);

  function submitTask() {
    if (!task.trim()) return;
    setTasks((prevTasks) => [...prevTasks, task]);
    setTask("");
  }

  function deleteTask(index: number) {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  }

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="input-group">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          type="text"
          placeholder="New task..."
          onKeyDown={(e) => e.key === 'Enter' && submitTask()}
        />
        <button onClick={submitTask}>Add</button>
      </div>
      <ul className="todo-list">
        {tasks.map((item, index) => (
          <li key={index}>
            <span>{item}</span>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
