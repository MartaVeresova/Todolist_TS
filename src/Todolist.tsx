import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

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
                <IconButton onClick={onClickRemoveTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addNewTask}/>
            <ul style={{listStyle: 'none', paddingLeft: '0px'}}>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => {
                            props.removeTasks(t.id, props.todoListId)
                        }
                        const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId)
                        }
                        const onChangeTitle = (changedTitle: string) => props.changeTaskTitle(t.id, changedTitle, props.todoListId)

                        const taskClasses = t.isDone ? 'isDone' : ''

                        return (
                            <li key={t.id}>
                                <span className={taskClasses}>
                                    <Checkbox
                                        color={'primary'}
                                        checked={t.isDone}
                                        onChange={onChangeChecked}
                                    />
                                    <EditableSpan title={t.title}
                                                  onChangeTitle={onChangeTitle}
                                    />
                                </span>
                                <IconButton onClick={onRemoveHandler}>
                                    <Delete/>
                                </IconButton>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <Button
                    variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    size={'small'}
                    color={'primary'}
                    onClick={onAllClickHandler}
                >
                    All
                </Button>
                <Button
                    style={{marginLeft: '3px'}}
                    variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    size={'small'}
                    color={'primary'}
                    onClick={onActiveClickHandler}
                >
                    Active
                </Button>
                <Button
                    style={{marginLeft: '3px'}}
                    variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                    size={'small'}
                    color={'primary'}
                    onClick={onCompletedClickHandler}
                >
                    Completed
                </Button>
            </div>
        </div>
    )
}