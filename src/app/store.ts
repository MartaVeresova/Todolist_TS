import {applyMiddleware, combineReducers, createStore} from 'redux';
import {TasksActionsType, tasksReducer} from '../features/todolistsList/tasks-reducer';
import {TodoListsActionsType, todoListsReducer} from '../features/todolistsList/todoLists-reducer';
import thunk, {ThunkAction} from 'redux-thunk'
import {AppActionsType, appReducer} from './app-reducer';

export type AppRootStateType = ReturnType<typeof rootReducers>

const rootReducers = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
})

export const store = createStore(rootReducers, applyMiddleware(thunk))

export type AppRootActionsType =
    | TodoListsActionsType
    | TasksActionsType
    | AppActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>

// @ts-ignore
window.store = store