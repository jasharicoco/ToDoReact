import { useState, useEffect } from "react";
import ToDoInput from "./ToDoInput";
import ToDoList from "./ToDoList";
import {
  FaBriefcase,  // School, Work
  FaUser,       // Personal, Family, Activities, Fitness, Hobbies, Education
  FaHammer,     // Home, DIY, Projects
  FaEllipsisH   // Other
} from 'react-icons/fa';

function ToDoApp() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
  const [filterTag, setFilterTag] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");

  // Defining categories with corresponding icons
  const categories = [
    { name: "School", icon: <FaBriefcase /> },
    { name: "Family", icon: <FaUser /> },
    { name: "To do", icon: <FaHammer /> },
    { name: "Other", icon: <FaEllipsisH /> },
  ];
  
  const priorities = ["Low", "Medium", "High"];

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

  const handleCategoryClick = (category) => {
    setFilterCategory(category === filterCategory ? "All" : category);
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
      <ToDoInput saveTask={saveTask} categories={categories.map(cat => cat.name)} priorities={priorities} />

      {/* Category icons - positioned outside the main div */}
      <div className="category-icons">
        {categories.map((cat) => (
          <span
            key={cat.name}
            className={`category-icon ${filterCategory === cat.name ? "selected" : ""}`}
            onClick={() => setFilterCategory(filterCategory === cat.name ? "All" : cat.name)}
          >
            {cat.icon}
          </span>
        ))}
      </div>

      {filterCategory !== "All" && (
        <div className="filter-tag">
          <p>Showing tasks from category: <strong>{filterCategory}</strong></p>
          <button onClick={() => setFilterCategory("All")}>All Categories</button>
        </div>
      )}

      {filterTag && (
        <div className="filter-tag">
          <p>Showing tasks with hashtag: <strong>{filterTag}</strong></p>
          <button onClick={() => setFilterTag(null)}>All Hashtags</button>
        </div>
      )}

      <ToDoList 
        tasks={displayedTasks} 
        toggleCompleted={toggleCompleted} 
        deleteTask={deleteTask} 
        handleTagClick={handleTagClick} 
        handleCategoryClick={handleCategoryClick} 
      />
    </div>
  );
}

export default ToDoApp;
