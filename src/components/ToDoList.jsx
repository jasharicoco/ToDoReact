import ToDoItem from "./ToDoItem";

function ToDoList({ tasks, toggleCompleted, deleteTask, handleTagClick, handleCategoryClick }) {
  return (
    <ul>
      {tasks.map((task, index) => (
        <ToDoItem
          key={index}
          task={task}
          index={index}
          toggleCompleted={toggleCompleted}
          deleteTask={deleteTask}
          handleTagClick={handleTagClick}
          handleCategoryClick={handleCategoryClick}
        />
      ))}
    </ul>
  );
}

export default ToDoList;

