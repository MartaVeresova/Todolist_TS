import React, {useCallback} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';
import {addNewTaskAC} from './state/tasks-reducer';
import {Task} from './Task';

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


export const Todolist = React.memo(({
                                        todoListId,
                                        changeTodoListTitle,
                                        removeTodolist,
                                        changeFilter,
                                        title,
                                        filter
                                    }: TodolistPropsType) => {

    const tasks = useSelector<AppRootState, Array<TasksPropsType>>(state => state.tasks[todoListId])
    const dispatch = useDispatch()

    const getTaskForTodoList = () => {
        switch (filter) {
            case 'active':
                return tasks.filter(t => !t.isDone)
            case 'completed':
                return tasks.filter(t => t.isDone)
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
    const addNewTask = useCallback((newItemTitle: string) => dispatch(addNewTaskAC(newItemTitle, todoListId)), [dispatch, todoListId])
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