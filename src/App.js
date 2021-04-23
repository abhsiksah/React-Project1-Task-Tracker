import Header from "./header";
import Tasks from "./Tasks";
import { useState,useEffect } from "react";   //useEffect is hook wiz used when you want something to happens as soon as the page loads
import AddTask from "./AddTask"

function App() {

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([    //here the tasks is a state 
    // {
        //for now this is a part of our App State that is global and hence we are going to have it as global and can be used in diffrent components as Props
    //   id: 1,                              //states are immutable so it cannot be changed by Array.push() or something like that so we need to define a function SetTasks which can be used to change any values inside
    //   text: "Doctors Appointment",     //Tasks can be passed to the Task component below and can be used as props in the compone ts tat we wish to
    //   day: "Feb 5th at 2:30pm",
    //   reminder: true,
    // },
    // {
    //   id: 2,
    //   text: "Meeting at School",
    //   day: "Feb 6th at 1:30pm",
    //   reminder: true,
    // },
  ]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])


  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

    // Fetch Task                                                         NOW THIS IS FOR GETTING A SINGLE TASK FOR TOOGLE SO WE ARE GETTING  THE TASK AND ID  
    const fetchTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)      
      const data = await res.json()
  
      return data
    }


      // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

   // Delete Task
   const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',                                               //PUTTING METHOD AS DELETE IT CAN BE SEEN ON THE CONCOLE WHEN WE DELETE A ITEM
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))   //this will actually filter only those id's which is not the id that we have passed (rest all will be displayed) and that is we want to delte
      : alert('Error Deleting This Task')
  }
 
  


  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)              //THIS IS ABOVE WE GOT A DIFFERENT FETCH FOR A SINGLE TASK WITH THE ID
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task       //spread accross actually means that i want all of the task but in addtion to that i need =>{the condition that you put after it}
      )
    )
  }
  


  return (
    <>
      <div className="container">
      <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}                               //here ShowAdd will only pass true or false so we are passing the Boolean value in that to Header component
        />
         {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ? (
          <Tasks
            tasks={tasks}
            OnDelete={deleteTask}
            onToggle={toggleReminder}
          />
        ) : (
          "Nothig to Show"
        )}
      </div>
    </>
  );
}

export default App;



//if the production code not running us set-executionpolicy remotesigned on Windows Powershell by Admin rights