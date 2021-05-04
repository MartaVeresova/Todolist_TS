import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistPropsType = {
    todoListId: string
    title: string
    tasks: Array<TasksPropsType>
    removeTasks: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneChecked: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodolist: (todoListId: string) => void
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
            props.addTask(newTaskTitle, props.todoListId);
            setNewTaskTitle('')
        }
    }
    const onClickAddTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim(), props.todoListId)
        } else {
            setError(true)
        }
        setNewTaskTitle('')
    }
    const onAllClickHandler = () => {
        props.changeFilter('all', props.todoListId)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.todoListId)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.todoListId)
    }
    const errorMessage = error && <div style={{color: 'red'}}>Title is required!</div>

    const onClickRemoveTodolist = () => {props.removeTodolist(props.todoListId)}
    return (
        <div>
            <h3>
                {props.title}
                <button onClick={onClickRemoveTodolist}>X</button>
            </h3>
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
                            props.removeTasks(t.id, props.todoListId)
                        }
                        const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId)
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
                <button className={props.filter === 'all' ? 'activeFilter' : ''} onClick={onAllClickHandler}> All
                </button>
                <button className={props.filter === 'active' ? 'activeFilter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'activeFilter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}