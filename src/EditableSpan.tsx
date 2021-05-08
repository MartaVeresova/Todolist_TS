import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    const [editMode, setEditMode] = useState(false)
    const [titleValue, setTitleValue] = useState(props.title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(titleValue)
    }

    const onChangeTitleValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value)
    }

    return (
        editMode
            ? <input
                value={titleValue}
                onChange={onChangeTitleValue}
                onBlur={offEditMode}
                autoFocus
            />
            : <span onDoubleClick={onEditMode}>{titleValue}</span>
    )
}