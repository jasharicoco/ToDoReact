function ToDoItem({ task, index, toggleCompleted, deleteTask, handleTagClick, handleCategoryClick }) {
  return (
    <li
      className={`priority-${task.priority.toLowerCase()} ${task.completed ? "completed" : ""}`}
      onClick={() => toggleCompleted(index)} // Gör hela objektet klickbart
    >
      <div className="task-content">
        <span className="task-text">{task.text}</span>
        <div className="hashtag-container">
          <span onClick={(e) => { e.stopPropagation(); handleCategoryClick(task.category); }} className="category-tag">
            {task.category}
          </span>
          {task.hashtags.map((tag, i) => (
            <span key={i} onClick={(e) => { e.stopPropagation(); handleTagClick(tag); }} className="hashtag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="task-buttons">
        <button onClick={(e) => { e.stopPropagation(); deleteTask(index); }} className="delete-btn">
          ❌
        </button>
      </div>
    </li>
  );
}


export default ToDoItem;
