import {AppThunk} from './store';
import {authApi, ResponseStatuses} from '../api/todolist-api';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {setIsLoggedInAC, SetIsLoggedInActionType} from '../features/login/auth-reducer';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {

        case 'App/SET-STATUS':
            return {...state, status: action.status}

        case 'App/SET-ERROR':
            return {...state, error: action.error}

        case 'App/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}

        default:
            return state
    }
}

//actions
export const setAppStatusAC = (status: RequestStatusType) =>
    ({type: 'App/SET-STATUS', status} as const)

export const setAppErrorAC = (error: string | null) =>
    ({type: 'App/SET-ERROR', error} as const)

export const setIsInitializedAC = (isInitialized: boolean) =>
    ({type: 'App/SET-IS-INITIALIZED', isInitialized} as const)


//thunks
export const initializeAppTC = (): AppThunk =>
    async dispatch => {
        try {
            const res = await authApi.me()
            if (res.data.resultCode === ResponseStatuses.succeeded) {
                dispatch(setIsLoggedInAC(true))
            } else {
                handleServerAppError(dispatch, res.data)
            }
            dispatch(setIsInitializedAC(true))
        } catch (err) {
            handleServerNetworkError(dispatch, err.message)
        }
    }

//types
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetIsInitializedActionType = ReturnType<typeof setIsInitializedAC>

export type AppActionsType =
    | SetAppStatusActionType
    | SetAppErrorActionType
    | SetIsLoggedInActionType
    | SetIsInitializedActionType