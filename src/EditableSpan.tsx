import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Input} from '@material-ui/core';

export type EditableSpanPropsType = {
    title: string
    onChangeTitle: (changedTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState(false)
    const [itemTitle, setItemTitle] = useState(props.title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.onChangeTitle(itemTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            offEditMode()
        }
    }
    return (
        editMode
            ? <Input
                color={'primary'}
                value={itemTitle}
                onChange={onChangeHandler}
                autoFocus
                onBlur={offEditMode}
                onKeyPress={onKeyPressHandler}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}