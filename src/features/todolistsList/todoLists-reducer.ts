import {ResponseStatuses, todoListApi, TodoListType} from '../../api/todolist-api';
import {AppThunk} from '../../app/store';
import {RequestStatusType, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';


const initialState: Array<TodoListDomainType> = []
export type InitialTodoListsStateType = typeof initialState


export const todoListsReducer = (state = initialState, action: TodoListsActionsType): InitialTodoListsStateType => {

    switch (action.type) {

        case 'todo/SET-TODOLISTS':
            return action.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))

        case 'todo/REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)

        case 'todo/ADD-NEW-TODOLIST':
            return [{...action.todoList, filter: 'all', entityStatus: 'idle'}, ...state]

        case 'todo/CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)

        case 'todo/CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

        case 'todo/CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)

        default:
            return state
    }
}

//actions
export const setTodoListsAC = (todoLists: TodoListType[]) =>
    ({type: 'todo/SET-TODOLISTS', todoLists} as const)

export const removeTodoListAC = (id: string) =>
    ({type: 'todo/REMOVE-TODOLIST', id} as const)

export const addNewTodoListAC = (todoList: TodoListType) =>
    ({type: 'todo/ADD-NEW-TODOLIST', todoList} as const)

export const changeTodoListTitleAC = (title: string, id: string) =>
    ({type: 'todo/CHANGE-TODOLIST-TITLE', title, id} as const)

export const changeTodoListFilterAC = (filter: FilterValuesType, id: string) =>
    ({type: 'todo/CHANGE-TODOLIST-FILTER', filter, id} as const)

export const changeTodolistEntityStatusAC = (entityStatus: RequestStatusType, id: string) =>
    ({type: 'todo/CHANGE-TODOLIST-ENTITY-STATUS', entityStatus, id} as const)


//thunks
export const fetchTodoListsTC = (): AppThunk =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'))
        try {
            const res = await todoListApi.getTodos()
            dispatch(setTodoListsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        } catch (err) {
            handleServerNetworkError(dispatch, err.message)
        }
    }

export const removeTodoListTC = (id: string): AppThunk =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC('loading', id))
        try {
            const res = await todoListApi.deleteTodo(id)
            if (res.data.resultCode === ResponseStatuses.succeeded) {
                dispatch(removeTodoListAC(id))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        } catch (err) {
            handleServerNetworkError(dispatch, err.message)
        }
    }

export const addTodoListTC = (title: string): AppThunk =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'))
        try {
            const res = await todoListApi.createTodo(title)
            if (res.data.resultCode === ResponseStatuses.succeeded) {
                dispatch(addNewTodoListAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        } catch (err) {
            handleServerNetworkError(dispatch, err.message)
        }
    }

export const changeTodoListTitleTC = (id: string, title: string): AppThunk =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'))
        try {
            const res = await todoListApi.updateTodoTitle(id, title)
            if (res.data.resultCode === ResponseStatuses.succeeded) {
                dispatch(changeTodoListTitleAC(title, id))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        } catch (err) {
            handleServerNetworkError(dispatch, err.message)
        }
    }

//types
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
export type AddNewTodoListActionType = ReturnType<typeof addNewTodoListAC>
export type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>
export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>

export type TodoListsActionsType =
    | SetTodoListsActionType
    | RemoveTodoListActionType
    | AddNewTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType
    | SetAppStatusActionType
    | SetAppErrorActionType
    | ChangeTodolistEntityStatusActionType

