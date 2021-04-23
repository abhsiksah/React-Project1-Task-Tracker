import Task from "./Task";

const Tasks = ({ tasks, OnDelete, onToggle }) => {
  return (
    <>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          OnDelete={OnDelete}
          onToggle={onToggle}
        />
      ))}
    </>
  );
};

export default Tasks;
