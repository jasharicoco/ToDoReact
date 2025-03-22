import { useState, useRef, useEffect } from "react";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [priority, setPriority] = useState("Low"); // Default to Low
  const [filterTag, setFilterTag] = useState(null);
  const taskRef = useRef();

  // Hämta uppgifter från localStorage när sidan laddas
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Spara uppgifter till localStorage när tasks ändras
  useEffect(() => {
    if (tasks.length >= 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);
  

  const saveTask = (e) => {
    e.preventDefault();
    const taskText = taskRef.current.value.trim();
    if (!taskText) return;

    const hashtags = taskText.match(/#\w+/g) || [];
    const cleanText = taskText.replace(/#\w+/g, "").trim();

    const newTask = {
      text: cleanText,
      priority,
      hashtags,
      completed: false, // Default as not completed
    };

    setTasks([...tasks, newTask]);
    taskRef.current.value = ""; // Clear input
  };

  const handleTagClick = (tag) => {
    setFilterTag(tag === filterTag ? null : tag);
  };

  const toggleCompleted = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const displayedTasks = filterTag
    ? tasks.filter((task) => task.hashtags.includes(filterTag))
    : tasks;

  return (
    <div className="todo-container">
      <h1>To Do List</h1>
      <form onSubmit={saveTask} className="write-form">
        <input type="text" placeholder="Write a task..." ref={taskRef} />

        <select value={priority} onChange={(e) => setPriority(e.target.value || "Low")}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Add</button>
      </form>

      {filterTag && (
        <div className="filter-tag">
          <p>🔍 Showing tasks with: <strong>{filterTag}</strong></p>
          <button onClick={() => setFilterTag(null)}>Show All</button>
        </div>
      )}

      <ul>
        {displayedTasks.map((task, index) => (
          <li key={index} className={`priority-${task.priority.toLowerCase()} ${task.completed ? "completed" : ""}`}>
            <div className="task-content">
              <span className="task-text">{task.text}</span>
              <div className="hashtag-container">
                {task.hashtags.map((tag, i) => (
                  <span key={i} onClick={() => handleTagClick(tag)} className="hashtag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="task-buttons">
              <button onClick={() => toggleCompleted(index)} className="complete-btn">
                {task.completed ? "🔄" : "✅"}
              </button>
              <button onClick={() => deleteTask(index)} className="delete-btn">
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
