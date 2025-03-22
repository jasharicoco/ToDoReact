function ToDoItem({ task, index, toggleCompleted, deleteTask, handleTagClick }) {
    return (
      <li className={`priority-${task.priority.toLowerCase()} ${task.completed ? "completed" : ""}`}>
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
    );
  }
  
  export default ToDoItem;
  