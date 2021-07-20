import React from 'react';
import {Meta, Story} from '@storybook/react';
import {AddItemForm, AddItemFormPropsType} from './AddItemForm';
import {action} from '@storybook/addon-actions';

export default {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    argTypes: {
        onClick: {
            description: 'Button clicked inside component',
        },
    },
} as Meta;

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
    addItem: action('Button clicked inside component'),
    disabled: false,
};

export const AddItemFormDisabledExample = Template.bind({});
AddItemFormDisabledExample.args = {
    addItem: action('AddItemForm should be disabled'),
    disabled: true,
};