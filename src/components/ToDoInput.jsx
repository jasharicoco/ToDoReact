import { useRef, useState } from "react";

function ToDoInput({ saveTask }) {
  const taskRef = useRef();
  const [priority, setPriority] = useState("Low");

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskText = taskRef.current.value.trim();
    if (!taskText) return;

    saveTask(taskText, priority);
    taskRef.current.value = ""; // Clear input
  };

  return (
    <form onSubmit={handleSubmit} className="write-form">
      <input type="text" placeholder="Write a task..." ref={taskRef} />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

export default ToDoInput;
