import React from 'react';
import {Meta, Story} from '@storybook/react';
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator';
import App from '../App';

export default {
    title: 'TODOLISTS/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator],
} as Meta;

const Template: Story = (args) => <App/>;

export const AppExample = Template.bind({});
AppExample.args = {};

