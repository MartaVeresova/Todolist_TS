import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Task, TaskPropsType} from '../Task';
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator';

export default {
    title: 'TODOLISTS/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
} as Meta;

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    task: {id: '1', title: 'HTML&CSS', isDone: true},
    todoListId: 'todoListId1',
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    task: {id: '3', title: 'Milk', isDone: true},
    todoListId: 'todoListId2',
};