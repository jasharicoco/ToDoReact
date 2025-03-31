import { useState, useEffect } from "react";
import ToDoInput from "./ToDoInput";
import ToDoList from "./ToDoList";

function ToDoApp() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
  const [filterTag, setFilterTag] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");
  const categories = ["Work", "Personal", "Shopping", "Other"];

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const saveTask = (taskText, priority, category) => {
    const hashtags = taskText.match(/#\w+/g) || [];
    const cleanText = taskText.replace(/#\w+/g, "").trim();

    const newTask = { text: cleanText, priority, category, hashtags, completed: false };
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

  const displayedTasks = tasks.filter((task) => {
    return (
      (!filterTag || task.hashtags.includes(filterTag)) &&
      (filterCategory === "All" || task.category === filterCategory)
    );
  });

  return (
    <div className="todo-container">
      <h1>To Do List</h1>
      <ToDoInput saveTask={saveTask} categories={categories} />

    {/* Filter by tag and category */}
    <div className="write-form">
      <select
      value={filterCategory}
      onChange={(e) => setFilterCategory(e.target.value)}
      style={{ marginTop: "20px" }}
      >
        <option value="">Select Category</option>
        <option value="All">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>

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
