import React from 'react';
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
import {useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {RequestStatusType} from './app-reducer';
import {ErrorSnackbar} from '../components/errorSnackbar/ErrorSnackbar';


function App() {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

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
                    <Button
                        color={'inherit'}
                        variant={'outlined'}
                    >
                        LogIn
                    </Button>
                </Toolbar>
            </AppBar>

            {status === 'loading' && <LinearProgress color="secondary"/>}

            <Container fixed>
                <TodoListsList/>
            </Container>

            <ErrorSnackbar />
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
