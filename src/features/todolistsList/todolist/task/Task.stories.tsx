import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Task, TaskPropsType} from './Task';
import {ReduxStoreProviderDecorator} from '../../../../stories/decorators/ReduxStoreProviderDecorator';
import {TaskStatuses} from '../../../../api/todolist-api';

export default {
    title: 'TODOLISTS/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
} as Meta;

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    task: {
        id: '1',
        todoListId: 'todoListId1',
        title: 'HTML&CSS',
        status: TaskStatuses.Completed,
        description: '',
        order: 0,
        priority: 2,
        startDate: '',
        deadline: '',
        addedDate: '',
        entityStatus: 'idle',
    },
    todoListId: 'todoListId1',
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    task: {
        id: '3',
        todoListId: 'todoListId2',
        title: 'Milk',
        status: TaskStatuses.New,
        description: '',
        order: 0,
        priority: 2,
        startDate: '',
        deadline: '',
        addedDate: '',
        entityStatus: 'idle',
    },
    todoListId: 'todoListId2',
};