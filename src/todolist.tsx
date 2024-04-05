import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilteredValueType } from "./App"
import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EditableSpan"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    filter: FilteredValueType
    changeFilter: (value: FilteredValueType, todolistId: string) => void
    addTask: (value: string, todolistId: string) => void
    changeStatus: Function
    removeTodolist: (todolistId: string) => void
}

export function Todolist (props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id )
    }
  

    let [newTaskTitle, setNewTaskTitle] = useState("");
    let [error, setError] =  useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.code === 'Enter' || e.code ==='NumpadEnter') {
            props.addTask(newTaskTitle, props.id);
            setNewTaskTitle("");
        }

    }

    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompleteClickHandler = () => props.changeFilter("completed", props.id)
    

   const removeTodolist = () => {
    props.removeTodolist(props.id);
   }

    return <div>
        <h3>{props.title} 
            <button onClick={removeTodolist}>x</button>
        </h3>
        <AddItemForm addItem={addTask} />
 
        <ul>
            {
                props.tasks.map(t => {
                const onRemoHandler = () => {
                    props.removeTask(t.id, props.id)
                }
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, e.currentTarget.checked, props.id)
                return <li key={t.id} className={t.isDone ? "isDone" : ""}>
                    <input type = 'checkbox'
                    onChange={onChangeHandler}
                    checked={t.isDone}/>
                    <EditableSpan title={t.title}/>
                    <button onClick = {onRemoHandler}> x </button>
                    </li>
                    })
            }

        </ul>
        <div>
        <button className={props.filter==="all" ? 'active-filter' : ''}
         onClick={onAllClickHandler}> All </button>

        <button className={props.filter==="active" ? 'active-filter' : ''} 
        onClick={onActiveClickHandler}> Active </button>

        <button className={props.filter==="completed" ? 'active-filter' : ''}
        onClick={onCompleteClickHandler}> Completed</button>
        </div>
        

    </div>
}


