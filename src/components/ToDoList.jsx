import ToDoItem from "./ToDoItem";

function ToDoList({ tasks, toggleCompleted, deleteTask, handleTagClick }) {
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
        />
      ))}
    </ul>
  );
}

export default ToDoList;
