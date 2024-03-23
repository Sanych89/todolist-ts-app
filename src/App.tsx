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

  
  function changeStatus (taskId: string, isDone: boolean) {
    console.log('change')
    let task = tasks.find( t => t.id === taskId)
    console.log(taskId)
    if (task) {
    task.isDone = isDone;
    setTasks([...tasks]) //передали в сетТаскс копию таскс для того , чтобы реакт
    // понял что изменился передаваемый обьект (он не смотрит в содержимое под обьектов)
    // и перерисовался // 
    }
    
      /* запись   t => t.id === taskId)  эквивалентна 
      означает что функция только ретурнит тру/фолс в зависимости от выполнения условия

      if (t.id === taskId) {
        return true;        
      }
      else {
        return false
      }*/

      /* фрагмент 
          if (task) {
    task.isDone = isDone;
    }

    означает что если таск суещсвтует то у него поменяется свойство обьекта изДан
       */ 
    }

  

  return (
    <div className="App">
      <Todolist  
      title = 'What to learn'
      tasks ={tasksForTodolist}
      removeTask={removeTask}
      changeFilter={changeFilter}
      addTask={addTask}
      changeStatus={changeStatus}
       />

    </div>
  );
}

export default App;
