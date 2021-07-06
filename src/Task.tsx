import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from './EditableSpan';
import {Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch} from 'react-redux';
import {removeTaskTC, updateTaskTC} from './state/tasks-reducer';
import {TaskStatuses, TaskType} from './api/todolist-api';

export type TaskPropsType = {
    todoListId: string
    task: TaskType
}


export const Task = React.memo(({todoListId, task}: TaskPropsType) => {
    const dispatch = useDispatch()

    const onRemoveHandler = useCallback(() => dispatch(removeTaskTC(todoListId, task.id)), [dispatch, task, todoListId])

    const onChangeChecked = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskTC(todoListId, {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}, task.id))
    }, [dispatch, task, todoListId])

    const onChangeTitle = useCallback((changedTitle: string) => dispatch(updateTaskTC(todoListId, {title: changedTitle}, task.id)), [dispatch, task, todoListId])

    const taskClasses = task.status === TaskStatuses.Completed ? 'isDone' : ''

    return (
        <li key={task.id}>
                                <span className={taskClasses}>
                                    <Checkbox
                                        color={'primary'}
                                        checked={task.status === TaskStatuses.Completed}
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
