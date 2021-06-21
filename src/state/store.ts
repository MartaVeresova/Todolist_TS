import {combineReducers, createStore} from 'redux';
import {tasksReducer} from './tasks-reducer';
import {todoListsReducer} from './todoLists-reducer';

export type AppRootStateType = ReturnType<typeof rootReducers>

const rootReducers = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
})

export const store = createStore(rootReducers)


// @ts-ignore
window.store = store