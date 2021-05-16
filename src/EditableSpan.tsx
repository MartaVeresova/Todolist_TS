import React, {ChangeEvent, useState} from 'react';

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

    return (
        editMode
            ? <input
                value={itemTitle}
                onChange={onChangeHandler}
                autoFocus
                onBlur={offEditMode}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}