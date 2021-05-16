import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

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
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}


export function Todolist(props: TodolistPropsType) {

    const onAllClickHandler = () => {
        props.changeFilter('all', props.todoListId)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.todoListId)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.todoListId)
    }
    const onClickRemoveTodolist = () => {
        props.removeTodolist(props.todoListId)
    }
    const addNewTask = (newItemTitle: string) => props.addTask(newItemTitle, props.todoListId)
    const onChangeTodoListTitle = (changedTitle: string) => props.changeTodoListTitle(changedTitle, props.todoListId)

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChangeTitle={onChangeTodoListTitle}/>
                <button onClick={onClickRemoveTodolist}>X</button>
            </h3>
            <AddItemForm addItem={addNewTask}/>
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => {
                            props.removeTasks(t.id, props.todoListId)
                        }
                        const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId)
                        }
                        const onChangeTitle = (changedTitle: string) => props.changeTaskTitle(t.id, changedTitle, props.todoListId)

                        return (
                            <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                                <input
                                    type="checkbox"
                                    checked={t.isDone}
                                    onChange={onChangeChecked}
                                />
                                <EditableSpan title={t.title} onChangeTitle={onChangeTitle}/>
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