import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';

export type AddItemFormPropsType = {
    addItem: (newItemTitle: string) => void
    disabled?: boolean
}


export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormPropsType) => {
    const [newItemTitle, setNewItemTitle] = useState('')
    const [error, setError] = useState<boolean>(false)

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setNewItemTitle(e.currentTarget.value)
        setError(false)
    }, [])

    const onClickAddItem = useCallback(() => {
        if (newItemTitle.trim() !== '') {
            addItem(newItemTitle.trim())
        } else {
            setError(true)
        }
        setNewItemTitle('')
    }, [addItem, newItemTitle])

    const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        (e.key === 'Enter') && onClickAddItem()
    }, [onClickAddItem])


    return (
        <div>
            <TextField
                variant={'outlined'}
                error={error}
                placeholder={'Enter a new task'}
                value={newItemTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                label={'Title'}
                helperText={error && 'Title is required!'}
                size={'small'}
                onBlur={() => setError(false)}
                disabled={disabled}
            />
            <IconButton onClick={onClickAddItem} disabled={disabled}>
                <AddBox/>
            </IconButton>
        </div>
    )
})