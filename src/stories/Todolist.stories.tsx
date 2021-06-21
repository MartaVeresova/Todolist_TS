import React from 'react';
import {Meta, Story} from '@storybook/react';
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator';
import {Todolist, TodolistPropsType} from '../Todolist';
import {action} from '@storybook/addon-actions';

export default {
    title: 'TODOLISTS/Todolist',
    component: Todolist,
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

const Template: Story<TodolistPropsType> = (args) => <Todolist {...args} />;

export const TodolistFilterAllExample = Template.bind({});
TodolistFilterAllExample.args = {
    todoListId: 'todoListId2',
    title: 'React Book',
    filter: 'all',
    ...baseArgs,
};

export const TodolistFilterCompletedExample = Template.bind({});
TodolistFilterCompletedExample.args = {
    todoListId: 'todoListId1',
    title: 'JS',
    filter: 'completed',
    ...baseArgs,
};
