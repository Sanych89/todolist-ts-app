import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilteredValueType } from "./App"

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilteredValueType) => void
    addTask: (value: string) => void
}

export function Todolist (props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState("");

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'enter' || e.code ==='NumpadEnter') {
            props.addTask(newTaskTitle);
            setNewTaskTitle("");
        }

    }

    const addTask = () => {props.addTask(newTaskTitle)
    setNewTaskTitle("")}

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value ={newTaskTitle} 
            onChange={onNewTitleChangeHandler}
            onKeyDown={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <input type = 'checkbox' checked={t.isDone}/>
                    <span> {t.title}</span>
                    <button onClick = {() => {props.removeTask(t.id)}}> x </button>
                    </li>)
            }
        </ul>
        <div>
        <button onClick={ () => {props.changeFilter("all")}}> All </button>
        <button onClick={ () => {props.changeFilter("active")}}> Active </button>
        <button onClick={ () => {props.changeFilter("completed")}}> Completed</button>
        </div>
        

    </div>
}