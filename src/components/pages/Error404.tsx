import React from 'react'
import Error404Img from '../../assets/images/Error404.png'
import Button from '@material-ui/core/Button';
import s from './Error404.module.css'
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';

export const Error404 = () => {

    // const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const history = useHistory()

    const onClickHandler = () => {
        history.push(`/`);
    }

    return (
        <div className={s.container}>
            <img src={Error404Img} alt={'Error 404: PAGE NOT FOUND'}/>
            <Button
                variant={'contained'}
                size={'small'}
                color={'secondary'}
                onClick={onClickHandler}
            >
                Take me away
            </Button>
        </div>
    )
}