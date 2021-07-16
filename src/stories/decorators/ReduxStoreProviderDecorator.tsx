import {Provider} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import React from 'react';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from '../../features/todolistsList/tasks-reducer';
import {todoListsReducer} from '../../features/todolistsList/todoLists-reducer';
import {TaskPriorities, TaskStatuses} from '../../api/todolist-api';
import {appReducer} from '../../app/app-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
})
// @ts-ignore
const initialGlobalState: AppRootStateType = {
    todoLists: [
        {id: 'todoListId1', title: 'What to learn', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'},
        {id: 'todoListId2', title: 'What to buy', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'}
    ],
    tasks: {
        ['todoListId1']: [
            {
                id: '1',
                todoListId: 'todoListId1',
                title: 'HTML',
                description: '',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
                entityStatus: 'idle',
            },
            {
                id: '2',
                todoListId: 'todoListId1',
                title: 'JS',
                description: '',
                order: 0,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
                entityStatus: 'idle',
            }
        ],
        ['todoListId2']: [
            {
                id: '3',
                todoListId: 'todoListId2',
                title: 'Milk',
                description: '',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Later,
                startDate: '',
                deadline: '',
                addedDate: '',
                entityStatus: 'idle',
            },
            {
                id: '4',
                todoListId: 'todoListId2',
                title: 'React Book',
                description: '',
                order: 0,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Later,
                startDate: '',
                deadline: '',
                addedDate: '',
                entityStatus: 'idle',
            }
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}