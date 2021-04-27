import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTasks: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newIsDoneChecked: boolean) => void
    filterTask: FilterValuesType
}


export function Todolist(props: TodolistPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(newTaskTitle);
            setNewTaskTitle('')
        }
    }
    const onClickAddTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim())
        } else {
            setError(true)
        }
        setNewTaskTitle('')
    }
    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }
    const errorMessage = error && <div style={{color: 'red'}}>Title is required!</div>

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    placeholder={'Enter a new task'}
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={onClickAddTask}>+</button>
                {errorMessage}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => {
                            props.removeTasks(t.id)
                        }
                        const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                                <input
                                    type="checkbox"
                                    checked={t.isDone}
                                    onChange={onChangeChecked}
                                />
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>delete</button>
                            </li>)
                    })
                }
            </ul>
            <div>
                <button className={props.filterTask === 'all' ? 'activeFilter' : ''} onClick={onAllClickHandler}> All</button>
                <button className={props.filterTask === 'active' ? 'activeFilter' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filterTask === 'completed' ? 'activeFilter' : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}