import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {
    addTodoListTC,
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    fetchTodoListsTC,
    FilterValuesType,
    InitialTodoListsStateType,
    removeTodoListTC
} from './todoLists-reducer';
import {Grid, Paper} from '@material-ui/core';
import {AddItemForm} from '../../components/addItemForm/AddItemForm';
import {TodoList} from './todolist/Todolist';


export const TodoListsList: React.FC = () => {
    //BLL
    const todoLists = useSelector<AppRootStateType, InitialTodoListsStateType>(state => state.todoLists)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [])

    function removeTodolist(todoListId: string) {
        dispatch(removeTodoListTC(todoListId))
    }

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])

    function changeTodoListTitle(title: string, todoListId: string) {
        dispatch(changeTodoListTitleTC(todoListId, title))
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        dispatch(changeTodoListFilterAC(value, todoListId))
    }

    return <>
        <Grid container style={{padding: '20px 0'}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todoLists.map(tl => {
                    return (
                        <Grid item key={tl.id}>
                            <Paper elevation={4} style={{padding: '15px'}}>
                                <TodoList
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
                })
            }
        </Grid>
    </>
}