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
    changeStatus: Function
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

    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveClickHandler = () => props.changeFilter("active")
    const onCompleteClickHandler = () => props.changeFilter("completed")
    

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
                props.tasks.map(t => {
                const onRemoHandler = () => {
                    props.removeTask(t.id)
                }
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, e.currentTarget.checked)
                return <li key={t.id}>
                    <input type = 'checkbox'
                    onChange={onChangeHandler}
                    checked={t.isDone}/>
                    <span> {t.title}</span>
                    <button onClick = {onRemoHandler}> x </button>
                    </li>
                    })
            }

        </ul>
        <div>
        <button onClick={onAllClickHandler}> All </button>
        <button onClick={onActiveClickHandler}> Active </button>
        <button onClick={onCompleteClickHandler}> Completed</button>
        </div>
        

    </div>
}