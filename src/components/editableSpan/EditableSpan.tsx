import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {Input} from '@material-ui/core';

export type EditableSpanPropsType = {
    title: string
    onChangeTitle: (changedTitle: string) => void
}

export const EditableSpan = React.memo(({title, onChangeTitle}: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [itemTitle, setItemTitle] = useState(title)

    const onEditMode = () => setEditMode(true)

    const offEditMode = useCallback(() => {
        setEditMode(false)
        if (itemTitle.length > 100) {
            setItemTitle(title)
        }
        onChangeTitle(itemTitle)
    }, [onChangeTitle, itemTitle])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value)
    }, [])

    const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            offEditMode()
        }
    }, [offEditMode])
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
            : <span onDoubleClick={onEditMode}>{title}</span>
    )
})