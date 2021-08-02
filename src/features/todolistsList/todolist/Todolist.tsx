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
import {FilterValuesType, TodoListDomainType} from '../todoLists-reducer';
import {RequestStatusType} from '../../../app/app-reducer';
import {TaskDomainType} from '../../../app/App';


export type TodoListPropsType = {
    todoList: TodoListDomainType
    entityStatus: RequestStatusType
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    removeTodolist: (todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
    demo?: boolean
}


export const TodoList = React.memo(({
                                        todoList,
                                        changeTodoListTitle,
                                        removeTodolist,
                                        changeFilter,
                                        entityStatus,
                                        demo = false,
                                    }: TodoListPropsType) => {
    console.log('TodoList')
    debugger
    const tasks = useSelector<AppRootStateType, Array<TaskDomainType>>(state => state.tasks[todoList.id])
    const dispatch = useDispatch()

    useEffect(() => {
        debugger
        if (demo) {
            return;
        }
        dispatch(fetchTasksTC(todoList.id))
    }, [dispatch, todoList, demo])

    const getTaskForTodoList = () => {
        switch (todoList.filter) {
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
        changeFilter('all', todoList.id)
    }, [changeFilter, todoList.id])

    const onActiveClickHandler = useCallback(() => {
        changeFilter('active', todoList.id)
    }, [changeFilter, todoList.id])

    const onCompletedClickHandler = useCallback(() => {
        changeFilter('completed', todoList.id)
    }, [changeFilter, todoList.id])

    const onClickRemoveTodolist = useCallback(() => {
        removeTodolist(todoList.id)
    }, [removeTodolist, todoList.id])

    const addNewTask = useCallback((newItemTitle: string) => dispatch(addNewTaskTC(todoList.id, newItemTitle)), [dispatch, todoList.id])

    const onChangeTodoListTitle = useCallback((changedTitle: string) => changeTodoListTitle(changedTitle, todoList.id), [changeTodoListTitle, todoList.id])

    return (
        <div>
            <h3 style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <EditableSpan
                    title={todoList.title}
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
                                todoListId={todoList.id}
                                task={t}
                                entityStatus={t.entityStatus}
                            />
                        )
                    })
                }
            </ul>
            <div>
                <Button
                    variant={todoList.filter === 'all' ? 'contained' : 'outlined'}
                    size={'small'}
                    color={'primary'}
                    onClick={onAllClickHandler}
                >
                    All
                </Button>
                <Button
                    style={{marginLeft: '3px'}}
                    variant={todoList.filter === 'active' ? 'contained' : 'outlined'}
                    size={'small'}
                    color={'primary'}
                    onClick={onActiveClickHandler}
                >
                    Active
                </Button>
                <Button
                    style={{marginLeft: '3px'}}
                    variant={todoList.filter === 'completed' ? 'contained' : 'outlined'}
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