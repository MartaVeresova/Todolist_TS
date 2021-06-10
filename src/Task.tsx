import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from './EditableSpan';
import {Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {TasksPropsType} from './Todolist';

export type TaskPropsType = {
    todoListId: string
    task: TasksPropsType
}


export const Task = React.memo(({todoListId, task}: TaskPropsType) => {

    const dispatch = useDispatch()

    const onRemoveHandler = useCallback(() => dispatch(removeTaskAC(task.id, todoListId)), [dispatch, task, todoListId])

    const onChangeChecked = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, todoListId))
    }, [dispatch, task, todoListId])

    const onChangeTitle = useCallback((changedTitle: string) => dispatch(changeTaskTitleAC(task.id, changedTitle, todoListId)), [dispatch, task, todoListId])

    const taskClasses = task.isDone ? 'isDone' : ''

    return (
        <li key={task.id}>
                                <span className={taskClasses}>
                                    <Checkbox
                                        color={'primary'}
                                        checked={task.isDone}
                                        onChange={onChangeChecked}
                                    />
                                    <EditableSpan title={task.title}
                                                  onChangeTitle={onChangeTitle}
                                    />
                                </span>
            <IconButton onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </li>
    )
})
