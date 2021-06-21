import {Provider} from 'react-redux';
import {AppRootStateType} from '../../state/store';
import React from 'react';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from '../../state/tasks-reducer';
import {todoListsReducer} from '../../state/todoLists-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

const initialGlobalState = {
    todoLists: [
        {id: 'todoListId1', title: 'What to learn', filter: 'all'},
        {id: 'todoListId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todoListId1']: [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'JS', isDone: true}
        ],
        ['todoListId2']: [
            {id: '3', title: 'Milk', isDone: false},
            {id: '4', title: 'React Book', isDone: true}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}