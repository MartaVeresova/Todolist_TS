import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components/addItemForm/AddItemForm';
import {EditableSpan} from '../../../components/editableSpan/EditableSpan';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../app/store';
import {addNewTaskTC, fetchTasksTC} from '../tasks-reducer';
import {Task} from './task/Task';
import {TaskStatuses} from '../../../api/todolist-api';
import {FilterValuesType} from '../todoLists-reducer';
import {RequestStatusType} from '../../../app/app-reducer';
import {TaskDomainType} from '../../../app/App';


export type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    entityStatus: RequestStatusType
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    removeTodolist: (todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}


export const TodoList = React.memo(({
                                        todoListId,
                                        changeTodoListTitle,
                                        removeTodolist,
                                        changeFilter,
                                        title,
                                        filter,
                                        entityStatus
                                    }: TodoListPropsType) => {
    const tasks = useSelector<AppRootStateType, Array<TaskDomainType>>(state => state.tasks[todoListId])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(todoListId))
    }, [dispatch, todoListId])

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
                <EditableSpan
                    title={title}
                    onChangeTitle={onChangeTodoListTitle}
                    disabled={entityStatus === 'loading'}
                />
                <IconButton
                    onClick={onClickRemoveTodolist}
                    disabled={entityStatus === 'loading'}
                >
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm
                addItem={addNewTask}
                disabled={entityStatus === 'loading'}
            />
            <ul style={{listStyle: 'none', paddingLeft: '0px'}}>
                {
                    newTasks.map(t => {
                        return (
                            <Task
                                key={t.id}
                                todoListId={todoListId}
                                task={t}
                                entityStatus={t.entityStatus}
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