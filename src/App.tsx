import React, { useState } from 'react';
import './App.css';
import { Todolist } from './todolist';
import { v1 } from 'uuid';


export type FilteredValueType = "all" | "active" | "completed"

function App() {

  let [tasks, setTasks] = useState([
    {id: v1(), title: "html+css", isDone: false},
    {id: v1(), title: "Javascript", isDone: true},
    {id: v1(), title: "React", isDone: true},
    {id: v1(), title: "Rest API", isDone: true},


  ]
  )

  function removeTask (id: string){
    let filteredTasks = tasks.filter(t => t.id !== id);
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let newTask = {
      id: v1(),
      title: title,
      isDone: false,      
    };
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)

  }

  let [filter, setFilter] = useState<FilteredValueType>("all") 

  let tasksForTodolist = tasks;

  if (filter === "active") {
    tasksForTodolist = tasks.filter( t => t.isDone === false)
  }

  if (filter === "completed") {
    tasksForTodolist = tasks.filter( t => t.isDone === true)
  }

  function changeFilter (value: FilteredValueType) {
    setFilter(value);
  }

  


  return (
    <div className="App">
      <Todolist  
      title = 'What to learn'
      tasks ={tasksForTodolist}
      removeTask={removeTask}
      changeFilter={changeFilter}
      addTask={addTask}
       />

    </div>
  );
}

export default App;
