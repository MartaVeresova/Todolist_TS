import {ResponseStatuses, todoListApi, TodoListType} from '../../api/todolist-api';
import {AppThunk} from '../../app/store';
import {RequestStatusType, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';


const initialState: Array<TodoListDomainType> = []
export type InitialTodoListsStateType = typeof initialState


export const todoListsReducer = (state = initialState, action: TodoListsActionsType): InitialTodoListsStateType => {

    switch (action.type) {

        case 'TODO/SET-TODOLISTS':
            return action.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))

        case 'TODO/REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)

        case 'TODO/ADD-NEW-TODOLIST':
            return [{...action.todoList, filter: 'all', entityStatus: 'idle'}, ...state]

        case 'TODO/CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)

        case 'TODO/CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.value} : tl)

        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)


        default:
            return state
    }
}

//actions
export const setTodoListsAC = (todoLists: TodoListType[]) =>
    ({type: 'TODO/SET-TODOLISTS', todoLists} as const)

export const removeTodoListAC = (id: string) =>
    ({type: 'TODO/REMOVE-TODOLIST', id} as const)

export const addNewTodoListAC = (todoList: TodoListType) =>
    ({type: 'TODO/ADD-NEW-TODOLIST', todoList} as const)

export const changeTodoListTitleAC = (title: string, id: string) =>
    ({type: 'TODO/CHANGE-TODOLIST-TITLE', title, id} as const)

export const changeTodoListFilterAC = (value: FilterValuesType, id: string) =>
    ({type: 'TODO/CHANGE-TODOLIST-FILTER', value, id} as const)

export const changeTodolistEntityStatusAC = (entityStatus: RequestStatusType, id: string) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', entityStatus, id} as const)


//thunks
export const fetchTodoListsTC = (): AppThunk =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'))
        const res = await todoListApi.getTodos()
        dispatch(setTodoListsAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
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

