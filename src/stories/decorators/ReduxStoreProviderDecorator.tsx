import {Provider} from 'react-redux';
import {AppRootStateType} from '../../state/store';
import React from 'react';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from '../../state/tasks-reducer';
import {todoListsReducer} from '../../state/todoLists-reducer';
import {TaskPriorities, TaskStatuses} from '../../api/todolist-api';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

const initialGlobalState: AppRootStateType = {
    todoLists: [
        {id: 'todoListId1', title: 'What to learn', addedDate: '', order: 0, filter: 'all'},
        {id: 'todoListId2', title: 'What to buy', addedDate: '', order: 0, filter: 'all'}
    ],
    tasks: {
        ['todoListId1']: [
            {
                taskId: '1',
                todoListId: 'todoListId1',
                title: 'HTML',
                description: '',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                taskId: '2',
                todoListId: 'todoListId1',
                title: 'JS',
                description: '',
                order: 0,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            }
        ],
        ['todoListId2']: [
            {
                taskId: '3',
                todoListId: 'todoListId2',
                title: 'Milk',
                description: '',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Later,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                taskId: '4',
                todoListId: 'todoListId2',
                title: 'React Book',
                description: '',
                order: 0,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Later,
                startDate: '',
                deadline: '',
                addedDate: '',
            }
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}