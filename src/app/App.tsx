import React, {useEffect} from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import {Menu} from '@material-ui/icons';
import {TaskType} from '../api/todolist-api';
import {TodoListsList} from '../features/todolistsList/TodoListsList';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {initializeAppTC, RequestStatusType} from './app-reducer';
import {ErrorSnackbar} from '../components/errorSnackbar/ErrorSnackbar';
import {Redirect, Route, Switch} from 'react-router-dom'
import {Login} from '../features/login/Login';
import {Error404} from '../components/pages/Error404';
import {CircularProgress} from '@material-ui/core';
import {logoutTC} from '../features/login/auth-reducer';


function App() {

    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    const onClickHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <div>
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton color={'inherit'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        TodoLists
                    </Typography>
                    {
                        isLoggedIn && <Button
                            color={'inherit'}
                            variant={'outlined'}
                            onClick={onClickHandler}>
                            Logout
                        </Button>
                    }
                </Toolbar>
            </AppBar>

            {status === 'loading' && <LinearProgress color="secondary"/>}

            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <TodoListsList/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <Error404/>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </Container>

            <ErrorSnackbar/>
        </div>
    )
}

export default App

//types
export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}
export type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}
