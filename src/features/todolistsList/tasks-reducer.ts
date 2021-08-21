import {AddNewTodoListActionType, RemoveTodoListActionType, SetTodoListsActionType,} from './todoLists-reducer';
import {TasksStateType} from '../../app/App';
import {ResponseStatuses, TaskType, todoListApi, UpdateTaskModelType} from '../../api/todolist-api';
import {AppRootStateType, AppThunk} from '../../app/store';
import {RequestStatusType, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';


const initialState: TasksStateType = {}
export type InitialTasksStateType = typeof initialState


export const tasksReducer = (state = initialState, action: TasksActionsType): InitialTasksStateType => {

    switch (action.type) {

        // case 'todo/SET-TODOLISTS':
        //     action.todoLists.forEach(tl => ({...state[tl.id] = []}))
        //     return {...state}
        //
        // case 'tasks/SET-TASKS':
        //     return {
        //         [action.todoListId]: action.tasks.map(t => ({...t, entityStatus: 'idle'}))
        //     }
        //


        case 'tasks/SET-TASKS':
            return {
                ...state,
                [action.todoListId]: action.tasks.map(t => ({...t, entityStatus: 'idle'}))
            }

        case 'todo/SET-TODOLISTS':
            action.todoLists.forEach(tl => ({...state[tl.id] = []}))
            return {...state}

        case 'tasks/REMOVE-TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
            }

        case 'tasks/ADD-NEW-TASK':
            return {
                ...state,
                [action.task.todoListId]: [{...action.task, entityStatus: 'idle'}, ...state[action.task.todoListId]]
            }

        case 'tasks/CHANGE-TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    ...action.model
                } : t)
            }

        case 'todo/ADD-NEW-TODOLIST':
            return {
                ...state,
                [action.todoList.id]: []
            }

        case 'todo/REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy

        case 'tasks/CHANGE-TASK-ENTITY-STATUS':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t, entityStatus: action.entityStatus
                } : t)
            }

        default:
            return state
    }
}

//actions
export const setTasksAC = (todoListId: string, tasks: TaskType[]) => {
    return ({type: 'tasks/SET-TASKS', todoListId, tasks} as const)
}
// ({type: 'Tasks/SET-TASKS', todoListId, tasks} as const)

export const removeTaskAC = (taskId: string, todoListId: string) => {
    return ({type: 'tasks/REMOVE-TASK', taskId, todoListId} as const)
}
    // ({type: 'tasks/REMOVE-TASK', taskId, todoListId} as const)

export const addNewTaskAC = (task: TaskType) => {
    return ({type: 'tasks/ADD-NEW-TASK', task} as const)
}
    // ({type: 'tasks/ADD-NEW-TASK', task} as const)

export const changeTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todoListId: string) =>
    ({type: 'tasks/CHANGE-TASK', taskId, model, todoListId} as const)

export const changeTaskEntityStatusAC = (entityStatus: RequestStatusType, todoListId: string, taskId: string) =>
    ({type: 'tasks/CHANGE-TASK-ENTITY-STATUS', entityStatus, todoListId, taskId} as const)


//thunks
export const fetchTasksTC = (todoListId: string): AppThunk =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'))
        try {
            const res = await todoListApi.getTasks(todoListId)
            dispatch(setAppStatusAC('loading')) //под вопросом
            dispatch(setTasksAC(todoListId, res.data.items))
            dispatch(setAppStatusAC('succeeded'))
        } catch (err) {
            handleServerNetworkError(dispatch, err.message)
        }
    }

export const removeTaskTC = (todolistId: string, taskId: string): AppThunk =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTaskEntityStatusAC('loading', todolistId, taskId))
        try {
            const res = await todoListApi.deleteTask(todolistId, taskId)
            if (res.data.resultCode === ResponseStatuses.succeeded) {
                dispatch(removeTaskAC(taskId, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        } catch (err) {
            handleServerNetworkError(dispatch, err.message)
        }
    }

export const addNewTaskTC = (todolistId: string, title: string): AppThunk =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'))
        try {
            const res = await todoListApi.createTask(todolistId, title)
            if (res.data.resultCode === ResponseStatuses.succeeded) {
                dispatch(addNewTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        } catch (err) {
            handleServerNetworkError(dispatch, err.message)
        }
    }

export const updateTaskTC = (todolistId: string, domainModel: UpdateDomainTaskModelType, taskId: string): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {

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
            try {
                const res = await todoListApi.updateTask(todolistId, taskId, apiModel)
                if (res.data.resultCode === ResponseStatuses.succeeded) {
                    dispatch(changeTaskAC(taskId, domainModel, todolistId))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            } catch (err) {
                handleServerNetworkError(dispatch, err.message)
            }
        }
    }

//types
export type SetTaskActionType = ReturnType<typeof setTasksAC>
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddNewTaskActionType = ReturnType<typeof addNewTaskAC>
export type ChangeTaskActionType = ReturnType<typeof changeTaskAC>
export type ChangeTaskEntityStatusActionType = ReturnType<typeof changeTaskEntityStatusAC>

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
    | ChangeTaskEntityStatusActionType


type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
