import {
    ACTIONS_TODO_TYPE,
    AddNewTodoListActionType,
    RemoveTodoListActionType,
    SetTodoListsActionType,
} from './todoLists-reducer';
import {TasksStateType} from '../../app/App';
import {TaskType, todoListApi, UpdateTaskModelType} from '../../api/todolist-api';
import {AppRootStateType, AppThunk} from '../../app/store';


enum ACTIONS_TASK_TYPE {
    SET_TASKS = 'SET-TASKS',
    REMOVE_TASK = 'REMOVE-TASK',
    ADD_NEW_TASK = 'ADD-NEW-TASK',
    CHANGE_TASK = 'CHANGE-TASK',
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {

    switch (action.type) {

        case ACTIONS_TASK_TYPE.SET_TASKS:
            return {
                ...state,
                [action.todoListId]: action.tasks
            }

        case ACTIONS_TODO_TYPE.SET_TODOLISTS:
            action.todoLists.forEach(tl => ({...state[tl.id] = []}))
            return {...state}

        case ACTIONS_TASK_TYPE.REMOVE_TASK:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
            }

        case ACTIONS_TASK_TYPE.ADD_NEW_TASK:
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

        case ACTIONS_TASK_TYPE.CHANGE_TASK:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    ...action.model
                } : t)
            }

        case ACTIONS_TODO_TYPE.ADD_NEW_TODOLIST:
            return {
                ...state,
                [action.todoList.id]: []
            }

        case ACTIONS_TODO_TYPE.REMOVE_TODOLIST:
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy

        default:
            return state
    }
}

//actions
export const removeTaskAC = (taskId: string, todoListId: string) =>
    ({type: ACTIONS_TASK_TYPE.REMOVE_TASK, taskId, todoListId} as const)

export const addNewTaskAC = (task: TaskType) =>
    ({type: ACTIONS_TASK_TYPE.ADD_NEW_TASK, task} as const)

export const changeTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todoListId: string) =>
    ({type: ACTIONS_TASK_TYPE.CHANGE_TASK, taskId, model, todoListId} as const)

export const setTasksAC = (todoListId: string, tasks: TaskType[]) =>
    ({type: ACTIONS_TASK_TYPE.SET_TASKS, todoListId, tasks} as const)


//thunks
export const fetchTasksTC = (todoListId: string): AppThunk => dispatch => {
    todoListApi.getTasks(todoListId)
        .then(res => {
            dispatch(setTasksAC(todoListId, res.data.items))
        })
}

export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => dispatch => {
    todoListApi.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}

export const addNewTaskTC = (todolistId: string, title: string): AppThunk => dispatch => {
    todoListApi.createTask(todolistId, title)
        .then(res => {
            dispatch(addNewTaskAC(res.data.data.item))
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

        todoListApi.updateTask(todolistId, taskId, apiModel)
            .then(() => {
                dispatch(changeTaskAC(taskId, domainModel, todolistId))
            })
    }
}

//types
export type SetTaskActionType = ReturnType<typeof setTasksAC>
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddNewTaskActionType = ReturnType<typeof addNewTaskAC>
export type ChangeTaskActionType = ReturnType<typeof changeTaskAC>

export type TasksActionsType =
    | SetTaskActionType
    | RemoveTaskActionType
    | AddNewTaskActionType
    | ChangeTaskActionType
    | AddNewTodoListActionType
    | RemoveTodoListActionType
    | SetTodoListsActionType

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
