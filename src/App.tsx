import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { Shop } from './shop';


export type FilteredValueType = "all" | "active" | "completed"
type TodolistsType = {
  id: string;
  title: string;
  filter: FilteredValueType;
}

type TasksStateType = {
  [key: string]:Array<TaskType> 
}

function App() {
  
  

  let todolistId1 = v1();
  let todolistId2 = v1();



  let [todolists, setTodolists] = useState <Array<TodolistsType>> ([
    {id: todolistId1, title: 'What to learn', filter: 'all'  },
    {id: todolistId2, title: 'What to buy', filter: 'all'  },

  ])

  let [tasksObj, setTasks] = useState<TasksStateType>({
    [todolistId1]: [  
    {id: v1(), title: "html+css", isDone: false},
    {id: v1(), title: "Javascript", isDone: true},
    {id: v1(), title: "React", isDone: true},
    {id: v1(), title: "Rest API", isDone: true},
],
    [todolistId2]: [
  {id: v1(), title: "Bread", isDone: false},
  {id: v1(), title: "Milk", isDone: true},  
],
  }) 



  
  /* let [allTasks, setAllTasks] = useState({
    [todolistId1]: изложено в кв скобках т.к. таким образом мы обращаемся не к 
    свойству обьекта тудулист переменной а к конкретному значению которое будет присвоено
    этому свойсвту после отработки функции v1() - случайному набору цифр и букв */ 


    

  function removeTask (id: string, todolistId: string){
    let tasks = tasksObj[todolistId] //отбираем нужный массив тасок по ИД  массива//
    let filteredTasks = tasks.filter(t => t.id !== id); //фильтруем таску по ИД таски //
    tasksObj[todolistId] = filteredTasks; //перезаписываем массив тасок измененой таской //
    setTasks({...tasksObj}); //отдаем обратно копию обьекта чтобы отреагировал реакт //
  }

  function addTask(title: string, todolistId: string) {
    let newTask = {
      id: v1(),
      title: title,
      isDone: false,      
    };

    let tasks = tasksObj[todolistId]
    let newTasks = [newTask, ...tasks]
    tasksObj[todolistId] = newTasks;
    setTasks({...tasksObj})

  }

  let [filter, setFilter] = useState<FilteredValueType>("all") 



  
  function changeStatus (taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId]
    
    let task = tasks.find( t => t.id === taskId)
    
    if (task) {
    task.isDone = isDone;   
    setTasks({...tasksObj}) //передали в сетТаскс копию таскс для того , чтобы реакт
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

    function changeFilter (value: FilteredValueType, todolistId: string) {
      let todolist = todolists.find(tl => tl.id === todolistId);
      if (todolist) {
        todolist.filter = value;
        setTodolists([...todolists])


        /* */

      }


    }

    let removeTodolist = (todolistId: string) => {
      let filteredTodolist = todolists.filter(tl => tl.id !== todolistId) //делаем фильтром массив в котором есть те массивы  у которых ИД не равны удаляемому //      
      setTodolists(filteredTodolist) // сетаем выше полученный массив в локлаьный стейт
      delete tasksObj[todolistId] //удаляем свойство у списка тудулистов
      setTasks({...tasksObj}) // удаляем сам массив тасок 
    }

    function addTodolist (title: string) {
      let todolist: TodolistsType = {
        id: v1(),
        filter: 'all',
        title: title
      }
      setTodolists([todolist, ...todolists])
      setTasks({
        ...tasksObj,
        [todolist.id]: []
      })
      /* мы создали тудулист и через сет таскс назначили ему  пустой массив в качестве начальных тасок*/
          
    }

  return (
    <div className="App">
    <div>
    <Shop/>
    <p> Add Todolist </p>
    <AddItemForm addItem={addTodolist} />
    </div>


      {todolists.map((todolist) => { 

let tasksForTodolist = tasksObj[todolist.id];

if (todolist.filter === "active") {
  tasksForTodolist = tasksForTodolist.filter( t => t.isDone === false)
}

if (todolist.filter === "completed") {
  tasksForTodolist = tasksForTodolist.filter( t => t.isDone === true)
}


      
    return <Todolist 
    key={todolist.id}
    id = {todolist.id}
    title = {todolist.title}
    tasks ={tasksForTodolist}
    removeTask={removeTask}
    changeFilter={changeFilter}
    addTask={addTask}
    changeStatus={changeStatus}
    filter={todolist.filter}
    removeTodolist={removeTodolist}
    
     />
     
      })
    }




    </div>
  );
}

export default App;
