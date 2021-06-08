import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';
import {addNewTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';

export type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistPropsType = {
    todoListId: string
    title: string
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    filter: FilterValuesType
    removeTodolist: (todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}


export function Todolist(props: TodolistPropsType) {

    const tasks = useSelector<AppRootState, Array<TasksPropsType>>(state => state.tasks[props.todoListId])
    const dispatch = useDispatch()

    let allTodoListTasks = tasks
    let tasksForTodoList = allTodoListTasks
    if (props.filter === 'active') {
        tasksForTodoList = allTodoListTasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = allTodoListTasks.filter(t => t.isDone)
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
    const onClickRemoveTodolist = () => {
        props.removeTodolist(props.todoListId)
    }
    const addNewTask = (newItemTitle: string) => dispatch(addNewTaskAC(newItemTitle, props.todoListId))
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
                    tasksForTodoList.map(t => {
                        const onRemoveHandler = () => dispatch(removeTaskAC(t.id, props.todoListId))
                        const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, props.todoListId))
                        }
                        const onChangeTitle = (changedTitle: string) => dispatch(changeTaskTitleAC(t.id, changedTitle, props.todoListId))
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