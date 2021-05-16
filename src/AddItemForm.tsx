import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
        if (e.key === 'Enter') {
            props.addItem(newItemTitle);
            setNewItemTitle('')
        }
    }
    const onClickAddItem = () => {
        if (newItemTitle.trim() !== '') {
            props.addItem(newItemTitle.trim())
        } else {
            setError(true)
        }
        setNewItemTitle('')
    }
    const errorMessage = error && <div style={{color: 'red'}}>Title is required!</div>

    return (
        <div>
            <input
                placeholder={'Enter a new task'}
                value={newItemTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' : ''}
            />
            <button onClick={onClickAddItem}>+</button>
            {errorMessage}
        </div>
    )
}