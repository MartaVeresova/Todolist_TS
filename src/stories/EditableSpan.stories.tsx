import React from 'react';
import {Meta, Story} from '@storybook/react';
import {AddItemForm, AddItemFormPropsType} from '../AddItemForm';
import {action} from '@storybook/addon-actions';
import {EditableSpan, EditableSpanPropsType} from '../EditableSpan';

export default {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    argTypes: {
        onChange: {
            description: 'Value EditableSpan changed',
        },
    },
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    title: 'HTML',
    onChangeTitle: action('Value EditableSpan changed'),
};