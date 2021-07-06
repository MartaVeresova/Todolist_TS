import {todoListApi, TodoListType} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {AppActionsType, AppThunk} from './store';


export enum ACTIONS_TODO_TYPE {
    SET_TODOLISTS = 'SET-TODOLISTS',
    REMOVE_TODOLIST = 'REMOVE-TODOLIST',
    ADD_NEW_TODOLIST = 'ADD-NEW-TODOLIST',
    CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE',
    CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER',
}

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}

export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
export type AddNewTodoListActionType = ReturnType<typeof addNewTodoListAC>
export type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>
export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>

export type TodoListsActionsType =
    SetTodoListsActionType
    | RemoveTodoListActionType
    | AddNewTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType

const initialState: Array<TodoListDomainType> = []

export type InitialTodoListsStateType = typeof initialState

export const todoListsReducer = (state = initialState, action: TodoListsActionsType): InitialTodoListsStateType => {

    switch (action.type) {

        case ACTIONS_TODO_TYPE.SET_TODOLISTS:
            return action.todoLists.map(tl => ({...tl, filter: 'all'}))

        case ACTIONS_TODO_TYPE.REMOVE_TODOLIST:
            return state.filter(tl => tl.id !== action.todoListId)

        case ACTIONS_TODO_TYPE.ADD_NEW_TODOLIST:
            const newTodoList: TodoListDomainType = {...action.todoList, filter: 'all'}
            return [newTodoList, ...state]

        case ACTIONS_TODO_TYPE.CHANGE_TODOLIST_TITLE:
            return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)

        case ACTIONS_TODO_TYPE.CHANGE_TODOLIST_FILTER:
            return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.value} : tl)

        default:
            return state
    }
}


export const setTodoListsAC = (todoLists: TodoListType[]) => {
    return {type: ACTIONS_TODO_TYPE.SET_TODOLISTS, todoLists} as const
}
export const removeTodoListAC = (todoListId: string) => {
    return {type: ACTIONS_TODO_TYPE.REMOVE_TODOLIST, todoListId} as const
}
export const addNewTodoListAC = (todoList: TodoListType) => {
    return {type: ACTIONS_TODO_TYPE.ADD_NEW_TODOLIST, todoList} as const
}
export const changeTodoListTitleAC = (title: string, todoListId: string) => {
    return {type: ACTIONS_TODO_TYPE.CHANGE_TODOLIST_TITLE, title, todoListId} as const
}
export const changeTodoListFilterAC = (value: FilterValuesType, todoListId: string) => {
    return {type: ACTIONS_TODO_TYPE.CHANGE_TODOLIST_FILTER, value, todoListId} as const
}

//thunk
export const fetchTodoListsTC = () => (dispatch: Dispatch<AppActionsType>) => {
    todoListApi.getTodos()
        .then(res => {
            dispatch(setTodoListsAC(res.data))
        })
}
export const removeTodoListTC = (todolistId: string): AppThunk => dispatch => {
    todoListApi.deleteTodo(todolistId)
        .then(() => {
            dispatch(removeTodoListAC(todolistId))
        })
}
export const addTodoListTC = (title: string): AppThunk => dispatch => {
    todoListApi.createTodo(title)
        .then(res => {
            dispatch(addNewTodoListAC(res.data.data.item))
        })
}
export const changeTodoListTitleTC = (todolistId: string, title: string): AppThunk => dispatch => {
    todoListApi.updateTodoTitle(todolistId, title)
        .then(() => {
            dispatch(changeTodoListTitleAC(title, todolistId))
        })
}
