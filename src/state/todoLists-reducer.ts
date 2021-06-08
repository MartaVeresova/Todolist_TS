import {FilterValuesType, TodoListsType} from '../AppWithRedux';
import {v1} from 'uuid';

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const ADD_NEW_TODOLIST = 'ADD-NEW-TODOLIST'
export const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
export const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'

export type RemoveTodoListType = {
    type: 'REMOVE-TODOLIST'
    todoListId: string
}
export type AddNewTodoListType = {
    type: 'ADD-NEW-TODOLIST'
    title: string
    todoListId: string
}
export type ChangeTodoListTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todoListId: string
}
export type ChangeTodoListFilterType = {
    type: 'CHANGE-TODOLIST-FILTER'
    value: FilterValuesType
    todoListId: string
}
export type ActionsType =
    RemoveTodoListType
    | AddNewTodoListType
    | ChangeTodoListTitleType
    | ChangeTodoListFilterType

export const todoListID1 = v1()
export const todoListID2 = v1()

const initialState: Array<TodoListsType> = [
    {id: todoListID1, title: 'What to learn', filter: 'all'},
    {id: todoListID2, title: 'What to buy', filter: 'all'},
]

export type InitialTodoListsStateType = typeof initialState

export const todoListsReducer = (state = initialState, action: ActionsType): InitialTodoListsStateType => {

    switch (action.type) {

        case REMOVE_TODOLIST:
            return state.filter(tl => tl.id !== action.todoListId)

        case ADD_NEW_TODOLIST:
            const newTodoList: TodoListsType = {
                id: action.todoListId,
                title: action.title,
                filter: 'all'
            }
            return [newTodoList, ...state]

        case CHANGE_TODOLIST_TITLE:
            return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)

        case CHANGE_TODOLIST_FILTER:
            return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.value} : tl)

        default:
            return state
    }
}

export const removeTodoListAC = (todoListId: string): RemoveTodoListType => {
    return {type: REMOVE_TODOLIST, todoListId}
}
export const addNewTodoListAC = (title: string): AddNewTodoListType => {
    return {type: ADD_NEW_TODOLIST, title, todoListId: v1()}
}
export const changeTodoListTitleAC = (title: string, todoListId: string): ChangeTodoListTitleType => {
    return {type: CHANGE_TODOLIST_TITLE, title, todoListId}
}
export const changeTodoListFilterAC = (value: FilterValuesType, todoListId: string): ChangeTodoListFilterType => {
    return {type: CHANGE_TODOLIST_FILTER, value, todoListId}
}