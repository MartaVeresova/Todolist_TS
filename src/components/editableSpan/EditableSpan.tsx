import React, {ChangeEvent, FC, KeyboardEvent, memo, useCallback, useState} from 'react';
import {Input} from '@material-ui/core';

export type EditableSpanPropsType = {
    title: string
    disabled?: boolean
    onChangeTitle: (changedTitle: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = memo(({title, disabled = false, onChangeTitle}) => {

    const [editMode, setEditMode] = useState(false)
    const [itemTitle, setItemTitle] = useState(title)

    const onEditMode = () => setEditMode(true)

    const offEditMode = useCallback(() => {
        setEditMode(false)
        if (itemTitle.length > 100) {
            setItemTitle(title)
        }
        onChangeTitle(itemTitle)
    }, [onChangeTitle, itemTitle, title])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) =>
        setItemTitle(e.currentTarget.value), [])

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
                disabled={disabled}
            />
            : <span onDoubleClick={onEditMode}>{title}</span>
    )
})