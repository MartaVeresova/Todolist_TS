import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from './EditableSpan';
import {Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {TaskStatuses, TaskType} from './api/todolist-api';

export type TaskPropsType = {
    todoListId: string
    task: TaskType
}


export const Task = React.memo(({todoListId, task}: TaskPropsType) => {

    const dispatch = useDispatch()

    const onRemoveHandler = useCallback(() => dispatch(removeTaskAC(task.taskId, todoListId)), [dispatch, task, todoListId])

    const onChangeChecked = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(task.taskId, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, todoListId))
    }, [dispatch, task, todoListId])

    const onChangeTitle = useCallback((changedTitle: string) => dispatch(changeTaskTitleAC(task.taskId, changedTitle, todoListId)), [dispatch, task, todoListId])

    const taskClasses = task.status === TaskStatuses.Completed ? 'isDone' : ''

    return (
        <li key={task.taskId}>
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
