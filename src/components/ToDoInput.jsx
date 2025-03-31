import { useRef, useState } from "react";

function ToDoInput({ saveTask, categories }) {
  const taskRef = useRef();
  const [priority, setPriority] = useState("Low");
  const [category, setCategory] = useState(categories[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskText = taskRef.current.value.trim();
    if (!taskText) return;

    saveTask(taskText, priority, category);
    taskRef.current.value = ""; // Clear input
    setPriority("Low");
    setCategory(categories[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="write-form">
      <input type="text" placeholder="Write a task..." ref={taskRef} />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

export default ToDoInput;