import React from 'react';
import {Meta, Story} from '@storybook/react';
import {ReduxStoreProviderDecorator} from '../../../stories/decorators/ReduxStoreProviderDecorator';
import {action} from '@storybook/addon-actions';
import {TodoList, TodoListPropsType} from './Todolist';

export default {
    title: 'TODOLISTS/Todolist',
    component: TodoList,
    decorators: [ReduxStoreProviderDecorator],
} as Meta;


const changeFilterCallback = action('Change filter clicked')
const removeTodolistCallback = action('Remove todoList clicked')
const changeTodoListTitleCallback = action('Change todoList title clicked')

const baseArgs = {
    changeFilter: changeFilterCallback,
    removeTodolist: removeTodolistCallback,
    changeTodoListTitle: changeTodoListTitleCallback,
}

const Template: Story<TodoListPropsType> = (args) => <TodoList {...args} />;

export const TodolistFilterAllExample = Template.bind({});
TodolistFilterAllExample.args = {
    todoList: {
        id: 'todoListId1',
        title: 'HTML',
        entityStatus: 'idle',
        filter: 'all',
        order: 0,
        addedDate: ''
    },
    ...baseArgs,
};

export const TodolistFilterCompletedExample = Template.bind({});
TodolistFilterCompletedExample.args = {
    todoList: {
        id: 'todoListId2',
        title: 'Milk',
        entityStatus: 'idle',
        filter: 'completed',
        order: 0,
        addedDate: ''
    },
    ...baseArgs,
};
