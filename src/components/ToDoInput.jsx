import { useRef, useState } from "react";

function ToDoInput({ saveTask, categories, priorities }) {
  const taskRef = useRef();
  const [priority, setPriority] = useState(priorities[0]);
  const [category, setCategory] = useState(categories[0]);

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
            {level}
          </span>
        ))}
      </div>

      <button type="submit">Add</button>
    </form>
  );
}

export default ToDoInput;
