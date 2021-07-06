import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {addNewTaskTC, fetchTasksTC} from './state/tasks-reducer';
import {Task} from './Task';
import {TaskStatuses, TaskType} from './api/todolist-api';
import {FilterValuesType} from './state/todoLists-reducer';


export type TodolistPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    removeTodolist: (todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}


export const Todolist = React.memo(({
                                        todoListId,
                                        changeTodoListTitle,
                                        removeTodolist,
                                        changeFilter,
                                        title,
                                        filter
                                    }: TodolistPropsType) => {
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todoListId])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(todoListId))
    }, [])

    const getTaskForTodoList = () => {
        switch (filter) {
            case 'active':
                return tasks.filter(t => t.status === TaskStatuses.New)
            case 'completed':
                return tasks.filter(t => t.status === TaskStatuses.Completed)
            default:
                return tasks
        }
    }
    const newTasks = getTaskForTodoList()

    const onAllClickHandler = useCallback(() => {
        changeFilter('all', todoListId)
    }, [changeFilter, todoListId])

    const onActiveClickHandler = useCallback(() => {
        changeFilter('active', todoListId)
    }, [changeFilter, todoListId])

    const onCompletedClickHandler = useCallback(() => {
        changeFilter('completed', todoListId)
    }, [changeFilter, todoListId])

    const onClickRemoveTodolist = useCallback(() => {
        removeTodolist(todoListId)
    }, [removeTodolist, todoListId])

    const addNewTask = useCallback((newItemTitle: string) => dispatch(addNewTaskTC(todoListId, newItemTitle)), [dispatch, todoListId])

    const onChangeTodoListTitle = useCallback((changedTitle: string) => changeTodoListTitle(changedTitle, todoListId), [changeTodoListTitle, todoListId])

    return (
        <div>
            <h3>
                <EditableSpan title={title} onChangeTitle={onChangeTodoListTitle}/>
                <IconButton onClick={onClickRemoveTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addNewTask}/>
            <ul style={{listStyle: 'none', paddingLeft: '0px'}}>
                {
                    newTasks.map(t => {
                        return (
                            <Task
                                key={t.id}
                                todoListId={todoListId}
                                task={t}
                            />
                        )
                    })
                }
            </ul>
            <div>
                <Button
                    variant={filter === 'all' ? 'contained' : 'outlined'}
                    size={'small'}
                    color={'primary'}
                    onClick={onAllClickHandler}
                >
                    All
                </Button>
                <Button
                    style={{marginLeft: '3px'}}
                    variant={filter === 'active' ? 'contained' : 'outlined'}
                    size={'small'}
                    color={'primary'}
                    onClick={onActiveClickHandler}
                >
                    Active
                </Button>
                <Button
                    style={{marginLeft: '3px'}}
                    variant={filter === 'completed' ? 'contained' : 'outlined'}
                    size={'small'}
                    color={'primary'}
                    onClick={onCompletedClickHandler}
                >
                    Completed
                </Button>
            </div>
        </div>
    )
})