import React, {useCallback} from 'react'
import Error404Img from '../../assets/images/Error404.png'
import Button from '@material-ui/core/Button';
import s from './Error404.module.css'
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {initializeAppTC} from '../../app/app-reducer';

export const Error404 = () => {
    console.log('Error404')

    const dispatch = useDispatch()
    const history = useHistory()

    const onClickHandler = useCallback(async () => {
        await dispatch(initializeAppTC())
        history.push(`/login`);
    }, [])

    return (
        <div className={s.container}>
            <img src={Error404Img} alt={'Error 404: PAGE NOT FOUND'}/>
            <Button
                variant={'contained'}
                size={'small'}
                color={'secondary'}
                onClick={onClickHandler}
            >
                Take me back
            </Button>
        </div>
    )
}