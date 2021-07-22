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
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {AddItemForm} from '../../components/addItemForm/AddItemForm';
import {TodoList} from './todolist/Todolist';
import {Redirect} from 'react-router-dom';


type PropsType = {
    demo?: boolean
}

export const TodoListsList: React.FC<PropsType> = React.memo(({demo = false}) => {
    console.log('TodoListsList')

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType, InitialTodoListsStateType>(state => state.todoLists)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {

        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodoListsTC())
    }, [dispatch, isLoggedIn])

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


    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
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
                                    todoList={tl}
                                    entityStatus={tl.entityStatus}
                                    changeFilter={changeFilter}
                                    removeTodolist={removeTodolist}
                                    changeTodoListTitle={changeTodoListTitle}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    )
                })
            }
        </Grid>
    </>
})