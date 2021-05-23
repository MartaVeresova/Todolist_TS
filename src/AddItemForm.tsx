import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';

type AddItemFormPropsType = {
    addItem: (newItemTitle: string) => void
}


export function AddItemForm(props: AddItemFormPropsType) {
    const [newItemTitle, setNewItemTitle] = useState('')
    const [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewItemTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        (e.key === 'Enter') && onClickAddItem()
        }

    const onClickAddItem = () => {
        if (newItemTitle.trim() !== '') {
            props.addItem(newItemTitle.trim())
        } else {
            setError(true)
        }
        setNewItemTitle('')
    }

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
            />
            <IconButton onClick={onClickAddItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
}