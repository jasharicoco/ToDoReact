import { useState, useRef, useEffect } from "react";
import ToDoInput from "./ToDoInput";
import ToDoList from "./ToDoList";

function ToDoApp() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []); // Hämtar tasks här från localStorage
  const [filterTag, setFilterTag] = useState(null);

  // Spara uppgifter till localStorage när tasks ändras
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const saveTask = (taskText, priority) => {
    const hashtags = taskText.match(/#\w+/g) || [];
    const cleanText = taskText.replace(/#\w+/g, "").trim();

    const newTask = { text: cleanText, priority, hashtags, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleCompleted = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleTagClick = (tag) => {
    setFilterTag(tag === filterTag ? null : tag);
  };

  const displayedTasks = filterTag
    ? tasks.filter((task) => task.hashtags.includes(filterTag))
    : tasks;

  return (
    <div className="todo-container">
      <h1>To Do List</h1>
      <ToDoInput saveTask={saveTask} />

      {filterTag && (
        <div className="filter-tag">
          <p>🔍 Showing tasks with: <strong>{filterTag}</strong></p>
          <button onClick={() => setFilterTag(null)}>Show All</button>
        </div>
      )}

      <ToDoList 
        tasks={displayedTasks} 
        toggleCompleted={toggleCompleted} 
        deleteTask={deleteTask} 
        handleTagClick={handleTagClick} 
      />
    </div>
  );
}

export default ToDoApp;
