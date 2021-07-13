import {AddNewTodoListActionType, RemoveTodoListActionType, SetTodoListsActionType,} from './todoLists-reducer';
import {TasksStateType} from '../../app/App';
import {ResponseStatuses, TaskType, todoListApi, UpdateTaskModelType} from '../../api/todolist-api';
import {AppRootStateType, AppThunk} from '../../app/store';
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer';
import {AxiosError} from 'axios';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';


const initialState: TasksStateType = {}
export type InitialTasksStateType = typeof initialState


export const tasksReducer = (state = initialState, action: TasksActionsType): TasksStateType => {

    switch (action.type) {

        case 'TASKS/SET-TASKS':
            return {
                ...state,
                [action.todoListId]: action.tasks
            }

        case 'TODO/SET-TODOLISTS':
            action.todoLists.forEach(tl => ({...state[tl.id] = []}))
            return {...state}

        case 'TASKS/REMOVE-TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
            }

        case 'TASKS/ADD-NEW-TASK':
            // {
            //     const stateCopy = {...state}
            //     const newTask = action.task
            //
            //     const tasks = stateCopy[newTask.todoListId];
            //     const newTasks = [newTask, ...tasks];
            //     stateCopy[newTask.todoListId] = newTasks;
            //
            //     return stateCopy;
            // }

            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }

        case 'TASKS/CHANGE-TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    ...action.model
                } : t)
            }

        case 'TODO/ADD-NEW-TODOLIST':
            return {
                ...state,
                [action.todoList.id]: []
            }

        case 'TODO/REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy

        // case 'CHANGE-TASK-ENTITY-STATUS':
        //     return {
        //         ...state,
        //         [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
        //             ...t, entityStatus: action.entityStatus
        //         } : t)
        //     }

        default:
            return state
    }
}

//actions
export const setTasksAC = (todoListId: string, tasks: TaskType[]) =>
    ({type: 'TASKS/SET-TASKS', todoListId, tasks} as const)

export const removeTaskAC = (taskId: string, todoListId: string) =>
    ({type: 'TASKS/REMOVE-TASK', taskId, todoListId} as const)

export const addNewTaskAC = (task: TaskType) =>
    ({type: 'TASKS/ADD-NEW-TASK', task} as const)

export const changeTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todoListId: string) =>
    ({type: 'TASKS/CHANGE-TASK', taskId, model, todoListId} as const)

// export const changeTaskEntityStatusAC = (entityStatus: RequestStatusType, todoListId: string, taskId: string) =>
//     ({type: 'CHANGE-TASK-ENTITY-STATUS', entityStatus, todoListId, taskId} as const)


//thunks
export const fetchTasksTC = (todoListId: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    todoListApi.getTasks(todoListId)
        .then(res => {
            dispatch(setTasksAC(todoListId, res.data.items))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    //dispatch(changeTaskEntityStatusAC('loading', todolistId, taskId))
    todoListApi.deleteTask(todolistId, taskId)
        .then((res) => {
            if (res.data.resultCode === ResponseStatuses.succeeded) {
                dispatch(removeTaskAC(taskId, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
}

export const addNewTaskTC = (todolistId: string, title: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    todoListApi.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === ResponseStatuses.succeeded) {
                dispatch(addNewTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
}

export const updateTaskTC = (todolistId: string, domainModel: UpdateDomainTaskModelType, taskId: string): AppThunk => (dispatch, getState: () => AppRootStateType) => {

    const changedTask = getState().tasks[todolistId].find(t => t.id === taskId)
    if (changedTask) {
        const apiModel: UpdateTaskModelType = {
            title: changedTask.title,
            status: changedTask.status,
            startDate: changedTask.startDate,
            priority: changedTask.priority,
            deadline: changedTask.deadline,
            description: changedTask.description,
            ...domainModel
        }
        dispatch(setAppStatusAC('loading'))
        todoListApi.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === ResponseStatuses.succeeded) {
                    dispatch(changeTaskAC(taskId, domainModel, todolistId))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }
}

//types
// export type TasksDomainStateType = TasksStateType & {
//     entityStatus: RequestStatusType
// }


export type SetTaskActionType = ReturnType<typeof setTasksAC>
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddNewTaskActionType = ReturnType<typeof addNewTaskAC>
export type ChangeTaskActionType = ReturnType<typeof changeTaskAC>
// export type ChangeTaskEntityStatusActionType = ReturnType<typeof changeTaskEntityStatusAC>

export type TasksActionsType =
    | SetTaskActionType
    | RemoveTaskActionType
    | AddNewTaskActionType
    | ChangeTaskActionType
    | AddNewTodoListActionType
    | RemoveTodoListActionType
    | SetTodoListsActionType
    | SetAppStatusActionType
    | SetAppErrorActionType
    // | ChangeTaskEntityStatusActionType


type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
