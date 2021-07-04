import {v1} from 'uuid';
import {ADD_NEW_TODOLIST, AddNewTodoListType, REMOVE_TODOLIST, RemoveTodoListType,} from './todoLists-reducer';
import {TasksStateType} from '../App';
import {TaskPriorities, TaskStatuses, TaskType} from '../api/todolist-api';

export const REMOVE_TASK = 'REMOVE-TASK'
export const ADD_NEW_TASK = 'ADD-NEW-TASK'
export const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
export const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'


export type RemoveTaskType = {
    type: 'REMOVE-TASK'
    id: string
    todoListId: string
}
export type AddNewTaskType = {
    type: 'ADD-NEW-TASK'
    title: string
    todoListId: string
}
export type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    status: TaskStatuses
    todoListId: string
}
export type ChangeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    newTitle: string
    todoListId: string
}

export type ActionsType =
    RemoveTaskType
    | AddNewTaskType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | AddNewTodoListType
    | RemoveTodoListType


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {

    switch (action.type) {

        case REMOVE_TASK:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.taskId !== action.id)
            }

        case ADD_NEW_TASK:
            const newTask: TaskType = {
                todoListId: action.todoListId,
                taskId: v1(),
                title: action.title,
                description: '',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            }
            return {
                ...state,
                [action.todoListId]: [newTask, ...state[action.todoListId]]
            }

        case CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.taskId === action.taskId ? {
                    ...t,
                    status: action.status
                } : t)
            }

        case CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.taskId === action.taskId ? {
                    ...t,
                    title: action.newTitle
                } : t)
            }

        case ADD_NEW_TODOLIST:
            return {
                ...state,
                [action.todoListId]: []
            }

        case REMOVE_TODOLIST:
            const stateCopy = {...state}
            delete stateCopy[action.todoListId]
            return stateCopy

        default:
            return state
    }
}

export const removeTaskAC = (id: string, todoListId: string): RemoveTaskType => {
    return {type: REMOVE_TASK, id, todoListId}
}
export const addNewTaskAC = (title: string, todoListId: string): AddNewTaskType => {
    return {type: ADD_NEW_TASK, title, todoListId}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todoListId: string): ChangeTaskStatusType => {
    return {type: CHANGE_TASK_STATUS, taskId, status, todoListId}
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string): ChangeTaskTitleType => {
    return {type: CHANGE_TASK_TITLE, taskId, newTitle, todoListId}
}