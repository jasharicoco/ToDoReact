import { useRef, useState } from "react";
import { FaBriefcase, FaUser, FaHammer, FaEllipsisH, FaRegCircle, FaExclamationCircle, FaFire } from 'react-icons/fa';

function ToDoInput({ saveTask, categories, priorities }) {
  const taskRef = useRef();
  const [priority, setPriority] = useState(priorities[0]);
  const [category, setCategory] = useState(categories[0]);

  // Category icons mapping
  const categoryIcons = {
    School: <FaBriefcase />,
    Family: <FaUser />,
    "To do": <FaHammer />,
    Other: <FaEllipsisH />,
  };

  // Priority icons mapping
  const priorityIcons = {
    Low: <FaRegCircle />,
    Medium: <FaExclamationCircle />,
    High: <FaFire />,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskText = taskRef.current.value.trim();
    if (!taskText) return;

    saveTask(taskText, priority, category);
    taskRef.current.value = ""; // Clear input
    setPriority(priorities[0]);
    setCategory(categories[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="write-form">
      <input type="text" placeholder="Write a task..." ref={taskRef} />

      <div className="options">
        {categories.map((cat) => (
          <span
            key={cat}
            className={`option ${category === cat ? 'selected' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {/* Display category icon and name */}
            {/* {categoryIcons[cat]} */}
            {cat}
          </span>
        ))}
      </div>

      <div className="options">
        {priorities.map((level) => (
          <span
            key={level}
            className={`option ${priority === level ? 'selected' : ''}`}
            onClick={() => setPriority(level)}
          >
            {/* Display priority icon and name */}
            {/* {priorityIcons[level]} */}
            {level}
          </span>
        ))}
      </div>

      <button type="submit">Add</button>
    </form>
  );
}

export default ToDoInput;
