import {applyMiddleware, combineReducers, createStore} from 'redux';
import {TasksActionsType, tasksReducer} from './tasks-reducer';
import {TodoListsActionsType, todoListsReducer} from './todoLists-reducer';
import thunk, {ThunkAction} from 'redux-thunk'

export type AppRootStateType = ReturnType<typeof rootReducers>

const rootReducers = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
})

export const store = createStore(rootReducers, applyMiddleware(thunk))

export type AppActionsType = TodoListsActionsType | TasksActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store