import React from 'react';
import './App.css';
import {TasksPropsType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addNewTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    InitialTodoListsStateType,
    removeTodoListAC
} from './state/todoLists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';


export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TasksPropsType>
}

function AppWithRedux() {
    //BLL:
    const todoLists = useSelector<AppRootState, InitialTodoListsStateType>(state => state.todoLists)
    const dispatch = useDispatch()

    function removeTodolist(todoListId: string) {
        dispatch(removeTodoListAC(todoListId))
    }
    function addTodoList(title: string) {
        dispatch(addNewTodoListAC(title))
    }
    function changeTodoListTitle(title: string, todoListId: string) {
        dispatch(changeTodoListTitleAC(title, todoListId))
    }
    function changeFilter(value: FilterValuesType, todoListId: string) {
        dispatch(changeTodoListFilterAC(value, todoListId))
    }

    //UI:

    const todoListComponent = todoLists.map(tl =>
        <Grid item key={tl.id}>
            <Paper elevation={4} style={{padding: '15px'}}>
                <Todolist
                    todoListId={tl.id}
                    title={tl.title}
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTodoListTitle={changeTodoListTitle}
                />
            </Paper>
        </Grid>
    )
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
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListComponent}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux
