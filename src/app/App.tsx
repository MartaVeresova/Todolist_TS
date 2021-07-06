import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TaskType} from '../api/todolist-api';
import {TodoListsList} from '../features/todolistsList/TodoListsList';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    //UI:
    return (
        //JSX
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

            <Container fixed>
                <TodoListsList/>
            </Container>
        </div>
    )
}

export default App
