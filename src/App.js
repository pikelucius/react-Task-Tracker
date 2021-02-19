import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'


import { useState, useEffect} from 'react'



function App() {

  


  const [showAddTask, SetShowAddTask ] = useState(true)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
     const getTasks = async () => {
       const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
     }

     getTasks()
  },[])

  // Fetch all tasks (get)
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks')

    const data = await response.json()
    
    return data
  }

 // Fetch single task (get)
 const fetchTask = async (id) => {
  const response = await fetch('http://localhost:5000/tasks/'+id)

  const data = await response.json()
  
  return data
}

  
 // Add Task
  const addTask = async (task) => {
   await fetch('http://localhost:5000/tasks', {
     method: 'POST',
     body: JSON.stringify(task),
     headers: {
       "Content-type": "application/json"
     }
   })

  const data = await fetchTasks()

  setTasks(data);
  }

  // Update Task
  const updateTask = async (id, task) => {
    await fetch('http://localhost:5000/tasks/'+id, {
      method: 'PUT',
      body: JSON.stringify(task),
      headers: {
        "Content-type": "application/json"
      }
    })
 

   }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch('http://localhost:5000/tasks/'+id, {
      method: 'DELETE',
      body: null,
      headers: {
        "Content-type": "application/json"
      }
    })
 
   const data = await fetchTasks()
 
   setTasks(data);

      setTasks(tasks.filter(task => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const task = await fetchTask(id)
    await updateTask(id, {...task, reminder: !task.reminder})

    setTasks(tasks.map(task => task.id === id ? { ...task, reminder: !task.reminder} : task ))
  }

  return (
    <Router>
      <div className="container">
        <Header title='Task' onAdd={() => SetShowAddTask(!showAddTask)}  showAdd={showAddTask} />
        
        <Route path="/" exact render={()=>(
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? 
            (<Tasks tasks={tasks} onDelete={deleteTask} toggleReminder={toggleReminder} />) :
            ('No Tasks')}
          </>
        )}
        />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  )
}

export default App;
